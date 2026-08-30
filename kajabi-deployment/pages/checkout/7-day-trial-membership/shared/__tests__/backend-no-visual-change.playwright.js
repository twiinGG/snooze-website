async (page) => {
  const baseUrl = 'http://127.0.0.1:4173/apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/shared/__tests__/fixtures/checkout-backend-visual-harness.html';
  const cases = [
    { currency: 'USD', viewport: 'desktop', width: 1440, height: 1000 },
    { currency: 'AUD', viewport: 'desktop', width: 1440, height: 1000 },
    { currency: 'USD', viewport: 'mobile', width: 393, height: 852 },
    { currency: 'AUD', viewport: 'mobile', width: 393, height: 852 }
  ];
  const threshold = 0.001;
  const results = [];

  async function capture(testCase, mode) {
    await page.setViewportSize({ width: testCase.width, height: testCase.height });
    await page.goto(baseUrl + '?mode=' + mode + '&currency=' + testCase.currency, { waitUntil: 'networkidle' });
    await page.waitForSelector('html[data-fixture-ready="true"]');
    const metrics = await page.evaluate(() => {
      function rect(selector) {
        const value = document.querySelector(selector).getBoundingClientRect();
        return { x: value.x, y: value.y, width: value.width, height: value.height };
      }
      return {
        overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        content: rect('[data-content-slot]'),
        payment: rect('.fixture-payment'),
        options: Array.from(document.querySelectorAll('.embedded-checkout-pricing-option')).map((node) => {
          const value = node.getBoundingClientRect();
          return { x: value.x, y: value.y, width: value.width, height: value.height };
        }),
        events: (window.dataLayer || []).filter((event) => event.event === 'begin_checkout')
      };
    });
    return { metrics, png: (await page.screenshot({ fullPage: true })).toString('base64') };
  }

  async function comparePng(first, second) {
    return page.evaluate(async ({ first, second }) => {
      async function pixels(base64) {
        const image = new Image();
        image.src = 'data:image/png;base64,' + base64;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        return { width: image.width, height: image.height, data: context.getImageData(0, 0, image.width, image.height).data };
      }
      const left = await pixels(first);
      const right = await pixels(second);
      if (left.width !== right.width || left.height !== right.height) throw new Error('full-page screenshot dimensions differ');
      let changedPixels = 0;
      let squaredError = 0;
      const pixelCount = left.width * left.height;
      for (let offset = 0; offset < left.data.length; offset += 4) {
        let changed = false;
        for (let channel = 0; channel < 3; channel += 1) {
          const delta = left.data[offset + channel] - right.data[offset + channel];
          squaredError += delta * delta;
          changed = changed || delta !== 0;
        }
        changedPixels += changed ? 1 : 0;
      }
      return { absoluteErrorRatio: changedPixels / pixelCount, normalizedRmse: Math.sqrt(squaredError / (pixelCount * 3)) / 255 };
    }, { first, second });
  }

  function sameRect(left, right) {
    return ['x', 'y', 'width', 'height'].every((key) => Math.abs(left[key] - right[key]) < 0.01);
  }

  for (const testCase of cases) {
    const baseline = await capture(testCase, 'baseline');
    const candidate = await capture(testCase, 'candidate');
    const pixels = await comparePng(baseline.png, candidate.png);
    const geometryPass = sameRect(baseline.metrics.content, candidate.metrics.content) &&
      sameRect(baseline.metrics.payment, candidate.metrics.payment) &&
      baseline.metrics.options.every((option, index) => sameRect(option, candidate.metrics.options[index]));
    const event = candidate.metrics.events[0] || {};
    const expected = testCase.currency === 'AUD'
      ? { offerId: '2151254578', offerCode: 'PUBMS02_AUD', currency: 'AUD', value: 119 }
      : { offerId: '2150887297', offerCode: 'PUBMS02_USD', currency: 'USD', value: 79 };
    const eventPass = candidate.metrics.events.length === 1 && event.offer_id === expected.offerId &&
      event.offer_code === expected.offerCode && event.currency === expected.currency && event.value === expected.value;
    const pass = baseline.metrics.overflow === 0 && candidate.metrics.overflow === 0 && geometryPass &&
      pixels.absoluteErrorRatio <= threshold && pixels.normalizedRmse <= threshold && eventPass;
    results.push({ case: testCase.currency + ' ' + testCase.viewport, pass, geometryPass, eventPass,
      overflow: { baseline: baseline.metrics.overflow, candidate: candidate.metrics.overflow },
      absoluteErrorRatio: pixels.absoluteErrorRatio, normalizedRmse: pixels.normalizedRmse });
  }

  if (results.some((result) => !result.pass)) throw new Error('backend-only visual gate failed\n' + JSON.stringify(results, null, 2));
  return JSON.stringify({ threshold, results }, null, 2);
}

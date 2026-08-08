const fs = require('fs');
const path = require('path');
const vm = require('vm');

const base = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(base, 'welcome-page.html'), 'utf8');
const css = fs.readFileSync(path.join(base, 'welcome-page.css'), 'utf8');
const js = fs.readFileSync(path.join(base, 'welcome-page.js'), 'utf8');

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    console.log(`PASS: ${name}`);
    passed += 1;
  } else {
    console.error(`FAIL: ${name}`);
    failed += 1;
  }
}

assert('HTML uses the landing-page wrapper', html.includes('<div id="sn-mw-page">'));
assert('HTML contains no inline style block', !/<style[\s>]/i.test(html));
assert('HTML contains no inline script block', !/<script[\s>]/i.test(html));
assert('HTML exposes four direct age-path links', (html.match(/class="sn-mw-path"/g) || []).length === 4);
assert('HTML keeps the payment settings link', html.includes('https://www.joinsnooze.com/settings/cards'));
assert('HTML keeps the canonical Village link', html.includes('https://www.joinsnooze.com/products/communities/v2/snooze/home'));
assert('HTML keeps the live sessions link', html.includes('https://www.joinsnooze.com/products/communities/v2/snooze/coaching'));
assert('HTML uses the canonical Snooze Library link', html.includes('https://www.joinsnooze.com/snooze-library'));
assert('HTML includes both Kajabi app download links', html.includes('https://apps.apple.com/us/app/kajabi/id1485646310') && html.includes('https://play.google.com/store/apps/details?id=kajabi.kajabiapp'));
assert('HTML uses official app marketplace badges', html.includes('https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg') && html.includes('https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'));
assert('HTML keeps the Sally support email', html.includes('mailto:sally@sleepconcierge.com.au'));
assert('CSS is scoped to the landing-page wrapper', css.includes('#sn-mw-page'));
assert('CSS enforces hidden result state', /\.sn-mw-result\[hidden\][\s\S]*display:\s*none\s*!important/.test(css));
assert('CSS provides a one-column mobile path layout', /@media \(max-width: 640px\)[\s\S]*\.sn-mw-paths[\s\S]*grid-template-columns:\s*1fr/.test(css));
assert('CSS includes reduced-motion handling', css.includes('@media (prefers-reduced-motion: reduce)'));
assert('JS scopes initialization to the page wrapper', js.includes("document.getElementById('sn-mw-page')"));
assert('JS emits the canonical path event', js.includes("emit('onboarding_path_selected'"));
assert('JS emits the canonical Village event', js.includes("emit('village_cta_click'"));
assert('JS emits the live sessions event', js.includes("emit('live_sessions_cta_click'"));
assert('JS emits the app download event', js.includes("emit('app_download_click'"));
assert('JS contains no personal-data fields', !/\b(email|first_name|last_name|phone)\b/.test(js));

function element(attributes = {}) {
  return {
    attributes: { ...attributes },
    listeners: {},
    hidden: true,
    href: attributes.href || '',
    textContent: '',
    setAttribute(name, value) { this.attributes[name] = String(value); },
    getAttribute(name) { return name === 'href' ? this.href : (this.attributes[name] || null); },
    addEventListener(name, callback) { this.listeners[name] = callback; },
    scrollIntoView() { this.scrolled = true; },
    focus() { this.focused = true; }
  };
}

const firstPath = element({
  href: 'https://www.joinsnooze.com/products/newborn-sleep-guide',
  'data-age-band': 'newborn',
  'data-title': 'Newborn Sleep Guide',
  'data-action': 'Open the guide and start with the introduction.'
});
const secondPath = element({
  href: 'https://www.joinsnooze.com/products/toddler-toolkit',
  'data-age-band': 'toddler',
  'data-title': 'Toddler Toolkit',
  'data-action': 'Open the toolkit and begin with the first lesson.'
});
const result = element();
const title = element();
const action = element();
const resultLink = element({ href: 'https://www.joinsnooze.com/snooze-library' });
const villageLink = element({ href: 'https://www.joinsnooze.com/products/communities/v2/snooze/home' });
const villageCardLink = element({ href: 'https://www.joinsnooze.com/products/communities/v2/snooze/home' });
const liveSessionsLink = element({ href: 'https://www.joinsnooze.com/products/communities/v2/snooze/coaching' });
const appLink = element({
  href: 'https://apps.apple.com/us/app/kajabi/id1485646310',
  'data-app-platform': 'ios'
});

const selectorMap = {
  '.sn-mw-path': [firstPath, secondPath],
  '[data-app-platform]': [appLink],
  '#sn-mw-village-link, #sn-mw-village-card-link': [villageLink, villageCardLink],
  '#sn-mw-result': result,
  '#sn-mw-result-title': title,
  '#sn-mw-result-action': action,
  '#sn-mw-result-link': resultLink,
  '#sn-mw-live-sessions-link': liveSessionsLink
};

const root = element();
root.querySelectorAll = selector => selectorMap[selector] || [];
root.querySelector = selector => (Array.isArray(selectorMap[selector]) ? null : selectorMap[selector]) || null;

const context = {
  document: { getElementById: id => id === 'sn-mw-page' ? root : null },
  window: { dataLayer: [], matchMedia: () => ({ matches: true }) },
  console,
  Object,
  Array
};

vm.runInNewContext(js, context);
let prevented = false;
firstPath.listeners.click({ preventDefault() { prevented = true; } });

assert('selection prevents navigation when enhancement is available', prevented);
assert('selection reveals the result', result.hidden === false);
assert('selection marks the active path', firstPath.attributes['aria-current'] === 'true');
assert('selection updates the result title', title.textContent === 'Start with the Newborn Sleep Guide');
assert('selection updates the destination', resultLink.href === firstPath.href);
assert('selection emits one path event', context.window.dataLayer.length === 1 && context.window.dataLayer[0].event === 'onboarding_path_selected');
assert('selection includes the welcome surface', context.window.dataLayer[0].surface === 'membership_welcome');

secondPath.listeners.click({ preventDefault() {} });
assert('second selection resets the first path', firstPath.attributes['aria-current'] === 'false');
assert('second selection marks the new path', secondPath.attributes['aria-current'] === 'true');

villageLink.listeners.click();
const villageEvent = context.window.dataLayer[context.window.dataLayer.length - 1];
assert('Village click emits the expected placement', villageEvent.event === 'village_cta_click' && villageEvent.placement === 'membership_welcome');

liveSessionsLink.listeners.click();
const liveEvent = context.window.dataLayer[context.window.dataLayer.length - 1];
assert('Live sessions click emits the expected placement', liveEvent.event === 'live_sessions_cta_click' && liveEvent.placement === 'membership_welcome');

appLink.listeners.click();
const appEvent = context.window.dataLayer[context.window.dataLayer.length - 1];
assert('app click emits the platform and placement', appEvent.event === 'app_download_click' && appEvent.platform === 'ios' && appEvent.placement === 'membership_welcome');

console.log(`\nSummary: ${passed} passed, ${failed} failed.`);
if (failed) process.exit(1);

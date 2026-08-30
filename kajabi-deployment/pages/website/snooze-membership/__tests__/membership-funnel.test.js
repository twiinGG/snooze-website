#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const DEPLOYMENT_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const WEBSITE_ROOT = path.join(DEPLOYMENT_ROOT, 'pages', 'website');
const membership = fs.readFileSync(path.join(__dirname, '..', 'snooze-membership-page.html'), 'utf8');
const home = fs.readFileSync(path.join(WEBSITE_ROOT, 'home', 'home-page.html'), 'utf8');
const navigation = fs.readFileSync(path.join(DEPLOYMENT_ROOT, 'global', 'html', 'navigation.html'), 'utf8');
const themeCss = fs.readFileSync(path.join(DEPLOYMENT_ROOT, 'global', 'css', 'theme-custom-code.css'), 'utf8');
const headerScripts = fs.readFileSync(path.join(DEPLOYMENT_ROOT, 'global', 'html', 'site-header-page-scripts.html'), 'utf8');

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    passed += 1;
    console.log('PASS: ' + name);
  } else {
    failed += 1;
    console.error('FAIL: ' + name);
  }
}

function hrefs(source) {
  return Array.from(source.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g), match => ({
    tag: match[0],
    href: match[1]
  }));
}

function trialLinks(source) {
  return hrefs(source).filter(link => /7-day free trial|mqQikDM7|Sr6KzShx/.test(link.tag));
}

const allTrialLinks = trialLinks(membership).concat(trialLinks(home), trialLinks(navigation));
const nonTrialOfferPattern = /(z63s9VaR|vYgCNgJz|2150754998|2151256977)/;

assert('membership page uses the required wrapper', membership.includes('<div id="snooze-membership-page">'));
assert('membership wrapper is not a body element', !membership.includes('<body id="snooze-membership-page">'));
assert('membership page has trial links', trialLinks(membership).length >= 3);
assert('homepage has an explicit trial link', trialLinks(home).length >= 1);
assert('navigation has desktop and mobile trial links', trialLinks(navigation).length === 2);
assert('every trial link starts from the USD trial offer', allTrialLinks.every(link => link.href.includes('mqQikDM7')));
assert('no trial link uses the non-trial membership offers', allTrialLinks.every(link => !nonTrialOfferPattern.test(link.href)));
assert('every trial link uses dynamic currency routing', allTrialLinks.every(link => /class="[^"]*dynamic-cta/.test(link.tag) && /data-checkout/.test(link.tag)));

['79', '66', '55'].forEach(value => {
  assert('membership page includes USD price ' + value, membership.includes('data-usd="' + value + '"'));
});
['119', '99', '83'].forEach(value => {
  assert('membership page includes AUD price ' + value, membership.includes('data-aud="' + value + '"'));
});
assert('every pricing card states per month', (membership.match(/membership-price-period">per month/g) || []).length === 3);
assert('every AUD pricing card suppresses the redundant A prefix', (membership.match(/data-symbol-aud="\$"/g) || []).length === 3);
assert('currency engine honours per-price symbol overrides', headerScripts.includes('symbolOverride !== null ? symbolOverride'));
assert('quarterly card retains the original featured treatment', membership.includes('membership-price-card membership-price-card-highlight'));
assert('monthly card says cancel anytime', membership.includes('<p class="membership-saving">Cancel anytime</p>'));
assert('quarterly card avoids a cross-currency percentage claim', membership.includes('<p class="membership-saving">Flexible 3-month billing</p>'));
assert('annual card says save 30%', membership.includes('<p class="membership-saving">Save 30%</p>'));
assert('pricing cards omit currency-specific savings copy', !/Save \d+% in USD|Save \d+% in AUD/.test(membership));
assert('pricing cards omit non-canonical trial totals', !/data-usd="(?:197|657)"|data-aud="(?:299|997)"/.test(membership));

assert('membership page links payment settings', membership.includes('https://www.joinsnooze.com/settings/cards'));
assert('membership page states login is required', /Login required/i.test(membership));
assert('membership page does not select a pricing variant', !/[?&]variant=/.test(membership));
assert('navigation removes the expired launch banner', !navigation.includes('sn-launch-banner'));

const membershipBaseIndex = themeCss.indexOf('#snooze-membership-page {');
const membershipPriceCardIndex = themeCss.indexOf('#snooze-membership-page .membership-price-card {');
assert('membership base scope exists', membershipBaseIndex >= 0);
assert('membership base scope comes before component styles', membershipBaseIndex >= 0 && membershipPriceCardIndex > membershipBaseIndex);
assert('shared CSS scope includes the membership wrapper', themeCss.includes('#snooze-membership-page'));

assert('membership view_item is implemented', headerScripts.includes("trackEvent('ecommerce', 'view_item'"));
assert('currency change includes previous currency', headerScripts.includes("'previous_currency': previousCurrency"));
assert('currency change includes current currency', headerScripts.includes("'currency': currency"));
assert('currency change derives a normalized surface', headerScripts.includes("'surface': String(surfaceValue).replace(/-/g, '_')"));

const currentSurfaceText = [membership, home, navigation].join('\n').toLowerCase();
['weekly live group coaching', '24/7 support', 'snooze social', 'choose your plan after the trial', 'money-back guarantee'].forEach(phrase => {
  assert('current surfaces exclude stale phrase: ' + phrase, !currentSurfaceText.includes(phrase));
});

const websiteFiles = [];
function walk(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'home-page-live-source.html') websiteFiles.push(fullPath);
  });
}
walk(WEBSITE_ROOT);
const staleMembershipLinks = websiteFiles.filter(file => fs.readFileSync(file, 'utf8').includes('href="/snooze-access"'));
assert('website page sources contain no old membership discovery link', staleMembershipLinks.length === 0);

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);

#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const deploymentRoot = path.resolve(__dirname, '../../..');
const active = path.join(deploymentRoot, 'global/html/gtm-begin-checkout-datalayer.html');
const preimage = path.join(
  deploymentRoot,
  '_live-preimages/gtm/2026-08-30-workspace-64-tag-0.1-begin-checkout-pre.html'
);

if (!fs.readFileSync(active).equals(fs.readFileSync(preimage))) {
  console.error('FAIL: active GTM source differs from the verified version 62 rollback preimage');
  process.exit(1);
}

console.log('PASS: active GTM source matches the verified version 62 rollback preimage');

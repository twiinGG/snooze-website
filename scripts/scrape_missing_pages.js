#!/usr/bin/env node
/**
 * Scrape Missing Pages
 * Uses Apify MCP to scrape missing pages from sitemap and store in Supabase.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qwwwosoafcsupebpangw.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const APIFY_TOKEN = process.env.APIFY_TOKEN;

if (!SUPABASE_KEY) {
  console.error('❌ SUPABASE_ANON_KEY not found in environment');
  process.exit(1);
}

if (!APIFY_TOKEN) {
  console.error('❌ APIFY_TOKEN not found in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Missing URLs from sitemap verification
const MISSING_URLS = [
  'https://joinsnooze.com/snooze',
  'https://joinsnooze.com/snooze-library',
  'https://joinsnooze.com/snooze-waitlist',
  'https://joinsnooze.com/toddler-sleep-help'
];

/**
 * Extract text content from HTML
 */
function extractTextContent(html) {
  if (!html) return '';
  
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Extract text from HTML
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/\s+/g, ' ');
  text = text.trim();
  
  return text;
}

/**
 * Extract headings from HTML
 */
function extractHeadings(html) {
  if (!html) return { h1s: [], h2s: [], h3s: [] };
  
  const h1s = (html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, '').trim())
    .filter(h => h.length > 0);
  
  const h2s = (html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, '').trim())
    .filter(h => h.length > 0);
  
  const h3s = (html.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, '').trim())
    .filter(h => h.length > 0);
  
  return { h1s, h2s, h3s };
}

/**
 * Extract meta description from HTML
 */
function extractMetaDescription(html) {
  if (!html) return null;
  
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Extract canonical URL from HTML
 */
function extractCanonical(html) {
  if (!html) return null;
  
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Extract title from HTML
 */
function extractTitle(html) {
  if (!html) return null;
  
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

/**
 * Store scraped page in Supabase
 */
async function storePage(url, html, title) {
  const contentText = extractTextContent(html);
  const headings = extractHeadings(html);
  const metaDescription = extractMetaDescription(html);
  const canonical = extractCanonical(html);
  const wordCount = contentText.split(/\s+/).filter(w => w.length > 0).length;
  
  // Determine category based on URL
  let category = null;
  let subCategory = null;
  
  if (url.includes('/blog/')) {
    category = 'lead_capture';
  } else if (url.includes('/products/')) {
    category = 'lead_capture';
    subCategory = 'product';
  } else if (url.includes('/downloads/')) {
    category = 'lead_capture';
    subCategory = 'downloadable';
  } else if (url.includes('/offers/')) {
    category = 'checkout';
  } else if (url.includes('snooze')) {
    category = 'lead_capture';
  } else if (url.includes('waitlist')) {
    category = 'lead_capture';
  } else {
    category = 'lead_capture';
  }
  
  const pageData = {
    url,
    html,
    title: title || extractTitle(html),
    meta_description: metaDescription,
    canonical,
    h1s: headings.h1s,
    h2s: headings.h2s,
    h3s: headings.h3s,
    word_count: wordCount,
    category,
    sub_category: subCategory,
    scraped_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('page_scrape_data')
    .upsert(pageData, {
      onConflict: 'url',
      ignoreDuplicates: false
    });
  
  if (error) {
    console.error(`  ❌ Error storing ${url}:`, error.message);
    return false;
  }
  
  console.log(`  ✅ Stored: ${url} (${wordCount} words, ${headings.h1s.length} H1s, ${headings.h2s.length} H2s)`);
  return true;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Scraping Missing Pages\n');
  console.log(`📋 URLs to scrape: ${MISSING_URLS.length}\n`);
  
  // Note: This script expects to be called with Apify MCP tools
  // The actual scraping will be done via MCP tools in the implementation
  // This script provides the structure for processing and storing results
  
  console.log('⚠️  This script requires Apify MCP integration.');
  console.log('📝 Missing URLs:');
  MISSING_URLS.forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`);
  });
  
  console.log('\n💡 Use Apify MCP tools to scrape these URLs, then process results with this script.');
  
  return MISSING_URLS;
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ Script complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

module.exports = { storePage, MISSING_URLS };





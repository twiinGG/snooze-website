#!/usr/bin/env node
/**
 * Analyze Scraped Website Data
 * Phase 1.1: Analyze all scraped pages from page_scrape_data table
 * Generates comprehensive inventory and analysis for migration planning.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qwwwosoafcsupebpangw.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ SUPABASE_ANON_KEY not found in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Main analysis function
 */
async function analyzeScrapedData() {
  console.log('📊 Analyzing Scraped Website Data\n');
  
  // Fetch all scraped pages
  console.log('📥 Fetching all scraped pages...');
  const { data: pages, error } = await supabase
    .from('page_scrape_data')
    .select('*')
    .like('url', '%sleepconcierge%')
    .order('url');
  
  if (error) {
    console.error('❌ Error fetching pages:', error);
    return;
  }
  
  console.log(`✅ Found ${pages.length} pages\n`);
  
  // Analyze by category
  const byCategory = {};
  const bySubCategory = {};
  const blogPosts = [];
  const productPages = [];
  const landingPages = [];
  const otherPages = [];
  
  pages.forEach(page => {
    const category = page.category || 'uncategorized';
    const subCategory = page.sub_category || 'none';
    
    // Count by category
    byCategory[category] = (byCategory[category] || 0) + 1;
    bySubCategory[subCategory] = (bySubCategory[subCategory] || 0) + 1;
    
    // Categorize pages
    if (page.url.includes('/blog/')) {
      blogPosts.push(page);
    } else if (page.url.includes('/products/')) {
      productPages.push(page);
    } else if (page.url.includes('/downloads/')) {
      productPages.push(page); // Downloadables are also product pages
    } else if (page.category === 'lead_capture' && !page.url.includes('/blog/')) {
      landingPages.push(page);
    } else {
      otherPages.push(page);
    }
  });
  
  // Generate report
  const report = {
    summary: {
      total_pages: pages.length,
      categories: Object.keys(byCategory).length,
      blog_posts: blogPosts.length,
      product_pages: productPages.length,
      landing_pages: landingPages.length,
      other_pages: otherPages.length
    },
    by_category: byCategory,
    by_sub_category: bySubCategory,
    blog_posts: blogPosts.map(p => ({
      url: p.url,
      title: p.title,
      word_count: p.word_count,
      scraped_at: p.scraped_at
    })),
    product_pages: productPages.map(p => ({
      url: p.url,
      title: p.title,
      word_count: p.word_count
    })),
    landing_pages: landingPages.map(p => ({
      url: p.url,
      title: p.title,
      word_count: p.word_count,
      category: p.category
    })),
    all_pages: pages.map(p => ({
      url: p.url,
      title: p.title,
      category: p.category,
      sub_category: p.sub_category,
      word_count: p.word_count,
      h1_count: (p.h1s || []).length,
      h2_count: (p.h2s || []).length
    }))
  };
  
  // Save report
  const outputPath = path.join(__dirname, '../docs/PAGE-INVENTORY.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  
  console.log('📊 Analysis Summary:');
  console.log(`  Total pages: ${report.summary.total_pages}`);
  console.log(`  Blog posts: ${report.summary.blog_posts}`);
  console.log(`  Product pages: ${report.summary.product_pages}`);
  console.log(`  Landing pages: ${report.summary.landing_pages}`);
  console.log(`  Other pages: ${report.summary.other_pages}`);
  console.log(`\n📁 Report saved to: ${outputPath}`);
  
  return report;
}

if (require.main === module) {
  analyzeScrapedData()
    .then(() => {
      console.log('\n✅ Analysis complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

module.exports = { analyzeScrapedData };





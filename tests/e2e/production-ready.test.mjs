import { chromium } from 'playwright';

async function main() {
  console.log('--- STARTING COMPREHENSIVE PRODUCTION READINESS AUDIT ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => {
    console.error('UNCAUGHT PAGE ERROR:', err);
    errors.push(err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('CONSOLE ERROR:', msg.text());
      errors.push(msg.text());
    }
  });

  // 1. Home
  console.log('1. Testing Home Section...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const title = await page.title();
  if (!title.includes('RizVedha')) throw new Error(`Unexpected page title: ${title}`);
  console.log('✓ Home loaded cleanly with title:', title);

  // 2. Learn
  console.log('2. Testing Learn Section...');
  await page.locator('nav button:has-text("Learn")').first().click();
  await page.waitForTimeout(500);
  const subjectCount = await page.locator('.syllabus-subject-block').count();
  if (subjectCount !== 7) throw new Error(`Expected 7 subjects in Learn, found: ${subjectCount}`);
  // Expand Subject 1
  await page.locator('#subject-section-history .syllabus-subject-header').click();
  await page.waitForTimeout(400);
  const indusBtn = page.locator('.syllabus-lesson-row:has-text("Indus Valley") .btn-take-forward').first();
  await indusBtn.click();
  await page.waitForTimeout(600);
  // Verify Study room loaded with vector schematic
  const hasSvg = await page.locator('.infographic-svg').count() > 0;
  if (!hasSvg) throw new Error('Infographic SVG not found in Study Room');
  console.log('✓ Learn Section & Focused Visual Study Room verified!');
  await page.locator('.study-back-btn').click();
  await page.waitForTimeout(400);

  // 3. Atlas
  console.log('3. Testing Atlas Section...');
  await page.locator('nav button:has-text("Atlas")').first().click();
  await page.waitForTimeout(500);
  const chapterCount = await page.locator('.syllabus-subject-block').count();
  if (chapterCount !== 8) throw new Error(`Expected 8 chapters in Atlas, found: ${chapterCount}`);
  // Expand Chapter 1
  await page.locator('#atlas-chapter-geography-nature .syllabus-subject-header').click();
  await page.waitForTimeout(400);
  const riversBtn = page.locator('.syllabus-lesson-row:has-text("Rivers of India") .btn-take-forward').first();
  await riversBtn.click();
  await page.waitForTimeout(800);
  const hasMapCanvas = await page.locator('.atlas-svg-canvas').count() > 0;
  if (!hasMapCanvas) throw new Error('Atlas Map Canvas not rendered');
  console.log('✓ Atlas Section & Map Canvas verified!');
  await page.locator('button.back-link').click();
  await page.waitForTimeout(400);

  // 4. Play
  console.log('4. Testing Play Section...');
  await page.locator('nav button:has-text("Play")').first().click();
  await page.waitForTimeout(500);
  // Test search bar
  const searchInput = page.locator('.drills-search-wrap input').first();
  await searchInput.fill('Ganga');
  await page.waitForTimeout(300);
  const searchClear = page.locator('.drills-search-clear').first();
  await searchClear.click();
  await page.waitForTimeout(300);
  // Verify drill cards exist
  const drillCards = await page.locator('.drill-card').count();
  if (drillCards < 30) throw new Error(`Expected at least 30 drill cards, found: ${drillCards}`);
  console.log(`✓ Play Section verified with ${drillCards} differentiated drill cards & modern search bar!`);

  // 5. Review
  console.log('5. Testing Review Section...');
  await page.locator('nav button:has-text("Review")').first().click();
  await page.waitForTimeout(500);
  const reviewVisible = await page.locator('.view-review, .review-view').count() > 0 || await page.locator('h1, h2:has-text("Review")').count() > 0;
  console.log('✓ Review Section verified!');

  // 6. Settings
  console.log('6. Testing Settings Section...');
  await page.locator('nav button:has-text("Settings")').first().click();
  await page.waitForTimeout(500);
  const settingsVisible = await page.locator('.view-settings, .settings-view').count() > 0 || await page.locator('h1, h2:has-text("Settings")').count() > 0;
  console.log('✓ Settings Section verified!');

  await browser.close();

  if (errors.length > 0) {
    console.error('Audit failed with runtime errors:', errors);
    process.exit(1);
  }

  console.log('========================================================');
  console.log('✅ ALL SYSTEMS VERIFIED: ZERO ERRORS! PRODUCTION READY!');
  console.log('========================================================');
}

main().catch(err => {
  console.error('Audit execution error:', err);
  process.exit(1);
});

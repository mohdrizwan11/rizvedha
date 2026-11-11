import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Click on Atlas tab
  console.log('Switching to Atlas tab...');
  const atlasNav = page.locator('nav button:has-text("Atlas")').first();
  await atlasNav.click();
  await page.waitForTimeout(600);

  // Screenshot 1: All 8 Chapters Collapsed by default
  const snap1 = path.join(ARTIFACT_DIR, 'rizvedha-19-atlas-chapters-collapsed-default.png');
  await page.screenshot({ path: snap1, fullPage: true });
  console.log(`Saved screenshot 1: ${snap1}`);

  // Click Chapter 1 (Geography & Nature) to expand
  console.log('Opening Chapter 1: Geography & Nature...');
  const chap1 = page.locator('#atlas-chapter-geography-nature .syllabus-subject-header').first();
  await chap1.click();
  await page.waitForTimeout(600);

  // Screenshot 2: Chapter 1 Expanded showing subtopics with "Take You Forward" arrows
  const snap2 = path.join(ARTIFACT_DIR, 'rizvedha-20-atlas-chapter1-expanded.png');
  await page.screenshot({ path: snap2, fullPage: true });
  console.log(`Saved screenshot 2: ${snap2}`);

  // Click on Rivers "Take You Forward" button
  console.log('Opening Rivers of India map via Take You Forward arrow...');
  const riversBtn = page.locator('.syllabus-lesson-row:has-text("Rivers of India") .btn-take-forward').first();
  await riversBtn.click();
  await page.waitForTimeout(1000);

  // Screenshot 3: Rivers Map Workspace
  const snap3 = path.join(ARTIFACT_DIR, 'rizvedha-21-atlas-rivers-map-workspace.png');
  await page.screenshot({ path: snap3, fullPage: true });
  console.log(`Saved screenshot 3: ${snap3}`);

  // Go back to Atlas Chapters
  console.log('Returning back to Atlas Chapters...');
  const backBtn = page.locator('button.back-link').first();
  await backBtn.click();
  await page.waitForTimeout(600);

  // Ensure Chapter 1 is open
  const isChap1Open = (await page.locator('#atlas-chapter-geography-nature.is-open').count()) > 0;
  if (!isChap1Open) {
    await page.locator('#atlas-chapter-geography-nature .syllabus-subject-header').first().click();
    await page.waitForTimeout(500);
  }

  console.log('Opening Power Plants to verify clean markers without label clutter...');
  const powerPlantsBtn = page.locator('.syllabus-lesson-row:has-text("Power Plants") .btn-take-forward').first();
  await powerPlantsBtn.click();
  await page.waitForTimeout(1200);

  // Screenshot 4: Power Plants clean markers
  const snap4 = path.join(ARTIFACT_DIR, 'rizvedha-22-atlas-power-plants-clean-dots.png');
  await page.screenshot({ path: snap4, fullPage: true });
  console.log(`Saved screenshot 4: ${snap4}`);

  await browser.close();
  console.log('Playwright tests completed successfully!');
}

main().catch(err => {
  console.error('Playwright error:', err);
  process.exit(1);
});

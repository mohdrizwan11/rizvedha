import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // 1. Switch to Play tab
  console.log('Inspecting Play tab: Upgraded Search Bar and Differentiated Drill Cards...');
  await page.locator('nav button:has-text("Play")').first().click();
  await page.waitForTimeout(600);

  const snap1 = path.join(ARTIFACT_DIR, 'rizvedha-24-play-upgraded-search-and-differentiated-drills.png');
  await page.screenshot({ path: snap1, fullPage: true });
  console.log(`Saved screenshot 1: ${snap1}`);

  // Test typing into Play search bar
  console.log('Testing Play search input...');
  const searchInput = page.locator('.drills-search-wrap input').first();
  await searchInput.fill('River');
  await page.waitForTimeout(400);

  const snap2 = path.join(ARTIFACT_DIR, 'rizvedha-25-play-search-active-with-clear-btn.png');
  await page.screenshot({ path: snap2, fullPage: true });
  console.log(`Saved screenshot 2: ${snap2}`);

  // Clear search
  const clearBtn = page.locator('.drills-search-clear').first();
  await clearBtn.click();
  await page.waitForTimeout(300);

  // 2. Switch to Atlas tab to check chapter block differentiation
  console.log('Inspecting Atlas tab: Thematic Differentiation between 8 Chapters...');
  await page.locator('nav button:has-text("Atlas")').first().click();
  await page.waitForTimeout(600);

  const snap3 = path.join(ARTIFACT_DIR, 'rizvedha-26-atlas-chapters-differentiated.png');
  await page.screenshot({ path: snap3, fullPage: true });
  console.log(`Saved screenshot 3: ${snap3}`);

  // 3. Switch to Learn tab to check subject block differentiation
  console.log('Inspecting Learn tab: Thematic Differentiation between 7 Subjects...');
  await page.locator('nav button:has-text("Learn")').first().click();
  await page.waitForTimeout(600);

  const snap4 = path.join(ARTIFACT_DIR, 'rizvedha-27-learn-subjects-differentiated.png');
  await page.screenshot({ path: snap4, fullPage: true });
  console.log(`Saved screenshot 4: ${snap4}`);

  await browser.close();
  console.log('All differentiation and Play search tests completed!');
}

main().catch(err => {
  console.error('Playwright error:', err);
  process.exit(1);
});


import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Switch to Atlas
  await page.locator('nav button:has-text("Atlas")').first().click();
  await page.waitForTimeout(500);

  // Switch to Telugu via lang pill
  const langPill = page.locator('.atlas-hub-actions .lang-pill').first();
  await langPill.click();
  await page.waitForTimeout(500);

  // Expand Chapter 1
  await page.locator('#atlas-chapter-geography-nature .syllabus-subject-header').first().click();
  await page.waitForTimeout(500);

  // Screenshot 5: Atlas in Telugu with Chapter 1 expanded
  const snap5 = path.join(ARTIFACT_DIR, 'rizvedha-23-atlas-telugu-syllabus.png');
  await page.screenshot({ path: snap5, fullPage: true });
  console.log(`Saved screenshot 5: ${snap5}`);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

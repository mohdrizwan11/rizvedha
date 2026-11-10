import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function captureMore() {
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Go to Learn
  await page.click('button.navitem:has-text("Learn")');
  await page.waitForTimeout(600);

  // Scroll down to show compare table, mnemonic, story cards, mini-quiz
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'vedha-04-learn-table-quiz.png') });

  // Click Mauryan Empire pill
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('.track-pill:has-text("Mauryan")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'vedha-04b-learn-mauryan.png') });

  // Switch to Telugu on Learn
  const langBtn = page.locator('.header-lang-btn');
  await langBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'vedha-04c-learn-telugu.png') });

  await browser.close();
}

captureMore().catch(err => { console.error(err); process.exit(1); });

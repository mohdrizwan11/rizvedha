import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Home view with RizVedha branding & sections
  console.log('Capturing Home...');
  await page.screenshot({ path: path.join(outDir, 'rizvedha-01-home.png') });

  // 2. Open Atlas
  console.log('Navigating to Atlas...');
  await page.click('button.navitem:has-text("Atlas")');
  await page.waitForTimeout(800);

  // Open Power Plants (The exact topic from user screenshot!)
  console.log('Opening Power Plants in Atlas...');
  await page.click('.atlas-topic-card:has-text("Power Plants")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-02-atlas-power-plants.png') });

  // 3. Open Rivers of India in Atlas
  console.log('Going back and opening Rivers of India...');
  await page.click('button.back-link');
  await page.waitForTimeout(500);
  await page.click('.atlas-topic-card:has-text("Rivers of India")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-03-atlas-rivers.png') });

  console.log('Screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});


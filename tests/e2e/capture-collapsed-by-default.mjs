import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Navigate to Learn view
  console.log('Navigating to Learn view...');
  await page.click('button.navitem:has-text("Learn")');
  await page.waitForTimeout(1000);

  // Verify all 7 are collapsed by default
  console.log('Capturing all 7 subjects collapsed by default...');
  await page.screenshot({ path: path.join(outDir, 'rizvedha-17-learn-all-collapsed-default.png') });

  // 2. Open Subject 1: History of India
  console.log('Opening History subject...');
  await page.click('#subject-section-history .syllabus-subject-header');
  await page.waitForTimeout(600);
  console.log('Capturing History expanded with subtopics and take-forward buttons...');
  await page.screenshot({ path: path.join(outDir, 'rizvedha-18-learn-one-subject-opened.png') });

  console.log('Captures completed successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});

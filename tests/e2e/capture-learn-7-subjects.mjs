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

  // 1. Navigate to Learn
  console.log('Navigating to Learn view...');
  await page.click('button.navitem:has-text("Learn")');
  await page.waitForTimeout(1000);

  // Screenshot 1: 7 Subjects Top Directory
  console.log('Capturing 7 Subjects Master Directory...');
  await page.screenshot({ path: path.join(outDir, 'rizvedha-10-learn-7-subjects.png') });

  // Screenshot 2: Scroll down to show other subjects (Geography, Polity)
  console.log('Scrolling down to Geography & Polity...');
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-11-learn-scroll-subjects.png') });

  // Screenshot 3: Scroll back up and click on a subtopic card (e.g. Indus Valley or Mauryan)
  console.log('Opening a subtopic study room...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const firstCard = await page.$('.subtopic-card');
  if (firstCard) {
    await firstCard.click();
    await page.waitForTimeout(1000);
    console.log('Capturing Study Room...');
    await page.screenshot({ path: path.join(outDir, 'rizvedha-12-learn-study-mode.png') });

    // Scroll down inside study room to show the centered infographic and active recall table
    console.log('Scrolling down inside Study Room...');
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'rizvedha-13-learn-study-infographic.png') });
  }

  console.log('Captures completed successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});


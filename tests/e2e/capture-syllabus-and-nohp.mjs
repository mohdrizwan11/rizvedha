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

  // 1. Learn view: Syllabus Accordion with "Take You Forward"
  console.log('Navigating to Learn view...');
  await page.click('button.navitem:has-text("Learn")');
  await page.waitForTimeout(1000);
  console.log('Capturing Learn Syllabus with arrow down & take-forward arrows...');
  await page.screenshot({ path: path.join(outDir, 'rizvedha-14-learn-syllabus-accordion.png') });

  // 2. Play view: Chapter challenges (No 2 HP!)
  console.log('Navigating to Play view...');
  await page.click('button.navitem:has-text("Play")');
  await page.waitForTimeout(800);

  console.log('Switching to Chapter Challenges tab...');
  await page.click('.play-tabs button:has-text("Chapter")');
  await page.waitForTimeout(600);
  console.log('Capturing Chapter Challenges list (no 2 HP badge)...');
  await page.screenshot({ path: path.join(outDir, 'rizvedha-15-play-chapter-nohp.png') });

  // 3. Start a chapter challenge to show no HP hearts in HUD
  console.log('Launching a Chapter Challenge...');
  const startBtn = await page.$('.boss-card button.primary');
  if (startBtn) {
    await startBtn.click();
    await page.waitForTimeout(600);
    console.log('Capturing active chapter challenge with score HUD (no HP hearts)...');
    await page.screenshot({ path: path.join(outDir, 'rizvedha-16-play-active-challenge-nohp.png') });
  }

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});

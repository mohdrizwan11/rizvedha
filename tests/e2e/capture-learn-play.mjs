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

  // 1. Learn View
  console.log('Navigating to Learn...');
  await page.click('button.navitem:has-text("Learn")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-04-learn-curriculum.png') });

  // 2. Play View - 33 Drills
  console.log('Navigating to Play (33 Drills)...');
  await page.click('button.navitem:has-text("Play")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-05-play-drills.png') });

  // 3. Play - Start a drill
  console.log('Starting Rivers Drill...');
  const firstDrill = await page.$('.drill-card');
  if (firstDrill) {
    await firstDrill.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'rizvedha-06-play-active-drill.png') });
    // Click back to all 33 topics
    await page.click('.session-top-bar button');
    await page.waitForTimeout(500);
  }

  // 4. Play - Boss Battles Tab
  console.log('Switching to Chapter Bosses tab...');
  await page.click('.play-tabs button:has-text("Chapter Bosses")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-07-play-boss-battles.png') });

  // 5. Play - Exam Simulator Tab
  console.log('Switching to Exam Simulator tab...');
  await page.click('.play-tabs button:has-text("Exam Simulator")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-08-play-exam-simulator.png') });

  // 6. Play - Speed Blitz Tab
  console.log('Switching to Speed Blitz tab...');
  await page.click('.play-tabs button:has-text("Speed Blitz")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'rizvedha-09-play-speed-blitz.png') });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});

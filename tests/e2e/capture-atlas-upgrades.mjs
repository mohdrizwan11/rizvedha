import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  // 1. Capture Home with the top-positioned Open/Close toggle button
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rizvedha-sidebar-top-toggle.png') });
  console.log('Captured 1: rizvedha-sidebar-top-toggle.png');

  // Navigate to Atlas
  await page.locator('button.navitem:has-text("Atlas")').first().click();
  await page.waitForTimeout(800);

  // 2. Open Rivers of India
  await page.locator('.atlas-topic-card:has-text("Rivers of India")').first().click();
  await page.waitForTimeout(1200);
  // Click reveal on the flashcard
  const revealBtn = page.locator('.flashcard-reveal-btn').first();
  if (await revealBtn.isVisible()) {
    await revealBtn.click();
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rizvedha-rivers-flashcard.png') });
  console.log('Captured 2: rizvedha-rivers-flashcard.png');

  // Go back using button.back-link
  await page.click('button.back-link');
  await page.waitForTimeout(600);

  // 3. Open Lakes of India (was empty before, now rich metrics + flashcard)
  await page.locator('.atlas-topic-card:has-text("Lakes of India")').first().click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rizvedha-lakes-filled.png') });
  console.log('Captured 3: rizvedha-lakes-filled.png');

  // Go back
  await page.click('button.back-link');
  await page.waitForTimeout(600);

  // 4. Open Mountain Peaks (now pan-India: South, Central, East, West, North-East)
  await page.locator('.atlas-topic-card:has-text("Mountain Peaks")').first().click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rizvedha-peaks-pan-india.png') });
  console.log('Captured 4: rizvedha-peaks-pan-india.png');

  // Go back
  await page.click('button.back-link');
  await page.waitForTimeout(600);

  // 5. Open Soil Types (rich soil groups, metrics & flashcards)
  await page.locator('.atlas-topic-card:has-text("Soil Types")').first().click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rizvedha-soils-filled.png') });
  console.log('Captured 5: rizvedha-soils-filled.png');

  // Go back
  await page.click('button.back-link');
  await page.waitForTimeout(600);

  // 6. Open Physical India (Mountain passes, plateaus, features)
  await page.locator('.atlas-topic-card:has-text("Physical India")').first().click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rizvedha-physical-india.png') });
  console.log('Captured 6: rizvedha-physical-india.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(console.error);

import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function main() {
  const browser = await chromium.launch({ headless: true });
  // iPhone 14 / modern phone viewport: 390 x 844
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  console.log('Navigating to http://localhost:5173 on mobile viewport 390x844...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // 1. Home
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-01-home.png'), fullPage: false });
  // Also scroll a bit on Home to see resume cards & quick atlas
  await page.evaluate(() => window.scrollBy(0, 360));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-01b-home-scrolled.png'), fullPage: false });
  await page.evaluate(() => window.scrollTo(0, 0));

  // 2. Navigate to Learn
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-nav button'));
    const btn = btns.find(b => b.innerText.includes('Learn') || b.innerText.includes('నేర్చుకోండి'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-02-learn.png'), fullPage: false });

  // 3. Expand History in Learn
  await page.locator('#subject-section-history .syllabus-subject-header').first().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-03-learn-expanded.png'), fullPage: false });

  // 4. Navigate to Atlas
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-nav button'));
    const btn = btns.find(b => b.innerText.includes('Atlas') || b.innerText.includes('అట్లాస్'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-04-atlas.png'), fullPage: false });

  // 5. Expand Chapter 1 in Atlas
  await page.locator('#atlas-chapter-geography-nature .syllabus-subject-header').first().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-05-atlas-expanded.png'), fullPage: false });

  // 6. Open Rivers of India in Atlas
  const riversBtn = page.locator('.syllabus-lesson-row:has-text("Rivers of India") .btn-take-forward').first();
  await riversBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-06-atlas-map.png'), fullPage: false });

  // 7. Scroll down to inspector on Atlas
  await page.evaluate(() => window.scrollBy(0, 420));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-07-atlas-inspector.png'), fullPage: false });

  // 8. Navigate to Play
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-nav button'));
    const btn = btns.find(b => b.innerText.includes('Play') || b.innerText.includes('సాధన'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-08-play.png'), fullPage: false });

  // 9. Navigate to Review
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-nav button'));
    const btn = btns.find(b => b.innerText.includes('Review') || b.innerText.includes('పునశ్చరణ'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-09-review.png'), fullPage: false });

  // 10. Navigate to Settings
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-nav button'));
    const btn = btns.find(b => b.innerText.includes('Settings') || b.innerText.includes('అమరికలు'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-10-settings.png'), fullPage: false });

  // Also test 360x800 (Compact Android screen)
  await page.setViewportSize({ width: 360, height: 800 });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.mobile-nav button'));
    const btn = btns.find(b => b.innerText.includes('Home') || b.innerText.includes('హోమ్'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mob-fixed-11-android-360-home.png'), fullPage: false });

  await browser.close();
  console.log('All mobile verification screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


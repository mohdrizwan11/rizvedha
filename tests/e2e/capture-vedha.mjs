import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/mohdr/.gemini/antigravity/brain/48ca57df-be8a-416a-9e7b-8dffed51ba62';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Home English
  console.log('Capturing Home English...');
  await page.screenshot({ path: path.join(outDir, 'vedha-01-home.png') });

  // 2. Home Telugu
  console.log('Switching to Telugu...');
  const langBtn = page.locator('.header-lang-btn');
  await langBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'vedha-02-home-telugu.png') });

  // Switch back to English for Learn view
  await langBtn.click();
  await page.waitForTimeout(300);

  // 3. Learn View - Indus Valley
  console.log('Navigating to Learn view...');
  await page.click('button.navitem:has-text("Learn")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'vedha-03-learn-indus.png') });

  // 4. Learn View - Rivers & Drainage
  console.log('Selecting Rivers in Learn...');
  const riversNav = page.locator('.topic-nav-card:has-text("Himalayan vs Peninsular Rivers")');
  if (await riversNav.count() > 0) {
    await riversNav.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'vedha-04-learn-rivers.png') });
  }

  // 5. Atlas Map View with Enlarged Left Inspector
  console.log('Navigating to Atlas...');
  await page.click('button.navitem:has-text("Atlas")');
  await page.waitForTimeout(600);
  
  // Click Rivers of India topic card
  console.log('Opening Rivers of India in Atlas...');
  await page.click('.atlas-topic-card:has-text("Rivers of India")');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, 'vedha-05-atlas-left-inspector.png') });

  // 6. Atlas in Telugu
  console.log('Switching Atlas to Telugu...');
  await langBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'vedha-06-atlas-telugu.png') });
  await langBtn.click(); // switch back

  // 7. Play Section
  console.log('Navigating to Play...');
  await page.click('button.navitem:has-text("Play")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'vedha-07-play.png') });

  // 8. Review Section
  console.log('Navigating to Review...');
  await page.click('button.navitem:has-text("Review")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'vedha-08-review.png') });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});


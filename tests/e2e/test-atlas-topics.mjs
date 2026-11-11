import { chromium } from 'playwright';

async function testAll() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  // Navigate to Atlas using button.navitem
  await page.locator('button.navitem:has-text("Atlas")').first().click();
  await page.waitForTimeout(1000);

  const topicsToCheck = [
    { slug: 'lakes', title: 'Lakes of India' },
    { slug: 'soils', title: 'Soil Types' },
    { slug: 'mountain-peaks', title: 'Mountain Peaks' },
    { slug: 'physical-india', title: 'Physical India' },
    { slug: 'rivers', title: 'Rivers of India' }
  ];

  for (const t of topicsToCheck) {
    console.log(`\n=== Testing ${t.title} (${t.slug}) ===`);
    const card = page.locator(`.atlas-topic-card:has-text("${t.title}")`).first();
    await card.click();
    await page.waitForTimeout(1500);

    const markerCount = await page.locator('.atlas-marker').count();
    const lineCount = await page.locator('.atlas-line-wrap').count();
    const inspectorTitle = await page.locator('.inspector-main-title').textContent().catch(() => 'NONE');
    const factText = await page.locator('.fact-text').textContent().catch(() => 'NONE');
    const metricsCount = await page.locator('.metric-box').count();

    console.log(`Markers: ${markerCount}, Lines: ${lineCount}`);
    console.log(`Inspector title: "${inspectorTitle.trim()}"`);
    console.log(`Metrics boxes: ${metricsCount}`);
    console.log(`Fact preview: "${factText.trim().slice(0, 60)}..."`);

    await page.screenshot({ path: `tests/e2e/${t.slug}-debug.png` });

    // Go back
    await page.click('button:has-text("Back to 33 Topics")');
    await page.waitForTimeout(600);
  }

  console.log('\nPage Errors caught:', errors);
  await browser.close();
}

testAll().catch(console.error);

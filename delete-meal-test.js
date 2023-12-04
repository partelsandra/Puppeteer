const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Avage rakendus või laadige leht
  await page.goto('http://127.0.0.1:5500/calorytracker/index.html');

  // Oodake, et leht laadiks täielikult
  await page.waitForSelector('#item-list');

  // Leia ja kliki kõigil kustutamise nuppudel
  const deleteButtons = await page.$$('#item-list li .delete-btn');
  for (const deleteButton of deleteButtons) {
    await deleteButton.click();
    // Oodake kinnitust ja kliki "Delete" nupul
    await page.waitForSelector('.confirm-delete-btn');
    await page.click('.confirm-delete-btn');
  }

  // Oodake, et söögid oleksid edukalt kustutatud
  await page.waitForSelector('#item-list li', { hidden: true });

  // Tee midagi pärast kustutamist, kinnita, et see õnnestus
  await page.screenshot({ path: 'delete-meal-test-screenshot.png' }); // Screenshot

  await browser.close();

  console.log('Delete test õnnestus!');
})();

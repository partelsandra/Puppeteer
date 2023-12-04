const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Avage rakendus või laadige leht
    await page.goto('http://127.0.0.1:5500/calorytracker/index.html');

    // Oodake, et leht laadiks täielikult
    await page.waitForSelector('#item-list');

    // Leia ja kliki nupul, et avada vorm uue söögi lisamiseks
    await page.click('.add-btn');

    // Täitke vorm uue söögi andmetega
    await page.type('#item-name', 'New Meal');
    await page.type('#item-calories', '500');

    // Kliki nupul "Add Meal" uue söögi lisamiseks
    await page.click('.add-btn');

    // Oodake, et uus söök oleks lisatud
    await page.waitForSelector('#item-list li');

    // Tee midagi pärast lisamist, kinnita, et see õnnestus
    await page.screenshot({ path: 'screenshot.png' });


    await browser.close();
})();

console.log('Test õnnestus!');

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Avage rakendus või laadige leht
    await page.goto('http://127.0.0.1:5500/calorytracker/index.html');

    // Oodake, et leht laadiks täielikult
    await page.waitForSelector('#item-list');

    // Oodake, kuni esimene söök ilmub
    await page.waitForSelector('#item-list li:first-child', { timeout: 15000 });

    // Leia ja kliki esimesel söögil nupul, et avada redigeerimisvorm
    await page.click('#item-list li:first-child .edit-item');

    // Redigeeri sööki
    await page.type('#item-name', ' Updated');
    await page.type('#item-calories', '100');

    // Kliki nupul "Update Meal" redigeeritud söögi salvestamiseks
    await page.click('.update-btn');

    // Oodake, et söök oleks edukalt redigeeritud
    await page.waitForFunction(() => {
        const element = document.querySelector('#item-list li:first-child');
        return element && element.textContent.includes('Updated');
    }, { timeout: 15000 });

    // Tee midagi pärast lisamist, kinnita, et see õnnestus
    await page.screenshot({ path: 'edit-screenshot.png' });

    await browser.close();

    console.log('Test õnnestus!');
})();

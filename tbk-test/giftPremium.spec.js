const { Builder, By, until } = require('selenium-webdriver');
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function giftPremium() {
    let driver;
    try {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://web.telegram.org/");

        // await sleep(20000);
        await driver.manage().setTimeouts({ implicit: 20000 });
        await driver.manage().window().maximize();
        await sleep(15000);

        // let inputChat = await driver.findElement(By.xpath('//*[@id="column-center"]/div/div/div[4]/div/div[1]/div/div[8]/div[2]/div[1]'));
        // await inputChat.sendKeys('123');
        // // tbk_stg_bot

        let TBKBot = await driver.findElement(By.xpath('//*[@id="column-left"]/div/div/div[1]/div[2]/input'));
        await TBKBot.click();

        await driver.sleep(2000);
        await TBKBot.sendKeys('tbk_stg_bot');

        let clickBot = await driver.findElement(By.xpath('//*[@id="search-container"]/div[2]/div[2]/div/div[1]/div/div[1]/ul/a'));
        await clickBot.click();
        await sleep(3000);

        let startBot = await driver.findElement(By.xpath('//*[@id="column-center"]/div/div/div[4]/div/div[1]/div/div[8]/div[1]'));
        await startBot.click();
        await sleep(2000);

        let launchBot = await driver.findElement(By.xpath('/html/body/div[7]/div/div[2]/button[1]'));
        await launchBot.click();


        // iframe = /html/body/div[7]/div/div[2]/div/div[1]/iframe
    } catch (error) {

    }
    // await driver.quit();
})();
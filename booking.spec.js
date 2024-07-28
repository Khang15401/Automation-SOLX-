const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { Select } = require("selenium-webdriver");

(async function bookingTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://admlucid.com/golf");

    await driver.manage().setTimeouts({ implicit: 500 });
    await driver.manage().window().maximize();

    let bookBox = await driver.findElement(By.css('body > div > main > table:nth-child(8) > tbody > tr > td:nth-child(4) > form > button'));
    await bookBox.click();

    let selectElement = await driver.findElement(By.name('GolfName'));
    const select = new Select(selectElement);
    await select.selectByVisibleText('Sky Golf Course')

    let customerTbox = await driver.findElement(By.name('Customer'));
    await customerTbox.sendKeys('Khang Nguyen');

    let emailTbox = await driver.findElement(By.name('Email'));
    await emailTbox.sendKeys('akhang131@gmail.com');

    let phoneTbox = await driver.findElement(By.name('Phone'));
    await phoneTbox.sendKeys('0341451515');

    let DateTbox = await driver.findElement(By.name('Date'));
    await DateTbox.sendKeys('05/29/2024');

    let startTbox = await driver.findElement(By.name('StartTime'));
    await startTbox.sendKeys('07:30AM');
    
    let endTbox = await driver.findElement(By.name('EndTime'));
    await endTbox.sendKeys('10:30AM');

    let createButton = await driver.findElement(By.xpath('/html/body/div/main/div[1]/div/form/div[8]/input'));
    await createButton.click();

    console.log('Done');

  } catch (e) {
  } finally {
    await driver.quit();
  }
})();

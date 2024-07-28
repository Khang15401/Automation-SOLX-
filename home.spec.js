const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const assert = require("assert");
const { elementIsEnabled } = require('selenium-webdriver/lib/until');
 
(async function example() {
  let driver 
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://admlucid.com/')
    

    let title = await driver.getTitle();
    console.log('*******HOMEPAGE TITLE*******'+ title);
    assert.equal("Home Page - Admlucid", title);

    await driver.manage().setTimeouts({implicit: 500});
    await driver.manage().window().maximize();


    let url = await driver.getCurrentUrl();
    console.log('*******CURRENT URL*******'+url);

    await driver.navigate().to('https://admlucid.com/Home/Selenium');

    let message = await driver.findElement(By.xpath('//*[@id="Selenium"]/h1'))
    await driver.wait(elementIsEnabled(message),2000);
    
    let value = (await message.getText()).trim();
    assert.equal("Selenium Automation Testing", value);

    console.log('*******PAGE HEADER*******'+value);

  } catch (e) {
    console.log(e)
  }finally {
    // await driver.quit();
  }
})()
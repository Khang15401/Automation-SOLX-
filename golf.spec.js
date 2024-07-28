const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

(async function golfTest() {
  let driver;
  
  try {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get("https://admlucid.com/golf");
    
      await driver.manage().setTimeouts({ implicit: 500 });
      await driver.manage().window().maximize();
    
    //   let textBox = await driver.findElement(By.name("SearchString"));
    //   let submitButton = await driver.findElement(
    //     By.css(
    //       "body > div > main > table:nth-child(8) > tbody > tr > td:nth-child(1) > form > button"
    //     )
    //   );
    let textBox = await driver.findElement(By.name("CurrentFilter"));
      let FilterButton = await driver.findElement(
        By.css(
          "body > div > main > table:nth-child(8) > tbody > tr > td:nth-child(2) > form > fieldset > button"
        )
      );
    
      await textBox.sendKeys('Australia');
      await FilterButton.click();
    
    //   let message = await driver.findElement(By.xpath('/html/body/div/main/table[2]/tbody/tr/td[1]'))
    //   let value = (await message.getText()).trim();
    //   assert.equal('Tiger A', value) ; console.log('Cell value ****'+value);
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();

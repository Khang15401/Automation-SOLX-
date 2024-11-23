const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function loginAndSaveCookies() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Điều hướng đến trang Telegram Web
    await driver.get('https://web.telegram.org/');
    await driver.manage().setTimeouts({ implicit: 20000 });
    await driver.manage().window().maximize();
    
    await driver.sleep(40000);


    let localData = await driver.executeScript('return JSON.stringify(window.localStorage);');

    fs.writeFileSync('telegram_local.json', localData);
    console.log('Session và cookies đã được lưu thành công.');
    
  } finally {
    await driver.quit();
  }
})();

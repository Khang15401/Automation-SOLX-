const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function swapTest() {
  let driver;
  try {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://solx-stg.blocktrend.xyz/");
    await sleep(10000);
    await driver.manage().setTimeouts({ implicit: 20000 });
    await driver.manage().window().maximize();
    
    let originalWindow = await driver.getWindowHandle();
    let initialWindowHandles = await driver.getAllWindowHandles();

    let connectButton = await driver.findElement(By.xpath('//*[@id="nav_bar"]/div[3]/button[2]'));
    await connectButton.click();

    let solflareButton = await driver.findElement(By.xpath('//*[@id="v-menu-20"]/div/div/div[1]'));
    await solflareButton.click();

    await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 30000);
    let iframe = await driver.findElement(By.xpath('/html/body/div[3]/iframe'));
    await driver.switchTo().frame(iframe);

    let newWallet = await driver.findElement(By.xpath('//*[@id="connect-web-button"]'));
    await newWallet.click();

    await sleep(5000)

    let newWindowHandle;
    let allWindowHandles = await driver.getAllWindowHandles();

    for (let handle of allWindowHandles) {
        await driver.switchTo().window(handle);
        let url = await driver.getCurrentUrl();
        await sleep(2000);
        if (url === 'https://solflare.com/onboard') {
            newWindowHandle = handle;
            break;
        }
    }

    if (!newWindowHandle) {
        throw new Error('Không tìm thấy cửa sổ mới với URL mong muốn');
    }

    await driver.switchTo().window(newWindowHandle);
    await sleep(5000);

    let alreadyWallet = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/button'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", alreadyWallet);
    await driver.executeScript("arguments[0].click();", alreadyWallet);
    await sleep(2000);

    let mnemonicWords = [
      "obtain", "lobster", "taste", "debate",
      "fuel", "journey", "jacket", "either",
      "mouse", "immense", "seek", "inherit"
    ];

    for (let i = 0; i < mnemonicWords.length; i++) {
      let input = driver.findElement(By.id(`mnemonic-input-${i}`));
      await input.sendKeys(mnemonicWords[i]);
    }

    let continueBtn = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[2]/button[2]'));
    await continueBtn.click();

    let pressPW = driver.findElement(By.name("password"));
    await pressPW.sendKeys("123456789");

    let repeatPW = driver.findElement(By.name("password2"));
    await repeatPW.sendKeys("123456789");

    let continuePW = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[2]/button[2]'));
    await continuePW.click();

    let importAllButton = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/button[1]'));
    await importAllButton.click();

    let enterSolana = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/button[2]'));
    await enterSolana.click();

    await driver.close();

    await driver.switchTo().window(originalWindow);

    let connectButton1 = await driver.findElement(By.xpath('//*[@id="nav_bar"]/div[3]/button[2]'));
    await connectButton1.click();

    let solflareButton1 = await driver.findElement(By.xpath('//*[@id="v-menu-20"]/div/div/div[1]'));
    await solflareButton1.click();
    await sleep(3000);

    await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 21000);
    let iframe1 = await driver.findElement(By.xpath('/html/body/div[3]/iframe'));
    await driver.switchTo().frame(iframe1);

    let newWallet1 = await driver.findElement(By.xpath('//*[@id="connect-web-button"]'));
    await newWallet1.click();

    await driver.wait(async () => {
      let handles = await driver.getAllWindowHandles();
      return handles.length > initialWindowHandles.length;
    }, 20000);

    // Lấy lại tất cả các handle của cửa sổ sau khi cửa sổ mới mở
    let allWindowHandles1 = await driver.getAllWindowHandles();

    // Tìm handle của cửa sổ mới (khác với các handle ban đầu)
    let newWindowHandle1 = allWindowHandles1.find(
      (handle) => !initialWindowHandles.includes(handle)
    );

    // Chuyển sang cửa sổ mới
    await driver.switchTo().window(newWindowHandle1);

    let connectWallet = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div[3]/div/button[2]'));
    // await connectWallet.click();
    await driver.executeScript("arguments[0].click();", connectWallet);
    await driver.switchTo().window(originalWindow);
    await sleep(2000);

    let boostButton = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[1]/button[2]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", boostButton);
    await sleep(3000);
    await boostButton.click();

    await driver.wait(until.elementLocated(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[1]/button[3]')), 30000);
    let swapSection = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[1]/button[3]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", swapSection);
    await swapSection.click();
    await sleep(4000);

    for (let i = 0; i < 1; i++) {
      await sleep(2000);
      let inputButton = await driver.findElement(By.xpath('//*[@id="input_mint"]'));
      await inputButton.sendKeys("10");

      await sleep(2000);

      let swapButton = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div[2]/div/button'));
      await driver.executeScript("arguments[0].click();", swapButton);

      await driver.wait(async () => {
        let handles = await driver.getAllWindowHandles();
        return handles.length > initialWindowHandles.length;
      }, 21000);
      
      // Lấy lại tất cả các handle của cửa sổ sau khi cửa sổ mới mở
      let allWindowHandles2 = await driver.getAllWindowHandles();
      
      // Tìm handle của cửa sổ mới (khác với các handle ban đầu)
      let newWindowHandle2 = allWindowHandles2.find(
        (handle) => !initialWindowHandles.includes(handle)
      );
      
      // Chuyển sang cửa sổ mới
      await driver.switchTo().window(newWindowHandle2);
      
      let approveButton = await driver.findElement(
        By.xpath(
          "/html/body/div[2]/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/button[2]"
        )
      );
      await approveButton.click();
      
      await driver.switchTo().window(originalWindow);

      let notification = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="toast-content"]/div[contains(text(),"Swap successful! SOL added to your wallet.")]')), 50000);
      let message = await notification.getText();


      if (message.includes("Swap successful! SOL added to your wallet.")) { // Điều chỉnh điều kiện này theo thông điệp thực tế của bạn
        console.log('Test Case 1: Pass');
        console.log('|-------------------|--------|')
        console.log('| Test Case         | Result |')
        console.log('|-------------------|--------|')
        console.log('| TestCase 1        | Pass   |')
        console.log('|-------------------|--------|')

        // fs.writeFileSync('test-results.txt', '| Test Case | Result |\n', { flag: 'a' });
        // fs.writeFileSync('test-results.txt', '|-----------|--------|\n', { flag: 'a' });
        // fs.writeFileSync('test-results.txt', '| TestCase 1| Pass   |\n', { flag: 'a' });
    } else {
        console.log('Test Case 1: Fail');
        console.log('|-------------------|--------|')
        console.log('| Test Case         | Result |')
        console.log('|-------------------|--------|')
        console.log('| TestCase 1        | Fail   |')
        console.log('|-------------------|--------|')
    }

      await sleep(2000)

    }
  } catch (e) {
    console.error("Đã xảy ra lỗi:", e);
  }
  await driver.quit();
})();

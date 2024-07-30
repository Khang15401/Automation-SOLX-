const { Builder, By, until } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");
const fs = require('fs');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function mintTest() {
    let driver;
    try {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get("https://solx-stg.blocktrend.xyz/");
      // await driver.get('https://solx.community/');

      await sleep(10000);
      await driver.manage().setTimeouts({ implicit: 20000 });
      await driver.manage().window().maximize();

      // Luu cua so ban dau
      let originalWindow = await driver.getWindowHandle();
      let initialWindowHandles = await driver.getAllWindowHandles();
      // await sleep(3000);
      // let hideNotiupdate = await driver.findElement(By.xpath('/html/body/div[3]/div/div/div[1]/div/div[3]/header/img'));
      // await hideNotiupdate.click();

      let connectButton = await driver.findElement(By.xpath('//*[@id="nav_bar"]/div[3]/button[2]'));
        await connectButton.click();

        let solflareButton = await driver.findElement(By.xpath('//*[@id="v-menu-21"]/div/div/div[1]'));
        await solflareButton.click();

      // Chờ iframe xuất hiện và chuyển đổi vào iframe
      await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 20000);
      let iframe = await driver.findElement(By.xpath('/html/body/div[3]/iframe'));
      await driver.switchTo().frame(iframe);

      // await sleep(10000);
      let newWallet = await driver.findElement(
        By.xpath('//*[@id="connect-web-button"]')
      );
      await newWallet.click();

      await sleep(5000)


      let newWindowHandle;
      let allWindowHandles = await driver.getAllWindowHandles();

      for (let handle of allWindowHandles) {
          await driver.switchTo().window(handle);
          let url = await driver.getCurrentUrl();
          if (url === 'https://solflare.com/onboard') {
              newWindowHandle = handle;
              break;
          }
      }

      if (!newWindowHandle) {
          throw new Error('Không tìm thấy cửa sổ mới với URL mong muốn');
      }

      // Chuyển sang cửa sổ mới
      await driver.switchTo().window(newWindowHandle);
      await sleep(5000);

      let alreadyWallet = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/button'));
      // await driver.executeScript("arguments[0].scrollIntoView(true);", alreadyWallet);
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
      };

      let continueBtn = driver.findElement(
        By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[2]/button[2]')
      );
      await continueBtn.click();

      let pressPW = driver.findElement(By.name("password"));
      await pressPW.sendKeys("123456789");

      let repeatPW = driver.findElement(By.name("password2"));
      await repeatPW.sendKeys("123456789");

      let continuePW = driver.findElement(
        By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[2]/button[2]')
      );
      await continuePW.click();

      let importAllButton = driver.findElement(
        By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/button[1]')
      );
      await importAllButton.click();

      let enterSolana = driver.findElement(
        By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/button[2]')
      );
      await enterSolana.click();

      await driver.close();

      // Quay ve cua so chinh va thuc hien ket noi lan nua
      await driver.switchTo().window(originalWindow);

      let connectButton1 = await driver.findElement(By.xpath('//*[@id="nav_bar"]/div[3]/button[2]'));
      await connectButton1.click();

      let solflareButton1 = await driver.findElement(By.xpath('//*[@id="v-menu-21"]/div/div/div[1]'));
      await solflareButton1.click();

      await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 20000);
      let iframe1 = await driver.findElement(By.xpath('/html/body/div[3]/iframe'));
      await sleep(2000);
      await driver.switchTo().frame(iframe1);

      let newWallet1 = await driver.findElement(
        By.xpath('//*[@id="connect-web-button"]')
      );
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
        await connectWallet.click();
        await driver.switchTo().window(originalWindow);
        await sleep(2000);

      // for (let i=0; i<5; i++){

        
        let mintButton = await driver.findElement(
        By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[1]/button[1]')
      );
      
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        mintButton
      );
      
      await sleep(4000);
      
      let claimSOLXMinted = await driver.findElement(By.xpath('//*[@id="stake_group"]/div[2]/div[2]/div/div[1]/div[2]/button/div'));
      await driver.executeScript("arguments[0].click();", claimSOLXMinted)

      await sleep(3000);
      
      // Thực hiện Mint
      // let inputButton = await driver.findElement(
      //   By.xpath('//*[@id="input_mint"]')
      // );
      // await inputButton.sendKeys("0.00001");
      
      // let checkboxBtn = await driver.findElement(
      //   By.xpath('//*[@id="checkbox-1"]')
      // );
      // let isChecked = await checkboxBtn.isSelected();
      // if (!isChecked) {
      //   // Nếu chưa được tích, tích vào checkbox
      //   await driver.executeScript("arguments[0].click();", checkboxBtn);
      // }
      // await sleep(4000)
      
      // let contributeButton = await driver.findElement(
      //   By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div[2]/button/div')
      // );
      // // await driver.executeScript("arguments[0].scrollIntoView(true);", contributeButton);
      // // await sleep(2000);
      // // await contributeButton.click();
      // await driver.executeScript("arguments[0].click();", contributeButton)
      
      
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

      let notification = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="toast-content"]/div[contains(text(),"Claim SOLX successful! Check your wallet for SOLX.")]')), 50000);
      let message = await notification.getText();


      if (message.includes("Claim SOLX successful! Check your wallet for SOLX.")) { // Điều chỉnh điều kiện này theo thông điệp thực tế của bạn
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
      
      // await sleep(10000);
      // let elementAgain = await driver.findElement(
      //   By.xpath('//*[@id="stake_group"]/div[2]/div[1]/div/div[1]/div[2]/div/span/span/span/div')
      // );
      
      // // Lấy giá trị của thuộc tính 'value' của phần tử lần nữa
      // let valueAgain = await elementAgain.getText();
      // console.log(valueAgain);
      
      // await sleep(60000);
      // let valueAgain1 = await elementAgain.getText();
      // console.log(valueAgain1);
      
      // if (valueAgain < valueAgain1) {
      //   console.log("Case Pass");
      // }
      
      // if (valueAgain < valueAgain1) {
        // await driver.quit();
      // }
    // }
    } catch (e) {
      console.error("Đã xảy ra lỗi:", e);
    } finally {
    //   if (valueAgain < valueAgain1) {
        await driver.quit();
    //   }
    }
  }
// }
)();

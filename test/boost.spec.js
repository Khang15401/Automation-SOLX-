const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const assert = require('assert');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

( async function boostTest() {
    let driver;

     try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://solx-stg.blocktrend.xyz/');

        await sleep(10000);
        await driver.manage().setTimeouts({ implicit: 20000 });
        await driver.manage().window().maximize();

        let originalWindow = await driver.getWindowHandle();
        let initialWindowHandles = await driver.getAllWindowHandles();

        // await sleep(3000);
        // let hideNotiupdate = await driver.findElement(By.xpath('//*[@id="term_of_use"]/header/img'));
        // await hideNotiupdate.click();

        let connectButton = await driver.findElement(By.xpath('//*[@id="nav_bar"]/div[3]/button[2]'));
        await connectButton.click();
        //*[@id="nav_bar"]/div[3]/button[2]

        let solflareButton = await driver.findElement(By.xpath('//*[@id="v-menu-20"]/div/div/div[1]'));
        await solflareButton.click();

        // Chờ iframe xuất hiện và chuyển đổi vào iframe
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 20000);
        
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

        // Chuyển sang cửa sổ mới
        await driver.switchTo().window(newWindowHandle);
        await sleep(5000);


        let alreadyWallet = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/button'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", alreadyWallet);
        // await alreadyWallet.click();
        await driver.executeScript("arguments[0].click();", alreadyWallet)
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
        
        let pressPW = driver.findElement(By.name('password'));
        await pressPW.sendKeys('123456789')

        let repeatPW = driver.findElement(By.name('password2'));
        await repeatPW.sendKeys('123456789')

        let continuePW = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[2]/button[2]'));
        await continuePW.click();

        let importAllButton = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/div/button[1]'));
        await importAllButton.click();

        let enterSolana = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/button[2]'));
        await enterSolana.click();

        await driver.close();

        // Quay ve cua so chinh va thuc hien ket noi lan nua
        await driver.switchTo().window(originalWindow);

        let connectButton1 = await driver.findElement(By.xpath('//*[@id="nav_bar"]/div[3]/button[2]'));
        await connectButton1.click();

        let solflareButton1 = await driver.findElement(By.xpath('//*[@id="v-menu-20"]/div/div/div[1]'));
        await solflareButton1.click();

        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 20000);
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
        let newWindowHandle1 = allWindowHandles1.find(handle => !initialWindowHandles.includes(handle));

        // Chuyển sang cửa sổ mới
        await driver.switchTo().window(newWindowHandle1);

        let connectWallet = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div[3]/div/button[2]'))
        await connectWallet.click();

        await driver.switchTo().window(originalWindow);
        await sleep(2000);

        
        let boostSection = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[1]/button[2]'));
        
        await driver.executeScript("arguments[0].scrollIntoView(true);", boostSection);
        await sleep(3000);
        
        await boostSection.click();
        
        await sleep(2000);
        
        for (let i = 0; i < 5; i++ ) {
        
        await sleep(2000);

        let inputBoost = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div/div[1]/div[3]/div/div/div[2]/div[1]/input'));
        await inputBoost.sendKeys("100");
        
        let boostButton = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div/div[2]/div/button/div'))
        // await boostButton.click();
        await driver.executeScript("arguments[0].click();", boostButton);

        await driver.wait(async () => {
            let handles = await driver.getAllWindowHandles();
            return handles.length > initialWindowHandles.length;
        }, 10000);

        // Lấy lại tất cả các handle của cửa sổ sau khi cửa sổ mới mở
        let allWindowHandles2 = await driver.getAllWindowHandles();

        // Tìm handle của cửa sổ mới (khác với các handle ban đầu)
        let newWindowHandle2 = allWindowHandles2.find(handle => !initialWindowHandles.includes(handle));
        
        // Chuyển sang cửa sổ mới
        await driver.switchTo().window(newWindowHandle2);

        let approveButton = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/button[2]'));
        await approveButton.click();

        await driver.switchTo().window(originalWindow);

        await sleep(5000)
     }  

     } catch (error) {
    }
    // await driver.quit();

})();
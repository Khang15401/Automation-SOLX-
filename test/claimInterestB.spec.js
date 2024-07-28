const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const assert = require('assert');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

( async function claimInterBTest() {
    let driver;

     try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://app-core-client.vercel.app/');
        // https://app-core-client-wnru.vercel.app/
        // https://app-core-client.vercel.app/
        // MicrosoftEdge

        await sleep(10000);
        await driver.manage().setTimeouts({ implicit: 20000 });
        await driver.manage().window().maximize();

        let originalWindow = await driver.getWindowHandle();

        // await sleep(3000);
        // let hideNotiupdate = await driver.findElement(By.xpath('//*[@id="term_of_use"]/header/img'));
        // await hideNotiupdate.click();

        let connectButton = await driver.findElement(By.xpath('//*[@id="app"]/div[1]/div/nav/div/div[3]/button[2]/div'));
        await connectButton.click();
        //*[@id="app"]/div[1]/div/nav/div/div[3]/button[2]/div

        let solflareButton = await driver.findElement(By.xpath('//*[@id="v-menu-3"]/div/div/div[1]'));
        await solflareButton.click();

        // Chờ iframe xuất hiện và chuyển đổi vào iframe
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 20000);
        
        let iframe = await driver.findElement(By.xpath('/html/body/div[3]/iframe'));
        await driver.switchTo().frame(iframe);

        let newWallet = await driver.findElement(By.xpath('//*[@id="connect-web-button"]'));
        await newWallet.click();

        let initialWindowHandles = await driver.getAllWindowHandles();
        await sleep(2000)

        // Chờ cho số lượng cửa sổ tăng lên
        await driver.wait(async () => {
            let handles = await driver.getAllWindowHandles();
            return handles.length > initialWindowHandles.length;
        }, 20000);

        // Lấy lại tất cả các handle của cửa sổ sau khi cửa sổ mới mở
        let allWindowHandles = await driver.getAllWindowHandles();

        // Tìm handle của cửa sổ mới (khác với các handle ban đầu)
        let newWindowHandle = allWindowHandles.find(handle => !initialWindowHandles.includes(handle));
        await sleep(5000)

        // Chuyển sang cửa sổ mới
        await driver.switchTo().window(newWindowHandle);

        // await sleep(20000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/button')), 20000);
        let alreadyWallet = driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[2]/button'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", alreadyWallet);
        await sleep(2000);
        // await alreadyWallet.click();
        await driver.executeScript("arguments[0].click();", alreadyWallet)

        let inputOne = driver.findElement(By.id('mnemonic-input-0'));
        await inputOne.sendKeys('obtain')

        let input2 = driver.findElement(By.id('mnemonic-input-1'));
        await input2.sendKeys('lobster')

        let input3 = driver.findElement(By.id('mnemonic-input-2'));
        await input3.sendKeys('taste')

        let input4 = driver.findElement(By.id('mnemonic-input-3'));
        await input4.sendKeys('debate')

        let input5 = driver.findElement(By.id('mnemonic-input-4'));
        await input5.sendKeys('fuel')

        let input6 = driver.findElement(By.id('mnemonic-input-5'));
        await input6.sendKeys('journey')

        let input7 = driver.findElement(By.id('mnemonic-input-6'));
        await input7.sendKeys('jacket')

        let input8 = driver.findElement(By.id('mnemonic-input-7'));
        await input8.sendKeys('either')

        let input9 = driver.findElement(By.id('mnemonic-input-8'));
        await input9.sendKeys('mouse')

        let input10 = driver.findElement(By.id('mnemonic-input-9'));
        await input10.sendKeys('immense')

        let input11 = driver.findElement(By.id('mnemonic-input-10'));
        await input11.sendKeys('seek')

        let input12 = driver.findElement(By.id('mnemonic-input-11'));
        await input12.sendKeys('inherit')

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

        let connectButton1 = await driver.findElement(By.xpath('//*[@id="app"]/div[1]/div/nav/div/div[3]/button[2]/div'));
        await connectButton1.click();

        let solflareButton1 = await driver.findElement(By.xpath('//*[@id="v-menu-3"]/div/div/div[1]'));
        await solflareButton1.click();

        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/iframe')), 20000);
        let iframe1 = await driver.findElement(By.xpath('/html/body/div[3]/iframe'));
        await driver.switchTo().frame(iframe1);

        let newWallet1 = await driver.findElement(By.xpath('//*[@id="connect-web-button"]'));
        await newWallet1.click();


        ////
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
        await sleep(3000);

        
        let boostButton = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[1]/button[2]'));
        
        await driver.executeScript("arguments[0].scrollIntoView(true);", boostButton);
        await sleep(3000);
        
        await boostButton.click();
        
        await sleep(2000);
        
        let withdrawnBtn = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div/div[1]/div[2]/div[2]/div/button/div'));
        await withdrawnBtn.click();
        
        let withdrawnInterButton = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div/div[1]/div[3]/div[1]/div[2]'));
        await withdrawnInterButton.click();
        
        await sleep(2000);
        
        for (let i = 0; i < 5; i++ ) {
        
        let withdrawnButton = await driver.findElement(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div/div[2]/button[2]/div'))
        await withdrawnButton.click();

        await sleep(7000);

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
        await sleep(125000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="home"]/div[2]/div/div[3]/div[2]/div/div[2]/div/div[2]/button[2]/div')), 130000);
     }   
     } catch (error) {
    }
    await driver.quit();

})();
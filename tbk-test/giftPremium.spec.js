const { Builder, By, until } = require('selenium-webdriver');
const edge = require("selenium-webdriver/edge");
const fs = require('fs');
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
        // await sleep(15000);


        // (async function loginAndSaveCookies() {
        //     let driver = await new Builder().forBrowser('chrome').build();
        //     try {
        //         // Điều hướng đến trang Telegram Web
        //         await driver.get('https://web.telegram.org/');

        //         // Thời gian cho bạn thực hiện đăng nhập thủ công bằng mã QR hoặc mã xác nhận
        //         console.log('Bạn có 1 phút để đăng nhập thủ công...');
        //         await driver.sleep(60000); // Đợi 1 phút cho người dùng đăng nhập thủ công

        //         // Sau khi đăng nhập thành công, lấy tất cả cookies
        //         let cookies = await driver.manage().getCookies();

        //         // Lưu cookies vào một file JSON
        //         fs.writeFileSync('telegram_cookies.json', JSON.stringify(cookies));
        //         console.log('Cookies đã được lưu thành công');

        //     } finally {
        //         await driver.quit();
        //     }
        // })();

        // Đọc dữ liệu từ file JSON và chuyển đổi thành một đối tượng JavaScript
        let localData = JSON.parse(fs.readFileSync('telegram_local.json', 'utf-8'));

        // Khôi phục lại dữ liệu từ localStorage
        await driver.executeScript(`
            const data = arguments[0];
            Object.keys(data).forEach(key => {
                window.localStorage.setItem(key, data[key]);
            });
        `, localData);

        // Tải lại trang để áp dụng phiên
        // await driver.navigate().refresh();

        // Thêm thời gian chờ để đảm bảo đăng nhập hoàn tất
        await driver.sleep(5000);

        console.log('Đăng nhập thành công bằng dữ liệu đã lưu!');


        let TBKBot = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="column-left"]/div/div/div[1]/div[2]/input')),
            30000
        );
        await TBKBot.click();

        await driver.sleep(2000);
        await TBKBot.sendKeys('tbk_stg_bot');

        let clickBot = await driver.findElement(By.xpath('//*[@id="search-container"]/div[2]/div[2]/div/div[1]/div/div[1]/ul/a/div[1]'));
        await clickBot.click();
        await sleep(3000);

        let startBot = await driver.findElement(By.xpath('//*[@id="column-center"]/div/div/div[4]/div/div[1]/div/div[8]/div[1]'));
        await startBot.click();
        await sleep(2000);

        let launchBot = await driver.findElement(By.xpath('/html/body/div[7]/div/div[2]/button[1]'));
        await launchBot.click();

        await driver.wait(until.elementLocated(By.xpath('/html/body/div[7]/div/div[2]/div/div[1]/iframe')), 20000);
        let iframe = await driver.findElement(By.xpath('/html/body/div[7]/div/div[2]/div/div[1]/iframe'));
        await driver.switchTo().frame(iframe);

        await sleep(2000);

        // navigate setting
        // await driver.executeScript(`
        //     window.location.href = '/setting';
            
        // `);

        // await driver.wait(until.titleContains("Setting"), 10000)

        // let connectWallet = await driver.findElement(By.xpath("//div[@role='tabpanel' and contains(@id, 'react-aria')]/div[2]/button"));
        // await connectWallet.click();

        // let Tonkeeper = await driver.findElement(By.xpath('//*[@id="tc-widget-root"]/tc-root/div/div/div[1]/div/ul/li[2]/button'));
        // await Tonkeeper.click();


        // iframe = /html/body/div[7]/div/div[2]/div/div[1]/iframe
    } catch (error) {

    }
    // await driver.quit();
})();
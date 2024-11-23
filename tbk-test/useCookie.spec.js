const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function reuseTelegramSession() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://web.telegram.org/');

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
        await driver.navigate().refresh();

        // Thêm thời gian chờ để đảm bảo đăng nhập hoàn tất
        await driver.sleep(5000);

        console.log('Đăng nhập thành công bằng dữ liệu đã lưu!');
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    } finally {
        // await driver.quit();
    }
})();

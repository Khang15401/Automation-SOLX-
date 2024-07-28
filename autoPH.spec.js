const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCssProperties(element) {
    const fontFamily = await element.getCssValue('font-family');
    const color = await element.getCssValue('color');
    const fontSize = await element.getCssValue('font-size');
    const fontWeight = await element.getCssValue('font-weight');
    
    return {
        'font-family': fontFamily,
        'color': color,
        'font-size': fontSize,
        'font-weight': fontWeight
    };
}

(async function autoPH() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://luz-molina.dev-tn.com/');

        await driver.manage().setTimeouts({implicit: 10000});
        await driver.manage().window().maximize();

        await sleep(5000);

        // let element = await driver.findElement(By.className('elementor-heading-title elementor-size-default'));
        
        // let styleValue = await element.getCssValue('background-color')
        // let fontFamily = await element.getCssValue('font-family')
        // let color = await element.getCssValue('color')
        // let fontSize = await element.getCssValue('font-size')
        // let fontWeight = await element.getCssValue('font-weight')

        let elements = await driver.findElements(By.css('*'));

        for (let element of elements) {
            try {
                let tagName = await element.getTagName();
                let cssProperties = await getCssProperties(element);
                console.log(`Element: <${tagName}>`);
                console.log(cssProperties);
            } catch (err) {
                console.error('Error fetching CSS properties:', err);
            }
        }


        // console.log('Font-family:', fontFamily);
        // console.log('Size:', color);
        // console.log('Font-size:', fontSize);
        // console.log('Font-weight:', fontWeight);

    } catch (e) {
        console.error('error:', e);
    } finally {
        // await driver.quit();
    }
})();
const { AfterAll, setDefaultTimeout } = require("cucumber");
const {Builder, By } = require('selenium-webdriver');
require("chromedriver");
setDefaultTimeout(60 * 1000);

const driver = new Builder().forBrowser('chrome').build();

AfterAll('end session', async function () {
    await driver.quit();
});

module.exports = {
    driver
}
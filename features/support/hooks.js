const { BeforeAll, setDefaultTimeout } = require("cucumber");
const {Builder, By } = require('selenium-webdriver');
require("chromedriver");
setDefaultTimeout(60 * 1000);

const driver = new Builder().forBrowser('chrome').build();

module.exports = {
    driver
}
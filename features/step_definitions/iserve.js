const { Given, When, Then, After, Before, setDefaultTimeout } = require('cucumber');
const { Builder, Capabilities } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require('assert');
const hook = require('../support/hooks')
const driver = hook.driver;
require('dotenv').config()

// require("chromedriver");
// setDefaultTimeout(60 * 1000);

// driver setup
// let driver = new Builder().forBrowser('chrome').build();
// let driver;
// Before( async function () {
//     const capabilities = Capabilities.chrome();
//     capabilities.set('chromeOptions', { "w3c": false });
//     driver = new Builder().withCapabilities(capabilities).build();    
// })
// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions', { "w3c": false });
// const driver = new Builder().withCapabilities(capabilities).build();

Given(/I open iServe website/, async () => {
    await driver.get(process.env.ISERVE_URL);
    await driver.sleep(3000);
})

When(/^I do login at iServe website$/, async function() {
        await driver.findElement({ css: "input#login_username"}).click();
        await driver.findElement({ css: "input#login_username"}).sendKeys(process.env.ISERVE_USERNAME);
        await driver.sleep(1000);
        await driver.findElement({ css: "input#login_password"}).click();
        await driver.findElement({ css: "input#login_password"}).sendKeys(process.env.ISERVE_PASSWORD);
        await driver.sleep(2000);
});

When(/I click Sign In button/, async () => {
    await driver.findElement({ css: "div button"}).click();
    await driver.sleep(5000);
})

Then(/I can see "([^"]*)"$/, async (item)  => {
    let wording = await driver.findElement({css:"div h3"}).getText();
    await assert.ok(wording.includes(item));
    await driver.sleep(3000);
})

// After('end', async function () {
//     await driver.quit();
// });
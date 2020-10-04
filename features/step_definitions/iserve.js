const { Given, When, Then, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require('assert');
require('dotenv').config()

require("chromedriver");
setDefaultTimeout(60 * 1000);

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given(/I open iServe website/, async () => {
    await driver.get(process.env.ISERVE_URL);
    await driver.sleep(3000);
})

When(/^I do login at iServe website$/, 
    async function() {
        await driver.findElement({ css: "input#login_username"}).click();
        await driver.findElement({ css: "input#login_username"}).sendKeys(process.env.ISERVE_USERNAME);
        await driver.sleep(1000);
        await driver.findElement({ css: "input#login_password"}).click();
        await driver.findElement({ css: "input#login_password"}).sendKeys(process.env.ISERVE_PASSWORD);
        await driver.sleep(5000);
    });

When(/I click Sign In button/, async () => {
    await driver.findElement({ css: "div button"}).click();
    await driver.sleep(3000);
})

Then(/I can see "([^"]*)"$/, async (item)  => {
    let wording = await driver.findElement({css:"div h3"}).getText();
    await assert.ok(wording.includes(item));
    await driver.sleep(3000);
})

AfterAll('end', async function () {
    await driver.quit();
});
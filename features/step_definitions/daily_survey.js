const { Given, When, Then, AfterAll, setDefaultTimeout } = require('cucumber');
const {Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const hook = require('../support/hooks')
const driver = hook.driver;
require('dotenv').config()

// require("chromedriver");
// setDefaultTimeout(60 * 1000);

// let driver = new Builder().forBrowser('chrome').build();

Given(/I open daily checkin website/, async () => {
    await driver.get(process.env.DAILY_SURVEY_URL);
    await driver.sleep(3000);
})

When(/I check the agreement and click next/, async () => {
    await driver.findElement({ css: "div label:nth-child(2)"}).click();
    await driver.findElement({ css: "div.acl_questionnaire-content-buttons span.aclui-button__body"}).click();
    await driver.sleep(3000);
})

When(/^I fill my name with "([^"]*)" and NPK with "([^"]*)"$/, async function(name, npk) {
        await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(1) input"}).sendKeys(name);
        await driver.sleep(1000);
        await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(2) input"}).sendKeys(npk);
        await driver.sleep(5000);
});

When(/I fill the rest of the questionnaire/, async () => {
    // select corp function CIST
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(3) .form-select select option:nth-child(6)"}).click();
    // await driver.findElement(by.cssContainingText('option', 'Corporate Information Systems and Technology'))).click();
    // select work location. 2: AMDI, 8: WFH, 10: weekend
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(4) div[data-pka-anchor]:nth-child(8) label"}).click();
    // tidak ada face 2 face meeting
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(5) div[data-pka-anchor=checkbox]:nth-child(3) label"}).click();
    // status kesehatan karyawan
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(6) div[data-pka-anchor=checkbox]:nth-child(1) label"}).click();
    // status kesehatan keluarga
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(7) div[data-pka-anchor=checkbox]:nth-child(1) label"}).click();
    // lingkungan sekitar. 1 ya, 2 tidak tahu
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(8) div[data-pka-anchor=radio]:nth-child(2) label"}).click();
    // riwayat bepergian selama 14 hari terakhir. 1 ya, 2 tidak
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(9) div[data-pka-anchor=radio]:nth-child(2) label"}).click();
    // riwayat kontak erat suspek/positif covid-19. 1 ya, 2 tidak
    await driver.findElement({ css: "div.acl_questionnaire-questions > div:nth-child(10) div[data-pka-anchor=radio]:nth-child(2) label"}).click();
    await driver.sleep(3000);
})

When(/I click Submit button/, async () => {
    await driver.findElement({ css: "div.acl_questionnaire-content-buttons span.aclui-button__body"}).click();
    await driver.sleep(3000);
})

Then(/I can see "([^"]*) message"$/, async (item)  => {
    let wording = await driver.findElement({css:"div.questionnaire_thank-you h3"}).getText();
    await assert.ok(wording.includes(item));
    await driver.sleep(2000);
})

AfterAll('end session', async function () {
    await driver.quit();
});
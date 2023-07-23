import { fixture } from '../../hooks/pageFixture';
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
	await fixture.page.goto(process.env.BASEURL);
	fixture.logger.info("navigates to the application");
});

Given('User click on the login link', async function () {
	await fixture.page.locator('//span[text()="Login"]').click();
});

Given('User enter the username as {string}', async function (username) {
	await fixture.page.locator('//input[@data-placeholder="Username"]').type(username);
});

Given('User enter the password as {string}', async function (password) {
	await fixture.page.locator('//input[@data-placeholder="Password"]').type(password);
});

When('User click on the login button', async function () {
	await fixture.page.locator('(//span[text()="Login"])[2]').click();
	await fixture.page.waitForLoadState();
	await fixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
	const text = await fixture.page.locator('//button[contains(@class,"mat-focus-indicator mat-menu-trigger")]//span[1]').textContent();
	fixture.logger.info("Username: " + text);

});
Then('Login should fail', async function () {
	const failMess = await fixture.page.locator('mat-error[role="alert"]');
	await expect(failMess).toBeVisible();
})

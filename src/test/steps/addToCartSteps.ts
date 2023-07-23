import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { fixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2)

When('user search for a {string}', async function (book) {
	await fixture.page.locator('input[type="search"]').type(book);
	await fixture.page.waitForTimeout(2000);
	await fixture.page.locator('//mat-option[@role="option"]//span[1]').click();

});

When('user add the book to the cart', async function () {
	await fixture.page.locator('(//button[@color="primary"]//span)[1]').click();

});

Then('the cart badge should get updated', async function () {
	const badgeCount = await fixture.page.locator("#mat-badge-content-0").textContent();
	expect(Number(badgeCount.length)).toBeGreaterThan(0);
});
import { expect, Page } from "@playwright/test";

export default class Assert {

	constructor(private page: Page) { }

	async assertTitle(title: string) {
		await expect(this.page).toHaveTitle(title);
	}

	async assertTitleContains(title: string) {
		const pageTitle = await this.page.title();
		expect(pageTitle).toContain(title);
	}

	async assertURL(url: string) {
		await expect(this.page).toHaveURL(url);
	}

	async assertURLContains(title: string) {
		const pageURL = this.page.url();
		expect(pageURL).toContain(title);
	}

	public async expectLocatorIsDisabled(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).toBeDisabled()]);
	}

	public getUrl(): string {
		return this.page.url();
	}

	public async expectToHaveText(locator: string, text: string) {
		await Promise.all([
			expect(this.page.locator(locator)).toHaveText(text, { timeout: 15000 }),
		]);
	}

	public async expectToHaveTextIgnoreCase(locator: string, text: string) {
		await Promise.all([
			expect(this.page.locator(locator)).toContainText(text, {
				ignoreCase: true,
			}),
		]);
	}

	public async expectToHaveAttribute(
		locator: string,
		type: string,
		text: string
	) {
		await Promise.all([
			expect(this.page.locator(locator)).toHaveAttribute(type, text),
		]);
	}

	public async expectNotToHaveText(locator: string, text: string) {
		await Promise.all([
			expect(this.page.locator(locator)).not.toHaveText(text, {
				timeout: 15000,
			}),
		]);
	}

	public async expectToContainsText(locator: string, text: string) {
		await Promise.all([
			expect(this.page.locator(locator)).toContainText(text, {
				timeout: 15000,
			}),
		]);
	}

	public async expectToContainsTextIgnoreCase(locator: string, text: string) {
		await Promise.all([
			expect(this.page.locator(locator)).toContainText(text, {
				ignoreCase: true,
			}),
		]);
	}

	public async expectNotToContainsText(locator: string, text: string) {
		await Promise.all([
			expect(this.page.locator(locator)).not.toContainText(text, {
				timeout: 15000,
			}),
		]);
	}

	public async expectToBeVisible(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).toBeVisible()]);
	}

	public async softExpectToBeVisible(locator: string, message) {
		await Promise.all([expect.soft(this.page.locator(locator), message).toBeVisible()]);
	}

	public async expectToBeVisibleWithTimeOut(locator: string, timeout) {
		await Promise.all([expect(this.page.locator(locator)).toBeVisible({ timeout: timeout })]);
	}

	public async expectNotToBeVisibleWithTimeOut(locator: string, timeout) {
		await Promise.all([expect(this.page.locator(locator)).not.toBeVisible({ timeout: timeout })]);
	}

	public async expectNotToBeVisible(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).not.toBeVisible({ timeout: 40000 })]);
	}

	public async expectToBeDisable(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).toBeDisabled()]);
	}

	public async expectToBeChecked(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).toBeChecked()]);
	}

	public async expectNotToBeChecked(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).not.toBeChecked()]);
	}

	public async expectToBeEnabled(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).toBeEnabled()]);
	}

	public async expectToBeEmpty(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).toBeEmpty()]);
	}

	public async expectNotToBeEmpty(locator: string) {
		await Promise.all([expect(this.page.locator(locator)).not.toBeEmpty()]);
	}

	public async expectToHaveCount(locator: string, count: number) {
		await Promise.all([expect(this.page.locator(locator)).toHaveCount(count)]);
	}

}
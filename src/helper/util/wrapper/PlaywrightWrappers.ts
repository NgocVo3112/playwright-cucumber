import { Page, expect } from "@playwright/test";

export default class PlaywrightWrapper {

    constructor(private page: Page) { }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

	public async getText(locator: string) {
		return this.page.locator(locator).textContent();
	}

	public async getTextWithTimeout(locator: string, time) {
		return this.page.locator(locator).textContent({ timeout: time });
	}

	public async fillText(locator: string, text: string) {
		await Promise.all([
			await this.page.locator(locator).fill(text)
		]);
	}

	public async click(locator: string) {
		await this.page.locator(locator).click({ timeout: 20000 });
	}

	public async waitForSelectorVisible(selector: string, timeout: number) {
		await Promise.all([
			this.page.waitForSelector(selector, {
				state: 'visible',
				timeout: timeout,
			}),
		]);
	}

	public async waitForSelectorInvisible(selector: string, timeout: number) {
		await Promise.all([
			this.page.waitForSelector(selector, {
				state: 'hidden',
				timeout: timeout,
			}),
		]);
	}

	public async waitForSelectorDismiss(selector: string, timeout: number) {
		this.page.locator(selector).waitFor({
			state: 'hidden',
			timeout: timeout,
		});
	}

	public async waitForLocatorIsEnable(selector: string) {
		this.page.locator(selector).isEnabled();
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

	public async setInputFile(locator: string, file: string) {
		await this.page.setInputFiles(locator, file);
	}

	public async getInputValue(locator: string) {
		const text = await this.page.locator(locator).inputValue();
		return text;
	}

	public async pressEscape() {
		await this.page.keyboard.press('Escape');
	}

	public async pressEnter() {
		await this.page.keyboard.press('Enter');
	}

}
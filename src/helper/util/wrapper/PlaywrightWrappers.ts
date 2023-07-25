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

	public getUrl(): string {
		return this.page.url();
	}

	public async setInputFile(locator: string, file: string) {
		await this.page.setInputFiles(locator, file);
	}

	public async getInputValue(locator: string) {
		const text = await this.page.locator(locator).inputValue();
		return text;
	}

	public async verifyTitleOfBrowser(title: string) {
		await expect(this.page).toHaveTitle(title);
	}

	public async pressEscape() {
		await this.page.keyboard.press('Escape');
	}

	public async pressEnter() {
		await this.page.keyboard.press('Enter');
	}

	public async getNumberFromString(string: string) {
		const num = string.replace(/[^0-9]/g, '');
		return parseInt(num);
	}

	public async typeKeyboard(text: string) {
		return this.page.keyboard.type(text);
	}

	public async goBack() {
		return this.page.goBack();
	}

	public async goForward() {
		return this.page.goForward();
	}

	public async split(text: string, splitAt: string, chartReturn: number) {
		const chars = text.split(splitAt);
		return chars[chartReturn].toString();
	}

	public async getChartAt(text: string, index: number) {
		const chars = text.charAt(index);
		return chars.toString();
	}

	public async replace(oldStr: string, replaceText: string, newStr: string) {
		const result = oldStr.replace(replaceText, newStr);
		return result.toString();
	}

}
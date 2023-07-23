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

}
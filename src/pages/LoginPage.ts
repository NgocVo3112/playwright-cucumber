import { Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/util/wrapper/PlaywrightWrappers';

export default class BooksPage {

	private base: PlaywrightWrapper
	constructor(private page: Page) {
		this.base = new PlaywrightWrapper(page);
	}

	private productPageElements = {
		loginLinkSel: '//span[text()="Login"]',

		usernameTbSel: '//input[@data-placeholder="Username"]',

		passwordTbSel: '//input[@data-placeholder="Password"]',

		loginBtnSel: '(//span[text()="Login"])[2]',

		usernameSel: '//button[contains(@class,"mat-focus-indicator mat-menu-trigger")]//span[1]',

		alertSel: '//mat-error[@role="alert"]',
	}

	async navigateToBookPage() {
		await this.base.goto("https://bookcart.azurewebsites.net/login")
	}

}

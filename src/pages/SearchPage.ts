import { Page } from '@playwright/test';
import Assert from '../helper/util/wrapper/assert';
import PlaywrightWrapper from '../helper/util/wrapper/PlaywrightWrappers';

export default class SearchPage {

	private base: PlaywrightWrapper
	private assert: Assert

	constructor(private page: Page) {
		this.base = new PlaywrightWrapper(page);
		this.assert = new Assert(page);
	}

	private searchPageElements = {
		welcomeTxtSel: '//h2[text()="Welcome to MarsAir!"]',
		bookATicketTxtSel: '//h3[text()="Book a ticket to the red planet now!"]',
		departingCbbSel: '#departing',
		returningCbbSel: '#returning',
		promotionalCodeTbSel: '#promotional_code',
		searchBtnSel: '//input[@value="Search"]',
	}

	async verifyHomepageDisplay() {
		await this.assert.expectToBeVisible(this.searchPageElements.welcomeTxtSel);
		await this.assert.expectToBeVisible(this.searchPageElements.bookATicketTxtSel);
		await this.assert.assertTitle("Mars Airlines: Home");
	}

	async selectDeparting(departingValue) {
		await this.page.selectOption('select[id="departing"]', departingValue);
	}

	async selectReturning(returningValue) {
		await this.page.selectOption('select[id="returning"]', returningValue);
	}

	async inputPromoCode(promoCodeValue) {
		await this.base.fillText(this.searchPageElements.promotionalCodeTbSel, promoCodeValue);
	}

	async clickOnSearchBtn() {
		await this.base.click(this.searchPageElements.searchBtnSel);
	}

}

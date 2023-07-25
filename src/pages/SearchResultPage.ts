import { Page } from '@playwright/test';
import Assert from '../helper/util/wrapper/assert';
import PlaywrightWrapper from '../helper/util/wrapper/PlaywrightWrappers';

export default class SearchResultPage {

	private base: PlaywrightWrapper
	private assert: Assert

	constructor(private page: Page) {
		this.base = new PlaywrightWrapper(page);
		this.assert = new Assert(page);
	}

	private searchResultPageElements = {
		marsAirLogoSel: '//a[contains(text(),"MarsAir")]',
		searchResultsSel: '//h2[text()="Search Results"]',
		messageSel: '//div[@id="content"]//p[1]',
		backBtnSel: '//a[contains(text(),"Back")]',
		promoCodeMessageSel: '//p[@class="promo_code"]',
		promoCodeSel: '//p[@class="promo_code"]/tt',
		promoCodeDiscountSel: '//p[@class="promo_code"]/strong',
		callToBookSel: '//p[text()="Call now on 0800 MARSAIR to book!"]',
	}

	async verifySearchPageTitle() {
		await this.assert.assertTitle("Mars Airlines: Search Results");
	}
	async verifySearchResultTitleDisplay() {
		await this.assert.expectToBeVisible(this.searchResultPageElements.searchResultsSel);
	}

	async verifyMessageDisplay(message) {
		await this.assert.expectToHaveText(this.searchResultPageElements.messageSel, message);
	}

	async verifyNoPromoCodeAndCallNowDisplay() {
		await this.assert.expectNotToBeVisible(this.searchResultPageElements.promoCodeSel);
		await this.assert.expectNotToBeVisible(this.searchResultPageElements.promoCodeDiscountSel);
		await this.assert.expectNotToBeVisible(this.searchResultPageElements.callToBookSel);
	}

	async clickOnBack() {
		await this.base.click(this.searchResultPageElements.backBtnSel);
	}
	async clickOnMarsAirLogo() {
		await this.base.click(this.searchResultPageElements.marsAirLogoSel);
	}

	async verifyFormatPromoCode(promoCode) {
		const regex = /[A-Za-z]{2}\\d-[A-Za-z]{3}-\\d{3}/;
		return regex.test(promoCode);
	}

	async verifyPromoCodeDisplay(promoCode) {
		await this.assert.expectToHaveText(this.searchResultPageElements.promoCodeSel, promoCode);
	}

	async verifyValidDiscountDisplay(promoCode) {
		const discountFromPromo = await this.base.getChartAt(promoCode, 2);
		let discount = (parseInt(discountFromPromo) * 10).toString();
		if (discount.startsWith("0")) {
			discount = "00";
		}
		await this.assert.expectToHaveText(this.searchResultPageElements.promoCodeMessageSel, "Promotional code " + promoCode + " used: " + discount + "% discount!");

	}

	async verifyInvalidDiscountDisplay(promoCode) {
		await this.assert.expectToHaveText(this.searchResultPageElements.promoCodeMessageSel, "Sorry, code " + promoCode + " is not valid");
	}

	async verifyCallToBookDisplay() {
		await this.assert.expectToBeVisible(this.searchResultPageElements.callToBookSel);
	}
}

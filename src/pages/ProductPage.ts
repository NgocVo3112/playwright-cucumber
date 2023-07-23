import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/util/wrapper/PlaywrightWrappers";

export default class BooksPage {

	private base: PlaywrightWrapper
	constructor(private page: Page) {
		this.base = new PlaywrightWrapper(page);
	}

	private productPageElements = {
		menuIcon: "//div[@class='MuiDataGrid-menuIcon MuiDataGrid-menuOpen']/button",
		filterOption: "//li[text()='Filter']",
		filterValue: "//input[@placeholder='Filter value']",
		columnIDs: "//div[@class='MuiDataGrid-viewport']/div/div/div[@data-field='id']",
		columnCategories: "//div[@class='MuiDataGrid-viewport']/div/div/div[@data-field='categories']",
		columnNames: "//div[@class='MuiDataGrid-viewport']/div/div/div[@data-field='name']",
		columnInStocks: "//div[@class='MuiDataGrid-viewport']/div/div/div[@data-field='inStock']",
		columnPrices: "//div[@class='MuiDataGrid-viewport']/div/div/div[@data-field='price']",
		nextPageBtn: "//button[@title='Next page']",
		noResultTxt: "//div[text()='No results found.']",
	}

	async navigateToProductPage() {
		await this.base.goto("https://lcjg-betalabs.github.io/test-site-qa/products/")
	}

	async clickOnMenuIcon() {
		await this.page.click(this.productPageElements.menuIcon);
	}

	async clickOnFilter() {
		await this.base.click(this.productPageElements.filterOption);
	}

	async selectColumn(columnName) {
		await this.page.selectOption('select[class="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"]', columnName);
	}

	async selectOperator(operator) {
		await this.page.selectOption('select[class="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"]', operator);
	}

	async inputFilterValue(value) {
		await this.base.fillText(this.productPageElements.filterValue, value);
	}

	async getProductIDs() {
		const productIDs: any[] = [];
		const productIDElements = await this.page.$$(this.productPageElements.columnIDs);
		for await (const item of productIDElements) {
			productIDs.push(await item.innerText());
		}
		return productIDs;
	}

	async verifyResultMatchWhenFilterWithContains(coloumArr, value) {
		let tabIndex;
		await this.checkContains(coloumArr, value);
		if (tabIndex.toString().match('0')) {
			do {
				await this.page.click(this.productPageElements.nextPageBtn);
				await this.checkContains(coloumArr, value);
				tabIndex = await this.page.locator(this.productPageElements.nextPageBtn).getAttribute('tabindex');
			} while (tabIndex.toString().match('0'))
		}
	}

	async checkContains(coloumArr, value) {
		for (let i = 0; i < coloumArr.length; i++) {
			await expect(coloumArr[i]).toContain(value);
		}
	}

	async checkEquals(coloumArr, value) {
		for (let i = 0; i < coloumArr.length; i++) {
			await expect(coloumArr[i]).toEqual(value);
		}
	}

	async checkStartsWith(coloumArr, value) {
		for (let i = 0; i < coloumArr.length; i++) {
			await expect(coloumArr[i]).toString().startsWith(value);
		}
	}

	async checkEndsWith(coloumArr, value) {
		for (let i = 0; i < coloumArr.length; i++) {
			await expect(coloumArr[i]).toString().endsWith(value);
		}
	}
}
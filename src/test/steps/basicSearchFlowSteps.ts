import { Given, When, Then } from "@cucumber/cucumber";
import { SearchMessage } from "../../helper/util/systemMessage/searchMessage";
import { fixture } from '../../hooks/pageFixture';
import SearchPage from "../../pages/SearchPage";
import SearchResultPage from "../../pages/SearchResultPage";

let searchPage: SearchPage;
let searchResultPage: SearchResultPage;

Given('User navigates to the Marsair application', async function () {
	searchPage = new SearchPage(fixture.page);
	searchResultPage = new SearchResultPage(fixture.page);
	await fixture.page.goto(process.env.BASEURL);
});

Given('User select Departing as {string}', async function (departing) {
	await searchPage.selectDeparting(departing);
});

Given('User select the Returning as {string}', async function (returning) {
	await searchPage.selectReturning(returning);
});

Given('User enter the Promotional Code as {string}', async function (promoCode) {
	await searchPage.inputPromoCode(promoCode);
});

When('User click on Search button', async function () {
	await searchPage.clickOnSearchBtn();
	await searchResultPage.verifySearchPageTitle();
});

Then('The messgage display “Sorry, there are no more seats available.”', async function () {
	await searchResultPage.verifySearchResultTitleDisplay();
	await searchResultPage.verifyMessageDisplay(SearchMessage.NO_SEAT_AVAILABLE);
	await searchResultPage.verifyNoPromoCodeAndCallNowDisplay();
});

When('User click on Back link', async function () {
	await searchResultPage.clickOnBack();
});

When('User click on the MarsAir logo', async function () {
	await searchResultPage.clickOnMarsAirLogo();
  });

Then('The homepage display', async function () {
	await searchPage.verifyHomepageDisplay();
});

Then('The messgage display “Unfortunately, this schedule is not possible. Please try again.”', async function () {
	await searchResultPage.verifySearchResultTitleDisplay();
	await searchResultPage.verifyMessageDisplay(SearchMessage.SCHEDULE_NOT_POSSIBLE);
	await searchResultPage.verifyNoPromoCodeAndCallNowDisplay();
});

Then('The rearch result displays with Seats available, promotional code as {string}, discount and Call To Book messgage', async function (promoCode) {
	await searchResultPage.verifySearchResultTitleDisplay();
	await searchResultPage.verifyMessageDisplay(SearchMessage.SEAT_AVAILABLE);
	await searchResultPage.verifyPromoCodeDisplay(promoCode);
	await searchResultPage.verifyValidDiscountDisplay(promoCode);
	await searchResultPage.verifyCallToBookDisplay();
});

Then('The rearch result displays with Seats available, and Call To Book messgage', async function () {
	await searchResultPage.verifySearchResultTitleDisplay();
	await searchResultPage.verifyMessageDisplay(SearchMessage.SEAT_AVAILABLE);
	await searchResultPage.verifyCallToBookDisplay();
});

Then('The rearch result displays with Seats available, Call To Book messgage and invalid promotional code {string} warning', async function (promoCode) {
	await searchResultPage.verifySearchResultTitleDisplay();
	await searchResultPage.verifyMessageDisplay(SearchMessage.SEAT_AVAILABLE);
	await searchResultPage.verifyInvalidDiscountDisplay(promoCode);
	await searchResultPage.verifyCallToBookDisplay();
  });
import { getEnv } from '../helper/env/env';
import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from '../helper/browsers/browserManager';
const fs = require("fs-extra");

setDefaultTimeout(60 * 1000 * 4)
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
	getEnv();
	browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
	const scenarioName = pickle.name + pickle.id
	context = await browser.newContext({
		recordVideo: {
			dir: "test-results/videos"
		}
	});
	const page = await browser.newPage();
	fixture.page = page;
});

After(async function ({ pickle, result }) {
	const img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
	await this.attach(img, "image/png");
	await fixture.page.close();
	await context.close();
})

AfterAll(async function () {
	await browser.close();
})

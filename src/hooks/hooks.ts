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
			dir: "test-results/videos",
		},
	});
	const page = await context.newPage();
	fixture.page = page;
});

After(async function ({ pickle, result }) {
	let videoPath: string;
	let img: Buffer;
	if (result?.status == Status.FAILED) {
		img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
		videoPath = await fixture.page.video().path();
	}
	await fixture.page.close();
	await context.close();
	if (result?.status == Status.FAILED) {
		await this.attach(
			img, "image/png"
		);
		await this.attach(
			fs.readFileSync(videoPath),
			'video/webm'
		);
	}

});

AfterAll(async function () {
	await browser.close();
})

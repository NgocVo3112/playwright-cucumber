import { Given, When, Then } from "@cucumber/cucumber";
import RegisterPage from "../../pages/registerPage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/util/wrapper/assert";
import * as data from "../../helper/util/test-data/registerUser.json";
import { REGISTER } from "../../helper/util/urls/urls";

let registerPage: RegisterPage;
let assert: Assert;

Given('I navigate to the register page', async function () {
    registerPage = new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);
	await fixture.page.goto(process.env.BASEURL.concat(REGISTER));
});

When('I created a new user', async function () {
    const username = data.userName + Date.now().toString();
    await registerPage.registerUser(data.firstName, data.lastName,
        username, data.password, data.confirmPassword, "m");
});

Then('I confirm user registration is success', async function () {
    await assert.assertURL("https://bookcart.azurewebsites.net/login");
});
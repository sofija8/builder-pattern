import { expect } from "chai";
import { step } from "mocha-steps";
import Page from "../builder";

describe("Mocha steps demo", () => {
    let page;

    before(async () => {
        page = await Page.build("Desktop");
    });

    after(async () => {
        await page.close();
    });


    step("should load zero banking homepage", async () => {
        await page.goto("http://zero.webappsecurity.com/");
        expect(await page.isElementVisible("#signin_button")).to.be.true;
    });

    step("should open login page", async () => {
        await page.waitAndClick("#signin_button");
        expect(await page.isElementVisible("#signin_button")).to.be.false;
        expect(await page.isElementVisible("#login_form")).to.be.true;
    });

    step("should login to the application", async () => {
        await page.waitAndType("#user_login", "username");
        await page.waitAndType("#user_password", "password");
        await page.waitAndClick("#user_remember_me");
        await page.waitAndClick("input[type='submit']");

        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html");
        expect(await page.isElementVisible(".nav-tabs")).to.be.true;
    });
});
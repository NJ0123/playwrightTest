const { chromium } = require('playwright');
const { expect } = require('chai');
const xpaths = require('../Xpaths/loginPageXpaths.js');

(async () => {
    console.log('Start script');

    const websiteURL = "https://parabank.parasoft.com/parabank/index.htm";
    const loginButtonValue = "Log In";
    const logoutButtonValue = "Log Out";
    const username = "bruh123";
    const password = "FriedRice@234";
    const accountKey = "Account";
    const balanceKey = "Balance";
    const availableAmountKey = "Available Amount";
  
    // const browser = await chromium.launch();
    const browser = await chromium.launch({ headless: false });
    console.log('Launched chromium browser');

  
    const context = await browser.newContext();
    console.log('Created a new context');
    
    const page = await context.newPage();
    console.log('Created a new web page');

  
    await page.goto(websiteURL);
    console.log('Navigation to ' + websiteURL + ' completed.');

    (await page.waitForSelector(xpaths.getInputFromName("username"))).type(username);
    (await page.waitForSelector(xpaths.getInputFromName("password"))).type(password);
    console.log("Entered a username and a password");

    
    
    await page.waitForSelector(xpaths.getInputFromValue(loginButtonValue));
    await page.click(xpaths.getInputFromValue(loginButtonValue));
    console.log("Clicked on the login button");

    await page.waitForSelector(xpaths.getThFromText(accountKey), { state: 'visible' });
    await page.waitForSelector(xpaths.getThFromText(balanceKey), { state: 'visible' });
    await page.waitForSelector(xpaths.getThFromText(availableAmountKey), { state: 'visible' });

    console.log("Performed validations after a successful login");

    await page.waitForSelector(xpaths.getAnchorFromText(logoutButtonValue));
    await page.click(xpaths.getAnchorFromText(logoutButtonValue));
    await page.waitForSelector(xpaths.getInputFromName("username"), { state: 'visible' });
    console.log('Successfully logged out');
    
    await browser.close();
    console.log('Script done');

})();

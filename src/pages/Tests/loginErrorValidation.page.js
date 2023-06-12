const { chromium } = require('playwright');
const { expect } = require('chai');
const xpaths = require('../Xpaths/elementXpaths.js');

(async () => {
  console.log('Start script');

  const websiteURL = "https://parabank.parasoft.com/parabank/index.htm";
  const loginErrorText = "Please enter a username and password.";
  const loginButtonValue = "Log In";
  
  // const browser = await chromium.launch();
  const browser = await chromium.launch({ headless: false });
  console.log('Launched chromium browser');

  
  const context = await browser.newContext();
  console.log('Created a new context');
    
  const page = await context.newPage();
  console.log('Created a new web page');

  
  await page.goto(websiteURL);
  console.log('Navigation to ' + websiteURL + ' completed.');

  await page.waitForSelector(xpaths.getInputFromValue(loginButtonValue));
  await page.click(xpaths.getInputFromValue(loginButtonValue));

  console.log("Clicked on the login button without creds present")
  await page.waitForSelector(xpaths.getParagraphFromText(loginErrorText));

  expect(await page.textContent(xpaths.getParagraphFromText(loginErrorText))).to.equal(loginErrorText);
  console.log('Validated the required error message shows up')

  await browser.close();
  console.log('Script done');

})();

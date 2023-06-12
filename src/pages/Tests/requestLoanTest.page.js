const { chromium } = require('playwright');
const { expect } = require('chai');
const xpaths = require('../Xpaths/elementXpaths.js');

(async () => {
    console.log('Start script');

    const websiteURL = "https://parabank.parasoft.com/parabank/index.htm";
    const loginButtonValue = "Log In";
    const logoutButtonValue = "Log Out";
    const applyLoanButtonValue = "Apply Now";
    const requestLoanButtonValue = "Request Loan";
    const accountsOverviewButtonValue = "Accounts Overview";
    const loanApprovedText = "Congratulations, your loan has been approved.";
    const username = "bruh123";
    const password = "FriedRice@234";
    const accountKey = "Account";
    const numericLoanAmount = "20";
    
    
  
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
    console.log("Performed validations after a successful login");

    await page.waitForSelector(xpaths.getAnchorFromText(requestLoanButtonValue));
    await page.click(xpaths.getAnchorFromText(requestLoanButtonValue));
    console.log("Clicked on the request loan button");
    await page.waitForLoadState('networkidle');

    const [downPayment] = await page.$$(xpaths.getInputFromId("downPayment"));
    const [loanAmount] = await page.$$(xpaths.getInputFromId("amount"));

    if (downPayment) {
        await downPayment.type(numericLoanAmount, { delay: 100 });
    } else {
        console.log('Element not found.');
    }

    if (loanAmount) {
        await loanAmount.type(numericLoanAmount, { delay: 100 });
    } else {
        console.log('Element not found.');
    }

    console.log("Entered required values to apply for loan");

    await page.waitForSelector(xpaths.getInputFromValue(applyLoanButtonValue));
    await page.click(xpaths.getInputFromValue(applyLoanButtonValue));
    console.log("Clicked on the apply loan button");

    await page.waitForSelector(xpaths.getParagraphFromText(loanApprovedText));
    expect(await page.textContent(xpaths.getParagraphFromText(loanApprovedText))).to.equal(loanApprovedText);
    console.log('Validated the required loan approval message shows up')

    const newAccountId = await page.waitForSelector(xpaths.getAnchorFromId("newAccountId"));
    
    const newAccountNumberString = await newAccountId.textContent();
    console.log("The new account number is " + newAccountNumberString);

    await page.waitForSelector(xpaths.getAnchorFromText(accountsOverviewButtonValue));
    await page.click(xpaths.getAnchorFromText(accountsOverviewButtonValue));
    console.log("Clicked on the accounts overview button");
    await page.waitForLoadState('networkidle');

    await page.waitForSelector(xpaths.getAnchorFromText(newAccountNumberString));
    expect(await page.textContent(xpaths.getAnchorFromText(newAccountNumberString))).to.equal(newAccountNumberString);
    await page.waitForSelector(xpaths.getTdFromText('$' + numericLoanAmount + '.00'));
    expect(await page.textContent(xpaths.getTdFromText('$' + numericLoanAmount + '.00'))).to.equal('$' + numericLoanAmount + '.00');
    console.log("Validated that the loan account was successfully created")

    await page.waitForSelector(xpaths.getAnchorFromText(logoutButtonValue));
    await page.click(xpaths.getAnchorFromText(logoutButtonValue));
    await page.waitForSelector(xpaths.getInputFromName("username"), { state: 'visible' });
    console.log('Successfully logged out');
    
    await browser.close();
    console.log('Script done');

})();

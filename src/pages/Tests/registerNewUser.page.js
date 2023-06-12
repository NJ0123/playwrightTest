const { chromium } = require('playwright');
const { expect } = require('chai');
const xpaths = require('../Xpaths/loginPageXpaths.js');


async function typeTextToInputXpath(page, xpath, textToType) {
    const [elements] = await page.$$(xpath);

    if (elements) {
        await elements.type(textToType, { delay: 100 });
        console.log('Entered ' + textToType + ' to the passed xpath');
    } else {
        console.log('Element ' + xpath + 'not found.');
    }
    
  }


(async () => {
    try
    {
        console.log('Start script');

        const websiteURL = "https://parabank.parasoft.com/parabank/index.htm";
        const successfulAccountCreationText = "Your account was created successfully. You are now logged in.";
        const logoutButtonValue = "Log Out";
        const username = "bruh123";
        const testText = "test";
        const testNumeric = "1234";
        const password = "FriedRice@234";
        const registerKey = "Register";
  
        // const browser = await chromium.launch();
        const browser = await chromium.launch({ headless: false });
        console.log('Launched chromium browser');

  
        const context = await browser.newContext();
        console.log('Created a new context');
    
        const page = await context.newPage();
        console.log('Created a new web page');

  
        await page.goto(websiteURL);
        console.log('Navigation to ' + websiteURL + ' completed.');


        await page.waitForSelector(xpaths.getAnchorFromText(registerKey));
        await page.click(xpaths.getAnchorFromText(registerKey));
        console.log('Clicked on the register button from the landing page');

        await page.waitForLoadState('networkidle');
        await page.waitForSelector(xpaths.getInputFromName('customer.firstName'), { state: 'visible' });

        const textFields = ['customer.firstName', 'customer.lastName', 'customer.address.street',
        'customer.address.city', 'customer.address.state'];

        const numericFields = ['customer.address.zipCode', 'customer.phoneNumber', 'customer.ssn'];

        for (const str of textFields){
            await typeTextToInputXpath(page, xpaths.getInputFromName(str), testText);
        }

        for (const str of numericFields){
            await typeTextToInputXpath(page, xpaths.getInputFromName(str), testNumeric);
        }

        await typeTextToInputXpath(page, xpaths.getInputFromName('customer.username'), username);
        await typeTextToInputXpath(page, xpaths.getInputFromName('customer.password'), password);
        await typeTextToInputXpath(page, xpaths.getInputFromName('repeatedPassword'), password);

        console.log("Entered all the required fields")

        await page.waitForSelector(xpaths.getInputFromValue(registerKey));
        await page.click(xpaths.getInputFromValue(registerKey));
        console.log('Clicked on the register button to create account');

        await page.waitForSelector(xpaths.getParagraphFromText(successfulAccountCreationText));

        expect(await page.textContent(xpaths.getParagraphFromText(successfulAccountCreationText))).to.equal(successfulAccountCreationText);
        console.log('Validated the required error message shows up')

        await page.waitForSelector(xpaths.getAnchorFromText(logoutButtonValue));
        await page.click(xpaths.getAnchorFromText(logoutButtonValue));
        await page.waitForSelector(xpaths.getInputFromName("username"), { state: 'visible' });
        console.log('Successfully logged out');
        
        
        await browser.close();
        console.log('Script done');
    }
    catch(error){
        console.error('An error occurred:', error);
    }

})();

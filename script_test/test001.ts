/*
import { chromium } from 'playwright';

const emailsToSend = [
    {
        to: 'abcdef123randomFakeEmail@gmail.com',
        subject: 'Hello',
        body: 'This is a message.',
    },
    {
        to: 'testingtesting12345903@aol.com',
        subject: 'Testing',
        body: 'I love the academy!',
    },
    {
        to: 'jimmyJohnBillyBob420@academy.net',
        subject: 'Apify is awesome!',
        body: 'Some content.',
    },
];

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Login logic
await page.goto('https://www.yahoo.com/');

await page.click('button[name="agree"]');
await page.waitForSelector('a:has-text("Sign in")');

await page.click('a:has-text("Sign in")');
await page.waitForLoadState('load');

await page.type('input[name="username"]', 'YOUR-LOGIN-HERE');
await page.click('input[name="signin"]');

await page.type('input[name="password"]', 'YOUR-PASSWORD-HERE');
await page.click('button[name="verifyPassword"]');
await page.waitForLoadState('load');

const cookies = await browser.contexts()[0].cookies();

await page.close();

// Email sending logic
const promises = emailsToSend.map(({ to, subject, body }) =>
    (async () => {
        const sendEmailContext = await browser.newContext();
        await sendEmailContext.addCookies(cookies);
        const page2 = await sendEmailContext.newPage();

        await page2.goto('https://mail.yahoo.com/');

        await page2.click('a[aria-label="Compose"]');

        await page2.type('input#message-to-field', to);
        await page2.type('input[data-test-id="compose-subject"]', subject);
        await page2.type('div[data-test-id="compose-editor-container"] div[contenteditable="true"]', body);

        await page2.click('button[title="Send this email"]');

        await sendEmailContext.close();
    })()
);

await Promise.all(promises);

await browser.close();
*/
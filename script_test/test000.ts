/*
import { Page, chromium } from "playwright-core";
import axios from "axios";

const rnd = (max, min) => Math.floor(Math.random() * (max - min)) + min;

export async function solveCaptcha(page: Page) {
  const anchorIframe = page.frameLocator('iframe[src*="api2/anchor"]');
  const reCaptchaIframe = page.frameLocator('iframe[src*="api2/bframe"]');

  await anchorIframe
    .locator("#recaptcha-anchor")
    .click({ delay: rnd(150, 30) });
  await reCaptchaIframe
    .locator("#recaptcha-audio-button")
    .click({ delay: rnd(150, 30) });

  const audioLink = reCaptchaIframe.locator("#audio-source");

  while (true) {
    const audioCaptcha = await page.waitForResponse(
      await audioLink.getAttribute("src")
    );
    try {
      const { data } = await axios.post(
        "https://api.wit.ai/speech?v=2021092",
        await audioCaptcha.body(),
        {
          headers: {
            Authorization: "Bearer JVHWCNWJLWLGN6MFALYLHAPKUFHMNTAC",
            "Content-Type": "audio/mpeg3",
          },
        }
      );

      const audioTranscript = data.match('"text": "(.*)",')[1].trim();

      await reCaptchaIframe
        .locator("#audio-response")
        .type(audioTranscript, { delay: rnd(75, 30) });

      await reCaptchaIframe
        .locator("#recaptcha-verify-button")
        .click({ delay: rnd(150, 30) });

      await anchorIframe
        .locator('#recaptcha-anchor[aria-checked="true"]')
        .waitFor();

      return page.evaluate(
        () => document.getElementById("g-recaptcha-response")["value"]
      );
    } catch (e) {
      console.error(e);
      await reCaptchaIframe
        .locator("#recaptcha-reload-button")
        .click({ delay: rnd(150, 30) });
    }
  }
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: [
      "--disable-site-isolation-trials",
      "--disable-features=site-per-process,SitePerProcess",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // await page.goto('https://www.google.com/recaptcha/api2/demo');

  // await solveCaptcha(page);

  await page.goto('https://www.google.com/recaptcha/api2/demo');

  // Wait for the reCAPTCHA iframe to load
  await page.waitForSelector('#recaptcha iframe', { state: 'attached' });

  // Get the frame handle and switch to it
  const frameHandle = await page.$('#recaptcha iframe');
  const frame = await frameHandle.contentFrame();

  // Create a new page to use with the CDP session
  const cdpPage = await ctx.newCDPSession(page);

  // Set download behavior to allow and specify download path
  await cdpPage.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: './',
  });

  // Click on the checkbox to activate the reCAPTCHA challenge
  await frame.click('#recaptcha-anchor');

  // Wait for the reCAPTCHA challenge to be solved
  await frame.waitForSelector('.recaptcha-checkbox-checked', { state: 'attached' });

  // Submit the form
  await page.click('input[type="submit"]');

  // Wait for the form submission to complete
  await page.waitForNavigation();

  // Check that the form submission was successful
  const successMessage = await page.$eval('#submit-msg', element => element.textContent);
  console.log(successMessage);

  await browser.close();
})();

*/
import puppeteer from "puppeteer";
import { userInput } from "./helpers";

const client = "9930649798";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ["--window-size=1280,720"],
  });

  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");

  await userInput();

  await page.waitForSelector(".lexical-rich-text-input", { timeout: 60000 });

  await page.click(".lexical-rich-text-input");
  await page.keyboard.type(client);
  await page.keyboard.press("Enter");

  //   const inputElements = await page.$$(".lexical-rich-text-input");

  //   if (inputElements.length >= 2) {
  //     await inputElements[1].click();
  //     console.log("Clicked on the second input element");
  //   } else {
  //     console.log(`Found only ${inputElements.length} input element(s)`);
  //   }
  
  

  const textToSend = "Hello, I am automatically sending this text!";

  await page.keyboard.type(textToSend);
  await page.keyboard.press("Enter");
}

main();

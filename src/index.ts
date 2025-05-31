import puppeteer from "puppeteer";
import { userInput } from "./helpers";
import { clients } from "../constants/names";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ["--window-size=1280,720"],
  });

  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");

  await userInput();
  let counter = 0;
  for (const client of clients) {
    counter++;
    if (counter % 15 === 0) {
      await new Promise(resolve =>
        setTimeout(resolve, Math.random() * 10000 + 10000)
      );
    }
    console.log(`Sending message to ${client.name}...`);
    try {
      await new Promise(resolve =>
        setTimeout(resolve, Math.random() * 2000 + 1000)
      );
      await page.click(".lexical-rich-text-input", {
        delay: Math.random() * 100 + 1000,
      });
      await new Promise(resolve =>
        setTimeout(resolve, Math.random() * 2000 + 1000)
      );
      await page.keyboard.type(client.mobile);
      await page.keyboard.press("Enter");
      await new Promise(resolve =>
        setTimeout(resolve, Math.random() * 2000 + 1000)
      );
      const textToSend = `Hello ${client.name}, I am automatically sending this text!`;
      await page.keyboard.type(textToSend);
      await page.keyboard.press("Enter");
    } catch (error) {
      console.error(`Error sending message to ${client.name}:`, error);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log("All messages sent successfully!");
  console.log("closing browsr...");

  await browser.close();
}

main();

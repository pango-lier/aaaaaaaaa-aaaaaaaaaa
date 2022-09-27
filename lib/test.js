const GoogleSearch = require("./googleSearch");
const PuppeteerActionFunc = require("./pup");
const puppeteer = require("puppeteer");

const test = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
    ],
  });
  const page = await browser.newPage();
  const pup = new PuppeteerActionFunc(page, 0.1, 0.05);

  const googleSearch = new GoogleSearch(pup);
  await googleSearch.typeSearch(["nhom kinh da lat"]);
  await googleSearch.clickDomain();
};
test();

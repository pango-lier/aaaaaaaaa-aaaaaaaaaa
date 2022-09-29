const GoogleSearch = require("./googleSearch");
const PuppeteerActionFunc = require("./pup");
const puppeteer = require("puppeteer");
const googleLogin = require("./googleLogin");

const test = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--user-data-dir=/home/trong/.config/google-chrome/Profile 4",
      "--tz=Asia/Bangkok",
      "--no-first-run",
      "--no-sandbox",
      "--font-masking-mode=2",
      "--origin-trial-disabled-features=ConditionalFocus",
      "--password-store=basic",
      "--disable-encryption",
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
      "--disable-notifications",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-background-networking",
      "--disable-features=RendererCodeIntegrity"
    ],
  });
  const page = await browser.newPage();
  const pup = new PuppeteerActionFunc(page, 0.1, 0.05);
  await googleLogin(pup, { email: "kibaocap@gmail.com", password: "Kiba2154", recoveryEmail: "Huongkibaocap@yahoo.com" });
  // const googleSearch = new GoogleSearch(pup);
  // await googleSearch.typeSearch(["nhom kinh da lat"]);
  // await googleSearch.clickDomain();
};
test();

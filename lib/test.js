const GoogleSearch = require("./googleSearch");
const PuppeteerActionFunc = require("./pup");
const puppeteer = require("puppeteer");
const googleLogin = require("./googleLogin");
const GooglePhoto = require("./googlePhoto");
const createFirstChannel = require("./youtube/createFirstChannel");
const getEmailInfo = require("./personal/getEmailInfo");
const changeLanguage = require("./personal/changLanguage");
const changePassword = require("./personal/changePassword");
const changePassword2 = require("./personal/changePassword2");
const commentTikTok = require("./tiktok/commentTiktok");
const videoTikTok = require("./tiktok/video");
const watchYoutube = require("./youtube/watch");
const fs = require("fs");
const TripadvisorSearch = require("./tripadvisor2");
const { randomParseTextToArray } = require("./helper");
const GoogleMapSearch = require("./googleMap");
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
let rawdata = fs.readFileSync("../browser.json");
let SettingBrowser = JSON.parse(rawdata);

const test = async () => {
  const browser = await puppeteer.launch({
    executablePath: "/home/trong/.gologin/browser/orbita-browser-107/chrome",
    headless: false,
    // ...SettingBrowser,
    args: [
      "--no-sandbox",
      "--user-data-dir=/home/trong/.config/google-chrome/profile3",
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
      "--disable-features=RendererCodeIntegrity",
    ],
  });
 
  try {
    const page = await browser.newPage();
    // setTimeout(async () => {
    //   try {
    //     console.log("setTimeout");
    //     await page.browser().close();
    //   } catch (error) {}
    // }, 5000);

    // START TRIPADVISOR
    const tripadvisorSearch = new TripadvisorSearch(page);
    await tripadvisorSearch.run({
      fileLink: "./helper/tripadvisor-search.txt",
    });
    // END TRIPADVISOR

    // START GOOGLE MAP
    // const googleMapSearch = new GoogleMapSearch(page);
    // await page.setViewport({
    //   width: 1640,
    //   height: 980,
    //   deviceScaleFactor: 1,
    // });
    // await googleMapSearch.run({
    //   fileLink: "./helper/google-map-search.txt",
    // });
    // END GOOGLE MAP

    // START GOOGLE LOGIN
    // await googleLogin(pup, __dirname + "/helper/accounts.txt", 0,'');
    // END GOOGLE LOGIN

    // START GOOGLE SEARCH
    // const googleSearch = new GoogleSearch(pup);
    // const domain = "https://nhomkinhdalat.com/";
    // const extraDomainStart = ["https://www.facebook.com/"];// danh sach link se tuong tac, co nhieu hon 1 thi se random chon 1 link.
    // const extraDomainEnd = ["https://www.facebook.com/"];
    // await googleSearch.runGooglePhoto(["nhom kinh da lat"], domain);
    // END GOOGLE SEARCH

    // END COMMENT TIKTOK
    // await commentTikTok(pup, {
    //   fileLink: "./helper/tiktok/link.txt",
    //   fileComment: "./helper/tiktok/comment.txt",
    //   minDelayComment: 5,
    //   maxDelayComment: 1 * 60, //
    //   timeoutLive: 60 * 3600, //1h
    //   maxComment: 9999,
    // });
    // END COMMENT TIKTOK

    // await watchYoutube(pup,{fileLink:"./helper/tiktok/link.txt",timeOut:10});
    // await videoTikTok(pup,{fileLink:"./helper/tiktok/link.txt"});
    //await googleLogin(pup,__dirname + "/helper/accounts.txt",0);
    //await changePassword2(pup, __dirname + "/helper/accounts.txt",0, "Abc@1234@123");
    //await changeLanguage(pup);
  } catch (error) {
    console.log(error);
  }
  //await getEmailInfo(pup);
  //const photo = new GooglePhoto(pup);
  //await photo.importFile(["/home/trong/Pictures/vach-ngan-nhom-kinh-dep-36.jpg"]);
  // const googleSearch = new GoogleSearch(pup);
  // await googleSearch.typeSearch(["nhom kinh da lat"]);
  // await googleSearch.clickDomain();
  await browser.close();
};
test();

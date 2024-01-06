const { random } = require("../until");
const searchGoogleMap = require("./searchGoogleMap");
const randomParseTextToArrayTripadvisor = require("./helper/randomParseTextToArrayTripadvisor");
const PuppeteerActionFunc = require("../pup");

class GoogleMapSearch {
  page;
  ua;
  size;
  found = false;
  constructor(page) {
    const pup = new PuppeteerActionFunc(page, 0.1, 0.05);
    this.page = pup;
  }

  async run({ fileLink }) {
    const dataText = await randomParseTextToArrayTripadvisor(fileLink);
    if (!dataText) {
      console.log("So lan chay bang 0 hoac khong hop le .");
      return 0;
    }
    await this.typeSearch(dataText[0]);
    const found = await searchGoogleMap(this.page, {
      levelScroll: random(4, 7), // level cang cao thi scroll cang nhanh. tu 1-10level
      timLive: random(300, 600), //5-10  min
      timeoutNegativeTarget: random(10, 40), // thoi gian khi lick vao link khac 10-20s
      rateClickOtherLink: random(50, 80), // level cang cao thi xac xuat click vao bat ky cang cao
      maxNegativeTarget: 2, //so click toi da khi vao trang web can tim
      rateClickNewTag: 70, //ty le mo tag moi
      scoreScrollDown: 90,
      scoreScrollUp: 90,
      rateEnableScrollUp: 50,
      rateEnableScrollDown: 100,
      domain: dataText[1].replace("https://www.google.com/maps/", ""),
      fileLink,
      dataText,
    });
    console.log("End Process search .");
    return found;
  }

  async typeSearch(keywords) {
    await this.page.goto("https://www.google.com/maps/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.delayRandomMs(600, 600);
    await this.page.click('#searchboxinput');
    await this.page.input(keywords);
    await this.page.delayRandomMs(500, 600);
    await this.page.enter();
    await this.page.delayRandomMs(300, 1000);
    // await this.page.page.waitForNavigation();
  }
}

module.exports = GoogleMapSearch;

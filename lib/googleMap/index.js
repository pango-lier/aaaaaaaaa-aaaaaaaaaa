const { random } = require("../until");
const searchGoogleMap = require("./searchGoogleMap");
const randomParseTextToArrayGoogleMap = require("./helper/randomParseTextToArrayGoogleMap");
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
    try {
      await this.page.installMouseHelper();
    } catch (error) {}
    const dataText = await randomParseTextToArrayGoogleMap(fileLink);
    if (!dataText) {
      console.log("So lan chay bang 0 hoac khong hop le .");
      return 0;
    }
    console.log(dataText);
    await this.typeSearch(dataText[0], dataText[1]);
    const found = await searchGoogleMap(this.page, {
      timLive: random(300, 600), //5-10  min
      delayScroll: random(30, 100), //30 - 100 ms
      clickDirectionScore: 100, // click chi duong cho website can chi
      clickDirectionOtherSiteScore: 0, //click chi duong cho website khac
      clickSendToPhoneScore: 100, //30 - 100 ms
      clickSaveScore: 100, //30 - 100 ms
      clickShareScore: 100, //30 - 100 ms
      clickReviewScore: 100, //30 - 100 ms
      clickAboutScore: 100, //30 - 100 ms
      clickOverViewScore: 100, //30 - 100 ms
      multiDelay: 1,

      maxNegativeTarget: 1000, //so click toi da khi vao trang web can tim
      timeoutNegativeTarget: random(10, 40), // thoi gian khi lick vao link khac 10-20s
      rateClickOtherLink: random(50, 80), // level cang cao thi xac xuat click vao bat ky cang cao
      maxNegativeTarget: 1000, //so click toi da khi vao trang web can tim
      rateClickNewTag: 70, //ty le mo tag moi
      levelScroll: random(1, 3), // level cang cao thi scroll cang nhanh. tu 1-10level
      scoreScrollDown: 90,
      scoreScrollUp: 90,
      rateEnableScrollUp: 50,
      rateEnableScrollDown: 100,
      domain: dataText[3].replace("https://www.google.com/maps/place/", ""),
      fileLink,
      dataText,
    });
    console.log("End Process search .");
    return found;
  }

  async typeSearch(keywords, link) {
    await this.page.goto(link || "https://www.google.com/maps/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.moveRandom(random(1000, 3000), 1000);
    await this.page.clickAndMove("#searchboxinput");
    await this.page.input(keywords);
    await this.page.moveRandom(random(1000, 3000), 1000);
    await this.page.delayRandomMs(500, 1000);
    await this.page.enter();
    await this.page.moveRandom(random(1000, 3000), 1000);
    await this.page.delayRandomMs(1000, 3000);
    // await this.page.page.waitForNavigation();
  }
}

module.exports = GoogleMapSearch;

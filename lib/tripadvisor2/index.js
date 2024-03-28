const { random } = require("../until");
const searchTripadVisor = require("./searchTripadVisor");
const randomParseTextToArrayTripadvisor = require("./helper/randomParseTextToArrayTripadvisor");
const PuppeteerActionFunc = require("../pup");

class TripadvisorSearch {
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
    const dataText = await randomParseTextToArrayTripadvisor(fileLink);
    if (!dataText) {
      console.log("So lan chay bang 0 hoac khong hop le .");
      return 0;
    }
    await this.page.goto("https://www.tripadvisor.com/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.moveRandom(random(1000, 3000), 2000);
    const found = await searchTripadVisor(this.page, {
      delayScrollMin: 50, // Ms, them delay moi lan lan , thoi gian random tu  0,5s den 4s
      delayScrollMax: 200, // Ms , them delay moi lan lan
      levelScroll: random(4, 7), // level cang cao thi scroll cang nhanh. tu 1-10level
      timLive: random(300, 600), //5-10  min
      timeoutNegativeTarget: random(10, 40), // thoi gian khi lick vao link khac 10-20s
      rateClickOtherLink: 80, // level cang cao thi xac xuat click vao bat ky cang cao
      maxNegativeTarget: 10, //so click toi da khi vao trang web can tim
      rateClickNewTag: 70, //ty le mo tag moi
      pageMode: "ascending", // random chon page  ascending/random-optimize
      scoreScrollDown: 90,
      scoreScrollUp: 90,
      rateEnableScrollUp: 50,
      rateEnableScrollDown: 100,
      domain: dataText[1].replace("https://www.tripadvisor.com/", ""),
      fileLink,
      dataText,
    });
    console.log("End Process search .");
    return found;
  }
}

module.exports = TripadvisorSearch;
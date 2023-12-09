const { random } = require("../until");
const searchTripadVisor = require("./searchTripadVisor");

class TripadvisorSearch {
  page;
  ua;
  size;
  found = false;
  constructor(pup) {
    this.page = pup;
  }

  async run(keywords, domain) {
    await this.typeSearch(keywords[random(0, keywords.length - 1)]);
    const found = await searchTripadVisor(this.page, {
      levelScroll: random(4, 7), // level cang cao thi scroll cang nhanh. tu 1-10level
      timLive: random(200, 360), //6 min
      timeoutNegativeTarget: random(10, 20), // thoi gian khi lick vao link khac 10-20s
      rateClickOtherLink: random(60, 90), // level cang cao thi xac xuat click vao bat ky cang cao
      maxNegativeTarget: 2, //so click toi da khi vao trang web can tim
      rateClickNewTag: 70, //ty le mo tag moi
      pageMode: "ascending", // random chon page  ascending/random-optimize
      scoreScrollDown: 90,
      scoreScrollUp: 90,
      rateEnableScrollUp: 50,
      rateEnableScrollDown: 100,
      domain: domain.replace("https://www.tripadvisor.com/", ""),
    });
    console.log("End Process search .");
    return found;
  }

  async typeSearch(keywords) {
    await this.page.goto("https://www.tripadvisor.com/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.delayRandomMs(600, 600);
    await this.page.click('input[type="search"]');
    await this.page.input(keywords);
    await this.page.delayRandomMs(500, 600);
    await this.page.enter();
    await this.page.delayRandomMs(300, 500);
    // await this.page.page.waitForNavigation();
  }
}

module.exports = TripadvisorSearch;

const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const firstClickRandom = require("./modeSearch/firstClickRandom");
const foundClickNow = require("./modeSearch/foundClickNow");
const foundClickPage = require("./modeSearch/foundClickPage");
const scrollDownInfo = require("./modeSearch/scrollDownInfo");

class TripadvisorSearch {
  page;
  ua;
  size;
  found = false;
  constructor(pup) {
    this.page = pup;
  }

  async typeSearch(keywords) {
    await this.page.goto("https://www.tripadvisor.com/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.delayRandomMs(600, 6000);
    await this.page.click('input[type="search"]');
    await this.page.input(keywords);
    await this.page.delayRandomMs(500, 6000);
    await this.page.enter();
    await this.page.delayRandomMs(3000, 5000);
    // await this.page.page.waitForNavigation();
  }

  async run(keywords, domain) {
    await this.typeSearch(keywords[random(0, keywords.length - 1)]);
    const found = await this.scrollSlowlyTopToBottomFoundClickNow(domain, {
      levelScroll: random(1, 6), // level cang cao thi scroll cang nhanh. tu 1-10level
      rateClickOtherLink: random(60, 90), // level cang cao thi xac xuat click vao bat ky cang cao
      maxChildClick: 2, //so click toi da khi vao trang web can tim
      rateClickNewTag: 70, //ty le mo tag moi
      pageMode: "ascending", // random chon page  ascending/random-optimize
      scoreScrollDown: 90,
      scoreScrollUp: 90,
      rateEnableScrollUp: 0,
      rateEnableScrollDown: 100,
      domain,
    });
    console.log("End Process search .");
    return found;
  }

  async scrollSlowlyTopToBottomFoundClickNow(domain, config) {
    let numberLinkClick = 0;
    let foundDomain = false;
    let step = "process";
    let domainFoundedAtPage;
    let scrollDown = true;
    let page = 1;
    for (let i = 0; i < random(70, 100); i++) {
      try {
        const info = await scrollDownInfo(
          this.page,
          domain,
          scrollDown ? config.scoreScrollDown : 100 - config.scoreScrollUp,
          config.levelScroll
        );
        if (info.domainFounded) {
          domainFoundedAtPage = { page, link: info.domainFounded };
        }
        switch (step) {
          default:
          case "process":
            const rateClick =
              config.rateClickOtherLink -
              (numberLinkClick * 15 > 70 ? 70 : numberLinkClick * 15);
            if (randomScore(rateClick > 5 ? rateClick : 5)) {
              foundDomain = await firstClickRandom(
                this.page,
                info.linkActives[random(0, info.linkActives.length - 1)],
                domain,
                config
              );
              if (foundDomain) {
                step = "after-found";
              }
              numberLinkClick++;
            }
            if (!foundDomain) {
              foundDomain = await foundClickNow(
                this.page,
                info.linkActives,
                domain,
                config
              );
              if (foundDomain) step = "after-found";
            }
            break;
          case "after-found":
            await this.page.delayRandomMs(200, 500);
            return foundDomain;
        }
        if (info.startPage) {
          // scroll-down when goto up;
          if (randomScore(config.rateEnableScrollDown)) {
            scrollDown = true;
            config.levelScroll = random(4, 8);
          }
        }
        if (info.endPage) {
          config.levelScroll = random(3, 10);
          if (randomScore(config.rateEnableScrollUp)) {
            scrollDown = false;
          } else {
            page = await foundClickPage(this.page, info.pages, page, config);
            break;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    return foundDomain;
  }
}

module.exports = TripadvisorSearch;

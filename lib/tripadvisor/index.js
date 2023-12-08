const processNegativeTargetDomain = require("./modeSearch/processNegativeTargetDomain ");
const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const firstClickRandom = require("./modeSearch/firstClickRandom");
const foundClickNow = require("./modeSearch/foundClickNow");
const foundClickPage = require("./modeSearch/foundClickPage");
const processTargetDomain = require("./modeSearch/processTargetDomain");
const scrollDownInfo = require("./modeSearch/scrollDownInfo");
const switchPageHref = require("./helper/switchPageHref");

class TripadvisorSearch {
  page;
  ua;
  size;
  found = false;
  constructor(pup) {
    this.page = pup;
  }

  maxChildClick;
  async run(keywords, domain) {
    await this.typeSearch(keywords[random(0, keywords.length - 1)]);
    const found = await this.scrollSlowlyTopToBottomFoundClickNow(domain, {
      levelScroll: 1, // level cang cao thi scroll cang nhanh. tu 1-10level
      rateClickOtherLink: random(60, 90), // level cang cao thi xac xuat click vao bat ky cang cao
      maxChildClick: 2, //so click toi da khi vao trang web can tim
      rateClickNewTag: 70, //ty le mo tag moi
      pageMode: "ascending", // random chon page  ascending/random-optimize
      scoreScrollDown: 90,
      scoreScrollUp: 90,
      rateEnableScrollUp: 50,
      rateEnableScrollDown: 100,
      domain,
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
          5
        );
        if (info.domainFounded) {
          domainFoundedAtPage = { page, link: info.domainFounded };
        }
        const link = info.linkActives[random(0, info.linkActives.length - 1)];
        switch (step) {
          default:
          case "process":
            if (
              randomScore(config.rateClickOtherLink) &&
              config.maxChildClick > numberLinkClick &&
              link &&
              link?.href
            ) {
              console.warn("firstClickRandom");
              foundDomain = await firstClickRandom(
                this.page,
                link,
                domain,
                config
              );
              if (foundDomain) {
                return foundDomain;
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
            }
            if (foundDomain) {
              await this.page.delayRandomMs(200, 500);
              return foundDomain;
            }
            break;
          case "target-domain":
            await this.page.delayRandomMs(200, 500);
            return foundDomain;
        }
        // swicth scroll
        if (info.startPage) {
          // scroll-down when goto up;
          if (randomScore(config.rateEnableScrollDown)) {
            scrollDown = true;
            // config.levelScroll = random(4, 8);
          }
        }
        if (info.endPage) {
          // config.levelScroll = random(3, 10);
          if (randomScore(config.rateEnableScrollUp)) {
            scrollDown = false;
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

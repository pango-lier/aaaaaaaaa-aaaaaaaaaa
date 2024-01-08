const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const changeNumberSearchFileTripadvisor = require("./helper/changeNumberSearchFileTripadvisor");
const clickRandom = require("./modeSearch/clickRandom");
const scrollDownInfo = require("./modeSearch/scrollDownInfo");

const searchGoogleMap = async (page, config) => {
  let numberLinkClick = 0;
  let domainFoundedAtPage;
  let scrollDown = true;

  const timeStart = new Date().getTime();
  for (let i = 0; i < random(700, 1000); i++) {
    try {
      const info = await scrollDownInfo(
        page,
        config.domain,
        scrollDown ? config.scoreScrollDown : 100 - config.scoreScrollUp,
        config.levelScroll
      );
      if (info.domainFounded) {
        domainFoundedAtPage = { link: info.domainFounded };
      }
      const link = info.linkActives[random(0, info.linkActives.length - 1)];
      if (
        randomScore(config.rateClickOtherLink) &&
        config.maxNegativeTarget > numberLinkClick &&
        link &&
        link?.href
      ) {
        console.warn("click random");
        foundDomain = await clickRandom(page, link, config.domain, config);
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

    if (new Date().getTime() - timeStart > config.timLive * 1000) {
      await changeNumberSearchFileTripadvisor(config.fileLink, config.dataText);
      await page.delayRandomMs(200, 500);
      break;
    }
  }
};

module.exports = searchGoogleMap;

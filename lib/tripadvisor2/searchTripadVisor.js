const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const changeNumberSearchFileTripadvisor = require("./helper/changeNumberSearchFileTripadvisor");
const firstClickRandom = require("./modeSearch/firstClickRandom");
const foundClickNow = require("./modeSearch/foundClickNow");
const scrollDownInfo = require("./modeSearch/scrollDownInfo");

const searchTripadVisor = async (page, config) => {
  let numberLinkClick = 0;
  let foundDomain = false;
  let step = "process";
  let domainFoundedAtPage;
  let scrollDown = true;

  const timeStart = new Date().getTime();
  for (let i = 0; i < random(700, 1000); i++) {
    try {
      const info = await scrollDownInfo(
        page,
        config.domain,
        scrollDown ? config.scoreScrollDown : 100 - config.scoreScrollUp,
        1
      );
      console.log(`${i} .Scroll`);
      await page.moveRandom(
        random(config.delayScrollMin, config.delayScrollMax),
        random(700, 2000),undefined,
        20
      );
      if (info.domainFounded) {
        domainFoundedAtPage = { link: info.domainFounded };
      }
      const link = info.linkActives[random(0, info.linkActives.length - 1)];
      switch (step) {
        default:
        case "process":

          await firstClickRandom(page, link, config.domain, config);
          numberLinkClick++;

          break;
        case "target-domain":
          await page.delayRandomMsMove(400, 3000, random(1000, 3000), 35);
          await page.delayRandomMs(200, 500);
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
    if (new Date().getTime() - timeStart > config.timLive * 1000) break;
  }

  await changeNumberSearchFileTripadvisor(config.fileLink, config.dataText);
  await page.delayRandomMsMove(400, 3000, random(1000, 3000), 35);
  await page.delayRandomMs(200, 500);

  return foundDomain;
};
module.exports = searchTripadVisor;

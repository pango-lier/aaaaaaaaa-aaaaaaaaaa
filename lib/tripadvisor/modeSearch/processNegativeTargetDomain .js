const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");

const processNegativeTargetDomain = async (page, link, config) => {
  try {
    const timeStart = new Date().getTime();
    console.log("processNegativeTargetDomain");
    await page.delayRandomMsMove(
      1500,
      5000,
      random(1000, 8000),
      40,
      'a[href*="' + link.href + '"]'
    );
    //await page.clickHref('a[href*="' + link.href + '"]');
    await page.findParentBySelectorAndClick(
      'a[href*="' + link.href + '"]',
      ".location-meta-block"
    );
    link.href = link.href.replace("#REVIEWS", "");
    await page.delayRandomMsMove(1500, 5000, random(2000, 8000), 50);

    const switchPage = await switchPageHref(page, link.href);
    page = switchPage.pup;
    for (let index = 0; index < random(100, 120); index++) {
      await page.delayRandomMsMove(400, 3000, random(1000, 3000), 35);
      if (
        new Date().getTime() - timeStart >
        config.timeoutNegativeTarget * 1000
      )
        break;
      await page.scrollRandUpDownScoreRollBack(
        85,
        { delayMin: 500, delayMax: 900 },
        { stepMin: 35, stepMax: 80 },
        { loopMin: 1, loopMax: 2 }
      );
    }
    if (randomScore(50)) await page.page.close();
  } catch (e) {
    console.log("error : processNegativeTargetDomain " + e.message);
  }

  return false;
};

module.exports = processNegativeTargetDomain;

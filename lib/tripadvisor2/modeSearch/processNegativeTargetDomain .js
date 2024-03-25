const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const goBackGoogle = require("../helper/gobackGoogle");
const switchPageHref = require("../helper/switchPageHref");

const processNegativeTargetDomain = async (page, link, config) => {
  try {
    const hrefIn = await page.location();
    const timeStart = new Date().getTime();
    console.log("processNegativeTargetDomain");
    await page.delayRandomMsMove(
      200,
      500,
      random(1000, 2000),
      20,
      'a[href*="' + link.href + '"]'
    );
    await page.clickAndMove('a[href*="' + link.href + '"]');
    link.href = link.href.replace("#REVIEWS", "");
    await page.delayRandomMs(300, 700);
    const switchPage = await switchPageHref(page, link.href);
    const page2 = switchPage.pup;
    for (let index = 0; index < random(100, 120); index++) {
      await page2.delayRandomMsMove(400, 2000, random(1000, 2000), 35);
      if (
        new Date().getTime() - timeStart >
        config.timeoutNegativeTarget * 1000
      )
        break;
      await page2.scrollRandUpDownScoreRollBack(
        85,
        { delayMin: 500, delayMax: 900 },
        { stepMin: 35, stepMax: 80 },
        { loopMin: 1, loopMax: 2 }
      );
    }
    if (switchPage.newPage) {
      if (randomScore(50)) await page2.page.close();
      await switchPageHref(page, "https://www.tripadvisor.com");
    } else {
      await goBackGoogle(page2, hrefIn);
    }
  } catch (e) {
    console.log("error : processNegativeTargetDomain " + e.message);
  }

  return false;
};

module.exports = processNegativeTargetDomain;

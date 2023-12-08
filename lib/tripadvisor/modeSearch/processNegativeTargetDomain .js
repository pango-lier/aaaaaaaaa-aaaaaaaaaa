const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");

const processNegativeTargetDomain = async (page, link, timeout = 10) => {
  try {
    const timeStart = new Date().getTime();
    console.log("processNegativeTargetDomain");
    await page.delayRandomMs(800, 2000);
    await page.clickHref('a[href*="' + link.href + '"]');
    await page.scrollTop();
    await page.delayRandomMs(1500, 3000);

    const switchPage = await switchPageHref(page, link.href);
    page = switchPage.pup;
    for (let index = 0; index < random(100, 120); index++) {
      if (new Date().getTime() - timeStart > timeout * 1000) break;
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

const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");

const processNegativeTargetDomain = async (page, link, config) => {
  try {
    const timeStart = new Date().getTime();
    console.log("processNegativeTargetDomain");
    await page.moveRandom(random(1000, 3000));
    await page.delayRandomMs(400, 1000);
    await page.clickHref('a[href*="' + link.href + '"]');
    await page.moveRandom(random(1000, 3000));
    await page.delayRandomMs(400, 1000);

    const switchPage = await switchPageHref(page, link.href);
    page = switchPage.pup;
    for (let index = 0; index < random(100, 120); index++) {
      await page.moveRandom(random(1000, 3000));
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
    // const href = await page.location();
    // console.log(href);
    // if (
    //   randomScore(50) &&
    //   href?.search("https://www.google.com/maps/place") !== -1
    // )
    //   await page.page.close();
  } catch (e) {
    console.log("error : processNegativeTargetDomain " + e.message);
  }

  return false;
};

module.exports = processNegativeTargetDomain;

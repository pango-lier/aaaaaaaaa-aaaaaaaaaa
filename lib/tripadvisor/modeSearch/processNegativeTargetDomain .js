const randomScore = require("../../helper/randomScore");

const processNegativeTargetDomain = async (page, link, config) => {
  try {
    await page.delayRandomMs(800, 2000);
    await page.clickHref('a[href*="' + link.href + '"]');
    await page.delayRandomMs(4500, 6500);

    await page.scrollRandUpDownScoreRollBack(
      90,
      { delayMin: 500, delayMax: 900 },
      { stepMin: 35, stepMax: 80 },
      { loopMin: 1, loopMax: 2 }
    );
    await page.delayRandomMs(1500, 3000);
    if (randomScore(100)) await page.page.close();
  } catch (e) {
    console.log("error : processNegativeTargetDomain " + e.message);
  }
  return false;
};

module.exports = processNegativeTargetDomain;

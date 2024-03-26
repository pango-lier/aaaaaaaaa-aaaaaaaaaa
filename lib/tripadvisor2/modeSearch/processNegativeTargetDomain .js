const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const goBackGoogle = require("../helper/gobackGoogle");
const switchPageHref = require("../helper/switchPageHref");

const processNegativeTargetDomain = async (page, link, config) => {
  if (!link.href) return;
  try {
    const hrefIn = await page.location();
    const timeStart = new Date().getTime();
    console.log("processNegativeTargetDomain", hrefIn);
    // await page.delayRandomMsMove(
    //   200,
    //   500,
    //   random(1000, 2000),
    //   20,
    //   'a[href*="' + link.href + '"]'
    // );

     await page.clickAndMove('a[href*="' + link.href + '"]');
    link.href = link.href.replace("#REVIEWS", "");
    // const e = await page.clickRandom(20, 50, 50);
    // console.log(e);
    // if (!e.clickSuccess) return false;
    await page.delayRandomMs(1000, 1500);
    const currentUrl = await page.location();
    let _isNewPopupPage = false;
    if (currentUrl === hrefIn) {
      isNewPopupPage = true;
    }
    const switchPage = await switchPageHref(page, link.href);
    const page2 = switchPage.pup;
    for (let index = 0; index < random(100, 120); index++) {
      if (
        new Date().getTime() - timeStart >
        config.timeoutNegativeTarget * 1000
      )
        break;
      await page2.scrollRandUpDownScoreRollBack(
        85,
        { delayMin: 5, delayMax: 10 },
        { stepMin: 50, stepMax: 300 },
        { loopMin: 1, loopMax: 2 }
      );
      await page2.delayRandomMsMove(100, 2000, random(1000, 2000), 35);
    }
    console.log(_isNewPopupPage);
    if (_isNewPopupPage) {
      if (randomScore(50)) await page2.page.close();
      await switchPageHref(page, hrefIn);
    } else {
      await goBackGoogle(page2, hrefIn);
    }
  } catch (e) {
    console.log("error : processNegativeTargetDomain " + e.message);
  }

  return false;
};

module.exports = processNegativeTargetDomain;

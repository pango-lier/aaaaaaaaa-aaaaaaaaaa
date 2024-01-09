const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const changeNumberDirectionGoogleMap = require("../helper/changeNumberDirectionGoogleMap");
const switchPageHref = require("../helper/switchPageHref");
const clickDirection = require("./clickDirection");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");

const delayMulti = async (min, max, page, config) => {
  await page.delayRandomMs(min * config.multiDelay, max * config.multiDelay);
};

const clickSave = async (page, config) => {
  console.log("clickSave");
  await delayMulti(800, 1500, page, config);
  await page.click(
    ".m6QErb > .etWJQ:nth-child(2) > .g88MCb > .DVeyrd > .Cw1rxd"
  );
  await delayMulti(800, 1500, page, config);
  await page.click(
    "div > #app-container > #fDahXd > #action-menu > .MMWRwe:nth-child(2)"
  );
  await delayMulti(800, 1500, page, config);
};

const clickSendToPhone = async (page, config) => {
  console.log("clickSendToPhone");
  await delayMulti(800, 1500, page, config);
  await page.click(
    ".m6QErb > .etWJQ:nth-child(4) > .g88MCb > .DVeyrd > .Cw1rxd"
  );
  await delayMulti(800, 1500, page, config);
  await page.click("div > .hoUMge > .hdeJwf > .ryQ5yd > .AmPKde");
  await delayMulti(800, 1500, page, config);
};

const clickShare = async (page, config) => {
  await delayMulti(800, 1500, page, config);
  await page.click(
    ".m6QErb > .etWJQ:nth-child(5) > .g88MCb > .DVeyrd > .Cw1rxd"
  );

  await delayMulti(800, 1500, page, config);
  await page.click(".m6QErb > .m6QErb > .NB4yxe > .WVlZT > .oucrtf");

  await delayMulti(800, 1500, page, config);
  await page.click("div > .hoUMge > .hdeJwf > .ryQ5yd > .AmPKde");
  await delayMulti(800, 1500, page, config);
};

const clickRandom = async (page, link, domain, config) => {
  try {
    console.log("clickRandom");
    await delayMulti(800, 1500, page, config);
    await page.clickHref('a[href*="' + link.href + '"]');
    await delayMulti(1000, 2500, page, config);
    if (link.href.search("https://www.google.com/maps/place") >= 0) {
      // if (randomScore(config.clickSaveScore)) await clickSave(page, config);
      // if (randomScore(config.clickSendToPhoneScore))
      //   await clickSendToPhone(page, config);
      if (randomScore(config.clickShareScore)) await clickShare(page, config);

      if (randomScore(config.clickDirectionScore)) {
        if (link.href.search(config?.dataText[3]) >= 0) {
          await clickDirection(page, config);
          await changeNumberDirectionGoogleMap(
            config.fileLink,
            config.dataText
          );
        }
      }
    } else {
      //await processNegativeTargetDomain(page, link, config);
    }
    console.log("switchPageHref");
    await switchPageHref(page, "https://www.google.com/maps/place");

    if (await page.checkSelector("#omnibox-singlebox > div > div > button")) {
      await page.click("#omnibox-singlebox > div > div > button");
    }

    return false;
  } catch (error) {
    console.log("Error firstClickRandom:" + error?.message || "");
  }
};

module.exports = clickRandom;

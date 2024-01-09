const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const changeNumberDirectionGoogleMap = require("../helper/changeNumberDirectionGoogleMap");
const switchPageHref = require("../helper/switchPageHref");
const clickDirection = require("./clickDirection");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");

const delayMulti = async (min, max, page, config) => {
  await page.delayRandomMs(min * config.multiDelay, max * config.multiDelay);
};

const clickReview = async (page, config) => {
  console.log("clickReview");
  await delayMulti(800, 1500, page, config);
  await page.click(
    ".yx21af > .RWPxGd > .hh2c6:nth-child(2) > .LRkQ2 > .Gpq6kf"
  );
  await delayMulti(800, 1500, page, config);
};

const clickAbout = async (page, config) => {
  console.log("clickAbout");
  await delayMulti(800, 1500, page, config);
  await page.click(
    ".yx21af > .RWPxGd > .hh2c6:nth-child(3) > .LRkQ2 > .Gpq6kf"
  );
  await delayMulti(800, 1500, page, config);
};

const clickOverView = async (page, config) => {
  console.log("clickOverView");
  await delayMulti(800, 1500, page, config);
  await page.click(
    ".yx21af > .RWPxGd > .hh2c6:nth-child(1) > .LRkQ2 > .Gpq6kf"
  );
  await delayMulti(800, 1500, page, config);
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
    if (link?.href?.indexOf("https://www.google.com/maps/place") >= 0) {
      await page.clickHref('a[href*="' + link.href + '"]');
      await delayMulti(1000, 2500, page, config);
      await clickOverView(page, config);
      if (randomScore(config.clickReviewScore)) await clickReview(page, config);
      if (randomScore(config.clickAboutScore)) await clickAbout(page, config);
      if (randomScore(config.clickOverViewScore))
        await clickOverView(page, config);

      await clickOverView(page, config);
      if (randomScore(config.clickSaveScore)) await clickSave(page, config);
      if (randomScore(config.clickSendToPhoneScore))
        await clickSendToPhone(page, config);
      if (randomScore(config.clickShareScore)) await clickShare(page, config);

      if (randomScore(config.clickDirectionScore)) {
        console.log(config?.dataText[3], link.href);
        if (
          link.href.indexOf(
            config?.dataText[3]?.replace(
              "https://www.google.com/maps/place/",
              ""
            )
          ) >= 0 &&
          parseInt(config?.dataText[4]) > 0
        ) {
          await clickDirection(page, config);
          await changeNumberDirectionGoogleMap(
            config.fileLink,
            config.dataText
          );
        }
      }

      if (randomScore(config.clickReviewScore)) await clickReview(page, config);
      if (randomScore(config.clickAboutScore)) await clickAbout(page, config);
      if (randomScore(config.clickOverViewScore))
        await clickOverView(page, config);
    } else {
      await processNegativeTargetDomain(page, link, config);
    }
    console.log("switchPageHref");
    await switchPageHref(page, "https://www.google.com/maps/place");

    if (await page.checkSelector("#omnibox-singlebox > div > div > button")) {
      await page.click("#omnibox-singlebox > div > div > button");
    }

    return false;
  } catch (error) {
    console.log("Error clickRandom:" + error?.message || "");
  }
};

module.exports = clickRandom;

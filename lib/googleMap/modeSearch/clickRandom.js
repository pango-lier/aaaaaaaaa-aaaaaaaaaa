const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const changeNumberDirectionGoogleMap = require("../helper/changeNumberDirectionGoogleMap");
const switchPageHref = require("../helper/switchPageHref");
const clickDirection = require("./clickDirection");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");

const delayMulti = async (min, max, page, config) => {
  await page.moveRandom(
    random(min * config.multiDelay, max * config.multiDelay),
    random(500, 3000)
  );
};

const clickReview = async (page, config) => {
  try {
    console.log("clickReview");
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      ".yx21af > .RWPxGd > .hh2c6:nth-child(2) > .LRkQ2 > .Gpq6kf"
    );
    await delayMulti(800, 1500, page, config);
  } catch (error) {
    console.log(error?.message);
  }
};

const clickAbout = async (page, config) => {
  try {
    console.log("clickAbout");
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      ".yx21af > .RWPxGd > .hh2c6:nth-child(3) > .LRkQ2 > .Gpq6kf"
    );
    await delayMulti(800, 1500, page, config);
  } catch (error) {
    console.log(error?.message);
  }
};

const clickOverView = async (page, config) => {
  try {
    console.log("clickOverView");
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      ".yx21af > .RWPxGd > .hh2c6:nth-child(1) > .LRkQ2 > .Gpq6kf"
    );
    await delayMulti(800, 1500, page, config);
  } catch (error) {
    console.log(error?.message);
  }
};

const clickSave = async (page, config) => {
  try {
    console.log("clickSave");
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      ".m6QErb > .etWJQ:nth-child(2) > .g88MCb > .DVeyrd > .Cw1rxd"
    );
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      "div > #app-container > #fDahXd > #action-menu > .MMWRwe:nth-child(2)"
    );
    await delayMulti(800, 1500, page, config);
  } catch (error) {
    console.log(error?.message);
  }
};

const clickSendToPhone = async (page, config) => {
  try {
    console.log("clickSendToPhone");
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      ".m6QErb > .etWJQ:nth-child(4) > .g88MCb > .DVeyrd > .Cw1rxd"
    );
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove("div > .hoUMge > .hdeJwf > .ryQ5yd > .AmPKde");
    await delayMulti(800, 1500, page, config);
  } catch (error) {
    console.log(error?.message);
  }
};

const clickShare = async (page, config) => {
  try {
    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(
      ".m6QErb > .etWJQ:nth-child(5) > .g88MCb > .DVeyrd > .Cw1rxd"
    );

    await delayMulti(800, 1500, page, config);
    await page.clickAndMove(".m6QErb > .m6QErb > .NB4yxe > .WVlZT > .oucrtf");

    await delayMulti(800, 1500, page, config);
    await page.clickAndMove("div > .hoUMge > .hdeJwf > .ryQ5yd > .AmPKde");
    await delayMulti(800, 1500, page, config);
  } catch (error) {
    console.log(error?.message);
  }
};

const switchHrefOrExit = async (page, linkCurrent) => {
  console.log("switchPageHref");
  await switchPageHref(page, linkCurrent);

  if (await page.checkSelector("#omnibox-singlebox > div > div > button")) {
    await page.clickAndMove("#omnibox-singlebox > div > div > button");
  }
  if (
    await page.checkSelector(
      "#omnibox-singlebox > .NaMBUd > .fKm1Mb > .hYBOP > .bDDiq"
    )
  ) {
    await page.clickAndMove(
      "#omnibox-singlebox > .NaMBUd > .fKm1Mb > .hYBOP > .bDDiq"
    );
  }

  if (
    await page.checkSelector(
      ".hWERUb > span > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc > .VfPpkd-kBDsod > .NMm5M"
    )
  ) {
    await page.clickAndMove(
      ".hWERUb > span > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc > .VfPpkd-kBDsod > .NMm5M"
    );
  }
  if (
    await page.checkSelector(
      "span > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc > .VfPpkd-kBDsod > .NMm5M > path"
    )
  ) {
    await page.clickAndMove(
      "span > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc > .VfPpkd-kBDsod > .NMm5M > path"
    );
  }
};

const clickRandom = async (page, link, domain, config) => {
  try {
    let linkCurrent = await page.location();
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
        console.log(
          "clickDirection",
          config?.dataText[4],
          config?.dataText[3],
          link.href
        );
        if (
          link.href.indexOf(
            config?.dataText[3]?.replace(
              "https://www.google.com/maps/place/",
              ""
            )
          ) >= 0 &&
          parseInt(config?.dataText[4]) > 0
        ) {
          console.log("clickDirection exactly");
          await clickDirection(page, config);
          await changeNumberDirectionGoogleMap(
            config.fileLink,
            config.dataText
          );
        }
      }
      // clickAndMove chi duong cho website khac
      if (randomScore(config.clickDirectionOtherSiteScore)) {
        console.log("clickDirectionOtherSiteScore");
        if (
          link.href.indexOf(
            config?.dataText[3]?.replace(
              "https://www.google.com/maps/place/",
              ""
            )
          ) < 0
        ) {
          await clickDirection(page, config);
        }
      }

      if (randomScore(config.clickReviewScore)) await clickReview(page, config);
      if (randomScore(config.clickAboutScore)) await clickAbout(page, config);
      if (randomScore(config.clickOverViewScore))
        await clickOverView(page, config);
    } else {
      await processNegativeTargetDomain(page, link, config);
    }

    await switchHrefOrExit(page, linkCurrent);
    return false;
  } catch (error) {
    console.log("Error clickRandom:" + error?.message || "");
  }
};

module.exports = clickRandom;

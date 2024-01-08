const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");

const clickRandom = async (page, link, domain, config) => {
  try {
    console.log("clickRandom");
    await page.delayRandomMs(800, 2000);
    await page.clickHref('a[href*="' + link.href + '"]');
    await page.delayRandomMs(1500, 3000);
    await page.delayRandomMs(500, 2000);
    if (link.href.search("https://www.google.com/maps/place") >= 0) {
      await clickDirection(page, config);
    } else {
      await processNegativeTargetDomain(page, link, config);
    }
    console.log("switchPageHref");
    await switchPageHref(page, "https://www.google.com/maps/search/");

    if (await page.checkSelector("#omnibox-singlebox > div > div > button")) {
      await page.click("#omnibox-singlebox > div > div > button");
    }

    return false;
  } catch (error) {
    console.log("Error firstClickRandom:" + error?.message || "");
  }
};

module.exports = clickRandom;

const clickDirection = async (page, config) => {
  const mul = 5;
  await page.delayRandomMs(500 * mul, 2000 * mul);
  await page.click(
    ".m6QErb > .etWJQ:nth-child(1) > .g88MCb > .DVeyrd > .Cw1rxd"
  );
  await page.delayRandomMs(500 * mul, 2000 * mul);
  // await page.click(".sbqs_c > .ZHeE1b > .l0wghb > .DgCNMb");
  await page.click(
    ".fC7rrc > #directions-searchbox-0 > .gstl_50 > #sb_ifc50 > .tactile-searchbox-input"
  );
  await page.type("Your location");
  await page.delayRandomMs(1000 * mul, 4000);
  await page.enter();

  await page.delayRandomMs(500 * mul, 2000 * mul);

  await page.click(".MJtgzc > div > .FkdJRd > .oya4hc:nth-child(1) > button");

  await page.delayRandomMs(500 * mul, 2000 * mul);
  await page.click(".dp9cUc > div > .MJtgzc > .YismEf > .ExQYxb");
  await page.delayRandomMs(500 * mul, 2000 * mul);
};

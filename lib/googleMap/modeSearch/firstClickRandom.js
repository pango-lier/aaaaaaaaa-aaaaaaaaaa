const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");
const processTargetDomain = require("./processTargetDomain");

const firstClickRandom = async (page, link, domain, config) => {
  try {
    console.log("firstClickRandom");
    await page.delayRandomMs(500, 1000);
    if (link.href.search(domain) >= 0) {
      await processTargetDomain(page, link, 4, 90, config);
      return true;
    } else {
      await processNegativeTargetDomain(page, link, config);
    }
    console.log("switchPageHref");
    await switchPageHref(
      page,
      "https://www.google.com/maps/place/" + config.domain
    );
    if (await page.checkSelector("#omnibox-singlebox > div > div > button")) {
      console.log("click back");
      await page.click("#omnibox-singlebox > div > div > button");
    }

    return false;
  } catch (error) {
    console.log("Error firstClickRandom:" + error?.message || "");
  }
};

module.exports = firstClickRandom;

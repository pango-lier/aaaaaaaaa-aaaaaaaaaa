const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");
const processTargetDomain = require("./processTargetDomain");

const firstClickRandom = async (page, link, domain, config) => {
  try {
    console.log("processTargetDomain");
    await page.delayRandomMs(500, 1000);
    if (link.href.search(domain) >= 0) {
      await processTargetDomain(page, link, 4, 90, 10);
      return true;
    } else {
      await processNegativeTargetDomain(page, link, 6, 87, config);
    }
    await switchPageHref(page, "https://www.tripadvisor.com/Search");
    return false;
  } catch (error) {
    console.log("Error firstClickRandom:" + error?.message || "");
  }
};

module.exports = firstClickRandom;

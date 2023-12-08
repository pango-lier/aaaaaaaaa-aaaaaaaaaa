const firstClickRandom = async (page, link, domain, config) => {
  try {
    await page.delayRandomMs(500, 1000);
    if (link.href.search(domain) >= 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Error firstClickRandom:" + error?.message || "");
  }
};

module.exports = firstClickRandom;

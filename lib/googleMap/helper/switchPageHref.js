const PuppeteerActionFunc = require("../../pup");

const switchPageHref = async (page, href) => {
  const browser = await page.page.browser();
  const pages = await browser.pages();
  for (let index = 0; index < pages.length; index++) {
    const p = pages[index];
    const pup = new PuppeteerActionFunc(p, 0.2, 0.3);
    try {
      await pup.installMouseHelper();
    } catch (error) {}
    if (await pup.isUrlCurrent(href)) {
      //  console.log("switchPageHref :" + await pup.location());
      await pup.page.bringToFront();
      await pup.delayRandomMs(1000, 2500);
      return { newPage: true, pup };
    }
  }
  return { newPage: false, pup: page };
};
module.exports = switchPageHref;

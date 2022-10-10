const PuppeteerActionFunc = require("../../pup");

getPageHref = async (page, href) => {
    const browser = await page.page.browser();
    const pages = await browser.pages();
    for (let index = 0; index < pages.length; index++) {
        const p = pages[index];
        const pup = new PuppeteerActionFunc(p, 0.2, 0.3);
        console.log("processNegativeTargetDomain :" + await pup.location());
        if (await pup.isUrlCurrent(href)) {
            await page.page.bringToFront();
            await pup.delayRandomMs(200, 500);
            return pup;
        }
    }
    return page;
}
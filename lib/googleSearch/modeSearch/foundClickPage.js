
const findLinkPageByName = require("../helper/findLinkPageByName");

const foundClickPage = async (page, linksPages, pageNumber) => {
    const domainExist = await findLinkPageByName(linksPages, pageNumber);
    if (domainExist) {
        await page.delayRandomMs(800, 3500);
        console.log("foundClickPage : Page" + pageNumber);
        await page.clickHref('a[aria-label="Page ' + pageNumber + '"]');
        await page.delayRandomMs(2000, 5000);
        return true;
    }
    return false;
}

module.exports = foundClickPage;
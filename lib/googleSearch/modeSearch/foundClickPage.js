
const findLinkPageByName = require("../helper/findLinkPageByName");

const foundClickPage = async (page, linksPages, pageNumber) => {
    const domainExist = await findLinkPageByName(linksPages, pageNumber);
    if (domainExist) {
        await page.scrollRandUpDownScore(100, { delayMin: 500, delayMax: 1000 }, { stepMin: 50, stepMax: 100 }, { loopMin: 3, loopMax: 4 });
        await page.delayRandomMs(800, 3000);
        console.log("Click Page :" + pageNumber);
        await page.clickHref('a[aria-label="Page ' + pageNumber + '"]');
        await page.delayRandomMs(2000, 5000);
        return true;
    }
    return false;
}

module.exports = foundClickPage;
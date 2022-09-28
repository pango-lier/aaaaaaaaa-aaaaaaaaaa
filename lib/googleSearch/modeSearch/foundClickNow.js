const findDomain = require("../helper/findDomain");

const foundClickNow = async (page, linkActives, domain) => {
    const domainExist = await findDomain(linkActives, domain);
    if (domainExist) {
        await page.delayRandomMs(500, 2000);
        console.log("found_click_now :" + domainExist.href);
        await page.scrollSelectorView('a[href*="' + domainExist.href + '"]');
        await page.delayRandomMs(500, 2000);
        await page.scrollRandUpDownScore(85, { delayMin: 300, delayMax: 3500 }, { stepMin: 70, stepMax: 350 }, { loopMin: 50, loopMax: 90 });
        await page.delayRandomMs(3000, 10000);
        return true;
    }
    return false;
}

module.exports = foundClickNow;
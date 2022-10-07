const { random } = require("../../until");
const findDomain = require("../helper/findDomain");
const processNegativeTargetDomain = require("./processNegativeTargetDomain ");
const processTargetDomain = require("./processTargetDomain");

const firstClickRandom = async (page, link, domain) => {
    try {
        await page.delayRandomMs(500, 1000);
        if (link.href.search(domain) >= 0) {
            await processTargetDomain(page, link, random(2, 8));
            return true;
        } else {
            await processNegativeTargetDomain(page, link, random(2, 8));
            console.log("go");
            try {
                await page.page.goBack({ load: true, timeout: random(1200, 3000) });
            } catch (e) {
            }
            console.log("goBack");
            // await page.page.waitForNavigation({ waitUntil: 'networkidle2' });

        }
        return false;
    } catch (error) {
        console.log("Error firstClickRandom:" + error?.message || '');
    }
}

module.exports = firstClickRandom;
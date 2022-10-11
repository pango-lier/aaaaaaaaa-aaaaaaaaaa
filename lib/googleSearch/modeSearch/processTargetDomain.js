const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const goBackGoogle = require("../helper/gobackGoogle");
const switchPageHref = require("../helper/switchPageHref");
const getInfoLink = require("./getInfoLink");


const processTargetDomain = async (page, link, level = 5, scoreRollDow = 85, maxChildClick = 2) => {
    await page.scrollRandUpDownScore(95, { delayMin: 500, delayMax: 1000 }, { stepMin: 26, stepMax: 87 }, { loopMin: 1, loopMax: 4 });
    await page.delayRandomMs(800, 3000);
    console.log("found_click_now :" + link.href);
    const middleClick = randomScore(70);
    if (middleClick) await page.clickHref('a[href*="' + link.href + '"]', { button: 'middle' });
    else await page.clickHref('a[href*="' + link.href + '"]');
    await page.delayRandomMs(3400, 7000);
    let newPage = false;
    if (middleClick) {
        const switchPage = await switchPageHref(page, link.href);
        page = switchPage.pup;
        newPage = switchPage.newPage;
    }
    for (let index = 0; index < random(20, 40); index++) {
        let current;
        switch (level) {
            case 2:
                current = await page.scrollRandUpDownScoreRollBack(90, { delayMin: 422, delayMax: 1500 }, { stepMin: 40, stepMax: 120 }, { loopMin: 2, loopMax: 4 });
                break;
            case 3:
                current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 200, delayMax: 2000 }, { stepMin: 60, stepMax: 200 }, { loopMin: 1, loopMax: 3 });
                break;
            default:
            case 4:
                current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 2500 }, { stepMin: 40, stepMax: 300 }, { loopMin: 1, loopMax: 2 });
                break;
            case 5:
                current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 3500 }, { stepMin: 70, stepMax: 350 }, { loopMin: 1, loopMax: 2 });
                break;
            case 6:
                current = await page.scrollRandUpDownScoreRollBack(80, { delayMin: 400, delayMax: 4000 }, { stepMin: 100, stepMax: 400 }, { loopMin: 1, loopMax: 1 });
                break;
            case 7:
                current = await page.scrollRandUpDownScoreRollBack(80, { delayMin: 500, delayMax: 3500 }, { stepMin: 200, stepMax: 450 }, { loopMin: 1, loopMax: 1 });
                break;
            case 8:
                current = await page.scrollRandUpDownScoreRollBack(85, { delayMin: 1000, delayMax: 5500 }, { stepMin: 70, stepMax: 550 }, { loopMin: 1, loopMax: 1 });
                break;
        }
        if (maxChildClick > 0) {
            const { links } = await getInfoLink(page, current);
            if (randomScore(index)) {
                if (links.length > 0) {
                    maxChildClick--;
                    await processTargetDomain(page, links[random(0, links.length)], random(2, 8), maxChildClick);
                }
            }

        }
    }
    await page.delayRandomMs(3000, 8000);
    if (newPage) {
        if (randomScore(20)) await page.page.close();
    } else {
        if (!middleClick) await goBackGoogle(page);
    }
    return false;
}

module.exports = processTargetDomain;
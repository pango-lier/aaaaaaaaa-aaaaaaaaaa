const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const switchPageHref = require("../helper/switchPageHref");



const processNegativeTargetDomain = async (page, link, level = 5, scoreRollDow = 85) => {
    await page.scrollRandUpDownScore(95, { delayMin: 500, delayMax: 900 }, { stepMin: 30, stepMax: 97 }, { loopMin: 1, loopMax: 3 });
    await page.delayRandomMs(800, 2000);
    console.log("processNegativeTargetDomain :" + link.href);
    const middleClick = randomScore(70);
    if (middleClick) await page.clickHref('a[href*="' + link.href + '"]', { button: 'middle' });
    else await page.clickHref('a[href*="' + link.href + '"]');
    await page.delayRandomMs(2500, 6500);
    let newPage = false;
    if (middleClick) {
        const switchPage = await switchPageHref(page, link.href);
        page = switchPage.pup;
        newPage = switchPage.newPage;
    }
    const location = await page.location();
    if (location.search("https://www.google.com") >= 0) {
        await page.delayRandomMs(4500, 8500);
    }


    switch (level) {
        case 2:
            await page.scrollRandUpDownScoreRollBack(90, { delayMin: 200, delayMax: 800 }, { stepMin: 120, stepMax: 600 }, { loopMin: 5, loopMax: 13 });
            break;
        case 3:
            await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 150, delayMax: 850 }, { stepMin: 180, stepMax: 800 }, { loopMin: 5, loopMax: 11 });
            break;
        default:
        case 4:
            await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 250, delayMax: 900 }, { stepMin: 230, stepMax: 900 }, { loopMin: 3, loopMax: 9 });
            break;
        case 5:
            await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 950 }, { stepMin: 250, stepMax: 1000 }, { loopMin: 4, loopMax: 8 });
            break;
        case 6:
            await page.scrollRandUpDownScoreRollBack(80, { delayMin: 300, delayMax: 800 }, { stepMin: 350, stepMax: 1100 }, { loopMin: 5, loopMax: 11 });
            break;
        case 7:
            await page.scrollRandUpDownScoreRollBack(85, { delayMin: 200, delayMax: 1200 }, { stepMin: 200, stepMax: 1200 }, { loopMin: 3, loopMax: 8 });
            break;
        case 8:
            await page.scrollRandUpDownScoreRollBack(80, { delayMin: 200, delayMax: 1000 }, { stepMin: 450, stepMax: 1400 }, { loopMin: 4, loopMax: 10 });
            break;
    }

    await page.delayRandomMs(1500, 3000);
    if (newPage) {
        if (randomScore(30)) await page.page.close();
    } else {
        await goBackGoogle(page);
    }
    return false;
}

module.exports = processNegativeTargetDomain;
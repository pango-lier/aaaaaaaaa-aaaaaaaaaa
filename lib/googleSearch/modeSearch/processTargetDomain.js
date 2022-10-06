

const processTargetDomain = async (page, link, level = 5, scoreRollDow = 85) => {
    await page.scrollRandUpDownScore(100, { delayMin: 500, delayMax: 1000 }, { stepMin: 26, stepMax: 87 }, { loopMin: 1, loopMax: 4 });
    await page.delayRandomMs(800, 3000);
    console.log("found_click_now :" + link.href);
    await page.clickHref('a[href*="' + link.href + '"]');
    await page.delayRandomMs(3400, 7000);
    switch (level) {
        case 2:
            await page.scrollRandUpDownScore(90, { delayMin: 422, delayMax: 1500 }, { stepMin: 40, stepMax: 120 }, { loopMin: 85, loopMax: 130 });
            break;
        case 3:
            await page.scrollRandUpDownScore(scoreRollDow, { delayMin: 200, delayMax: 2000 }, { stepMin: 60, stepMax: 200 }, { loopMin: 75, loopMax: 115 });
            break;
        default:
        case 4:
            await page.scrollRandUpDownScore(scoreRollDow, { delayMin: 300, delayMax: 2500 }, { stepMin: 40, stepMax: 350 }, { loopMin: 65, loopMax: 90 });
            break;
        case 5:
            await page.scrollRandUpDownScore(scoreRollDow, { delayMin: 300, delayMax: 3500 }, { stepMin: 70, stepMax: 450 }, { loopMin: 50, loopMax: 85 });
            break;
        case 6:
            await page.scrollRandUpDownScore(80, { delayMin: 400, delayMax: 4000 }, { stepMin: 100, stepMax: 550 }, { loopMin: 35, loopMax: 60 });
            break;
        case 7:
            await page.scrollRandUpDownScore(70, { delayMin: 500, delayMax: 3500 }, { stepMin: 200, stepMax: 600 }, { loopMin: 20, loopMax: 50 });
            break;
        case 8:
            await page.scrollRandUpDownScore(75, { delayMin: 1000, delayMax: 5500 }, { stepMin: 70, stepMax: 750 }, { loopMin: 25, loopMax: 40 });
            break;
    }

    await page.delayRandomMs(3000, 10000);
    return false;
}

module.exports = processTargetDomain;
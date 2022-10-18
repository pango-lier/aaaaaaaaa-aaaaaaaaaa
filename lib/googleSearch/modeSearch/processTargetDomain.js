const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const goBackGoogle = require("../helper/gobackGoogle");
const switchPageHref = require("../helper/switchPageHref");
const getInfoLink = require("./getInfoLink");


const processTargetDomain = async (page, link, level = 5, scoreRollDow = 90, config) => {
    try {
        await page.scrollRandUpDownScore(100, { delayMin: 500, delayMax: 1000 }, { stepMin: 56, stepMax: 87 }, { loopMin: 2, loopMax: 3 });
        await page.delayRandomMs(800, 3000);
        console.log("found_click_now :" + link.href);
        const middleClick = randomScore(config.rateClickNewTag);
        if (middleClick) await page.clickHref('a[href*="' + link.href + '"]', { button: 'middle' });
        else await page.clickHref('a[href*="' + link.href + '"]');
        await page.delayRandomMs(3400, 7000);
        let newPage = false;
        if (middleClick) {
            const switchPage = await switchPageHref(page, link.href);
            page = switchPage.pup;
            newPage = switchPage.newPage;
        }
        let old_y;
        for (let index = 0; index < random(40, 60); index++) {
            await page.page.evaluate(() => {
                Array.from(document.querySelectorAll('a[target="_blank"]'))
                    .forEach(link => link.removeAttribute('target'))
            });
            let current;
            switch (level) {
                case 2:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 422, delayMax: 1500 }, { stepMin: 40, stepMax: 120 }, { loopMin: 2, loopMax: 4 }, false);
                    break;
                case 3:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 200, delayMax: 2000 }, { stepMin: 60, stepMax: 200 }, { loopMin: 1, loopMax: 3 }, false);
                    break;
                default:
                case 4:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 2400 }, { stepMin: 40, stepMax: 300 }, { loopMin: 1, loopMax: 2 }, false);
                    break;
                case 5:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 300, delayMax: 2800 }, { stepMin: 70, stepMax: 350 }, { loopMin: 1, loopMax: 2 }, false);
                    break;
                case 6:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 400, delayMax: 3000 }, { stepMin: 100, stepMax: 400 }, { loopMin: 1, loopMax: 1 }, false);
                    break;
                case 7:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 500, delayMax: 3200 }, { stepMin: 150, stepMax: 450 }, { loopMin: 1, loopMax: 1 }, false);
                    break;
                case 8:
                    current = await page.scrollRandUpDownScoreRollBack(scoreRollDow, { delayMin: 600, delayMax: 3400 }, { stepMin: 70, stepMax: 550 }, { loopMin: 1, loopMax: 1 }, false);
                    break;
            }
            if (config.maxChildClick > 0) {
                if (randomScore(7)) {

                    try {
                        const { linkActives, size } = await getInfoLink(page, current, 'a');
                        //         console.log(linkActives);
                        if (linkActives.length > 0) {
                            const linkActive = linkActives[random(0, linkActives.length - 1)];
                            console.log("click " + linkActive.href);
                            await page.clickHref('a[href*="' + linkActive.href + '"]');
                            await page.delayRandomMs(1500, 4000);
                            config.maxChildClick--;
                        }
                        if (old_y === current.y && Math.abs(current.y) < 5) {
                            scoreRollDow = scoreRollDow > 50 ? scoreRollDow : 100 - scoreRollDow;
                            console.log("scoreRollDow down", scoreRollDow);
                        }
                        if (old_y === current.y && old_y >= size.h - 5) {
                            scoreRollDow = scoreRollDow > 50 ? 100 - scoreRollDow : scoreRollDow;
                            console.log("scoreRollDow up", scoreRollDow);
                        }
                        old_y = current.y;
                    } catch (error) {
                        console.log(error.message);
                    }
                }

            }

        }
        await page.delayRandomMs(2000, 5000);
        if (newPage) {
            if (randomScore(20)) await page.page.close();
        } else {
            if (!middleClick && randomScore(10)) await goBackGoogle(page);
        }
    }
    catch (e) {
        console.log("Error - processTargetDomain: " + e.message);
    }
    return false;
}

module.exports = processTargetDomain;
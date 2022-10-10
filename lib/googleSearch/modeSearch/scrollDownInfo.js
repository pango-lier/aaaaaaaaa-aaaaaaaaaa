const findDomain = require("../helper/findDomain");
const getSearchLinks = require("../helper/getSearchLinks");
const getSearchPageLink = require("../helper/getSearchPageLink");
const getLinkInnerWindow = require("./getLinkInnerWindow");
const getLinkInnerWindowPage = require("./getLinkInnerWindowPage");

const scrollDownInfo = async (page, domain, scoreDown = 85, scrollFast = 3) => {
    await page.page.evaluate(() => {
        Array.from(document.querySelectorAll('a[target="_blank"]'))
            .forEach(link => link.removeAttribute('target'))
    });
    const location = await page.location();
    if (location.search("https://www.google.com") < 0) {
        try {
            await page.page.goBack({ load: true, timeout: random(2700, 3800) });
        } catch (e) {
        }
    }
    let current;
    switch (scrollFast) {
        case 1:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 600 }, { stepMin: 10, stepMax: 25 }, { loopMin: 1, loopMax: 4 });
            break;
        case 2:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 700 }, { stepMin: 20, stepMax: 60 }, { loopMin: 1, loopMax: 3 });
            break;
        default:
        case 3:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 800 }, { stepMin: 40, stepMax: 70 }, { loopMin: 1, loopMax: 3 });
            break;
        case 4:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 900 }, { stepMin: 40, stepMax: 100 }, { loopMin: 1, loopMax: 1 });
            break;
        case 5:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 1000 }, { stepMin: 20, stepMax: 200 }, { loopMin: 1, loopMax: 1 });
            break;
        case 6:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 1100 }, { stepMin: 40, stepMax: 350 }, { loopMin: 1, loopMax: 1 });
            break;
        case 7:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 1200 }, { stepMin: 40, stepMax: 400 }, { loopMin: 1, loopMax: 1 });
            break;
        case 8:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 1400 }, { stepMin: 40, stepMax: 450 }, { loopMin: 1, loopMax: 1 });
            break;
        case 9:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 1600 }, { stepMin: 60, stepMax: 500 }, { loopMin: 1, loopMax: 1 });
            break;
        case 10:
            current = await page.scrollRandUpDownScore(scoreDown, { delayMin: 100, delayMax: 1800 }, { stepMin: 50, stepMax: 550 }, { loopMin: 1, loopMax: 1 });
            break;
    }

    const size = await page.getSizeWindow();
    const body = await page.getSizeWindowBody();

    const links = await getSearchLinks('a[href*="http"]', page);

    const domainFounded = await findDomain(links, domain);
    const linkActives = await getLinkInnerWindow(current, links, size);
    const pages = await getSearchPageLink('a[href*="/search?q="]', page);
    const pagesActives = await getLinkInnerWindowPage(pages, size);
    let endPage = false;
    let startPage = false;
    if (Math.abs(current.y) < 2) startPage = true;
    if (pagesActives.length > 0) {
        endPage = (body.h <= current.y + size.h);
    }
    console.log(body, size, current, endPage, startPage);
    return { domainFounded, links, size, body, linkActives, endPage, startPage, pages: pagesActives };
}

module.exports = scrollDownInfo;
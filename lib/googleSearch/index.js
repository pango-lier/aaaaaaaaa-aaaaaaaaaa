
const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const findDomain = require("./helper/findDomain");
const getSearchLinks = require("./helper/getSearchLinks");
const getSearchPageLink = require("./helper/getSearchPageLink");
const randomUpDown = require("./helper/randomUpDown");
const firstClickRandom = require("./modeSearch/firstClickRandom");
const foundClickNow = require("./modeSearch/foundClickNow");
const foundClickPage = require("./modeSearch/foundClickPage");

class GoogleSearch {
    page;
    ua;
    size;
    found = false;
    constructor(pup) {
        this.page = pup;
    }

    async typeSearch(keywords) {
        await this.page.goto('https://www.google.com.vn', { waitUntil: "domcontentloaded" });
        await this.page.delayRandomMs(600, 6000);
        this.ua = await this.page.UA();
        await this.page.click('input[name="q"]');
        await this.page.input(keywords);
        await this.page.delayRandomMs(500, 6000);
        await this.page.enter();
        await this.page.delayRandomMs(2000, 4000);
        // await this.page.page.waitForNavigation();

    }

    async clickDomain() {
        const domain = "nhomkinhdalat.com";
        switch (random(0, 10)) {
            default:
            case 0:
                await this.scrollSlowlyTopToBottomFoundClickNow(domain);
                break;
        }
        console.log("End Process google search .");
    }

    async scrollSlowlyTopToBottomFoundClickNow(domain, page = 2, config = { maxClickNextStep: 1 }) {
        let numberLinkClick = 0;
        let foundDomain = false;
        let step = 'process';
        let domainFoundedAtPage;
        for (let i = 0; i < 600; i++) {
            const info = await this.scrollDownInfo(domain, 90, 3);
            if (info.domainFounded) {
                domainFoundedAtPage = { page, link: info.domainFounded };
            }
            console.log("Step-->> " + step + " : " + i + " .Link Active :" + info.linkActives.length + ".Click " + numberLinkClick);
            switch (step) {
                default:
                case 'process':
                    if (randomScore(80 - (numberLinkClick * 10 > 65 ? 65 : numberLinkClick * 10))) {
                        foundDomain = await firstClickRandom(this.page, info.linkActives[random(0, info.linkActives.length - 1)], domain);
                        if (foundDomain) {
                            step = 'after-found';
                        }
                        numberLinkClick++;
                    }
                    if (!foundDomain) {
                        foundDomain = await foundClickNow(this.page, info.linkActives, domain);
                        if (foundDomain) step = 'after-found';
                    }
                    break;
                case 'after-found':
                    await this.apterFound(foundDomain);
                    break;
            }

            if (info.endPage) {
                await foundClickPage(this.page, info.pages, page);
                if (page < 9) {
                    page++;
                    continue;
                }
                break;
            }
        }
        return foundDomain;
    }
    async apterFound(foundDomain) {
        await this.page.delayRandomMs(200, 500);
        // await this.page.page.goBack();
        await this.page.page.close();
        await this.page.delayRandomMs(3000, 5000);

    }

    async scrollDownInfo(domain, scoreDown = 85, scrollFast = 3) {
        let current;
        switch (scrollFast) {
            case 1:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 800 }, { stepMin: 10, stepMax: 25 }, { loopMin: 1, loopMax: 4 });
                break;
            case 2:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 1000 }, { stepMin: 20, stepMax: 60 }, { loopMin: 1, loopMax: 3 });
                break;
            default:
            case 3:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 1000 }, { stepMin: 40, stepMax: 70 }, { loopMin: 1, loopMax: 3 });
                break;
            case 4:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 1300 }, { stepMin: 40, stepMax: 100 }, { loopMin: 1, loopMax: 1 });
                break;
            case 5:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 800, delayMax: 1500 }, { stepMin: 20, stepMax: 200 }, { loopMin: 1, loopMax: 1 });
                break;
            case 6:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 1600 }, { stepMin: 10, stepMax: 350 }, { loopMin: 1, loopMax: 1 });
                break;
            case 7:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 1800 }, { stepMin: 10, stepMax: 400 }, { loopMin: 1, loopMax: 1 });
                break;
            case 8:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 2000 }, { stepMin: 10, stepMax: 450 }, { loopMin: 1, loopMax: 1 });
                break;
            case 9:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 2200 }, { stepMin: 10, stepMax: 500 }, { loopMin: 1, loopMax: 1 });
                break;
            case 10:
                current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 2400 }, { stepMin: 10, stepMax: 550 }, { loopMin: 1, loopMax: 1 });
                break;
        }

        const size = await this.page.getSizeWindow();
        const body = await this.page.getSizeWindowBody();

        const links = await getSearchLinks('a[href*="http"]', this.page);

        const domainFounded = await findDomain(links, domain);
        const linkActives = await this.getLinkInnerWindow(current, links, size);
        const pages = await getSearchPageLink('a[href*="/search?q="]', this.page);
        const pagesActives = await this.getLinkInnerWindowPage(pages, size);
        let endPage = false;
        if (pagesActives.length > 0) {
            endPage = (body.h <= current.y + size.h);
        }
        console.log(body, size, current, endPage);
        return { domainFounded, links, size, body, linkActives, endPage, pages: pagesActives };
    }


    async getLinkInnerWindow(positionCurrent, links, size) {
        this.ua = await this.page.UA();
        let offsetY = 0;
        if (this.ua === "mobie") offsetY = 0;
        links = [...new Set(links)];
        return links.filter((link) => Math.abs(link.y) > positionCurrent.y && Math.abs(link.y) < positionCurrent.y + size.h - offsetY && Math.abs(link.x) > Math.abs(positionCurrent.x) + 0 && link.x < positionCurrent.x + 200);
    }

    async getLinkInnerWindowPage(links, size) {
        links = [...new Set(links)];
        return links.filter((link) => Math.abs(link.y) <= size.h);
    }


}

module.exports = GoogleSearch;

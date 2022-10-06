
const randomScore = require("../helper/randomScore");
const { random } = require("../until");
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
            // case 1:
            //     await this.scrollSlowlyTopToBottom("random_click", domain);
            //     break;
        }
        console.log("End Process google search .");
    }

    async scrollSlowlyTopToBottomFoundClickNow(domain, page = 2, config = { maxClickNextStep: 1 }) {
        let numberLinkClick = 0;
        let foundDomain = false;
        let step = 'first';
        for (let i = 0; i < 600; i++) {
            const info = await this.scrollDownInfo();
            console.log("Step-->> " + step + " : " + i + " .Link Active :" + info.linkActives.length);
            switch (step) {
                default:
                case 'first':
                    if (randomScore(80)) {
                        foundDomain = await firstClickRandom(this.page, info.linkActives[random(0, info.linkActives.length - 1)], domain);
                        if (foundDomain) {
                            step = 'after-found';
                        }
                        numberLinkClick++;
                    } else if (randomScore(25) || numberLinkClick > config.maxClickNextStep) {
                        step = 'process';
                    }
                    break;
                case 'process':
                    if (randomScore(25)) {
                        foundDomain = await firstClickRandom(this.page, info.linkActives[random(0, info.linkActives.length - 1)], domain);
                        if (foundDomain) {
                            step = 'after-found';
                        }
                        numberLinkClick++;
                    } else if (randomScore(100)) {
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
                if (page < 6) {
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
        await this.page.delayRandomMs(3000, 5000);
    }

    async scrollSlowlyTopToBottom(mode, domain) {
        while (true) {
            const { linkActives, endPage } = await scrollDownInfo();
            switch (mode) {
                default:
                case "found_click_now":
                    this.found = await foundClickNow(this.page, linkActives, domain);
                    break;
                case "random_click":
                    continue;
                    const randomClick = random(0, linkActives.length - 1);
                    console.log("random_click :" + linkActives[randomClick].href);
                    await this.page.scrollSelectorView('a[href*="' + linkActives[randomClick].href + '"]');
                    await this.page.delayRandomMs(500, 2000);
                    if (linkActives[randomClick].href.search(domain) >= 0) {
                        console.log("Founded");
                        await this.page.scrollRandDown({ delayMin: 300, delayMax: 1000 }, { stepMin: 50, stepMax: 100 }, { loopMin: 10, loopMax: 30 });
                        await this.page.delayRandomMs(3000, 10000);
                        found = true;
                    } else {
                        await this.page.scrollRandDown({ delayMin: 200, delayMax: 1000 }, { stepMin: 50, stepMax: 100 }, { loopMin: 4, loopMax: 8 });
                        await this.page.delayRandomMs(3000, 10000);
                        await this.page.page.goBack();
                        await this.page.delayRandomMs(3000, 10000);
                    }
                    break;
            }

            await this.page.delayRandomMs(200, 500);
            if (this.found) break;
        }
        return found;
    }


    async scrollDownInfo(scoreDown = 85) {
        const current = await this.page.scrollRandUpDownScore(scoreDown, { delayMin: 200, delayMax: 600 }, { stepMin: 40, stepMax: 60 }, { loopMin: 1, loopMax: 3 });
        const size = await this.page.getSizeWindow();
        const body = await this.page.getSizeWindowBody();
        const endPage = (body.h <= current.y + size.h);
        const links = await getSearchLinks('a[href*="http"]', this.page);

        const linkActives = await this.getLinkInnerWindow(current, links, size);
        const pages = await getSearchPageLink('a[href*="/search?q="]', this.page);
        const pagesActives = await this.getLinkInnerWindowPage(pages, size);
        console.log(body, size, current, endPage);
        return { links, size, body, linkActives, endPage, pages: pagesActives };
    }


    async getLinkInnerWindow(positionCurrent, links, size) {
        this.ua = await this.page.UA();
        let offsetY = 160;
        if (this.ua === "mobie") offsetY = 40;
        links = [...new Set(links)];
        return links.filter((link) => Math.abs(link.y) > positionCurrent.y + 20 && Math.abs(link.y) < positionCurrent.y + size.h - offsetY && Math.abs(link.x) > Math.abs(positionCurrent.x) + 20 && link.x < positionCurrent.x + 200);
    }

    async getLinkInnerWindowPage(links, size) {
        links = [...new Set(links)];
        return links.filter((link) => Math.abs(link.y) <= size.h);
    }


}

module.exports = GoogleSearch;

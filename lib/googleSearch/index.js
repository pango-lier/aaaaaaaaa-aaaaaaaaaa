
const { random } = require("../until");
const getSearchLinks = require("./helper/getSearchLinks");
const getSearchPageLink = require("./helper/getSearchPageLink");
const randomUpDown = require("./helper/randomUpDown");
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

    }

    async scrollSlowlyTopToBottomFoundClickNow(domain, page = 0) {
        let foundDomain = false;
        for (let i = 0; i < 100; i++) {
            const { linkActives, endPage, pages } = await this.scrollDownInfo();
            foundDomain = await foundClickPage(this.page, pages, 2);
            //await foundClickNow(this.page, linkActives, domain);
            await this.page.delayRandomMs(200, 500);
            if (foundDomain) break;
            if (endPage) {
                if (page < 5) {
                    page++;
                }
                break;
            }
        }
        return foundDomain;
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


    async scrollDownInfo() {
        const current = await randomUpDown(this.page, 85, { delayMin: 200, delayMax: 600 }, { stepMin: 40, stepMax: 60 }, { loopMin: 1, loopMax: 3 });
        const size = await this.page.getSizeWindow();
        const body = await this.page.getSizeWindowBody();
        const endPage = (body.h <= current.y + size.h);
        const links = await getSearchLinks('a[href*="http"]', this.page);

        const linkActives = await this.getLinkInnerWindow(current, links, size);
        const pages = await getSearchPageLink('a[href*="/search?q="]', this.page);
        const pagesActives = await this.getLinkInnerWindowPage(current, pages, size);

        return { links, size, body, linkActives, endPage, pages: pagesActives };
    }


    async getLinkInnerWindow(posionCurent, links, size) {
        this.ua = await this.page.UA();
        let offsetY = 160;
        if (this.ua === "mobie") offsetY = 40;
        links = [...new Set(links)];
        return links.filter((link) => link.y > posionCurent.y + 20 && link.y < posionCurent.y + size.h - offsetY && link.x > posionCurent.x + 20 && link.x < posionCurent.x + 200);
    }

    async getLinkInnerWindowPage(posionCurent, links, size) {
        this.ua = await this.page.UA();
        let offsetY = 160;
        if (this.ua === "mobie") offsetY = 40;
        links = [...new Set(links)];
        console.log(posionCurent, links, size);
        return links.filter((link) => link.y > posionCurent.y + 20 && link.y < posionCurent.y + size.h - offsetY && link.x > posionCurent.x);
    }


}

module.exports = GoogleSearch;

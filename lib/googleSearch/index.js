
const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const firstClickRandom = require("./modeSearch/firstClickRandom");
const foundClickNow = require("./modeSearch/foundClickNow");
const foundClickPage = require("./modeSearch/foundClickPage");
const gotoRandomWeb = require("./modeSearch/gotoWeb");
const scrollDownInfo = require("./modeSearch/scrollDownInfo");

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
        await this.page.click('input[name="q"]');
        await this.page.input(keywords);
        await this.page.delayRandomMs(500, 6000);
        await this.page.enter();
        await this.page.delayRandomMs(2000, 4000);
        // await this.page.page.waitForNavigation();

    }

    async run(keywords, domain, extraDomainStart = [], extraDomainEnd = []) {
        if (randomScore(10)) await gotoRandomWeb(this.page, extraDomainStart, 85, random(2, 8));
        await this.typeSearch(keywords[random(0, keywords.length - 1)]);
        await this.scrollSlowlyTopToBottomFoundClickNow(domain, {
            levelScroll: random(1, 6),// level cang cao thi scroll cang nhanh. tu 1-10level
            rateClickOtherLink: random(60, 90), // level cang cao thi xac xuat click vao bat ky cang cao
            maxChildClick: 2,
            rateClickNewTag: 70,
            maxPage: 5,
            pageMode: "ascending", // random chon page  ascending/random-optimize
            scoreScrollDown: 90,
            scoreScrollUp: 90,
            rateEnableScrollUp: 0,
            rateEnableScrollDown: 100,
            domain
        });

        if (randomScore(10)) await gotoRandomWeb(this.page, extraDomainEnd, 85, random(2, 8));
        console.log("End Process google search .");
    }

    async scrollSlowlyTopToBottomFoundClickNow(domain, config) {
        let numberLinkClick = 0;
        let foundDomain = false;
        let step = 'process';
        let domainFoundedAtPage;
        let scrollDown = true;
        let page = 1;
        for (let p = 0; p < config.maxPage; p++) {
            for (let i = 0; i < random(70, 100); i++) {
                const info = await scrollDownInfo(this.page, domain, scrollDown ? config.scoreScrollDown : (100 - config.scoreScrollUp), config.levelScroll);
                console.log("Step-->> " + step + " : " + i + " .Link Active :" + info.linkActives.length + ".Click " + numberLinkClick);
                if (info.domainFounded) {
                    domainFoundedAtPage = { page, link: info.domainFounded };
                }
                switch (step) {
                    default:
                    case 'process':
                        const rateClick = config.rateClickOtherLink - (numberLinkClick * 15 > 70 ? 70 : numberLinkClick * 15);
                        if (randomScore(rateClick > 10 ? rateClick : 10)) {
                            foundDomain = await firstClickRandom(this.page, info.linkActives[random(0, info.linkActives.length - 1)], domain, config);
                            if (foundDomain) {
                                step = 'after-found';
                            }
                            numberLinkClick++;
                        }
                        if (!foundDomain) {
                            foundDomain = await foundClickNow(this.page, info.linkActives, domain, config);
                            if (foundDomain) step = 'after-found';
                        }
                        break;
                    case 'after-found':
                        await this.apterFound(foundDomain);
                        console.log("found domain " + page);
                        return foundDomain;
                }
                if (info.startPage) { // scroll-down when goto up;
                    if (randomScore(config.rateEnableScrollDown)) {
                        scrollDown = true;
                        config.levelScroll = random(4, 8);
                    }
                }
                if (info.endPage) {
                    config.levelScroll = random(3, 10);
                    if (randomScore(config.rateEnableScrollUp)) {
                        scrollDown = false;
                    } else {
                        page = await foundClickPage(this.page, info.pages, page, config);
                        break;
                    }
                }
            }
        }

        return foundDomain;
    }
    async apterFound(foundDomain) {
        await this.page.delayRandomMs(200, 500);
    }









}

module.exports = GoogleSearch;

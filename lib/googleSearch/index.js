
const randomScore = require("../helper/randomScore");
const { random } = require("../until");
const findDomain = require("./helper/findDomain");
const getSearchLinks = require("./helper/getSearchLinks");
const getSearchPageLink = require("./helper/getSearchPageLink");
const randomUpDown = require("./helper/randomUpDown");
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

    async clickDomain() {
        const domain = "nhomkinhdalat.com";
        const extraDomainStart = ["https://www.facebook.com/"];// danh sach link se tuong tac, co nhieu hon 1 thi se random chon 1 link.
        const extraDomainEnd = ["https://www.facebook.com/"];
        switch (random(0, 10)) {
            default:
            case 0:
                if (randomScore(90)) await gotoRandomWeb(this.page, extraDomainStart, 85, random(2, 8));
                await this.scrollSlowlyTopToBottomFoundClickNow(domain, {
                    levelScroll: random(1, 10),// level cang cao thi scroll cang nhanh. tu 1-10level
                    rateClickOtherLink: random(50, 80) // level cang cao thi xac xuat click vao bat ky cang cao
                });
                if (randomScore(20)) await gotoRandomWeb(this.page, extraDomainEnd, 85, random(2, 8));
                break;
        }
        console.log("End Process google search .");
    }

    async scrollSlowlyTopToBottomFoundClickNow(domain, config = { levelScroll: 3, rateClickOtherLink: 80, scoreScrollDown: 90, scoreScrollUp: 90, rateEnableScrollUp: 40, rateEnableScrollDown: 100 }) {
        let numberLinkClick = 0;
        let foundDomain = false;
        let step = 'process';
        let domainFoundedAtPage;
        let scrollDown = true;
        let page = 2;
        for (let i = 0; i < random(350, 625); i++) {
            const info = await scrollDownInfo(this.page, domain, scrollDown ? config.scoreScrollDown : (100 - config.scoreScrollUp), page, levelScroll);
            console.log("Step-->> " + step + " : " + i + " .Link Active :" + info.linkActives.length + ".Click " + numberLinkClick);
            if (info.domainFounded) {
                domainFoundedAtPage = { page, link: info.domainFounded };
            }
            switch (step) {
                default:
                case 'process':
                    const rateClick = rateClickOtherLink - (numberLinkClick * 10 > 70 ? 70 : numberLinkClick * 10);
                    if (randomScore(rateClick > 0 ? rateClick : 0)) {
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
                    return foundDomain;
                    break;
            }
            if (info.startPage) { // scroll-down when goto up;
                if (randomScore(config.rateEnableScrollDown)) {
                    scrollDown = true;
                    levelScroll = random(4, 8);
                }
            }
            if (info.endPage) {
                if (randomScore(config.rateEnableScrollUp)) {
                    scrollDown = false;
                    levelScroll = random(3, 10);
                } else {
                    await foundClickPage(this.page, info.pages, page);
                    if (page < 9) {
                        page++;
                        continue;
                    }
                    break;
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

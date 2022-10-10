
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

    async run(keywords) {
        const domain = "nhomkinhdalat.com";
        const extraDomainStart = ["https://www.facebook.com/"];// danh sach link se tuong tac, co nhieu hon 1 thi se random chon 1 link.
        const extraDomainEnd = ["https://www.facebook.com/"];
        const score = random(0, 100);
        if (score <= 90) {
            if (randomScore(20)) await gotoRandomWeb(this.page, extraDomainStart, 85, random(2, 8));
            await this.typeSearch(keywords);
            await this.scrollSlowlyTopToBottomFoundClickNow(domain, {
                levelScroll: random(1, 10),// level cang cao thi scroll cang nhanh. tu 1-10level
                rateClickOtherLink: random(50, 80), // level cang cao thi xac xuat click vao bat ky cang cao
                pageMode: "random-optimize", // random chon page  ascending/random-optimize
            });
            if (randomScore(20)) await gotoRandomWeb(this.page, extraDomainEnd, 85, random(2, 8));
        } else if (score <= 100) {
            await this.typeSearch(keywords);
            await this.scrollSlowlyTopToBottomFoundClickNow(domain, {
                levelScroll: 3,// level cang cao thi scroll cang nhanh. tu 1-10level
                rateClickOtherLink: 50, // level cang cao thi xac xuat click vao bat ky cang cao
                pageMode: "ascending", // random chon page  ascending/random-optimize
            });
        }


        console.log("End Process google search .");
    }

    async scrollSlowlyTopToBottomFoundClickNow(domain, config = { pageMode: "random-optimize", levelScroll: 3, rateClickOtherLink: 80, scoreScrollDown: 90, scoreScrollUp: 90, rateEnableScrollUp: 40, rateEnableScrollDown: 100 }) {
        let numberLinkClick = 0;
        let foundDomain = false;
        let step = 'process';
        let domainFoundedAtPage;
        let scrollDown = true;
        let page = 1;
        for (let i = 0; i < random(350, 625); i++) {
            const info = await scrollDownInfo(this.page, domain, scrollDown ? config.scoreScrollDown : (100 - config.scoreScrollUp), page, config.levelScroll);
            console.log("Step-->> " + step + " : " + i + " .Link Active :" + info.linkActives.length + ".Click " + numberLinkClick);
            if (info.domainFounded) {
                domainFoundedAtPage = { page, link: info.domainFounded };
            }
            switch (step) {
                default:
                case 'process':
                    const rateClick = config.rateClickOtherLink - (numberLinkClick * 10 > 70 ? 70 : numberLinkClick * 10);
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
                    console.log("found domain " + page);
                    return foundDomain;
                    break;
            }
            if (info.startPage) { // scroll-down when goto up;
                if (randomScore(config.rateEnableScrollDown)) {
                    scrollDown = true;
                    config.levelScroll = random(4, 8);
                }
            }
            if (info.endPage) {
                if (randomScore(config.rateEnableScrollUp)) {
                    scrollDown = false;
                    config.levelScroll = random(3, 10);
                } else {
                    if (page < 9) {
                        page = this.selectPage(page, config.pageMode);

                    } else return false;
                    await foundClickPage(this.page, info.pages, page);
                    continue;
                }
            }
        }
        return foundDomain;
    }
    async apterFound(foundDomain) {
        await this.page.delayRandomMs(200, 500);
    }
    selectPage(page, mode = "random-optimize") {
        switch (mode) {
            case "ascending":
                page++;
                break;

            default:
            case "random-optimize":
                if (page === 1) {
                    const score = random(0, 100);
                    if (score < 80) page = 2;
                    else if (score < 88) page = 3;
                    else if (score < 90) page = 4;
                    else if (score < 93) page = 5;
                    else if (score < 95) page = 6;
                    else if (score < 97) page = 7;
                    else page = 8;
                } else if (page === 2) {
                    const score = random(0, 100);
                    if (score < 20) page = 1;
                    else if (score < 80) page = 3;
                    else if (score < 90) page = 4;
                    else if (score < 93) page = 5;
                    else if (score < 95) page = 6;
                    else if (score < 97) page = 7;
                    else page = 8;
                }
                else if (page === 3) {
                    const score = random(0, 100);
                    if (score < 20) page = 1;
                    else if (score < 28) page = 2;
                    else if (score < 85) page = 4;
                    else if (score < 92) page = 5;
                    else if (score < 95) page = 6;
                    else if (score < 97) page = 7;
                    else page = 8;
                }
                else if (page === 4) {
                    const score = random(0, 100);
                    if (score < 20) page = 1;
                    else if (score < 24) page = 2;
                    else if (score < 28) page = 3;
                    else if (score < 93) page = 5;
                    else if (score < 95) page = 6;
                    else if (score < 97) page = 7;
                    else page = 8;
                }
                else if (page === 5) {
                    const score = random(0, 100);
                    if (score < 30) page = 1;
                    else if (score < 34) page = 2;
                    else if (score < 38) page = 3;
                    else if (score < 42) page = 4;
                    else if (score < 95) page = 6;
                    else if (score < 97) page = 7;
                    else page = 8;
                }
                else if (page === 6) {
                    const score = random(0, 100);
                    if (score < 40) page = 1;
                    else if (score < 45) page = 2;
                    else if (score < 50) page = 3;
                    else if (score < 55) page = 4;
                    else if (score < 60) page = 5;
                    else if (score < 95) page = 7;
                    else page = 8;
                }
                else if (page === 7) {
                    const score = random(0, 100);
                    if (score < 50) page = 1;
                    else if (score < 55) page = 2;
                    else if (score < 60) page = 3;
                    else if (score < 65) page = 4;
                    else if (score < 70) page = 5;
                    else if (score < 75) page = 6;
                    else page = 8;
                }
                else if (page === 8) {
                    const score = random(0, 100);
                    if (score < 80) page = 1;
                    else if (score < 85) page = 2;
                    else if (score < 90) page = 3;
                    else if (score < 93) page = 4;
                    else if (score < 95) page = 5;
                    else if (score < 97) page = 6;
                    else page = 7;
                }
                break;
        }
        return page;
    }









}

module.exports = GoogleSearch;


class GoogleSearch {
    page;
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
        await this.page.delayRandomMs(900, 3000);
        await this.page.scrollRandDown({ delayMin: 300, delayMax: 2000 }, { stepMin: 50, stepMax: 100 }, { loopMin: 5, loopMax: 10 });        const links = await this.page.getQuerySelectorAll('a[href*="http"]');
        console.log("Goto link : " + links[11]);
        await this.page.scrollSelectorView('a[href*="' + links[11] + '"]');

    }


    async isUrlImage() {
        try {
            const urls = await this.page.url();
            const checkExtUrl = urls.split('.');
            const type = checkExtUrl[checkExtUrl.length - 1];
            if (['png', 'jpg', 'svg', 'gif', 'pdf'].includes(type)) {
                return true;
            }

        } catch (e) {
            console.log(e.message + " . " + this.page.location);
        }
        return false;
    }
}

module.exports = GoogleSearch;

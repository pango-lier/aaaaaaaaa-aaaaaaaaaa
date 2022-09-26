
class GoogleSearch {
    page;
    constructor(pup) {
        this.page = pup;
    }

    async typeSearch(keywords) {
        await this.page.goto('https://www.google.com.vn', { waitUntil: "domcontentloaded" });
        await this.page.delayRandomMs(900, 6000);
        await this.page.click('input[name="q"]');
        await this.page.input(keywords);
        await this.page.delayRandomMs(900, 6000);
        await this.page.enter();
        await this.page.delayRandomMs(900, 6000);
        console.log(await this.page.getQuerySelectorAll('a[href*="http"]'));
        await this.page.scrollRandDown({ delayMin: 200, delayMax: 4000 }, { stepMin: 50, stepMax: 400 }, { loopMin: 1, loopMax: 7 });
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

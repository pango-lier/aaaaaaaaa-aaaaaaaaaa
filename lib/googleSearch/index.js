
class GoogleSearch {
    page;
    constructor(pup) {
        this.page = pup;
    }

    async typeSearch(keywors) {
        await this.page.goto('https://www.google.com.vn', { waitUntil: "domcontentloaded" });
        await this.page.page.waitForTimeout(60000);
        await this.page.click('input[name="q"]');
        await this.page.input(keywors);
        await this.page.delayRandom(1, 6);
        await this.page.enter();
        await this.page.delayRandom(2, 7);
        await this.page.scrollRandDown({ delayMin: 2, delayMax: 9 }, { stepMin: 50, stepMax: 400 }, { loopMin: 1, loopMax: 6 });
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

const URL_YOUTUBE_ACCOUNT = "https://www.youtube.com/";
const CLICK_POPUP_CREATE = '#endpoint';
const createFirstChannel = async (page) => {
    try {
        console.log("------createFirstChannel");
        await page.goto(URL_YOUTUBE_ACCOUNT);
        await page.delay(3);
        await page.click("#avatar-btn");
        await page.delay(4);
        if ((await this.page.checkSelector(CLICK_POPUP_CREATE)) === true) {
            await page.click(CLICK_POPUP_CREATE);
            await page.delay(2);
            await page.click("#create-channel-button");
            await page.delay(30);
            console.log("createFirstChannel is successful .");
        }
        await page.delay(4);
    } catch (e) {
        console.log(e.message + " . " + page.location);
    }
};

module.exports = createFirstChannel;
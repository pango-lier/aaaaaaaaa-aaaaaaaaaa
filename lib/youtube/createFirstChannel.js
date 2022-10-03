const URL_YOUTUBE_ACCOUNT = "https://www.youtube.com/";
const CLICK_POPUP_CREATE = '#endpoint > tp-yt-paper-item';
const createFirstChannel = async (page) => {
    try {
        console.log("------createFirstChannel");
        await page.goto(URL_YOUTUBE_ACCOUNT);
        await page.delay(3);
        await page.click("#avatar-btn");
        await page.delay(4);
        if ((await page.checkSelector(CLICK_POPUP_CREATE)) === true) {
            console.log("------click pop up");
            try {
                await page.click(CLICK_POPUP_CREATE);
            } catch (error) {
                console.log("Click #items ytd- .");
                await page.click("#items ytd-compact-link-renderer a tp-yt-paper-item");
            }

            await page.delay(2);
            // await page.click("#create-channel-button");
            await page.delay(30);
            console.log("createFirstChannel is successful .");
        } else {
            console.log("Button Create Channel not found .");
        }
        await page.delay(4);
    } catch (e) {
        console.log(e.message + " . " + page.location);
    }
};

module.exports = createFirstChannel;
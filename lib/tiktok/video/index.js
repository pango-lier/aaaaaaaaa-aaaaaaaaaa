const { delayRandomMs } = require("../../until");
const { addComment } = require("./addComment");
const { clickTim2 } = require("./clickTim");


const videoTikTok = async (page) => {
    console.log("start videoTikTok");
    await page.page.setDefaultNavigationTimeout(90000);
    await page.page.setViewport({ width: 1366, height: 768 });
    await delayRandomMs(200, 500);
    // const link = await randomParseTextToArray(fileLink);

    await page.page.bringToFront();
    await page.goto("https://www.tiktok.com/@mixximuse/video/7171375417109105947?is_copy_url=1&is_from_webapp=v1");
    await delayRandomMs(200, 500);
    await  addComment(page,"oke hay do");
   // await clickTim2(page);
    console.log("end videoTikTok");
}

module.exports = videoTikTok
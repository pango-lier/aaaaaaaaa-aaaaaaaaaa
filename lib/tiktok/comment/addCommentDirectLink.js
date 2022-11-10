const { randomParseTextToArray } = require("../../helper");
const randomScore = require("../../helper/randomScore");
const { delayRandomMs, delay, delayRandom } = require("../../until");
const changeNumberSearchFileTikTok = require("../helper/changeNumberSearchFileTikTok");
const randomParseTextToArrayTikTok = require("../helper/randomParseTextToArrayTikTok");
const addComments = require("./addComment");



const addCommentDirectLink = async (page, { fileLink, fileComment, minDelayComment, maxDelayComment, timeoutLive, maxComment }) => {
    console.log("start addCommentDirectLink");
    await page.page.setDefaultNavigationTimeout(90000);
    await page.page.setViewport({ width: 1366, height: 768 });
    await delayRandomMs(200, 500);
    const link = await randomParseTextToArray(fileLink);
    await page.goto(link[0]);
    await delayRandomMs(1500, 5000);
    const timeStop = (new Date()).getTime() + timeoutLive * 1000;
    let numberComment = 0;
    do {
        numberComment = numberComment + 1;
        try {
            const comment = await randomParseTextToArrayTikTok(fileComment);
            if (!comment) {
                console.log("Het comment .");
                break;
            }
            console.log(numberComment + " ." + comment[0]);
            await addComments(page, comment[0]);
            await changeNumberSearchFileTikTok(fileComment, comment);
            await delayRandom(minDelayComment, maxDelayComment);

        } catch (error) {
            console.log(error.message);
        }
        if (numberComment > maxComment) break;
    }
    while ((new Date()).getTime() < timeStop);
    console.log("end addCommentDirectLink");
}

module.exports = addCommentDirectLink
const { randomParseTextToArray } = require("../../helper");
const randomScore = require("../../helper/randomScore");
const { delayRandomMs, delay, delayRandom } = require("../../until");
const addComments = require("./addComment");



const addCommentDirectLink = async (page, { fileLink, fileComment, minDelayComment, maxDelayComment, timeoutLive }) => {
    console.log("start addCommentDirectLink");
    await page.page.setDefaultNavigationTimeout(90000);
    await page.page.setViewport({ width: 1366, height: 768 });
    await delayRandomMs(200, 500);
    const link = await randomParseTextToArray(fileLink);
    await page.goto(link);
    await delayRandomMs(1500, 5000);
    let timeStop = (new Date()).getTime() + timeoutLive * 1000;
    const numberComment = 0;
    do {
        numberComment = numberComment + 1;
        try {
            const comment = await randomParseTextToArray(fileComment);
            console.log(numberComment + " ." + comment);
            await addComments(link, comment)
            await delayRandom(minDelayComment, maxDelayComment);
        } catch (error) {
            console.log(error.message);
        }
    }
    while ((new Date()).getTime() < timeStop);
    console.log("end addCommentDirectLink");
}

module.exports = addCommentDirectLink
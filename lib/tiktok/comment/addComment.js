const randomScore = require("../../helper/randomScore");
const { delayRandomMs } = require("../../until");

const SELECTOR_COMMENT = 'div[placeholder="Add comment..."]';

const addComments = async (page, comment) => {
    const error = false;
    try {
        if (randomScore(30)) {
            await page.page.hover(SELECTOR_COMMENT);
            if (randomScore(30)) {
                await page.click(SELECTOR_COMMENT);
            }
        } else {
            await page.click(SELECTOR_COMMENT);
        }
        await delayRandomMs(300, 500);
        await page.input(comment);
        await delayRandomMs(500, 2000);
        await page.enter();
        await delayRandomMs(500, 5000);
    } catch (error) {
        console.log(error.message);
        error = true;
    }
    return error;
}


module.exports = addComments
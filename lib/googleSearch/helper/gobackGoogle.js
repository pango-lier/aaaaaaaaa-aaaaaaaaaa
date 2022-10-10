const { random } = require("../../until");

const goBackGoogle = async (page) => {
    const location = await page.location();
    if (location.search("https://www.google.com/search?q=") < 0) {
        try {
            await pup.page.bringToFront();
            await page.page.goBack({ load: true, timeout: random(2700, 3800) });
        } catch (e) {
        }
    }
}

module.exports = goBackGoogle;
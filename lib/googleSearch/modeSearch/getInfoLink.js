const getSearchLinks = require("../helper/getSearchLinks");
const getLinkInnerWindow = require("./getLinkInnerWindow");

const getInfoLink = async (page, current) => {
    const size = await page.getSizeWindow();
    const body = await page.getSizeWindowBody();
    const links = await getSearchLinks('a[href*="http"]', page);
    const linkActives = await getLinkInnerWindow(current, links, size);
    return { size, body, links, linkActives }
}

module.exports = getInfoLink;

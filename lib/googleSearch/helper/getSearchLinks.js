const getSearchLinks = async (selector, page) => {

    return await page.page.evaluate((selector) => {
        var elements = document.querySelectorAll(selector);
        let e = [];
        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i]?.href.search("google") < 0) {
                    const position = elements[i].getBoundingClientRect();
                    e.push({
                        href: elements[i].getAttribute('href') || elements[i]?.href, x: position.x, y: position.y
                        , bottom: position.bottom, height: position.height, left: position.left, right: position.right
                        , top: position.top, width: position.width
                    });
                }
            }
            return e;
        }
        return false
    }, selector);
}

module.exports = getSearchLinks;
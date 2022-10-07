const getLinkInnerWindow = async (positionCurrent, links, size) => {
    let offsetY = 0;
    links = [...new Set(links)];
    return links.filter((link) => Math.abs(link.y) > positionCurrent.y && Math.abs(link.y) < positionCurrent.y + size.h - offsetY && Math.abs(link.x) > Math.abs(positionCurrent.x) + 0 && link.x < positionCurrent.x + 200);
}

module.exports = getLinkInnerWindow;
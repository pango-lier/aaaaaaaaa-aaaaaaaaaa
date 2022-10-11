const getLinkInnerWindow = async (positionCurrent, links, size) => {
    let offsetY = 0;
    links = [...new Set(links)];
    return links.filter((link) => Math.abs(link.y) >= Math.abs(positionCurrent.y) && Math.abs(link.y) <= Math.abs(positionCurrent.y + size.h+150) && link.x < size.w/2);
}

module.exports = getLinkInnerWindow;
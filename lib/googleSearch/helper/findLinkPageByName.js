const findLinkPageByName = async (links, pageNumber) => {
    for (const link of links) {
        console.log(link.name,pageNumber);
        if (link.name.search("Page " + pageNumber) >= 0) return link;
    }
    return false;
}

module.exports = findLinkPageByName;
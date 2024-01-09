const findDomain = async (links, domain) => {
  for (const link of links) {
    if (link.href.indexOf(domain) >= 0) return link;
  }
  return false;
};

module.exports = findDomain;

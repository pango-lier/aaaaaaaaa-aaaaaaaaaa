const { random } = require("../../until");
const findDomain = require("../helper/findDomain");
const processTargetDomain = require("./processTargetDomain");

const foundClickNow = async (page, linkActives, domain, config) => {
  const domainExist = await findDomain(linkActives, domain);
  if (domainExist) {
    await processTargetDomain(page, domainExist, 4, 90, config);
    return domainExist;
  }
  return false;
};

module.exports = foundClickNow;
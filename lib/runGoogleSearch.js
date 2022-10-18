const GoogleSearch = require("./googleSearch");
const { randomParseTextToArray } = require("./helper");
const PuppeteerActionFunc = require("./pup");

const runGoogleSearch = async (page) => {
  const pup = new PuppeteerActionFunc(page, 0.5, 0.5);
  const googleSearch = new GoogleSearch(pup);
  const search = randomParseTextToArray("./keywork/index.txt");
  await googleSearch.run([search[0]], search[1], [], []);
};

module.exports = runGoogleSearch;
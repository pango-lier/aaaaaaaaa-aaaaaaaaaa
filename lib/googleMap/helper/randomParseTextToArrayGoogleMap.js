const fs = require("fs");
const { parseTextData, readTextToArray } = require("../../helper");
const { random } = require("../../until");

const randomParseTextToArrayGoogleMap = (filename) => {
  const lists = readTextToArray(filename);
  let name = parseTextData(lists);
  name = name.filter((item) => parseInt(item[2]) > 0);
  return name[random(0, name.length - 1)];
};

module.exports = randomParseTextToArrayGoogleMap;

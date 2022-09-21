const { readTextToArray, parseTextData } = require("./helper");
const { random } = require("./until");

const test = () => {
  const lists = readTextToArray("./helper/full-name.txt");
  const data = parseTextData(lists);

  console.log(data);
};
test();

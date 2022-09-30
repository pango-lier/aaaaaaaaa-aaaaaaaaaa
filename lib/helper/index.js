const fs = require("fs");
const { random } = require("../until");

const getAllPaths = (dir) => {
  const fullPaths = [];
  try {
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = dir + "/" + files[i];
      fullPaths.push(name);
    }
  } catch (error) {
    console.log("getAllPaths", error);
  }
  return fullPaths;
};

const randomAvatar = (dir) => {
  let path = undefined;
  try {
    const paths = getAllPaths(dir);
    let i = 0;
    while (i < 5) {
      const index = random(0, paths.length - 1);
      path = paths[index];
      console.log(path);
      if (path) break;
      i++;
    }
  } catch (error) {
    console.log("randomAvatar", error);
  }
  return path;
};

const readTextToArray = (filename) => {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents.split(/\r?\n/);
};

const parseTextData = (lists) => {
  const data = lists
    .filter((i) => i.trim() !== "")
    .map((item) => {
      return item.split("|");
    });

  return data;
};
const randomParseTextToArray = (filename) => {
  const lists = readTextToArray(filename);
  const name = parseTextData(lists);
  return name[random(0, name.length - 1)];
};

const findEmailInfo = (filename, email) => {
  const lists = readTextToArray(filename);
  const name = parseTextData(lists);
  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    if (element[0].trim().toLowerCase() == email.trim().toLowerCase()) {
      return element;
    }

  }
  return false;
};

module.exports.getAllPaths = getAllPaths;
module.exports.randomAvatar = randomAvatar;
module.exports.readTextToArray = readTextToArray;
module.exports.parseTextData = parseTextData;
module.exports.randomParseTextToArray = randomParseTextToArray;
module.exports.findEmailInfo = findEmailInfo;
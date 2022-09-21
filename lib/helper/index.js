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
    console.log("getAllPaths", error);
  }
  return path;
};

module.exports.getAllPaths = getAllPaths;
module.exports.randomAvatar = randomAvatar;

const fs = require("fs");
const { parseTextData, readTextToArray } = require("../../helper");

const changeNumberDirectionGoogleMap = async (file, data) => {
  console.log("-----changeNumberDirectionGoogleMap");
  const lists = readTextToArray(file);
  const name = parseTextData(lists);
  let writeFs = [];
  for (let index = 0; index < name.length; index++) {
    let element = name[index];
    if (
      data[0] == element[0] &&
      data[1] == element[1] &&
      data[3] == element[3] &&
      data[4] == element[4]
    ) {
      let newE = [];
      newE.push(element[0]);
      newE.push(element[1]);
      newE.push(element[2]);
      newE.push(element[3]);
      let number = parseInt(element[4]);
      if (number > 0) number--;
      else number = 0;
      newE.push(number);
      element = newE;
    }
    element = element.join("|");
    writeFs.push(element);
  }
  writeFs = writeFs.join("\n"); // convert array back to string
  await fs.writeFileSync(file, writeFs);
};

module.exports = changeNumberDirectionGoogleMap;

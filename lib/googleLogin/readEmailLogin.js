const { readTextToArray, parseTextData } = require("../helper");

const readEmailLogin = (file) => {
    const lists = readTextToArray(file);
    const name = parseTextData(lists);
    let arInfo = name[0];
    if (arInfo[0].search(".com") < 1) arInfo[0] = arInfo[0] + ".com";
    if (arInfo[2].search(".com") < 1) arInfo[2] = arInfo[2] + ".com";
    return {
        info: {
            email: arInfo[0],
            password: arInfo[1],
            recoveryEmail: arInfo[2],
        }, lists: lists
    };
}

module.exports = readEmailLogin;
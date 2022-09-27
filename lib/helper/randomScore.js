const { random } = require("../until")

const randomScore = (score) => {
    const randomScore = random(1, 100);
    if (score > randomScore) return true;
    return false;
}

module.exports = randomScore
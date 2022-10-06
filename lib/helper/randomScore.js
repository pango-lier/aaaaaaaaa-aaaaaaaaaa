const { random } = require("../until")

const randomScore = (score, maxScore = 100) => {
    const randomScore = random(1, maxScore);
    console.log("randomScore " + randomScore);
    if (score > randomScore) return true;
    return false;
}

module.exports = randomScore
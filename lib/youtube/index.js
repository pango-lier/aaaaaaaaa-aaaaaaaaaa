const createFirstChannel = require("./createFirstChannel");

class Youtube {
    page;
    constructor(pup) {
        this.page = pup;
    }
    async run() {
        await createFirstChannel(this.pup);
    }
}

module.exports = Youtube;
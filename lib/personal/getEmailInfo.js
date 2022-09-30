const URL = "https://myaccount.google.com/email";

const getEmailInfo = async (page) => {
    await page.goto(URL);
    await page.delay(7);
    const email = await page.getContentSelector('.OStShb > .K6ZZTd > .iAwpk > .GqRghe > .mMsbvc');
    return email;
}

module.exports = getEmailInfo;
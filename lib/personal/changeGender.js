//-----------Gioi tinh
const URL_CHANGE_GENDER = "https://myaccount.google.com/gender";
const WOMEN = 1;
const MEN = 2;
const SELECT_WOMEN = (genderNumber) =>
  ".zQTmif:nth-child(22) > .T4LgNb:nth-child(1) > div:nth-child(2) > div:nth-child(2) .Hm1X5:nth-child(1) > .VfPpkd-WsjYwc:nth-child(4) > .puK1qb:nth-child(1) > .wuxXce:nth-child(2) > .aJvDTb:nth-child(1) > div:nth-child(" +
  genderNumber +
  ") > .VfPpkd-I9GLp-yrriRe > input";

const changeGender = async (page, gender) => {
  try {
    console.log("------changeGender", gender);
    let genderNumber = WOMEN;
    if (gender.toLowerCase().trim() == "nam") genderNumber = MEN;
    await page.goto(URL_CHANGE_GENDER);
    await page.click(SELECT_WOMEN(genderNumber));
    await page.delay(5);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeGender;

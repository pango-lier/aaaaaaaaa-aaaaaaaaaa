//-----------Gioi tinh
const URL_CHANGE_GENDER = "https://myaccount.google.com/gender";
const WOMEN = "#c2";
const MEN = "#c3";

const changeGender = async (page, gender) => {
  try {
    console.log("------changeGender", gender);
    let genderNumber = WOMEN;
    if (gender.toLowerCase().trim() == "nam") genderNumber = MEN;
    await page.goto(URL_CHANGE_GENDER);
    await page.delay(2);
    await page.click(genderNumber);
    await page.delay(3);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeGender;

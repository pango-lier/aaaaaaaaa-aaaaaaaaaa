//----------- THAY DOI ANH
//tu trang https://myaccount.google.com/
//click to URL_ACCOUNT_PERSONAL_INFO
const URL_ACCOUNT_PERSONAL_INFO = "https://myaccount.google.com/personal-info";
// const CLICK_PERSIONAL =
//   "c-wiz > .ky9loc > .b3qkse > .BBRNg:nth-child(2) > .EhlvJf";
const CLICK_OPEN_CHANGE_IMAGE = ".R2b1Pb > .ugt2L > .DvHiEc > .N5YmOc > .kKLa4";
const CLICK_BUTTON_CHANGE_IMAGE =
  "#yDmH0d > c-wiz > main > div > div.ziuUIc > div:nth-child(1) > div > button > div.VfPpkd-RLmnJb";
const CLICK_BUTTON_COMPUTER_IMAGE = "#nTuXNc > span.VfPpkd-YVzG2b";
const CLICK_SELECT_COMPUTER_IMAGE =
  "#yDmH0d > c-wiz > main > div > div.hKQkKb.quj2mb > c-wiz > div > div > div.nSdDbb > div:nth-child(1) > button > div.VfPpkd-RLmnJb";

const changeAvatar = async (page, pathAvatar) => {
  try {
    console.log("------changeAvatar", pathAvatar);
    await page.goto(URL_ACCOUNT_PERSONAL_INFO);
    await page.click(CLICK_OPEN_CHANGE_IMAGE);
    await page.click(CLICK_BUTTON_CHANGE_IMAGE);
    await page.click(CLICK_BUTTON_COMPUTER_IMAGE);
    await page.uploadImage([pathAvatar], CLICK_SELECT_COMPUTER_IMAGE);
    await page.delay(5);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeAvatar;

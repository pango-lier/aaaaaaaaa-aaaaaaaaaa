//----------- THAY DOI ANH
//tu trang https://myaccount.google.com/
//click to URL_ACCOUNT_PERSONAL_INFO
const URL_ACCOUNT_PERSONAL_INFO = "https://myaccount.google.com/personal-info";

const CLICK_OPEN_CHANGE_IMAGE = ".R2b1Pb > .ugt2L > .DvHiEc > .N5YmOc > .kKLa4";
const CLICK_BUTTON_CHANGE_IMAGE =
  "#yDmH0d > c-wiz > main > div > div.ziuUIc > div:nth-child(1) > div > button";
const CLICK_BUTTON_COMPUTER_IMAGE = "#nTuXNc > span.VfPpkd-YVzG2b";
const CLICK_SELECT_COMPUTER_IMAGE =
  "#yDmH0d > c-wiz > main > div > div.hKQkKb.quj2mb > c-wiz > div > div > div.nSdDbb > div:nth-child(1) > button";

const CLICK_SAVE_AVATAR =
  "c-wiz.iV7aAc > div.ymZEKe > div:nth-child(3) > div > button";

const changeAvatar = async (page, pathAvatar) => {
  try {
    console.log("------changeAvatar", pathAvatar);
    await page.goto(URL_ACCOUNT_PERSONAL_INFO);
    await page.delay(1);
    await page.click(CLICK_OPEN_CHANGE_IMAGE);
    await page.delay(1);
    const elementFrame = await page.page.$("iframe");
    const frame = await elementFrame.contentFrame();

    await frame.click(CLICK_BUTTON_CHANGE_IMAGE);
    await frame.delay(1);
    await frame.click(CLICK_BUTTON_COMPUTER_IMAGE);
    await frame.delay(1);
    await frame.uploadImage([pathAvatar], CLICK_SELECT_COMPUTER_IMAGE);
    await frame.delay(4);
    await frame.click(CLICK_SAVE_AVATAR);
    await frame.delay(15);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeAvatar;

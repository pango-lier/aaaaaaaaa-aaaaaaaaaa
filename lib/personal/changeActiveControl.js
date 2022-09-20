//--------privacy

const URL_DATA_PRIVACY = "https://myaccount.google.com/data-and-privacy";
const URL_ACTIVE_CONTROL = "https://myactivity.google.com/activitycontrols";
const CLICK_HISTORY_LOCATION_BUTTON =
  ".Mv4Fq > .RezJOb > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe > .VfPpkd-vQzf8d";
const CLICK_ENABLE_HISTORY_LOCATION_BUTTON =
  ".JcnXp > div > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb";

const changeActiveControl = async (page) => {
  try {
    console.log("------changeActiveControl");
    await page.goto(URL_CHANGE_GENDER);
    const check = await page.getContentSelector(URL_ACTIVE_CONTROL);
    console.log(check);
    await page.click(URL_ACTIVE_CONTROL);
    for (let i = 0; i < 8; i++) {
      await page.delay(0.5);
      await page.page.keyboard.press("ArrowDown");
    }
    await page.delay(1);
    await page.click(CLICK_ENABLE_HISTORY_LOCATION_BUTTON);
    await page.delay(4);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeActiveControl;

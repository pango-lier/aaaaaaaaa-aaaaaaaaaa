//----------bat che do duyet web an toan
const URL_ACCOUNT_ENHANCED_SAVE_BROWSING =
  "https://myaccount.google.com/account-enhanced-safe-browsing";
const CLICK_ENABLE_ENHANCED =
  ".iAwpk > .kvjuQc > .xPQZNe > .VfPpkd-scr2fc > .VfPpkd-DVBDLb-LhBDec-sM5MNb";
const CLICK_VERIFY_ENABLE_ENHANCED =
  ".GheHHf > .sRKBBe > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb:nth-child(2) > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d";

const changeEnhancedControl = async (page) => {
  try {
    console.log("------changeEnhancedControl");
    await page.goto(URL_ACCOUNT_ENHANCED_SAVE_BROWSING);
    await page.delay(1);
    const check = await page.getContentSelector(CLICK_ENABLE_ENHANCED);
    console.log(check);
    await page.click(CLICK_ENABLE_ENHANCED);
    await page.delay(1);
    const check2 = await page.getContentSelector(CLICK_VERIFY_ENABLE_ENHANCED);
    console.log(check2);
    await page.click(CLICK_VERIFY_ENABLE_ENHANCED);
    await page.delay(4);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeEnhancedControl;

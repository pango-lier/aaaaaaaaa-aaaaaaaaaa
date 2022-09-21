const URL_GOOGLE_PHOTO = "https://photos.google.com/u/0/";
const CLICK_GOOGLE_PHOTO_SELECT = '.J3TAe > .rxangc > .U26fgb > .I3EnF > .NlWrkb'; // ".J3TAe > .rxangc > .U26fgb > .I3EnF > .NlWrkb";
const CLICK_GOOGLE_PHOTO_COMPUTER =
  ".XvhY1d > .JAPqpe > span:nth-child(2) > .uyYuVb";
const CLICK_IGNORE_GOOGLE_PHOTO = "#yDmH0d > div.llhEMd > div > div.g3VIld > span > div > button";
const CLICK_GOOGLE_PHOTO_TRIGGER = ".EIlDfe > input";
//
class GooglePhoto {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async importFile(paths) {
    try {
      console.log("------GooglePhoto-importCsv", paths);
      await this.page.goto(URL_GOOGLE_PHOTO);
      await this.page.delay(3);
      if ((await this.page.checkSelector(CLICK_IGNORE_GOOGLE_PHOTO)) === true) {
        await this.page.click(CLICK_IGNORE_GOOGLE_PHOTO);
        await this.page.delay(3);
      }
      await this.page.click(CLICK_GOOGLE_PHOTO_SELECT);
      await this.page.delay(1);
      await this.page.uploadImage(paths, CLICK_GOOGLE_PHOTO_COMPUTER);
      await this.page.delay(35);
    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

module.exports = GooglePhoto;

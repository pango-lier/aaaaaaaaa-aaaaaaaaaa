export const URL_GOOGLE_PHOTO = "https://photos.google.com/u/0/";
export const CLICK_GOOGLE_PHOTO_SELECT =
  ".J3TAe > .rxangc > #ow18 > .I3EnF > .NlWrkb";
export const CLICK_GOOGLE_PHOTO_COMPUTER =
  ".XvhY1d > .JAPqpe > .FwR7Pc > .uyYuVb > .jO7h3c";

export const CLICK_GOOGLE_PHOTO_TRIGGER = ".EIlDfe > input";
//
export class GooglePhoto {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async importFile(paths) {
    try {
      console.log("------GooglePhoto-importCsv", alerts);
      await this.page.goto(URL_GOOGLE_ALERT);
      await this.page.delay(0.4);
      await this.page.click(CLICK_GOOGLE_PHOTO_SELECT);
      await this.page.delay(0.4);
      await this.page.uploadImage(paths, CLICK_GOOGLE_PHOTO_COMPUTER);
      await this.page.delay(20);
    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

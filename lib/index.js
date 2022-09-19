import { GoogleAlerts } from "./googleAlert";
import { GoogleNews } from "./googleNews";
import { GooglePhoto } from "./goolePhoto";
import { Personal } from "./personal";
import { PuppeteerActionFunc } from "./pup";
import { delay } from "./until";

export const runChangAccountGoogle = async (page) => {
  const pup = new PuppeteerActionFunc(page);

  const news = new GoogleNews(pup);
  await news.enterMyLocation([15000]);
  const alert = new GoogleAlerts(pup);
  await alert.createAlert(["Tao thong bao"]);
  const photo = new GooglePhoto(pup);
  // await photo.importFile([""])

  const personal = new Personal(pup);
  await personal.changeActiveControl();
  //   await personal.changeAvatar("path avatar");//
  await personal.changeBirthDay(25, 5, 1994);
  await personal.changeBusinessPersonalization();
  await personal.changeDeleteSecurity();
  await personal.changeEnhancedControl();
  await personal.changeFullName("tuan", "tran");
  await personal.changeGender("nu");
  //   await personal.importCsvContact("path/csv");
};

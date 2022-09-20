const GoogleAlerts = require("./googleAlert");
const GoogleNews = require("./googleNews");
const GooglePhoto = require("./googlePhoto");
const Personal = require("./personal");
const PuppeteerActionFunc = require("./pup");

const runChangAccountGoogle = async (page) => {
  const pup = new PuppeteerActionFunc(page);
  const personal = new Personal();
  await personal.run(pup);
  const news = new GoogleNews(pup);
  await news.enterMyLocation([15000]);
  const alert = new GoogleAlerts(pup);
  await alert.createAlert(["Tao thong bao"]);
  const photo = new GooglePhoto(pup);
  await photo.importFile(["E:/SEODATA/SkyNet1.0.2/avt/1.jpg"]);
};
module.exports = runChangAccountGoogle;

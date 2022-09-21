const GoogleAlerts = require("./googleAlert");
const GoogleNews = require("./googleNews");
const GooglePhoto = require("./googlePhoto");
const Personal = require("./personal");
const PuppeteerActionFunc = require("./pup");
const fs = require("fs");
const { getAllPaths } = require("./helper");
const GoogleAds = require("./googleAds");
const setting = JSON.parse(fs.readFileSync("./env.json"));

const runChangAccountGoogle = async (page) => {
  const pup = new PuppeteerActionFunc(page);
  const personal = new Personal();

  await personal.run(pup, setting);
  const news = new GoogleNews(pup);
  await news.enterMyLocation(setting.create_zip_code_google_news);
  const alert = new GoogleAlerts(pup);
  await alert.createAlert(setting.create_alert_google_alert);
  const photo = new GooglePhoto(pup);
  await photo.importFile(getAllPaths(setting.path_google_photo));

  const ads = new GoogleAds(pup);
  await ads.createHomeAddress("Ha noi");
};

module.exports = runChangAccountGoogle;

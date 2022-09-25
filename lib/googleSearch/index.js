
class GoogleSearch {
  page;
  constructor(pup) {
    this.page = pup;
  }
  async enterMyLocation(zips) {
    try {
      await this.page.goto(URL_GOOGLE_NEWS_MY_LOCATION);

    } catch (e) {
      console.log(e.message + " . " + this.page.location);
    }
  }
}

module.exports = GoogleSearch;

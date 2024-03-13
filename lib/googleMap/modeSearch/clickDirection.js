const { random } = require("../../until");

const delayMulti = async (min, max, page, config) => {
  await page.moveRandom(
    random(min * config.multiDelay, max * config.multiDelay),
    random(1000, 8000)
  );
};

const clickDirection = async (page, config) => {
  const mul = config.multiDelay;
  await delayMulti(4000, 8000, page, config);
  await page.clickAndMove(
    ".m6QErb > .etWJQ:nth-child(1) > .g88MCb > .DVeyrd > .Cw1rxd"
  );
  await delayMulti(4000, 8000, page, config);
  // await page.click(".sbqs_c > .ZHeE1b > .l0wghb > .DgCNMb");
  await page.clickAndMove(
    ".fC7rrc > #directions-searchbox-0 > .gstl_50 > #sb_ifc50 > .tactile-searchbox-input"
  );
  await page.type("Your location");
  await delayMulti(4000, 8000, page, config);
  await page.enter();

  await delayMulti(4000, 8000, page, config);

  await page.clickAndMove(
    ".MJtgzc > div > .FkdJRd > .oya4hc:nth-child(1) > button"
  );

  await delayMulti(4000, 8000, page, config);
  await page.clickAndMove(".dp9cUc > div > .MJtgzc > .YismEf > .ExQYxb");
  await delayMulti(7000, 15000, page, config);
};

module.exports = clickDirection;

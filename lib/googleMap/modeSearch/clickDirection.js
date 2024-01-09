const clickDirection = async (page, config) => {
  const mul = config.multiDelay;
  await page.delayRandomMs(1000 * mul, 3000 * mul);
  await page.delayRandomMs(1000 * mul, 3000 * mul);
  await page.click(
    ".m6QErb > .etWJQ:nth-child(1) > .g88MCb > .DVeyrd > .Cw1rxd"
  );
  await page.delayRandomMs(1000 * mul, 3000 * mul);
  // await page.click(".sbqs_c > .ZHeE1b > .l0wghb > .DgCNMb");
  await page.click(
    ".fC7rrc > #directions-searchbox-0 > .gstl_50 > #sb_ifc50 > .tactile-searchbox-input"
  );
  await page.type("Your location");
  await page.delayRandomMs(1000 * mul, 3000 * mul);
  await page.enter();

  await page.delayRandomMs(1000 * mul, 3000 * mul);

  await page.click(".MJtgzc > div > .FkdJRd > .oya4hc:nth-child(1) > button");

  await page.delayRandomMs(1000 * mul, 3000 * mul);
  await page.click(".dp9cUc > div > .MJtgzc > .YismEf > .ExQYxb");
  await page.delayRandomMs(1000 * mul, 3000 * mul);
  await page.delayRandomMs(1000 * mul, 3000 * mul);
};

module.exports = clickDirection;

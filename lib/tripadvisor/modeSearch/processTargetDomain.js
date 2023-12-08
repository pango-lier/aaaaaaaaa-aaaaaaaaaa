const randomScore = require("../../helper/randomScore");
const { random } = require("../../until");
const goBackGoogle = require("../helper/gobackGoogle");
const switchPageHref = require("../helper/switchPageHref");
const getInfoLink = require("./getInfoLink");

const processTargetDomain = async (
  page,
  link,
  level = 5,
  scoreRollDow = 90,
  config
) => {
  try {
    console.log("processTargetDomain");
    const timeStart = new Date().getTime();
    await page.scrollRandUpDownScore(
      100,
      { delayMin: 500, delayMax: 1000 },
      { stepMin: 56, stepMax: 87 },
      { loopMin: 2, loopMax: 3 }
    );
    await page.delayRandomMs(800, 3000);
    console.log("found_click_now :" + link.href);
    await page.clickHref('a[href*="' + link.href + '"]');
    await page.scrollTop();
    await page.delayRandomMs(3400, 7000);

    const switchPage = await switchPageHref(page, link.href);
    page = switchPage.pup;

    let oldY = 0;
    for (let index = 0; index < random(100, 120); index++) {
      if (new Date().getTime() - timeStart > config.timLive * 1000) break;
      try {
        let current;
        switch (level) {
          case 2:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 422, delayMax: 1500 },
              { stepMin: 40, stepMax: 120 },
              { loopMin: 2, loopMax: 4 }
            );
            break;
          case 3:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 200, delayMax: 2000 },
              { stepMin: 60, stepMax: 200 },
              { loopMin: 1, loopMax: 3 }
            );
            break;
          default:
          case 4:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 300, delayMax: 2400 },
              { stepMin: 40, stepMax: 300 },
              { loopMin: 1, loopMax: 2 }
            );
            break;
          case 5:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 300, delayMax: 2800 },
              { stepMin: 70, stepMax: 350 },
              { loopMin: 1, loopMax: 2 }
            );
            break;
          case 6:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 400, delayMax: 3000 },
              { stepMin: 100, stepMax: 400 },
              { loopMin: 1, loopMax: 1 }
            );
            break;
          case 7:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 500, delayMax: 3200 },
              { stepMin: 150, stepMax: 450 },
              { loopMin: 1, loopMax: 1 }
            );
            break;
          case 8:
            current = await page.scrollRandUpDownScore(
              scoreRollDow,
              { delayMin: 600, delayMax: 3400 },
              { stepMin: 70, stepMax: 550 },
              { loopMin: 1, loopMax: 1 }
            );
            break;
        }
        const { size } = await getInfoLink(page, current, "a");
        if (oldY === current.y && Math.abs(current.y) < random(5, size.h / 4)) {
          scoreRollDow = scoreRollDow > 50 ? scoreRollDow : 100 - scoreRollDow;
          console.log("scoreRollDow down", scoreRollDow);
        }
        if (oldY === current.y && oldY >= size.h - random(5, size.h / 4)) {
          scoreRollDow = scoreRollDow > 50 ? 100 - scoreRollDow : scoreRollDow;
          console.log("scoreRollDow up", scoreRollDow);
        }
        oldY = current.y;
      } catch (error) {
        console.log(error.message);
      }
    }
    await page.delayRandomMs(2000, 5000);
    await page.page.close();
  } catch (e) {
    console.log("Error - processTargetDomain: " + e.message);
  }
  return false;
};

module.exports = processTargetDomain;

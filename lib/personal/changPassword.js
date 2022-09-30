

const URL = "https://myaccount.google.com/signinoptions/password";
const URL_PASSWORD = "https://accounts.google.com/signin/v2/challenge/pwd";

const changPassword = async (page, oldPwd, newPwd = "Abc@1234") => {
    try {
        await page.goto(URL);
        await page.delay(5);
        if (await page.isUrlCurrent(URL_PASSWORD)) {
            console.log("validate password");
            await page.click("#password");
            await page.input(oldPwd);
            await page.delay(1);
            await page.enter();
            await page.delay(10);

        }
        if (!(await page.isUrlCurrent(URL))) {
            console.log("Login failed .");
            return false;
        }
        await page.click("#i6");
        await page.input(oldPwd);
        await page.delay(1);
        await page.click("#i10");
        await page.input(newPwd);
        await page.delay(1);
        await page.enter();
        await page.delay(15);
        return true;
    } catch (e) {
        console.log(e.message + " . " + page.location);
    }
    return false;
}

module.exports = changPassword;
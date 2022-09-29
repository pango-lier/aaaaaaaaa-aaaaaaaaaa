
//accounts.google.com/

const URL_GOOGLE_ACCOUNT_ABOUT = "https://www.google.com/account/about/";
const URL_GOOGLE_LOGIN_REJECT = "https://accounts.google.com/v3/signin/rejected";
const URL_ACCOUNT = "https://accounts.google.com/";
const URL_ACCOUNT_INFO = "https://myaccount.google.com";
const URL_SELECT_ACCOUNT = "https://accounts.google.com/ServiceLogin/signinchooser";

const URL_SELECTION_RECOVERY_EMAIL = "https://accounts.google.com/signin/v2/challenge/selection";

const BTN1_CLICK_SIGNIN = '.h-c-header__bar > .h-c-header__cta > .h-c-header__cta-list > .h-c-header__cta-li--primary > .h-c-header__cta-li-link';
const BTN2_CLICK_SIGNIN = "#overview > .gacct-epilog > .gacct-epilog-col > .gacct-epilog-ctas > .h-c-button--primary";

const SELECT_OTHER_ACCOUNT = "#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > div > ul > li:nth-child(2)";
const SELECT_RECOVERY_EMAIL = "#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > ul > li:nth-child(3) > div";
const googleLogin = async (page, info) => {
    try {
        await page.goto(URL_ACCOUNT);
        await page.delay(5);
        if (await isUrlCurrent(page, URL_ACCOUNT_INFO)) return true;
        await redirectToLogin(page);
        //forcus nhap email
        await page.click("#identifierId");
        await page.delay(1);
        await page.input(info.email);
        await page.delay(1);
        // click nut xac nhan email
        await page.enter();
        await page.delay(3);
        console.log("Password " + await location(page));
        if (await isUrlCurrent(page, URL_GOOGLE_LOGIN_REJECT)) {
            // if reject 
            console.log("Google login is Reject .")
            await page.click("#next");
        }
        // //forcus o password
        await page.click("#password");
        await page.input(info.password);
        await page.enter();
        await page.delay(5);
        if (await isUrlCurrent(page, URL_SELECTION_RECOVERY_EMAIL)) {
            console.log("Login " + info.email + " is recovery .", await location(page));
            // if reject
            await page.click(SELECT_RECOVERY_EMAIL);
            await page.delay(5);
            await page.click("#knowledge-preregistered-email-response");
            await page.delay(1);
            await page.input(info.recoveryEmail);
            await page.enter();
        }

        await page.delay(15);
        await page.goto(URL_ACCOUNT);
        await page.delay(20);
        console.log("Login " + info.email + " is successful .", await location(page));
        if (await isUrlCurrent(page, URL_ACCOUNT_INFO)) return true;
    } catch (e) {
        console.log(e.message + " . " + page.location);
    }
    return false;
}

const redirectToLogin = async (page) => {
    if (await isUrlCurrent(page, URL_GOOGLE_ACCOUNT_ABOUT)) {
        if (await page.checkSelector(BTN1_CLICK_SIGNIN)) {
            console.log("Click go to login");
            await page.click(BTN1_CLICK_SIGNIN);
        }
        else if (await page.checkSelector(BTN2_CLICK_SIGNIN)) {
            await page.click(BTN2_CLICK_SIGNIN);
        }
        await page.delay(3);
    }
    if (await isUrlCurrent(page, URL_SELECT_ACCOUNT)) {
        if (await page.checkSelector(SELECT_OTHER_ACCOUNT)) {
            console.log("Other account");
            await page.click(SELECT_OTHER_ACCOUNT);
        }
        await page.delay(3);
    }
}

const location = async (page) => {
    const currentUrl = () => {
        return window.location.href;
    };
    return await page.page.evaluate(currentUrl);
}

const isUrlCurrent = async (page, url) => {
    const href = await location(page);
    return href.search(url) >= 0;
}

module.exports = googleLogin;

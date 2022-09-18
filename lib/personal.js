export const URL_ACCOUNT_PERSONAL_INFO = "https://myaccount.google.com/personal-info";

//-------chang name
export const URL_CHANGE_NAME = "https://myaccount.google.com/profile/name"
// click de di toi edit
export const CLICK_TO_CHANGE_FULLNAME = '.zHA9i > .fOc3le > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-Tv8l5d-lJfZMc > .NSy2Hd > path:nth-child(2)'
// trang edit
export const URL_CHANGE_FULLNAME_EDIT = "https://myaccount.google.com/profile/name/edit"
export const INPUT_FIRST_NAME = '#i7'
export const INPUT_LAST_NAME = '#i10'
// disable
export const BUTTON_ACCEPT_CHANGE_NAME = '.T3o42d > .N1UXxf > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button'

//----------- THAY DOI ANH
//tu trang https://myaccount.google.com/
//click to URL_ACCOUNT_PERSONAL_INFO
export const CLICK_PERSIONAL = 'c-wiz > .ky9loc > .b3qkse > .BBRNg:nth-child(2) > .EhlvJf';
export const CLICK_OPEN_CHANGE_IMAGE = '.R2b1Pb > .ugt2L > .DvHiEc > .N5YmOc > .kKLa4';
export const CLICK_BUTTON_CHANGE_IMAGE = "#yDmH0d > c-wiz > main > div > div.ziuUIc > div:nth-child(1) > div > button > div.VfPpkd-RLmnJb";
export const CLICK_BUTTON_COMPUTER_IMAGE = "#nTuXNc > span.VfPpkd-YVzG2b";
export const CLICK_SELECT_COMPUTER_IMAGE = "#yDmH0d > c-wiz > main > div > div.hKQkKb.quj2mb > c-wiz > div > div > div.nSdDbb > div:nth-child(1) > button > div.VfPpkd-RLmnJb";

//----------- thay doi birthday
export const URL_CHANGE_BIRTHDAY = "https://myaccount.google.com/birthday"
export const INPUT_DAY = ".M0zhbf > .ohXgge:nth-child(1) > .HPjlr > .Ufn6O > .VfPpkd-fmcmS-yrriRe";
export const CLICK_INPUT_MONTH = ".ohXgge > .JYZIZc > .O1htCb-H9tDt > .VfPpkd-O1htCb > .VfPpkd-TkwUic";
export const SELECT_INPUT_MONTH = (month) => '.O1htCb-H9tDt > .VfPpkd-O1htCb > .VfPpkd-xl07Ob-XxIAqe > .VfPpkd-StrnGf-rymPhb > .VfPpkd-StrnGf-rymPhb-ibnC6b:nth-child(' + (month + 1) + ')';
export const INPUT_YEAR = ".M0zhbf > .ohXgge:nth-child(3) > .HPjlr > .Ufn6O > .VfPpkd-fmcmS-yrriRe";
export const CLICK_ACCEPT_CHANGE_BIRHDAY = '.GFJYae > .N1UXxf > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb';
export const CLICK_VERIFILE_CHANGE_BIRDAY = '.VfPpkd-wzTsW > .VfPpkd-P5QLlc > .VfPpkd-T0kwCb > .VfPpkd-ksKsZd-mWPk3d > .VfPpkd-vQzf8d';

//-----------Gioi tinh
export const URL_CHANGE_GENDER = "https://myaccount.google.com/gender";
export const WOMEN = 1;
export const MEN = 2;
export const SELECT_WOMEN = (genderNumber) => '.zQTmif:nth-child(22) > .T4LgNb:nth-child(1) > div:nth-child(2) > div:nth-child(2) .Hm1X5:nth-child(1) > .VfPpkd-WsjYwc:nth-child(4) > .puK1qb:nth-child(1) > .wuxXce:nth-child(2) > .aJvDTb:nth-child(1) > div:nth-child(' + genderNumber + ') > .VfPpkd-I9GLp-yrriRe > input';
//--------privacy

export const URL_DATA_PRIVACY = "https://myaccount.google.com/data-and-privacy";
export const URL_ACTIVE_CONTROL = "https://myactivity.google.com/activitycontrols";
export const CLICK_HISTORY_LOCATION_BUTTON = ".Mv4Fq > .RezJOb > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-ksKsZd-mWPk3d-OWXEXe-AHe6Kc-XpnDCe > .VfPpkd-vQzf8d";
export const CLICK_ENABLE_HISTORY_LOCATION_BUTTON = '.JcnXp > div > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe-OWXEXe-k8QpJ > .VfPpkd-RLmnJb';
// --DELETE security
export const URL_SECURITY = "https://myaccount.google.com/security"
export const URL_DELETE_SECURITY = "https://myaccount.google.com/device-activity"

export const CLICK_GOTO_DELETE_SECURITY = (num) => '.K6ZZTd:nth-child(' + num + ') > .VfPpkd-ksKsZd-XxIAqe > .zwGcVb > .iAwpk > .kvjuQc > .Ivdcjd > span > .NMm5M'
export const CLICK_SECURITY_LOGOUT = '.VfPpkd-rOvkhd-XPtOyb-hhpA7 > #cEoysc > .VfPpkd-rOvkhd-AnTmuf > #ucc-0 > .VfPpkd-rOvkhd-jPmIDe-dgl2Hf'
export const CLICK_SECURITY_VERIFY = '.NGSkPe > .EenoKf > .KsHAYd > .VfPpkd-LgbsSe:nth-child(2) > .VfPpkd-vQzf8d';
export const CLICK_SECURITY_OK = '.NGSkPe > .EenoKf > .KsHAYd > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d';

export const CLICK_BACK_DELETE_SECURITY = '.zQTmif:nth-child(20) > .T4LgNb:nth-child(1) > div:nth-child(2) > .EWuRAb:nth-child(1) > .ikIPKb:nth-child(1) > .edoSyc:nth-child(1) > .U26fgb:nth-child(1) > .xjKiLb:nth-child(2) > .Ce1Y1c:nth-child(1) > .DPvwYc:nth-child(1)';
export class Personal {
    page
    constructor(pup) {
        this.page = pup
    }

    async changeActiveControl() {
        try {

            await this.page.goto(URL_DELETE_SECURITY);
            let i = 1;
            while (1) {
                if (!await this.page.checkSelector(CLICK_GOTO_DELETE_SECURITY(i)) === false) break;
                await page.click(CLICK_GOTO_DELETE_SECURITY(i));
                await this.page.delay(1);
                await page.click(CLICK_SECURITY_VERIFY);
                await this.page.delay(1);
                await page.click(CLICK_SECURITY_OK);
                await this.page.delay(4);
                i = i + 1;
            }
        } catch (e) {
            console.log(e.message + ' . ' + this.page.location);
        }
    }

    async changeActiveControl() {
        try {

            await this.page.goto(URL_CHANGE_GENDER);
            const check = await this.page.getContentSelector(URL_ACTIVE_CONTROL);
            console.log(check);
            await page.click(URL_ACTIVE_CONTROL);
            for (let i = 0; i < 8; i++) {
                await this.page.delay(0.5);
                await this.page.page.keyboard.press("ArrowDown");
            }
            await this.page.delay(1);
            await page.click(CLICK_ENABLE_HISTORY_LOCATION_BUTTON);
            await this.page.delay(4);
        } catch (e) {
            console.log(e.message + ' . ' + this.page.location);
        }
    }

    async changeGender(gender) {
        try {
            let genderNumber = WOMEN
            if (gender.toLowerCase().trim() == "nam") genderNumber = MEN;
            await this.page.goto(URL_CHANGE_GENDER);
            await this.page.click(SELECT_WOMEN(genderNumber));
            await this.page.delay(5);
        } catch (e) {
            console.log(e.message + ' . ' + this.page.location);
        }
    }

    async changeAvatar(pathAvatar) {
        try {
            await this.page.goto(URL_ACCOUNT_PERSONAL_INFO);
            await this.page.click(CLICK_OPEN_CHANGE_IMAGE);
            await this.page.click(CLICK_BUTTON_CHANGE_IMAGE);
            await this.page.click(CLICK_BUTTON_COMPUTER_IMAGE);
            await this.page.uploadImage([pathAvatar]);
            await this.page.delay(5);
        } catch (e) {
            console.log(e.message + ' . ' + this.page.location);
        }
    }
    async changeFullname(firtName, lastName) {
        try {
            await this.page.goto(URL_CHANGE_NAME);
            await this.page.click(CLICK_TO_CHANGE_FULLNAME);
            await this.page.click(INPUT_FIRST_NAME);
            await this.page.input(firtName);
            await this.page.click(INPUT_LAST_NAME);
            await this.page.input(lastName);
            await this.page.delay(1);
            await this.page.click(BUTTON_ACCEPT_CHANGE_NAME);
            await this.page.delay(5);
        } catch (e) {
            console.log(e.message + ' . ' + this.page.location);
        }
    }


    async changeBirthDay(day, month, year) {
        try {
            await this.page.goto(URL_CHANGE_BIRTHDAY);
            await this.page.click(INPUT_DAY);
            await this.page.input(day);
            await this.page.click(CLICK_INPUT_MONTH);
            await this.page.click(SELECT_INPUT_MONTH(month));
            await this.page.click(INPUT_YEAR);
            await this.page.input(year);
            await this.page.click(CLICK_ACCEPT_CHANGE_BIRHDAY);
            await this.page.click(CLICK_VERIFILE_CHANGE_BIRDAY);
            await this.page.delay(5);
        } catch (e) {
            console.log(e.message + ' . ' + this.page.location);
        }
    }


}
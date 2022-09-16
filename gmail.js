'use strict';
const GoLogin = require('../gologin');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const tokens = fs.readFileSync('./config/token.txt', { encoding: 'utf-8' });
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
let rawdata = fs.readFileSync('./config/browser.json');
let SettingBrowser = JSON.parse(rawdata);
// console.log(SettingBrowser);
let runsetting = fs.readFileSync('./config/run.json');
let SettingGmail = JSON.parse(runsetting);
let LockAcc = true
let logintrue = false
let Changepass = SettingGmail.Change_pass
let CkeckGmails = true
let Change_avatar = false
let stt_changeravatar = false
async function LoginGmail(page, GmailName, GmailPass, Oldpass, ReGmail, profile) {
    const idpass = `input[type="password"]`
    const idname = `input[type="email"]`
    const RecoverEmails = `input[id="knowledge-preregistered-email-response"]`
    await page.waitForTimeout(2000);
    await page.type(idname, GmailName, { delay: 300 });
    await page.waitForTimeout(700);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000, { waitUntil: 'networkidle0' });
    const checkidpass = await page.$x('//*[@id="password"]/div[1]/div/div[1]/input');
    await page.waitForTimeout(700);

    if (checkidpass.length != 0) {
        await page.type(idpass, GmailPass, { delay: 300 });
    } else {
        console.log('Browser not support')
        await page.close();
    }

    await page.waitForTimeout(800);
    await page.keyboard.press('Enter');
    await page.waitForTimeout({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(4000);
    const checkidpass2 = await page.$x('//*[@id="password"]/div[1]/div/div[1]/input');
    await page.waitForTimeout(2100);
    if (checkidpass2.length != 0) {
        await page.type(idpass, Oldpass, { delay: 300 });
        await page.waitForTimeout(800);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(800);
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
    }
    await page.waitForTimeout(4000);
    // await page.waitForSelector('#view_container');
    
    const Checklock = await page.$x('//*[@id="view_container"]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/a');
    if(Checklock.length != 0){
        console.log('Browser not support')
        LockAcc = true
        return LockAcc
    }
    const cRecoverEmail = await page.$x('//*[@id="view_container"]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div/ul/li[3]/div/div[2]');
    const configcrEmail = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/c-wiz/div/div[1]/div/div/div/div[2]/div[3]/div/div[2]/div/span/span');
    const RecoverEmail = `div[data-challengetype="12"]`;
    const Click_cRecoverEmail = `div[data-sendidvemail="true"]`;
    const NoRecoverEmail = `div[jsname="UjXomb"]`;
    const type_cRecoverEmail = 'input[id="idvPinId"]'
    await page.waitForTimeout(1000);
    const Checkreco = await page.$('div[data-sendidvemail="true"]');
    if (Checkreco) {
        await page.click(Click_cRecoverEmail);
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000);
        await page.type(type_cRecoverEmail, ReGmail, { delay: 300 });
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1200);
    }

    if (cRecoverEmail.length != 0) {
       
        await page.click(RecoverEmail);
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000);
        await page.type(RecoverEmails, ReGmail, { delay: 200 });
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1200);
    }

    if (configcrEmail.length != 0) {
        await page.click(NoRecoverEmail);
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000);
    }
    const Checkskip = await page.$$('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.qfvgSe.k97fxb.yu6jOd');
    await page.waitForTimeout(1000);
    if (Checkskip.length != 0) {
        await page.click('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.qfvgSe.k97fxb.yu6jOd');
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000);
    }
}

async function Changpass(page, MyNewpass, GmailPass, Oldpass) {
    const ipPasswords = 'input[type="password"]';
    await page.goto('https://myaccount.google.com/intro/signinoptions/password', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3100);
    await page.waitForTimeout({ waitUntil: 'networkidle0' });
    await page.waitForSelector(ipPasswords);
    await page.click(ipPasswords);
    await page.waitForTimeout(1100);
    await page.type(ipPasswords, GmailPass, { delay: 400 });
    await page.waitForTimeout(2100);
    await page.keyboard.press('Enter');
    await page.waitForTimeout({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(4600);
    const checkidpass3 = await page.$x('//*[@id="password"]/div[1]/div/div[1]/input');
    await page.waitForTimeout(1600);
    if (checkidpass3.length != 0) {
        await page.type(ipPasswords, Oldpass, { delay: 500 });
        await page.waitForTimeout(800);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(800);
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
    }
    await page.waitForTimeout(2100);
    const Newpass = 'input[name="password"]';
    const CNewpass = 'input[name="confirmation_password"]';
    await page.waitForTimeout(1100);
    await page.waitForSelector(Newpass);
    await page.click(Newpass);
    await page.waitForTimeout(500);
    await page.type(Newpass, MyNewpass, { delay: 500 });
    await page.waitForTimeout(1100);
    await page.waitForSelector(CNewpass);
    await page.click(CNewpass);
    await page.waitForTimeout(500);
    await page.type(CNewpass, MyNewpass, { delay: 500 });

    const Changepass = 'button[type="submit"]';
    await page.waitForTimeout(500);
    await page.waitForSelector(Changepass);
    await page.click(Changepass);

    await page.waitForTimeout(1100);
    await page.waitForTimeout({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(3100);
}
async function Ckeckgmail(page) {

    await page.evaluate(() => {
        window.scrollBy(0, 200);
    });
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
        window.scrollBy(0, 200);
    });
    // check email
    await page.waitForTimeout({ waitUntil: 'networkidle0' });
    try {
        await page.evaluate(() => {
            const allDivs = document.querySelectorAll('tr.zA.zE');
            const randomElement = allDivs[Math.floor(Math.random() * allDivs.length)];
            randomElement.click();
        });
        await page.waitForTimeout(3000);

        await page.goBack();
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
            const allDivs = document.querySelectorAll('tr.zA.zE');
            const randomElement = allDivs[Math.floor(Math.random() * allDivs.length)];
            randomElement.click();
        });
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
            window.scrollBy(0, 200);
        });
        await page.waitForTimeout(2000);
        await page.goBack();
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(3000);

    } catch (error) {
        await page.evaluate(() => {
            const allDivs = document.querySelectorAll('tr.zA.yO');
            const randomElement = allDivs[Math.floor(Math.random() * allDivs.length)];
            randomElement.click();
        });
        await page.waitForTimeout(3000);

        await page.goBack();
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
            const allDivs = document.querySelectorAll('tr.zA.yO');
            const randomElement = allDivs[Math.floor(Math.random() * allDivs.length)];
            randomElement.click();
        });

        await page.evaluate(() => {
            window.scrollBy(0, 200);
        });
        await page.goBack();
        await page.waitForTimeout(3000);
    }
}

async function ChangAvatar(page) {
    const randavatar = Math.floor(Math.random() * 6) + 1;
    await page.waitForSelector('a.gb_A.gb_La.gb_f', { visible: true });
    await page.click('a.gb_A.gb_La.gb_f')
    await page.waitForTimeout(1500);
    const frame = page.frames().find(f => f.url().startsWith('https://ogs.google.com/u/0/widget/account'));
    // const frame = await page.frames().find(f => f.url() === 'https://ogs.google.com/u/0/widget/account?origin=https%3A%2F%2Fmail.google.com&cn=account');
    
    const acceptBtn = await frame.$(`button[jsname="twx2Pc"]`);
    await acceptBtn.click();
    await page.waitForTimeout(3500);
    // const frame2 = await page.frames().find(f => f.url() === 'https://myaccount.google.com/profile-picture');
    const frame2 = page.frames().find(f => f.url().startsWith('https://myaccount.google.com/profile-picture'));
    await page.waitForTimeout(1500);
    const acceptBtn2 = await frame2.$(`img[class="EEKrSc xUNOSc"]`);
    if (acceptBtn2) {
        try {
            await page.waitForTimeout(2500);
            await acceptBtn2.click();
            await page.waitForTimeout(1500);
            const avatar_click = await frame2.$x(`/html/body/div[1]/div[2]/div/div/div/div/c-wiz/div[2]/div/div[2]/div/c-wiz/div/div/div/div[3]/div[1]/div/div[1]/div/a`, { visible: true });
            if (avatar_click.length != 0){
                try {
                    await page.waitForTimeout(1500);
                    await avatar_click[randavatar].click()
                } catch (error) {
                    console.log(error)
                }
            }
        
            await page.waitForTimeout(3100);
            const save_avatar = await frame2.$(`button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.Kjnxrf.C1Uh5b.DuMIQc.LQeN7`, { visible: true });
            try {
                await save_avatar.click();
                console.log('Change Avatar Successful')
                stt_changeravatar = true
                
            } catch (error) {
                console.log('Change Avatar False')
            }
            
        } catch (error) {
            console.log('Change Avatar False')
        }
        await page.waitForTimeout(1500);
    }
}


const gmails = fs.readFileSync(SettingGmail.Gmail_path, { encoding: 'utf-8' });
const gmailsArray = gmails.split(/\r\n/g).filter(Boolean);
let GmailName = null
let GmailPass = null
let ReGmail = null
let SEVER_KEY = (process.env.NODE_ENV || '').replace('SERVER', '');
let number_start = 0
const qq = Number(number_start) + Number(SEVER_KEY)-1
let indexGmail = qq
let txtgmail =[]

async function getGmail() {
    let txtgmail = gmailsArray[indexGmail];
    indexGmail = indexGmail + 5;
    if (!txtgmail) {
        indexGmail = number_start;
        txtgmail = gmailsArray[indexGmail]
    }

    GmailName = txtgmail.split('@')[0];
    GmailPass = txtgmail.split('|')[1];
    ReGmail = txtgmail.split('|')[2];
    return [GmailName,GmailPass,ReGmail,txtgmail]

  }

async function run(txt, proxyInfo, called, proxyInfos) {

    await getGmail()

    let Oldpass = SettingGmail.Gmail_newpass
    let MyNewpass = SettingGmail.Gmail_newpass
    const d = new Date();
    const GL = new GoLogin({
        token: tokens
    });
    const ModeProxy = 'https'
    const IpProxy = proxyInfo.split(':')[0];
    const ports = proxyInfo.split(':')[1];
    try {
        const profile_id = await GL.create({
            "name": GmailName,
            "os": "win",
            "navigator": {
                "language": "vi-VN, vi, en-US,en, jp-Jp,ger; q=0.9",
                "platform": "Win32",
                "resolution": "1280x1024",
                "userAgent": "random"
            },
            "canvas": {
                "mode": "noise"
            },
            "canvasMode": "noise",
            "webRTC": {
                "mode": "alerted"
            },
            "webRtc": {
                "mode": "alerted"
            },
            "geoLocation": {
                "mode": "allow"
            },
            "geolocation": {
                "mode": "allow"
            },
            "webRTC": {
                "customize": true,
                "enabled": true,
                "fillBasedOnIp": true,
                "localIpMasking": false,
                "localIps": [],
                "mode": "alerted",
                "publicIp": ""
            },
            "fonts": {
                "enableDomRect": true,
                "enableMasking": true,
                "families": ["AIGDT", "AMGDT", "Arial", "Arial Baltic", "Arial Black", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial TUR", "Calibri", "Calibri Light", "Cambria", "Candara", "Comic Sans MS", "Consolas", "Courier", "Courier New Baltic", "Courier New CE", "Courier New Greek", "Courier New TUR", "DejaVu Sans", "DejaVu Sans Light", "Ebrima", "Frank Ruehl Libre", "Frank Ruehl Libre Black", "Franklin Gothic Demi", "Franklin Gothic Heavy", "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "Gabriola", "Gadugi", "Georgia", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold Condensed", "Impact", "KacstBook", "KacstLetter", "KacstTitlel", "Leelawadee", "Liberation Mono", "Liberation Sans", "Liberation Sans Narrow", "Liberation Serif", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Sans Unicode", "MS Gothic", "MS LineDraw", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS Reference Specialty", "MS Serif", "MS UI Gothic", "MV Boli", "Malgun Gothic", "Microsoft JhengHei", "Microsoft JhengHei UI", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft YaHei UI", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS-ExtB", "Miriam", "Mongolian Baiti", "NSimSun", "Nirmala UI", "Noto Mono", "Noto Sans Arabic UI", "Noto Sans CJK HK", "Noto Sans CJK KR", "Noto Sans CJK SC", "Noto Sans CJK TC", "Noto Sans Lisu", "Noto Sans Mono CJK HK", "Noto Sans Mono CJK SC", "Noto Serif", "Noto Serif CJK KR", "Noto Serif CJK SC", "Noto Serif Hebrew", "Noto Serif Italic", "Noto Serif Lao", "OpenSymbol", "Oswald", "PMingLiU", "PMingLiU-ExtB", "Palatino", "Palatino Linotype", "Roboto", "Roboto Black", "Roboto Light", "Roboto Medium", "Segoe Print", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Semilight", "Segoe UI Symbol", "SimSun", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman Cyr", "Times New Roman Greek", "Times New Roman TUR", "Verdana", "Wingdings 2", "Wingdings 3", "Yu Gothic UI", "Zapf Dingbats"]
            },
            "plugins": {
                "enableFlash": true,
                "enableVulnerable": true
            }
        }
        // console.log('Tạo thành công Profile:', profile_id);
    
        await GL.update({
            id: profile_id
        });
        const CachePath0 = `${SettingGmail.ProfileDir}\\${GmailName}_done\\OnDeviceHeadSuggestModel`
        const CachePath = `${SettingGmail.ProfileDir}\\${GmailName}_done\\Default\\Cache\\Cache_Data`
        const CachePath2 = `${SettingGmail.ProfileDir}\\${GmailName}_done\\GrShaderCache`
        const CachePath3 = `${SettingGmail.ProfileDir}\\${GmailName}_done\\WidevineCdm`
        try {
            const GLs = new GoLogin({
                token: tokens,
                profile_id: profile_id,
                tmpdir: SettingGmail.ProfileDir
                // executablePath: './gologin/browser/orbita-browser/chrome.exe'
            });
            console.table({
                GmailName: GmailName,
                GmailPass: GmailPass,
                ReGmail: ReGmail
            })
        
            const { status, wsUrl } = await GLs.startLocal();
            console.log('Khởi chạy :', status)
            const browser = await puppeteer.connect({
                browserWSEndpoint: wsUrl.toString(),
                ignoreHTTPSErrors: true,
                defaultViewport: null,
            });
            await GLs.delete(profile_id);
            await delay(200)
            // Bắt đầu chạy
            try {
                const Loginlink = 'a[data-action="sign in"]';
                const page = await browser.newPage();
                //add Goto page
                await page.goto('https://www.gmail.com/', { waitUntil: 'domcontentloaded' });
                //is mobile
                await page.waitForTimeout(1500);
                const LinksLogin = await page.$x('/html/body/header/div/div/div/a[2]');
                await page.waitForTimeout(900);
                await page.waitForSelector(Loginlink);
                await page.click(Loginlink, { delay: 300 });
                await page.waitForTimeout({ waitUntil: 'networkidle0' });
                await LoginGmail(page, GmailName, GmailPass, Oldpass, ReGmail, profile_id)
                await page.waitForTimeout({ waitUntil: 'networkidle0' });
                
                if (CkeckGmails === true) {
                    await page.waitForTimeout(3000);
                    await Ckeckgmail(page)
                }
                logintrue = true;
                if(Change_avatar === true){
                    await page.waitForTimeout(3000);
                    try {
                        await ChangAvatar(page)
                    } catch (error) {
                        console.log('Lỗi!!, Không thay đổi được avatar')
                    }
                    
                }
                if (SettingGmail.SaveCookie === true) {
                    const scookies = await page.cookies()
                    const scookieJson = JSON.stringify(scookies)
                    fs.writeFileSync(`${SettingGmail.SaveCookieDir}/` + GmailName + '_' + d.getDate() + d.getHours() + d.getMinutes() + '.json', scookieJson)
                    await page.waitForTimeout(1000);
                    console.log('Lưu cookie Thành Công !!', 'Thời gian:', d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
                }
                if (Changepass === true) {
                    await page.waitForTimeout(5000);
                    await Changpass(page, MyNewpass, GmailPass, Oldpass)
                }
                
                await page.close();
                await browser.close();
                const currPath = `${SettingGmail.ProfileDir}/${profile_id}`
                const newPath = `${SettingGmail.ProfileDir}/${GmailName}`
                await delay(1000)
        
                if (logintrue == true) {
                    try {
                        fs.renameSync(currPath, newPath)
                        console.log('Đổi tên: ', profile_id, ' thành ', GmailName)
                        await delay(1000)
                        try {
                            await fs.rmSync(CachePath0, { recursive: true });
                            await fs.rmSync(CachePath, { recursive: true });
                            await fs.rmSync(CachePath2, { recursive: true });
                            await fs.rmSync(CachePath3, { recursive: true });
                            console.log(`Cache is deleted!`);
                        } catch (err) {
                            console.error(`Error deleting Cache.`);
                        }
                    } catch (error) {
                        fs.renameSync(currPath, newPath+'_done')
                        console.log('Đổi tên: ', profile_id, ' thành ', GmailName)
                        await delay(1000)

                        try {
                            await fs.rmSync(CachePath0, { recursive: true });
                            await fs.rmSync(CachePath, { recursive: true });
                            await fs.rmSync(CachePath2, { recursive: true });
                            await fs.rmSync(CachePath3, { recursive: true });
                            console.log(`Cache is deleted!`);
                        } catch (err) {
                            console.error(`Error deleting Cache.`);
                        }
                    }
                   
                }
                await GLs.clearProfileZip();
                const log = {
                    serverName: 'Live',
                    logintrue:txtgmail
                }
                return { log };
        
            } catch (err) {
                await browser.close();
                console.error(err)
                await delay(1000)
                await GLs.delete(profile_id);
                if(LockAcc === true){
                    await GLs.stopLocal();
                    await GLs.clearProfileFiles()
                    console.log('Tài khoản bị Khóa')
                    const log = {
                        serverName: process.env.NODE_ENV,
                        LockAcc: txtgmail
                    }
                    return { log };
                }else{
                    await GLs.stopLocal();
                    await GLs.clearProfileFiles()
                    console.log('Lỗi Đăng nhập')
                    const log = {
                        serverName: process.env.NODE_ENV,
                        txtgmail: txtgmail,
                    }
                    return { log };
                }
                
            }
        } catch (error) {
            await GL.delete(profile_id);
            await GL.clearProfileFiles();
            console.log(error)
            const log = {
                serverName: process.env.NODE_ENV,
                txtgmail: txtgmail,
                }
                return { log, run };
        }
    } catch (error) {
        console.log(error)
        const log = {
            serverName: process.env.NODE_ENV,
            txtgmail: txtgmail,
            }
            return { log, run };
    }

};

module.exports = run;
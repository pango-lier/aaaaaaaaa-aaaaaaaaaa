'use strict';
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
let rawdata = fs.readFileSync('./config/browser.json');
let SettingBrowser = JSON.parse(rawdata);

let runsetting = fs.readFileSync('./config/run.json');
let SettingRun = JSON.parse(runsetting);
const runChangAccountGoogle = require('./lib/index')


async function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function checkPortAvailable(port) {
    try {
        const { stdout, stderr } = await exec(`lsof -i:${port}`);
        if (stdout && stdout.match(/LISTEN/gmi)) {
            debug(`PORT ${port} IS BUSY`)
            return false;
        }
    } catch (e) { }

    return true;
}

async function getRandomPort() {
    let port = getRandomInt(20000, 40000);
    let port_available = checkPortAvailable(port);
    while (!port_available) {
        port = getRandomInt(20000, 40000);
        port_available = await checkPortAvailable(port);
    }
    return port;
}

async function initBrowser(proxyInfo, proxyInfos) {
    const remote_debugging_port = await getRandomPort();
    const IpProxy = proxyInfo.split(':')[0];
    const ports = proxyInfo.split(':')[1];
    //  const DataSearh = fs.readFileSync('./keywork/' + TraficSearh, { encoding: 'utf-8' });

    console.table({
        Xproxy: proxyInfos.ip,
        proxy: IpProxy,
    })
    const Profiles = fs.readdirSync(SettingRun.ProfileDir)
    let profile = Profiles[Math.floor(Math.random() * Profiles.length)]
    const p = [-6, -4, -2, 0, 2, 4, 6, 8]
    let poision = p[Math.floor(Math.random() * p.length)] * 100;
    const ps = [0, 1, 2, 3, 4, 5, 6]
    let poision2 = ps[Math.floor(Math.random() * ps.length)] * 100;
    const activeextension1 = require('path').join(__dirname, '..', 'gologin/extensions/chrome-extensions/aapbdbdomjkkjkaonfhkkikfgjllcleb')
    const activeextension2 = require('path').join(__dirname, '..', 'gologin/extensions/chrome-extensions/cfohepagpmnodfdmjliccbbigdkfcgia')
    const activeextension3 = require('path').join(__dirname, '..', 'gologin/extensions/chrome-extensions/nddmmcpmdbkooddfjcohmlcfclhllgeh')
    const hr_rules = `"MAP * 0.0.0.0 , EXCLUDE ${IpProxy}:${ports}"`;
    const extension = `${SettingRun.ProfileDir}/${profile}/extensions/gologin`
    const browser = await puppeteer.launch({
        ...SettingBrowser,
        args: [
            ...SettingBrowser.args,
            `--disable-extensions-except=${activeextension1},${activeextension2},${activeextension3}`,
            `--load-extension=${activeextension1},${activeextension2},${activeextension3}`,
            `--proxy-server=${IpProxy}:${ports}`,
            `--remote-debugging-port=${remote_debugging_port}`,
            `--user-data-dir=${SettingRun.ProfileDir}/${profile}`,
            `--window-position=${poision},${poision2}`,
            `--host-resolver-rules=${hr_rules}`
        ],

    });
    return browser;
}

async function closeBrowser(browser) {
    try {
        await browser.close();
        await delay(200);
    } catch (error) {
        console.log(error);
    }
    const d = new Date();
    const log = {
        serverName: process.env.NODE_ENV,
        date: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes(),
    }
    return log;
}

async function run(txt, proxyInfo, called, proxyInfos) {
    try {
        const browser = await initBrowser(proxyInfo, proxyInfos);
        const page = await browser.newPage();
        await page.waitForTimeout(1000);
        await runChangAccountGoogle(page);
        await page.close();
    } catch (error) {
        console.log(error);
    }

    //false
    const log = await closeBrowser(browser);
    return { log };
};

module.exports = run;
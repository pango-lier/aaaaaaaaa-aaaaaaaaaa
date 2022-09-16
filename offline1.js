require('dotenv').config({ path: __dirname + '/.env' });
const schedule = require('node-schedule');

const fs = require('fs');
const logger = require('./helpers/logger');
const fetchProxy = require('./helpers/proxy');
const run = require('./tasks/offline');
let rawdata = fs.readFileSync('./config/run.json');
let Settingproxy = JSON.parse(rawdata);
let Tinsoft = Settingproxy.tinsoft
let Xproxy = Settingproxy.xproxy
let TMproxy = Settingproxy.tmproxy
let isProxyAlive = false;
let Tinproxy = Settingproxy.tin_proxy
let Hour_start = Settingproxy.Hour_start
let Min_start = Settingproxy.Min_start
let Hour_end = Settingproxy.Hour_end
let Min_end = Settingproxy.Min_end
let proccessOnFlg = true;
let isProccessRuning = false;

let proxyInfo = '';
let index = 0;
let called = 1;
const txt = fs.readFileSync('./config/token.txt', { encoding: 'utf-8' });
const ENV_KEY = (process.env.NODE_ENV || '').replace('SERVER', 'KEY');
const key = process.env[ENV_KEY];
const textArray = txt.split(/\r\n/g).filter(Boolean);

async function processes(countProccess) {
    //Tinsoft
    if (!proccessOnFlg) {
        isProccessRuning = false;
        return;
    }

    if (!isProxyAlive && Tinsoft === true) {
        const proxyInfoResponse = await fetchProxy(key);
        isProxyAlive = true;
        proxyInfo = proxyInfoResponse.proxy;
        proxyInfos = proxyInfo;
        if (proxyInfoResponse && proxyInfoResponse.next_change) {
            setTimeout(() => {
                isProxyAlive = false;
            }, proxyInfo.next_change - 20)
        }
    }

    //Xproxy
    if(Xproxy === true){
        let sever = key.split(':')[0];
        let port = key.split(':')[1];
        proxyInfos = await fetchProxy(key);
        proxyInfo = sever + ':' + port
        // proxyInfos = proxyInfo
        // console.log(key)
    }
    if (!isProxyAlive && Tinproxy === true) {
        let proxyInfoResponse = await fetchProxy(key);
        proxyInfo = proxyInfoResponse;
        proxyInfos = proxyInfo;
        //console.log(proxyInfo)
    }
    //TMproxy
    if (!isProxyAlive && TMproxy === true) {
        let proxyInfoResponse = await fetchProxy(key);
        proxyInfo = proxyInfoResponse;
        proxyInfos = proxyInfo;
        // console.log(proxyInfo)
    }



    let txt = textArray[index];
    index = index + 10;
    if (!txt) {
        index = 0;
        txt = textArray[index]
    }

    if (countProccess && typeof countProccess === 'number') {
        try {
            const { log } = await run(txt, proxyInfo, called, proxyInfos);
            await logger(log);

            if (called < countProccess) {
                called = called + 1;
                setTimeout(() => {
                    processes(countProccess);
                }, 10000)
            }
        } catch (error) {
            console.log("Global error", error);
            setTimeout(() => {
                processes(countProccess);
            },10000)
        }
    } else {
        const { log } = await run(txt);
        await logger(log);
        setTimeout(() => {
            processes();
        }, 10000)
    }
}


schedule.scheduleJob({
    // rule: '0 0 8 * * 0-7'
    rule: `00 ${Min_start} ${Hour_start} * * 0-7`
}, function() {
    proccessOnFlg = true;
    if (!isProccessRuning) {
        console.log('START OFFLINE 1')
        processes(999991);
    }
})

schedule.scheduleJob({
    // rule: '59 59 23 * * 0-7'
    rule: `0 ${Min_end} ${Hour_end} * * 0-7`
}, function() {
    proccessOnFlg = false;
    console.log('END OFFLINE 1');
})
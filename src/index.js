'use strict'; 
var CryptoJS = require("crypto-js");//replace thie with script tag in browser env
    const puppeteer = require('puppeteer');
    const account = 'xxxxxx';  //输入邮箱名
    const a = 'xxxxxxx';  //输入密码，可以选择输入Base64加密后的密码，下方一行是解密函数
    const password = CryptoJS.enc.Base64.parse(a).toString(CryptoJS.enc.Utf8); 
// 设置延时时间
const sleep = time =>
    new Promise(resolve => {
      setTimeout(resolve, time);
    });

exports.main_handler = async () => {
    
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        dumpio: false
      }); //打开浏览器

      var cnt = 0;
      do{
          try{
              const page = await browser.newPage(); //打开一个空白页
              await page.goto('https://forever.ypork.com/auth/login',{
              waitUntil: 'networkidle2' // 网络空闲说明已加载完毕
              }); //打开网站
              cnt = 7;
          }catch(error){
              cnt++;
          }
      }while(cnt<5)

      await sleep(3000);
      await page.type('#email', account, {delay: 100}); //delay 像个正常人一样输入账号密码
      await page.type('#passwd', password, {delay: 200}); //delay 像个正常人一样输入账号密码
      await page.click('#login');


      await page.waitForNavigation({
            waitUntil: 'load'
      }); //等待页面加载出来
          

      await page.tap('#checkin'); //签到领取流量
      await browser.close();

};

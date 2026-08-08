#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()

async function start() {
  // --- 【新增代码开始】 ---
  // 1. 读取 Vercel 环境变量中的 Cookie
  const cookieFromEnv = process.env.NETEASE_COOKIE;
  
  if (cookieFromEnv) {
    console.log('检测到环境变量 NETEASE_COOKIE，正在注入...');
    
    // 2. 引入 Cookie 管理模块
    // 注意：这里的路径是相对于 app.js 的，通常 NeteaseCloudMusicApi 的结构是这样的
    const Cookie = require('./util/request').cookie; 
    
    // 3. 将环境变量写入全局 Cookie 对象
    // 这里的逻辑是将字符串解析后放入内存，模拟登录状态
    const cookies = cookieFromEnv.split(';');
    cookies.forEach(c => {
        const [name, value] = c.split('=');
        if (name && value) {
            Cookie[name.trim()] = value.trim();
        }
    });
    console.log('Cookie 注入成功！');
  } else {
    console.log('未检测到 NETEASE_COOKIE 环境变量，将以游客模式运行。');
  }
  // --- 【新增代码结束】 ---

  // 检测是否存在 anonymous_token 文件,没有则生成
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
  }
  
  // 启动时更新anonymous_token
  const generateConfig = require('./generateConfig')
  await generateConfig()
  
  require('./server').serveNcmApi({
    checkVersion: true,
  })
}
start()

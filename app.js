// app.js
const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()

// 确保临时目录存在
if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
  fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
}

// 引入 generateConfig 并执行（如果需要）
// const generateConfig = require('./generateConfig')
// generateConfig() 

// 导出服务供 Vercel 调用
module.exports = require('./server').serveNcmApi({
  checkVersion: true,
})

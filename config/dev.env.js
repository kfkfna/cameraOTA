'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 后端接口地址
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.0.114:8091"'
  BASE_API: '"https://dev.redbeecloud.com"'  // test
  // BASE_API: '"https://mock.presstime.cn/mock/62f1bac2bbad94002827dd88/example"'
//  BASE_API: '"https://www.redbeelab-videocloud.com"'
})

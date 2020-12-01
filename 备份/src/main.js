import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { DatePicker, ConfigProvider } from 'ant-design-vue'
import 'ant-design-vue/lib/date-picker/style/css'
import 'core-js/stable' // ants兼容IE

// 主题
import theme from '@/styles/theme.scss'
import variables from '@/styles/variables.scss'// 高度变量样式表
import '@/styles/index.scss' // global css
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import i18n from './lang'
import '@/styles/theme.scss' // 主题色样式表
import App from './App'
import store from './store'
import router from './router'
import {
  getParams
} from '@/utils/getParamter'
import '@/icons' // icon
import '@/permission' // permission control
import utils from '@/utils/index'
import config from '@/utils/config'
import { requestAPI, requestImport, requestUpload } from '@/api/commonRequest'
import '@/utils/filter'
import Sortable from 'sortablejs'
import printJs from '@/utils/print'
import CacheObject from '@/cache/dataCache'
import ConfigCache from '@/cache/configCache'

import iconFont from '@/utils/iconfontMoth' // 自定义图标
import '@/utils/directives'

import mpErrMsg from '@/utils/mpErrMsg'
/**
 * mockXHR()：客户端mock
 * 测试环境staging使用本地mock
 */
// import {
//   mockXHR
// } from '../mock'
// if (process.env.NODE_ENV === 'staging') {
//   mockXHR()
// }

// // 通过环境变量来判断是否需要加载启用
// if (process.env.NODE_ENV === 'development') {
//   // require('./mock')
// }

// if (module.hot) {
//   module.hot.accept()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, {
  size: 'small', zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(DatePicker) // andt日期选择器
Vue.use(ConfigProvider) // andt中文设置

Vue.config.productionTip = false
// 全局方法
Vue.prototype.$getParams = getParams
// 公共方法
Vue.prototype.$utils = utils
Vue.prototype.$config = config
// 请求GraphQL API方法
Vue.prototype.$requestAPI = requestAPI
Vue.prototype.$requestImport = requestImport
Vue.prototype.$requestUpload = requestUpload
// 网格拖拽
Vue.prototype.$Sortable = Sortable
// 缓存数据
Vue.prototype.$OrgCacheData = CacheObject
// 配置数据
Vue.prototype.$ConfigCache = ConfigCache
// 打印
Vue.prototype.$printJs = printJs
// 主题
Vue.prototype.$theme = theme
// 高度尺寸变量
Vue.prototype.$variables = variables

// 自定义图标
Vue.prototype.iconfontMoth = iconFont

// MP API报错信息
Vue.prototype.$mpErrMsg = mpErrMsg

window.app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

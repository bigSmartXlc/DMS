import router from './router'
import store from './store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从Cookie中读取token
import getPageTitle from '@/utils/get-page-title'
import config from '@/utils/config'
import { CacheConfig } from '@/cache/configCache/index'
import { MessageBox } from 'element-ui'
import { getIFrameUrl } from '@/utils/iframe'
import storage from '@/utils/storage'
import Vue from 'vue'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login', '/iamLogin'] // 不重定向的白名单

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login' || to.path === '/iamLogin') {
      if (to.path === '/iamLogin') {
        // 判断是否从IAM退出登录页面切换
        if (document.referrer.indexOf('http/logout.do') > -1) {
          // 如果已经登陆则先退出登录
          store.dispatch('user/logout').then(response => {
            location.href = config.loginConfig.iamLoginUrl
          })
          return
        }
      }
      // 如果已经登陆，重定向到首页
      next({ path: '/' })
      store.dispatch('tagsView/delAllViews')
      NProgress.done()
    } else {
      // 是否内页应用：
      // 设置是否只显示内容页（url中含有“only=x”的）
      if (location.href.indexOf('only=') > -1) {
        await store.dispatch('settings/changeSetting', {
          key: 'showContent',
          value: location.href.indexOf('only=1') < 0
        })
      }

      const hasMenuInfo = store.getters.menu
      if (hasMenuInfo && hasMenuInfo.length > 0) {
        if (store.state.tagsView.cachedViews.length === 0 && to.fullPath.indexOf('manual=') !== -1) {
          next({ path: '/dashboard' })
          NProgress.done()
        } else if (store.state.tagsView.cachedViews.length < store.state.tagsView.maxCacheCount ||
          store.state.tagsView.cachedViews.includes(to.name)) {
          if (store.state.settings.showContent === true) {
            // 处理IFrame嵌套页面
            handleIFrameUrl(to.path, '1', to)

            // 记录菜单访问日志
            NavigationLogAdd(to, from, next)
          }
          setPageSize()
          next()
        } else {
          document.title = getPageTitle(from.meta.title)
          NProgress.done()
          MessageBox.alert('您打开的窗口过多，请关闭其中一些再试', '温馨提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      } else {
        try {
          // 获取用户菜单
          // const accessRoutes =
          await store.dispatch('user/getMenu')
          if (store.state.settings.showContent === true) {
            // router.addRoutes(accessRoutes)
            // 处理IFrame嵌套页面      （获取菜单后不需要处理）
            // handleIFrameUrl(to.path, '2')
            // 解决动态路由刷新页面空白、404问题
            // 获取总体配置
            // await store.dispatch('sysConfig/syslookupValueQuery')
            // 账号配置（/mp/framework/sysetload.do?datatype=5）
            await store.dispatch('sysConfig/systemSetLoad', { datatype: '5' })
            // 系统可配置缓存读取(系统)（/ly/mp/busicen/prc/graphql.do?v=proConfigDesktopQueryByPage）
            if (false) { // 预留，桌面、颜色等配置还没生效
              await store.dispatch('sysConfig/configureCache').then(response => {
                if (response.result === '1') {
                  const list = response.rows
                  if (list.length !== 0) {
                    const json = JSON.parse(list[0].pwdExpress)
                    if (JSON.stringify(json) !== '{}') {
                      // 是否启用配置化
                      if (json.useConfigisEnable === '1') {
                        CacheConfig.useConfig = true
                      } else {
                        CacheConfig.useConfig = false
                      }
                      // 是否启用配置缓存
                      if (json.useCacheisEnable === '1') {
                        CacheConfig.useCache = true
                      } else {
                        CacheConfig.useCache = false
                      }
                      // 缓存时长（秒）
                      CacheConfig.cacheSeconds = Number(json.iscacheDuration)
                      // 帆软服务地址
                      config.fineReport.fineReportUrl = json.fineReportUrl
                      config.fineReport.fineReportUser = json.fineReportUser
                      config.fineReport.fineReportPwd = json.fineReportPwd
                    }
                  }
                }
              })
              // 系统可配置缓存读取(用户)（/ly/mp/busicen/prc/graphql.do?v=proConfigDesktopQueryByPage）
              await store.dispatch('sysConfig/configureisHorizontal').then(response => {
                if (response.result === '1') {
                  const list = response.rows
                  const chickColor = storage.get('chickColor') // 缓存参数
                  if (list.length !== 0) {
                    // 用户保存信息
                    store.commit('app/GET_CONFIGTABLEID', list[0].tableId)
                    store.commit('app/GET_UPDATECONTROID', list[0].updateControlId)
                    store.commit('app/GET_XMLSTRING', JSON.parse(list[0].pwdExpress))
                    const json = JSON.parse(list[0].pwdExpress)
                    if (JSON.stringify(json) !== '{}') {
                      // 缓存配置导航
                      store.commit('app/TOGGLE_MENU', !json.isHorizontal)
                      // 颜色主题配置   是否读取缓存 为红色则读取请求颜色
                      if (chickColor && chickColor !== 'red') {
                        settheMeinfo(chickColor, store.state.themeColor)
                      } else {
                        settheMeinfo(json.nowTheme, store.state.themeColor)
                      }
                    }
                  } else {
                    // 默认设置 导航为false 颜色为红色
                    store.commit('app/TOGGLE_MENU', true)
                    // 是否读取缓存 为红色则读取默认颜色
                    if (chickColor && chickColor !== 'red') {
                      settheMeinfo(chickColor, store.state.themeColor)
                    } else {
                      settheMeinfo('red', store.state.themeColor)
                    }
                    store.commit('app/GET_CONFIGTABLEID', '')
                    store.commit('app/GET_UPDATECONTROID', '')
                    store.commit('app/GET_XMLSTRING', '')
                  }
                }
              })
            }
            // 提示前5天用户密码过期
            const expireDay = store.state.sysConfig.accountConfig.usr_expires ? Number(store.state.sysConfig.accountConfig.usr_expires) : 0
            const updateWdDay = store.state.user.orgInfo.UPDATEPWDTIME ? new Date(store.state.user.orgInfo.UPDATEPWDTIME) : ''
            if (updateWdDay && expireDay) {
              const t = new Date(updateWdDay.getFullYear(), updateWdDay.getMonth(), (updateWdDay.getDate() + expireDay))
              const n = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())
              const d = parseInt((t - n) / 1000 / 3600 / 24)
              if (d <= 5 && d >= 0) {
                MessageBox.alert('本账号密码将于' + d + '天后过期，请修改密码。', '温馨提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })
              } else if (d < 0) {
                MessageBox.alert('本账号密码已过期，请尽快修改密码。', '温馨提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })
              }
            }
          }
          try {
            next({ ...to, replace: true })
          } catch (e) {
            next('/')
          }
        } catch (error) {
          // 删除token并跳转到登陆页面
          await store.dispatch('user/resetToken')
          if (config.loginConfig.loginType === '1') {
            next(`/iamLogin`)
          } else {
            next(`/login?redirect=${to.path}`)
          }
          NProgress.done()
        }
      }
    }
  } else {
    // 账号配置
    await store.dispatch('sysConfig/systemSetLoad', { datatype: '5' })
    /* 没有Token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中不需要登陆
      if (to.path === '/iamLogin') {
        // IAM登陆先验证
        const code = Vue.prototype.$utils.getQueryVariable('code')
        const state = Vue.prototype.$utils.getQueryVariable('state')
        if (code && code.length > 0 && state && state.length > 0) {
          // IAM登陆验证
          await store.dispatch('user/iamLogin', {code: code, state: state}).then(() => {
            next({ path: '/' })
          }).catch(response => {
            setPageSize()
            next()
          })
        } else {
          // IAM登陆跳转
          location.href = config.loginConfig.iamLoginUrl
          return
        }
      } else {
        setPageSize()
        next()
      }
    } else if (config.loginConfig.loginType === '1') {
      const code = Vue.prototype.$utils.getQueryVariable('code')
      const state = Vue.prototype.$utils.getQueryVariable('state')
      if (code && code.length > 0 && state && state.length > 0) {
        // IAM登陆验证
        next(`/iamLogin?code=${code}&state=${state}`)
      } else {
        // IAM登陆跳转
        location.href = config.loginConfig.iamLoginUrl
        return
      }
      NProgress.done()
    } else {
      // 不在白名单需要跳转到登陆
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
// 颜色主题变化
function settheMeinfo(color, nowThemed) {
  nowThemed.nowTheme.colorTheme = color + '-theme'
  for (var x in nowThemed.themeColor) {
    if (color === x) {
      nowThemed.nowTheme.colorNumber = nowThemed.themeColor[x]
      nowThemed.nowTheme.backgroundColor = nowThemed.themeColor[x]
      nowThemed.nowTheme.borderColor = nowThemed.themeColor[x]
      nowThemed.nowTheme.colorNumber = nowThemed.themeColor[x]
      if (color !== 'silvery') {
        nowThemed.nowTheme.fontColor = nowThemed.themeColor['silvery']
        nowThemed.nowTheme.iconColor = nowThemed.themeColor['silvery']
      } else {
        nowThemed.nowTheme.fontColor = nowThemed.themeColor['fontColor333']
        nowThemed.nowTheme.iconColor = nowThemed.themeColor['fontColor333']
      }
    }
  }
}
// 处理IFrame嵌套页面
function handleIFrameUrl(path, type, to) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  var url = path
  var length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    var iframe = store.state.iframe.iframeUrls[i]
    // to.name === iframe.path中iframe.path对应user.js中的iframe的code配置
    if (path != null && (path.endsWith(iframe.path) || to.name === iframe.path)) {
      url = getIFrameUrl(iframe.url, config.mp2HostUrl)
      if (url === '') {
        url = iframe.url
      }
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

// 设置每页显示
function setPageSize() {
  if (config.isInitPageSize === false) {
    const documentHeight = document.body.clientHeight
    if (documentHeight < 530) {
      config.defaultPageSize = config.pageSizeArray[0]
    } else if (documentHeight >= 530 && documentHeight < 630) {
      config.defaultPageSize = config.pageSizeArray[1]
    } else if (documentHeight >= 630 && documentHeight < 780) {
      config.defaultPageSize = config.pageSizeArray[2]
    } else if (documentHeight >= 780 && config.pageSizeArray.length > 3) {
      config.defaultPageSize = config.pageSizeArray[3]
    } else {
      config.defaultPageSize = config.pageSizeArray[0]
    }
    config.isInitPageSize = true
  }
}

// 记录导航日志
function NavigationLogAdd(to, from, next) {
  if (to.menuId || to.meta.menuId) {
    setTimeout(function() {
      try {
        const saveInfo = {
          objid: to.menuId || to.meta.menuId,
          objname: to.meta.title,
          objurl: to.path,
          objtype: '0'
        }
        // if (store.getters.visitedViews.some(v => v.path === to.path)) return
        store.dispatch('user/navigationLogAdd', saveInfo)
      } catch {
        console.info('NavigationLogAdd error')
      }
    })
  }
}

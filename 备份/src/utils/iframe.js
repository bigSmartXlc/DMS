/**
 * 嵌套页面IFrame模块
 */
/**
 * 嵌套页面URL地址
 * @param {*} url
 */
export function getIFramePath(url) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    if (/^iframe:http[s]?:\/\/.*/.test(url)) {
      iframeUrl = url.replace('iframe:https://', '')
      iframeUrl = iframeUrl.replace('iframe:http://', '')
      iframeUrl = iframeUrl.replace(new RegExp('[/&\?=\.#%]+', 'gm'), '')
    } else {
      iframeUrl = url.replace('iframe:', '')
    }
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url
    // iframeUrl = url.replace('https://', '')
    // iframeUrl = iframeUrl.replace('http://', '')
    // if (iframeUrl.indexOf(':') !== -1) {
    //   iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(':') + 1)
    // }
  }
  return iframeUrl
}

/**
 * 嵌套页面路由路径
 * @param {*} url
 */
export function getIFrameUrl(url, mp2Host) {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    // 针对MP2链接的处理 【嵌套MP（老式）】
    var urls = url.split('@')
    if (urls.length > 1) {
      // 配置模式如：iframe:permission@2dd500abffc44102b9b2042dc46fd62a
      iframeUrl = mp2Host + '/#home?menuid=' + urls[1] // urls[1]值如：menuid
    } else if (url.indexOf('.js') > -1) {
      // 配置模式如：iframe:/src/framework/functionTrack/serviceFunc/modmap.js 【嵌套MP】
      iframeUrl = mp2Host + '/#' + url.replace('iframe:', '') // /src/framework/functionTrack/serviceFunc/modmap.js
    } else if (url.startsWith('iframe:http')) {
      // 配置模式如：iframe:http://www.domain.com/ 【站外】
      iframeUrl = url.replace('iframe:', '')
    } else if (url.startsWith('iframe:/')) {
      // 配置模式如：iframe:/webroot/decision/v10/entry/access/a989da73-a392-4182-81b8-2fdb2cef21d1 【本站】
      iframeUrl = url.replace('iframe:', '')
    }
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url
  }
  return iframeUrl
}


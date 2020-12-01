/**
 * description: 打印方法
 * author: luojx
 * createdDate: 2019-12-27
 * *  2019-11-29 修改必填校验独立属性  liyanm
*/

import printJS from 'print-js'
import html2canvas from 'html2canvas'

/**
 * 根据element打印
 * @styleType style类型（append:追加样式）
 */
function printByEle(ele, style, styleType, css, type) {
  var dom = getDom(ele)
  var html = getHtml(dom)
  printByHtml(html, style, styleType, css, type)
}

/**
 * 根据html打印
 * @styleType style类型（append:追加样式）
 */
function printByHtml(html, style, styleType, css, type) {
  // IE去除页头页尾
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    // 是否ie
    remove_ie_header_and_footer()
  }

  let styles = ''
  if (styleType === 'append') {
    styles = getStyle() + ' ' + style
  } else {
    styles = style || getStyle()
  }

  printJS({
    printable: html,
    type: type || 'raw-html',
    css: css || getCss(),
    style: styles
  })
}

function printByImg(refs, style, styleType, css, type){
  // IE去除页头页尾
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    // 是否ie
    remove_ie_header_and_footer()
  }
  html2canvas(refs, {
    backgroundColor: null,
    useCORS: true,
    windowHeight: document.body.scrollHeight
  }).then((canvas) => {
    // let url = canvas.toDataURL('image/jpeg', 1.0)
    const url = canvas.toDataURL()
    this.img = url

    let styles = ''
    if (styleType === 'append') {
      styles = getStyle() + ' ' + style
    } else {
      styles = style || getStyle()
    }
    printJS({
      printable: url,
      type: 'image',
      documentTitle: '打印图片'
    })
  })
}
/**
 * 根据dom获取html
 */
function getHtml(dom) {
  var inputs = document.querySelectorAll('input')
  var textareas = document.querySelectorAll('textarea')
  var selects = document.querySelectorAll('select')

  for (var k = 0; k < inputs.length; k++) {
    if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
      if (inputs[k].checked === true) {
        inputs[k].setAttribute('checked', 'checked')
      } else {
        inputs[k].removeAttribute('checked')
      }
    } else if (inputs[k].type === 'text') {
      inputs[k].setAttribute('value', inputs[k].value)
    } else {
      inputs[k].setAttribute('value', inputs[k].value)
    }
  }

  for (var k2 = 0; k2 < textareas.length; k2++) {
    if (textareas[k2].type === 'textarea') {
      textareas[k2].innerHTML = textareas[k2].value
    }
  }

  for (var k3 = 0; k3 < selects.length; k3++) {
    if (selects[k3].type === 'select-one') {
      var child = selects[k3].children
      for (var i in child) {
        if (child[i].tagName === 'OPTION') {
          if (child[i].selected === true) {
            child[i].setAttribute('selected', 'selected')
          } else {
            child[i].removeAttribute('selected')
          }
        }
      }
    }
  }

  return dom.outerHTML
}

/**
 * 根据对象获取dom
 */
function getDom(ele) {
  var dom
  if ((typeof ele) === 'string') {
    dom = document.querySelector(ele)
  } else {
    dom = isDOM(ele) ? ele : ele.$el
  }
  return dom
}

/**
 * 获取style内容
 */
function getStyle(id) {
  var str = ''
  var styles = document.querySelectorAll('style')
  for (var i = 0; i < styles.length; i++) {
    if (id !== null && id !== undefined && styles[i].id === id) {
      str = styles[i].innerHTML
      break
    } else {
      str += styles[i].innerHTML
    }
  }
  return str
}

/**
 * 获取css路径
 */
function getCss() {
  var str = []
  var styles = document.querySelectorAll('link')
  for (var i = 0; i < styles.length; i++) {
    var filename = styles[i].getAttribute('href')
    if (filename.indexOf('.css') > -1) {
      str.push(filename)
    }
  }
  return str
}

/**
 * IE去除页头页尾
 */
function remove_ie_header_and_footer() {
  var hkey_path
  hkey_path = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\'
  try {
    var RegWsh = new ActiveXObject('WScript.Shell')
    RegWsh.RegWrite(hkey_path + 'header', '')
    RegWsh.RegWrite(hkey_path + 'footer', '')
  } catch (e) {
    console.info(e)
  }
}

/**
 * 是否dom
 */
function isDOM(obj) {
  if (typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement
  } else {
    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
  }
}

export default {
  // 根据Html打印
  printByHtml,
  // 根据element打印
  printByEle,
  // 读取Style标签内容
  getStyle,
  //打印网页转图片
  printByImg,
}

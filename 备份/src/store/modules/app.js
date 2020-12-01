import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import { Loading } from 'element-ui'
import config from '@/utils/config'
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  loading: {},
  // 加载提示文字
  loadingText: config.isloadingText,
  // 弹窗title显示效果 true-默认效果  false-书签效果
  dialogType: config.isdialogType,
  menuStyle: {
    // 是否显示横竖导航
    isHorizontal: false
    // isHorizontal: Cookies.get('isHorizontalStatus') ? !!+Cookies.get('isHorizontalStatus') : false
  },
   // 首页未读公告信息 
   unreadNum:0,
   // 我的公告组件删除刷新
   unreadDelete:0,
   // 配置缓存用户-表ID
   configTableId:"",
   // 配置缓存用户-并发ID
   configUpdateControlId:"",
   // 配置缓存用户-xml数据
   configxmlString:"",
}

const mutations = {
 GET_CONFIGTABLEID: (state, configTableId) => {
    state.configTableId = configTableId
  },
 GET_UPDATECONTROID: (state, configUpdateControlId) => {
    state.configUpdateControlId = configUpdateControlId
  },
 GET_XMLSTRING: (state, configxmlString) => {
    state.configxmlString = configxmlString
  },
  SET_UNREAD: (state, unreadNum) => {
    state.unreadNum = unreadNum
  },
  SET_UNREADELETE: (state) => {
    state.unreadDelete++
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  LOADING: (state, lockOrUnLock) => {
    state.loading = Loading.service({
      fullscreen: true,
      lock: true,
      text: state.loadingText,
      // spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)'
    })
    state.lock = lockOrUnLock === '' ? '' : (lockOrUnLock === 'lock' ? true : false)
  },
  LOCK_SCREEN: (state) => {
    state.loading = Loading.service({
      fullscreen: true,
      lock: true,
      text: '',
      customClass: 'sys-lock-screen',
      spinner: '',
      background: 'rgba(0, 0, 0, 0.5)'
    })
  },
  TOGGLE_MENU: (state, isHorizontalBool) => {
    state.menuStyle.isHorizontal = !isHorizontalBool
    // state.menuStyle.isHorizontal = !state.menuStyle.isHorizontal
    // if (state.menuStyle.isHorizontal) {
    //   Cookies.set('isHorizontalStatus', 1)
    // } else {
    //   Cookies.set('isHorizontalStatus', 0)
    // }
    if (!state.menuStyle.isHorizontal) {
      document.getElementsByTagName('body')[0].className =
        ''
    } else {
      document.getElementsByTagName('body')[0].className =
        'isHorShowItemList'
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  loading({ commit }, lockOrUnLock) {
    commit('LOADING', lockOrUnLock)
  },
  lockScreen({ commit }) {
    commit('LOCK_SCREEN')
  },
  // toggleMenu({ commit }) {
  //   commit('TOGGLE_MENU')
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

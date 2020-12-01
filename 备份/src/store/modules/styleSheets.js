// 客制化常量
import storage from "@/utils/storage";
const state = {
    // 控制整体样式
    isProduct: 'cyc-', // ''为产品样式；'cyc-'为客制化样式
    // 登录界面元素与样式
    loginCss: {
        loginBgUrl: 'dongfeng-login.jpg', // 背景图片（背景静态图片必须放在assets/login文件夹内）
        loginBgColor: 'f5f7fa',
        loginBgSize: '100',
        titleFontSize: 'auto'// 自定义标题字号
    },
    // 主菜单logo切换
    logo: {
        logoLittle: 'logo.png', // logo图片（logo静态图片必须放在assets/login文件夹内）(收缩)
        logoBig: 'logo1.png', //（展开）
        logoName: 'DMS系统',
        logoNamefr: 'DFPV',
        logoNameen: 'DFPV'
    }
}
const mutations = {
    SET_TITLE: state => {
        storage.set('prductMessage', state.logo.logoName)
        storage.set('prductMessagefr', state.logo.logoNamefr)
        storage.set('prductMessageen', state.logo.logoNameen)
    }
}

const actions = {
    productName({ commit }) {
        commit('SET_TITLE')
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

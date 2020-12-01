import theme from '@/styles/theme.scss'

const state = {
    themeColor: theme, // 所有主题色
    //当前主题
    nowTheme: {
        colorTheme: 'red-theme',
        colorNumber: '#E70020',
        fontColor: '#fff',
        backgroundColor: '#E70020',
        borderColor: '#E70020',
        iconColor: '#fff'
    }
}

const mutations = {
    SET_THEMEINFO(state, color) {
        state.nowTheme.colorTheme = color + '-theme'
        for (var x in state.themeColor) {
            if (color === x) {
                state.nowTheme.colorNumber = state.themeColor[x]
                state.nowTheme.backgroundColor = state.themeColor[x]
                state.nowTheme.borderColor = state.themeColor[x]
                state.nowTheme.colorNumber = state.themeColor[x]
                if (color !== 'silvery') {
                    state.nowTheme.fontColor = state.themeColor['silvery']
                    state.nowTheme.iconColor = state.themeColor['silvery']
                } else {
                    state.nowTheme.fontColor = state.themeColor['fontColor333']
                    state.nowTheme.iconColor = state.themeColor['fontColor333']
                }
            }
        }
    }
}

export default {
    state,
    mutations

}


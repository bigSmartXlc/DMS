/**
 * description: 系统配置
 * author: luojx
 * createdDate: 2020-02-19
 */
import { syslookupValueQuery,configureCache,configureisHorizontal} from '@/api/sys/sysConfig'
import { systemSetSave, systemSetLoad } from '@/api/user'
import store from '@/store'
import config from '@/utils/config'

const state = {
  sysConfig: {
    // 选装包产品层次设置
    ProductLevelType: '5', // 全局:0、品牌:1、车系:2、基准车系:3、车型:4、车型配置:5
    // 车型与车型配置层次设置
    CarTypeLevel: '2', // 车型:1、车型配置:2
    // 是否包含储区
    IsContainStorageArea: '1', // 1:包含储区 2:不含储区
    // 系统版本号
    SystemVerson: ''
  },
  // 账号安全配置
  accountConfig: {
    // 密码规则
    pwd_express: '',
    // 规则描述
    pwd_express_desc: '',
    // 过期时间（天）
    usr_expires: '',
    // ======账号异常锁定=====
    // 每xx分钟
    usr_inputtimes: '',
    // 密码或验证码录入错误xx次以上
    usr_errnums: '',
    // 账号锁定xx分钟
    usr_blocktimes: '',
    // 是否可修改密码
    updatepwd: false
  }
}

const mutations = {
  SET_PRODUCT_LEVEL_TYPE_: (state, val) => {
    state.sysConfig.ProductLevelType = val
  },
  SET_CAR_TYPE_LEVEL: (state, val) => {
    state.sysConfig.CarTypeLevel = val
  },
  SET_CONTAIN_STORAGE_AREA: (state, val) => {
    state.sysConfig.IsContainStorageArea = val
  },
  SET_SYSTEM_VERSON: (state, val) => {
    state.sysConfig.SystemVerson = val
  },
  SET_ACCOUNT_CONFIG: (state, val) => {
    state.accountConfig = val
  }
}

const actions = {
  // 查询系统配置值列表
  syslookupValueQuery({ commit, state }) {
    return new Promise((resolve, reject) => {
      const codes = [
        {
          // DB0090: 选装包产品层次设置
          lookupTypeCode: 'DB0082',
          lookupValueCode: '1',
          commitCode: 'SET_PRODUCT_LEVEL_TYPE_'
        },
        {
          // DB0090: 车型与车型配置层次设置
          lookupTypeCode: 'DB0090',
          lookupValueCode: '1',
          commitCode: 'SET_CAR_TYPE_LEVEL'
        },
        {
          // DB0091: 是否包含储区配置
          lookupTypeCode: 'DB0091',
          lookupValueCode: '1',
          isEnable: '1',
          commitCode: 'SET_CONTAIN_STORAGE_AREA'
        }
      ]
      syslookupValueQuery(20, 1, codes).then(response => {
        if (response.result !== '1') {
          reject('读取配置失败.')
        } else {
          const { data } = response
          for (let i = 0; i < codes.length; i++) {
            if (data['a' + i] && data['a' + i].rows && data['a' + i].rows.length > 0) {
              for (let j = 0; j < data['a' + i].rows.length; j++) {
                if (data['a' + i].rows[j].attribute1 && data['a' + i].rows[j].attribute1 !== '') {
                  commit(codes[i].commitCode, data['a' + i].rows[j].attribute1)
                }
              }
            }
          }
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 系统可配置缓存读取(系统)
  configureCache({commit,state},data){
    return new Promise((resolve, reject) => {
      let data=[{
        userId: "1", // 用户ID  系统配置默认ID为1
        dataType: 10002, // 数据类型 数字类型
        tableId:"",
        updateControlId:"",
        xmlString:""
      }]
      configureCache(100,1,data).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 系统可配置缓存读取(用户)
  configureisHorizontal({commit,state},data){
    return new Promise((resolve, reject) => {
      let data=[{
        userId: store.getters.orgInfo.userId, // 用户ID  系统配置默认ID为1
        dataType: 10003, // 数据类型 数字类型
        tableId:"",
        updateControlId:"",
        xmlString:""
      }]
      configureisHorizontal(100,1,data).then(response=>{
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 系统设置查询
  systemSetLoad({ commit, state }, loadInfo) {
    const { datatype } = loadInfo
    return new Promise((resolve, reject) => {
      systemSetLoad({
        token: state.token,
        datatype: datatype
      }).then(response => {
        // 5:安全规则
        if (datatype === '5') {
          let updatepwd = false
          if (response.rows.xml_string) {
            const xmlObj = JSON.parse(response.rows.xml_string)
            if (xmlObj && xmlObj.updatepwd) {
              updatepwd = xmlObj.updatepwd
            }
            if (xmlObj && xmlObj.loginType) {
              config.loginConfig.loginType = xmlObj.loginType
            }
          }
          commit('SET_ACCOUNT_CONFIG', {
            // 密码规则
            pwd_express: response.rows.pwd_express,
            // 规则描述
            pwd_express_desc: response.rows.pwd_express_desc,
            // 过期时间（天）
            usr_expires: response.rows.usr_expires,
            // ======账号异常锁定=====
            // 每xx分钟
            usr_inputtimes: response.rows.usr_inputtimes,
            // 密码或验证码录入错误xx次以上
            usr_errnums: response.rows.usr_errnums,
            // 账号锁定xx分钟
            usr_blocktimes: response.rows.usr_blocktimes,
            // 是否展示修改密码
            updatepwd: updatepwd
          })
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 系统设置保存
  systemSetSave({ commit, state }, saveInfo) {
    return new Promise((resolve, reject) => {
      systemSetSave(saveInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 设置系统版本号
  setSystemVerson({ commit, state }, ver) {
    commit('SET_SYSTEM_VERSON', ver)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

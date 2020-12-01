/**
 * description: 用户相关信息（登陆、退出登陆、获取用户权限菜单等）
 * author: luojx
 * createdDate: 2019-07-16
*/
import { orgApis } from '../src/api/apiList/org'
import org from './org/menuListMock'
export default [
  // 登陆
  {
    url: '/mp/login/validlogin\.*',
    type: 'post',
    data: {},
    response: config => {
      return {
        'result': '1',
        'msg': 'Success',
        'token': 'eea6e05bf1c3438db9f3003315096b48',
        'username': 'dfpvadmin',
        'userid': 'b2bfa0cf8bde48b09ab522e383bafc79',
        'usertype': '2',
        'empname': '总部管理员',
        'errnums': null,
        'timeout': '18000',
        'expires': 10,
        'initstatus': '0',
        'clientid': null,
        'vcode': null,
        'wxbind': '0'
      }
    }
  },
  // 获取用户组织架构信息（restful）
  {
    url: orgApis.getUserLoginInfo.APIUrl,
    type: 'post',
    data: {},
    response: config => {
      return {
        'result': '1',
        'msg': 'Success',
        'row': {
          BRAND_CODE: '1',
          DLR_CODE: 'DFPV',
          DLR_ID: 'HOST',
          DLR_NAME: '主机厂',
          DLR_ORG_TYPE: null,
          DLR_STATUS: null,
          EMP_ID: 'f427300df07342d593e7e5f400ae00cf',
          GROUP_CODE: '1',
          GROUP_ID: '1',
          OEM_CODE: '1',
          OEM_ID: '1',
          ORG_CODE: 'DFPV',
          ORG_ID: 'HOST',
          ORG_NAME: '主机厂',
          ORG_TYPE: '0',
          PARENT_DLR_CODE: null,
          PARENT_DLR_ID: null,
          PARENT_DLR_NAME: null,
          POS_CODE: '',
          POS_ID: '',
          SOLUTION_ID: '',
          COMPANY_ID: 'HOST',
          UPDATEPWDTIME: null
        }
      }
    }
  },
  // 获取用户组织架构信息（graphql）
  // {
  //   url: orgApis.getUserLoginInfo.APIUrl,
  //   type: 'post',
  //   data: {},
  //   response: config => {
  //     return {
  //       'result': '1',
  //       'msg': 'Success',
  //       'data': {
  //         [orgApis.getUserLoginInfo.ServiceCode]: {
  //           BRAND_CODE: '1',
  //           DLR_CODE: 'DFPV',
  //           DLR_ID: 'HOST',
  //           DLR_NAME: '主机厂',
  //           DLR_ORG_TYPE: null,
  //           DLR_STATUS: null,
  //           EMP_ID: 'f427300df07342d593e7e5f400ae00cf',
  //           GROUP_CODE: '1',
  //           GROUP_ID: '1',
  //           OEM_CODE: '1',
  //           OEM_ID: '1',
  //           ORG_CODE: 'DFPV',
  //           ORG_ID: 'HOST',
  //           ORG_NAME: '主机厂',
  //           ORG_TYPE: '0',
  //           PARENT_DLR_CODE: null,
  //           PARENT_DLR_ID: null,
  //           PARENT_DLR_NAME: null,
  //           POS_CODE: '',
  //           POS_ID: '',
  //           SOLUTION_ID: '',
  //           COMPANY_ID: 'HOST',
  //           UPDATEPWDTIME: null
  //         }
  //       }
  //     }
  //   }
  // },
  // 获取用户菜单
  {
    url: '/mp/framework/getMyMenuTree\.*',
    type: 'get',
    response: config => {
      const allMenuList = org.menuList
      return {
        result: '1',
        msg: '',
        rows: allMenuList
      }
    }
  },

  // 退出登陆
  {
    url: '/mp/login/logout\.*',
    type: 'post',
    data: {},
    response: _ => {
      return {
        result: '1',
        msg: 'success'
      }
    }
  },
  // 系统信息
  {
    url: '/mp/framework/sysetload\.*',
    type: 'get',
    data: {},
    response: _ => {
      if (_.url.indexOf('datatype=5') > -1) {
        return {
          "result":"1",
          "msg":"",
          "extInfo":null,
          "rows":{
            "xml_string":"{\"syssetting\":true,\"updatepwd\":true,\"logout\":true,\"menumgr\":true,\"notice\":false,\"safenormal\":true,\"normallogin\":true,\"safedouble\":false,\"dycodelogin\":false,\"weixinlogin\":false,\"facelogin\":false,\"adlogin\":false,\"loginType\":\"0\"}",
            "pwd_express":"",
            "usr_expires":"3600",
            "usr_errnums":"7",
            "usr_inputtimes":"5",
            "usr_blocktimes":"5",
            "pwd_express_desc":"test1",
            "login_begin_time":"",
            "login_end_time":"",
            "block_rules":[
              {"BEGIN_DATE":"2020-05-26 00:00:00","END_DATE":"2030-05-28 00:00:00","BLOCK_DAYS":2}
            ]
          }
        }
      } else if (_.url.indexOf('datatype=4') > -1) {
        return {
          "result":"1",
          "msg":"",
          "extInfo":null,
          "rows":{
            "xml_string":"{\"SysName\":{\"ZH_CN\":\"\",\"EN_US\":\"\",\"JA_JP\":\"\"},\"CompanyName\":{\"ZH_CN\":\"\",\"EN_US\":\"\",\"JA_JP\":\"\"},\"SysRegs\":{\"ZH_CN\":\"\",\"EN_US\":\"\",\"JA_JP\":\"\"},\"SysCode\":\"\",\"SysVersion\":\"SIT_V1.0.01_372\"}",
            "pwd_express":"",
            "usr_expires":"30",
            "usr_errnums":"3",
            "usr_inputtimes":"5",
            "usr_blocktimes":"30",
            "pwd_express_desc":"",
            "login_begin_time":"",
            "login_end_time":"",
            "block_rules":[
              {
                "BEGIN_DATE":"2020-05-26 00:00:00",
                "END_DATE":"2030-05-28 00:00:00",
                "BLOCK_DAYS":2
              }
            ]
          }
        }
      }
    }
  },
  // 系统配置
  {
    url: '/mp/login/sysconfig\.*',
    type: 'get',
    data: {},
    response: _ => {
      return {
        "result":"1",
        "msg":"",
        "extInfo":null,
        "rows":"{\"syssetting\":true,\"updatepwd\":true,\"logout\":true,\"menumgr\":true,\"notice\":false,\"safenormal\":true,\"normallogin\":true,\"safedouble\":false,\"dycodelogin\":false,\"weixinlogin\":false,\"facelogin\":false,\"adlogin\":false,\"loginType\":\"0\"}",
        "currentTime":1604884567014
      }
    }
  },
  // 检查用户是否存在
  {
    url: '/mp/login/checkuser\.*',
    type: 'post',
    data: {},
    response: _ => {
      return {
        "result":"1",
        "msg":null,
        "extInfo":null,
        "rows":{
          "u_content":"ErgiUR1RJ1BFFHr8k5hHmg==",
          "clientid":"899665a80b624c9e9adf8480c0576fb8",
          "errnums":"0",
          "isexist":"0",
          "vcode":""
        }
      }
    }
  },
  // 未读公告
  {
    url: '/mp/notice/unreadnum\.*',
    type: 'get',
    data: {},
    response: _ => {
      return {"result":"1","msg":"","extInfo":null,"rows":{"num":"0"}}
    }
  },
  // 公告列表
  {
    url: '/mp/notice/list\.*',
    type: 'get',
    data: {},
    response: _ => {
      return {"result":"1","msg":"","pageindex":1,"pages":0,"records":0,"rows":[]}
    }
  }
]

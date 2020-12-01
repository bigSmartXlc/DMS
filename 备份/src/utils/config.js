/**
 * 全局配置
 */
// mp2 主机地址（此配置已作废）
// export const mp2HostUrl = 'mpplatform'/'http://172.26.153.150'
const mp2HostUrl = 'mpplatform'
// 固定url（设定时将会替换默认url前缀，本地调试用）
const localUrl = ''
// /标识使用Mock,?标识使用服务器   url径统一字符
const cH = process.env.NODE_ENV === 'development' ? '?' : '?'
// 是否使用水印
const useWaterMark = false
// MP菜单黑名单（不显示在VUE界面中的菜单）
const blackMenuCodes = [
  'orgMgr'/* 组织管理*/,
  'right'/* 权限管理*/,
  'wf'/* 工作流*/,
  'logReport001'/* 日志报表*/,
  'sysMgr001'/* 系统管理*/
]
// 产品层次类型 值列表VE0633 全局:0、品牌:1、车系:2、基准车系:3、车型:4、车型配置:5
const ProductLevelType = '5'
// 登录配置
const loginConfig = {
  // 是否登录验证密码强度
  validPassword: true,
  // 登录验证类型：1:验证码验证,2:滑块验证
  vCodeType: '2',
  // 是否验证请求（防重放验证）
  requestValidate: [
    '/mp/login/sysconfig.do',
    '/mp/login/validlogin.do',
    '/mp/login/manualadlogin.do',
    '/mp/login/vcodelogin.do',
    '/mp/login/revalid.do',
    '/mp/login/adLogin.do',
    '/mp/login/checkuser.do',
    '/mp/login/phonelogin.do',
    '/mp/framework/getMyMenuTree.do'
  ],
  // aes加密Key
  aesKey: 'mplanyou07558888',
  // MP版本
  mpVersion: '2.34',
  // 登录方式（1:IAM登录，0:DMS登录）
  loginType: '0',
  // iam登录跳转地址
  iamLoginUrl: '/mp/dfpv/eap/DfpvIAMLoginService/iamLogin',
  // iam登录跳转地址
  iamLoginOutUrl: '/mp/dfpv/eap/DfpvIAMLoginService/iamLoginOut',
  // iam登录验证
  iamVerificationUrl: '/mp/dfpv/eap/DfpvIAMLoginService/iamGetUserLoginInfo'
}
// excel文件后缀
const excelExp = '.xlsx'
// 是否使用全量菜单
const useFullMenu = true
// 是否显示横竖导航触发按钮
const isHorizontalButtom = true
// 弹窗title显示效果 true-默认效果  false-书签效果
const isdialogType = false
// 加载提示文字
const isloadingText = '正在努力加载中...'
// 是否使用工作台
const isUseWorkbenchScheme = false
// 帆软配置
const fineReport = {
  // 帆软服务地址
  fineReportUrl: '',
  // 帆软服务账号
  fineReportUser: '',
  // 帆软服务密码
  fineReportPwd: '',
  // 帆软是否已经进行单点登录
  isFineReportLogin: false,
  // 帆软报表对照
  fineReports: []
}
// 是否在表格下部显示左右滑动按钮
const isShowTableSlide = false
// 分页数组
const pageSizeArray = [10, 15, 20, 30]
// 默认没有显示
const defaultPageSize = 15
// 是否已经初始化每页显示
const isInitPageSize = false
// API风格（如：restful/graphql/rpc等）
const apiStyle = 'restful'
// 支持嵌套MP前端（写入MP Cookie）
const isMpFront = false

export default {
  mp2HostUrl,
  cH,
  useWaterMark,
  blackMenuCodes,
  localUrl,
  ProductLevelType,
  loginConfig,
  excelExp,
  useFullMenu,
  isHorizontalButtom,
  isdialogType,
  isloadingText,
  isUseWorkbenchScheme,
  fineReport,
  isShowTableSlide,
  pageSizeArray,
  defaultPageSize,
  isInitPageSize,
  apiStyle,
  isMpFront
}

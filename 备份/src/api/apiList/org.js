/**
 * description: 组织架构、公共信息 API清单（服务编码，输入类型）
 * author: luojx
 * createdDate: 2019-07-22
 * logs：
 *  20190722 创建 luojx
 */
import config from '../../utils/config'
// 组织架构1请求URL
const ORG_USC_API_URL = config.localUrl + '/ly/mp/busicen/usc/graphql.do'
// 组织架构2请求URL
const ORG_PRC_API_URL = config.localUrl + '/ly/mp/busicen/prc/graphql.do'
// 组织架构3请求URL
const ORG_EAP_API_URL = config.localUrl + '/ly/mp/busicen/eap/graphql.do'

// ServiceCode：服务编码，InputType：输入类型，APIUrl：请求URL
export const orgApis = {

  // =====组织架构=====
  // 厂商大区查询
  mdmOrgBigAreaQueryByPage: { ServiceCode: 'mdmOrgBigAreaQueryByPage', InputType: 'InputMdmOrgBigArea', APIUrl: '/ly/busicen/usc/org/bigareaservice/mdmorgbigareafindbypage' },
  // 厂商小区查询
  mdmOrgSmallAreaQueryByPage: { ServiceCode: 'mdmOrgSmallAreaQueryByPage', InputType: 'ExInputMdmOrgSmallArea', APIUrl: '/ly/busicen/usc/org/bigareaservice/mdmorgsmallareafindbypage' },
  // 厂商信息保存
  mdmOrgInfoFactoryMutationSave: { ServiceCode: 'mdmOrgInfoFactoryMutationSave', InputType: 'ExInputMdmOrgInfo', APIUrl: ORG_USC_API_URL },
  // 厂商信息查询
  mdmOrgInfoQueryFactoryByPage: { ServiceCode: 'mdmOrgInfoQueryFactoryByPage', InputType: 'ExInputMdmOrgInfo', APIUrl: '/ly/busicen/usc/org/mdmOrgProvince/mdmOrgInfoQueryFactoryByPage' },
  // 厂商组织信息保存
  mdmOrgRelationRealMutationSave: { ServiceCode: 'mdmOrgRelationRealMutationSave', InputType: 'InputMdmOrgRelationReal', APIUrl: '/ly/busicen/usc/org/relationReal/mdmOrgRelationRealMutationSave' },
  // 供应商信息查询
  mdmOrgInfoQuerySupplierByPage: { ServiceCode: 'mdmOrgInfoQuerySupplierByPage', InputType: 'ExInputMdmOrgInfo', APIUrl: ORG_USC_API_URL },
  // 供应商信息保存
  mdmOrgInfoMutationSupplierSave: { ServiceCode: 'mdmOrgInfoMutationSupplierSave', InputType: 'ExInputMdmOrgInfo', APIUrl: ORG_USC_API_URL },

  // 城市保存
  mdmOrgCityMutationSave: { ServiceCode: 'mdmOrgCityMutationSave', InputType: 'InputMdmOrgCity', APIUrl: '/ly/busicen/usc/org/mdmorgcity/mdmOrgCitySave' },
  // 城市查询
  mdmOrgCityQueryFindAll: { ServiceCode: 'mdmOrgCityQueryFindAll', InputType: 'InputMdmOrgCityExt', APIUrl: '/ly/busicen/usc/org/mdmorgcity/mdmorgcityqueryfindall' },
  // 集团信息保存
  mdmOrgInfoMutationGroupSave: { ServiceCode: 'mdmOrgInfoMutationGroupSave', InputType: 'ExInputMdmOrgInfo', APIUrl: '/ly/busicen/usc/org/mdmOrgProvince/mdmOrgInfoMutationGroupSave' },
  // 集团信息查询
  mdmOrgInfoQueryGroupByPage: { ServiceCode: 'mdmOrgInfoQueryGroupByPage', InputType: 'ExInputMdmOrgInfo', APIUrl: '/ly/busicen/usc/org/mdmOrgProvince/mdmOrgInfoQueryGroupByPage' },
  // 集团组织查询
  mdmOrgRelationRealGroupQueryByPage: { ServiceCode: 'mdmOrgRelationRealGroupQueryByPage', InputType: 'InputMdmOrgRelationReal', APIUrl: '/ly/busicen/usc/org/relationReal/mdmOrgRelationRealGroupQueryByPage' },
  // 角色保存
  roleSave: { ServiceCode: 'roleSave', InputType: '', APIUrl: ORG_USC_API_URL },
  // 厂商信息保存
  mdmOrgInfoMutationFactorySave: { ServiceCode: 'mdmOrgInfoMutationFactorySave', InputType: 'ExInputMdmOrgInfo', APIUrl: ORG_USC_API_URL },
  // 角色成员查询
  sysRoleUserQueryByPage: { ServiceCode: 'sysRoleUserQueryByPage', InputType: 'ExInputSysRoleUser', APIUrl: '/ly/busicen/eap/org/sysroleuser/getsysroleuserlist' },
  // 角色成员保存
  sysRoleUserMutationSaves: { ServiceCode: 'sysRolePrivMutationSave', InputType: 'InputSysRolePriv', APIUrl: ORG_EAP_API_URL },
  // 角色成员保存
  sysRoleUserMutationSave: { ServiceCode: 'sysRoleUserMutationSave', InputType: 'InputSysRoleUser', APIUrl: '/ly/busicen/eap/org/sysroleuser/sysroleusersave' },
  // 角色成员删除
  sysRoleUserMutationDel: { ServiceCode: 'sysRoleUserMutationDel', InputType: 'InputSysRoleUser', APIUrl: '/ly/busicen/eap/org/sysroleuser/sysroleuserdel' },
  // 角色权限查询
  sysRolePrivQueryByPage: { ServiceCode: 'sysRolePrivQueryByPage', InputType: 'ExInputSysRolePriv', APIUrl: '/ly/busicen/eap/org/sysrolepriv/getsysroleprivquerylist' },
  // 角色授权
  sysRolePrivMutationSave: { ServiceCode: 'sysRolePrivMutationSave', InputType: 'InputSysRolePriv', APIUrl: '/ly/busicen/eap/org/sysrolepriv/sysRolePrivSave' },

  // 经销商信息查询
  mdmOrgdlrQueryByPage: { ServiceCode: 'mdmOrgdlrQueryByPage', InputType: 'InputExMdmOrgDlr', APIUrl: '/ly/busicen/usc/org/mdmorgdlr/getOrgDlrInfoList' },
  // 经销商信息查询--新
  mdmOrgdlrQueryByPageFindAll: { ServiceCode: 'mdmOrgdlrQueryByPageFindAll', InputType: 'InputExMdmOrgDlrExt', APIUrl: '/ly/busicen/usc/org/mdmorgdlr/getOrgDlrInfoList' },
  // 经销商财务扩展信息
  mdmOrgDlrFinance: { ServiceCode: 'mdmOrgDlrFinance', InputType: 'InputExMdmOrgDlr', APIUrl: ORG_USC_API_URL },
  // 经销商信息管理保存
  mdmOrgDlrMutationSave: { ServiceCode: 'mdmOrgDlrMutationSave', InputType: 'InputExMdmOrgDlr', APIUrl: '/ly/busicen/usc/org/mdmorgdlr/mdmOrgDlrSave' },
  // 经销商销售扩展查询
  mdmOrgDlrQuerySaleList: { ServiceCode: 'mdmOrgDlrQuerySaleList', InputType: 'InputExMdmOrgDlrSale', APIUrl: ORG_USC_API_URL },
  // 经销商联系人查询
  mdmOrgDlrLinkInfoMutationDelete: { ServiceCode: 'mdmOrgDlrLinkInfoMutationDelete', InputType: 'InputMdmOrgDlrLinkInfoForDel', APIUrl: ORG_USC_API_URL },
  // 经销商销售扩展信息保存
  mdmOrgDlrMutationSaleSave: { ServiceCode: 'mdmOrgDlrMutationSaleSave', InputType: 'InputeExMdmOrgDlrSaleForSave', APIUrl: ORG_USC_API_URL },
  // 经销商联系人查询
  mdmOrgDlrLinkInfoQueryList: { ServiceCode: 'mdmOrgDlrLinkInfoQueryList', InputType: 'ExInputMdmOrgDlrLinkInfo', APIUrl: ORG_USC_API_URL },
  // 经销商联系人保存
  mdmOrgDlrLinkInfoMutationSaveById: { ServiceCode: 'mdmOrgDlrLinkInfoMutationSaveById', InputType: '[InputMdmOrgDlrLinkInfo]', APIUrl: ORG_USC_API_URL },
  // 经销商财务扩展信息查询
  mdmOrgDlrQueryFinanceList: { ServiceCode: 'mdmOrgDlrQueryFinanceList', InputType: 'InputExMdmOrgDlrFinance', APIUrl: ORG_USC_API_URL },
  // 经销商财务扩展信息保存
  mdmOrgDlrMutationFinanceSave: { ServiceCode: 'mdmOrgDlrMutationFinanceSave', InputType: 'InputExMdmOrgDlrFinanceForSave', APIUrl: ORG_USC_API_URL },

  // 经销商通用部门管理
  mdmOrgDeptQueryFindAll: { ServiceCode: 'mdmOrgDeptQueryFindAll', InputType: 'InputMdmOrgDept', APIUrl: ORG_USC_API_URL },
  mdmOrgDeptMutationSaveById: { ServiceCode: 'mdmOrgDeptMutationSaveById', InputType: 'InputMdmOrgDept', APIUrl: ORG_USC_API_URL },

  // +++++++++++++++++++++++ 订单开票查询
  orderInvoice: { ServiceCode: 'orderInvoice', InputType: 'InputMdmOrgBigArea', APIUrl: '/ve/busicen/prc/basedata/carbrand/orderInvoice' },
  detailsquery: { ServiceCode: 'detailsquery', InputType: 'InputMdmOrgBigArea', APIUrl: '/ve/busicen/prc/basedata/carbrand/detailsquery' },
  detailsquery1: { ServiceCode: 'detailsquery1', InputType: 'InputMdmOrgBigArea', APIUrl: '/ve/busicen/prc/basedata/carbrand/detailsquery1' },
  // 品牌查询
  mdmCarBrandQueryByPage: { ServiceCode: 'mdmCarBrandQueryByPage', InputType: 'InputMdmCarBrand', APIUrl: '/ly/busicen/prc/basedata/carbrand/mdmcarbrandfindbypage1111111111' },
  // 品牌保存
  mdmCarBrandMutationSave: { ServiceCode: 'mdmCarBrandMutationSave', InputType: 'InputMdmCarBrand', APIUrl: '/ly/busicen/prc/basedata/carbrand/carbrandsave' },
  // 用户品牌查询
  mdmOrgEmployeeBrQueryFindAll: { ServiceCode: 'mdmOrgEmployeeBrQueryFindAll', InputType: 'InputExMdmOrgEmployeeBr', APIUrl: '/ly/busicen/usc/org/employeebr/mdmOrgEmployeeBrQueryFindAll' },
  // 销售品牌查询
  mdmOrgBrandRQueryFindAll: { ServiceCode: 'mdmOrgBrandRQueryFindAll', InputType: 'InputMdmOrgBrandRInfo', APIUrl: ORG_USC_API_URL },

  // 区县保存
  mdmOrgCommutiySave: { ServiceCode: 'mdmOrgCommunityMutationSave', InputType: 'InputMdmOrgCommunity', APIUrl: '/ly/busicen/usc/org/mdmorgcommunity/mdmorgcommunitysave' },
  // 区县查询
  mdmOrgCommunityQueryFindAll: { ServiceCode: 'mdmOrgCommunityQueryFindAll', InputType: 'InputMdmOrgCommunityExt', APIUrl: '/ly/busicen/usc/org/mdmorgcommunity/mdmorgcommunityqueryfindall' },
  mdmOrgZoneQueryFindAll: { ServiceCode: 'mdmOrgZoneQueryFindAll', InputType: 'InputMdmOrgZone', APIUrl: ORG_USC_API_URL },
  // 区域经销商信息保存
  mdmOrgAreaDlrMutationSave: { ServiceCode: 'mdmOrgAreaDlrMutationSave', InputType: 'ExInputMdmOrgRelationReal', APIUrl: ORG_USC_API_URL },
  // 区域经销商信息查询
  mdmOrgAreaDlrQueryByPage: { ServiceCode: 'mdmOrgAreaDlrQueryByPage', InputType: 'InputMdmOrgRelationReal', APIUrl: ORG_USC_API_URL },
  // 全局角色保存
  sysRoleMutationGlobalSave: { ServiceCode: 'sysRoleMutationGlobalSave', InputType: 'ExInputSysRole', APIUrl: '/ly/busicen/eap/org/sysrole/sysRoleMutationGlobalSave' },
  sysRoleQueryGloableByPage: { ServiceCode: 'sysRoleQueryGloableByPage', InputType: 'ExInputSysRole', APIUrl: '/ly/busicen/eap/org/sysrole/sysRoleQueryGloableByPage' },
  getUserLoginInfo: { ServiceCode: 'getUserLoginInfo', InputType: '', APIUrl: '/ly/busicen/usc/org/mdmorgdept/getUserLoginInfo' },

  // 省份保存
  mdmOrgProvinceMutationSave: { ServiceCode: 'mdmOrgProvinceMutationSave', InputType: 'InputMdmOrgProvince', APIUrl: '/ly/busicen/usc/org/mdmOrgProvince/mdmOrgProvinceSave' },
  // 省份查询
  mdmOrgProvinceQueryFindAll: { ServiceCode: 'mdmOrgProvinceQueryFindAll', InputType: 'InputMdmOrgProvince', APIUrl: '/ly/busicen/usc/org/mdmOrgProvince/mdmOrgProvinceQueryFindAll' },
  // 省份 弹窗
  mdmOrgdlrAreaProvinceQueryByPage: { ServiceCode: 'mdmOrgdlrAreaProvinceQueryByPage', InputType: '', APIUrl: ORG_USC_API_URL },
  // 通知场景保存
  mdsSysSceneSettingMutationSaveById: { ServiceCode: 'mdsSysSceneSettingMutationSaveById', InputType: 'InputMdsSysSceneSetting', APIUrl: '/ly/busicen/prc/basedata/mdssysscenesetting/mdsSysSceneSettingMutationSaveById' },
  // 通知场景查询
  mdsSysSceneSettingQueryByPage: { ServiceCode: 'mdsSysSceneSettingQueryByPage', InputType: 'InputMdsSysSceneSetting', APIUrl: '/ly/busicen/prc/basedata/mdssysscenesetting/mdsSysSceneSettingQueryByPage' },
  // 通知场景对象保存
  mdsSysSceneSettingDMutationSave: { ServiceCode: 'mdsSysSceneSettingDMutationSave', InputType: 'InputMdsSysSceneSettingD', APIUrl: '/ly/busicen/prc/basedata/mdssysscenesettingd/mdsSysSceneSettingDMutationSave' },
  // 通知场景对象查询
  mdsSysSceneSettingDQueryByPage: { ServiceCode: 'mdsSysSceneSettingDQueryByPage', InputType: 'InputMdsSysSceneSettingDInfo', APIUrl: '/ly/busicen/prc/basedata/mdssysscenesettingd/mdsSysSceneSettingDQueryByPage' },
  // 通知模板保存
  mdsSysMsgModuleMutationSave: { ServiceCode: 'mdsSysMsgModuleMutationSave', InputType: 'InputMdsSysMsgModule', APIUrl: '/ly/busicen/prc/basedata/mdssysmsgmodule/mdsSysMsgModuleMutationSave' },
  // 通知模板查询
  mdsSysMsgModuleQueryByPage: { ServiceCode: 'mdsSysMsgModuleQueryByPage', InputType: 'InputMdsSysMsgModuleInfo', APIUrl: '/ly/busicen/prc/basedata/mdssysmsgmodule/mdsSysMsgModuleQueryByPage' },

  // 系统岗位保存
  mdsSysPositionMutationSave: { ServiceCode: 'mdsSysPositionMutationSave', InputType: 'InputExMdsSysPosition', APIUrl: '/ly/busicen/usc/org/mdssysposition/mdsSysPositionMutationSave' },
  // 系统岗位查询
  mdsSysPositionQueryFindAll: { ServiceCode: 'mdsSysPositionQueryFindAll', InputType: 'InputMdsSysPosition', APIUrl: '/ly/busicen/usc/org/mdssysposition/mdsSysPositionQueryFindAll' },
  // 系统岗位对应业务岗位查询
  mdsSysPositionDetailQueryFindAll: { ServiceCode: 'mdsSysPositionDetailQueryFindAll', InputType: 'InputMdsSysPositionEx', APIUrl: '/ly/busicen/usc/org/mdssysposition/mdsSysPositionDetailQueryFindAll' },
  // 业务岗位保存
  mdmOrgStationSave: { ServiceCode: 'mdmOrgStationSave', InputType: '', APIUrl: ORG_USC_API_URL },
  // 业务岗位查询
  mdmOrgStationQuery: { ServiceCode: 'mdmOrgStationQuery', InputType: '', APIUrl: ORG_USC_API_URL },

  // 代办事项查询
  mdsSysRemindDBizQueryFindAll: { ServiceCode: 'mdsSysRemindDBizQueryFindAll', InputType: 'InputMdsSysRemindDQueryFindAll', APIUrl: ORG_PRC_API_URL },
  // 代办事项保存
  mdmSysRemindMMutaionSave: { ServiceCode: 'mdmSysRemindMMutaionSave', InputType: 'InputMdmSysRemindMMutaionSaveMap', InputType1: '[InputMdmSysRemindMMutaionSaveListMap]', APIUrl: ORG_PRC_API_URL },
  // 用户代办事项查看
  mdsSysRemindFindUserByMap: { ServiceCode: 'mdsSysRemindFindUserByMap', InputType: 'InputMdsSysRemindDQueryFindAll', APIUrl: ORG_PRC_API_URL },

  // 用户角色查询
  employeeRoleQueryByPage: { ServiceCode: 'employeeRoleQueryByPage', InputType: '', APIUrl: ORG_USC_API_URL },
  // 用户经销商保存
  mdmUserDlrMutationSaveById: { ServiceCode: 'mdmUserDlrMutationSaveById', InputType: 'InputMdmUserDlr', APIUrl: ORG_USC_API_URL },
  // 用户经销商查询
  mdmEmployeeDlrQueryByPage: { ServiceCode: 'mdmEmployeeDlrQueryByPage', InputType: 'InputMdmUserDlr', APIUrl: ORG_USC_API_URL },
  // 用户区域保存
  userAreaMutation: { ServiceCode: 'userAreaMutation', InputType: 'UserAreaMutation', APIUrl: ORG_USC_API_URL },
  // 用户区域查询
  userAreaQueryByPage: { ServiceCode: 'userAreaQueryByPage', InputType: 'UserAreaQuery', APIUrl: ORG_USC_API_URL },
  // 用户权限保存
  sysUserPrivMutationSave: { ServiceCode: 'sysUserPrivMutationSave', InputType: 'InputSysUserPriv', APIUrl: '/ly/busicen/eap/org/sysuserpriv/userprivsave' },
  // 用户权限查询
  sysUserPrivQueryByPage: { ServiceCode: 'sysUserPrivQueryByPage', InputType: 'ExInputSysUserPriv', APIUrl: '/ly/busicen/eap/org/sysuserpriv/getuserprivlist' },

  // 员工保存
  mdmOrgEmployeeMutationSaveById: { ServiceCode: 'mdmOrgEmployeeMutationSaveById', InputType: 'InputExMdmOrgEmployee', APIUrl: '/ly/busicen/usc/org/employee/mdmOrgEmployeeSave' },
  // 员工查询（又换成这个11.19）
  mdmOrgEmployeeQueryFindAll: { ServiceCode: 'mdmOrgEmployeeQueryFindAll', InputType: 'InputExMdmOrgEmployee', APIUrl: '/ly/busicen/usc/org/employee/mdmOrgEmployeeQueryFindAll' },
  // 员工查询 新
  mdsSysPositionQueryEmpList: { ServiceCode: 'mdsSysPositionQueryEmpList', InputType: 'InputSysPosEmp', APIUrl: ORG_USC_API_URL },
  // 员工查询 新
  mdsSysPositionQueryInCarEmpList: { ServiceCode: 'mdsSysPositionQueryInCarEmpList', InputType: 'InputSysPosEmp', APIUrl: ORG_USC_API_URL },
  // 值列表保存
  mdsLookupValueMutationSave: { ServiceCode: 'mdsLookupValueMutationSave', InputType: 'InputMdsLookupValue', APIUrl: '/ly/busicen/prc/basedata/lookuptype/mdslookupvaluesave' },
  // 值列表查询
  mdsLookupValueQueryByPage: { ServiceCode: 'mdsLookupValueQueryByPage', InputType: 'InputMdsLookupValue', APIUrl: '/ly/busicen/prc/basedata/lookuptype/mdslookupvaluefindbypage' },
  // 值列表类型保存
  mdsLookupTypeSave: { ServiceCode: 'mdsLookupTypeSave', InputType: 'InputMdsLookupType', APIUrl: '/ly/busicen/prc/basedata/lookupvalue/mdslookuptypesave' },
  // 值列表类型查询
  mdsLookupTypeQueryByPage: { ServiceCode: 'mdsLookupTypeQueryByPage', InputType: 'InputMdsLookupType', APIUrl: '/ly/busicen/prc/basedata/lookupvalue/mdslookuptypefindbypage' },

  // 组织查询
  mdmOrgRelationRealQueryByPage: { ServiceCode: 'mdmOrgRelationRealQueryByPage', InputType: 'InputMdmOrgRelationReal', APIUrl: '/ly/busicen/usc/org/relationReal/mdmOrgRelationRealQueryByPage' },
  // 组织节点关系查询
  mdmOrgNodeRelQueryFindAll: { ServiceCode: 'mdmOrgNodeRelQueryFindAll', InputType: 'InputExMdmOrgNodeRel', APIUrl: '/ly/busicen/usc/org/noderel/mdmOrgNodeRelQueryFindAll' },
  // 组织角色查询
  sysRoleQueryCommonByPage: { ServiceCode: 'sysRoleQueryCommonByPage', InputType: 'ExInputSysRole', APIUrl: '/ly/busicen/eap/org/sysrole/getSysRoleQueryList' },
  // 组织角色删除
  sysRoleMutationCommonDel: { ServiceCode: 'sysRoleMutationCommonDel', InputType: 'ExInputSysRole', APIUrl: '/ly/busicen/eap/org/sysrole/sysRoleDel' },
  // 组织角色保存
  sysRoleMutationCommonSave: { ServiceCode: 'sysRoleMutationCommonSave', InputType: 'ExInputSysRole', APIUrl: '/ly/busicen/eap/org/sysrole/sysRoleMutationCommonSave' },

  // 日志报表-导航方案日志查询
  SysNavigationLogQueryFindAll: { ServiceCode: 'SysNavigationLogQueryFindAll', InputType: 'InputSysNavigationLogExt', APIUrl: '/ly/busicen/eap/org/sysnavigationlog/logInvokingQueryFindAll' },
  // 日志报表-功能访问日志查询
  logRunQueryFindAll: { ServiceCode: 'logRunQueryFindAll', InputType: 'InputLogRunExt', APIUrl: '/ly/busicen/eap/org/logrun/logRunQueryFindAll' },
  // 日志报表-服务调用明细查询
  logInvokingQueryFindAll: { ServiceCode: 'logInvokingQueryFindAll', InputType: 'InputLogInvokingExt', APIUrl: '/ly/busicen/eap/org/loginvoke/logInvokingQueryFindAll' },

  // 集团组织架构查询
  mdmOrgInfoQueryGroupMenueByPage: { ServiceCode: 'mdmOrgInfoQueryGroupMenueByPage', InputType: 'ExInputMdmOrgInfo', APIUrl: ORG_USC_API_URL },

  // 菜单树查询
  menuQueryByPage: { ServiceCode: 'sysMenuQueryByPage', InputType: 'InputSysMenu', APIUrl: '/ly/busicen/eap/org/sysmenu/sysMenuQueryByPage' },
  sysMenuQueryByPage: { ServiceCode: 'sysMenuQueryByPage', InputType: 'InputSysMenu', APIUrl: '/ly/busicen/eap/org/sysmenu/sysMenuQueryByPage' },
  // 菜单角色查询
  sysMenuRoleQueryByPage: { ServiceCode: 'sysMenuRoleQueryByPage', InputType: 'ExInputSysRolePriv', APIUrl: '/ly/busicen/eap/org/sysrolepriv/getSysMenuRoleQueryList' },

  // 角色保存
  sysRoleCommonMutationSave: { ServiceCode: 'sysRoleCommonMutationSave', InputType: 'ExInputSysRole', APIUrl: ORG_EAP_API_URL },
  // 角色删除
  sysRoleCommonMutationDel: { ServiceCode: 'sysRoleCommonMutationDel', InputType: 'InputFactoryInfo', APIUrl: ORG_EAP_API_URL },
  // 业务岗位查询
  mdmOrgStationQueryFindAll: { ServiceCode: 'mdmOrgStationQueryFindAll', InputType: 'InputMdmOrgStation', APIUrl: '/ly/busicen/usc/org/mdmorgstation/mdmOrgStationQueryFindAll' },
  // 业务岗位保存
  mdmOrgStationMutationSaveById: { ServiceCode: 'mdmOrgStationMutationSaveById', InputType: 'InputMdmOrgStation', APIUrl: '/ly/busicen/usc/org/mdmorgstation/mdmOrgStationMutationSaveById' },

  // 接口小工具
  mdmIfcPullMutationSave: { ServiceCode: 'mdmIfcPullMutationSave', InputType: 'InputmdmIfcPullExt', APIUrl: ORG_PRC_API_URL },
  // 导出权限查询
  exportAuthQuryFindAll: { ServiceCode: 'exportAuthQuryFindAll', InputType: 'InputExportAuth', APIUrl: '/ly/busicen/eap/org/exportauth/getExptAuthList' },
  // 导出权限保存
  exportAuthMutationSave: { ServiceCode: 'exportAuthMutationSave', InputType: '[InputExportAuth]', APIUrl: '/ly/busicen/eap/org/exportauth/saveExptAuth' },

  // ==========================页面可配置 start==================================
  // 可配置化页面查询
  proConfigPageviewQueryByPage: { ServiceCode: 'proConfigPageviewQueryByPage', InputType: 'InputProConfigPageview', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面保存
  proConfigPageviewMutationSave: { ServiceCode: 'proConfigPageviewMutationSave', InputType: 'InputProConfigPageview', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应组件查询
  proConfigComponentQueryByPage: { ServiceCode: 'proConfigComponentQueryByPage', InputType: 'InputProConfigComponentExt', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应组件保存
  proConfigComponentMutationSave: { ServiceCode: 'proConfigComponentMutationSave', InputType: 'InputProConfigComponentSaveExt', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应网格列查询
  proConfigColumnQueryByPage: { ServiceCode: 'proConfigColumnQueryByPage', InputType: 'InputProConfigColumnExt', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应网格列保存
  proConfigColumnMutationSave: { ServiceCode: 'proConfigColumnMutationSave', InputType: 'InputProConfigColumnSaveExt', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应按钮查询
  proConfigButtonQueryByPage: { ServiceCode: 'proConfigButtonQueryByPage', InputType: 'InputProConfigButtonExt', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应网格列保存
  proConfigButtonMutationSave: { ServiceCode: 'proConfigButtonMutationSave', InputType: 'InputProConfigButtonSaveExt', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面对应组件删除
  proConfigComponentMutationDelete: { ServiceCode: 'proConfigComponentMutationDelete', InputType: 'InputProConfigComponent', APIUrl: ORG_PRC_API_URL },
  // 可配置化页面多语言信息查询
  proConfigLangQueryByPage: { ServiceCode: 'proConfigLangQueryByPage', InputType: 'InputProConfigLang', APIUrl: ORG_PRC_API_URL },
  // 可配置信息查询
  proConfigInfoQueryByPage: { ServiceCode: 'proConfigInfoQueryByPage', InputType: 'InputProConfigInfo', APIUrl: ORG_PRC_API_URL },
  proConfigInfoAllMutationSave: { ServiceCode: 'proConfigInfoAllMutationSave', InputType: 'InputProConfigInfoExt', APIUrl: ORG_PRC_API_URL },
  // 可配置拖动网格列保存
  proConfigInfoMutationSave: { ServiceCode: 'proConfigInfoMutationSave', InputType: '[InputProConfigColumn]', APIUrl: ORG_PRC_API_URL },
  // 可配置组件类型查询
  proComponentTypeQueryByPage: { ServiceCode: 'proComponentTypeQueryByPage', InputType: 'InputProComponentType', APIUrl: ORG_PRC_API_URL },
  // 可配置组件类型保存
  proComponentTypeMutationSave: { ServiceCode: 'proComponentTypeMutationSave', InputType: 'InputProComponentType', APIUrl: ORG_PRC_API_URL },
  // 可配置页面密码二次验证
  proConfigDesktopMutationVerification: { ServiceCode: 'proConfigDesktopMutationVerification', InputType: 'InputProConfigDesktop', APIUrl: ORG_PRC_API_URL },
  orgconfigurablePageTableManagement: { ServiceCode: 'orgconfigurablePageTableManagement', InputType: 'InputQueryCustList', APIUrl: ORG_USC_API_URL },

  // 配置化页面与MP页面关系信息保存
  proConfigPageviewMpPageRelSave: { ServiceCode: 'proConfigPageviewMpPageRelSave', InputType: 'InputProConfigPageviewMpPageRel', APIUrl: ORG_PRC_API_URL },
  // 配置化页面与MP页面关系信息查询
  proConfigPageviewMpPageRelQueryByPage: { ServiceCode: 'proConfigPageviewMpPageRelQueryByPage', InputType: 'InputProConfigMpPageRelInfo', APIUrl: ORG_PRC_API_URL },
  // 配置化按钮权限关系信息保存
  proConfigButtonRoleAuthMutationSave: { ServiceCode: 'proConfigButtonRoleAuthMutationSave', InputType: '[InputProConfigButtonAuthSaveExt]', APIUrl: ORG_PRC_API_URL },
  // 查询配置化按钮权限关系信息
  proConfigButtonRoleAuthQueryByPage: { ServiceCode: 'proConfigButtonRoleAuthQueryByPage', InputType: 'InputProConfigButtonAuth', APIUrl: ORG_PRC_API_URL },
  // ==========================页面可配置 end==================================

  // 配置化用户快捷菜单查詢
  proConfigUserShortcutMenuQueryByPage: { ServiceCode: 'proConfigUserShortcutMenuQueryByPage', InputType: 'InputProConfigUserShortcutMenu', APIUrl: ORG_PRC_API_URL },
  // 配置化用户快捷菜单新增
  proConfigUserShortcutMenuMutationSave: { ServiceCode: 'proConfigUserShortcutMenuMutationSave', InputType: 'InputProConfigUserShortcutMenu', APIUrl: ORG_PRC_API_URL },
  // 配置化用户快捷菜单删除
  proConfigUserShortcutMenuMutationDelete: { ServiceCode: 'proConfigUserShortcutMenuMutationDelete', InputType: 'InputProConfigUserShortcutMenu', APIUrl: ORG_PRC_API_URL },
  // 系统配置信息查询新增
  proConfigDesktopMutationSave: { ServiceCode: 'proConfigDesktopMutationSave', InputType: 'InputProConfigDesktop', APIUrl: ORG_PRC_API_URL },
  // 系统配置信息查询
  proConfigDesktopQueryByPage: { ServiceCode: 'proConfigDesktopQueryByPage', InputType: 'InputProConfigDesktop', APIUrl: '/ve/busicen/prc/basedata/carbrand/proConfigDesktopQueryByPage' }

}

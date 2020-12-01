/**
 * 供应商信息管理模拟数据
 * liuzf
 */
import Mock from 'mockjs'
import { orgApis } from '../../src/api/apiList/org'
const cH = '/'

// 供应商信息查询
const mdmOrgInfoQuerySupplierByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgInfoQuerySupplierByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 10,
      pages: 1,
      records: 3,
      rows: [{
        orgName: '海南家美贸易有限公司', //	厂商名称
        orgCode: 'YP005', //	厂商编码
        orgId: 'YP26482049', //	厂商ID
        roleName: '李三', //	管理员角色
        userName: 'YP005', //	管理员账号
        password: '123', //	管理员密码
        roleId: '1', //	角色ID
        isEnable: '0', //	状态
        column1: '很不错', //	备注
        orgNameTwo: '海南家美贸易有限公司' // 供应商全称
      },
      {
        orgName: '海南家美贸易有限公司', //	厂商名称
        orgCode: 'YP005', //	厂商编码
        orgId: 'YP26482049', //	厂商ID
        roleName: '李三', //	管理员角色
        userName: 'YP005', //	管理员账号
        password: '123', //	管理员密码
        roleId: '1', //	角色ID
        isEnable: '0', //	状态
        column1: '很不错', //	备注
        orgNameTwo: '海南家美贸易有限公司' // 供应商全称
      },
      {
        orgName: '海南家美贸易有限公司', //	厂商名称
        orgCode: 'YP005', //	厂商编码
        orgId: 'YP26482049', //	厂商ID
        roleName: '李三', //	管理员角色
        userName: 'YP005', //	管理员账号
        password: '123', //	管理员密码
        roleId: '1', //	角色ID
        isEnable: '0', //	状态
        column1: '很不错', //	备注
        orgNameTwo: '海南家美贸易有限公司' // 供应商全称
      },
      {
        orgName: '海南家美贸易有限公司', //	厂商名称
        orgCode: 'YP005', //	厂商编码
        orgId: 'YP26482049', //	厂商ID
        roleName: '李三', //	管理员角色
        userName: 'YP005', //	管理员账号
        password: '123', //	管理员密码
        roleId: '1', //	角色ID
        isEnable: '0', //	状态
        column1: '很不错', //	备注
        orgNameTwo: '海南家美贸易有限公司' // 供应商全称
      }
      ]
    }
  }
})

// 供应商信息保存
const mdmOrgInfoMutationSupplierSave = Mock.mock({
  result: '1',
  msg: '保存成功',
  data: {
    mdmOrgInfoMutationSupplierSave: {
      result: '1',
      msg: '保存成功'
    }
  }
})

export default [
  { // 供应商信息查询
    url: '/ly/mp/busicen/usc/graphql.do' + cH + 'v=mdmOrgInfoQuerySupplierByPage',
    type: 'post',
    response: config => {
      return mdmOrgInfoQuerySupplierByPage
    }
  },
  { // 供应商信息保存
    url: '/ly/mp/busicen/usc/graphql.do' + cH + 'v=mdmOrgInfoMutationSupplierSave',
    type: 'post',
    response: config => {
      return mdmOrgInfoMutationSupplierSave
    }
  }
]

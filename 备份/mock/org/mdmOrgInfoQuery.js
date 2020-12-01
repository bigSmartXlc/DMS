/**
 * 集团信息查询
 * xulfan
 */
import Mock from 'mockjs'
import { orgApis } from '../../src/api/apiList/org'
const cH = '/'

const mdmOrgInfoQueryGroupByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgInfoQueryGroupByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 10,
      pages: 1,
      records: 3,
      rows: [{
        orgId: '1',
        orgCode: '1211',
        orgName: '东风日产',
        roleCode: '1',
        userName: 'admin',
        password: '123456',
        isEnable: '1',
        updateControlId: '22caee2dacb40e7bd2601cb34893862'
      },
      {
        orgId: '1',
        orgCode: '1212',
        orgName: '东风日产',
        roleCode: '2',
        userName: 'admin',
        password: '123456',
        isEnable: '0',
        updateControlId: '22caee2daceb40e7bd2601b34893862'
      },
      {
        orgId: '1',
        orgCode: '1213',
        orgName: '东风日产',
        roleCode: '1',
        userName: 'admin',
        password: '123456',
        isEnable: '1',
        updateControlId: '22caee2dace40e7bd2601cb34893862'
      },
      {
        orgId: '1',
        orgCode: '1214',
        orgName: '东风日产',
        roleCode: '2',
        userName: 'admin',
        password: '123456',
        isEnable: '0',
        updateControlId: '22cae2daceb40e7bd2601cb34893862'
      },
      {
        orgId: '1',
        orgCode: '1215',
        orgName: '东风日产',
        roleCode: '1',
        userName: 'admin',
        password: '123456',
        isEnable: '1',
        updateControlId: '22caee2daceb40e7bd2601cb4893862'
      }
      ]
    }
  }
})

/**
 * 集团信息保存
 * xulfan
 */
const mdmOrgInfoMutationGroupSave = Mock.mock({
  result: '1',
  msg: '保存成功',
  data: {
    mdmOrgInfoMutationGroupSave: {
      result: '1',
      msg: '保存成功'
    }
  }
})

// 经销商财务扩展信息
const mdmOrgDlrFinance = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgDlrFinance: {
      result: '1',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 10,
      msg: '',
      rows: [
        {
          dlrName: '曲靖广瑞',
          dlrCode: 'NT92',
          bankName: '中国建设银行曲靖市南宁支行',
          bankUserName: '53050164613700000235',
          vatInvoiceNum: '91530302MA6K5KHD2D',
          kpmc: '曲靖广瑞汽车销售服务有限公司',
          kpAddress: '曲靖广瑞汽车销售服务有限公司',
          SAPCode: 'P22010',
          DealerCorrelation: '关联经销商',
          ANSWERCode: 'H125',
          carBrandCode: '东风日产-日产',
          area: '南区',
          bigArea: '华南一区',
          mallArea: '粤东区',
          provinceName: '广东',
          cityName: '广州',
          modifyName: '张三',
          supplierTel: '135548552',
          supplierPhone: '135548552',
          supplierEmail: 'asdsad@163com',
          supplierZipCode: '510600',
          supplierAdr: '西南区',
        },
        {
          dlrName: '曲商丘',
          dlrCode: 'NT92',
          bankName: '中国建设银行曲靖市南宁支行',
          bankUserName: '53050164613700000235',
          vatInvoiceNum: '91530302MA6K5KHD2D',
          kpmc: '曲靖广瑞汽车销售服务有限公司',
          kpAddress: '曲靖广瑞汽车销售服务有限公司',
          SAPCode: 'P07324',
          DealerCorrelation: '关联经销商',
          ANSWERCode: 'H125',
          carBrandCode: '东风日产-日产',
          area: '南区',
          bigArea: '华南一区',
          mallArea: '粤东区',
          provinceName: '广东',
          cityName: '广州',
          modifyName: '张三',
          supplierTel: '135548552',
          supplierPhone: '135548552',
          supplierEmail: 'asdsad@163com',
          supplierZipCode: '510600',
          supplierAdr: '西南区',
        }
      ]
    }
  }
})

//经销商信息管理保存
const mdmOrgDlrMutationSave = Mock.mock({
  result: '1',
  msg: '保存成功',
  data: {
    mdmOrgDlrMutationSave: {
      result: '1',
      msg: '保存成功'
    }
  }
})

//经销商销售扩展查询
const mdmOrgDlrQuerySaleList = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgDlrQuerySaleList: {
      result: '1',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 10,
      msg: '',
      'rows|6': [
        {
          carBrandCn: '东风启辰-启辰',
          dlrCode: '绥化融展绥鑫',
          dlrShortName: '黑河嘉德利',
          dlrLevel: '9',
          areaName: '东区',
          bigAreaName: '华东三区',
          smallAreaName: '鲁北区',
          provinceName: '贵州',
          cityName: '遵义',
          orgTypeName: '遵义',
          isEnableName: '启用',
          saleTel: '010-2000000',
          saleFax: '00-2000000',
          saleEmail: 'Aa@aa.com',
          sapDlrId: 'P15007',
        }
      ]
    }
  }
})

// 经销商销售扩展信息保存
const mdmOrgDlrMutationSaleSave = Mock.mock({
  result: '1',
  msg: '保存成功',
  data: {
    mdmOrgDlrMutationSaleSave: {
      result: '1',
      msg: '保存成功'
    }
  }
})

// 经销商联系人查询
const mdmOrgDlrLinkInfoQueryList = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgDlrLinkInfoQueryList: {
      result: '1',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 10,
      msg: '',
      'rows|3': [
        {
          linkManType: '销售经理',
          linkManName: '左林',
          linkManMobil: '15348659785',
          linkManPhone: '010-7000000',
          email: 'Aa@aa.com',
          zip: '4333000',
          linkManAddr: 'xxxxxx',
          fax: 'qqqqq'
        }
      ]
    }
  }
})

// 经销商联系人保存
const mdmOrgDlrLinkInfoMutationSaveById = Mock.mock({
  result: '1',
  msg: '保存成功',
  data: {
    mdmOrgDlrLinkInfoMutationSaveById: {
      result: '1',
      msg: '保存成功'
    }
  }
})

// 经销商联系人删除
const mdmOrgDlrLinkInfoMutationDelete = Mock.mock({
  result: '1',
  msg: '删除成功',
  data: {
    mdmOrgDlrLinkInfoMutationDelete: {
      result: '1',
      msg: '删除成功'
    }
  }
})

export default [
  // 集团信息查询 xulfan
  {
    url: orgApis.mdmOrgInfoQueryGroupByPage.APIUrl + cH + 'v=' + orgApis.mdmOrgInfoQueryGroupByPage.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgInfoQueryGroupByPage
    }
  },

  // 集团信息保存 xulfan
  {
    url: orgApis.mdmOrgInfoMutationGroupSave.APIUrl + cH + 'v=' + orgApis.mdmOrgInfoMutationGroupSave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgInfoMutationGroupSave
    }
  },

  // 经销商财务扩展信息
  {
    url: orgApis.mdmOrgDlrFinance.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrFinance.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrFinance
    }
  },
  // 经销商信息管理保存
  {
    url: orgApis.mdmOrgDlrMutationSave.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrMutationSave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrMutationSave
    }
  },

  //经销商销售扩展查询
  {
    url: orgApis.mdmOrgDlrQuerySaleList.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrQuerySaleList.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrQuerySaleList
    }
  },
  //经销商销售扩展信息保存
  {
    url: orgApis.mdmOrgDlrMutationSaleSave.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrMutationSaleSave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrMutationSaleSave
    }
  },
  // 经销商联系人删除
  {
    url: orgApis.mdmOrgDlrLinkInfoMutationDelete.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrLinkInfoMutationDelete.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrLinkInfoMutationDelete
    }
  },
  // 经销商联系人查询
  {
    url: orgApis.mdmOrgDlrLinkInfoQueryList.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrLinkInfoQueryList.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrLinkInfoQueryList
    }
  },
  // 经销商联系人保存
  {
    url: orgApis.mdmOrgDlrLinkInfoMutationSaveById.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrLinkInfoMutationSaveById.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrLinkInfoMutationSaveById
    }
  },
]

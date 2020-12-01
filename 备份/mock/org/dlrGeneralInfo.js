/**
 * description: 经销商通用部门查询
 * author: zhhx
 * createdDate: 2019-10-25
 * logs:
 */
import Mock from 'mockjs'
import { orgApis } from '../../src/api/apiList/org'

const cH = '/'
// 查询
const mdmOrgDeptQueryFindAll = Mock.mock({
  result: '1',
  msg: 'success',
  data: {
    mdmOrgDeptQueryFindAll: {
      result: '1',
      records: 33,
      pageindex: 1,
      pages: 3,
      msg: '查询成功',
      'rows|33': [{
        'carBrandCode': '1',
        'carBrandName': '东风日产',
        'deptName': '售后服务部',
        'deptCode': 'L00104',
        'deptId': '1',
        'isEnableCn': '是',
        'isEnable': '1'
      }]
    }
  }
})

// 保存
const mdmOrgDeptMutationSaveById = Mock.mock({
  'result': '1',
  'data': {
    'mdmOrgDeptMutationSaveById': {
      'result': '1',
      'records': 1,
      'msg': '保存成功'
    }
  }
})

// 经销商财务扩展信息查询
const mdmOrgDlrQueryFinanceList = Mock.mock({
  result: '1',
  msg: 'success',
  data: {
    mdmOrgDlrQueryFinanceList: {
      result: '1',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 10,
      msg: '查询成功',
      'rows|3': [
        {
          dlrId: '1',
          dlrShortName: '曲靖广瑞',
          dlrcode: 'NT92',
          invBank: '中国建设银行曲靖市南宁支行',
          invAccount: '53050164613700000235',
          taxNo: '91530302MA6K5KHD2D',
          invName: '曲靖广瑞汽车销售服务有限公司',
          invAddr: '贵州',
          sapDlrId: 'P22010',
          carbrandcode: '1',
          carbrandcn: '东风日产-日产',
          areaId: '1',
          areaName: '南区',
          bigAreaId: '11',
          bigAreaName: '华南一区',
          smallAreaId: '111',
          smallAreaName: '粤东区',
          provinceId: '20',
          provinceName: '广东',
          cityId: '201',
          cityName: '广州',
          financeLinkManName: '张三',
          financeLinkManPhone: '135548552',
          financeLinkManMobil: '135548552',
          financeEmail: 'asdsad@163com',
          financeZip: '510600',
          financeLinkManAddr: '西南区',
          updateControlId: '110'
        }
      ]
    }
  }
})

// 经销商财务扩展信息保存
const mdmOrgDlrMutationFinanceSave = Mock.mock({
  result: '1',
  msg: '保存成功',
  data: {
    mdmOrgDlrMutationFinanceSave: {
      result: '1',
      msg: '保存成功'
    }
  }
})

export default [
  {
    url: orgApis.mdmOrgDeptQueryFindAll.APIUrl + cH + 'v=' + orgApis.mdmOrgDeptQueryFindAll.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDeptQueryFindAll
    }
  },
  {
    url: orgApis.mdmOrgDeptMutationSaveById.APIUrl + cH + 'v=' + orgApis.mdmOrgDeptMutationSaveById.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDeptMutationSaveById
    }
  },
  // 经销商财务扩展信息查询
  {
    url: orgApis.mdmOrgDlrQueryFinanceList.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrQueryFinanceList.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrQueryFinanceList
    }
  },
  // 经销商财务扩展信息保存
  {
    url: orgApis.mdmOrgDlrMutationFinanceSave.APIUrl + cH + 'v=' + orgApis.mdmOrgDlrMutationFinanceSave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgDlrMutationFinanceSave
    }
  }
]

/**
* description: 城市查询弹窗 模拟数据
* author: zhhx
* createdDate: 2019-08-09   mdmOrgCityQueryFindAll
*/

import Mock from 'mockjs'
import { orgApis } from '../../src/api/apiList/org'

const cH = '/'
// 省份查询
const mdmOrgdlrAreaProvinceQueryByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgdlrAreaProvinceQueryByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 30,
      'rows': [
        { smallAreaId: 1,
          smallAreaName: '华东一区',
          provinceName: '上海',
          provinceId: 1
        },
        { smallAreaId: 1,
          smallAreaName: '华东一区',
          provinceName: '上海2',
          provinceId: 2
        },
        { smallAreaId: 1,
          smallAreaName: '华东一区',
          provinceName: '上海3',
          provinceId: 3
        },
        { smallAreaId: 2,
          smallAreaName: '华东二区',
          provinceName: '上海4',
          provinceId: 4
        },
        { smallAreaId: 2,
          smallAreaName: '华东二区',
          provinceName: '上海5',
          provinceId: 5
        }
        // {
        //   smallAreaName: '华东一区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [
        //     {
        //       provinceName: '上海',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false

        //     },
        //     {
        //       provinceName: '浙江',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false

        //     }
        //   ]
        // },
        // {
        //   smallAreaName: '华东二区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [
        //     {
        //       provinceName: '安徽',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     },
        //     {
        //       provinceName: '江苏',
        //       selected: false,
        //       provinceId: 2,
        //       isIndeterminate: false
        //     }
        //   ]
        // },
        // {
        //   smallAreaName: '华东三区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [
        //     {
        //       provinceName: '山东',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     }
        //   ]
        // },
        // {
        //   smallAreaName: '华南一区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [
        //     {
        //       provinceName: '福建',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     },
        //     {
        //       provinceName: '广东',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     },
        //     {
        //       provinceName: '海南',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     }
        //   ]
        // },
        // {
        //   smallAreaName: '华南二区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [

        //     {
        //       provinceName: '广东',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     }
        //   ]
        // },
        // {
        //   smallAreaName: '华南二区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [

        //     {
        //       provinceName: '广东',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     }
        //   ]
        // },
        // {
        //   smallAreaName: '华南二区',
        //   selected: false,
        //   smallAreaId: 1,
        //   isIndeterminate: false,
        //   Area: [

        //     {
        //       provinceName: '广东',
        //       selected: false,
        //       provinceId: 1,
        //       isIndeterminate: false
        //     }
        //   ]
        // }

      ]
    }
  }
})

// 省份查询
const mdmOrgProvinceQueryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgProvinceQueryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: [
        {
          provinceName: '广东省',
          provinceCode: '1',
          provinceId: '1',
          orderNo: 1
        },
        {
          provinceName: '北京市',
          provinceCode: '2',
          provinceId: '2',
          orderNo: 2
        },
        {
          provinceName: '湖南省',
          provinceCode: '3',
          provinceId: '3',
          orderNo: 3
        }
      ]
    }
  }
})

// 省份保存
const mdmOrgProvinceMutationSave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgProvinceMutationSave: {
      result: '1',
      msg: ''
    }
  }
})

// 城市查询
const mdmOrgCityQueryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgCityQueryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 30,
      'rows': [
        {
          provinceId: '1',
          cityId: '1',
          cityName: '城市1',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '1',
          cityId: '2',
          cityName: '城市2',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '2',
          cityId: '3',
          cityName: '城市3',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '003'
          }
        },
        {
          provinceId: '2',
          cityId: '4',
          cityName: '城市4',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '004'
          }
        },
        {
          provinceId: '2',
          cityId: '5',
          cityName: '城市5',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '005'
          }
        },
        {
          provinceId: '2',
          cityId: '6',
          cityName: '城市6',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '005'
          }
        },
        {
          provinceId: '3',
          cityId: '1',
          cityName: '城市1',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '3',
          cityId: '2',
          cityName: '城市2',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '4',
          cityId: '3',
          cityName: '城市3',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '003'
          }
        },
        {
          provinceId: '4',
          cityId: '4',
          cityName: '城市4',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '004'
          }
        },
        {
          provinceId: '5',
          cityId: '5',
          cityName: '城市5',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '005'
          }
        },
        {
          provinceId: '6',
          cityId: '1',
          cityName: '城市1',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '6',
          cityId: '2',
          cityName: '城市2',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '7',
          cityId: '3',
          cityName: '城市3',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '003'
          }
        },
        {
          provinceId: '7',
          cityId: '4',
          cityName: '城市4',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '004'
          }
        },
        {
          provinceId: '8',
          cityId: '5',
          cityName: '城市5',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '005'
          }
        },
        {
          provinceId: '8',
          cityId: '6',
          cityName: '城市6',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '005'
          }
        },
        {
          provinceId: '9',
          cityId: '1',
          cityName: '城市1',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '9',
          cityId: '2',
          cityName: '城市2',
          mdmOrgProvinceExt: {
            provinceName: '重庆',
            provinceCode: '001'
          }
        },
        {
          provinceId: '10',
          cityId: '3',
          cityName: '城市3',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '003'
          }
        },
        {
          provinceId: '10',
          cityId: '4',
          cityName: '城市4',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '004'
          }
        },
        {
          provinceId: '11',
          cityId: '5',
          cityName: '城市5',
          mdmOrgProvinceExt: {
            provinceName: '浙江',
            provinceCode: '005'
          }
        }

      ]
    }
  }
})

export default [
  // 省份查询 弹窗
  {
    url: orgApis.mdmOrgdlrAreaProvinceQueryByPage.APIUrl + cH + 'v=' + orgApis.mdmOrgdlrAreaProvinceQueryByPage.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgdlrAreaProvinceQueryByPage
    }
  },
  {
    url: orgApis.mdmOrgProvinceQueryFindAll.APIUrl + cH + 'v=' + orgApis.mdmOrgProvinceQueryFindAll.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgProvinceQueryFindAll
    }
  },
  {
    url: orgApis.mdmOrgProvinceMutationSave.APIUrl + cH + 'v=' + orgApis.mdmOrgProvinceMutationSave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgProvinceMutationSave
    }
  },
  // 城市查询 弹窗
  {
    url: orgApis.mdmOrgCityQueryFindAll.APIUrl + cH + 'v=' + orgApis.mdmOrgCityQueryFindAll.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgCityQueryFindAll
    }
  }
]

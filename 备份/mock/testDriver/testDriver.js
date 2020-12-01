
const mockData = {
  'testDriverRows':
  {
    id:'@id',
    oaCode: 'fjsdkf', // OA单号
    insideCarCode: 'fdasfadsf', // 内部用车单号
    'auditStatus': true,  // 审核状态
    orderTime:'@date("yyyy-MM-dd")', // 下单时间
    deliveryCenter:'4' ,// 交付中心选择序号
    deliveryCenterText:'XX中心' ,// 交付中心文本
    'plannedDistribution':'@integer(10,20)', // 计划配车数量
    actualDistribution:'@integer(12,22)', // 实际配车数量
    remark:'@sentence', // 备注
    Quantity:"@integer(8,20)",
    billCity:"5",
    'billCityText|1':['上海','武汉','北京','南京','广州','深圳'],
    certificateType:"HFkdsf930",
    clientType:"富豪",
    companyName:"联友科技",
    deliveryCity:"1",
    deliveryCityText:"武汉",
    explorationCenter:"3",
    insideCarType:'3',
    phoneNumber:"18271959655",
    registerCity:"1",
    registerCityText:"@region",
    registerProvinces:"6",
    registerProvincesText:"@area",
    socialCreditCode:"BGSABDGJ",
    vehicleConfig:"高配",
    vehiclePrice:"@integer(15,22)万",
  },
  'carTypeConfig':
  {
    id:'@id',
    carSeriesCode:'DHSNNKLL',
    carSeriesName:'东风XX',
    vehicleCode:'DHLLMMCC',
    'vehicleName|1':["俊风ER30","俊风E11K","御风S16","御风","御风EV","东风皮卡"],
    'vehicleConfigCode|1':['SMDKL','DHSN', 'BFHDJ', 'CBVN','HFGT','VBNF'],
    'vehicleConfigName|1':['哈哈','嘻嘻', '呵呵'],
  },
  'experienceCenter' : {
     id: '@id',
    'storeCode|1': ['100023', '100045', '100011', '100025', '100018', '100113'],
    'storeName|1' : ['广州总部体验中心','武汉体验中心','上海体验中心'],
    'storeTypeName|1' : ['体验中心'],
    'storeWideClassName|1': '直营店',
    'businessStatus|1' : ['营业', '未营业'],
    'businessStatusId|1':  ['1','0']
  }
}


export default [
  // 试驾车
  {
    // 试驾车订单 查询
    url: '/testDriver/order/creation\.*',
    type: 'post',
    data: {},
    response: config => {
      let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
        'rows': Array(pageSize).fill(mockData.testDriverRows)
      }
    }
  },
  {
    // 试驾车订单审核 查询
    url: '/testDriver/order/approval',
    type: 'post',
    data: {},
    response: config => {
      let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
        'rows': Array(pageSize).fill(mockData.testDriverRows)
      }
    }
  },

  {
    // 试驾车订单保存
    url: '/ve/testdriver/order/edit',
    type: 'post',
    data: {},
    response: config => {
      // let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
      }
    }
  },
  {
    // 试驾车订单新增
    url: '/ve/testdriver/order/add',
    type: 'post',
    data: {},
    response: config => {
      // let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
      }
    }
  },
  {
    // 车型配置
    url: '/ve/config/cartype',
    type: 'post',
    data: {},
    response: config => {
      let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
        'rows': Array(pageSize).fill(mockData.carTypeConfig)
      }
    }
  },
  {
    // 体验中心
    url: '/ve/select/experiencecenter',
    type: 'post',
    data: {},
    response: config => {
      let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
        'rows': Array(pageSize).fill(mockData.experienceCenter)
      }
    }
  },
  {
    url: '/org/city/list',
    type: 'post',
    response: config => {
      let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
        pageindex: 1,
        pagesize: 1000,
        pages: 1,
        records: 3,
        'rows': [
          {
          provinceName: '广东',
          provinceId: '1',
          cityName: '花都',
          cityId: '1',
          cityCode: '1',
          status: '1',
          statusName: '是',
          orderNo: '1',
          isEnable: '1'
        },
          {
            provinceName: '华南',
            provinceId: '2',
            cityName: '粤东',
            cityId: '2',
            cityCode: '1',
            status: '0',
            statusName: '否',
            orderNo: '1',
            isEnable: '1'
          },
          {
            provinceName: '华南',
            provinceId: '2',
            cityName: '琼粤',
            cityId: '3',
            cityCode: '1',
            status: '1',
            statusName: '是',
            orderNo: '1',
            isEnable: '1'
          },
          {
            provinceName: '华东',
            provinceId: '1',
            cityName: '浙北',
            cityId: '4',
            cityCode: '1',
            status: '1',
            statusName: '是',
            orderNo: '1',
            isEnable: '1'
          },
          {
            provinceName: '西北',
            provinceId: '3',
            cityName: '新疆',
            cityId: '5',
            cityCode: '1',
            status: '1',
            statusName: '是',
            orderNo: '1',
            isEnable: '1'
          },
          {
            provinceName: '华南',
            provinceId: '2',
            cityName: '广州',
            cityId: '6',
            cityCode: '1',
            status: '1',
            statusName: '是',
            orderNo: '1',
            isEnable: '1'
          },
          {
            provinceName: '西北',
            provinceId: '3',
            cityName: '甘肃',
            cityId: '7',
            cityCode: '1',
            status: '1',
            statusName: '是',
            orderNo: '1',
            isEnable: '1'
          },
          {
            provinceName: '西南',
            provinceId: '4',
            cityName: '云南',
            cityId: '8',
            cityCode: '1',
            status: '1',
            statusName: '是',
            orderNo: '1',
            isEnable: '1'
          }
        ]
      }
    }
  },
]

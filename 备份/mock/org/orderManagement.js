/**
 * description: 订单管理数据Mock
 * author: liguanyu
 * createdDate: 2020-11-13
 */
import Mock from 'mockjs'
// import config from '../../src/utils/config'
// import { orgApis } from '../../src/api/apiList/org'

// const cH = '/'

// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
var Random = Mock.Random;


var natural1 = Random.natural();

var para1 = Random.paragraph();

var word1 = Random.word();

var cname = Random.cname()



// const test = Mock.mock({
//   'name1|1-3': obj,
//   'name2|2': obj,


// })


export default [{
    url: '/ve/config/cartype',
    type: 'post',
    data: {},
    response: config => {
      let {
        pageSize
      } = config.body
      return {
        'result': '1',
        'msg': 'Success',
        'rows': Array(pageSize).fill({
          id: '@id',
          carSeriesCode: 'DHSNNKLL',
          carSeriesName: '东风XX',
          vehicleCode: 'DHLLMMCC',
          'vehicleName|1': ["俊风ER30", "俊风E11K", "御风S16", "御风", "御风EV", "东风皮卡"],
          'vehicleConfigCode|1': ['SMDKL', 'DHSN', 'BFHDJ', 'CBVN', 'HFGT', 'VBNF'],
          'vehicleConfigName|1': ['哈哈', '嘻嘻', '呵呵'],
        })
      }
    }
  },
  {
    url: '/cartype',
    type: 'post',
    response: config => {
      return {
        result: '1',
        msg: 'success',
        rows: [{
            carSeriesCode: 'B2',
            carSeriesName: 'B2-2.0',
            vehicleCode: 'BASD',
            vehicleName: 'BASJD高配',
            vehicleConfigCode: 'ASKJDQ9123',
            vehicleConfigName: ''
          },
          {
            carSeriesCode: 'B2',
            carSeriesName: 'B2-2.0',
            vehicleCode: 'BASD',
            vehicleName: 'BASJD高配',
            vehicleConfigCode: 'ASKJDQ9123',
            vehicleConfigName: ''
          },
        ]
      }
    }
  },
  {
    url: '/vehicleScrapSetting',
    type: 'post',
    response: config => {
      return {
        result: '1',
        msg: 'success',
        rows: [{
          scarpType: '',
          scarpReason: '',
          carsState: '库存车'
        }, ]
      }
    }
  },
  {
    url: '/salesOfOutbound',
    type: 'post',
    response: config => {
      return {
        result: '1',
        msg: 'success',
        rows: [{
            carBrandCode: '',
            batchNumber: 'HSD10293AS',
            pdiState: '未发起新车PDI',
            pdiTime: '2020/12/12',
            estimatedTime: '2020/12/12  18：00：00'
          },
          {
            carBrandCode: '',
            batchNumber: 'HSD10293AS',
            pdiState: '未发起新车PDI',
            pdiTime: '',
            estimatedTime: ''
          },
          {
            carBrandCode: '',
            batchNumber: 'HSD10293AS',
            pdiState: '',
            pdiTime: '',
            estimatedTime: ''
          }
        ]
      }
    }
  },

  {
    url: '/getacceptanceList.do',
    type: 'post',
    response: config => {
      return {
        result: '1',
        msg: 'success',
        rows: [{
          orderLabel: 'IN14185560',
          batchNumber: '12IS',
          orderDate: '2019/12/12',
          vinCode: 'HSD10293AS',
          cars: cname,
          vehicleConfigurationCode: '90ASDNAAS',
          vehicleConfigurationName: '高配A2红色',
          carColor: '红+黑顶',
          interiorColor: '黑内+黑顶',
          batteryNumber: '9NASD',
          machineCode: '',
          qualifiedNumber: '',
        }, ]
      }
    }
  },
  {
    url: '/ly/mp/busicen/restful/getorderList.do',
    type: 'post',
    response: config => {
      return {
        result: '1',
        msg: 'success',
        rows: [{
            carBrandCode: '21ASJKD102ASKDA',
            carBrandCn: 'HF1321123KADAS',
            carBrandEn: '官网',
            orderLabel: '普通客户',
            orderStatus: '订单已支付',
            amountReceived: '137，123',
            customerName: cname,
            customerPhone: '1839292000',
            gender: '男',
          },
          {
            carBrandCode: '21ASJKD102ASKDAS',
            carBrandCn: 'HF1321123KADAS',
            carBrandEn: '官微',
            orderLabel: 'C端大客户',
            orderStatus: '订单已支付',
            amountReceived: '137，123',
            customerName: cname,
            customerPhone: '1839292002',
            gender: '男',
          },
          {
            carBrandCode: '21ASJKD102ASKDAS',
            carBrandCn: 'HF1321123KADAS',
            carBrandEn: '官网',
            orderLabel: '普通客户',
            orderStatus: '订单已支付',
            amountReceived: '137，123',
            customerName: cname,
            customerPhone: '1839292002',
            gender: '男',
          },
          {
            carBrandCode: '21ASJKD102ASKDAS',
            carBrandCn: 'HF1321123KADAS',
            carBrandEn: '官微',
            orderLabel: 'C端大客户',
            orderStatus: '订单已支付',
            amountReceived: '137，123',
            customerName: cname,
            customerPhone: '1839292002',
            gender: '男',
          },
        ]
      }
    }
  },

]

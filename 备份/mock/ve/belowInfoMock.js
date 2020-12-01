/**
 * description: 展车数据Mock
 * author: 
 * createdDate:
 */
import Mock from 'mockjs'

// 展车订单制作
const belowOrdCreateList = [
  {
    uid: '1xxxx',
    isBelowOrdStatus:'1',
    batchNum:'KAJDAD', 
    principalName:'张三', 
    principalPhone:'13342414111', 
    creator:'丁一', 
    createTime:'', 
    planSCarQuantity:'2', 
    actualSCarQuantity:'2', 
    total:'',
    remark:''
  },
  {
    uid: '2xxxx',
    isBelowOrdStatus:'0',
    batchNum:'KAJDAD', 
    principalName:'王五', 
    principalPhone:'13342414111', 
    creator:'丁一', 
    createTime:'', 
    planSCarQuantity:'2', 
    actualSCarQuantity:'2', 
    total:'',
    remark:''
  },
]
// 查询
const belowOrdCreateQueryByPage = Mock.mock({
  result: '1',
  msg: '',
    data: {
      belowOrdCreateQueryByPage: {
        result: '1',
        msg: '',
        pageindex: 1,
        pagesize: 1000,
        pages: 1,
        records: 3,
        rows: belowOrdCreateList
      }
    }
})



// 新增订单网格
const belowOrdCreateAdd = [
  {
    carTypeName:'岚图', 
    carConfigCode:'AGAS2FS', 
    carConfigName:'', 
    deliveryCity:'', 
    deliveryStore:'', 
    belowStore:'',
    quantity:''
  }
]
export default [
  // 展车订单制作查询
  {
    url: '/ve/belowInfoMock',
    type: 'post',
    response: config => {
      var returnList = belowOrdCreateList
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.batchNum !== '') {
          returnList = returnList.filter(o => o.batchNum === params.batchNum)
        }
        if (params.principalName !== '') {
          returnList = returnList.filter(o => o.principalName.indexOf(params.principalName) > -1)
        }
        if (params.principalPhone !== '') {
          returnList = returnList.filter(o => o.principalPhone === params.principalPhone)
        }
        if (params.orderTime !== '') {
            returnList = returnList.filter(o => o.orderTime === params.orderTime)
        }
        if (params.createTime !== '') {
        returnList = returnList.filter(o => o.createTime === params.createTime)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      console.info(returnList)
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': belowOrdCreateList.length,
        'rows': returnList
      }
    }
  },
  {
    url: '/ve/belowInfoMock',
    type: 'post',
    response: config => {
      return {
          'result': '1',
          'rows': belowOrdCreateList
      }
    }
  },
  {
    url: '/ve/belowInfoMock',
    type: 'post',
    response: config => {
      return {
          'result': '1',
          'rows': belowOrdCreateAdd
      }
    }
  },
  // 展车订单查询
  {
    url: '/ve/belowInfoMock',
    type: 'post',
    response: config => {
        return belowOrdCreateQueryByPage
    }
  },
  // 车型配置
  {
    url: '/ve/config/cartype',
    type: 'post',
    data: {},
    response: config => {
      let {pageSize} = config.body
      return {
        'result': '1',
        'msg': 'Success',
        'rows': Array(pageSize).fill({
          id:'@id',
          carSeriesCode:'DHSNNKLL',
          carSeriesName:'东风XX',
          carTypeCode:'DHLLMMCC',
          'carTypeName|1':["俊风ER30","俊风E11K","御风S16","御风","御风EV","东风皮卡"],
          'carConfigCode|1':['SMDKL','DHSN', 'BFHDJ', 'CBVN','HFGT','VBNF'],
          'carConfigName|1':['东风','启辰', '东风'],
        })
      }
    }
  },

]
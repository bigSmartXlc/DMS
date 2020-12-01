
// 城市选择下拉框
const cityList = {
  APIUrl: 'org/city/list',
  ServiceCode: 'wml'
}

// 体验中心下拉框接口
const experienceCenter = {
    APIUrl:'ve/select/experiencecenter',
    ServiceCode: 'wml'
}

// 试驾车订单制作 查询
const orderApproval = {
    APIUrl:'/testDriver/order/approval',
    ServiceCode: 'wml'
}

// 试驾车订单审核 查询
const orderCreation = {
    APIUrl:'/testDriver/order/creation',
    ServiceCode: 'wml'
}


export default {
  cityList,
  experienceCenter,
  orderApproval,
  orderCreation
}

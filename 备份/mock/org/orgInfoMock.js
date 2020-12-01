/**
 * description: 系统管理数据Mock
 * author: luojx
 * createdDate: 2019-07-23
 */
import Mock from 'mockjs'
import { orgApis } from '../../src/api/apiList/org'

const cH = '/'
// 品牌管理模拟数据
const CarBrandList = [
  {
    uid: '2xxxx',
    carBrandCode: '1',
    carBrandCn: '东方日产-日产',
    carBrandEn: 'Nissian',
    isEnable: '1',
    updateControlId: '22caee2daceb40e7bd2601cb34893862'
  },
  {
    uid: '3xxxx',
    carBrandCode: '2',
    carBrandCn: '东方日产-启辰',
    carBrandEn: 'Venucia',
    isEnable: '1',
    updateControlId: '22caee2daceb40e7bd2601cb34893861'
  },
  {
    uid: '4xxxx',
    carBrandCode: '4',
    carBrandCn: '东方日产-进口尼桑',
    carBrandEn: '进口尼桑',
    isEnable: '1',
    updateControlId: '22caee2daceb40e7bd2601cb34893863'
  },
  {
    uid: '4xcxxxx',
    carBrandCode: '5',
    carBrandCn: '东风风神',
    carBrandEn: '东风风神',
    isEnable: '1',
    updateControlId: '22caee2daceb40e7bd2601cb34333863'
  },
  {
    uid: '466cxxxx',
    carBrandCode: '6',
    carBrandCn: '东风风神1',
    carBrandEn: '东风风神2',
    isEnable: '1',
    updateControlId: '22caee2daceb40e7bd264434893863'
  },
  {
    uid: '476cxxxx',
    carBrandCode: '7',
    carBrandCn: '东风风神4',
    carBrandEn: '东风风神5',
    isEnable: '1',
    updateControlId: '22caee21qqeb40e7bd264434893863'
  },
  {
    uid: '486cxxxx',
    carBrandCode: '8',
    carBrandCn: '东风风神6',
    carBrandEn: '东风风神6',
    isEnable: '1',
    updateControlId: '72caee21qqeb40e7bd264434893863'
  },
  {
    uid: '53xxxx',
    carBrandCode: '99',
    carBrandCn: '东方日产-其它',
    carBrandEn: 'Other',
    isEnable: '0',
    updateControlId: '22caee2daceb40e7bd2601cb34893864'
  }
]
// 全局角色管理查询模拟数据
const WholeRoleList = [{ 'roleCode': 'dfpv_dlr', 'roleName': '专营店管理员', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '经销商', 'roleDesc': '专营店管理员', 'roleId': 'c49a4a7cb6ae4ed2a4914290f8e5f6c9', 'roleOrgType': '1', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVqyjl', 'roleName': '区域经理', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '乘用车主机厂', 'roleId': '6f5721e9463e493e9e12191449207bff', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVdqzj', 'roleName': '大区总监', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '乘用车主机厂', 'roleId': '365d8db05db341a5a45c5a39e3f38872', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DKHZR01', 'roleName': '大客户主任', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '大客户主任', 'roleId': 'b7f3fb027b8c4eb7a7107f44ee15622e', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVDKHQYJL01', 'roleName': '大客户区域经理', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '大客户区域经理', 'roleId': '128fd1d80e1d421cbd8ec210c116766f', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'yxzb01', 'roleName': '营销总部角色', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '经销商', 'roleDesc': '', 'roleId': '533c50da1ea04e5b9100d7e0a646fa75', 'roleOrgType': '1', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVVEHICLE', 'roleName': '车业室', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '经销商', 'roleDesc': '', 'roleId': '9e4123441e674a2f93edde2c8387a59c', 'roleOrgType': '1', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPV_cg01', 'roleName': '采购经理', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '经销商', 'roleDesc': '', 'roleId': '410a39d9322f4b769ccedda6d40e366a', 'roleOrgType': '1', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVcaigjl', 'roleName': '采购经理测试1', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '经销商', 'roleDesc': '11', 'roleId': 'e930588510cf4088bb42eabb6a58c9a5', 'roleOrgType': '1', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVXS01', 'roleName': '销售经理', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '', 'roleId': 'bda7cc184ec049b5a86a0e08965c6778', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVxsb', 'roleName': '销售部', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '乘用车主机厂', 'roleId': '6f84e9a2f63e46a5bfdf2810d6dbea33', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'r1', 'roleName': '集团总经理', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '集团', 'roleDesc': '', 'roleId': '1e57acb8d5ed4159aab6e57eecd9757a', 'roleOrgType': '2', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'JT01', 'roleName': '集团管理员', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '', 'roleId': 'a3878ed5851e4f70a5dae3bc78836686', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }, { 'roleCode': 'DFPVgjqyjl', 'roleName': '高级区域经理', 'builtInName': '否', 'enableStatus': '是', 'orgTypeName': '总部', 'roleDesc': '乘用车主机厂', 'roleId': '1d66e2c32bd546f0a6370119045e6c22', 'roleOrgType': '0', 'enabled': 1, 'builtIn': 0 }]
const WholeRoleJurisdictionList = [{ 'menuName': ' 保修鉴定单结算', 'menuId': '55c5dba6620a439b80e13c27f3da681a', 'isSelected': '0', 'parentMenuId': '1d569560071a45e89727f359cd4cf117' }, { 'menuName': 'API管理VUE', 'menuId': '1c1e7e73ecdd4599aea777d19553b93a', 'isSelected': '0', 'parentMenuId': '27212e707a284b65b1ec5925e25f1eaf' }, { 'menuName': 'DFPV专营店费用结算汇总报表', 'menuId': '792a14155a0741289d2bc262e8a9aafc', 'isSelected': '1', 'parentMenuId': '29c597e1d0d2470288304fb277d1501c' }, { 'menuName': 'Message与Offer管理', 'menuId': 'fcd85e20898e44a2a4a81ddcbbec01c0', 'isSelected': '1', 'parentMenuId': '3ddf97f26ce1477aaec9c07dd6f663e2' }, { 'menuName': 'O级订单解绑申请', 'menuId': 'b7e807a2bec54fbcb91d90ffe99409a7', 'isSelected': '1', 'parentMenuId': 'b23b47fc63ed4397863fb813154aa3e4' }, { 'menuName': 'O级订单解绑申请审核', 'menuId': 'eaf18e4e9cd74189969b044595ce9a81', 'isSelected': '1', 'parentMenuId': '4f2b010a5256411c9c6fc59ab7d82c0a' }, { 'menuName': '不保修车辆明细查询', 'menuId': '97e7871357564ddeaa50bd4a72415089', 'isSelected': '1', 'parentMenuId': 'b6df7dd85af44afea95cf6d4dc08f5c5' }, { 'menuName': '不保修车辆维护', 'menuId': '2536f69c3bcd439bbcde3a53d96224dd', 'isSelected': '1', 'parentMenuId': 'f2c472b9301d4603852e9468d78e2d2b' }, { 'menuName': '专营店流失率', 'menuId': 'f8366c2c7210429bb123bd3af788ad9f', 'isSelected': '1', 'parentMenuId': '3013d36583324040937ef32ec1ad0a8e' }, { 'menuName': '业务岗位管理', 'menuId': 'ca37b32b8a0f41898887e35ea58be5d2', 'isSelected': '1', 'parentMenuId': 'b78edeca98ea475bb9b99a9918767608' }, { 'menuName': '业务查询', 'menuId': '3013d36583324040937ef32ec1ad0a8e', 'isSelected': '1', 'parentMenuId': 'b9d8bdf06f1841a58c03efe6b2068ed3' }, { 'menuName': '业绩分类表_交车', 'menuId': '74d7b06d21d64647a33e67e72a653710', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '业绩分类表_提车', 'menuId': 'dab0b6db374e49bf8278abc6919cfee4', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '业绩看板', 'menuId': '03289eafa5014fe8a05594e824d0ae91', 'isSelected': '1', 'parentMenuId': '809208f3dd0546bb8a56b39f02f59d30' }, { 'menuName': '东风乘用车产销快报', 'menuId': 'fec72ebaaa05419e972cc3132eff8d24', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }, { 'menuName': '东风乘用车产销快报-目标设置', 'menuId': 'f50fa5f7570a4047be143b8defdbddc3', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }, { 'menuName': '丢失电话回访', 'menuId': '74ef545c7554482b942b414a22c577bf', 'isSelected': '1', 'parentMenuId': 'aebe143d8b3a4c91be84b35e3f7d2980' }, { 'menuName': '个人中心', 'menuId': '2166b8a2dc324fe1b9108f240c2976bb', 'isSelected': '1', 'parentMenuId': '7bdf12a1fea340b8b0d03b296d08b9e6' }, { 'menuName': '个人中心', 'menuId': 'c9a87c0bce624001bf4c5e34da52978a', 'isSelected': '1', 'parentMenuId': '2166b8a2dc324fe1b9108f240c2976bb' }, { 'menuName': '个人知识', 'menuId': 'c17a64e77d6b465dbb7cc55f93c8bb14', 'isSelected': '1', 'parentMenuId': '48281145840b46b6baa45ad8ce46adf2' }, { 'menuName': '个人知识发布', 'menuId': '482f0f1f6d8642878a01e09bc91ac691', 'isSelected': '1', 'parentMenuId': '48281145840b46b6baa45ad8ce46adf2' }, { 'menuName': '个人知识树', 'menuId': '432b915795264f17aada7dbafecbe0fc', 'isSelected': '1', 'parentMenuId': '2166b8a2dc324fe1b9108f240c2976bb' }, { 'menuName': '中台配置化管理工具', 'menuId': 'ea7d70c2296245b8a4689f37a71928be', 'isSelected': '1', 'parentMenuId': '12ac86e0548e4ab2b4b9bd2114d4024b' }, { 'menuName': '主动招揽汇总分析', 'menuId': '0f1012940ce64491b8ef5abce83c61b9', 'isSelected': '1', 'parentMenuId': '3013d36583324040937ef32ec1ad0a8e' }, { 'menuName': '主动联系', 'menuId': '518d628c16cb4ea39f776df8b3608a05', 'isSelected': '1', 'parentMenuId': '4a431819d029480c9627998f0afa6a66' }, { 'menuName': '主机厂仓库信息维护', 'menuId': '8a53e17ae033411f81654024c914d551', 'isSelected': '1', 'parentMenuId': '8d7f56a9bb1849d1acb2865374ac3db7' }, { 'menuName': '主机厂基础数据', 'menuId': '53346710dc3b48e8bfa7a1b47637b27b', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂库存查询', 'menuId': '114752d1ce614a5f8e5618d70fc02ba3', 'isSelected': '1', 'parentMenuId': '1f1db79506c84836a3407d03e3965e4a' }, { 'menuName': '主机厂库存管理', 'menuId': 'afb91769ad85460ebfb2bcba75c76d0c', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂报表管理', 'menuId': 'aa848175a08c4b33b79f2552212c847b', 'isSelected': '1', 'parentMenuId': '12ac86e0548e4ab2b4b9bd2114d4024b' }, { 'menuName': '主机厂报表管理', 'menuId': '1f39235bbe0e49e0931753b4ba885339', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂整车业务', 'menuId': '5d6b669e2c354a90a96e8e137eede1cd', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂财务管理', 'menuId': 'f38a7549ae88443cbc4e8df95adcba5c', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂销退审核', 'menuId': '46920b64dc7b41d7bdf4cf748593e171', 'isSelected': '1', 'parentMenuId': '971f2691b6b743c599208239be159dbe' }, { 'menuName': '二网交付占比报表', 'menuId': '4c8cfbe3d3f346fb89bf35e1dd422c73', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '二网报表', 'menuId': '9a54480c8ffe4acd8c050be8186588aa', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '交换品', 'menuId': 'bd027041bfd24d208035a75103b9816d', 'isSelected': '1', 'parentMenuId': 'b9d8bdf06f1841a58c03efe6b2068ed3' }, { 'menuName': '交换品收货确认', 'menuId': '313c123b5ca7460b903f60beda3aa4c8', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品旧件返回登记', 'menuId': '9f6fc952795841c09e679c977ff9fdab', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品旧件返回确认', 'menuId': '4965c1900249433c8c1f7e39c2af8c31', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品清单查询', 'menuId': 'a760ef26e02340fabe03734dc1dfbbb2', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品管理', 'menuId': 'fd473b0357704e0eb64bc432cf7fe314', 'isSelected': '1', 'parentMenuId': 'eae24bc88d574739a19c6a9faae958d3' }, { 'menuName': '交换品订购单明细查询', 'menuId': 'd2bdc89f64ba41a1b705170ea25f55b1', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品订购单查询', 'menuId': '9672612e0a394d9cbf9c4f28518d1ff8', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品订购单查询OEM', 'menuId': '1324ea045e6a4936985b2f75175d06a4', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品订购单查询OEM详情', 'menuId': '43447326b6d74c5cb063a5b541a346be', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品订购单登记', 'menuId': '185a37c116494359a479d204ca47e94b', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品订购审核', 'menuId': 'cbfa2f5d6d78450a80866550ac236148', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交车时间限制设置', 'menuId': '666f8df463e04e60872146ae598cb9af', 'isSelected': '1', 'parentMenuId': 'caf679cae5834036b77ee20fbe3f674e' }, { 'menuName': '交车明细表', 'menuId': '2af3f3fce31b4449aba2193e032fc883', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '交车补录信息查询', 'menuId': '635d8c99b82d4ad28dafb21d74b11bf8', 'isSelected': '1', 'parentMenuId': 'b23b47fc63ed4397863fb813154aa3e4' }, { 'menuName': '交车补录申请', 'menuId': 'b5bf7d6724484f0bbd09854dee7d755f', 'isSelected': '1', 'parentMenuId': 'b23b47fc63ed4397863fb813154aa3e4' }, { 'menuName': '交车记录跟踪', 'menuId': 'bf1c9cc14f4c4924b3ce596eb9708ce0', 'isSelected': '1', 'parentMenuId': '30a56288011349a480d0adce4701ea6b' }, { 'menuName': '产销存日报', 'menuId': 'bb487097b23847f0a86d090eab971d4d', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }, { 'menuName': '产销存日报表', 'menuId': 'fb4de429e52f4bde89afad08bb38bdf7', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }]
const WholeRoleJurisdictionList2 = [{ 'menuName': ' 保修鉴定单结算', 'menuId': '55c5dba6620a439b80e13c27f3da681a', 'isSelected': '1', 'parentMenuId': '1d569560071a45e89727f359cd4cf117' }, { 'menuName': 'API管理VUE', 'menuId': '1c1e7e73ecdd4599aea777d19553b93a', 'isSelected': '1', 'parentMenuId': '27212e707a284b65b1ec5925e25f1eaf' }, { 'menuName': 'DFPV专营店费用结算汇总报表', 'menuId': '792a14155a0741289d2bc262e8a9aafc', 'isSelected': '1', 'parentMenuId': '29c597e1d0d2470288304fb277d1501c' }, { 'menuName': 'Message与Offer管理', 'menuId': 'fcd85e20898e44a2a4a81ddcbbec01c0', 'isSelected': '1', 'parentMenuId': '3ddf97f26ce1477aaec9c07dd6f663e2' }, { 'menuName': 'O级订单解绑申请', 'menuId': 'b7e807a2bec54fbcb91d90ffe99409a7', 'isSelected': '1', 'parentMenuId': 'b23b47fc63ed4397863fb813154aa3e4' }, { 'menuName': 'O级订单解绑申请审核', 'menuId': 'eaf18e4e9cd74189969b044595ce9a81', 'isSelected': '1', 'parentMenuId': '4f2b010a5256411c9c6fc59ab7d82c0a' }, { 'menuName': '不保修车辆明细查询', 'menuId': '97e7871357564ddeaa50bd4a72415089', 'isSelected': '1', 'parentMenuId': 'b6df7dd85af44afea95cf6d4dc08f5c5' }, { 'menuName': '不保修车辆维护', 'menuId': '2536f69c3bcd439bbcde3a53d96224dd', 'isSelected': '1', 'parentMenuId': 'f2c472b9301d4603852e9468d78e2d2b' }, { 'menuName': '专营店流失率', 'menuId': 'f8366c2c7210429bb123bd3af788ad9f', 'isSelected': '1', 'parentMenuId': '3013d36583324040937ef32ec1ad0a8e' }, { 'menuName': '业务岗位管理', 'menuId': 'ca37b32b8a0f41898887e35ea58be5d2', 'isSelected': '1', 'parentMenuId': 'b78edeca98ea475bb9b99a9918767608' }, { 'menuName': '业务查询', 'menuId': '3013d36583324040937ef32ec1ad0a8e', 'isSelected': '1', 'parentMenuId': 'b9d8bdf06f1841a58c03efe6b2068ed3' }, { 'menuName': '业绩分类表_交车', 'menuId': '74d7b06d21d64647a33e67e72a653710', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '业绩分类表_提车', 'menuId': 'dab0b6db374e49bf8278abc6919cfee4', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '业绩看板', 'menuId': '03289eafa5014fe8a05594e824d0ae91', 'isSelected': '1', 'parentMenuId': '809208f3dd0546bb8a56b39f02f59d30' }, { 'menuName': '东风乘用车产销快报', 'menuId': 'fec72ebaaa05419e972cc3132eff8d24', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }, { 'menuName': '东风乘用车产销快报-目标设置', 'menuId': 'f50fa5f7570a4047be143b8defdbddc3', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }, { 'menuName': '丢失电话回访', 'menuId': '74ef545c7554482b942b414a22c577bf', 'isSelected': '1', 'parentMenuId': 'aebe143d8b3a4c91be84b35e3f7d2980' }, { 'menuName': '个人中心', 'menuId': '2166b8a2dc324fe1b9108f240c2976bb', 'isSelected': '1', 'parentMenuId': '7bdf12a1fea340b8b0d03b296d08b9e6' }, { 'menuName': '个人中心', 'menuId': 'c9a87c0bce624001bf4c5e34da52978a', 'isSelected': '1', 'parentMenuId': '2166b8a2dc324fe1b9108f240c2976bb' }, { 'menuName': '个人知识', 'menuId': 'c17a64e77d6b465dbb7cc55f93c8bb14', 'isSelected': '1', 'parentMenuId': '48281145840b46b6baa45ad8ce46adf2' }, { 'menuName': '个人知识发布', 'menuId': '482f0f1f6d8642878a01e09bc91ac691', 'isSelected': '1', 'parentMenuId': '48281145840b46b6baa45ad8ce46adf2' }, { 'menuName': '个人知识树', 'menuId': '432b915795264f17aada7dbafecbe0fc', 'isSelected': '1', 'parentMenuId': '2166b8a2dc324fe1b9108f240c2976bb' }, { 'menuName': '中台配置化管理工具', 'menuId': 'ea7d70c2296245b8a4689f37a71928be', 'isSelected': '1', 'parentMenuId': '12ac86e0548e4ab2b4b9bd2114d4024b' }, { 'menuName': '主动招揽汇总分析', 'menuId': '0f1012940ce64491b8ef5abce83c61b9', 'isSelected': '1', 'parentMenuId': '3013d36583324040937ef32ec1ad0a8e' }, { 'menuName': '主动联系', 'menuId': '518d628c16cb4ea39f776df8b3608a05', 'isSelected': '1', 'parentMenuId': '4a431819d029480c9627998f0afa6a66' }, { 'menuName': '主机厂仓库信息维护', 'menuId': '8a53e17ae033411f81654024c914d551', 'isSelected': '1', 'parentMenuId': '8d7f56a9bb1849d1acb2865374ac3db7' }, { 'menuName': '主机厂基础数据', 'menuId': '53346710dc3b48e8bfa7a1b47637b27b', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂库存查询', 'menuId': '114752d1ce614a5f8e5618d70fc02ba3', 'isSelected': '1', 'parentMenuId': '1f1db79506c84836a3407d03e3965e4a' }, { 'menuName': '主机厂库存管理', 'menuId': 'afb91769ad85460ebfb2bcba75c76d0c', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂报表管理', 'menuId': 'aa848175a08c4b33b79f2552212c847b', 'isSelected': '1', 'parentMenuId': '12ac86e0548e4ab2b4b9bd2114d4024b' }, { 'menuName': '主机厂报表管理', 'menuId': '1f39235bbe0e49e0931753b4ba885339', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂整车业务', 'menuId': '5d6b669e2c354a90a96e8e137eede1cd', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂财务管理', 'menuId': 'f38a7549ae88443cbc4e8df95adcba5c', 'isSelected': '1', 'parentMenuId': '2ef45f35af8d418d8ac316cf4ca67c8b' }, { 'menuName': '主机厂销退审核', 'menuId': '46920b64dc7b41d7bdf4cf748593e171', 'isSelected': '1', 'parentMenuId': '971f2691b6b743c599208239be159dbe' }, { 'menuName': '二网交付占比报表', 'menuId': '4c8cfbe3d3f346fb89bf35e1dd422c73', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '二网报表', 'menuId': '9a54480c8ffe4acd8c050be8186588aa', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '交换品', 'menuId': 'bd027041bfd24d208035a75103b9816d', 'isSelected': '1', 'parentMenuId': 'b9d8bdf06f1841a58c03efe6b2068ed3' }, { 'menuName': '交换品收货确认', 'menuId': '313c123b5ca7460b903f60beda3aa4c8', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品旧件返回登记', 'menuId': '9f6fc952795841c09e679c977ff9fdab', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品旧件返回确认', 'menuId': '4965c1900249433c8c1f7e39c2af8c31', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品清单查询', 'menuId': 'a760ef26e02340fabe03734dc1dfbbb2', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品管理', 'menuId': 'fd473b0357704e0eb64bc432cf7fe314', 'isSelected': '1', 'parentMenuId': 'eae24bc88d574739a19c6a9faae958d3' }, { 'menuName': '交换品订购单明细查询', 'menuId': 'd2bdc89f64ba41a1b705170ea25f55b1', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品订购单查询', 'menuId': '9672612e0a394d9cbf9c4f28518d1ff8', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品订购单查询OEM', 'menuId': '1324ea045e6a4936985b2f75175d06a4', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品订购单查询OEM详情', 'menuId': '43447326b6d74c5cb063a5b541a346be', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交换品订购单登记', 'menuId': '185a37c116494359a479d204ca47e94b', 'isSelected': '1', 'parentMenuId': 'fd473b0357704e0eb64bc432cf7fe314' }, { 'menuName': '交换品订购审核', 'menuId': 'cbfa2f5d6d78450a80866550ac236148', 'isSelected': '1', 'parentMenuId': 'bd027041bfd24d208035a75103b9816d' }, { 'menuName': '交车时间限制设置', 'menuId': '666f8df463e04e60872146ae598cb9af', 'isSelected': '1', 'parentMenuId': 'caf679cae5834036b77ee20fbe3f674e' }, { 'menuName': '交车明细表', 'menuId': '2af3f3fce31b4449aba2193e032fc883', 'isSelected': '1', 'parentMenuId': '1f39235bbe0e49e0931753b4ba885339' }, { 'menuName': '交车补录信息查询', 'menuId': '635d8c99b82d4ad28dafb21d74b11bf8', 'isSelected': '1', 'parentMenuId': 'b23b47fc63ed4397863fb813154aa3e4' }, { 'menuName': '交车补录申请', 'menuId': 'b5bf7d6724484f0bbd09854dee7d755f', 'isSelected': '1', 'parentMenuId': 'b23b47fc63ed4397863fb813154aa3e4' }, { 'menuName': '交车记录跟踪', 'menuId': 'bf1c9cc14f4c4924b3ce596eb9708ce0', 'isSelected': '1', 'parentMenuId': '30a56288011349a480d0adce4701ea6b' }, { 'menuName': '产销存日报', 'menuId': 'bb487097b23847f0a86d090eab971d4d', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }, { 'menuName': '产销存日报表', 'menuId': 'fb4de429e52f4bde89afad08bb38bdf7', 'isSelected': '1', 'parentMenuId': 'ef2d182e7c2d4e17ad8ae9fc1ff81b7a' }]
// 品牌管理查询
const mdmCarBrandQueryByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmCarBrandQueryByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: CarBrandList
    }
  }
})

// 品牌保存
const mdmCarBrandMutationSave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmCarBrandMutationSave: {
      result: '1',
      msg: ''
    }
  }
})
// 系统岗位查询数据
const SysPositionList = [{ 'positionId': '016613cac7f546beacd6f2015b2d88ba', 'positionCode': '00009', 'carBrandCode': '1', 'positionName': '项目经理', 'orgTypeName': '总部', 'orgType': '0', 'isEnable': '1', 'updateControlId': '8d4ee1af4a0246d394ba131fa5bec4fd' }, { 'positionId': '04CFE9F1A6CD41D288F08E12CC83A988', 'positionCode': 'SE-DLR-021', 'carBrandCode': '1', 'positionName': '机电技师', 'orgTypeName': '总部', 'orgType': null, 'isEnable': '1', 'updateControlId': '19A89D8DAF6E4BFEE0530100007F2ECA' }, { 'positionId': '06f524b7f4ea4c9c832d670d75010c41', 'positionCode': '000002', 'carBrandCode': '1', 'positionName': '产销运营', 'orgTypeName': '总部', 'orgType': '0', 'isEnable': '1', 'updateControlId': '5ef59ac600c44a0293bd26877e5cde85' }, { 'positionId': '07161e024c4f44ed810c9b9c0ff64b22', 'positionCode': '00008', 'carBrandCode': '1', 'positionName': '引用', 'orgTypeName': '总部', 'orgType': '0', 'isEnable': '1', 'updateControlId': 'e84e944185474faeb9ea2614ecda7123' }, { 'positionId': '072EB3B8A82E4F8F90422D1C65C3768E', 'positionCode': 'MDM_001', 'carBrandCode': '1', 'positionName': '专营店总经理', 'orgTypeName': '总部', 'orgType': null, 'isEnable': '1', 'updateControlId': 'db8d30ddd65a4b46a0dd27ae8eb87927' }, { 'positionId': '0B1F14BBED5342C0AE88A38233BB8B56', 'positionCode': 'SE0094', 'carBrandCode': '1', 'positionName': '售后服务部经理', 'orgTypeName': '经销商', 'orgType': '1', 'isEnable': '1', 'updateControlId': 'b0d6554df200477ba24babaa2e8e05a8' }, { 'positionId': '0E68328EA12B7DD5E0530100007F94BE', 'positionCode': 'SE0095', 'carBrandCode': '1', 'positionName': '招揽专员', 'orgTypeName': '经销商', 'orgType': '1', 'isEnable': '1', 'updateControlId': '68be9c8fc5344111b8b0d712d4f1cb6d' }, { 'positionId': '0ED9B0311297412CB2F3007814EF7F20', 'positionCode': 'AI0001', 'carBrandCode': '1', 'positionName': '续保跟进人员与岗位对应', 'orgTypeName': '总部', 'orgType': null, 'isEnable': '1', 'updateControlId': '19A89D8DAF8D4BFEE0530100007F2ECA' }, { 'positionId': '0b3a6c8c37334e5a956e2b1ed5c8a4aa', 'positionCode': 'S_1515GVSDBSD', 'carBrandCode': '1', 'positionName': '测试经理', 'orgTypeName': '总部', 'orgType': '0', 'isEnable': '1', 'updateControlId': '5ee2b6b199c64ec1853d057362ec316d' }, { 'positionId': '10C26A7D97944966AEBCF676C01AE9E7', 'positionCode': 'VE0111', 'carBrandCode': '1', 'positionName': '测试系统岗位', 'orgTypeName': '总部', 'orgType': null, 'isEnable': '1', 'updateControlId': '946682EAA4145506E0539EB919ACC6FA' }]
const SysPositionRightList = [{ 'stationId': '00', 'stationCode': '00', 'stationName': '经销商管理员', 'deptName': '测试1', 'isDlrStation': '1', 'isSelected': '0' }, { 'stationId': '05842d85d1db41dd93254cdaf805f0cb', 'stationCode': 'HUB031101', 'stationName': '测试员1', 'deptName': null, 'isDlrStation': '0', 'isSelected': '0' }, { 'stationId': '07beef90f9d24c9b90dfe73430086fdd', 'stationCode': 'HUB01112', 'stationName': '服务1', 'deptName': null, 'isDlrStation': '0', 'isSelected': '0' }, { 'stationId': '28bd375c15b34337b588f618f0bc087e', 'stationCode': 'DFPVtest1', 'stationName': '测试员1', 'deptName': null, 'isDlrStation': '0', 'isSelected': '0' }, { 'stationId': '2d04738e719611eaaad2005056bae67e', 'stationCode': '01', 'stationName': '总经理', 'deptName': null, 'isDlrStation': '1', 'isSelected': '0' }, { 'stationId': '2d09ebee719611eaaad2005056bae67e', 'stationCode': '02', 'stationName': '服务经理1', 'deptName': '售后服务部', 'isDlrStation': '1', 'isSelected': '0' }, { 'stationId': '2d1a08b7719611eaaad2005056bae67e', 'stationCode': '05', 'stationName': '整车销售经理', 'deptName': '整车销售部', 'isDlrStation': '1', 'isSelected': '0' }, { 'stationId': '2d34da50719611eaaad2005056bae67e', 'stationCode': '10', 'stationName': '保险专员', 'deptName': '售后服务部', 'isDlrStation': '1', 'isSelected': '0' }, { 'stationId': '2d3a5799719611eaaad2005056bae67e', 'stationCode': '11', 'stationName': '整车销售顾问', 'deptName': '整车销售部', 'isDlrStation': '1', 'isSelected': '0' }, { 'stationId': '2d44ec26719611eaaad2005056bae67e', 'stationCode': '13', 'stationName': '保修鉴定员', 'deptName': '售后服务部', 'isDlrStation': '1', 'isSelected': '0' }]
// 业务岗位模拟数据
const OrgStationList = [{ 'column1': '', 'stationCode': 'HUB031101', 'stationName': '测试员1', 'deptName': null, 'isDlrStation': '0', 'stationId': '05842d85d1db41dd93254cdaf805f0cb', 'isEnable': '1', 'column2': null, 'deptId': 'HUB0303', 'orgId': '', 'updateControlId': '1d5666a4910c4ff1b6cc84b02f72244d' }, { 'column1': '', 'stationCode': 'HUB01112', 'stationName': '服务1', 'deptName': null, 'isDlrStation': '0', 'stationId': '07beef90f9d24c9b90dfe73430086fdd', 'isEnable': '1', 'column2': null, 'deptId': 'HUB0105', 'orgId': '', 'updateControlId': 'e36185e73fbe474aa02893f7efbb4101' }, { 'column1': '经销商自建岗位', 'stationCode': 'DFPVtest1', 'stationName': '测试员1', 'deptName': null, 'isDlrStation': '0', 'stationId': '28bd375c15b34337b588f618f0bc087e', 'isEnable': '1', 'column2': null, 'deptId': 'PV0001', 'orgId': 'PV0001', 'updateControlId': 'ac3866bc9d284db08dce5db7a5b7ce74' }, { 'column1': '', 'stationCode': 'HUB01121', 'stationName': '测试11', 'deptName': null, 'isDlrStation': '0', 'stationId': '28db1dde9cea4dedaa627b18baac408b', 'isEnable': '1', 'column2': null, 'deptId': 'HUB0105', 'orgId': '', 'updateControlId': 'ee8fe47af1014372bd89bc80bcaacd9b' }, { 'column1': null, 'stationCode': 'PV0025001200200004', 'stationName': '精整返修工', 'deptName': '精整班A', 'isDlrStation': '0', 'stationId': '2b269004678a4c839a294fa9ffc679be', 'isEnable': '1', 'column2': null, 'deptId': 'cbaa575019f24a9582358f93f5d86782', 'orgId': 'cbaa575019f24a9582358f93f5d86782', 'updateControlId': '7b0f6332-c69a-11ea-a4f8-005056852546' }, { 'column1': '经销商自建岗位', 'stationCode': 'DFPV1771', 'stationName': '处长', 'deptName': '公司领导', 'isDlrStation': '0', 'stationId': '3572be5a85834a04b877c52cabaca5c5', 'isEnable': '0', 'column2': null, 'deptId': '12f02ae462ce11eaaad2005056bae67e', 'orgId': '12f02ae462ce11eaaad2005056bae67e', 'updateControlId': 'd620e5b0263f43a784e2635eb6f69ef2' }, { 'column1': '', 'stationCode': 'HUB011122', 'stationName': '测试岗位', 'deptName': null, 'isDlrStation': '0', 'stationId': '3ee89c6cd9ee45998945121d340f6426', 'isEnable': '1', 'column2': null, 'deptId': 'HUB0101', 'orgId': '', 'updateControlId': 'fb46e78e7be3405f9b241686ca70f11c' }, { 'column1': null, 'stationCode': 'PV0025001200200002', 'stationName': '精整班作业指导员', 'deptName': '精整班A', 'isDlrStation': '0', 'stationId': '40ffcf57314148a682069b8a8e01e0fb', 'isEnable': '1', 'column2': null, 'deptId': 'cbaa575019f24a9582358f93f5d86782', 'orgId': 'cbaa575019f24a9582358f93f5d86782', 'updateControlId': '7ac29ea7-c69a-11ea-a4f8-005056852546' }]
const OrgStationTreeList = [{ 'orgName': '2小部', 'orgCode': '123', 'orgBelongType': '8', 'orgTreeId': '93f567983e6d4518860e95d127f50e7e', 'linkId': '93f567983e6d4518860e95d127f50e7e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '25b1de0e13914eb98de57f7d8dbd742d', 'treeType': '0', 'orgRealId': 'b7f4942e44a686e9d86d2d90e8e8ef21', 'column1': null }, { 'orgName': '2部', 'orgCode': '1234', 'orgBelongType': '8', 'orgTreeId': '25b1de0e13914eb98de57f7d8dbd742d', 'linkId': '25b1de0e13914eb98de57f7d8dbd742d', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '12f02ae462ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': '112f62bddadd5ca63c7cf7d16521b702', 'column1': null }, { 'orgName': '3部', 'orgCode': '1233', 'orgBelongType': '8', 'orgTreeId': '673c4b89088847d491b397f79f473fc1', 'linkId': '673c4b89088847d491b397f79f473fc1', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '12f02ae462ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': '42baeb9860f81238a87e129a0b9efedd', 'column1': null }, { 'orgName': '4部', 'orgCode': '123s', 'orgBelongType': '8', 'orgTreeId': '4e7ac27ad6b94442948fd4af82eb66f4', 'linkId': '4e7ac27ad6b94442948fd4af82eb66f4', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '12f02ae462ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': '3f417fc6e65564932f6b8540fdc9af64', 'column1': null }, { 'orgName': 'IS开发管理室', 'orgCode': 'PV00020008', 'orgBelongType': '8', 'orgTreeId': '14ceb43662ce11eaaad2005056bae67e', 'linkId': '14ceb43662ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '134cb21262ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': 'e0885244621eeefa3dc740adc25f344a', 'column1': null }, { 'orgName': 'IS技术支持室', 'orgCode': 'PV00020007', 'orgBelongType': '8', 'orgTreeId': '14c79bcc62ce11eaaad2005056bae67e', 'linkId': '14c79bcc62ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '134cb21262ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': '8487ff77d89bd8cba1073e6481cfc938', 'column1': null }, { 'orgName': 'VES评价班', 'orgCode': 'PV000400030009', 'orgBelongType': '8', 'orgTreeId': '162c41be62ce11eaaad2005056bae67e', 'linkId': '162c41be62ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '14b8ed0b62ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': '446fd337781afb4463f1c741b5292237', 'column1': null }, { 'orgName': 'VES评价班', 'orgCode': 'PV000400130004', 'orgBelongType': '8', 'orgTreeId': '161d1b6162ce11eaaad2005056bae67e', 'linkId': '161d1b6162ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '14b1b6ba62ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': 'c9dded32a3ed95b4097dcca52c2c4353', 'column1': null }, { 'orgName': '东北', 'orgCode': 'DB', 'orgBelongType': '4', 'orgTreeId': 'A15625F6B6347F43E05537A3C8A81FD1', 'linkId': 'A15625F6B6347F43E05537A3C8A81FD1', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': 'HOST', 'treeType': '0', 'orgRealId': 'b24de431d534f49a0aa61947b445620d', 'column1': null }, { 'orgName': '东北大区', 'orgCode': 'PV002400020016', 'orgBelongType': '8', 'orgTreeId': '15157f2062ce11eaaad2005056bae67e', 'linkId': '15157f2062ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '1447036862ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': 'b97644fd266ef38acd4b0cace7439157', 'column1': null }, { 'orgName': '东风乘用车公司', 'orgCode': 'DFPV', 'orgBelongType': '0', 'orgTreeId': 'HOST', 'linkId': 'HOST', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '-1', 'treeType': '0', 'orgRealId': '99dda946f8d2e3ee4035ff5294612c43', 'column1': null }, { 'orgName': '事业计划室', 'orgCode': 'PV00020004', 'orgBelongType': '8', 'orgTreeId': '14dcc41562ce11eaaad2005056bae67e', 'linkId': '14dcc41562ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '134cb21262ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': 'a0abed31394cb04aecfea2a74331fe1e', 'column1': null }, { 'orgName': '云南', 'orgCode': 'YN_E1', 'orgBelongType': '5', 'orgTreeId': 'A15625F6B63E7F43E05537A3C8A81FD1', 'linkId': 'A15625F6B63E7F43E05537A3C8A81FD1', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': 'A15625F6B6367F43E05537A3C8A81FD1', 'treeType': '0', 'orgRealId': '827607d00d62b1cdd031403877a8f0c0', 'column1': null }, { 'orgName': '京津晋', 'orgCode': 'JJJ_J1', 'orgBelongType': '5', 'orgTreeId': 'A15625F6B64C7F43E05537A3C8A81FD1', 'linkId': 'A15625F6B64C7F43E05537A3C8A81FD1', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': 'A15625F6B63A7F43E05537A3C8A81FD1', 'treeType': '0', 'orgRealId': '5af20bcaf735fed1867c1142bbada5b6', 'column1': null }, { 'orgName': '人力资源部', 'orgCode': 'PV0005', 'orgBelongType': '8', 'orgTreeId': '1300b42c62ce11eaaad2005056bae67e', 'linkId': '1300b42c62ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': 'HOST', 'treeType': '0', 'orgRealId': 'be31e6fac135649da7601ca0bb8fec65', 'column1': null }, { 'orgName': '人才激励室', 'orgCode': 'PV00050005', 'orgBelongType': '8', 'orgTreeId': '13fd216862ce11eaaad2005056bae67e', 'linkId': '13fd216862ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '1300b42c62ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': '6f220a5f1b6af68e1f2080f72206dda0', 'column1': null }, { 'orgName': '党团工作室', 'orgCode': 'PV00150002', 'orgBelongType': '8', 'orgTreeId': '13d80a5762ce11eaaad2005056bae67e', 'linkId': '13d80a5762ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': '12e84af062ce11eaaad2005056bae67e', 'treeType': '0', 'orgRealId': 'f75c90271fed85228d81eb5fc0a58937', 'column1': null }, { 'orgName': '党群工作部', 'orgCode': 'PV0015', 'orgBelongType': '8', 'orgTreeId': '12e84af062ce11eaaad2005056bae67e', 'linkId': '12e84af062ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': 'HOST', 'treeType': '0', 'orgRealId': 'b91cff8f6b4914cff60ee0d7f76dbacb', 'column1': null }, { 'orgName': '公司领导', 'orgCode': 'PV0001', 'orgBelongType': '8', 'orgTreeId': '12f02ae462ce11eaaad2005056bae67e', 'linkId': '12f02ae462ce11eaaad2005056bae67e', 'groupCode': '1', 'groupId': '1', 'isEnable': '1', 'parentOrgTreeId': 'HOST', 'treeType': '0', 'orgRealId': 'dc0d2eca3df6254e435fd10b01409ab4', 'column1': null }]
// 全局角色管理 查询
const sysRoleQueryGloableByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    sysRoleQueryGloableByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: WholeRoleList
    }
  }
})
// 业务岗位 查询
const mdmOrgStationQueryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgStationQueryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: OrgStationList
    }
  }
})
// 业务岗位所属组织 查询
const mdmOrgRelationRealQueryByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgRelationRealQueryByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: OrgStationTreeList
    }
  }
})
// 业务岗位 新增编辑 保存
const mdmOrgStationMutationSaveById = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgStationMutationSaveById: {
      result: '1',
      msg: ''
    }
  }
})
// 系统管理页面左边 查询
const mdsSysPositionQueryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdsSysPositionQueryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: SysPositionList
    }
  }
})
// 系统管理页面右边 查询
const mdsSysPositionDetailQueryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdsSysPositionDetailQueryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: SysPositionRightList
    }
  }
})
// 全局角色管理查看权限
const sysRolePrivQueryByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    sysRolePrivQueryByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: WholeRoleJurisdictionList
    }
  }
})
// 全局角色管理查看权限
const exportAuthQuryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    exportAuthQuryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: WholeRoleJurisdictionList2
    }
  }
})
// 系统岗位管理保存
const mdsSysPositionMutationSave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdsSysPositionMutationSave: {
      result: '1',
      msg: ''
    }
  }
})
// 全局角色管理保存
const sysRoleMutationGlobalSave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    sysRoleMutationGlobalSave: {
      result: '1',
      msg: ''
    }
  }
})
// 全局角色管理保存
const exportAuthMutationSave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    exportAuthMutationSave: {
      result: '1',
      msg: ''
    }
  }
})
// 全局角色管理-功能权限设置 保存
const sysRolePrivMutationSave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    sysRolePrivMutationSave: {
      result: '1',
      msg: ''
    }
  }
})
// 集团组织架构查询
const mdmOrgInfoQueryGroupMenueByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgInfoQueryGroupMenueByPage: {
      result: '1',
      msg: '',
      rows: [
        {
          label: '一级 1',
          groupType: '33',
          groupCode: '123',
          groupName: '一级',
          isEnable: 1,
          children: [{
            label: '二级 1-1',
            groupType: '22',
            groupCode: '123',
            groupName: '二级 1-1',
            isEnable: 1,
            children: [{
              label: '三级 1-1-1',
              groupType: '444',
              groupCode: '123',
              groupName: '三级 1-1-1'
            }]
          }]
        }]

    }
  }
})

// 区县管理
const mdmOrgZoneQueryFindAll = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgZoneQueryFindAll: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      rows: [{
        communityId: 'V13221',
        communityName: '洱源',
        provinceId: '234',
        provinceName: '云南',
        cityId: '23422',
        cityName: '大理',
        isEnable: 1,
        updateControlId: '22caee2daceb40e7bd2601cb34893862'
      }
      ]
    }
  }
})

// 区县保存
const mdmOrgCommutiySave = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmOrgCommutiySave: {
      result: '1',
      msg: '保存成功'
    }
  }
})

// 用户经销商查询
const mdmEmployeeDlrQueryByPage = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmEmployeeDlrQueryByPage: {
      result: '1',
      msg: '',
      pageindex: 1,
      pagesize: 1000,
      pages: 1,
      records: 3,
      'rows': [
        { carBrand: '东风日产-日产', userName: '邓悄然', loginName: 'cyc-dengqr', userType: 'PV用户', department: '市场部', distributor: '上海宝钢、上海冠松、广州丰日、广州恒源' },
        { carBrand: '东风日产-启辰', userName: '张雁', loginName: 'zhangyan', userType: 'PV用户', department: '网络发展科', distributor: '上海宝钢、上海冠松、广州丰日、广州恒源' },
        { carBrand: '东风日产-启辰', userName: '代颂娥', loginName: 'daise', userType: 'PV用户', department: '经销商指导科', distributor: '上海宝钢、上海冠松、广州丰日、广州恒源' },
        { carBrand: '东风日产-日产', userName: '张茂华', loginName: 'cyc-zhangmh', userType: 'DLR用户', department: '客户支援科', distributor: '上海宝钢、上海冠松、广州丰日、广州恒源' },
        { carBrand: '东风日产-启辰', userName: '刘亚梅', loginName: 'liuyamei', userType: 'DLR用户', department: '售后服务部', distributor: '上海宝钢、上海冠松、广州丰日、广州恒源' },
        { carBrand: '东风日产-日产', userName: '易楠', loginName: 'yinan', userType: 'DLR用户', department: '售后服务部', distributor: '上海宝钢、上海冠松、广州丰日、广州恒源' }]
    }
  }
})
// 用户经销商设置-保存
const mdmUserDlrMutationSaveById = Mock.mock({
  result: '1',
  msg: '',
  data: {
    mdmUserDlrMutationSaveById: {
      result: '1',
      msg: '保存成功!'
    }
  }
})
// 详情查询
const detailsquery = [
  {
    orderCode1: 'details',
    orderCode2: 'details',
    orderCode3: 'details',
    orderCode4: 'details',
    orderCode5: 'details',
    orderCode6: 'details',
    orderCode7: 'details',
    orderCode8: 'details',
    orderCode9: 'details',
    orderCode10: 'details',
    orderCode11: 'details',
    orderCode12: 'details',
    orderCode13: 'details',
    orderCode14: 'details',
    orderCode15: 'details',
    orderCode16: 'details',
    orderCode17: 'details',
    orderCode18: 'details',
    orderCode19: 'details',
    orderCode20: 'details',
    orderCode21: 'details',
    orderCode22: 'details',
    orderCode23: 'details',
    orderCode24: 'details',
    orderCode25: 'details',
    orderCode26: 'details',
    orderCode27: 'details',
    orderCode28: 'details',
    orderCode29: 'details',
    orderCode30: 'details',
    orderCode31: 'details',
    orderCode32: 'details',
    orderCode33: 'details',
    orderCode34: 'details',
    orderCode35: 'details',
    orderCode36: 'details',
    orderCode37: 'details',
    orderCode38: 'details',
    orderCode39: 'details',
    orderCode40: 'details',
    orderCode41: 'details',
    orderCode42: 'details',
    orderCode43: 'details',
    orderCode44: 'details',
    orderCode45: 'details',
    orderCode46: 'details',
    orderCode47: 'details',
    orderCode48: 'details',
    orderCode49: 'details',
    orderCode50: 'details',
    orderCode51: 'details',
    orderCode52: 'details',
    orderCode53: 'details',
    orderCode54: 'details',
    orderCode55: 'details',
    orderCode56: 'details',
    orderCode57: 'details',
    orderCode58: 'details',
    orderCode59: 'details',
    orderCode60: 'details',
    orderCode61: 'details',
    orderCode62: 'details',
    orderCode63: 'details',
    orderCode64: 'details',
    orderCode65: 'details',
    orderCode66: 'details',
    orderCode67: 'details',
    orderCode68: 'details',
    orderCode69: 'details',
    orderCode70: 'details',
    orderCode71: 'details',
    orderCode72: 'details',
    orderCode73: 'details',
    orderCode74: ''
  }
]
// 订单开票查询
const orderdata = [
  {
    orderCode: '3213',
    orgcode: '3221',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李1', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '222',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3214',
    orgcode: '3222',
    isVAT: '44',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李2', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '222',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  },
  {
    orderCode: '3215',
    orgcode: '3223',
    isVAT: '43',
    ERPjl: '0',
    ERPcz: '1',
    orgName: '海南家美贸易有限公司', //	厂商名称
    orgCode: 'YP005', //	厂商编码
    orgId: 'YP26482049', //	厂商ID
    url1: '/src/assets/index/zhengjian.jpg',
    url2: '/src/assets/index/zhengjian1.jpg',
    url3: '/src/assets/index/zhengjian2.jpg',
    pName: '李三', //	管理员角色
    userName: 'YP005', //	管理员账号
    password: '123', //	管理员密码
    roleId: '1', //	角色ID
    isEnable: '0', //	状态
    column1: '很不错', //	备注
    isInvoice: '223',
    orgNameTwo: '海南家美贸易有限公司' // 供应商全称
  }

]
export default [
  { // 订单详情查询
    url: orgApis.detailsquery.APIUrl,
    type: 'post',
    response: config => {
      console.log('订单详情查询', config.body)
      var returnList = detailsquery
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.orderCode1 !== '') {
          returnList = returnList.filter(o => o.isInvoice === params.isInvoice)
        }
        if (params.orderCode2 !== '') {
          returnList = returnList.filter(o => o.orderCode === params.orderCode)
        }
        if (params.orderCode3 !== '') {
          returnList = returnList.filter(o => o.orgcode === params.orgcode)
        }
        if (params.orderCode4 !== '') {
          returnList = returnList.filter(o => o.pName === params.pName)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': returnList.length,
        'rows': returnList
        // 'data': {
        //   'orderInvoice': {
        //     'msg': '查询成功',
        //     'pageindex': 1,
        //     'pages': 3,
        //     'records': 10,
        //     'result': '1',
        //     'rows': returnList
        //   },
        //   'msg': 'success',
        //   'result': '1'
        // }
      }
    }
  },
  { // 订单详情查询
    url: orgApis.detailsquery1.APIUrl,
    type: 'post',
    response: config => {
      console.log('订单详情查询', config.body)
      var returnList = detailsquery
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.orderCode1 !== '') {
          returnList = returnList.filter(o => o.isInvoice === params.isInvoice)
        }
        if (params.orderCode2 !== '') {
          returnList = returnList.filter(o => o.orderCode === params.orderCode)
        }
        if (params.orderCode3 !== '') {
          returnList = returnList.filter(o => o.orgcode === params.orgcode)
        }
        if (params.orderCode4 !== '') {
          returnList = returnList.filter(o => o.pName === params.pName)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': returnList.length,
        'rows': returnList
        // 'data': {
        //   'orderInvoice': {
        //     'msg': '查询成功',
        //     'pageindex': 1,
        //     'pages': 3,
        //     'records': 10,
        //     'result': '1',
        //     'rows': returnList
        //   },
        //   'msg': 'success',
        //   'result': '1'
        // }
      }
    }
  },
  { // 订单开票查询
    url: orgApis.orderInvoice.APIUrl,
    type: 'post',
    response: config => {
      var returnList = orderdata
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.isInvoice !== '') {
          returnList = returnList.filter(o => o.isInvoice === params.isInvoice)
        }
        if (params.orderCode !== '') {
          returnList = returnList.filter(o => o.orderCode === params.orderCode)
        }
        if (params.orgcode !== '') {
          returnList = returnList.filter(o => o.orgcode === params.orgcode)
        }
        if (params.pName !== '') {
          returnList = returnList.filter(o => o.pName === params.pName)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': returnList.length,
        'rows': returnList
        // 'data': {
        //   'orderInvoice': {
        //     'msg': '查询成功',
        //     'pageindex': 1,
        //     'pages': 3,
        //     'records': 10,
        //     'result': '1',
        //     'rows': returnList
        //   },
        //   'msg': 'success',
        //   'result': '1'
        // }
      }
    }
  },
  // 品牌查询(restful)
  {
    url: orgApis.mdmCarBrandQueryByPage.APIUrl,
    type: 'post',
    response: config => {
      var returnList = CarBrandList
      // 查询条件过滤
      var params = config.body
      console.log(params)
      if (params) {
        if (params.carBrandCode !== '') {
          returnList = returnList.filter(o => o.carBrandCode === params.carBrandCode)
        }
        if (params.carBrandCn !== '') {
          returnList = returnList.filter(o => o.carBrandCn.indexOf(params.carBrandCn) > -1)
        }
        if (params.isEnable !== '') {
          returnList = returnList.filter(o => o.isEnable === params.isEnable)
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
        'rowcount': CarBrandList.length,
        'rows': returnList
      }
    }
  },
  // 品牌保存(restful)
  {
    url: orgApis.mdmCarBrandMutationSave.APIUrl,
    type: 'post',
    response: config => {
      const brandArr = CarBrandList.filter(o => o.carBrandCode === config.body.carBrandCode)
      let brand = {}
      if (brandArr.length > 0) {
        brand = brandArr[0]
      }
      if (brand.carBrandCode) {
        brand['carBrandCn'] = config.body.carBrandCn
        brand['carBrandCode'] = config.body.carBrandCode
        brand['carBrandEn'] = config.body.carBrandEn
        brand['isEnable'] = config.body.isEnable
      } else {
        brand['uid'] = 'xxxx'
        brand['carBrandCn'] = config.body.carBrandCn
        brand['carBrandCode'] = config.body.carBrandCode
        brand['carBrandEn'] = config.body.carBrandEn
        brand['isEnable'] = config.body.isEnable

        brand['updateControlId'] = 'qqq'
        CarBrandList.push(brand)
      }
      return {
        result: '1',
        msg: ''
      }
    }
  },

  // 品牌查询
  // {
  //   url: orgApis.mdmCarBrandQueryByPage.APIUrl + cH + 'v=' + orgApis.mdmCarBrandQueryByPage.ServiceCode,
  //   type: 'post',
  //   response: config => {
  //     return mdmCarBrandQueryByPage
  //   }
  // },
  // 品牌保存
  {
    url: orgApis.mdmCarBrandMutationSave.APIUrl + cH + 'v=' + orgApis.mdmCarBrandMutationSave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmCarBrandMutationSave
    }
  },
  // 集团组织架构查询
  {
    url: orgApis.mdmOrgInfoQueryGroupMenueByPage.APIUrl + cH + 'v=' + orgApis.mdmOrgInfoQueryGroupMenueByPage.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgInfoQueryGroupMenueByPage
    }
  },
  // 区县查询
  {
    url: orgApis.mdmOrgZoneQueryFindAll.APIUrl + cH + 'v=' + orgApis.mdmOrgZoneQueryFindAll.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgZoneQueryFindAll
    }
  },

  // 区县保存
  {
    url: orgApis.mdmOrgCommutiySave.APIUrl + cH + 'v=' + orgApis.mdmOrgCommutiySave.ServiceCode,
    type: 'post',
    response: config => {
      return mdmOrgCommutiySave
    }
  },

  // 用户经销商查询
  {
    url: orgApis.mdmEmployeeDlrQueryByPage.APIUrl + cH + 'v=' + orgApis.mdmEmployeeDlrQueryByPage.ServiceCode,
    type: 'post',
    response: config => {
      return mdmEmployeeDlrQueryByPage
    }
  },
  // 用户经销商设置-保存
  {
    url: orgApis.mdmUserDlrMutationSaveById.APIUrl + cH + 'v=' + orgApis.mdmUserDlrMutationSaveById.ServiceCode,
    type: 'post',
    response: config => {
      return mdmUserDlrMutationSaveById
    }
  },
  // 获取产品配置信息
  {
    url: orgApis.proConfigDesktopQueryByPage.APIUrl,
    type: 'post',
    response: config => {
      var params = config.body
      console.log(params)
      var returnObj = {}
      if (params.data0 || params.dataInfo) {
        var dataType = params.data0 ? params.data0.dataType : (params.dataInfo ? params.dataInfo.dataType : 0)
        if (dataType === 10002) {
          return {
            'result': '1',
            'data': {
              'proConfigDesktopQueryByPage': {
                'msg': '查询成功',
                'pageindex': 1,
                'pages': 1,
                'records': 1,
                'result': '1',
                'rows': [
                  {
                    'tableId': '18540254a34f42b7b79f8d1b28cfe72a',
                    'dataType': 10002,
                    'userId': '1',
                    'pwdExpress': '{"iscacheDuration":600,"fineReportUrl":"/webroot/decision/v10/entry/access","fineReportUser":"DMS","fineReportPwd":"123456","useConfigisEnable":"0","useCacheisEnable":"0","loginType":"0"}',
                    'updateControlId': 'f780ee5a765742379239ef7eb59ee46b'
                  }
                ]
              }
            },
            'msg': 'success'
          }
        } else if (dataType === 10003) {
          return {
            'result': '1',
            'data': {
              'proConfigDesktopQueryByPage': {
                'msg': '查询成功',
                'pageindex': 1,
                'pages': 1,
                'records': 1,
                'result': '1',
                'rows': [
                  {
                    'tableId': 'd31a10fd1c934ae4af18129b824a5699',
                    'dataType': 10003,
                    'userId': 'b2bfa0cf8bde48b09ab522e383bafc79',
                    'pwdExpress': '{"nowTheme":"red","isHorizontal":false}',
                    'updateControlId': '9c355db855f744039753e3247a8b190a'
                  }
                ]
              }
            },
            'msg': 'success'
          }
        }
      }
      return returnObj
    }
  },
  // 个性换肤保存
  {
    url: orgApis.proConfigDesktopMutationSave.APIUrl + cH + 'v=' + orgApis.proConfigDesktopMutationSave.ServiceCode,
    type: 'post',
    response: config => {
      return {
        result: '1',
        msg: '',
        data: {
          proConfigDesktopMutationSave: {
            result: '1',
            msg: ''
          }
        }
      }
    }
  },
  // 首页代办事项查询
  {
    url: orgApis.mdsSysRemindFindUserByMap.APIUrl,
    type: 'post',
    response: config => {
      return {
        'result': '1',
        'data': {
          'mdsSysRemindFindUserByMap': {
            'msg': '查询成功',
            'pageindex': 1,
            'pages': 1,
            'records': 1,
            'result': '1',
            'rows': []
          }
        },
        'msg': 'success'
      }
    }
  },
  // 首页快捷菜单
  {
    url: orgApis.proConfigUserShortcutMenuQueryByPage.APIUrl,
    type: 'post',
    response: config => {
      return {
        'result': '1',
        'data': {
          'proConfigUserShortcutMenuQueryByPage': {
            'msg': '查询成功',
            'pageindex': 1,
            'pages': 1,
            'records': 1,
            'result': '1',
            'rows': []
          }
        },
        'msg': 'success'
      }
    }
  },
  // 全局角色管理查询(restful)
  {
    url: orgApis.sysRoleQueryGloableByPage.APIUrl,
    type: 'post',
    response: config => {
      var returnList = WholeRoleList
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.roleCode !== '') {
          returnList = returnList.filter(o => o.roleCode === params.roleCode)
        }
        if (params.roleName !== '') {
          returnList = returnList.filter(o => o.roleName.indexOf(params.roleName) > -1)
        }
        if (params.roleOrgType !== '') {
          returnList = returnList.filter(o => o.roleOrgType === params.roleOrgType)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': WholeRoleList.length,
        'rows': returnList
      }
    }
  },
  // 业务岗位查询 (restful)
  {
    url: orgApis.mdmOrgStationQueryFindAll.APIUrl,
    type: 'post',
    response: config => {
      var returnList = OrgStationList
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.isEnable !== '') {
          returnList = returnList.filter(o => o.isEnable === params.isEnable)
        }
        if (params.stationCode !== '') {
          returnList = returnList.filter(o => o.stationCode === params.stationCode)
        }
        if (params.stationName !== '') {
          returnList = returnList.filter(o => o.stationName === params.stationName)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': OrgStationList.length,
        'rows': returnList
      }
    }
  },
  // 业务岗位所属组织查询 (restful)
  {
    url: orgApis.mdmOrgRelationRealQueryByPage.APIUrl,
    type: 'post',
    response: config => {
      return {
        'msg': '',
        'result': '1',
        'rowcount': OrgStationTreeList.length,
        'rows': OrgStationTreeList
      }
    }
  },
  // 系统岗位管理左边查询(restful)
  {
    url: orgApis.mdsSysPositionQueryFindAll.APIUrl,
    type: 'post',
    response: config => {
      var returnList = SysPositionList
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.isEnable !== '') {
          returnList = returnList.filter(o => o.isEnable === params.isEnable)
        }
        if (params.orgType !== '') {
          returnList = returnList.filter(o => o.orgType === params.orgType)
        }
        if (params.positionCode !== '') {
          returnList = returnList.filter(o => o.positionCode === params.positionCode)
        }
        if (params.positionName !== '') {
          returnList = returnList.filter(o => o.positionName === params.positionName)
        }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      const minIndex = (config.body.pageIndex - 1) * config.body.pageSize
      const maxIndex = minIndex + config.body.pageSize
      returnList = returnList.filter(o => o.index >= minIndex && o.index < maxIndex)
      return {
        'msg': '',
        'result': '1',
        'rowcount': SysPositionList.length,
        'rows': returnList
      }
    }
  },
  // 系统岗位管理右边查询(restful)
  {
    url: orgApis.mdsSysPositionDetailQueryFindAll.APIUrl,
    type: 'post',
    response: config => {
      var returnList = SysPositionRightList
      // 查询条件过滤
      var params = config.body
      if (params) {
        // if (params.positionId !== '') {
        //   returnList = returnList.filter(o => o.positionId === params.positionId)
        // }
        // if (params.stationName !== '') {
        //   returnList = returnList.filter(o => o.stationName === params.stationName)
        // }
      }
      // 分页过滤
      returnList.forEach((item, index) => {
        item['index'] = index
      })
      return {
        'msg': '',
        'result': '1',
        'rowcount': SysPositionRightList.length,
        'rows': SysPositionRightList
      }
    }
  },
  // 全局角色管理查看权限(restful)
  {
    url: orgApis.sysRolePrivQueryByPage.APIUrl,
    type: 'post',
    response: config => {
      var returnList = WholeRoleJurisdictionList
      // 查询条件过滤
      var params = config.body
      if (params) {
        if (params.roleId !== '') {
          returnList = returnList.filter(o => o.menuId === params.roleId)
        }
      }
      return {
        'msg': '',
        'result': '1',
        'rowcount': returnList.length,
        'rows': returnList
      }
    }
  },
  // 全局角色管理查看权限2(restful)
  {
    url: orgApis.exportAuthQuryFindAll.APIUrl,
    type: 'post',
    response: config => {
      var returnList = WholeRoleJurisdictionList2
      // 查询条件过滤
      var params = config.body
      if (params) {
        // if (params.roleId !== '') {
        //   returnList = returnList.filter(o => o.roleId === params.roleId)
        // }
        if (params.roleId !== '') {
          returnList = returnList.filter(o => o.menuId === params.roleId)
        }
      }
      return {
        'msg': '',
        'result': '1',
        'rowcount': returnList.length,
        'rows': returnList
      }
    }
  },
  // 系统岗位管理保存(restful)
  {
    url: orgApis.mdsSysPositionMutationSave.APIUrl,
    type: 'post',
    response: config => {
      const brandArr = SysPositionRightList
      brandArr.map(y => {
        y.isSelected = '0'
        config.body.stationList.split(',').map(x => { if (y.stationId == x) y.isSelected = '1' })
      })
      return {
        result: '1',
        msg: ''
      }
    }
  },
  // 全局角色管理功能权限设置 新增编辑 保存(restful)
  {
    url: orgApis.sysRoleMutationGlobalSave.APIUrl,
    type: 'post',
    response: config => {
      const brandArr = WholeRoleList.filter(o => o.roleId === config.body.roleId)
      let brand = {}
      if (brandArr.length > 0) {
        brand = brandArr[0]
      }
      if (brand.roleId) {
        brand['roleCode'] = config.body.roleCode
        brand['roleName'] = config.body.roleName
        brand['roleOrgType'] = config.body.roleOrgType
        brand['enabled'] = config.body.enabled
        brand['roleDesc'] = config.body.roleDesc
        brand['builtInName'] = config.body.roleDesc
        brand['enableStatus'] = config.body.enabled == '1' ? '是' : '否'
      } else {
        brand['roleCode'] = config.body.roleCode
        brand['roleName'] = config.body.roleName
        brand['roleOrgType'] = config.body.roleOrgType
        brand['enabled'] = config.body.enabled
        brand['roleDesc'] = config.body.roleDesc
        brand['roleId'] = config.body.roleId
        brand['builtInName'] = config.body.roleId
        brand['enableStatus'] = config.body.enabled == '1' ? '是' : '否'
        brand['builtInName'] = '否'
        if (config.body.roleOrgType) {
          switch (config.body.roleOrgType) {
            case '0':
              brand['orgTypeName'] = '总部'
              break
            case '1':
              brand['orgTypeName'] = '经销商'
              break
            case '2':
              brand['orgTypeName'] = '集团'
              break
            case '3':
              brand['orgTypeName'] = '供应商'
              break
            case '4':
              brand['orgTypeName'] = '地区'
              break
            default:
              break
          }
        }
        WholeRoleList.push(brand)
      }
      return {
        result: '1',
        msg: ''
      }
    }
  },
  // 业务岗位 新增编辑 保存
  {
    url: orgApis.mdmOrgStationMutationSaveById.APIUrl,
    type: 'post',
    response: config => {
      const brandArr = OrgStationList.filter(o => o.stationId === config.body.stationId)
      let brand = {}
      if (brandArr.length > 0) {
        brand = brandArr[0]
      }
      if (brand.stationId) {
        brand['column1'] = config.body.column1
        brand['deptId'] = config.body.deptId
        brand['isEnable'] = config.body.isEnable
        brand['orgId'] = config.body.orgId
        brand['stationCode'] = config.body.stationCode
        brand['stationName'] = config.body.stationName || 'Mock组织'
      } else {
        brand['column1'] = config.body.column1 || 'Mock岗位'
        brand['deptName'] = config.body.deptName || 'Mock组织'
        brand['deptId'] = config.body.deptId
        brand['isEnable'] = config.body.isEnable
        brand['orgId'] = config.body.orgId
        brand['stationCode'] = config.body.stationCode
        brand['stationName'] = config.body.stationName
        brand['stationId'] = config.body.stationId || 'csstationId'
        brand['isDlrStation'] = config.body.isDlrStation || 'Mock组织类型'
        brand['updateControlId'] = config.body.updateControlId || 'csupdateControlId'
        OrgStationList.push(brand)
      }
      return {
        result: '1',
        msg: ''
      }
    }
  },
  // 全局角色管理功能权限设置保存(restful)
  {
    url: orgApis.exportAuthMutationSave.APIUrl + cH + 'v=' + orgApis.exportAuthMutationSave.ServiceCode,
    type: 'post',
    response: config => {
      //  const brandArr = exportAuthMutationSave.filter(o => o.roleId === config.body.roleId)
      //  let brand = {}
      //  if (brandArr.length > 0) {
      //    brand = brandArr[0]
      //  }
      //   brand['roleCode'] = config.body.roleCode
      //   brand['roleName'] = config.body.roleName
      //   brand['roleOrgType'] = config.body.roleOrgType
      //   brand['enabled'] = config.body.enabled
      //   brand['roleDesc'] = config.body.roleDesc
      //   brand['builtInName'] = config.body.roleDesc
      //   brand['enableStatus'] = config.body.enabled=="1"?"是":"否"

      //    exportAuthMutationSave.push(brand)

      return {
        result: '1',
        msg: ''
      }
    }
  },
  // 全局角色管理功能权限设置2 保存(restful)
  {
    url: orgApis.sysRolePrivMutationSave.APIUrl,
    type: 'post',
    response: config => {
      const brandArr = WholeRoleList.filter(o => o.roleId === config.body.roleId)
      let brand = {}
      if (brandArr.length > 0) {
        brand = brandArr[0]
      }
      brand['roleId'] = config.body.roleId
      brand['menuId'] = config.body.menuId
      return {
        result: '1',
        msg: ''
      }
    }
  }
]

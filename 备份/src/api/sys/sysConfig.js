import { requestGraphQL } from '@/api/commonRequest'
import { orgApis } from '@/api/apiList/org'

// 值列表查询
export function syslookupValueQuery(pageSize, pageIndex, codes) {
  let queryStr = 'query($pageIndex: Int, $pageSize: Int'

  for (let i = 0; i < codes.length; i++) {
    queryStr += ', $data' + i + ': ' + orgApis.mdsLookupValueQueryByPage.InputType
  }

  queryStr += ')'
  queryStr += '{'

  for (let j = 0; j < codes.length; j++) {
    queryStr += 'a' + j + ':' + orgApis.mdsLookupValueQueryByPage.ServiceCode
    queryStr += '(dataInfo: $data' + j + ', pageIndex: $pageIndex, pageSize: $pageSize){'
    queryStr += 'msg pageindex pages records result rows{'
    queryStr += ['lookupTypeCode', 'lookupValueCode', 'lookupValueName', 'attribute1'].join(' ')
    queryStr += '}'
    queryStr += '}'
  }

  queryStr += '}'
  const paramD = {
    apiUrl: orgApis.mdsLookupValueQueryByPage.APIUrl,
    serviceCode: orgApis.mdsLookupValueQueryByPage.ServiceCode,
    query: queryStr,
    variables: {
      pageSize: pageSize,
      pageIndex: pageIndex
    }
  }

  for (let k = 0; k < codes.length; k++) {
    paramD.variables['data' + k] = {
      lookupTypeCode: codes[k].lookupTypeCode,
      lookupValueCode: codes[k].lookupValueCode,
      isEnable: '1'
    }
  }

  return requestGraphQL(paramD)
}
// 系统可配置缓存配置查询(系统)
export function configureCache(pageSize, pageIndex, codes) {
  let queryStr = 'query($pageIndex: Int, $pageSize: Int'

  for (let i = 0; i < codes.length; i++) {
    queryStr += ', $data' + i + ': ' + orgApis.proConfigDesktopQueryByPage.InputType
  }

  queryStr += ')'
  queryStr += '{'

  for (let j = 0; j < codes.length; j++) {
    queryStr +=  orgApis.proConfigDesktopQueryByPage.ServiceCode
    queryStr += '(dataInfo: $data' + j + ', pageIndex: $pageIndex, pageSize: $pageSize){'
    queryStr += 'msg pageindex pages records result rows{'
    queryStr += ['tableId', 'dataType', 'userId', 'pwdExpress','updateControlId'].join(' ')
    queryStr += '}'
    queryStr += '}'
  }

  queryStr += '}'
  const paramD = {
    apiUrl: orgApis.proConfigDesktopQueryByPage.APIUrl,
    serviceCode: orgApis.proConfigDesktopQueryByPage.ServiceCode,
    query: queryStr,
    variables: {
      pageSize: pageSize,
      pageIndex: pageIndex
    }
  }

  for (let k = 0; k < codes.length; k++) {
    paramD.variables['data' + k] = {
      tableId: codes[k].tableId,
      dataType: codes[k].dataType,
      userId: codes[k].userId,
      pwdExpress: codes[k].pwdExpress,
      updateControlId: codes[k].updateControlId
    }
  }

  return requestGraphQL(paramD)
}
// 系统可配置缓存配置查询(用户)
export function configureisHorizontal(pageSize, pageIndex, codes) {
  let queryStr = 'query($pageIndex: Int, $pageSize: Int'

  for (let i = 0; i < codes.length; i++) {
    queryStr += ', $data' + i + ': ' + orgApis.proConfigDesktopQueryByPage.InputType
  }

  queryStr += ')'
  queryStr += '{'

  for (let j = 0; j < codes.length; j++) {
    queryStr +=  orgApis.proConfigDesktopQueryByPage.ServiceCode
    queryStr += '(dataInfo: $data' + j + ', pageIndex: $pageIndex, pageSize: $pageSize){'
    queryStr += 'msg pageindex pages records result rows{'
    queryStr += ['tableId', 'dataType', 'userId', 'pwdExpress','updateControlId'].join(' ')
    queryStr += '}'
    queryStr += '}'
  }

  queryStr += '}'
  const paramD = {
    apiUrl: orgApis.proConfigDesktopQueryByPage.APIUrl,
    serviceCode: orgApis.proConfigDesktopQueryByPage.ServiceCode,
    query: queryStr,
    variables: {
      pageSize: pageSize,
      pageIndex: pageIndex
    }
  }

  for (let k = 0; k < codes.length; k++) {
    paramD.variables['data' + k] = {
      tableId: codes[k].tableId,
      dataType: codes[k].dataType,
      userId: codes[k].userId,
      pwdExpress: codes[k].pwdExpress,
      updateControlId: codes[k].updateControlId
    }
  }

  return requestGraphQL(paramD)
}
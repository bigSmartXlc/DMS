<!--
* description:内饰色下拉框（多选，单选）,支持搜索
* author: liyanm
* createdDate: 2019-07-27
*   2019-08-09 修改文字溢出效果-封装 liyanm
*   2019-09-21 listQuery中 brandCode改为carBrandCode-徐浪帆
-->
<template>
  <section>
    <el-col
      v-show="curIsShow"
      :key="fullComponentKey"
      :span="span"
    >
      <lableName
        :validrule="validrule"
        :cur-label-name="curLabelName"
        :is-show-label="isShowLabel"
        :is-require="isRequire"
      />
      <el-select
        v-model="modelCode"
        :multiple="isMul"
        collapse-tags
        :filterable="filterable"
         :placeholder="placeholder"
        :clearable="clearable"
        :disabled="curDisabled"
        size="small"
        @clear="clearCode"
        @change="sendCode"
      >
        <el-option
          v-for="item in optionDatas"
          :key="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
          :label="item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]]"
          :value="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
        >{{ item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]] }}</el-option>
      </el-select>
      <validateFormate
        :cur-label-name="curLabelName"
        :validrule="validrule"
      />
    </el-col>
  </section>
</template>
<script>
import { orgApis } from '@/api/apiList/org'
import { dropdownMixins } from '@/components/mixins/dropdownMixins'
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: 'OrgcarCode',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  props: {
    // 品牌编号
    carBrandCode: { type: String, default: '' }
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['optionalPackId', 'optionalShortName'],
      placeholder: this.$t('sys.tips.esTip0'),
      curLabelName:
        this.labelName === ''
          ? this.$t('org.label.carIncolor') /* 内饰色*/
          : this.labelName,
      // API配置对象
      apiConfig: orgApis.mdmCarOptionalPackQueryFindAll,
      // 表格中台返回网格的字段
      apiQueryRow: [
        'optionalPackId',
        'optionalPackPrice',
        'optionalPackCode',
        'optionalShortName',
        'optionalPackCn'
      ],
      // 查询条件
      listQuery: {
        optionalPackCode: '',
        optionalPackCn: '',
        stdCarId: '',
        stdCarCode: '',
        productLevelId: '',
        isEnable: '1',
        smallCarTypeId: '',
        optionalShortName: ''
      }
    }
  },
  created() {
    const that = this
    // 初始化数据
    if (this.apiConfig !== null && this.apiQueryRow.length > 0 && this.optionDatas.length === 0 && this.lookuptype !== '_is_null_code_') {
    // 设置网格中组件查询字段（如果当前组件存在于网格中）
      this.$utils.setRowQueryFields(this, 'listQuery')
      if (this.setQueryFields() !== true) {
      // 设置组件间联动值后执行
        if (this.isAsync !== true) {
        // 非异步加载数据（同步）
          this.queryTable(this.apiConfig, this.apiQueryRow, function() {

          })
        } else {
        // 异步加载数据
          this.setDefaultOpiton()
        }
      }
    }
  },
  methods: {
    // 定义空方法，用于获取下拉框数据（这里需要每个组件实现这个方法）
  // 查询方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    queryTable(apiConfig, apiQueryRow, cb) {
    // 设置查询条件备份
      const that = this
      this.backListQuery = JSON.parse(JSON.stringify(this.listQuery))
      // 判断必须查询条件字段
      if (this.mustFields && this.mustFields !== null) {
        const arrFields = this.mustFields.split('|')
        for (var i in arrFields) {
          if (!this.listQuery[arrFields[i]] || this.listQuery[arrFields[i]] === '') {
            this.optionDatas = []
            if (typeof cb === 'function') {
              cb.call(this, false)
            }
            return
          }
        }
      }
      const curListQuery = JSON.parse(JSON.stringify(this.listQuery))
      var unListQuryFieldList = this.unListQuryFields.split(',')
      for (var k in unListQuryFieldList) {
        if (curListQuery[unListQuryFieldList[k]]) {
          delete curListQuery[unListQuryFieldList[k]]
        }
      }
      const queryObj = {
      // api配置
        apiConfig: apiConfig,
        // 需要调用的API服务配置
        apiServices: [{
        // 表格中台返回网格的字段
          apiQueryRow: apiQueryRow
        }],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: 500,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: curListQuery
        }
      }
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj)
      let tmpOptions = []
      // 检查查询结果已经存在且未过期
      if (this.useCache === true || (this.isColComp === true && this.$OrgCacheData.CacheObject.useCache)) {
        tmpOptions = this.$OrgCacheData.CacheObject.getData(queryObj, queryObj.apiConfig.ServiceCode) || []
      }
      if (tmpOptions.length === 0) {
      // 设置请求版本
        this.requestVer++
        const curVer = this.requestVer
        // 不存在则请求中台API数据
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD).then(response => {
          if (curVer === this.requestVer) {
            this.isLoadedData = true
            if (response.data[queryObj.apiConfig.ServiceCode].result === '1' && response.data[queryObj.apiConfig.ServiceCode].rows) {
              this.optionDatas = this.$utils.changeToOneDeepArray(response.data[queryObj.apiConfig.ServiceCode].rows)
              // 赋值缓存
              if (this.useCache === true || (this.isColComp === true && this.$OrgCacheData.CacheObject.useCache)) {
                this.$OrgCacheData.CacheObject.setData(queryObj, queryObj.apiConfig.ServiceCode, response.data[queryObj.apiConfig.ServiceCode].rows)
              }
            }
            // 判断code是否存在查询结果中
            this.checkOptionValue(this)
          }
          const s = [' ', '', '无']
          let hasNo = true
          for (const i of that.optionDatas) {
            if (!s.includes(i.optionalShortName)) {
              hasNo = false
            }
          }
          if (hasNo) {
            that.curDisabled = true
            that.placeholder = ''
          } else {
            that.curDisabled = false
            that.placeholder = this.$t('sys.tips.esTip0')
          }
          if (typeof cb === 'function') {
            cb.call(this, true)
          }
        }).catch(err => {
          console.info(err)
          if (typeof cb === 'function') {
            cb.call(this, false)
          }
        })
      } else {
        this.optionDatas = this.$utils.changeToOneDeepArray(tmpOptions)
        const s = [' ', '', '无']
        let hasNo = false
        for (const i of that.optionDatas) {
          if (s.includes(i.optionalShortName)) {
            hasNo = true
          }
        }
        if (hasNo) {
          that.placeholder = ''
          that.curDisabled = true
        } else {
          that.placeholder = this.$t('sys.tips.esTip0')
          that.curDisabled = false
        }
        this.isLoadedData = true
        // 判断code是否存在查询结果中
        this.checkOptionValue(this)
        if (typeof cb === 'function') {
          cb.call(this, false)
        }
      }
    }
  }
}
</script>
<style scoped>
/deep/ input.el-input__inner {
    height: 24px !important;
}
/deep/.el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa !important;
}
</style>

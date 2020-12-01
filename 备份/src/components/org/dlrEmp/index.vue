<!--
  * description: 岗位下拉框
  * author: wangcx
  * createdDate: 2019-12-13
-->
<template>
  <section>
    <el-col
      v-if="curIsShow"
      :span="span"
    >
      <div class="comwidth">
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
          :disabled="disabled"
          size="small"
          @clear="clearCode"
          @change="sendCode"
          @visible-change="visibleChange"
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
      </div>
    </el-col>
  </section>
</template>
<script>
import { orgApis } from '@/api/apiList/org'
import { dropdownMixins } from '@/components/mixins/dropdownMixins'
export default {
  name: 'Index',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  mixins: [dropdownMixins],
  props: {
    // 岗位类型编码
    lookuptype: { type: String, default: '_is_null_code_' },
    // 初始化加载第一个数据
    initFirst: { type: Boolean, default: false },
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: 'empId' },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: 'empName' }
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['empId', 'empName'],
      placeholder: this.$t('sys.tips.esTip0'),
      // API配置对象
      apiConfig: orgApis.mdsSysPositionQueryEmpList,
      // 表格中台返回网格的字段
      apiQueryRow: [
        'dlrCode',
        'empId',
        'empName',
        'userId'
      ],
      // 下拉查询条件
      listQuery: {
        isEnable: '1',
        positionCode: this.lookuptype,
        dlrCode: this.$store.getters.orgInfo.DLR_CODE
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
            if (that.initFirst) {
              that.setModelCode(that.optionDatas[0].empId)
              that.sendCode()
            }
          })
        } else {
          // 异步加载数据
          this.setDefaultOpiton()
        }
      }
    }
  }
}
</script>

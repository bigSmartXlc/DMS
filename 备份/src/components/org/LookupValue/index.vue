<!--
  * description: 值列表查询组件（多选，单选）,支持搜索
  * author: liyanm
  * createdDate: 2019-07-27
  * 2019-08-05 加入文字溢出效果 liyanm
  * 2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
  * 2019-11-26 查询条件和返回字段增加值列表的一个扩展字段，用来实现一个页面的值列表下拉框联动效果 xulfan
  * 2019-12-18 查询条件和返回字段增加值列表的一个扩展字段attribute2，用来实现一个页面的值列表下拉框联动效果 liudl
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
          :label-width="labelWidth"
          :max-word-count="maxWordCount"
        />

        <el-select
          v-model="modelCode"
          :multiple="isMul"
          :collapse-tags="isTags"
          :filterable="filterable"
          :placeholder="placeholder"
          :clearable="clearable"
          :disabled="curDisabled"
          :popper-class="popperClass"
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
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: 'Index',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labelName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  props: {
    // 值列表类型编码
    lookuptype: { type: String, default: '_is_null_code_' },
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: 'lookupValueCode' },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: 'lookupValueName' },
    labelWidth: { type: Number, default: 80 },
    maxWordCount: { type: Number, default: 7 },
    popperClass: { type: String, default: '' },
    isTags: { type: Boolean, default: true }
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['lookupValueCode', 'lookupValueName'],
      placeholder: this.dataToObject && this.dataToObject.placeholder ? this.dataToObject.placeholder : this.$t('sys.tips.esTip0'),
      // API配置对象
      apiConfig: orgApis.mdsLookupValueQueryByPage,
      // 是否排序
      // 表格中台返回网格的字段
      apiQueryRow: [
        'oemCode',
        'groupCode',
        'lookupTypeCode',
        'lookupValueCode',
        'lookupValueName',
        'attribute1', // 扩展字段
        'attribute2', // 扩展字段
        'attribute3', // 扩展字段
        'attribute4', // 扩展字段
        'attribute5' // 扩展字段

      ],
      // 下拉查询条件
      listQuery: {
        isEnable: '1',
        lookupTypeCode: this.lookuptype,
        attribute1: this.dataToObject == null ? '' : this.dataToObject.attribute, // 扩展字段
        attribute2: (this.dataToObject != null && this.dataToObject.attribute2) ? this.dataToObject.attribute2 : '', // 扩展字段
        attribute3: '', // 扩展字段
        attribute4: '', // 扩展字段
        attribute5: '', // 扩展字段
        lookupValueCode: ''
      }
      //   curLabelName: this.label
    }
  },
  watch: {
    'optionDatas'(val, cul) {
      if (Array.isArray(val)) {
        for (var i = val.length - 1; i > 0; i--) {
          for (var j = 0; j < i; j++) {
            if (val[j].lookupValueCode > val[j + 1].lookupValueCode) {
              [val[j], val[j + 1]] = [val[j + 1], val[j]]
            }
          }
        }
      }
    }
  }
}
</script>

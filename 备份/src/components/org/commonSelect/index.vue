<!--
  * description: 值列表查询组件（多选，单选）,支持搜索
  * author: suyong
  * createdDate: 2020-07-15
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
          collapse-tags
          :filterable="filterable"
          :placeholder="placeholder"
          :clearable="clearable"
          :disabled="curDisabled"
          :style="{'width': (labelWidth !== 80 ? `calc(100% - ${labelWidth}px)`: '')}"
          size="small"
          @clear="clearCode"
          @change="sendCode"
          @visible-change="visibleChange"
        >
          <el-option
            v-for="(item, indx) in optionDatas"
            :key="selectType === '1' ? indx :item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
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
import lableName from '@/components/lableName'
import validateFormate from '@/components/validateFormate'
export default {
  name: 'Index',
  components: {
    lableName, // 标题溢出样式组件
    validateFormate // 校验提示样式组件
  },
  mixins: [dropdownMixins],
  props: {
    // 值列表类型编码
    lookuptype: { type: String, default: '' },
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: 'lookupValueCode' },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: 'lookupValueName' },
    // 自定义下拉框对象
    customObj: { type: Object, default: () => { return {} } },
    // lable标题宽度
    labelWidth: { type: Number, default: 80 },
    // lable字体个数
    maxWordCount: { type: Number, default: 6 },
    oemCode: { type: String, default: '2' }
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: this.customObj && this.customObj.defOptionFields ? this.customObj.defOptionFields : ['lookupValueCode', 'lookupValueName'],
      placeholder: this.dataToObject && this.dataToObject.placeholder ? this.dataToObject.placeholder : this.$t('sys.tips.esTip0'),
      // API配置对象
      apiConfig: this.customObj && this.customObj.api ? this.customObj.api : orgApis.mdsLookupValueQueryByPage,
      // 表格中台返回网格的字段
      apiQueryRow: this.customObj && this.customObj.apiQueryRow ? this.customObj.apiQueryRow : [
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
      listQuery: this.customObj && this.customObj.listQuery ? this.customObj.listQuery : {
        isEnable: '1',
        lookupTypeCode: this.lookuptype,
        oemCode: this.oemCode,
        attribute1: '', // 扩展字段
        attribute2: '', // 扩展字段
        attribute3: '', // 扩展字段
        attribute4: '', // 扩展字段
        attribute5: '', // 扩展字段
        lookupValueCode: ''
      },
      selectType: this.customObj && this.customObj.selectType ? this.customObj.selectType : ''
      //   curLabelName: this.label
    }
  },
  mounted() {
  }
}
</script>

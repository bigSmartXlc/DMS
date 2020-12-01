<!--
* description: 品牌下拉框（多选，单选）,支持搜索
* author: luojx
* createdDate: 2019-07-27
* 增加文字溢出效果 liyam: 2019-08-5
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <section>
    <el-col v-if="curIsShow" :key="fullComponentKey" :span="span">
      <lableName
        :validrule="validrule"
        :cur-label-name="curLabelName"
        :is-show-label="isShowLabel"
        :is-require="isRequire"
      />
      <el-select
        v-model="modelCode"
        :multiple="isMul"
        :collapse-tags="collapseTags"
        :filterable="false"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        size="small"
        @clear="clearCode"
        @change="sendCode"
        @remove-tag="removeTag"
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
// import lableName_from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: 'CarBrand',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  props: {
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: 'carBrandCode' },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: 'carBrandCn' },
    // 是否使用默认品牌
    isUseDefault: { type: Boolean, default: true },
    // 多选时是否将选中值按文字的形式展示
    collapseTags: { type: Boolean, default: true },
    // 是否可清除选项
    clearable: { type: Boolean, default: false }
  },
  data() {
    return {
      // 是否强制使用缓存
      useCache: true,
      // 默认绑定数据对象字段
      defOptionFields: ['carBrandCode', 'carBrandCn'],
      placeholder: this.dataToObject && this.dataToObject.placeholder ? this.dataToObject.placeholder : this.$t('sys.tips.esTip0'),
      curLabelName: this.labelName === '' ? this.$t('org.label.carBrandCn') /* 品牌*/ : this.labelName,
      // API配置对象
      apiConfig: orgApis.mdmCarBrandQueryByPage,
      // 表格中台返回网格的字段
      apiQueryRow: ['carBrandCn', 'carBrandCode', 'carBrandEn']
    }
  },
  created() {
    // 如果没有赋值，则品牌加入默认值
    if (!this.code || this.code === '') {
      if (this.isMul === true) {
        this.modelCode = this.isUseDefault === true && this.$store.getters.orgInfo.BRAND_CODE !== '' ? [this.$store.getters.orgInfo.BRAND_CODE] : []
      } else {
        this.modelCode = this.isUseDefault === true && this.$store.getters.orgInfo.BRAND_CODE !== '' ? this.$store.getters.orgInfo.BRAND_CODE : ''
      }
      this.sendCode()
    }
  },
  methods: {
    // 移除tag时判断是否清除所有
    removeTag(tag) {
      if (this.isMul === true && this.modelCode.length === 0) {
        if (this.isUseDefault === true && this.$store.getters.orgInfo.BRAND_CODE !== '') {
          this.modelCode = [this.$store.getters.orgInfo.BRAND_CODE]
        } else {
          this.modelCode = []
        }
        this.sendCode()
      }
    }
  }
}
</script>

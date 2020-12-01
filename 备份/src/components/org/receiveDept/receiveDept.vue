<!--
* description: 领用部门下拉框,支持搜索
* author: lixb
* createdDate: 2019-11-15
-->
<template>
  <section>
    <el-col :span="span">
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
      >
        <el-option
          v-for="item in optionDatas"
          :key="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
          :label="item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]]"
          :value="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
        >{{ item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]] }}</el-option>
      </el-select>
      <validateFormate :cur-label-name="curLabelName" :validrule="validrule" />
    </el-col>
  </section>
</template>
<script>
import { orgApis } from '@/api/apiList/org'
import { dropdownMixins } from '@/components/mixins/dropdownMixins'
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: 'ReceiveDept',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],

  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['orgTreeId', 'orgName'],
      placeholder: this.$t('sys.tips.esTip0'),
      curLabelName: this.labelName === '' ? '领用部门' : this.labelName,
      // API配置对象
      apiConfig: orgApis.mdmOrgRelationRealQueryByPage,
      // 表格中台返回网格的字段
      apiQueryRow: [
        'orgName',
        'orgTreeId',
        'orgCode',
        'orgBelongType',
        'orgRealId',
        'groupCode',
        'groupId',
        'linkId',
        'parentOrgTreeId'
      ],
      listQuery: {
        isEnable: '1',
        companyid: this.$store.getters.orgInfo.COMPANY_ID,
        orgBelongType: '8'
      }
    }
  }
}
</script>

<!--
* description: 经销商输入框（含弹窗）
* author: linsy
* createdDate: 2019-08-08
-->
<template>
  <section
    v-show="curIsShow"
    :key="fullComponentKey"
    class="orgDlr"
  >
    <el-col :span="span">
      <lableName
        :cur-label-name="curLabelName"
        :is-show-label="isShowLabel"
        :is-require="isRequire"
      />
      <el-input
        v-model="modelText"
         :placeholder="placeholder"
        :disabled="disabled"
        size="small"
        suffix-icon="el-icon-search"
        clearable
        @blur="sendCode"
        @focus="getFocusCode"
        @clear="clearCode"
      />
      <validateFormate
        :cur-label-name="curLabelName"
        :validrule="validrule"
      />
    </el-col>
    <orgDlr
      :key="curPopupsKey"
      ref="dialogMultipleTable"
      :popups-visible="curPopupsVisible"
      :code-field="codeField"
      :text-field="textField"
      :com-type="comType"
      :init-stop-select="initStopSelect"
      :popups-key="popupsKey"
      :code="modelCode"
      :text="modelText"
      :value-object="curValueObject"
      :is-mul="isMul"
      @changeCode="getComponentCode"
    />
  </section>
</template>
<script>
import { searchInputMixins } from '@/components/mixins/searchInputMixins'
import { valueObjectMixins } from '@/components/mixins/valueObjectMixins'
import { orgApis } from '@/api/apiList/org'
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  components: {
    orgDlr: () => import('@/components/org/orgDlr/orgDlr'),
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  // 组件混入对象
  mixins: [searchInputMixins, valueObjectMixins],
  props: {
    initStopSelect: { type: Boolean, default: false }// 初始化禁选停用经销商
  },
  data() {
    return {
      placeholder: this.$t('sys.tips.esTip0'),
      curLabelName: this.labelName === '' ? '经销商' : this.labelName
    }
  },
  methods: {
    // 重写显示时执行事件
    onShow() {
      var that = this
      if (!that.parentFields || that.parentFields === '') {
        var parent = that.$utils.getHasFormFieldParentComponent(that)
        if (
          parent.formField &&
          parent.formField.carBrandCode &&
          parent.formField.carBrandCode !== ''
        ) {
          // 赋值
          that.curValueObject.carBrandCode = parent.formField.carBrandCode
          that.curPopupsKey = that.codeField + that.$utils.generateId()
        }
      }

      // 加载dialog中的数据
      // this.$nextTick(() => {
      //   this.$refs.dialogMultipleTable.fetchData(function() {
      //     if (that.initStopSelect) {
      //       that.$refs.dialogMultipleTable.isAble = true
      //       that.$refs.dialogMultipleTable.stopSelect(true)
      //     }
      //   })
      // })
    }

  }
}
</script>

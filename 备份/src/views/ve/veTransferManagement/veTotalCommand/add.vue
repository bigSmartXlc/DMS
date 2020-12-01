<!--
* description: 门店移库指令新增/修改弹窗
* author: duanhy
* createdDate: 2020-11-12
-->
<template>
  <section class="editWholeRoleManage">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      width="400px"
      @close="close"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :style-type="$store.state.app.dialogType"
      />
      <div class="filter-container filter-params">
        <el-row
          ref="vailComponentList"
          :gutter="26"
        >
          <component
            :is="comp.component"
            v-for="comp in tableComponents.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :validrule="comp.validrule"
            :code-field="comp.codeField"
            :text-field="comp.textField"
            :popups-key="comp.compKey"
            :code="formField[comp.codeField]"
            :disabled="comp.disabled"
            :is-require="comp.isRequire"
            :is-mul="comp.isMul"
            :span="comp.span || 8"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :parent-fileds="comp.parentFileds"
            :date-options-type="comp.dateOptionsType"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
          />
        </el-row>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          :icon="comp.icon"
          @click="comp.clickEvent"
        >{{ comp.text }}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from '@/components/mixins/formMixins'
import { orgApis } from '@/api/apiList/org'
export default {
  components: {
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  // 组件混入对象
  mixins: [formMixins],
  props: {
    userNameShow: { type: Boolean, default: true },
    isShowChooes: { type: Boolean, default: true }
  },

  data() {
    const viewPageCode = 'storeRelocation'
    return {
      // 保存API配置对象
      apiConfig: orgApis.stoTransferInstructionQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.save(),
          text: '保存', /* 保存*/
          icon: 'iconfont  icon-preservation',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          icon: 'iconfont  icon-reset',
          size: 'small',
          clickEvent: () => this.reset(),
          text: '重置'
        },
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-cancel',
          clickEvent: () => this.close('0'),
          text: '取消'
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [],
      // 静态组件-查询条件
      staticTableComponents: [
        {
          compKey: 'compKey1',
          labelName: 'VIN',
          codeField: 'VINCode',
          span: this.span(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          // disabled: !this.isAdd(),
          isMust: true
        },
        {
          compKey: 'compKey2',
          labelName: '车系',
          codeField: 'carSeries',
          span: this.span(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey3',
          labelName: '车型配置',
          span: this.span(),
          codeField: 'carConfig',
          // disabled: !this.isAdd(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey4',
          labelName: '车身颜色',
          codeField: 'carColor',
          span: this.span(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey5',
          labelName: '内饰颜色',
          codeField: 'withinColor',
          span: this.span(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey6',
          labelName: '源仓库',
          codeField: 'wareHouse',
          span: this.span(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey7',
          labelName: '源仓库地址',
          codeField: 'houseAddress',
          span: this.span(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey8',
          labelName: '目的库',
          codeField: 'objective',
          span: this.span(),
          isRequire: true,
          // roleOrgType: '',dropdownList
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey9',
          labelName: '目的仓库',
          codeField: 'objectiveAddress',
          span: this.span(),
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        }
      ],
      // 标题
      textMap: {
        edit: '修改门店移库指令', // '修改门店移库指令',
        add: '新增门店移库指令' // '新增门店移库指令'
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(this, {
        VINCode: '',
        carSeries: '',
        carConfig: '',
        carColor: '',
        withinColor: '',
        wareHouse: '',
        houseAddress: '',
        objective: '北京',
        objectiveAddress: ''
      },
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode], null, 'formComponents')
    }
  },
  created() {},
  // watch: {
  //   oneList:function () {
  //     this.formField = this.oneList
  //   }
  // },

  methods: {
    span() {
      return 24
    },

    // 保存
    save() {
      const that = this
      this.$utils.validataMoth(this, 'validpopup')
      const formField = that.formField
      // console.log(this.formField)
      if (this.valid) {
        that.$emit('save', formField)
        this.close()
      } else {
        this.$message({
          message: '请输入目的仓库',
          type: 'warning',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style scoped>
.promptSpan{
  position: absolute;
    bottom: 26px;
    right: 335px;
    color: #e70020;
}
</style>

<!--
* description: 展车订单配置编辑
* author: 
* createdDate: 
-->
<template>
  <section class="editBelowOrdCar">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      width="1000px"
      @close="sendCode"
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
            :parent-fileds="comp.parentFileds || ''"
            :code="formField[comp.codeField]"
            :disabled="comp.disabled"
            :role-org-type="comp.roleOrgType"
            :is-require="comp.isRequire"
            :is-mul="comp.isMul"
            :span="comp.span || 8"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
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

  data() {
    const viewPageCode = 'belowOrdCar-edit'
    return {

      // 保存API配置对象
    //   apiConfig: orgApis.mdmOrgInfoMutationSupplierSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.save(),
          text: this.$t('sys.button.save') /* 保存*/,
          icon: '',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          icon: '',
          clickEvent: () => this.sendCode('0'),
          text: this.$t('sys.button.cancel') // 取消
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
          labelName: '车辆单号：', // 车辆单号
          codeField: 'carOrder',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          disabled: true,
          isMust: true
        },
        {
          compKey: 'compKey2',
          labelName: '车型配置：', 
          codeField: 'carConfig',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey3',
          labelName: '车辆状态：', 
          span: 8,
          isRequire: true,
          codeField: 'carStatus',
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          disabled: true,
          isMust: true
        },
        {
          compKey: 'compKey4',
          labelName: '交付城市：',
          codeField: 'deliveryCity',
          isRequire: true,
          component: () => import('@/components/org/LookupValue'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey5',
          labelName: '交付中心',
          codeField: 'deliveryCenter',
          span: 8,
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey6',
          labelName: '展车门店：',
          codeField: 'belowStore',
          span: 8,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey7',
          labelName: '备注：',
          codeField: 'remark',
          component: () => import('@/components/org/commonInput/textareaInput'),
          type: 'textArea',
          isMust: true
        },
      ],
      // 标题
      textMap: {
        edit: '编辑', 
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        carOrder:'',
        carConfig:'',
        carStatus:'',
        deliveryCity:'',
        deliveryCenter:'',
        belowStore:'',
        remark:''
      },
      initForm: {}
    }
  },
  created() {

  },
  methods: {
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

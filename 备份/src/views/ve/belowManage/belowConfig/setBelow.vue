<!--
* description: 设置展车
* author: 
* createdDate: 
-->
<template>
  <section class="editSetBelow">
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
    const viewPageCode = 'setBelow-edit'
    return {

      // 保存API配置对象
    //   apiConfig: orgApis.mdmOrgInfoMutationSupplierSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.confirm(),
          text: this.$t('sys.button.confirm') /* 保存*/,
          icon: '',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-cancel',
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
          labelName: '展车车主：', 
          codeField: 'belowOwner',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          disabled: true,
          isMust: true
        },
        {
          compKey: 'compKey2',
          labelName: '车主电话：', 
          codeField: 'ownerPhone',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey3',
          labelName: '车主邮箱：', 
          codeField: 'ownerEmail',
          isRequire: true,
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          disabled: true,
          isMust: true
        },
        {
          compKey: 'compKey4',
          labelName: '展车说明：',
          codeField: 'belowIllustrate',
          component: () => import('@/components/org/LookupValue'),
          type: 'inputText',
          isMust: true
        }
      ],
      // 标题
      textMap: {
        edit: '展车信息维护', 
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        belowOwner:'',
        ownerPhone:'',
        ownerEmail:'',
        belowIllustrate:''
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

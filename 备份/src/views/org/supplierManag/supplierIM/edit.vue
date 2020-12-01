<!--
* description: 供应商信息管理新增/修改弹窗
* author: liuzf
* createdDate: 2019-11-4
-->
<template>
  <section class="editWholeRoleManage">
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
      <div v-if="!this.isAdd()" class="promptSpan">
        <span>提示：供应商状态一旦改为否则不能逆转操作</span>
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
    const viewPageCode = 'supplierMessage-edit'
    return {

      // 保存API配置对象
      apiConfig: orgApis.mdmOrgInfoMutationSupplierSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.save(),
          text: this.$t('sys.button.save') /* 保存*/,
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
          icon: 'iconfont  icon-reset',
          text: this.$t('sys.button.reset') /* 重置*/
        },
        {
          compKey: 'btnKey3',
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
          labelName: this.$t('org.label.vendorCodes'), // 供应商编码
          codeField: 'orgCode',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          disabled: !this.isAdd(),
          isMust: true
        },
        {
          compKey: 'compKey2',
          labelName: this.$t('org.label.vendorNames'), // 供应商名称
          codeField: 'orgName',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey3',
          labelName: this.$t('org.label.administratorAccount'), // 管理员帐号
          span: 8,
          isRequire: true,
          codeField: 'userName',
          disabled: !this.isAdd(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey4',
          labelName: this.$t('org.label.adminPassword') /* 管理员密码*/,
          codeField: 'password',
          isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey5',
          labelName: this.$t('org.label.administratorRole') /* 管理员角色*/,
          codeField: 'roleId',
          textField: 'roleName',
          roleOrgType: '3',
          isRequire: true,
          span: 8,
          component: () => import('@/components/org/seletRole'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey6',
          labelName: this.$t('org.label.isEnable') /* 是否启用*/,
          codeField: 'isEnable',
          isRequire: true,
          disabled: this.isShowChooes,
          component: () => import('@/components/org/isEnable/isEnable'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey7',
          labelName: '厂商ID',
          codeField: 'orgId',
          span: 8,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: false
        }
      ],
      // 标题
      textMap: {
        edit: this.$t('org.label.ModifySupplierInformation'), // '修改供应商信息',
        add: this.$t('org.label.NewSupplierInformation') // '新增供应商信息'
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        orgName: '',
        orgCode: '',
        userName: '',
        userId: '',
        orgId: '',
        password: '',
        roleId: '',
        isEnable: '',
        updateControlId: ''
      },
      initForm: {}
    }
  },
  created() {

  },
  methods: {
    onCreated() {
      var that = this
      if (that.tableComponents.length === 0) {
        if (that.popupsPageCode && that.popupsPageCode.length > 0) {
        // 读取弹窗配置信息
          CacheConfig.initData(that.popupsPageCode, function() {
            if (CacheConfig.cacheData[that.popupsPageCode] && CacheConfig.cacheData[that.popupsPageCode].formComponents.length > 0) {
              that.tableComponents = CacheConfig.cacheData[that.popupsPageCode].formComponents
            } else {
              that.tableComponents = that.staticTableComponents
            }
            that.popupsTableKey = that.$utils.generateId()
          })
        } else {
          that.tableComponents = that.staticTableComponents
        }
      }
      // 赋值formField
      if (this.popupsState === 'add') {
        this.formField.isEnable = '1'
      }
      if (this.popupsState === 'edit') {
        if (this.isUseRowData) {
          for (var key in this.formField) {
            if (this.dynamicEditRowData[key]) {
              this.formField[key] = this.dynamicEditRowData[key]
            } else {
              if (typeof this.formField[key] === 'number') {
                this.formField[key] = 0
              } else if (typeof this.formField[key] === 'string') {
                this.formField[key] = ''
              }

              // 两层处理
              for (var rKey in this.dynamicEditRowData) {
                if (rKey.indexOf('.') > -1) {
                  var tmpKey = rKey.split('.')[1]
                  if (tmpKey === key) {
                    this.formField[tmpKey] = this.dynamicEditRowData[rKey]
                    break
                  }
                }
              }
            }
          }
          if (this.formField.password === '' && this.formField.userName != '') {
            this.formField.password = '***'
          }
          this.initForm.password = this.formField.password
          this.initForm.roleId = this.formField.roleId
        }
      }
      // 备份fromField（用于重置）
      // 初始化品牌
      if (this.formField.carBrandCode === '' && this.isSetDefaultBrand === true) {
        this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE
      }
      this.backFormField = JSON.parse(JSON.stringify(this.formField))

      // 联动组件获取父组件传值
      that.$nextTick(() => {
      // 监听
        that.watchComp(true)
      })
    },
    // 保存
    save() {
      const that = this
      this.$utils.validataMoth(this, 'validpopup')
      if (this.valid) {
        if (
          this.formField.roleId != this.initForm.roleId &&
          this.formField.password === '***'
        ) {
          this.$message({
            message: '请修改账号密码' /* 请修改管理员信息*/,
            type: 'warning',
            duration: 2000
          })
          this.formField.password = ''
          return
        }
        let obj = {}
        if (
          this.formField.password === '***' &&
          this.formField.roleId === this.initForm.roleId
        ) {
          obj = {
            orgName: this.formField.orgName,
            orgCode: this.formField.orgCode,
            roleId: this.formField.roleId,
            orgId: this.formField.orgId,
            isEnable: this.formField.isEnable,
            updateControlId: this.formField.updateControlId
          }
        } else {
           //对密码进行加密
       let Base64 = require('js-base64').Base64;
       this.formField.password = Base64.encode(this.formField.password);
       
          obj = this.formField
        }
        this.saveForm(obj)
      }
    },
    getComponentCode(val, txt, codeField, comType, popupsKey, textField) {
      if (comType === 'propus' && !this.$utils.isEmpty(popupsKey)) {
        // 弹窗赋值
        // 根据popupsKey找到对应的弹窗key的弹窗组件
        var dynamicPopup = this.dynamicComponents.filter(o => o.compKey === popupsKey)
        if (dynamicPopup.length > 0) {
          if (dynamicPopup[0].popups && dynamicPopup[0].popups.state) {
            // 弹窗状态不是为已打开才进行计算
            dynamicPopup[0].popups.state = false
            dynamicPopup[0].popups.key = codeField + this.$utils.generateId()
          }
        }
      }
      // 赋值
      if (codeField in this.formField) {
        this.formField[codeField] = val
      }
      if (textField in this.formField) {
        this.formField[textField] = txt
      }
      if (this.popupsState === 'edit') {
        if (this.formField.roleId != this.initForm.roleId) {
          if (this.formField.password === '***') {
            this.formField.password = ''
          }
          this.initForm.roleId = this.formField.roleId
        }
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

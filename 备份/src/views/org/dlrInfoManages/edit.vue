<!--
* description: 经销商管理-新增、修改弹窗
* author: dinggf
* createdDate: 2019-10-22
-->
<template>
  <section class="editStore">
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
        <el-row :gutter="26">
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
            :step="comp.step"
            :text="formField[comp.textField]"
            :data-to-object="comp.dataToObject"
            :disabled="comp.disabled"
            :is-require="comp.isRequire"
            :span="comp.span || 8"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :date-type="comp.dateType"
            :format="comp.dateFormat"
            :parent-fileds="comp.parentFileds"
            :input-type="comp.inputType"
            :must-fields="comp.mustFields || ''"
            :date-options-type="comp.dateOptionsType"
            :is-mul="false"
            :clearable="comp.clearable"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
          />
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          v-show="comp.show"
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
  mixins: [formMixins],
  data() {
    // 弹窗页面标识（由引用页面赋值）
    const viewPageCode = 'veDlrInfoManagesEdit'
    return {
      // 保存API配置对象
      apiConfig: orgApis.mdmOrgDlrMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey2',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.mySave(),
          icon: 'iconfont  icon-preservation',
          text: this.$t('sys.button.confirm'),
          show: true
        },
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          icon: 'iconfont  icon-reset',
          text: this.$t('sys.button.reset'),
          show: true
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
          labelName: '经销商大类',
          lookuptype: 'DB0062',
          codeField: 'orgType',
          disabled: true,
          // isRequire: true,
          parentFileds: 'lookupValueCode',
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey2',
          labelName: '经销商类型',
          lookuptype: 'DB0049',
          codeField: 'dlrType',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },

        {
          compKey: 'compKey8',
          labelName: '经销商编码', /* 经销商代码*/
          codeField: 'dlrCode',
          // isRequire: true,
          parentFileds: 'disabled:updateControlId-dlrCode',
          disabled: null,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey12',
          labelName: '经销商级别',
          lookuptype: 'VE9001',
          disabled: true,
          codeField: 'dlrLevel',
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey10',
          labelName: '经销商名称',
          codeField: 'dlrShortName',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey11',
          labelName: '经销商全称',
          codeField: 'dlrFullName',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },

        {
          compKey: 'compKey13',
          labelName: '经销商英文名',
          codeField: 'dlrEnName',
          disabled: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },

        {
          compKey: 'compKey14',
          labelName: '曾用名',
          codeField: 'dlrNameOld',
          disabled: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        // {
        //   compKey: 'compKey30',
        //   labelName: '所属一网',
        //   codeField: 'parentDlrId',
        //   textField: 'parentDlrName',
        //   disabled: false, //! this.isAdd()

        //   component: () => import('@/components/org/orgDlr'),
        //   type: 'propus',
        //   isMust: true
        // },

        {
          compKey: 'compKey6',
          labelName: '主营品牌',
          codeField: 'carBrandCode',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/carBrand/carBrand'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey9',
          labelName: '建店状态',
          lookuptype: 'DB0066',
          codeField: 'dlrStatus',
          disabled: true,
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey24',
          labelName: '注册资金',
          codeField: 'registerMoney',
          disabled: true,
          component: () => import('@/components/org/commonInput/numberInput'),
          step: 1,
          // isRequire: true,
          type: 'inputText',
          validrule: {
            isformat: /^[+]{0,1}(\d+)$/,
            min: 0,
            max: 100000000
          },
          dataToObject: {
            min: 0,
            max: 100000000
          },
          isMust: true
        },
        {
          compKey: 'compKey25',
          labelName: '组织结构代码',
          codeField: 'guno',
          disabled: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey26',
          labelName: '邮箱',
          codeField: 'email',
          disabled: true,
          validrule: { noRequire: false, isEmail: true, min: 8 },
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey16',
          labelName: '管理员账号',
          codeField: 'userName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          // isRequire: true,
          parentFileds: 'disabled:updateControlId-userName',
          disabled: null,
          isMust: true
        },
        {
          compKey: 'compKey17',
          labelName: '管理员密码',
          codeField: 'password',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isRequire: true,
          inputType: 'password',
          isMust: true
        },
        // {
        //   compKey: "compKey18",
        //   labelName: "管理员角色",
        //   lookuptype: "SYS0006",
        //   codeField: "roleId",
        //   component: () => import("@/components/org/LookupValue"),
        //   type: "dropdownList",
        //   isMust: true
        // },
        {
          compKey: 'compKey18',
          labelName: this.$t('org.label.administratorRole') /* 管理员角色*/,
          codeField: 'roleId',
          disabled: true,
          textField: 'roleName',
          isMul: false,
          // isRequire: true,
          parentFileds: 'set:roleOrgType-1',
          mustFields: 'roleOrgType',
          clearable: false,
          component: () => import('@/components/org/seletRole'),
          type: 'dropdownList',
          isMust: true
        },

        {
          compKey: 'compKey3',
          labelName: '上线状态',
          codeField: 'onlineFlag',
          disabled: true,
          lookuptype: 'VE0629',
          // isRequire: true,
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey22',
          labelName: '上线日期',
          codeField: 'dlrBussDate',
          disabled: true,
          // isRequire: true,
          dateType: 'date',
          // dateFormat: 'yyyy-MM-dd HH:mm:ss',
          dateFormat: 'yyyy-MM-dd',
          component: () => import('@/components/org/datePicker/datePicker'),
          type: 'datePicker',
          isMust: true
          // parentFileds: "disabled:dlrBussDate-dlrBussDate",

        },
        {
          compKey: 'compKey4',
          labelName: '省份',
          codeField: 'provinceId',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/ProvinceQuery'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey5',
          labelName: '城市',
          codeField: 'cityId',
          disabled: true,
          parentFileds: 'provinceId',
          // isRequire: true,
          component: () => import('@/components/org/CitySelect'),
          type: 'dropdownList',
          isMust: true
        },

        {
          compKey: 'compKey7',
          labelName: '区县',
          codeField: 'countyId',
          disabled: true,
          parentFileds: 'cityId',
          component: () => import('@/components/org/CountySelect'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey27',
          labelName: '建店地址',
          codeField: 'linkAddr',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },

        // {compKey: "compKey15",labelName: '股权',codeField: "stockRight", disabled: true,component: () => import("@/components/org/commonInput"),type: "inputText",isMust: true},

        // {compKey: "compKey19",labelName: '公司所属城市',codeField: "cityName", disabled: true,component: () => import("@/components/org/commonInput"),type: "inputText",isMust: true},
        {
          compKey: 'compKey20',
          labelName: '气候状态',
          lookuptype: 'VE0180',
          codeField: 'climateStatus',
          disabled: true,
          component: () => import('@/components/org/LookupValue'),
          type: 'dropdownList',
          isMust: true
        },
        {
          compKey: 'compKey35',
          labelName: '救援热线',
          codeField: 'rescuHotline',
          disabled: true,
          validrule: { noRequire: true, isTel: true },
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey31',
          labelName: '紧急救援电话',
          codeField: 'urgSosTel',
          disabled: true,
          // isRequire: true,
          validrule: { noRequire: true, isPhone: true },
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true
        },
        {
          compKey: 'compKey21',
          labelName: '', // 启用中台
          codeField: 'isEnable',
          disabled: true,
          component: () => import('@/components/org/isEnable/isEnableOne'),
          type: 'dropdownList',
          isMust: true
        },

        // {compKey: "compKey23",labelName: '停业日期',codeField: "closingTime",disabled: true,component: () => import("@/components/org/commonInput"),type: "inputText",isMust: true,disabled: !this.isAdd(),},

        {
          compKey: 'compKey29',
          labelName: '并发控制id',
          codeField: 'updateControlId',
          disabled: true,
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: false
        }
      ],
      textMap: {
        edit: '经销商详情查看',
        add: '经销商增加'
      },
      formField: this.$utils.getFormField(this, {
        roleOrgType: 1,
        orgType: '',
        dlrSort: '',
        onlineFlag: '',
        provinceId: '',
        cityId: '',
        countyId: '',
        dlrCode: '',
        dlrShortName: '',
        dlrFullName: '',
        dlrLevel: '',
        dlrEnName: '',
        dlrNameOld: '',
        // stockRight: '',
        userName: '',
        password: '',
        roleId: '',
        climateStatus: '',
        isEnable: '',
        dlrBussDate: '',
        registerMoney: 0,
        guno: '',
        email: '',
        linkAddr: '',
        carBrandCode: '',
        updateControlId: '',
        dlrId: '',
        dlrType: '',
        dlrStatus: '',
        urgSosTel: '',
        // parentDlrId: '',
        rescuHotline: '',
        parentDlrName: '',
        lookupValueCode: '1',
        userId: ''
        // dlrTypeName: ''
        // cityName: '',
        // orgTypeName: '',
        // dlrStatusName: ''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode], null, 'formComponents'),

      isChangeEnable: '',
      isChangeRoleId: ''
    }
  },
  watch: {
    'formField.roleId'(newVal, oldVal) {
      if (this.curPopupsVisible == true) {
        if (oldVal != newVal) {
          this.isChangeRoleId = '1'
        } else {
          (
            this.isChangeRoleId = ''
          )
        }
      }
    },
    'formField.isEnable'(newVal, oldVal) {
      if (this.curPopupsVisible == true) {
        if (oldVal != newVal) {
          this.isChangeEnable = '1'
        } else {
          (
            this.isChangeEnable = ''
          )
        }
      }
    }

  },
  methods: {
    // 初始化密码
    onCreated() {
      if (this.popupsState === 'edit') {
        this.formField.password = '***'
      }
    },
    mySave() {
      debugger
      const that = this
      delete this.formField.roleOrgType
      delete this.formField.parentDlrName
      this.$utils.validataMoth(this, 'validpopup')

      const saveObj = {}
      this.$utils.deepClone(saveObj, this.formField)

      saveObj.lookupValueCode = undefined
      debugger
      if (this.valid) {
        if (this.popupsState === 'edit' && saveObj.password === '***') {
          // saveObj.userName = undefined
          saveObj.password = undefined
        } else {
          // 对密码进行加密
          const Base64 = require('js-base64').Base64
          saveObj.password = Base64.encode(saveObj.password)
        }
        // 是否修改角色和状态

        if (this.isChangeEnable == '' && this.isChangeRoleId == '' && saveObj.password !== '***') {
          saveObj.userId = undefined
        }
        const length = [...saveObj.dlrBussDate].length
        if (length <= 10) {
          if (saveObj.dlrBussDate !== '') {
            saveObj.dlrBussDate = saveObj.dlrBussDate + ' 00:00:00'
          }
          // else{
          //    let date = new Date();
          //    var year = date.getFullYear();
          //    var month = date.getMonth() + 1;
          //    var day = date.getDate();
          //   if (month < 10) {
          //     month = "0" + month;
          //    }
          //   if (day < 10) {
          //       day = "0" + day;
          //   }
          //   var nowBussDate = year + '-' + month + '-' + day + ' 00:00:00';
          //   saveObj.dlrBussDate= nowBussDate
          // }
        }

        this.saveForm(saveObj)
      }
      this.$emit('queryTree')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .filter-params .el-row {
  margin-right: 20px !important;
}
</style>

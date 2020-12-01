<!--
* description: 业务岗位管理-新增、修改弹窗
* author: liyanm
* createdDate: 2019-08-04
-->
<template>
  <section class="editCarBrand">
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
            :other-field="comp.otherField"
            :validrule="comp.validrule"
            :code-field="comp.codeField"
            :parent-fileds="comp.parentFileds"
            :is-show="comp.isShow"
            :text-field="comp.textField"
            :popups-key="comp.compKey"
            :data-to-object="comp.dataToObject"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            :disabled="comp.disabled"
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
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          :icon="comp.icon"
          @click="comp.clickEvent"
        >{{ comp.text }}</el-button>
      </div>
    </el-dialog>
    <!-- <edit @changeCode="getComponentCode1"></edit> -->
  </section>
</template>
<script>
import { formMixins } from '@/components/mixins/formMixins'
import { orgApis } from '@/api/apiList/org'
export default {
  components: {
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  // props: {
  //   deptName: {
  //     type: String,
  //     default: function() {
  //       return "";
  //     }
  //   }
  // },

  // 组件混入对象
  mixins: [formMixins],
  data() {
    const viewPageCode = 'businessPosts-Edit'
    return {
      // 表单校验规则
      validrule: { type: Object, default: () => {} },
      // 保存API配置对象
      apiConfig: orgApis.mdmOrgStationMutationSaveById,
      // curDeptName: this.deptName,
      spanCom: 8,
      disabledCom: true,
      orgName: '',
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey3',
          type: 'primary',
          size: 'small',
          icon: 'iconfont  icon-preservation',
          clickEvent: () => this.save(),
          text: this.$t('sys.button.save') // 保存
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-reset',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset') // 重置
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-cancel',
          clickEvent: () => this.sendCode(),
          text: this.$t('sys.button.cancel') // 取消
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [
            {
              compKey: 'compKey13',
              labelName: this.$t('org.label.StationCode'),
              /* 业务岗位编码*/ codeField: 'stationCode',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isShow: false,
              parentFileds: 'show:updateControlId--',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey15',
              labelName: this.$t('org.label.StationCode'),
              /* 业务岗位编码*/ codeField: 'stationCode',
              isRequire: true,
              component: () =>
                import('@/components/org/commonInput/indexprepend'),
              type: 'inputText',
              isShow: false,
              parentFileds: 'show:updateControlId-',
              disabled: false,
              dataToObject: {
                prepend: this.$store.getters.orgInfo.DLR_CODE,
                maxWordCount: 6
              },
              isMust: true
            },
            // {
            //   compKey: "compKey1",
            //   labelName: this.$t("org.label.StationCode"),//业务岗位编码
            //   codeField: "stationCode",
            //   isRequire: true,
            //   component: () => import("@/components/org/commonInput"),
            //   type: "inputText",
            //    disabled: this.popupsState == "edit" ? true : false,
            //   isMust: true
            // },
            {
              compKey: 'compKey2',
              labelName: this.$t('org.label.StationName'), // 业务岗位名称
              codeField: 'stationName',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: this.$t('org.label.affiliatedOrganization'), // 所属组织
              codeField: 'deptId',
              otherField: 'orgTreeId-orgId',
              textField: 'deptName',
              isRequire: true,
              dataToObject: { orgBelongType: true },
              component: () => import('./orgNameInput'),
              type: 'propus',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: this.$t('org.label.isEnableCn'), // 是否启用
              codeField: 'isEnable',
              isRequire: true,
              component: () =>
                import('@/components/org/isEnable/isEnableOne'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: this.$t('org.label.correspondingWorkbenchScheme'), // 对应工作台方案
              lookuptype: 'VE0637',
              codeField: 'column1',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            }
          ],
      editRowData: {},
      // 标题
      textMap: {
        edit: this.$t('sys.button.modify'), // 修改
        add: this.$t('sys.button.add') // 新增
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(
        this,
        {
          // orgBelongType:"8",
          deptId: '',
          stationName: '',
          stationId: '',
          stationCode: '',
          orgId: '',
          deptName: '',
          isEnable: '',
          updateControlId: '',
          column1: ''
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode],
        null,
        'formComponents'
      )
    }
  },
  created() {},
  // mounted() {
  //   if(this.popupsState == "edit"){
  //   if (this.$parent.$refs.multipleTable.currentRow.deptId !== undefined) {
  //     this.formField.deptId = this.$parent.$refs.multipleTable.currentRow.deptId;
  //     this.formField.deptName = this.$parent.$refs.multipleTable.currentRow.deptName;
  //   }
  //   }
  // },
  // watch: {
  //   "formField.updateControlId"(val) {
  //     if (val !== "") {
  //       this.orgName = this.editRowData.deptName;
  //     }
  //   },
  // },
  methods: {
    // 获取组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:组件类型（预留）
    getComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData) {
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
      if (codeField.indexOf(',') > -1 && (val === '' || (val.indexOf(',') > -1 && codeField.split(',').length === val.split(',').length))) {
        // 双日期处理
        const arrCoodField = codeField.split(',')
        const arrVal = val.split(',')
        for (let i = 0; i < arrCoodField.length; i++) {
          // 双日期不许判断是否存在
          this.formField[arrCoodField[i]] = val === '' ? '' : arrVal[i]
        }
      } else {
        if (codeField in this.formField) {
          this.formField[codeField] = val
        }
      }
      if (textField in this.formField) {
        this.formField[textField] = txt
      }
      // 赋值其它
      this.setOtherField(comType, otherField, selectData)
      if (codeField === 'deptId') {
        this.formField.orgId = selectData.orgTreeId
      }
    },
    save() {
      this.$utils.validataMoth(this, 'validpopup')
      if (this.valid) {
        const that = this
        if (this.popupsState == 'add') {
          this.formField.stationCode =
          this.$store.getters.orgInfo.DLR_CODE === null
            ? this.formField.stationCode
            : this.$store.getters.orgInfo.DLR_CODE + this.formField.stationCode
        }
        const saveFormField = JSON.parse(JSON.stringify(this.formField))
        saveFormField.deptName = undefined
        this.saveForm(saveFormField, function(response, response1) {
          if (that.popupsState == 'add') {
            that.formField.stationCode =
            that.$store.getters.orgInfo.DLR_CODE === null
              ? that.formField.stationCode
              : that.formField.stationCode.replace(that.$store.getters.orgInfo.DLR_CODE, '')
          }
        })
      }
    }
    // checkBox() {
    //   this.$children[1].curPopupsVisible = true;
    // },
    // getComponentCode1(val) {
    // this.$children[1].curPopupsVisible = false;
    // if
    //   this.orgName = this.$children[1].sendData.name;
    //   this.formField.deptId = this.$children[1].sendData.orgCode;
    // }
    //     console.log(val)
    //     console.log(this)
    // }
  }
}
</script>

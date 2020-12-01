<!--
* description: 省份管理-新增、修改弹窗
* author: linzewen
* createdDate: 2019-08-07
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
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
            :disabled="comp.disabled"
            :is-require="comp.isRequire"
            :span="comp.span || 8"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :date-options-type="comp.dateOptionsType"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
          />
        </el-row>
      </div>

      <component
        :is="comp.popups.component"
        v-for="comp in tableComponents.filter(o => o.type === 'popupsInput')"
        :key="comp.popups.key"
        :code-field="comp.codeField"
        :popups-visible="comp.popups.state"
        :com-type="comp.popups.type"
        :popups-key="comp.compKey"
        :code="formField[comp.codeField]"
        @changeCode="getComponentCode"
      />

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
export default { components: {
  dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
},
// 组件混入对象
mixins: [formMixins],
data() {
  return {
    // 保存API配置对象
    apiConfig: orgApis.mdmOrgProvinceMutationSave,
    // 动态组件-按钮
    tableButtons: [
      {
        compKey: 'btnKey1',
        type: 'primary',
        size: 'small',
        icon: 'iconfont  icon-preservation',
        clickEvent: () => this.save(),
        text: this.$t('sys.button.save') /* 保存*/
      },
      {
        compKey: 'btnKey2',
        type: '',
        size: 'small',
        icon: 'iconfont  icon-reset',
        clickEvent: () => this.reset(),
        text: this.$t('sys.button.reset') /* 重置*/
      },
      {
        compKey: 'btnKey3',
        type: '',
        size: 'small',
        icon: 'iconfont  icon-cancel',
        clickEvent: () => this.sendCode(),
        text: this.$t('sys.button.cancel') /* 取消*/
      }
    ],
    // 动态组件-查询条件
    tableComponents: [],
    // 静态组件-查询条件
    staticTableComponents: [
      {
        compKey: 'compKey1',
        labelName: this.$t('org.label.provinceId') /* 省份编码*/,
        codeField: 'provinceCode',
        isRequire: true,
        component: () => import('@/components/org/commonInput'),
        type: 'inputText',
        isMust: true,
        disabled: !this.isAdd()
      },
      {
        compKey: 'compKey2',
        labelName: this.$t('org.label.provinceName') /* 省份名称*/,
        codeField: 'provinceName',
        isRequire: true,
        component: () => import('@/components/org/commonInput'),
        type: 'inputText',
        isMust: true
      },
      {
        compKey: 'compKey3',
        labelName: this.$t('org.label.sort') /* 排序*/,
        codeField: 'orderNo',
        component: () => import('@/components/org/commonInput'),
        type: 'inputText',
        isMust: true
      },
      {
        compKey: 'compKey4',
        labelName: this.$t('org.label.isEnableCn') /* 启用状态*/,
        isRequire: true,
        codeField: 'isEnable',
        component: () => import('@/components/org/isEnable/isEnableOne'),
        type: 'dropdownList',
        isMust: true
      }
    ],
    // 标题
    textMap: {
      edit: this.$t('org.label.editProvinceMsg') /* 修改省份信息*/,
      add: this.$t('org.label.addProvinceMsg') /* 添加省份信息*/
    },
    // 表单数据（无需赋值，由混入对象赋值）
    formField: {
      provinceCode: '',
      provinceName: '',
      orderNo: '',
      isEnable: '',
      provinceId: '',
      updateControlId: ''
    }
  }
},
created() {
  var that = this
  if (that.tableComponents.length === 0) {
    if (that.popupsPageCode && that.popupsPageCode.length > 0) {
      // 读取弹窗配置信息
      Vue.prototype.$ConfigCache.CacheConfig.initData(that.popupsPageCode, function() {
        if (this.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode] && this.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].formComponents.length > 0) {
          that.tableComponents = this.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].formComponents
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
  if (this.popupsState === 'edit') {
    let orderNo = ''
    if (this.dynamicEditRowData.orderNo != null) {
      orderNo = this.dynamicEditRowData.orderNo.toString()
    }
    this.dynamicEditRowData.orderNo = orderNo
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
methods: {
  // 重置
  //   resetTable(){
  //       const that = this;
  //       debugger
  //       that.formField.cityCode = that.editRowData.cityCode;
  //       that.formField.cityName = that.editRowData.cityName;
  //       that.formField.provinceId = that.editRowData.provinceId;
  //       that.formField.status = that.editRowData.status;
  //   },
  // 保存
  save() {
    const that = this

    // if (that.$utils.isEmpty(that.formField.provinceCode)) {
    //   that.$message({
    //     message: '请输入省份编码',
    //     type: 'warning',
    //     duration: 2000
    //   });
    //   return;
    // }
    // if (that.$utils.isEmpty(that.formField.provinceName)) {
    //   that.$message({
    //     message: '请输入省份名称',
    //     type: 'warning',
    //     duration: 2000
    //   });
    //   return;
    // }
    if (this.formField.orderNo === '') {
      this.formField.orderNo = '255'
    }
    this.$utils.validataMoth(this, 'validpopup')
    if (this.valid) {
      // 保存表单
      this.saveForm()
    }
  }
}
}
</script>

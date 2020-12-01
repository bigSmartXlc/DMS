<!--
* description: 经销商信息管理弹窗
* author: yangsq
* createdDate: 2020-5-27
-->
<template>
  <section class="editWholeRoleManage">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="经销商信息查看"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      width="1000px"
      @close="sendCode"
    >
      <dialogHeader
        slot="title"
        :title="'经销商信息查看'"
        :style-type="$store.state.app.dialogType"
      />
      <div class="filter-container filter-params">
        <el-row v-for="page in getPageArea()" :key="page.compKey" :gutter="26">
          <div v-if="page.pageArea !== ''" class="filter-container filter-title">{{ page.pageArea }}</div>
          <component
            :is="comp.component"
            v-for="comp in tableComponents.filter(
              o =>
                o.isMust === true &&
                ((page.pageArea === '' && !o.pageArea) ||
                  o.pageArea === page.pageArea)
            )"
            :ref="comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey"
            :key="comp.compKey"
            :code-field="comp.codeField"
            :text-field="comp.textField"
            :popups-key="comp.compKey"
            :parent-fileds="comp.parentFileds"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            :disabled="comp.disabled"
            :is-mul="comp.isMul"
            :step="comp.step"
            :show-placeholder="comp.showPlaceholder"
            :data-to-object="comp.dataToObject"
            :date-options-type="comp.dateOptionsType"
            :readonly="comp.readonly"
            :is-func="comp.isFunc"
            :must-fields="comp.mustFields"
            :is-require="comp.isRequire"
            :span="comp.span || 8"
            :other-field="comp.otherField"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            class="filter-connet"
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
    return {
      popupsPageCode: 'dlrInfoManagesEdit',
      // 保存API配置对象
      apiConfig: orgApis.veBuContractSave,
      curPopupsVisible: this.dialogVisible,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          icon: 'iconfont  icon-confirm',
          clickEvent: () => this.close1(),
          text: '关闭'
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: 'compKey1',
          pageArea: '经销商基本信息',
          labelName: '网点编码',
          codeField: 'dlrCode',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey3',
          pageArea: '经销商基本信息',
          labelName: '网点简称',
          codeField: 'dlrShortName',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey4',
          pageArea: '经销商基本信息',
          labelName: '网点全称',
          codeField: 'dlrFullName',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey5',
          pageArea: '经销商基本信息',
          labelName: '所属大区',
          codeField: 'bigAreaName',
          // // isRequire: true,
          // component: () => import("@/components/org/BigArea"),
          // type: "propus",
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey6',
          pageArea: '经销商基本信息',
          labelName: '所属小区',
          codeField: 'smallAreaName',
          // // isRequire: true,
          // parentFileds: "value:bigAreaId-bigAreaId",
          // component: () => import("@/components/org/SmallArea/index.vue"),
          // type: "propus",
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey7',
          pageArea: '经销商基本信息',
          labelName: '所属省份',
          codeField: 'provinceName',
          // parentFileds: "value:bigAreaId-smallAreaId",
          // // isRequire: true,
          // component: () => import('@/components/org/ProvinceQuery'),
          // type: 'inputText',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey8',
          pageArea: '经销商基本信息',
          labelName: '所属城市',
          codeField: 'cityName',
          // parentFileds: 'provinceId-provinceId',
          // // isRequire: true,
          // component: () => import('@/components/org/CitySelect'),
          // type: 'inputText',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey9',
          pageArea: '经销商基本信息',
          labelName: '邮政编码',
          codeField: 'zip',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey10',
          pageArea: '经销商基本信息',
          labelName: '网点地址',
          codeField: 'linkAddr',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey11',
          pageArea: '经销商基本信息',
          labelName: '总经理',
          codeField: 'respName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey12',
          pageArea: '经销商基本信息',
          labelName: '总经理电话',
          codeField: 'respPhone',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey13',
          pageArea: '经销商基本信息',
          labelName: '总经理手机',
          codeField: 'respmobile',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey14',
          pageArea: '经销商基本信息',
          labelName: '总经理EMAIL',
          codeField: 'respEmail',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey15',
          pageArea: '经销商基本信息',
          labelName: '注册编号',
          // isRequire: true,
          codeField: 'registerNo',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey16',
          pageArea: '经销商基本信息',
          labelName: '网点类型',
          codeField: 'orgTypeName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey17',
          pageArea: '经销商基本信息',
          labelName: '开业时间',
        //   disabled: !this.isAdd(),
          // isRequire: true,
          codeField: 'dlrBussDate',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey18',
          pageArea: '经销商基本信息',
          labelName: '服务电话',
          codeField: 'phone',
          // isRequire: true,
        //   disabled: !this.isAdd(),
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey19',
          pageArea: '经销商财务信息',
          labelName: '增值税号',
          codeField: 'taxNo',
        //   parentFileds: 'disabled:buyTypeId-loanBankCode-2-true',
          disabled: null,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey20',
          pageArea: '经销商财务信息',
          labelName: '纳税人类型',
        //   parentFileds: 'disabled:buyTypeId-loanBankPay-2-true',
          codeField: 'faxerTypeName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey21',
          pageArea: '经销商财务信息',
          labelName: '开户银行',
          codeField: 'invBank',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey22',
          pageArea: '经销商财务信息',
          labelName: '银行账号',
        //   parentFileds: 'disabled:buyTypeId-loanPoundage-2-true',
          codeField: 'invAccount',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey23',
          pageArea: '经销商财务信息',
          // isRequire: true,
          labelName: '开票名称',
        //   disabled: !this.isAdd(),
          codeField: 'invName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey24',
          pageArea: '经销商财务信息',
          labelName: '开票地址',
          codeField: 'invAddr',
        //   disabled: !this.isAdd(),
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey25',
          pageArea: '经销商财务信息',
          labelName: '财务联系人',
          codeField: 'financemName',
        //   disabled: !this.isAdd(),
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey26',
          pageArea: '经销商财务信息',
          labelName: '财务联系人电话',
          // disabled: !this.isAdd(),
          // isRequire: true,
          codeField: 'financemPhone',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey27',
          pageArea: '经销商财务信息',
          labelName: '财务联系人手机',
          codeField: 'financemMobile',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey28',
          pageArea: '经销商财务信息',
          labelName: '财务联系人EAMIL',
          codeField: 'financemEmail',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey29',
          pageArea: '经销商财务信息',
          labelName: '财务联系人邮编',
          codeField: 'financemZip',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey30',
          pageArea: '经销商财务信息',
          labelName: '财务联系人地址',
          codeField: 'financemAddr',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey31',
          pageArea: '销售部经销商信息',
          labelName: '销售等级',
          codeField: 'dlrLevelName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey32',
          pageArea: '销售部经销商信息',
          labelName: '使用状态',
          codeField: 'isEnableName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey33',
          pageArea: '销售部经销商信息',
          labelName: '销售经理',
          codeField: 'salemName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey34',
          pageArea: '销售部经销商信息',
          labelName: '销售经理电话',
          codeField: 'salemPhone',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey362',
          pageArea: '销售部经销商信息',
          labelName: '销售经理手机',
          codeField: 'salemMobile',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey35',
          pageArea: '销售部经销商信息',
          labelName: '销售经理EMAIL',
          codeField: 'salemEmail',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey36',
          pageArea: '销售部经销商信息',
          labelName: '业务助理',
          codeField: 'assistantName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey37',
          pageArea: '销售部经销商信息',
          labelName: '业务助理电话',
          codeField: 'assistantPhone',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey38',
          pageArea: '销售部经销商信息',
          labelName: '业务助理手机',
          codeField: 'assistantMobile',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey39',
          pageArea: '销售部经销商信息',
          labelName: '业务助理EMAIL',
          codeField: 'assistantEmail',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey40',
          pageArea: '销售部经销商信息',
          labelName: '销售热线',
          codeField: 'saleTel',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey41',
          pageArea: '销售部经销商信息',
          labelName: '传真',
          codeField: 'fax',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey42',
          pageArea: '销售部经销商信息',
          labelName: 'ANSWER编码',
          codeField: 'dlrAnswerCode',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey43',
          pageArea: '销售部经销商信息',
          labelName: '销售联络EAMIL',
          codeField: 'saleEmail',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey44',
          pageArea: '销售部经销商信息',
          labelName: '车型组',
          codeField: 'carTypeGroup',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey45',
          pageArea: '销售部经销商信息',
          labelName: 'SAP编码',
          codeField: 'sapDlrId',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey46',
          pageArea: '销售部经销商信息',
          labelName: '整车收货联系人',
          codeField: 'warHouseContact',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey47',
          pageArea: '销售部经销商信息',
          labelName: '整车收货联系电话',
          codeField: 'warHouseContactPhone',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey48',
          pageArea: '销售部经销商信息',
          labelName: '整车收货联系手机',
          // isRequire: true,
          codeField: 'warHouseContactmobile',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey49',
          pageArea: '销售部经销商信息',
          labelName: '整车收货人EAMIL',
          codeField: 'warHouseContactEmail',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey50',
          pageArea: '销售部经销商信息',
          labelName: '整车收货邮编',
          codeField: 'warHouseZip',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey51',
          pageArea: '销售部经销商信息',
          labelName: '整车收货地址名称',
          codeField: 'warHouseName',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey52',
          pageArea: '销售部经销商信息',
          labelName: '序号',
          codeField: 'warHouseSerial',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey53',
          pageArea: '销售部经销商信息',
          labelName: '整车收货地址编码',
          codeField: 'warHouseCode',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        },
        {
          compKey: 'compKey54',
          pageArea: '销售部经销商信息',
          labelName: '整车收货地址',
          codeField: 'warHouseAddr',
          // isRequire: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          readonly: true,
        }
      ],
      // 标题
      textMap: {
        edit: '经销商信息查看',
        add: '新增经销商'
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        carBrandCode:'',
        carBrandCn:'',
        dlrId:'',
        dlrCode:'',
        dlrShortName:'',
        dlrFullName:'',
        bigAreaId:'',
        smallAreaId:'',
        provinceId:'',
        cityId:'',
        bigAreaName:'',
        smallAreaName:'',
        provinceName:'',
        cityName:'',
        zip:'',
        linkAddr:'',
        respName:'',
        respPhone:'',
        respmobile:'',
        respEmail:'',
        registerNo:'',
        orgTypeCode:'',
        orgTypeName:'',
        dlrBussDate:'',
        phone:'',
        taxNo:'',
        // column3:'',
        faxerTypeName:'',
        invBank:'',
        invAccount:'',
        invName:'',
        invAddr:'',
        financemName :'',
        financemPhone:'',
        financemMobile:'',
        financemEmail:'',
        financemZip:'',
        financemAddr:'',
        dlrLevel:'',
        dlrLevelName:'',
        isEnable:'',
        isEnableName:'',
        salemName:'',
        salemPhone:'',
        salemMobile:'',
        salemEmail:'',
        assistantName:'',
        assistantPhone:'',
        assistantMobile:'',
        assistantEmail:'',
        saleTel:'',
        fax:'',
        dlrAnswerCode:'',
        saleEmail:'',
        carTypeGroup:'',
        sapDlrId:'',
        warHouseContact:'',
        warHouseContactPhone:'',
        warHouseContactmobile:'',
        warHouseContactEmail:'',
        warHouseZip:'',
        warHouseName:'',
        warHouseSerial:'',
        warHouseCode:'',
        warHouseAddr:'',
      }
    }
  },
  methods: {
    close1(){
      this.close()
    }
  }
}
</script>

<template>
  <el-dialog
    v-dialogDrag
    :visible="popupsVisible"
    :title="titleName"
    center
    width="60%"
    top="2rem"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="closeEdit"
  >
    <dialogHeader slot="title" :title="titleName" :style-type="$store.state.app.dialogType" />
    <div class="filter-container filter-params">
      <!-- 表单组件 -->
      <mix-form
        ref="multipleForm"
        :dynamic-form-fields="dynamicFormFields"
        :dynamic-fields-data="dynamicFieldsData"
      />
      <!-- 按钮组件 -->
      <mix-button
        class="app-common-mar"
        :dynamic-buttons="dynamicButtons"
        :dynamic-components="dynamicFormFields"
        :template-type="true"
      />
    </div>
  </el-dialog>
</template>

<script>
import dialogHeader from '@/components/dialogHeader'
import mixForm from '@/components/basicComponent/mixForm'
import mixButton from '@/components/basicComponent/mixButton'
export default {
  components: {
    mixForm,
    mixButton,
    dialogHeader
  },
  props: {
    popupsVisible: {
      type: Boolean,
      default: false
    },
    dataForForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      titleName: '激活',
      // 动态组件-查询条件
      dynamicFormFields: [
        {
          compKey: 'compKey1',
          label: '客户姓名',
          isRequire: true,
          codeField: 'orderCode',
          isComponent: true,
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMust: true,
          span: 8,
          sendCode: () => { },
          focusCode: () => { },
          changeCode: (val) => {
            console.log(val, this.dynamicFieldsData)
            this.dynamicFieldsData.orderCode = val
          }
        },
        {
          compKey: 'compKey2',
          span: 8,
          sendCode: () => { },
          focusCode: () => { },
          changeCode: (val) => {
            this.dynamicFieldsData.orgcode = val
          },
          isComponent: true,
          label: 'UserID', // 供应商名称
          codeField: 'orgcode',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMul: false,
          isMust: true
        },
        {
          compKey: 'compKey3',
          span: 8,
          sendCode: () => { },
          focusCode: () => { },
          changeCode: (val) => {
            this.dynamicFieldsData.pName = val
          },
          isComponent: true,
          label: '联系电话', // 供应商名称
          isRequire: true,
          codeField: 'pName',
          component: () => import('@/components/org/commonInput'),
          type: 'inputText',
          isMul: false,
          isMust: true
        },
        {
          compKey: 'compKey4',
          span: 6,
          sendCode: () => { },
          focusCode: () => { },
          changeCode: (val) => {
            this.dynamicFieldsData.isInvoice = val
          },
          isComponent: true,
          label: '身份证正面', // '启用状态',I
          codeField: 'isInvoice',
          component: () => import('@/components/upload/imgUpload'),
          isMust: true
        },
        {
          compKey: 'compKey5',
          span: 6,
          sendCode: () => { },
          focusCode: () => { },
          changeCode: (val) => {
            this.dynamicFieldsData.isVAT = val
          },
          isComponent: true,
          label: '身份证反面', // '启用状态',
          codeField: 'isVAT',
          component: () => import('@/components/upload/imgUpload')
        }
      ],
      // form 的表单对象
      dynamicFieldsData: {
        orderCode: '', // 供应商编码
        orgcode: '', // 供应商名称
        pName: '', // 是否可用
        isInvoice: '',
        isVAT: '',
        vin: '',
        iscenter: '',
        ispeople: '',
        orderp: '',
        orderphone: '',
        ordertime: '',
        isorder: '' },
      // 动态组件-按钮
      dynamicButtons: [
        {
          name: 'preservation',
          text: '激活',
          clickEvent: this.save,
          position: 'right',
          isMust: false,
          type: 'primary'
        },
        {
          name: 'reset',
          text: '取消',
          clickEvent: () => this.closeEdit(),
          position: 'right'
        }
      ]
    }
  },
  mounted() {
    // this.initData()
  },
  methods: {
    // form表单组件每个元素所占栅格栏数每行24格
    spanNum() {
      return 24
    },

    // 关闭弹窗
    closeEdit(type) {
      this.$emit('close', type)
    },

    // 表单数据初始化
    initData() {
      if (JSON.stringify(this.dataForForm) === '{}') {
        this.titleName = '新增'
        return
      } else {
        this.titleName = '修改'
        this.dynamicFieldsData = this.dataForForm
      }
    },
    // 保存
    save() {
      this.$emit('save', this.dynamicFieldsData)
    },

    // 重置
    resetData() {
      const that = this
      this.dynamicFieldsData.forEach((e, i) => {
        that.dynamicFieldsData[e.codeField] = ''
      })
      this.$refs['multipleForm'].$children[0].clearValidate()
    }
  }
}
</script>


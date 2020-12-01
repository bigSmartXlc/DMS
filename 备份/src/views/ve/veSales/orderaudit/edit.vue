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
      <one-table-template
        ref="multipleTable"
        :dynamic-buttons="tableButtons"
        :dynamic-components="tableComponents"
        :dynamic-api-config="apiConfig"
        :dynamic-form-fields="formField"
        :dynamic-is-show-select="true"
        :dynamic-is-show-more-btn="true"
        :dynamic-table-defult-height="300"
        :callback-obj="callbackObj"
      />
      <div style="text-align:center">
        <h3>增值税电子发票</h3>
        <el-image
          style="width: 70%"
          :src="formField.url"
          :fit="formField.contain"
        />
      </div>
      <!-- 按钮组件 -->
      <mix-button
        class="app-common-mar"
        :dynamic-buttons="dynamicButtons"
        :template-type="true"
      />
    </div>
  </el-dialog>
</template>

<script>
import dialogHeader from '@/components/dialogHeader'
import OneTableTemplate from '@/components/templates/oneTable'
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import mixButton from '@/components/basicComponent/mixButton'
export default {
  components: {
    OneTableTemplate,
    mixButton,
    dialogHeader
  },
  mixins: [oneTableWithViewTemplateMixins],
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
      tableHeight: 310,
      carTypeShow: false,
      titleName: '机动车开票',
      apiConfig: orgApis.orderInvoice,
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
            .tableComponents
          : [
            // 显示组件
            {
              compKey: 'compKey1',
              labelName: '收票人邮箱/手机号码',
              codeField: 'num',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              isMul: false,
              span: 12,
              isMust: true
            },
            {
              compKey: 'compKey2',
              codeField: 'rebatetype',
              labelName: '是否冲账',
              component: () => import('@/components/org/radioBox/index.vue'),
              type: 'radio',
              isMust: true,
              span: 24,
              options: [
                { value: 'Z002', label: '冲账' },
                { value: 'Z001', label: '不冲账' }
              ]
            }
          ],
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          // clickEvent: () => this.queryTable(1),
          text: '作废',
          name: 'search',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          // clickEvent: () => this.reset(),
          text: '冲红',
          name: 'reset',
          position: 'right'
        }
      ],
      // form 的表单对象
      formField: {
        rebatetype: '',
        num: '',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606107881444&di=417758abcfb1e3b2cc9b531c65f1583d&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg',
        contain: 'contain'
      },
      // 回调
      callbackObj: {},
      // 动态组件-按钮
      dynamicButtons: [
        {
          name: 'preservation',
          text: '确定',
          // clickEvent:,
          position: 'right',
          isMust: false,
          type: 'primary'
        },
        {
          name: 'reset',
          text: '取消',
          // clickEvent:,
          position: 'right'
        }
      ]
    }
  },
  mounted() {
    this.initData()
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
      // if (JSON.stringify(this.dataForForm) === '{}') {
      //   this.titleName = '新增'
      //   return
      // } else {
      //   this.titleName = '修改'
      //   this.dynamicFieldsData = this.dataForForm
      // }
    },
    // 保存
    // save() {
    // this.$emit('save', this.dynamicFieldsData)
    // },

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


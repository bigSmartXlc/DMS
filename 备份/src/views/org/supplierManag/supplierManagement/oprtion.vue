<!--
* description: 成员管理-新增、修改弹窗
* author: mjq
* createdDate: 2019-08-14
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
        <el-row ref="vailComponentList" :gutter="26">
          <component
            :is="comp.component"
            v-for="comp in tableComponents.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :validrule="comp.validrule"
            :code-field="comp.codeField"
            :dept-id="comp.deptId"
            :text-field="comp.textField"
            :popups-key="comp.compKey"
            :readonly="comp.readonly"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            :disabled="comp.disabled"
            :parent-fileds="comp.parentFileds"
            :is-require="comp.isRequire"
            :is-mul="comp.isMul"
            :input-type="comp.inputType"
            :span="comp.span || 8"
            :label-name="comp.labelName"
            :format="comp.format"
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
  </section>
</template>
<script>
import { formMixins } from '@/components/mixins/formMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/popupsOneTable'
export default {
  components: {
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  // 组件混入对象
  mixins: [formMixins],
  props: {
    roleOrgType: {
      type: String,
      default: function() {
        return ''
      }
    },
    handleVisible: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    handleTitle: {
      type: Number,
      default: function() {
        return 1
      }
    },
    showOrgName: {
      type: String,
      default: function() {
        return ''
      }
    },
    dlrId: {
      type: String,
      default: function() {
        return ''
      }
    },
    dlrCode: {
      type: String,
      default: function() {
        return ''
      }
    },
    showOrgRealId: {
      type: String,
      default: function() {
        return ''
      }
    },
    showroleId: {
      type: String,
      default: function() {
        return ''
      }
    }
  },

  data() {
    const viewPageCode = 'supplierEmployee-Edit'
    return {
      popupsPageCode: 'supplierEmployee-Edit',
      businessDates: '',
      driverDates: '',
      leaveDates: '',
      employDates: '',
      birthDates: '',

      // 保存API配置对象
      apiConfig: orgApis.mdmOrgEmployeeMutationSaveById,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey3',
          type: 'primary',
          size: 'small',
          icon: 'iconfont  icon-preservation',
          clickEvent: () => this.save1(),
          text: this.$t('sys.button.save')
        } /* 确认*/,
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-reset',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset')
        } /* 重置*/,
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-cancel',
          clickEvent: () => this.sendCode(),
          text: this.$t('sys.button.cancel')
        } /* 取消*/
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [
            {
              compKey: 'compKey1',
              labelName: this.$t('org.label.empCode'), /* 员工编码*/
              codeField: 'empCode',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: this.$t('org.label.empName') /* 员工姓名*/,
              codeField: 'empName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,
              isMust: true,
              isMul: false
            },

            {
              compKey: 'compKey3',
              labelName: '所属组织',
              codeField: 'deptId',
              textField: 'orgName',
              isRequire: true,
              component: () => import('@/components/org/orgName/orgNameInput'),
              type: 'propus',
              isMust: true
            },
            {
              compKey: 'compKey55',
              labelName: this.$t('org.label.carBrandCn'), /* 品牌*/
              isRequire: true,
              codeField: 'carBrandCode',
              component: () => import('@/components/org/carBrand/carBrand'),
              type: 'dropdownList',
              isMust: true,
              isMul: true
            },
            {
              compKey: 'compKey4',
              labelName: this.$t('org.label.stationName') /* 岗位*/,
              textField: 'stationName',
              deptId: this.showOrgRealId,
              parentFileds: 'deptId-deptId',
              codeField: 'stationId',
              component: () => import('@/components/org/position'),
              type: 'propus',
              isMust: true,
              isMul: false
            },
            {

              compKey: 'compKey5',
              labelName: this.$t('org.label.Employees'), /* 员工性别*/
              codeField: 'genderCode',
              lookuptype: 'DB0022',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey6',
              labelName: this.$t('org.label.userName') /* 创建登录名*/,
              codeField: 'userName',
              readonly: this.popupsState != 'add',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: this.$t('org.label.userName1') /* 登录账号名*/,
              codeField: 'userName1',
              readonly: true,
              parentFileds: 'copy:userName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {

              compKey: 'compKey8',
              labelName: this.$t('org.label.password'), /* 登陆密码*/
              codeField: 'password',
              type: 'inputText',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey9',
              labelName: this.$t('org.label.isFrozen1'), // 冻结状态
              lookuptype: 'DFPV003',
              codeField: 'isFrozen',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true

            },

            {
              compKey: 'compKey10',
              labelName: this.$t('org.label.mobile'),
              /* 手机号码*/ codeField: 'mobile',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              validrule: { isformat: /^1[3456789]\d{9}$/, noRequire: false },
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey11',
              labelName: this.$t('org.label.credTypeCode') /* 证件类型*/,
              codeField: 'credTypeCode',
              lookuptype: 'VE0240',
              component: () => import('@/components/org/LookupValue'),
              isRequire: true,
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey12',
              labelName: this.$t('org.label.credNo') /* 证件号码*/,
              codeField: 'credNo',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey13',
              labelName: this.$t('org.label.workTel') /* 工作电话*/,
              codeField: 'workTel',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey14',
              labelName: this.$t('org.label.employType') /* 招聘方式*/,
              codeField: 'employType',
              lookuptype: 'DB0063',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey15',
              labelName: this.$t('org.label.employDate'), // 入职日期
              codeField: 'employDate',
              component: () => import('@/components/org/datePicker/dateTimePick'),
              type: 'datePicker',
              dateOptionsType: '1',
              isMust: true
            },
            {
              compKey: 'compKey16',
              labelName: this.$t('org.label.birthDate') /* 公历日期*/,
              codeField: 'birthDate',
              component: () => import('@/components/org/datePicker/dateTimePick'),
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'datePicker',
              isMust: true
            },
            {
              compKey: 'compKey17',
              labelName: this.$t('org.label.email'), // 邮箱
              codeField: 'email',
              validrule: { isEmail: true, noRequire: false },
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,

              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey18',
              labelName: this.$t('org.label.secondMan'),
              codeField: 'secondMan',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey19',
              labelName: this.$t('org.label.nationalityCode') /* 国籍*/,
              codeField: 'nationalityCode',
              lookuptype: 'DB0024',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey20',
              labelName: this.$t('org.label.nativePlace') /* 籍贯*/,
              codeField: 'nativePlace',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey21',
              labelName: this.$t('org.label.nationCode') /* 民族*/,
              codeField: 'nationCode',
              lookuptype: 'DB0026',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey22',
              labelName: this.$t('org.label.politicsCode') /* 政治面貌*/,
              codeField: 'politicsCode',
              lookuptype: 'DB0035',
              component: () => import('@/components/org/LookupValue'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey23',
              labelName: this.$t('org.label.marriagedCode') /* 婚姻状况*/,
              codeField: 'marriagedCode',
              lookuptype: 'VE0502',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey24',
              labelName: this.$t('org.label.degreeCode') /* 学历*/,
              codeField: 'degreeCode',
              lookuptype: 'DB0044',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey25',
              labelName: this.$t('org.label.school') /* 毕业学校*/,
              codeField: 'school',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey26',
              labelName: this.$t('org.label.degreepro') /* 专业*/,
              codeField: 'degreepro',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey27',
              labelName: this.$t('org.label.fax') /* 传真*/,
              codeField: 'fax',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey28',
              labelName: this.$t('org.label.secondManTel') /* 联系人电话*/,
              codeField: 'secondManTel',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey29',
              labelName: this.$t('org.label.hometelephone') /* 家电电话*/,
              codeField: 'familyPhone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey30',
              labelName: this.$t('org.label.personAddr') /* 个人通信*/,
              codeField: 'personAddr',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey31',
              labelName: this.$t('org.label.driverDate'), // 领取驾照日期
              codeField: 'driverDate',
              component: () => import('@/components/org/datePicker/dateTimePick'),
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'datePicker',
              isMust: true
            },
            {
              compKey: 'compKey32',
              labelName: this.$t('org.label.businessDate'), // 从事汽车行业时间
              codeField: 'businessDate',
              component: () => import('@/components/org/datePicker/dateTimePick'),
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'datePicker',
              isMust: true
            },
            {
              compKey: 'compKey33',
              labelName: this.$t('org.label.zip') /* 邮编*/,
              codeField: 'zip',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey34',
              labelName: this.$t('org.label.isFrozen2') /* 状态*/,
              codeField: 'isEnable',
              lookuptype: 'DB0081',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey35',
              labelName: this.$t('org.label.leaveDate'), // 离职日期
              codeField: 'leaveDate',
              component: () => import('@/components/org/datePicker/dateTimePick'),
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'datePicker',
              isMust: true
            }
          ],
      // 标题
      textMap: {
        edit: this.$t('org.label.editStaff') /* 修改员工信息*/,
        add: this.$t('org.label.addStaff') /* 新增员工信息*/
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(this, {
        isEnable: '',
        userId: this.showroleId,
        updateControlId: '',
        empId: '',
        marriagedCode: '',
        dlrCode: this.$store.getters.orgInfo.DLR_CODE,
        dlrId: this.$store.getters.orgInfo.DLR_ID,
        carBrandCode: '',
        deptId: this.showOrgRealId,
        empCode: '',
        empName: '',
        orgName: this.showOrgName,
        stationId: '',
        stationName: '',
        genderCode: '',
        userName: '',
        userName1: '',
        password: '',
        isFrozen: '',
        mobile: '',
        credTypeCode: '',
        credNo: '',
        workTel: '',
        employType: '',
        employDate: '',
        email: '',
        secondMan: '',
        nationalityCode: '',
        nativePlace: '',
        nationCode: '',
        politicsCode: '',
        degreeCode: '',
        school: '',
        degreepro: '',
        fax: '',
        secondManTel: '',
        familyPhone: '',
        personAddr: '',
        driverDate: '',
        businessDate: '',
        zip: '',
        isFrozen: '',
        leaveDate: '',
        birthDate: ''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode], null, 'formComponents'),
      carBrandData: [],
      stationList: []
      // userName: ""
    }
  },
  watch: {
    'formField.isEnable': {
      handler: function() {
        if (this.formField.isEnable == '1') {
          this.formField.isFrozen = '1'
        } else if (this.formField.isEnable == '0') {
          this.formField.isFrozen = '0'
        }
      }
    },
    'formField.isFrozen': {
      handler: function() {
        if (this.formField.isFrozen == '1') {
          this.formField.isEnable = '1'
        } else if (this.formField.isFrozen == '0') {
          this.formField.isEnable = '0'
        }
      }
    },
    // 监听弹窗显示
    popupsVisible(val) {
      if (val) {
        var userNameIndex = this.tableComponents.findIndex(o => o.codeField === 'userName')
        this.tableComponents[userNameIndex].readonly = this.popupsState != 'add'
      }
    }
  },
  created() {
    this.onCreated()
  },
  mounted() {
    // let that = this
    // this.queryStation(function(){
    //   for(let i of that.stationList){
    //     if(i.stationId === that.formField.stationId){
    //       that.formField.stationName = i.stationName
    //     }
    //   }
    // })
  },
  methods: {
    queryBrandCode(page, cb) {
      const that = this
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgEmployeeBrQueryFindAll,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: ['carBrandCode', 'carBrandCn']
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            empId: this.dynamicEditRowData.empId || '-1'
          }
        }
      }
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj)
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (
          response.result === '1'
        ) {
          this.carBrandData =
            response.rows
        }
        if (typeof cb === 'function') {
          cb.call(
            response.rows
          )
        }
      })
    },
    queryStation(cb) {
      const that = this
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgStationQueryFindAll,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: ['stationId', 'stationName']
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            deptId: this.showOrgRealId
          }
        }
      }
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj)
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (
          response.result === '1' &&
          response.rows
        ) {
          that.stationList = response.rows
        }
        if (typeof cb === 'function') {
          cb.call(this, response)
        }
      })
    },
    onCreated() {
      var that = this

      if (this.popupsState === 'edit') {
        this.queryBrandCode(null, function() {
          const carBrand = []
          for (const i in that.carBrandData) {
            carBrand.push(that.carBrandData[i].carBrandCode)
          }

          that.formField.carBrandCode = carBrand.join(',')
          // debugger
          if (that.formField.carBrandCode === '' || that.formField.carBrandCode === null) {
            that.formField.carBrandCode = that.$store.getters.orgInfo.BRAND_CODE
          }
          that.backFormField = JSON.parse(JSON.stringify(that.formField))
        })
      }

      if (that.tableComponents.length === 0) {
        if (that.popupsPageCode && that.popupsPageCode.length > 0) {
          // 读取弹窗配置信息
          CacheConfig.initData(that.popupsPageCode, function() {
            if (
              CacheConfig.cacheData[that.popupsPageCode] &&
              CacheConfig.cacheData[that.popupsPageCode].formComponents.length >
                0
            ) {
              that.tableComponents =
                CacheConfig.cacheData[that.popupsPageCode].formComponents
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
        this.formField.password = '***'
        this.formField.userName1 = this.dynamicEditRowData.userName
        this.formField.orgName = this.dynamicEditRowData.orgName
        this.formField.empId = this.dynamicEditRowData.empId
        this.userName = this.dynamicEditRowData.userName
      }
      // 备份fromField（用于重置）
      // 初始化品牌
      // if (
      //   this.formField.carBrandCode === "" &&
      //   this.isSetDefaultBrand === true
      // ) {
      //   this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE;
      // }

      // 联动组件获取父组件传值
      that.$nextTick(() => {
        // 监听
        that.watchComp(true)
      })
    },
    save1() {
      if (
        this.formField.password === '***' &&
        this.userName != this.formField.userName
      ) {
        {
          this.$message({
            message: '请修改账号密码' /* 请修改管理员信息*/,
            type: 'warning',
            duration: 2000
          })
          this.formField.password = ''
          return false
        }
      }

      const passwords = this.formField.password
      const userNames = this.formField.userName
      const userIds = this.formField.userId

      if (this.popupsState === 'edit') {
        if (
          // this.formField.password === "***"
          this.formField.password === '***' &&
          this.userName === this.formField.userName
        ) {
          this.formField.password = undefined
          this.formField.userName = undefined
          // this.formField.userId = undefined;
        }
      }
      // 验证密码强度
      if (this.formField.password !== '' && this.formField.password !== undefined && this.$config.loginConfig.validPassword === true) {
        if (this.$store.getters.accountConfig.pwd_express_desc && this.$store.getters.accountConfig.pwd_express_desc !== '') {
          const pattern = new RegExp(this.$store.getters.accountConfig.pwd_express)
          if (!pattern.test(this.formField.password)) {
            this.$message({
              message: '登陆密码不符合规则：' + this.$store.getters.accountConfig.pwd_express_desc,
              type: 'warning',
              duration: 2000
            })
            return false
          }
        }
      }

      // 对密码进行加密
      const Base64 = require('js-base64').Base64
      if (this.formField.password != undefined) {
        this.formField.password = Base64.encode(this.formField.password)
      }

      this.formField.dlrId = this.dlrId
      this.formField.dlrCode = this.dlrCode
      // this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE;

      if (this.formField.isFrozen === '') {
        this.formField.isFrozen = '1'
      }
      // 登录密码更改问题
      var saveObj = new Object()
      for (var p in this.formField) {
        if (p !== 'userName1') {
          var name = p // 属性名称
          var value = this.formField[p] // 属性对应的值
          saveObj[name] = this.formField[p]
        }
      }
      // var saveObj = this.formField;

      this.formField.userName1 = undefined

      const that = this
      this.save(saveObj, function() {
        that.formField.userName1 = userNames
      })

      this.formField.password = passwords
      this.formField.userName = userNames
      this.formField.userId = userIds
    }
  }

}
</script>
 <style lang="scss" scoped>
/deep/ .el-col-16 .csslableName {
  width: 14.2%;
}
/deep/ .el-col-16 label {
  width: 10.4%;
}
/deep/ .el-textarea {
  float: left;
  width: 90.6% !important;
}
</style>


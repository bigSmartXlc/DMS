<!--
* description: 成员管理-新增、修改弹窗
* author: lixb
* createdDate: 2019-10-14
-->
<template>
  <section class="editCarBrand">
    <el-dialog
      v-dialogDrag
      width="900px"
      :title="textMap[popupsState]"
      :append-to-body="true"
      center
      :close-on-click-modal="false"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :style-type="$store.state.app.dialogType"
      />
      <div class="filter-container filter-params">
        <el-row ref="vailComponentList" :key="formKey" :gutter="26">
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
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            :disabled="comp.disabled"
            :readonly="comp.readonly"
            :is-require="comp.isRequire"
            :is-mul="comp.isMul"
            :span="comp.span || 8"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :date-options-type="comp.dateOptionsType"
            :input-type="comp.inputType"
            :parent-fileds="comp.parentFileds || ''"
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
  props: {
    roleOrgType: {
      type: String,
      default: function() {
        return ''
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
    showTreeId: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    const viewPageCode = 'groupEmployee-Edit'
    return {
      formKey: 'formKey',
      // 保存API配置对象
      apiConfig: orgApis.mdmOrgEmployeeMutationSaveById,
      textMap: {
        edit: '修改集团员工管理',
        add: '添加集团员工管理'
      },
      isValiad: false,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey3',
          type: 'primary',
          size: 'small',
          icon: 'iconfont  icon-preservation',
          clickEvent: () => this.save1(),
          text: this.$t('sys.button.save')
        } /* 保存*/,
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
              labelName: this.$t('org.label.empCode'),
              /* 员工编码*/ codeField: 'empCode',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: this.$t('org.label.empName'),
              /* 员工姓名*/ codeField: 'empName',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: this.$t('org.label.orgName'), // 所属组织
              codeField: 'deptId',
              textField: 'orgName',
              isRequire: true,
              component: () => import('@/components/org/orgName/orgNameInput'),
              type: 'propus',
              isMust: true
            },
            {
              compKey: 'compKey55',
              labelName: this.$t('org.label.carBrandCn'),
              /* 品牌*/
              // span: 16,
              // type: "textarea",
              isRequire: true,
              codeField: 'carBrandCode',
              // lookuptype: "",
              component: () => import('@/components/org/carBrand/carBrand'),
              type: 'dropdownList',
              // isRequire: true,
              isMust: true,
              isMul: true
            },
            {
              compKey: 'compKey4',
              labelName: this.$t('org.label.stationName'),
              /* 岗位*/
              // span: 16,
              // type: "textarea",
              textField: 'stationName',
              deptId: this.showTreeId,
              parentFileds: 'deptId-deptId',
              codeField: 'stationId',
              // lookuptype: "",
              component: () => import('@/components/org/position'),
              type: 'propus',
              isRequire: true,
              isMust: true,
              isMul: false
            },
            {
              compKey: 'compKey5',
              labelName: this.$t('org.label.genderName'),
              lookuptype: 'DB0022',
              codeField: 'genderCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            }, // 员工性别
            {
              compKey: 'compKey6',
              labelName: this.$t('org.label.userName'),
              /* 创建登录名*/ codeField: 'userName',
              // isRequire: this.popupsState == "edit" ? false : true,
              disabled: this.popupsState != 'add',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: '用户名',
              /* 登录账号名*/ codeField: 'userName1',
              disabled: true,
              // readonly: this.popupsState == "edit" ? false : true,
              parentFileds: 'copy:userName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: this.$t('org.label.password'),
              /* 密码*/ codeField: 'password',
              isRequire: true,
              // isRequire: this.popupsState == "edit" ? false : true,
              component: () => import('@/components/org/commonInput'),
              inputType: 'password',
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: this.$t('org.label.isFrozen1'),
              codeField: 'isFrozen',
              component: () => import('@/components/org/LookupValue'),
              lookuptype: 'DFPV003',
              type: 'dropdownList',
              isMust: true
            } /* 冻结状态 */,
            {
              compKey: 'compKey10',
              labelName: this.$t('org.label.mobile'),
              /* 手机号码*/ codeField: 'mobile',
              isRequire: true,
              validrule: { isformat: /^1[3456789]\d{9}$/, noRequire: false },
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey11',
              labelName: this.$t('org.label.credTypeCode'),
              codeField: 'credTypeCode',
              isRequire: true,
              component: () => import('@/components/org/LookupValue'),
              lookuptype: 'VE0503',
              type: 'dropdownList',
              isMust: true
            } /* 证件类型 */,
            {
              compKey: 'compKey12',
              labelName: this.$t('org.label.credNo'),
              /* 证件号码*/ codeField: 'credNo',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey13',
              labelName: this.$t('org.label.workTel'),
              /* 工作电话*/ codeField: 'workTel',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },

            {
              compKey: 'compKey14',
              labelName: this.$t('org.label.employType'),
              codeField: 'employType',
              component: () => import('@/components/org/LookupValue'),
              lookuptype: 'DB0063',
              type: 'dropdownList',
              isMust: true
            } /* 招聘方式 */,
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
              labelName: this.$t('org.label.birthDate'), // 公历日期
              codeField: 'birthDate',
              component: () => import('@/components/org/datePicker/dateTimePick'),
              format: 'yyyy-MM-dd HH:mm:ss',
              type: 'datePicker',
              isMust: true
            },
            {
              compKey: 'compKey17',
              labelName: 'Email',
              /* email*/ codeField: 'email',
              isRequire: true,
              validrule: { isEmail: true, noRequire: false },
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey18',
              labelName: this.$t('org.label.secondMan'),
              /* 紧急联系人*/ codeField: 'secondMan',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey19',
              labelName: this.$t('org.label.nationalityCode'),
              lookuptype: 'DB0024',
              codeField: 'nationalityCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            }, // 国籍
            {
              compKey: 'compKey20',
              labelName: this.$t('org.label.nativePlace'),
              /* 籍贯*/ codeField: 'nativePlace',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey21',
              labelName: this.$t('org.label.nationCode'),
              lookuptype: 'DB0026',
              codeField: 'nationCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            }, // 民族
            {
              compKey: 'compKey22',
              labelName: this.$t('org.label.politicsCode'),
              /* 政治面貌*/ codeField: 'politicsCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey23',
              labelName: this.$t('org.label.marriagedCode'),
              lookuptype: 'VE0502',
              codeField: 'marriagedCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            }, // 婚姻状况
            {
              compKey: 'compKey24',
              labelName: this.$t('org.label.degreeCode'),
              lookuptype: 'DB0044',
              codeField: 'degreeCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            }, // 学历
            {
              compKey: 'compKey25',
              labelName: this.$t('org.label.school'),
              /* 毕业院校*/ codeField: 'school',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey26',
              labelName: this.$t('org.label.degreepro'),
              /* 专业*/ codeField: 'degreepro',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey27',
              labelName: this.$t('org.label.fax'),
              /* 传真*/ codeField: 'fax',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey28',
              labelName: this.$t('org.label.secondManTel'),
              /* 联系人电话*/ codeField: 'secondManTel',
              validrule: { isformat: /^1[3456789]\d{9}$/, noRequire: false },
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey29',
              labelName: this.$t('org.label.familyPhone'),
              /* 家庭电话*/ codeField: 'familyPhone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey30',
              labelName: this.$t('org.label.personAddr'),
              /* 个人通信地址*/ codeField: 'personAddr',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
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
              labelName: this.$t('org.label.zip'),
              /* 邮编*/ codeField: 'zip',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            // {
            //   compKey: "compKey34",
            //   labelName: this.$t("org.label.isFrozen2"),
            //   lookuptype: "DB0081",
            //   codeField: "isEnable",
            //   component: () => import("@/components/org/LookupValue"),
            //   type: "dropdownList",
            //   isMust: true
            // }, // 在职状态
            {
              compKey: 'compKey34',
              labelName: this.$t('org.label.isFrozen2'),
              /* 状态*/

              // span: 16,
              // type: "textarea",
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
        updateControlId: '',
        userId: this.showroleId,
        dlrCode: this.$store.getters.orgInfo.DLR_CODE,
        dlrId: this.$store.getters.orgInfo.DLR_ID,
        carBrandCode: '',
        empCode: '',
        empName: '',
        empId: '',
        orgName: this.showOrgName,
        deptId: this.showTreeId,
        stationId: '',
        stationName: '',
        genderCode: '',
        userName: '',
        userName1: '',
        password: '',
        isEnable: '',
        isFrozen: '',
        mobile: '',
        credTypeCode: '',
        credNo: '',
        workTel: '',
        employType: '',
        employDate: '',
        birthDate: '',
        email: '',
        secondMan: '',
        nationalityCode: '',
        nativePlace: '',
        nationCode: '',
        politicsCode: '',
        marriagedCode: '',
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
        leaveDate: ''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode], null, 'formComponents'),
      stationList: []
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
            deptId: this.showTreeId
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
          if (
            that.formField.carBrandCode === '' ||
            that.formField.carBrandCode === null
          ) {
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
      if (
        this.formField.carBrandCode === '' &&
        this.isSetDefaultBrand === true
      ) {
        this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE
      }
      this.backFormField = JSON.parse(JSON.stringify(this.formField))

      // 联动组件获取父组件传值
      that.$nextTick(() => {
        // 监听
        that.watchComp(true)
      })
    },
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
            empId: this.dynamicEditRowData.empId
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
    save1() {
      // console.log(this.formField.businessDate);
      // console.log(this.formField.employDate);
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
          this.formField.password === '***'
          // this.formField.password === "***" &&
          // this.userName === this.formField.userName
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
    },

    checkBox() {
      this.$children[1].curPopupsVisible = true
    },
    getComponentCode1() {
      // debugger;
      this.$children[1].curPopupsVisible = false
      if (this.$children[1].sendData) {
        this.formField.orgName = this.$children[1].sendData.orgName
        this.formField.deptId = this.$children[1].sendData.orgTreeId
        this.formField.dlrCode = this.$children[1].sendData.dlrCode
        this.formField.dlrId = this.$children[1].sendData.dlrId
      }
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
/deep/.editCarBrand {
  position: relative;
}
/deep/.deptids {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 99999;
}
/deep/ .el-dialog__footer {
  text-align: right;
}
</style>


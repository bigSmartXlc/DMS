 <!--
* description: 专营点（含输入框）
* author: meijq
* createdDate: 2019-08-19
-->
<template>
  <section class="orgDlr">
    <el-dialog
      id="orgDlr"
      v-dialogDrag
      :title="$t('org.label.dlrName')"
      :visible.sync="curPopupsVisible"
      width="1063px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :lock-scroll="true"
      class="gm-includeFooter"
      @close="sendCode"
    >
      <dialogHeader
        slot="title"
        :title="$t('org.label.dlrName')"
        :style-type="$store.state.app.dialogType"
      >
        <dialogHeader
          slot="title"
          :title="$t('org.label.dlrName')"
          :style-type="$store.state.app.dialogType"
        />
      </dialogHeader>
      <!-- 经销商 -->
      <div id="orgSearch">
        <div class="filter-container filter-params">
          <el-row class="orgSel">
            <!-- <el-col :span="4">
            <el-checkbox
              v-model="checked"
              style="font-size:19px;"
            >{{$t('org.label.forSelStopUseDlr')}}</el-checkbox>
          </el-col>
            <el-col :span="1"></el-col>-->
            <!--请输入专营店简称-->
          </el-row>

          <el-row class="areaSel">
            <!-- 品牌 -->
            <carBrand
              :key="componentsKeys.carBrandCode"
              ref="carBrand"
              :span="8"
              :code="formCode.carBrandCode"
              :label-name="this.$t('org.label.carBrandCn')"
              :disabled="carBrandDisabled"
              @changeCode="carBrandValue"
            />
            <!-- 大区 -->
            <bigArea
              :key="componentsKeys.bigAreaCode"
              ref="bigArea"
              :span="8"
              :code="formCode.bigAreaCode"
              :label-name="$t('org.label.region')"
              @changeCode="getbigAreaValue"
            />
            <!-- 小区 -->
            <smallArea
              :key="componentsKeys.smallAreaCode"
              ref="smallArea"
              :span="8"
              :label-name="$t('org.label.smallAreaName')"
              :code="formCode.smallAreaCode"
              :big-area-id="formField.bigAreaId"
              @changeCode="smallValue"
            />
            <!-- 省份 -->
            <!-- <el-col :span="8"></el-col> -->
            <provinceQuery
              :key="componentsKeys.provinceCode"
              ref="province"
              :span="8"
              :label-name="$t('org.label.province')"
              :code="formCode.provinceCode"
              @changeCode="provinceValue"
            />

            <!-- 城市 -->
            <citySelect
              :key="componentsKeys.cityCode"
              ref="city"
              :span="8"
              :label-name="$t('org.label.cityName')"
              :code="formCode.cityCode"
              :province-id="formField.provinceId"
              @changeCode="cityValue"
            />

            <el-col :span="8">
              <lableName
                :validrule="validrule"
                :cur-label-name="$t('org.label.dlrShortName')"
                :is-show-label="isShowLabel"
              />
              <!-- 经销商 -->
              <el-input
                v-model="formField.dlrShortName"
                clearable
                class="orgdiClass"
                :placeholder="$t('请输入经销商简称')"
              />
            </el-col>
            <el-col :span="8">
              <lableName
                :validrule="validrule"
                :cur-label-name="$t('org.label.dlrCode')"
                :is-show-label="isShowLabel"
              />
              <!-- 经销商 -->
              <el-input
                v-model="formField.dlrCode"
                clearable
                class="orgdiClass"
                :placeholder="$t('请输入经销商编码')"
              />
            </el-col>
          </el-row>
        </div>
        <el-row class="filter-container storeCollapse">
          <el-col :span="12" class="leftButtom">
            <el-button ref="fexxx" icon="el-icon-upload2" @click="collapseAll">{{ collaseStr }}</el-button>
            <!-- 全部折叠-->
            <el-button v-model="checkAll" icon="el-icon-check" @click="selectAll">{{ selectStr }}</el-button>
            <!-- 全选-->
            <el-checkbox
              v-model="isAble"
              :indeterminate="indeterminate"
              @change="stopSelect"
            >包含已停用经销商</el-checkbox>
          </el-col>
          <!-- 包含已停用经销商-->
          <el-col :span="12" class="rightButtom">
            <el-button
              size="small"
              icon="iconfont  icon-search"
              @click="fetchData"
            >{{ $t('sys.button.filter') }}</el-button>
            <!-- 过滤 -->
            <el-button
              size="mini"
              icon="el-icon-check"
              @click="checkSellct"
            >{{ $t('sys.button.checked') }}</el-button>
            <!-- 勾选 -->
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="uncheckSellct"
            >{{ $t('sys.button.unchecked') }}</el-button>
            <!-- 不勾选 -->
            <el-button
              size="mini"
              icon="iconfont  icon-reset"
              @click="reset"
            >{{ $t('sys.button.reset') }}</el-button>
            <!-- 重置 -->

            <!-- <el-button size="small" @click="curPopupsVisible = false">返回</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div id="orgDlrselect" v-loading="loading">
        <template v-if="isInit === true && distributorsInfo.length === 0">
          <div class="el-table__empty-block" style="height: 100%; width: 100%;"><span class="el-table__empty-text">暂无数据</span></div>
        </template>
        <template v-for="(item, key) in distributorsInfo">
          <el-collapse :key="`distri_${key}`" v-model="activeNames">
            <el-collapse-item :name="item.id">
              <template slot="title">
                <div class="bigTitle">
                  <label
                    ref="bigArea"
                    class="el-checkbox"
                    :class="[item.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
                    :value="item.bigArea"
                    :is-checked="item.selected"
                    :disabled="!isMul"
                    @change="click1(item)"
                  >
                    <span
                      class="el-checkbox__input"
                      :class="[item.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
                    >
                      <span class="el-checkbox__inner" />
                      <input
                        type="checkbox"
                        aria-hidden="false"
                        class="el-checkbox__original"
                        :value="item.bigArea"
                        :disabled="!isMul"
                        :is-checked="item.selected"
                      >
                    </span>
                    <span class="el-checkbox__label">{{ item.bigArea }}</span>
                  </label>
                </div>
              </template>
              <div v-for="(area,key) in item.area" :key="`area${key}`" class="secondColl">
                <el-collapse-item :name="area.id">
                  <template slot="title">
                    <div class="areaTitle">
                      <label
                        ref="item.bigArea"
                        class="el-checkbox"
                        :value="area.partitionName"
                        :is-checked="area.selected"
                        :disabled="!isMul"
                        :class="[area.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
                        @change="click2(area)"
                      >
                        <span
                          class="el-checkbox__input"
                          :class="[area.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
                        >
                          <span class="el-checkbox__inner" />
                          <input
                            type="checkbox"
                            aria-hidden="false"
                            class="el-checkbox__original"
                            :disabled="!isMul"
                            :is-checked="area.selected"
                          >
                        </span>
                        <span class="el-checkbox__label">{{ area.partitionName }}</span>
                      </label>
                    </div>
                  </template>
                  <ul>
                    <li v-for="(country,key) in area.country" :key="`coutry_${key}`">
                      <label
                        ref="bigArea"
                        class="el-checkbox"
                        :value="country.fieldName"
                        :is-checked="country.selected"
                        :disabled="country.dlrStatus=='0'&& isAble==false"
                        :class="[country.selected ?'is-checked':'',country.dlrStatus=='0'&& isAble==false ?'is-disabled':'']"
                        @change="click3(country)"
                      >
                        <span
                          class="el-checkbox__input"
                          :class="[country.selected ?'is-checked':'',country.dlrStatus=='0'&& isAble==false ?'is-disabled':'']"
                        >
                          <span
                            :class="country.dlrStatus=='0'&& isAble==false?'el-checkbox__inner inputDisplay':'el-checkbox__inner'"
                          />
                          <input
                            type="checkbox"
                            aria-hidden="false"
                            class="el-checkbox__original"
                            :disabled="country.dlrStatus=='0'&& isAble==false"
                            :checked="country.selected"
                          >
                        </span>
                        <!-- <div
                        class="chickSpan"
                        v-html="brightenKeyword(country.fieldName,secvalue)"
                        ></div>-->
                        <span
                          :class="country.dlrStatus==='0'?'el-checkbox__label isDisplay':'el-checkbox__label'"
                          v-html="brightenKeyword(country.fieldName,secvalue)"
                        />
                      </label>
                    </li>
                  </ul>
                </el-collapse-item>
              </div>
            </el-collapse-item>
          </el-collapse>
        </template>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          icon="iconfont  icon-confirm"
          @click="sendCode"
        >{{ $t('sys.button.confirm') }}</el-button>
        <!-- 确认 -->
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { valueObjectMixins } from '@/components/mixins/valueObjectMixins'
import { orgApis } from '@/api/apiList/org'
export default {
  name: 'DrlDialog',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    provinceQuery: () => import('@/components/org/ProvinceQuery/index'),
    citySelect: () => import('@/components/org/CitySelect/index'),
    smallArea: () => import('@/components/org/SmallArea/index'),
    bigArea: () => import('@/components/org/BigArea/index'),
    LookupValue: () => import('@/components/org/LookupValue'),
    // emissionStandard: () => import("@/components/org/LookupValue"),
    carBrand: () => import('@/components/org/carBrand/carBrand'),
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  mixins: [valueObjectMixins],
  props: {
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: '' },
    comType: { type: String, default: '' },
    codeField: { type: String, default: '' },
    popupsKey: { type: String, default: '' },
    isMul: { type: Boolean, default: false },
    curIsShow: { type: Boolean, default: false },
    fullComponentkey: { type: String, default: 'fullComponentKey' },
    // 表单校验规则
    validrule: { type: Object, default: () => {} }
  },
  data() {
    return {
      // 找到被筛选变色的下标
      chooseLength: 0,
      isShowLabel: true,
      isAble: false,
      // 品牌禁用
      carBrandDisabled: false,
      // 默认展开
      activeNames: [],
      // 用于全部展开
      collseName: [],
      loading: false,
      input: '',
      DLRCODE: '',
      DLRNAME: '',
      sendData: {
        code: [],
        name: []
      },
      dlrDefault: [],
      curPopupsVisible: this.popupsVisible,
      toggleParam: false,
      checked: false,
      checkAll: false,
      secvalue: '',
      DlrCode: '',
      indeterminate: false,
      isInit: false,
      distributorsInfo: [],
      dirButorsInfo: [],
      radio: '2',
      componentsKeys: {
        inputCode: 'e',
        bigAreaCode: 'a',
        smallAreaCode: 'b',
        cityCode: 'c',
        provinceCode: 'd',
        emissionCode: 'f',
        carBrandCode: 'g'
      },
      formField: {
        carBrandCode: '', // 品牌编码
        provinceId: '', // 省份ID
        cityId: '', // 城市ID
        bigAreaId: '', // 大区ID
        smallAreaId: '', // 小区ID
        dlrShortName: '', // 经销商简称
        dlrStatus: '1',
        dlrCode: '' // 经销商编码
        // emissionStandard: "" // 排放标准
      },
      // 表单查询数据备份对象（用于重置
      backFormField: {},
      formCode: {
        provinceCode: '', // 省份code
        cityCode: '', // 省份code
        bigAreaCode: '', // 省份code
        smallAreaCode: '', // 省份code
        // emissionCode: "", //排放标准code
        carBrandCode: '' // 品牌标准code
      },
      // 表单查询数据备份对象（用于重置
      backFormCode: {},
      // 全部折叠字符串
      collaseStr: this.$t('org.label.collapseAll'),
      // 全选字符串
      selectStr: this.$t('org.label.selectAll')
    }
  },
  watch: {
    // 经销商输入框
    'formField.dlrShortName'(val, last) {
      if (val != last) {
        this.DLRNAME = val
        this.forDatas()
        this.chooseLength = 0
      }
    },
    'formField.dlrCode'(val, last) {
      if (val != last) {
        val = val.toLocaleUpperCase()
        this.DLRCODE = val
        this.formField.dlrCode = val
        this.forDatas()
        this.chooseLength = 0
      }
    }
  },
  created() {
    var that = this
    // 赋值formField
    if (that.curValueObject && typeof that.curValueObject === 'object') {
      for (var key in that.formField) {
        if (that.curValueObject[key]) {
          that.formField[key] = that.curValueObject[key]
          that.formCode[key] = that.curValueObject[key]
        } else {
          that.formField[key] = ''
        }
      }
    }
    this.formField.dlrStatus = '1'
    // 判断品牌是否禁用
    if (that.$parent.parentFileds !== '') {
      that.carBrandDisabled = true
      // this.componentsKeys.carBrandCode = this.componentsKeys.carBrandCode + "a";
    } else {
      that.carBrandDisabled = false
      // this.componentsKeys.carBrandCode = this.componentsKeys.carBrandCode + "a";
    }

    // // 默认品牌
    // if (that.formField.carBrandCode === "") {
    //   that.formField.carBrandCode = that.$store.getters.orgInfo.BRAND_CODE;
    // }

    that.backFormField = JSON.parse(JSON.stringify(that.formField))
    that.backFormCode = JSON.parse(JSON.stringify(that.formCode))
    if (!that.distributorsInfo.length && that.curPopupsVisible) {
      that.fetchData()
    }
    // if(obj.value != obj.value.toUpperCase()){ // 判断很重要,否则方向键将被锁住
    //         obj.value=obj.value.toUpperCase();
    //     }
  },
  methods: {
    // 赋值
    forDatas() {
      if (this.DLRNAME == '') {
        this.secvalue = this.DLRCODE
      }
      if (this.DLRCODE == '') {
        this.secvalue = this.DLRNAME
      } else {
        this.secvalue = this.DLRCODE + ',' + this.DLRNAME
      }
    },
    // 禁选取消勾选的停用经销商
    stopSelect(val) {
      switch (val) {
        case false:
          this.formField.dlrStatus = '1'
          break
        case true:
          this.formField.dlrStatus = ''
          break
      }
      this.fetchData()
      // this.$nextTick(() => {
      // const inputStop = document.querySelectorAll('.inputDisplay')
      // for (let i = 0; i < inputStop.length; i++) {
      // inputStop[i].parentNode.classList.remove('is-checked')
      // }
      // })
    },
    fetchData(cb) {
      // 找到变为红色字体的位置
      const that = this
      var choose = document.querySelectorAll('.chooseDir')
      if (choose.length !== 0) {
        if (choose.length === this.chooseLength) {
          this.$message('已跳转到第一条')
          this.chooseLength = 0
        }
        // 找到input框使用focus函数
        if (choose.length >= this.chooseLength) {
          choose[
            this.chooseLength
          ].parentNode.parentNode.children[0].children[1].focus()
          this.chooseLength++
        } else {
          this.chooseLength = 0
        }
      }
      this.distributorsInfo = []
      that.loading = true
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgdlrQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              'carBrandCode',
              'dlrId',
              'dlrCode',
              'dlrShortName',
              'bigAreaName',
              'bigAreaId',
              'smallAreaName',
              'smallAreaId',
              'dlrStatus',
              // "emissionStandard",
              'isEnable'
            ]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: this.formField
        }
      }
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj)
      // 调用中台API方法（可复用）

      this.$requestAPI(paramD).then(response => {
        if (
          response.result === '1' &&
          response.rows
        ) {
          this.distributorsInfo =
            response.rows
          this.isInit = true

          this.distributorsInfo.forEach(item => {
            if (item.bigAreaId === null || item.bigAreaId === '') {
              item.bigAreaId = '-1'
            }
            if (item.smallAreaId === null || item.smallAreaId === '') {
              item.smallAreaId = '-1'
            }
          })

          // 处理数据
          var distributorsInfoTemp = []
          var bigArea = {}

          // 第一次循环找出大区
          for (var i = 0; i < this.distributorsInfo.length; i++) {
            bigArea = {}
            var flag = true
            for (var j = 0; j < distributorsInfoTemp.length; j++) {
              if (
                distributorsInfoTemp[j].id == this.distributorsInfo[i].bigAreaId
              ) {
                flag = false
                break
              }
            }
            if (flag) {
              bigArea['bigArea'] = this.distributorsInfo[i].bigAreaName
              bigArea['selected'] = false
              bigArea['indeterminate'] = false
              bigArea['id'] = this.distributorsInfo[i].bigAreaId
              distributorsInfoTemp.push(bigArea)
              // if (this.activeNames.length === 0) {
              //   this.activeNames.push(this.distributorsInfo[i].bigAreaId);
              // }
              this.activeNames.push(this.distributorsInfo[i].bigAreaId)
              this.collseName.push(this.distributorsInfo[i].bigAreaId)
            }
          }

          // 第二遍根据大区循环找出小区
          for (var i = 0; i < distributorsInfoTemp.length; i++) {
            var smallAreaList = this.distributorsInfo.filter(
              o => o.bigAreaId == distributorsInfoTemp[i].id
            )
            distributorsInfoTemp[i]['area'] = []
            var smallArea = {}
            for (var j = 0; j < smallAreaList.length; j++) {
              smallArea = {}
              smallArea['id'] = smallAreaList[j].smallAreaId
              smallArea['partitionName'] = smallAreaList[j].smallAreaName
              smallArea['indeterminate'] = false
              smallArea['selected'] = false
              var isIncludes = distributorsInfoTemp[i].area.filter(
                o => o.id == smallAreaList[j].smallAreaId
              )
              if (isIncludes.length == 0) {
                distributorsInfoTemp[i].area.push(smallArea)
              }
              if (this.collseName.indexOf(smallAreaList[j].smallAreaId) < 0) {
                this.collseName.push(smallAreaList[j].smallAreaId)
              }
              // if (this.activeNames.indexOf(smallAreaList[j].bigAreaId) > -1 && this.activeNames.length < 2) {
              //   this.activeNames.push(smallAreaList[j].smallAreaId);
              // }
              if (this.activeNames.indexOf(smallAreaList[j].smallAreaId) < 0) {
                this.activeNames.push(smallAreaList[j].smallAreaId)
              }
            }
          }

          // 第三遍根据小区找出经销商
          for (var i = 0; i < distributorsInfoTemp.length; i++) {
            for (var j = 0; j < distributorsInfoTemp[i].area.length; j++) {
              var dlrList = this.distributorsInfo.filter(
                o => o.bigAreaId == distributorsInfoTemp[i].id && o.smallAreaId == distributorsInfoTemp[i].area[j].id
              )
              distributorsInfoTemp[i].area[j]['country'] = []
              var dlr = {}
              dlrList.forEach(dlrs => {
                dlr = {}
                dlr['id'] = dlrs.dlrId
                dlr['fieldName'] = ' [' + dlrs.dlrCode + ' ] ' + dlrs.dlrShortName
                dlr['ShortFieldName'] = dlrs.dlrShortName
                dlr['selected'] = false
                // 禁选停用经销商修改
                // dlr["dlrStatus"] = dlrs.dlrStatus;
                dlr['dlrStatus'] = dlrs.isEnable
                distributorsInfoTemp[i].area[j].country.push(dlr)
              })
            }
          }
          const tmpCode = (this.code || '').replace(/\s*/g, '')
          this.dlrDefault = tmpCode.split(',')
          this.distributorsInfo = distributorsInfoTemp
          this.distributorsInfo.forEach(item => {
            item.area.forEach(citem => {
              citem.country.forEach(ccitem => {
                this.dlrDefault.forEach(index => {
                  if (ccitem.id == index) {
                    ccitem.selected = true
                    this.checkObj = ccitem
                  }
                })
              })
            })
          })
          that.loading = false
          that.dirButorsInfo = JSON.parse(JSON.stringify(that.distributorsInfo))
          if (typeof cb === 'function') {
            cb.call(1)
          }
        }
      })
    },
    // 获取数据
    getSelData() {
      this.sendData.name = []
      this.sendData.code = []
      this.distributorsInfo.forEach(item => {
        item.area.forEach(citem => {
          citem.country.forEach(ccitem => {
            // if (ccitem.dlrStatus == '0' && this.isAble == true) {
            // } else {
            if (ccitem.selected) {
              this.sendData.name.push(ccitem.ShortFieldName)
              this.sendData.code.push(ccitem.id)
              // }
            }
          })
        })
      })
    },
    sendCode(obj) {
      if (!obj || obj.name === undefined || obj.code === undefined) {
        this.getSelData()
      } else {
        this.sendData.name = []
        this.sendData.code = []
        this.sendData.name.push(obj.name)
        this.sendData.code.push(obj.code)
      }
      this.$emit(
        'changeCode',
        this.sendData.code.toString(),
        this.sendData.name.toString(),
        this.codeField,
        this.comType,
        this.popupsKey
      )
    },
    // 全选点击按钮
    selectAll() {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.selectStr = this.$t('org.label.noselectAll')
      } else {
        this.selectStr = this.$t('org.label.selectAll')
      }
      this.distributorsInfo.forEach(item => {
        // if (!this.isAble || item.dlrStatus !== '0') {
        item.selected = this.checkAll
        item.area.forEach(citem => {
          // if (!this.isAble || citem.dlrStatus !== '0') {
          citem.selected = this.checkAll
          citem.country.forEach(ccitem => {
            // if (!this.isAble || ccitem.dlrStatus !== '0') {
            ccitem.selected = this.checkAll
            // }
          })
          // }
        })
        // }
      })
    },
    // 折叠按钮
    collapseAll() {
      if (this.activeNames.length === 0) {
        this.activeNames = this.collseName
        this.collaseStr = this.$t('org.label.collapseAll')
      } else {
        this.activeNames = []
        this.collaseStr = this.$t('org.label.expandAll')
      }
    },
    click1(initem) {
      initem.selected = !initem.selected
      initem.area.forEach(item => {
        item.selected = initem.selected
        item.country.forEach(citem => {
          // if (!this.isAble || citem.dlrStatus !== '0') {
          citem.selected = initem.selected
          // }
        })
      })
      if (!initem.selected) {
        this.checkAll = false
      }
    },
    click2(initem) {
      initem.selected = !initem.selected
      initem.country.forEach(item => {
        // if (!this.isAble || item.dlrStatus !== '0') {
        item.selected = initem.selected
        // }
      })
      if (!initem.selected) {
        this.checkAll = false
      }
    },
    click3(items) {
      items.selected = !items.selected
      if (items.selected) {
        this.checkMul(items, 'dlr')
      }
    },
    // 检查单选/多选，（type=1:大区,2:小区,3:经销商）
    checkMul(item, type) {
      if (type === 'dlr' && this.isMul === false) {
        // 单选需要切换选择
        if (!this.checkObj) {
          if (this.code && this.code.length > 0) {
            this.distributorsInfo.forEach(item => {
              item.area.forEach(citem => {
                citem.country.forEach(ccitem => {
                  this.dlrDefault.forEach(index => {
                    if (ccitem.id == this.code) {
                      this.checkObj = ccitem
                    }
                  })
                })
              })
            })
          }
        }
        if (this.checkObj) {
          this.checkObj.selected = false
        }
        item.selected = true
        this.checkObj = item
        // 发送
        // this.sendCode({ code: item.id, name: item.fieldName })
      }
    },
    // 筛选变色
    brightenKeyword(val, keyword, status) {
      var k = keyword.split(',')
      var res
      for (var x in k) {
        const Reg = new RegExp(k[x], 'i')
        if (status == '1' && this.isAble == true) {
          var res = `<span class="isAbcolor">${k[x]}</span>`
        }
        if (val) {
          res = val.replace(
            Reg,
            `<span ref="chooseDir" class="chooseDir" >${k[x]}</span>`
          )
          if (val.indexOf(k[x]) > -1) {
            break
          }
        }
      }
      return res
    },
    pushArea(item) {
      if (this.isMuld) {
        item.selected = !item.selected
      } else {
        const flag = item.selected
        this.distributorsInfo.forEach(item => {
          item.area.forEach(citem => {
            citem.country.forEach(ccitem => {
              ccitem.selected = false
            })
          })
        })
        item.selected = flag
        item.selected = !item.selected
      }
    },
    // 勾选
    checkSellct(e) {
      var chooseDir = document.getElementsByClassName('chooseDir')
      for (var i = 0; i < chooseDir.length; i++) {
        if (chooseDir[i].innerHTML.length > 0) {
          if (
            // chooseDir[i].parentNode.parentNode.firstChild.getAttribute(
            //   "checked"
            // ) == "false" ||
            // chooseDir[i].parentNode.parentNode.firstChild.getAttribute(
            //   "checked"
            // ) == undefined
            chooseDir[i].parentNode.parentNode.firstChild.checked == false ||
            chooseDir[i].parentNode.parentNode.firstChild.checked == undefined
          ) {
            chooseDir[i].parentNode.parentNode.firstChild.children[1].click()
            chooseDir[i].parentNode.parentNode.firstChild.children[1].setAttribute('checked', 'true')
          }
        }
      }
    },
    // 反勾选
    uncheckSellct(e) {
      var chooseDir = document.getElementsByClassName('chooseDir')
      for (var i = 0; i < chooseDir.length; i++) {
        if (chooseDir[i].innerHTML.length > 0) {
          if (
            chooseDir[i].parentNode.parentNode.children[0].children[1]
              .checked == true
          ) {
            chooseDir[i].parentNode.parentNode.children[0].children[1].click()
            chooseDir[
              i
            ].parentNode.parentNode.children[0].children[1].setAttribute(
              'checked',
              'false'
            )
          }
        }
      }
    },
    // 重置
    reset() {
      this.componentsKeys = {
        inputCode: 'e' + Math.random(),
        bigAreaCode: 'a' + Math.random(),
        smallAreaCode: 'b' + Math.random(),
        cityCode: 'c' + Math.random(),
        provinceCode: 'd' + Math.random(),
        emissionCode: 'f' + Math.random()
      }
      // this.formField = JSON.parse(JSON.stringify(this.backFormField));
      this.$utils.deepClone(this.formField, this.backFormField)
      // this.formCode = JSON.parse(JSON.stringify(this.backFormCode));
      this.$utils.deepClone(this.formCode, this.backFormCode)
      this.secvalue = ''
    },
    // 获取品牌
    carBrandValue(val, text, cs, cd, cb) {
      this.formField.carBrandCode = val
    },
    // 获取大区
    getbigAreaValue(val, text, cs, cd, cb) {
      this.formField.bigAreaId = val
      this.formField.smallAreaId = ''
      this.componentsKeys.smallAreaCode =
        'smallAreaCode' + this.$utils.generateId()
    },
    // 获取小区
    smallValue(val, text, cs, cd, cb) {
      this.formField.smallAreaId = val
    },
    // 获取省份
    provinceValue(val, text, cs, cd, cb) {
      this.formField.provinceId = val
      this.formField.cityId = ''
      this.componentsKeys.cityCode = 'cityCode' + this.$utils.generateId()
    },
    // 获取城市
    cityValue(val, text, cs, cd, cb) {
      this.formField.cityId = val
    }
    // 获取排放标准
    // emissionValue(val, text, cs, cd, cb) {
    //   this.formField.emissionStandard = val;
    // this.componentsKeys.emissionCode = "emissionCode" + this.$utils.generateId();
    // }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .sendStyle {
  margin: 0 10px;
  height: 33px;
  text-align: right;
}
/deep/ .inputDisplay {
  background-color: #f2f2f2;
}
/deep/ .orgdiClass {
  .el-input__inner {
    width: 108%;
  }
}
/deep/.el-button--small, .el-button--small.is-round {
    padding:0;
}
span.el-checkbox__label.isDisplay {
    color: #3ab0f0;
}
#orgDlrselect{
  height: 66% !important;
}
// /deep/ #orgDlr#orgSearch.areaSel label{
//     width: 19%!important;
// }
</style>


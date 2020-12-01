 <!--
* description: 城市弹出框（含输入框）
* author: meijq
* createdDate: 2019-08-19
-->
<template>
  <section class="orgDlr">
    <el-dialog
      id="orgDlr"
      v-dialogDrag
      title="城市选择"
      :visible.sync="curPopupsVisible"
      width="900px"
      center
      :append-to-body="true"
      :lock-scroll="true"
      @close="sendCode"
    >
      <dialogHeader
        slot="title"
        :title="'城市选择'"
        :style-type="$store.state.app.dialogType"
      />
      <div
        id="orgSearch"
        class="top"
      >
        <div class="filter-container filter-params">
          <el-row style="margin-bottom:0">
            <el-col
              :span="23"
              style="text-align:right"
            >
              <lableName
                :validrule="validrule"
                cur-label-name="城市查询"
                :is-show-label="isShowLabel"
              />
              <el-input
                v-model="secvalue"
                size="small"
                placeholder="请输入城市名称"
              />
            </el-col>
          </el-row>
        </div>
        <el-row type="filter-container storeCollapse">
          <el-col
            :span="12"
            class="leftButtom"
          >
            <!-- 全部折叠-->
            <el-button
              ref="fexxx"
              @click="collapseAll"
            >{{ collaseStr }}</el-button>
            <!-- 全选-->
            <el-button
              v-model="checkAll"
              @click="selectAll"
            >{{ selectStr }}</el-button>
            <!-- 禁选停用专营店-->
            <el-checkbox
              v-model="isAble"
              :indeterminate="indeterminate"
            >禁选停用城市</el-checkbox>
          </el-col>
          <el-col
            :span="12"
            class="rightButtom"
          >
            <el-button
              size="small"
              @click="checkSellct"
            >勾选</el-button>
            <el-button
              size="small"
              @click="uncheckSellct"
            >不勾选</el-button>
            <el-button
              size="small"
              @click="curPopupsVisible=false"
            >取消</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="filter-container storeCollapse" style="margin:5px 0px;">
        <el-checkbox
          style="font-size:19px;text-align:center;margin-left:10px;width:11%;"
          :indeterminate="indeterminate"
          v-model="checkAll"
          @change="selectAll()"
          :disabled="!isMul"
        >全选</el-checkbox>
      </div>-->
      <div
        id="orgDlrselect"
        class="buttom"
      >
        <template v-for="(item,key) in distributorsInfo">
          <el-collapse
            :key="`distri_${key}`"
            v-model="activeNames"
          >
            <el-collapse-item :name="item.id">
              <template slot="title">
                <div class="bigTitle">
                  <label
                    ref="provinceName"
                    class="el-checkbox"
                    :value="item.provinceName"
                    :is-checked="item.selected"
                    :disabled="!isMul"
                    :class="[item.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
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
                        :disabled="!isMul"
                        :is-checked="item.selected"
                      >
                    </span>
                    <span
                      class="el-checkbox__label"
                      v-html="item.provinceName"
                    />
                  </label>
                </div>
              </template>
              <span
                v-for="(area,key) in item.area"
                :key="`area${key}`"
                class="countryArea"
              >
                <label
                  :id="area.id"
                  :ref="item.bigArea"
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
                  <span
                    class="el-checkbox__label"
                    v-html="brightenKeyword(area.partitionName, secvalue)"
                  />
                </label>
              </span>
            </el-collapse-item>
          </el-collapse>
        </template>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
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
import { constants } from 'crypto'
export default {
  name: 'DrlDialog',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  mixins: [valueObjectMixins],
  props: {
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: '' },
    comType: { type: String, default: '' },
    codeField: { type: String, default: '' },
    popupsKey: { type: String, default: '' },
    isMul: { type: Boolean, default: true },
    validrule: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShowLabel: true,
      isAble: false,
      activeNames: ['1', '2'],
      collseName: [],
      input: '',
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
      indeterminate: false,
      distributorsInfo: [],
      dirButorsInfo: [],
      radio: '2',
      isMuld: this.isMul,
      formField: {
        provinceId: '' // 省份ID
      },
      // 全部折叠字符串
      collaseStr: this.$t('org.label.collapseAll'),
      // 全选字符串
      selectStr: this.$t('org.label.selectAll'),
      // 选中城市
      childnodeSelected: false
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
    // 判断品牌是否禁用
    // if (that.$parent.parentFileds !== "") {
    // that.carBrandDisabled = true;
    // this.componentsKeys.carBrandCode = this.componentsKeys.carBrandCode + "a";
    // } else {
    // that.carBrandDisabled = false;
    // this.componentsKeys.carBrandCode = this.componentsKeys.carBrandCode + "a";
    // }

    // // 默认品牌
    // if (that.formField.carBrandCode === "") {
    //   that.formField.carBrandCode = that.$store.getters.orgInfo.BRAND_CODE;
    // }
    // 用于备份
    // that.backFormField = JSON.parse(JSON.stringify(that.formField));
    // that.backFormCode = JSON.parse(JSON.stringify(that.formCode));

    // that.fetchData();
  },
  methods: {
    fetchData() {
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgCityQueryFindAll,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              'provinceName',
              'provinceCode',
              'provinceId',
              'cityId',
              'cityName'
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
          response.result === '1' && response.rows
        ) {
          this.distributorsInfo = response.rows

          // 处理数据
          var distributorsInfoTemp = []
          var provinceObj = {}
          // 第一次循环找出城市
          for (var i = 1; i < this.distributorsInfo.length; i++) {
            provinceObj = {}
            var flag = true
            for (var j = 0; j < distributorsInfoTemp.length; j++) {
              if (this.distributorsInfo[i].provinceName) {
                if (
                  distributorsInfoTemp[j].provinceName ==
                  this.distributorsInfo[i].provinceName
                ) {
                  flag = false
                  break
                }
              }
            }
            if (flag) {
              provinceObj['provinceName'] = this.distributorsInfo[
                i
              ].provinceName
              provinceObj['selected'] = false
              provinceObj['indeterminate'] = false
              provinceObj['id'] = this.distributorsInfo[i].provinceId
              provinceObj['provinceCode'] = this.distributorsInfo[
                i
              ].provinceCode
              distributorsInfoTemp.push(provinceObj)
              this.activeNames.push(this.distributorsInfo[i].provinceId)
              this.collseName.push(this.distributorsInfo[i].provinceId)
            }
          }

          // 第二遍根据大区循环找出小区
          for (var i = 0; i < distributorsInfoTemp.length; i++) {
            var cityList = this.distributorsInfo.filter(
              o => o.provinceName == distributorsInfoTemp[i].provinceName
            )
            distributorsInfoTemp[i]['area'] = []
            var cityArea = {}
            for (var j = 0; j < cityList.length; j++) {
              cityArea = {}
              cityArea['id'] = cityList[j].cityId
              cityArea['partitionName'] = cityList[j].cityName
              // smallArea["indeterminate"] = false;
              cityArea['selected'] = false
              var isIncludes = distributorsInfoTemp[i].area.filter(
                o => o.id == cityList[j].cityId
              )
              if (isIncludes.length == 0) {
                distributorsInfoTemp[i].area.push(cityArea)
              }
            }
          }
          // 回显
          const tmpCode = (this.code || '').replace(/\s*/g, '')
          this.dlrDefault = tmpCode.split(',')
          this.distributorsInfo = distributorsInfoTemp
          this.distributorsInfo.forEach(item => {
            item.area.forEach(citem => {
              this.dlrDefault.forEach(index => {
                if (citem.id == index) {
                  citem.selected = true
                }
              })
            })
          })
          this.dirButorsInfo = this.distributorsInfo
        }
      })
    },
    // 获取数据
    getSelData() {
      this.sendData.name = []
      this.sendCode.code = []
      if (!this.childnodeSelected) {
        var chooseDir = document.getElementsByClassName('chooseDir')
        for (var i = 0; i < chooseDir.length; i++) {
          if (chooseDir[i].innerHTML.length > 0) {
            if (chooseDir[i].parentNode.parentNode.firstChild.checked == true) {
              this.sendData.name.push(
                chooseDir[i].parentNode.parentNode.firstChild.defaultValue
              )
              this.sendData.code.push(
                chooseDir[i].parentNode.parentNode.firstChild.id
              )
            }
          }
        }
      } else {
        this.distributorsInfo.forEach(item => {
          item.area.forEach(citem => {
            if (citem.selected) {
              this.sendData.name.push(citem.partitionName)
              this.sendData.code.push(citem.id)
            }
          })
        })
      }
    },
    sendCode() {
      this.getSelData()
      this.$emit(
        'changeCode',
        this.sendData.code.toString(),
        this.sendData.name.toString(),
        this.codeField,
        this.comType,
        this.popupsKey
      )
    },
    // 全选/全不选
    selectAll() {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.selectStr = this.$t('org.label.noselectAll')
      } else {
        this.selectStr = this.$t('org.label.selectAll')
      }
      this.distributorsInfo.forEach(item => {
        item.selected = this.checkAll
        item.area.forEach(citem => {
          citem.selected = this.checkAll
        })
      })
      this.childnodeSelected = true
    },
    // 折叠
    collapseAll() {
      if (this.activeNames.length === 0) {
        this.activeNames = this.collseName
      } else {
        this.activeNames = []
      }
    },
    click1(initem) {
      initem.selected = !initem.selected
      initem.area.forEach(item => {
        item.selected = initem.selected
      })
      if (!initem.selected) {
        this.checkAll = false
      }
      this.childnodeSelected = true
    },

    click2(area) {
      area.selected = !area.selected
      this.childnodeSelected = true
    },
    // 筛选变色
    brightenKeyword(val, keyword, status) {
      const Reg = new RegExp(keyword, 'i')
      if (status == '1' && this.isAble == true) {
        var res = `<span  style="color: #eee;">${keyword}</span>`
      }
      if (val) {
        const res = val.replace(
          Reg,
          `<span ref="chooseDir" class="chooseDir" >${keyword}</span>`
        )
        return res
      }
    },
    pushArea(item) {
      if (this.isMuld) {
        item.selected = !item.selected
      } else {
        const flag = item.selected
        this.distributorsInfo.forEach(item => {
          item.area.forEach(citem => {
            citem.selected = false
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
            chooseDir[i].parentNode.parentNode.firstChild.checked == false ||
            chooseDir[i].parentNode.parentNode.firstChild.checked == undefined
          ) {
            chooseDir[i].parentNode.parentNode.firstChild.click()
            chooseDir[i].parentNode.parentNode.firstChild.setAttribute(
              'checked',
              'true'
            )
          }
        }
      }
    },
    // 反勾选
    uncheckSellct(e) {
      var chooseDir = document.getElementsByClassName('chooseDir')
      for (var i = 0; i < chooseDir.length; i++) {
        if (chooseDir[i].innerHTML.length > 0) {
          if (chooseDir[i].parentNode.parentNode.firstChild.checked == true) {
            chooseDir[i].parentNode.parentNode.firstChild.click()
            chooseDir[i].parentNode.parentNode.firstChild.setAttribute(
              'checked',
              'false'
            )
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .sendStyle {
  margin: 15px 10px;
  height: 33px;
  text-align: right;
}
/deep/ .csslableName {
  width: 0px;
}
/deep/ .el-dialog {
  height: 600px;
}
/deep/ .bigTitle {
  padding-left: 5px;
  background-color: #d9e6e2;
  //63FFCB
  width: 100%;
}
/deep/ .areaTitle {
  padding-left: 5px;
  background: #c9ded7;
  // #a9d0c3 bff9e6
  width: 100%;
}
/deep/ .el-collapse-item {
  margin-bottom: 2px;
}
/deep/ .el-collapse-item__content {
  padding-bottom: 0px;
}
/deep/ .el-collapse-item__wrap {
  border-bottom: none;
  padding-left: 10px;
}
.el-collapse {
  border-top: none;
  border-bottom: none;
}
.countryArea {
  display: inline-block;
  margin: 0 10px;
}
input[type="checkbox"] {
  vertical-align: middle;
  position: relative;
  top: -1px;
}
/deep/ .chooseDir {
  color: red;
}
/deep/ .top {
  width: 100%;
  background-color: #fff;
}
/deep/ .buttom {
  position: relative;
  // height: 100%;
  width: 100%;
  top: 10px;
  overflow: auto;
}
/deep/ #orgDlrselect {
  height: calc(108% - 152px)!important;
}
/deep/ .el-collapse-item__header.is-active {
  width: 100%;
  background-color: #d9e6e2 !important;
}
/deep/ .el-collapse-item__header {
  width: 100%;
  background-color: #d9e6e2 !important;
}
/deep/ .leftButtom.el-col.el-col-12 {
  padding-left: 20px;
}
/deep/ .rightButtom.el-col.el-col-12 {
  padding-left: 90px;
}
/deep/ .el-dialog__body{
  overflow: hidden!important;
}
/deep/ .dialog-footer{
  float: right;
}
</style>

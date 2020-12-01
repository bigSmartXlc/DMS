 <!--
* description: 小区弹出框（含输入框）
* author: meijq
* createdDate: 2019-08-19
-->
 <template>
  <section class="smallArea">
    <el-dialog
      v-dialogDrag
      title="小区设置"
      :visible.sync="curPopupsVisible"
      width="1000px"
      center
      @close="sendCode"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <dialogHeader
        slot="title"
        :title="'小区设置'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div
        class="top"
        id="orgSearch"
      >
        <div class="filter-container filter-params">
          <el-row style="margin-bottom:0">
            <el-col
              :span="24"
              style="text-align:right"
            >
              <lableName
                curLabelName="查找"
                :isShowLabel="isShowLabel"
              ></lableName>
              <el-input
                size="small"
                v-model="secvalue"
                placeholder="请输入小区名称"
              ></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex">
          <el-col
            :span="24"
            :offset="11"
          >
            <div class="filter-container filter-button">
              <!-- <el-button size="small" @click="checkSellct">勾选</el-button>
              <el-button size="small" @click="uncheckSellct">不勾选</el-button>-->

              <el-checkbox
                style="font-size:19px;text-align:left;margin-left:35px;width:7%;"
                :indeterminate="indeterminate"
                v-model="checkAll"
                @change="selectAll()"
                :disabled="!isMul"
              >全选</el-checkbox>
              <el-button
                ref="fexxx"
                @click="collapseAll"
              >全部折叠</el-button>
              <div class="buttonRight">
                <el-button
                  size="small"
                  type="primary"
                  @click="sendCode"
                >确认</el-button>
                <el-button
                  size="small"
                  @click="sendCode"
                >返回</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="filter-container filter-title">查询条件</div> -->
      <el-collapse
        class="filter-container storeCollapse"
        style="margin:5px 0px;"
      >
        <template v-for="(item,key) in distributorsInfo">
          <el-collapse
            v-model="activeNames"
            :key="`bigArea_${key}`"
          >
            <el-collapse-item :name="item.id">
              <template slot="title">
                <div class="bigTitle">
                  <label
                    ref="bigArea"
                    class="el-checkbox"
                    :value="item.bigArea"
                    :is-checked="item.selected"
                    :disabled="!isMul"
                    @change="click1(item)"
                    :class="[item.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
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
                    <!-- <div
                        class="chickSpan"
                        v-html="brightenKeyword(country.fieldName,secvalue)"
                        ></div>-->
                    <span
                      class="el-checkbox__label"
                      v-html="brightenKeyword(item.bigArea, secvalue)"
                    />
                  </label>
                </div>
              </template>
              <span
                class="countryArea"
                v-for="(area,key) in item.area"
                :key="`smallArea_${key}`"
              >
                <label
                  ref="bigArea"
                  class="el-checkbox"
                  :value="area.partitionName"
                  :is-checked="area.selected"
                  :disabled="!isMul"
                  @change="click2(area)"
                  :class="[area.selected ?'is-checked':'',!isMul ?'is-disabled':'']"
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
      </el-collapse>
    </el-dialog>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
// import lableName from "@/components/lableName";
export default {
  name: "drlDialog",
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: "" },
    comType: { type: String, default: "" },
    codeField: { type: String, default: "" },
    popupsKey: { type: String, default: "" },
    isMul: { type: Boolean, default: true }
  },
  data() {
    return {
      isShowLabel: true,
      isAble: false,
      activeNames: ["1", "2"],
      collseName: [],
      input: "",
      sendData: {
        code: [],
        name: []
      },
      dlrDefault: [],
      curPopupsVisible: this.popupsVisible,
      toggleParam: false,
      checked: false,
      checkAll: false,
      secvalue: "",
      indeterminate: false,
      distributorsInfo: [],
      dirButorsInfo: [],
      radio: "2",
      isMuld: this.isMul,
      componentsKeys: {
        inputCode: "e",
        bigAreaCode: "a",
        smallAreaCode: "b",
        cityCode: "c",
        provinceCode: "d"
      },
      formField: {
        // pvAccount: "",
        // provinceId: "", //省份ID
        // cityId: "", //城市ID
        bigAreaId: "", //大区ID
        smallAreaId: "" //小区ID
      },
      formCode: {
        provinceCode: "",
        cityCode: "",
        bigAreaCode: "",
        smallAreaCode: ""
      },
      // 勾选父级
      parentRowObj: {}
    };
  },
  created() {
    this.fetchData();
  },
  // watch: {
  //   popupsVisible(val){
  //     this.curPopupsVisible = val
  //     if(val){
  //       this.setDefaultValue()
  //     }
  //   }
  // },
  methods: {
    fetchData() {
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgSmallAreaQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              "smallAreaName",
              "smallAreaId",
              "bigAreaName",
              "bigAreaId"
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
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (
          response.result === "1" &&
          response.rows
        ) {
          this.distributorsInfo =
            response.rows;
          //处理数据
          var distributorsInfoTemp = [];
          var bigArea = {};
          //第一次循环找出大区
          for (var i = 0; i < this.distributorsInfo.length; i++) {
            bigArea = {};
            var flag = true;
            for (var j = 0; j < distributorsInfoTemp.length; j++) {
              if (
                distributorsInfoTemp[j].bigArea ==
                this.distributorsInfo[i].bigAreaName
              ) {
                flag = false;
                break;
              }
            }
            if (flag) {
              bigArea["bigArea"] = this.distributorsInfo[i].bigAreaName;
              bigArea["selected"] = false;
              bigArea["indeterminate"] = false;
              bigArea["id"] = this.distributorsInfo[i].bigAreaId;
              distributorsInfoTemp.push(bigArea);
              this.activeNames.push(this.distributorsInfo[i].bigAreaId);
              this.collseName.push(this.distributorsInfo[i].bigAreaId);
            }
          }

          //第二遍根据大区循环找出小区
          for (var i = 0; i < distributorsInfoTemp.length; i++) {
            var smallAreaList = this.distributorsInfo.filter(
              o => o.bigAreaName == distributorsInfoTemp[i].bigArea
            );
            distributorsInfoTemp[i]["area"] = [];
            var smallArea = {};
            for (var j = 0; j < smallAreaList.length; j++) {
              smallArea = {};
              smallArea["id"] = smallAreaList[j].smallAreaId;
              smallArea["partitionName"] = smallAreaList[j].smallAreaName;
              // smallArea["indeterminate"] = false;
              smallArea["selected"] = false;
              var isIncludes = distributorsInfoTemp[i].area.filter(
                o => o.id == smallAreaList[j].smallAreaId
              );
              if (isIncludes.length == 0) {
                distributorsInfoTemp[i].area.push(smallArea);
              }
            }
          }
          this.distributorsInfo = distributorsInfoTemp;
          this.dirButorsInfo = this.distributorsInfo;
          this.setDefaultValue();
        }
      });
    },
    //设置默认值
    setDefaultValue() {
      if (this.code === null || this.code === "") return;
      var defaultCode = this.code.split(",");
      this.distributorsInfo.forEach(bigArea => {
        bigArea.area.forEach(smallArea => {
          defaultCode.forEach(code => {
            // 去掉空字符
            code = code.replace(" ", "");
            if (smallArea.id === code) {
              smallArea.selected = true;
            }
          });
        });
      });
    },
    //获取数据
    getSelData() {
      this.sendData.name = [];
      this.sendCode.code = [];
      this.distributorsInfo.forEach(item => {
        item.area.forEach(citem => {
          if (citem.selected) {
            this.sendData.name.push(citem.partitionName);
            this.sendData.code.push(citem.id);
          }
        });
      });
    },
    sendCode() {
      this.getSelData();
      this.$emit(
        "changeCode",
        this.sendData.code.toString(),
        this.sendData.name.toString(),
        this.codeField,
        this.comType,
        this.popupsKey
      );
    },
    selectAll() {
      this.distributorsInfo.forEach(item => {
        item.selected = this.checkAll;
        item.area.forEach(citem => {
          citem.selected = this.checkAll;
        });
      });
    },
    collapseAll() {
      if (this.activeNames.length === 0) {
        this.activeNames = this.collseName;
      } else {
        this.activeNames = [];
      }
    },
    click1(initem) {
      initem.selected = !initem.selected;
      initem.area.forEach(item => {
        item.selected = initem.selected;
      });
      if (!initem.selected) {
        this.checkAll = false;
      }
    },
    click2(initem) {
      this.$nextTick(() => {
        this.parentidFun(this.distributorsInfo, initem);
        // 计数单位
        let rowNuber = 0;
        let parentRow = this.parentRowObj.area;
        for (let i = 0; i < parentRow.length; i++) {
          if (parentRow[i].selected) {
            rowNuber++;
          }
        }
        // 判断如果都不勾选 则大区取消勾选
        if (rowNuber > 0) {
          this.parentRowObj.selected = false;
        }
        if (rowNuber === parentRow.length) {
          this.parentRowObj.selected = true;
        }
      });
      initem.selected = !initem.selected;
    },
    // 递归获取父级元素
    parentidFun(menueList, row) {
      if (menueList && menueList.length > 0) {
        for (var k in menueList) {
          if (menueList[k].area) {
            if (menueList[k].area.filter(o => o.id === row.id).length > 0) {
              this.parentRowObj = menueList[k];
              return;
            } else {
              this.parentidFun(menueList[k].area);
            }
          }
        }
      }
    },
    // 筛选变色
    brightenKeyword(val, keyword, status) {
      const Reg = new RegExp(keyword, "i");
      if (status == "1" && this.isAble == true) {
        var res = `<span  style="color: #eee;">${keyword}</span>`;
      }
      if (val) {
        const res = val.replace(
          Reg,
          `<span ref="chooseDir" class="chooseDir" >${keyword}</span>`
        );
        return res;
      }
    },
    pushArea(item) {
      if (this.isMuld) {
        item.selected = !item.selected;
      } else {
        let flag = item.selected;
        this.distributorsInfo.forEach(item => {
          item.area.forEach(citem => {
            citem.selected = false;
          });
        });
        item.selected = flag;
        item.selected = !item.selected;
      }
    },
    //勾选
    checkSellct(e) {
      var chooseDir = document.getElementsByClassName("chooseDir");
      for (var i = 0; i < chooseDir.length; i++) {
        if (chooseDir[i].innerHTML.length > 0) {
          if (
            chooseDir[i].parentNode.parentNode.firstChild.getAttribute(
              "checked"
            ) == "false" ||
            chooseDir[i].parentNode.parentNode.firstChild.getAttribute(
              "checked"
            ) == undefined
          ) {
            chooseDir[i].parentNode.parentNode.firstChild.click();
            chooseDir[i].parentNode.parentNode.firstChild.setAttribute(
              "checked",
              "true"
            );
          }
        }
      }
    },
    //反勾选
    uncheckSellct(e) {
      var chooseDir = document.getElementsByClassName("chooseDir");
      for (var i = 0; i < chooseDir.length; i++) {
        if (chooseDir[i].innerHTML.length > 0) {
          if (
            chooseDir[i].parentNode.parentNode.firstChild.getAttribute(
              "checked"
            ) == "true"
          ) {
            chooseDir[i].parentNode.parentNode.firstChild.click();
            chooseDir[i].parentNode.parentNode.firstChild.setAttribute(
              "checked",
              "false"
            );
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner {
  width: 100%;
}
/deep/ .filter-params .el-col label {
  width: 95px;
}
/deep/ .filter-button {
  text-align: left;
}
/deep/ .el-col-offset-11 {
  margin-left: 0;
}
/deep/ .csslableName {
  width: 0px;
}
/deep/ .el-dialog {
  // height: calc(100% - 10%);
}
/deep/ .bigTitle {
  padding-left: 60px;
  text-align: left;
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
  text-align: left;
  padding: 0 50px;
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
/deep/ .el-collapse-item__header {
  line-height: 36px;
  width: 100%;
}

/deep/ .el-dialog__body {
  overflow-x: hidden !important;
}
/deep/ .filter-container.storeCollapse {
  height: 400px !important;
  margin: 5px 0px;
  width: 100%;
  overflow: auto;
  position: relative;
}
/deep/ .top {
  width: 100%;
  background-color: #fff;
}
/deep/ .el-collapse-item__arrow.el-icon-arrow-right.is-active {
  display: none;
}
/deep/ .el-collapse-item__arrow.el-icon-arrow-right {
  display: none;
}
/deep/ .buttonRight {
  float: right;
  margin-right: 10px;
}
/deep/ .el-checkbox__inner::after {
  transition: none !important;
}
</style>

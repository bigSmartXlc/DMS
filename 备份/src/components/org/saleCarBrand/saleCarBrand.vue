<!--
* description: 品牌下拉框（多选，单选）,支持搜索
* author: chenjinming
* createdDate: 2019-12-23
-->
<template>
  <section>
    <el-col :span="span" v-if="curIsShow" :key="fullComponentKey">
      <lableName
        :validrule="validrule"
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-select
        :multiple="isMul"
        collapse-tags
        :filterable="false"
        v-model="modelCode"
        :placeholder="placeholder"
        @clear="clearCode"
        :clearable="clearable"
        @change="sendCode"
        :disabled="disabled"
        size="small"
      >
        <el-option
          v-for="item in optionDatas"
          :key="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
          :label="item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]]"
          :value="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
        >{{item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]]}}</el-option>
      </el-select>
      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { dropdownMixins } from "@/components/mixins/dropdownMixins";
// import lableName_from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: "carBrand",
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: "carBrandCode" },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: "carBrandCn" },
    // 是否使用默认品牌
    isUseDefault: { type: Boolean, default: false },
    // 是否可清除选项
    clearable: { type: Boolean, default: false },
    unListQuryFields: { type: String, default: "isEnable,dlrId" },
    orgId: { type: String, default: "" },
    carBrandCode: { type: String, default: "" }
  },
  data() {
    return {
      // orgId: "",
      listQuery: {
        // dlrId: "",
        carBrandCode: ""
      },
      // 是否强制使用缓存
      useCache: true,
      // 默认绑定数据对象字段
      defOptionFields: ["carBrandCode", "carBrandCn"],
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "品牌" : this.labelName,
      // API配置对象
      apiConfig: orgApis.mdmCarBrandQueryByPage,
      // 表格中台返回网格的字段
      apiQueryRow: ["carBrandCn", "carBrandCode"]
    };
  },
  created() {
    this.query();
    // 如果没有赋值，则品牌加入默认值
    if (!this.code || this.code === "") {
      if (this.isMul === true) {
        this.modelCode =
          this.isUseDefault === true
            ? [this.$store.getters.orgInfo.BRAND_CODE]
            : [];
      } else {
        this.modelCode =
          this.isUseDefault === true
            ? this.$store.getters.orgInfo.BRAND_CODE
            : "";
      }
      // this.sendCode();
    }
  },
  updated() {
    // this.removeTag();
  },
  methods: {
    // 移除tag时判断是否清除所有
    removeTag() {
      if (this.isMul === true && this.modelCode.length === 0) {
        this.modelCode =
          this.isUseDefault === true
            ? [this.$store.getters.orgInfo.BRAND_CODE]
            : [];
        this.sendCode();
      }
    },
    query() {
      var list = {
        orgId: this.orgId,
        // carBrandCode: this.carBrandCode,
        relationType: 0
      };
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgBrandRQueryFindAll,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: ["carBrandCode"]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: 10,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: list
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 不存在则请求中台API数据
      // 调用中台API方法（可复用）
      const curVer = this.requestVer;
      this.$requestAPI(paramD).then(response => {
        if (curVer === this.requestVer) {
          this.isLoadedData = true;
          if (
            response.result === "1" &&
            response.rows
          ) {
            var reaDatas = response.rows;
            var temp = [];
            for (var k in reaDatas) {
              temp.push(reaDatas[k].carBrandCode);
            }
            // var reaList = [];
            this.modelCode = temp;
            // debugger;
            // for (var i = 0; i <= reaDatas.length; i++) {
            //   // reaDatas[i];
            //   debugger;
            // }
          }
          // 判断code是否存在查询结果中
          // this.checkOptionValue(this);
        }
      });
    }
  }
};
</script>

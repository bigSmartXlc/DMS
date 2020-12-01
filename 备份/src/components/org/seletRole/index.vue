<!--
* description: 角色下拉框（多选，单选）,支持搜索
* author: ydche
* createdDate: 2019-07-27
* 增加文字溢出效果 liyam: 2019-08-5
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <section>
    <el-col :span="span">
      <lableName    :validrule="validrule"
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-select
        :multiple="isMul"
        collapse-tags
        :filterable="filterable"
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
      <validateFormate
        :curLabelName="curLabelName"
        :validrule="validrule"
      ></validateFormate>

    </el-col>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { dropdownMixins } from "@/components/mixins/dropdownMixins";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: "carBrand",
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  props: {
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: "carBrandCode" },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: "carBrandCn" },
    // 传入的查询条件
    roleOrgType: { type: String, default: "0,1,2,3,4,5,6,7,8" }
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['roleId', 'roleName'],
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "管理员角色" : this.labelName,
      // API配置对象
      apiConfig: orgApis.sysRoleQueryGloableByPage,
      // 表格中台返回网格的字段
      apiQueryRow: ["roleName", "roleCode", "roleId"],
      listQuery: {
        enabled:1,
        roleOrgType: this.roleOrgType
      }
    };
  },
  created() {},
  updated() {},
  methods: {
    // 移除tag时判断是否清除所有

    // 查询方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    queryTable(apiConfig, apiQueryRow) {
      const queryObj = {
        // api配置
        apiConfig: apiConfig,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: apiQueryRow
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            enabled:1,
            roleOrgType: this.listQuery.roleOrgType
          }
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 检查查询结果已经存在且未过期
      var cacheData = this.$OrgCacheData.CacheObject[
        queryObj.apiConfig.ServiceCode
      ];
      if (cacheData) {
        this.optionDatas = cacheData.getData(queryObj) || [];
      } else {
        this.optionDatas = [];
      }
      // var cacheData = this.$OrgCacheData.CacheObject.cacheDatas.filter(o => o.cacheName === queryObj.apiConfig.ServiceCode && o.useCache === true)
      if (this.optionDatas.length === 0) {
        // 不存在则请求中台API数据
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD).then(response => {
          if (
            response.result === "1" &&
            response.rows
          ) {
            this.optionDatas =
              response.rows;
            // 赋值缓存
            if (cacheData) {
              cacheData.setData(
                queryObj,
                response.rows
              );
            }
          }
        });
      }
    }
  }
};
</script>

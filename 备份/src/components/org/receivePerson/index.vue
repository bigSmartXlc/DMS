<!--
* description: 领用人员下拉框,支持搜索
* author: lixb
* createdDate: 2019-11-15
-->
<<template>
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
  name: "receivePerson",
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    orgTreeId: { type: String, default: "" },
    orgName: { type: String, default: "" }
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ["empId", "empName"],
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "领用人员" : this.labelName,
      // API配置对象
      apiConfig: orgApis.mdmOrgEmployeeQueryFindAll,
      // 表格中台返回网格的字段
      apiQueryRow: [
        "empId",
        "deptId",
        "orgName",
        "dlrCode",
        "empCode",
        "empName",
        "genderCode"
      ],
      // 查询条件
      listQuery: {
        deptId: this.orgTreeId,
        dlrId: this.$store.getters.orgInfo.DLR_ID || ""
      }
    };
  }
};
</script>

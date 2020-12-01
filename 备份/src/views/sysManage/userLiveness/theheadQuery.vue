<!--
* description: 用户活跃度报表-头部区域
* author: mwhao
* createdDate: 2020-1-8
-->
<template>
  <section>
    <div class="groupMenueEdit">
      <div class="filter-container filter-params">
        <el-row>
            <!-- 用户活跃度报表 -->
          <el-col :span="6" v-if="typeName===1">
            <label>统计用户数量:</label>
            <el-select collapse-tags filterable v-model="formField.num" clearable size="small">
              <el-option
                v-for="item in menutypeOption"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </el-col>
            <!-- 用户访问列表 -->
          <el-col :span="6" v-if="typeName===2">
            <label>用户名称:</label>
          <el-input v-model="formField.search"></el-input>
          </el-col>
          <el-col :span="6">
            <label>日期范围:</label>
            <el-date-picker
              v-model="value1"
              type="daterange"
              :value-format="format"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <label>活跃度排序:</label>
            <el-select collapse-tags filterable v-model="formField.sort" clearable size="small">
              <el-option
                v-for="item in livenessList"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <label>访问平台:</label>
            <el-select collapse-tags filterable v-model="formField.platType" clearable size="small">
              <el-option
                v-for="item in accessPlatform"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </el-col>
          <el-col :span="12" :offset="12">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // 标签页类型   1:用户活跃度报表 2:用户访问列表
    typeName: { type: Number, default: 0 }
  },
  data() {
    return {
      // 日期范围
      format: "yyyy-MM-dd",
      //   format: "yyyy-MM-dd HH:mm:ss",
      value1: "",
      // 下拉框循环数组
      menutypeOption: [
        { code: "15", label: "15" },
        { code: "20", label: "20" },
        { code: "30", label: "30" },
        { code: "40", label: "40" },
        { code: "50", label: "50" }
      ],
      livenessList: [
        { code: "desc", label: "不活跃" },
        { code: "asc", label: "活跃" }
      ],
      accessPlatform: [
        { code: "-1", label: "不限" },
        { code: "0", label: "pc端" },
        { code: "1", label: "移动端" }
      ],
      //表单查询数据
      formField: {
        num: "15",
        startTime: "",
        endTime: "",
        platType: "-1", // 不限:-1  pc端:0  移动端:1
        sort: "desc", // 活跃:desc  不活跃asc
        search:"",
        pagesize:10,
        pageindex:1,
        sortField:"TOTAL",
        type:"USER"
      }

    };
  },
  methods: {
    // 日期选中事件
    changeTime(val) {
      this.formField.startTime = val[0];
      this.formField.endTime = val[1];
    },
    // 查询
    query() {
        console.log(this.typeName)
        let form=this.formField
      if (this.typeName===1) {
          // 用户活跃度查询
          let liveness={
              num:form.num,
              startTime:form.startTime,
              endTime:form.endTime,
              platType:form.platType,
              sort:form.sort
          }
        this.$store
          .dispatch("sysManage/userStatementQuery",liveness)
          .then(response => {
            if (response.result === "1") {
              console.log(response);
            }
          });
      } else {
          // 用户访问列表查询
            let List={
              search:form.search,
              startTime:form.startTime,
              endTime:form.endTime,
              platType:form.platType,
              sort:form.sort,
              pagesize:form.pagesize,
              pageindex:form.pageindex,
              sortField:form.sortField,
              type:form.type
          }
            this.$store
          .dispatch("sysManage/userListQuery",List)
          .then(response => {
            if (response.result === "1") {
              console.log(response);
            }
          });
      }
    }
  }
};
</script>

<style>
</style>
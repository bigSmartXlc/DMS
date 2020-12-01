 <!--
* description: 首页
* createdDate: 2019-11-28
* author: 对首页可配置化进行修改 mawenhao 2019-11-28
-->
<template>
  <div id="dashboardScoll">
    <div id="dashboard-container" class="dashboard-container">
      <el-row span="24" :key="key" style="height:100%">
        <div v-if="options.length>1" class="workbenchStyle">
          <el-select v-model="value" placeholder="请选择" @change="change">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <component
          v-for="(comp,index) in tableComponents"
          :key="index"
          :span="comp.span"
          :is="comp.component"
          :doDoStyle="comp.dataToObject"
        ></component>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getters } from "@/store/getters";
import { getOrgInfoCookie } from "@/utils/auth";
import { orgApis } from "@/api/apiList/org";
import Vue from "vue";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  // 阻塞路由预加载网格中组件的数据
  // beforeRouteEnter(to, from, next) {

  // },

  data() {
    let viewPageCode = this.$store.getters.orgInfo.SOLUTION_ID;
    // let viewPageCode = "aaa";
    // 绑定事件配置化事件  参数1：当前this  参数2：账号标识 SOLUTION_ID
    this.$ConfigCache.CacheConfig.bindEvent(this, viewPageCode);
    return {
      key: "logokey",
      // 下拉框
      options: [],
      value: "",
      formField: {
        isEnable: "",
        lookupTypeCode: "VE0637"
      },
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.doSome(CacheConfig.cacheData[viewPageCode].tableComponents)
          : [
              {
                span: 24,
                component: () =>
                  import("@/components/dashboard/sys/todoArea/todoArea")
              }, // 滚动需求组件
              {
                span: 12,
                component: () =>
                  import("@/components/dashboard/sys/menuArea/menuArea")
                // toDoStyle: "margin-top:-120px"
              }, // 快捷菜单组件
              {
                span: 12,
                component: () =>
                  import("@/components/dashboard/sys/affiChe/affiChe")
              } // 我的公告组件

              // {
              //   span: 18,
              //   component: () =>
              //     import("@/components/dashboard/sys/formChart/formChart")
              // },// 业绩报表
              // {
              //   span: 6,
              //   component: () =>
              //     import("@/components/dashboard/sys/myChart/myChart")
              // } // 我的公告echart组件
            ]
    };
  },
  created() {
    const that = this;
    const solutionIdArr = [];
    // 登录时页面信息getOrgInfoCookie()  注: 当中台没有数据的时候会报错
    if (
      typeof getOrgInfoCookie() == "undefined" ||
      getOrgInfoCookie() == "undefined" ||
      getOrgInfoCookie() === ""
    ) {
      solutionIdArr.push("1");
    } else {
      var getOrgInfo = JSON.parse(getOrgInfoCookie()).SOLUTION_ID;
      if (typeof getOrgInfo === "string") {
        if (getOrgInfo === "") {
          solutionIdArr.push("1");
        } else {
          solutionIdArr.push(getOrgInfo);
        }
      } else if (getOrgInfo instanceof Array) {
        // 判断参数为数组 (参数类型未定)
        solutionIdArr = getOrgInfo;
      }
    }
    // 参数1：账号标识 SOLUTION_ID 参数2：一定要有next()
    Vue.prototype.$ConfigCache.CacheConfig.initData(solutionIdArr, function() {
      that.fetchData();
      that.optionObjleng();
    });
  },
  methods: {
    // 工作台下拉框 查询API
    fetchData() {
      const queryObj = {
        // API配置对象
        apiConfig: orgApis.mdsLookupValueQueryByPage,
        // 表格中台返回网格的字段
        apiServices: [
          {
            apiQueryRow: [
              "oemCode",
              "groupCode",
              "lookupTypeCode",
              "lookupValueCode",
              "lookupValueName"
            ]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        // 下拉查询条件
        variables: {
          pageSize: 100,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: this.formField
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          var lookup = response.data.mdsLookupValueQueryByPage;
          // 将id转换问工作台名称返回
          if (lookup && lookup.length > 0) {
            this.options.filter(o => {
              for (var i = 0; i < lookup.rows.length; i++) {
                if (o.value === lookup.rows[i].lookupValueCode) {
                  o.label = lookup.rows[i].lookupValueName;
                }
              }
              return o;
            });
          }
        }
      });
    },
    // 工作台下拉框数量
    optionObjleng() {
      // 获取下拉框的数量  备注：账号返回多个ID类型不确定 字符串/数组  可根据getOrgInfoCookie() 进行判断
      // var optionLeng = this.$store.getters.orgInfo.SOLUTION_ID;
      const solutionIdArr = [];
      // 登录时页面信息getOrgInfoCookie()
      if (
        typeof getOrgInfoCookie() == "undefined" ||
        getOrgInfoCookie() == "undefined" ||
        getOrgInfoCookie() === ""
      ) {
        solutionIdArr.push("1");
      } else {
        var getOrgInfo = JSON.parse(getOrgInfoCookie()).SOLUTION_ID;
        if (typeof getOrgInfo === "string") {
          if (getOrgInfo === "") {
            solutionIdArr.push("1");
          } else {
            solutionIdArr.push(getOrgInfo);
          }
        } else if (getOrgInfo instanceof Array) {
          solutionIdArr = getOrgInfo;
        }
      }
      for (var i = 0; i < solutionIdArr.length; i++) {
        var obj = { value: "", label: "" };
        if (typeof solutionIdArr[i] === "string") {
          obj.value = solutionIdArr[i];
          obj.label = solutionIdArr[i];
        }
        this.options.push(obj);
      }
    },
    // 值变更
    change(val) {
      var that = this;
      // 查询
      that.$ConfigCache.CacheConfig.initData(val, function() {
        that.tableComponents =
          that.$ConfigCache.CacheConfig.cacheData[val] &&
          that.$ConfigCache.CacheConfig.cacheData[val].tableComponents.length >
            0
            ? that.$ConfigCache.CacheConfig.cacheData[val].tableComponents
            : [
                {
                  span: 18,
                  component: () =>
                    import("@/components/dashboard/sys/todoArea/todoArea")
                },
                {
                  span: 6,
                  component: () =>
                    import("@/components/dashboard/sys/affiChe/affiChe")
                },
                {
                  span: 18,
                  component: () =>
                    import("@/components/dashboard/sys/menuArea/menuArea"),
                  toDoStyle: "margin-top:-120px"
                },
                {
                  span: 18,
                  component: () =>
                    import("@/components/dashboard/sys/formChart/formChart")
                },
                {
                  span: 6,
                  component: () =>
                    import("@/components/dashboard/sys/myChart/myChart")
                }
              ];
      });
      that.$ConfigCache.CacheConfig.bindEvent(this, val);
      that.key = that.key + 1;
    },
    // 解析其他字段
    doSome(val) {
      for (var i = 0; i < val.length; i++) {
        // 判断是否有doDoStyle字段
        if (val[i].dataToObject.doDoStyle !== undefined) {
          val[i].dataToObject = val[i].dataToObject.doDoStyle;
        }
      }
      return val;
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .filter-container {
  background: none;
}
/deep/ .workbenchStyle {
  position: fixed;
  right: 5px;
  top: 45px;
}
</style>

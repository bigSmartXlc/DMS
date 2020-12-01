 <!--
* description: 首页-滚动需求组件
* author: mawenhao 修改
* createdDate: 2019-11-28
-->
<template>
  <section ref="todoArea">
    <el-col :span="span">
      <div class="toDoArea myNoticeLeft" :key="toDoItemKey">
        <el-row class="toDorow">
          <el-col
            :span="spand()"
            class="toDoPart"
            v-for="(toDoItem,index) in toDoItems"
            :key="index"
          >
            <div class="todoareaClass" @click.prevent="handleLink(toDoItem.menuId)">
              <div class="toDoText">
                <!-- 图标 -->
                <i
                  v-if='!(toDoItem.menuName=="无数据"&& toDoItem.menuId==="1")'
                  class="toDoicon"
                  :style="backgroundData[getRemaining(index)].toDoStyle"
                ></i>
                <!-- 文字 -->
                <!-- <div class="toDospan"> -->
                <span>{{toDoItem.remindName}}</span>
                <!-- </div> -->
                <!-- 数据未加载 -->
                <div class="toDoNum" v-show="!upload(toDoItem.recordsLength)">
                  <i class="el-loading-todoArea"></i>
                </div>
                <!-- 数据加载成功 -->
                <!-- 数字 -->
                <div
                  class="toDoNum"
                  v-show="upload(toDoItem.recordsLength)"
                >{{toDoItem.recordsLength}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import store from "@/store";
export default {
  name: "todoArea",
  mixins: [valueObjectMixins],
  props: {
    // 行内占比
    span: { type: Number, default: 24 }
  },
  data() {
    return {
      // 跳转的地址
      targetUrl: "",
      toDoItemKey: "toDoItemKey",
      routerParams: [],
      // 滚动需求参数
      toDoItems: [
        {
          remindId: "1e9e4882a2e149828d4e29069cd079f8",
          remindName: "",
          remindDesc: "",
          menuId: "1",
          menuName: "无数据",
          receiveObjType: "1",
          receiveObjTypeName: "用户",
          receiveObjId: "1",
          receiveObjName: "xtadmin",
          isEnable: "1",
          remindUrl: "",
          remindParam: "",
          recordsLength: ""
        }
      ],
      // 背景图片
      backgroundData: [
        {
          toDoStyle: {
            backgroundImage:
              "url(" + require("@/assets/index/icon-1.png") + ")",
            backgroundSize: "cover"
            //       backgroundColor: "#5391fd"
          }
        },
        {
          toDoStyle: {
            backgroundImage:
              "url(" + require("@/assets/index/icon-2.png") + ")",
            backgroundSize: "cover"
            // backgroundColor: "#ff815b"
          }
        },
        {
          toDoStyle: {
            backgroundImage:
              "url(" + require("@/assets/index/icon-3.png") + ")",
            backgroundSize: "cover"
            // backgroundColor: "#f9ca44"
          }
        },
        {
          toDoStyle: {
            backgroundImage:
              "url(" + require("@/assets/index/icon-4.png") + ")",
            backgroundSize: "cover"
            // backgroundColor: "#3fd9ff"
          }
        },
        {
          toDoStyle: {
            backgroundImage:
              "url(" + require("@/assets/index/icon-5.png") + ")",
            backgroundSize: "cover"
            // backgroundColor: "#438cf7"
          }
        }
      ],
      formField: {
        isEnable: "1"
      }
    };
  },
  created() {
    this.query();
  },
  methods: {
    // 显示比例
    spand() {
      let list = this.toDoItems.length;
      // 如果没设置代办,则显示空白
      if (
        this.toDoItems[0].menuName === "无数据" &&
        this.toDoItems[0].menuId === "1"
      ) {
        list = 24;
      }
      let spanLeng = 4;
      switch (list) {
        case 1: {
          spanLeng = 12;
          break;
        }
        case 2: {
          spanLeng = 12;
          break;
        }
        case 3: {
          spanLeng = 8;
          break;
        }
        case 4: {
          spanLeng = 6;
          break;
        }
        case 5: {
          spanLeng = 5;
          break;
        }
        case 6: {
          spanLeng = 4;
          break;
        }
        case 24: {
          spanLeng = 24;
          break;
        }
        default:
          break;
      }

      return spanLeng;
    },
    // 数据加载
    upload(load) {
      if (load == "undefined") return false;
      if (load >= 0) return true;
    },
    //  过滤
    getRemaining(index) {
      if (index >= 5) {
        index = Math.floor(index / 5);
      }
      return index;
    },
    // api请求
    query() {
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdsSysRemindFindUserByMap,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              "remindId",
              "remindName",
              "remindDesc",
              "menuId",
              "menuName",
              "receiveObjType",
              "receiveObjTypeName",
              "receiveObjId",
              "receiveObjName",
              "isEnable",
              "remindUrl",
              "remindParam"
            ]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: 100,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: this.formField
        }
      };
      // 转换了中台请求格式数据
      const paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          // 判断是否有数据,如果没则默认显示空白
          if (response.rows.length != 0) {
            this.toDoItems = response.rows;
            //数组去重/截取前5个参数
            // this.toDoItems = this.unique(this.toDoItems).slice(0, 6);  // 过滤重复
            this.toDoItems = this.toDoItems.slice(0, 6);  // 过滤重复
            for (let i = 0; i < this.toDoItems.length; i++) {
              // 对json字符串变量进行赋值
              this.toDoItems[i].remindParam = this.jsonVariable(
                this.toDoItems[i].remindParam
              );
              this.toDoItems[i].remindParam = JSON.parse(this.toDoItems[i].remindParam);
              if (this.toDoItems[i].remindParam.routerParams){
                if (this.toDoItems[i].remindParam.routerParams.timeRange){
                  let paramsDate = this.parseDate(this.toDoItems[i].remindParam.routerParams.timeRange);
                  this.toDoItems[i].remindParam[this.toDoItems[i].remindParam.routerParams.timeRange.fieldName.split(",")[0]] = paramsDate[0];
                  this.toDoItems[i].remindParam[this.toDoItems[i].remindParam.routerParams.timeRange.fieldName.split(",")[1]] = paramsDate[1];
                }
                this.routerParams.push(this.toDoItems[i].remindParam.routerParams);
              }
              delete this.toDoItems[i].remindParam.routerParams;
              this.toDoItems[i].remindParam = JSON.stringify(this.toDoItems[i].remindParam);
              // 判断是否为json
              let json = this.isJSON(this.toDoItems[i].remindUrl);
              let json1 = this.isJSON(this.toDoItems[i].remindParam);
              if (json && json1) {
                var apiUrl = JSON.parse(
                  this.toDoItems[i].remindUrl.replace(/\s/g, "")
                );
                var remindParam = JSON.parse(this.toDoItems[i].remindParam);
                var recordsLength = "";
                var that = this.toDoItems[i];
                this.queryLing(apiUrl, remindParam, that);
              }
            }
          }
        }
      });
    },
    // 请求数量设置
    queryLing(apiUrl, data, that) {
      const queryObj = {
        // api配置
        apiConfig: apiUrl,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: []
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: 10,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: data
        }
      };
      // 转换了中台请求格式数据
      const paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.data[apiUrl.ServiceCode].result === "1") {
          that.recordsLength = response.data[apiUrl.ServiceCode].records;
          this.toDoItemKey = this.toDoItemKey + "1";
        }
      });
    },
    // 对json字符串 变量进行替换 参数1:remindParam 代办设置中的参数
    jsonVariable(jsonStr) {
      // 替换
      var startTimeVar = this.getCurrentDate(2); // 开始时间
      var endTimeVar = this.getCurrentDate(2); // 结束时间
      var startTimeMonth = this.getCurrentDate(2,true); // 开始时间(一个月)
      var endTimeMonth = this.getCurrentDate(2); // 结束时间(一个月)
      var dayTime = this.getCurrentDate(1); //当天
      var brandCodeVar = store.getters.orgInfo.BRAND_CODE; // 所属品牌
      var dlrIdVar = store.getters.orgInfo.DLR_ID; // 经销商ID
      var empIdVar = store.getters.orgInfo.EMP_ID; // 员工ID
      var empNameVar = store.getters.orgInfo.empName; // 员工名
      var userIdVar = store.getters.orgInfo.userId; // 用户ID
      var orgIdVar = store.getters.orgInfo.OEM_ID; // 厂商ID
      // 变量
      var startDate = "#startDate#"; // 开始时间
      var endDate = "#endDate#"; // 结束时间
      var startMonth = "#startMonth#"; // 开始时间(一个月)
      var endMonth = "#endMonth#"; // 结束时间(一个月)
      var oneDate = "#oneDate#"; //当天
      var brandCode = "#BRAND_CODE#"; // 所属品牌
      var dlrId = "#DLR_ID#"; // 经销商ID
      var empId = "#EMP_ID#"; // 员工ID
      var empName = "#empName#"; // 员工名
      var userId = "#userId#"; // 用户ID
      var orgId = "#OEM_ID#"; // 厂商ID
      // 判断
      var str = jsonStr.replace(new RegExp(startDate, "g"), function() {
        return startTimeVar;
      });
      var dayT = str.replace(new RegExp(oneDate, "g"), function() {
        return dayTime;
      });
      var end = dayT.replace(new RegExp(endDate, "g"), function() {
        return endTimeVar;
      });
      var brand = end.replace(new RegExp(brandCode, "g"), function() {
        return brandCodeVar;
      });
      var dlr = brand.replace(new RegExp(dlrId, "g"), function() {
        return dlrIdVar;
      });
      var emp = dlr.replace(new RegExp(empId, "g"), function() {
        return empIdVar;
      });
      var empN = emp.replace(new RegExp(empName, "g"), function() {
        return empNameVar;
      });
      var user = empN.replace(new RegExp(userId, "g"), function() {
        return userIdVar;
      });
      var org = user.replace(new RegExp(orgId, "g"), function() {
        return orgIdVar;
      });
      var month = org.replace(new RegExp(startMonth, "g"), function() {
        return startTimeMonth;
      });
      var endmonthTime = month.replace(new RegExp(endMonth, "g"), function() {
        return endTimeMonth;
      });

      return endmonthTime;
    },
    // 数组去重
    // unique(arr) {
    //   for (var i = 0; i < arr.length; i++) {
    //     for (var j = i + 1; j < arr.length; j++) {
    //       if (
    //         arr[i].menuId == arr[j].menuId &&
    //         arr[i].menuName == arr[j].menuName
    //       ) {
    //         //第一个等同于第二个，splice方法删除第二个
    //         arr.splice(j, 1);
    //         j--;
    //       }
    //     }
    //   }
    //   return arr;
    // },
    // 判断是否为josn字符串
    isJSON(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    },
    // 获取当前时间
    getCurrentDate(format,type) {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
       // 判断是否一个月
      if(type){
        var month = now.getMonth()-1; //得到月份
      }else{
         var month = now.getMonth(); //得到月份
      }
      var date = now.getDate(); //得到日期
      var day = now.getDay(); //得到周几
      var hour = now.getHours(); //得到小时
      var minu = now.getMinutes(); //得到分钟
      var sec = now.getSeconds(); //得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var time = "";
      //精确到天
      if (format == 1) {
        time = year + "-" + month + "-" + date;
      }
      //精确到分
      else if (format == 2) {
        time =
          year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
      }
      return time;
    },
    // 点击事件
    handleLink(item) {
      // 如果没设置代办,则显示空白
      // if (
      //   this.toDoItems[0].menuName === "无数据" &&
      //   this.toDoItems[0].menuId === "1"
      // ) {
      //   this.$message({
      //     message: "代办事项为空,请前往代办事项设置",
      //     type: "warning"
      //   });
      //   return;
      // }
      if(item=="1")return
      let dropdownList = store.getters.menu;
      this.targetd(item, dropdownList);
      this.$router.push({ name: this.targetUrl, params:{ routerParams: this.routerParams.filter(
        item => item.id == this.targetUrl
      )}});
      if (this.targetUrl === "") {
        this.$message({
          message: "没有该菜单页面,请新建此页面",
          type: "warning"
        });
      }
    },
    // 递归获取路径
    targetd(opid, list) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === opid) {
            this.targetUrl = list[i].code;
            return;
          } else {
            if (list[i].children) {
              this.targetd(opid, list[i].children);
            }
          }
        }
      }
    },
    // 获取时间
    parseDate(val){
      let unit = "";
      if (val.type == "Year"){
        unit = 365;
      } else if (val.type == "Month"){
        unit = 30;
      } else if (val.type == "Week"){
        unit = 7;
      } else if (val.type == "Day"){
        unit = 1;
      } else {
        unit = 0;
      }
      let date = [];
      date.push(this.$utils.parseTime(new Date().setTime(new Date().getTime() + parseInt(val.range.split(",")[0]) * unit * 24 * 3600 * 1000), "{y}-{m}-{d}") + " 00:00:00");
      date.push(this.$utils.parseTime(new Date().setTime(new Date().getTime() + parseInt(val.range.split(",")[1]) * unit * 24 * 3600 * 1000), "{y}-{m}-{d}") + " 23:59:59");
      return date;
    }
  }
};
</script>
<style lang="scss" scoped>
// /deep/ .toDoPart.el-col.el-col-4 {
//   width: 19.99999%;
// }
/deep/ .toDoPart.el-col.el-col-5 {
  width: 19.99999%;
}
/deep/ .toDoicon {
  width: 20px;
  height: 20px;
  text-align: center;
  position: relative;
  top: 5px;
  display: inline-block;
  left: -10px;
}
/deep/ .toDospan {
  display: inline-block;
  width: 73px;
  text-align: center;
  margin: 0 auto;
  top: 5px;
  position: relative;
  a {
    top: -5px;
    position: relative;
  }
}
// /deep/ .toDorow{
// left: -5px;
// }
</style>

<!--
* description:日志报表-用户表操作日志
* author: mwhao
* createdDate: 2020-3-9
-->
<template>
  <section class="orgDlr">
    <el-dialog
      v-dialogDrag
      id="orgDlr"
      :title="$t('org.label.dlrName')"
      :visible.sync="dialogVisible"
      width="900px"
      @close="closeLook"
      center
      :append-to-body="true"
      :close-on-click-modal="false"
      :lock-scroll="true"
    >
      <dialogHeader
        slot="title"
        :title="dialogTitle[this.lookType]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="subject">
        <!-- 头部 -->
        <div class="header">
          <span v-show="lookType=='2'">
            表名:
            <div>{{lookusertObjer.tablename}}</div>
          </span>
          <span>
            操作类型:
            <div>{{lookusertObjer.opttype}}</div>
          </span>
          <span>
            操作时间:
            <div>{{lookusertObjer.createtime}}</div>
          </span>
          <span>
            操作人员:
            <div>{{lookusertObjer.username}}</div>
          </span>
        </div>
        <!-- 正文 -->
        <div class="subject">
          <div class="message">
            <div v-if="lookType=='1'"  style="float:left">
              <h4 v-html="lookusertBody"></h4>
            </div>
            <div v-if="lookType=='2'" style="float:left">
              <h4 v-html="lookusertBody" ></h4>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "lookusertable",
  props: {
    lookUserVisible: { type: Boolean, default: false },
    bssId: { type: String, default: "" },
    // 弹窗类型  1:用户表操作日志  2:数据操作日志
    lookType: { type: String, default: "" }
  },
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      dialogVisible: this.lookUserVisible,
      formField: {
        id: this.bssId
      },
      //弹窗标题
      dialogTitle: {
        1: "用户表操作日志",
        2: "数据操作日志"
      },
      // 标题
      lookusertObjer: {},
      // 正文
      lookusertBody: ""
    };
  },
  created() {
    this.usertabledetailQuery();
  },
  methods: {
    // 关闭弹窗
    closeLook() {
      this.$emit("lookuserClose");
    },
    // 详情页查询方法
    usertabledetailQuery() {
      const that = this;
      this.$store
        .dispatch("sysManage/usertabledetailQuery", this.formField)
        .then(response => {
          if (response.result === "1") {
            let row = response.rows;
            if (row) {
              if (row.opttype === 1) {
                row.opttype = "新增";
              } else if (row.opttype === 2) {
                row.opttype = "修改";
              } else if (row.opttype === 3) {
                row.opttype = "删除";
              }
              this.lookusertObjer = row;
              let olddata = JSON.parse(row.olddata); // 旧数据
              let newdata = JSON.parse(row.newdata); // 新数据
              let str = "";
              if (olddata ) {
                for (let k in newdata) {
                  // 省略显示
                  if (k == "xml_string") {
                    str += `<h4>${k}:<div style=" display: inline-block;
          margin-left: 10px;
          font-weight: normal;"><div  style="display: inline-block; overflow: hidden;white-space: nowrap;text-overflow: ellipsis; width:150px" ><a href="#" title=${
            olddata[k]
          } style="color:#606266;cursor:default">${olddata[k] ||
                      "无数据"}    </a></div>-><div  style="display: inline-block; overflow: hidden;white-space: nowrap;text-overflow: ellipsis; width:150px" ><a href="#" title=${
                      newdata[k]
                    } style="color:#606266;cursor:default">${
                      newdata[k]
                    }</a></div></div></h4>`;
                  } else {
                    str += `<h4>${k}:<div style=" display: inline-block;
          margin-left: 10px;
          font-weight: normal;"><div  style="display: inline-block;" >${olddata[
            k
          ] || "无数据"}</div>->${newdata[k]}</div></h4>`;
                  }
                }
                this.lookusertBody = str;
                // 判断返回的参数是否为null
                //     if (row.olddata === null) {
                //       this.lookusertBody = JSON.parse(row.newdata);
                //     } else {
                //       this.lookusertBody = JSON.parse(row.olddata);
                //     }
                //     let str = "";
                //     // console.log(this.lookusertBody);
                //     if (this.lookusertBody) {
                //       for (let k in this.lookusertBody) {
                //         str += `<h4>${k}:<div style=" display: initial;
                // margin-left: 10px;
                // font-weight: normal;">${this.lookusertBody[k]}</div></h4>`;
                //       }

                //       this.lookusertBody = str;
              } else {
                for (let k in newdata) {
                  str += `<h4>${k}:<div style=" display: inline-block;
          margin-left: 10px;
          font-weight: normal;"><div v-show="newdata[k]" style="display: inline-block;">无数据</div>->${newdata[k]}</div></h4>`;
                }
                this.lookusertBody = str;
              }
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog--center.el-dialog__body{
    text-align: left!important;
}
/deep/ .el-dialog.el-dialog--center {
  height: 563px;
}
/deep/ .el-dialog--center{
  text-align: left!important;
}
.subject {
  position: relative;
  height: 80%;
  width: 800px;
  overflow: auto;
  background: #fff;
  left: 50%;
  margin-left: -400px;
  top: 5px;
  font-size: 12px;
  .header {
    position: relative;
    height: 50px;
    border-bottom: 1px solid #f1f1f1;
    width: 100%;
    span {
      float: left;
      margin-right: 50px;
      margin-top: 25px;
      color: #b6b9be;
      div {
        float: right;
        margin-left: 10px;
      }
    }
  }
  .subject {
    .message {
      position: relative;
      height: 25px;
      padding-left: 10px;
      margin-top: 5px;
      h4 {
        div {
          display: initial;
          margin-left: 10px;
          font-weight: normal;
        }
      }
      span {
        margin-right: 5px;
      }
      .downloadStyle {
        cursor: pointer !important;
      }
    }
    .mainbody {
      position: relative;
      height: 90%;
      width: 100%;
      overflow: auto;
      text-indent: 2em;
    }
  }
}
</style>
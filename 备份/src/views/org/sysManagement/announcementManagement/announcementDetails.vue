<!--
* description: 公告详情页
* author: mwhao
* createdDate: 2019-12-21
-->
<template>
  <div class="subject">
    <!-- 头部 -->
    <div class="header">
      <h2>{{particularsList.title}}</h2>
    </div>
    <!-- 正文 -->
    <div class="subject">
      <div class="message">
        <span>数据来源: {{particularsList.sources}}</span>
        <span>发布人: {{particularsList.author}}</span>
        <span>发布时间: {{particularsList.last_update_date}}</span>
        <span v-if="particularsList.attachfiles">
          <span v-for="(val,index) in fileList" :key="index">
            <i class="el-icon-paperclip"></i>
            {{val.name}}
            <a
              class="downloadStyle"
               @click="downloadFile(val.download)"
            >下载</a>
          </span>
        </span>
      </div>
      <div class="mainbody">
        <span v-html="particularsList.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "announcementDetails",
  watch: {
    $route(val) {
      if (val.query.noticeid !== undefined) {
        this.particularsObj.noticeid = val.query.noticeid;
      }
      this.particularsApi();
    }
  },
  created() {
    // 获取id
    this.particularsObj.noticeid = this.$router.currentRoute.query.noticeid;
  },
  data() {
    return {
      // 请求参数
      particularsObj: {
        noticeid: ""
      },
      // 渲染参数
      particularsList: {},
      // 文件名渲染
      fileList: []
    };
  },
  mounted() {
    this.particularsApi();
  },
  methods: {
    // 未读公共信息查询
    announcementInformation() {
      this.$store
        .dispatch("sysManage/announcementInformation")
        .then(response => {
          if (response.result == "1") {
            // 传入VUEX
            this.$store.commit("app/SET_UNREAD", response.rows.num);
          }
        });
    },
    // 截取文件名
    cutOut(val) {
      if (val) {
        let fileName = val.split("|")[0];
        return fileName;
      }
    },
    // 下载文件
    downloadFile(val) {
      if (val) {
        window.location.href = val;
      }
    },
    // 详情页查询方法
    particularsApi() {
      const that = this;
      this.$store
        .dispatch("sysManage/announcementDetails", this.particularsObj)
        .then(response => {
          if (response.result === "1") {
            this.fileList=[]
            this.particularsList = response.rows;
            // 附件处理
            let fileListD = response.rows.attachfiles.split(";");
            for (let i = 0; i < fileListD.length; i++) {
              let obj = {};
              obj.name = fileListD[i].split("|")[0];
              obj.download = fileListD[i].split("|")[1];
              this.fileList.push(obj);
            }
            this.announcementInformation();
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.subject {
  padding: 0 5px 0 5px;
  position: relative;
  width: 800px;
  overflow: auto;
  background: #fff;
  left: 50%;
  margin-left: -400px;
  top: 10px;
  .header {
    position: relative;
    height: 50px;
    border-bottom: 1px solid #f1f1f1;
    width: 100%;
    h2 {
      position: absolute;
      width: 100%;
      text-align: center;
    }
  }
  .subject {
    top:0;
    .message {
      position: relative;
      height: 25px;
      color: #4b4347;
      text-align: center;
      padding-left: 10px;
      margin-top: 5px;
      span {
        margin-right: 5px;
      }
      .downloadStyle {
        cursor: pointer !important;
        color: blue;
      }
    }
    .mainbody {
      position: relative;
      width: 100%;
      text-indent: 2em;
    }
  }
}
</style>

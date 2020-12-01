 <!--
* description: 首页-我的公告组件
* author: mawenhao 修改
* createdDate: 2019-11-28
-->
<template>
  <el-col :span="span"  class="afficheHeight" style="height: calc(100% - 130px)!important">
    <div class="myNoticeTopArea">
      <span class="partTitle">{{'我的公告'}}</span>
      <a v-if="myNoticeList.length >= 1" class="more" @click="jumpList">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </a>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in myNoticeList" :key="index">
          <span class="listSpan" @click="jumpDetails(index)">
            <span v-if="item.attachflag === '1' ? true:false" class="el-icon-paperclip"></span>
            {{item.title}}
            <i
              v-if="item.isread==='false' ? true:false"
              class="el-icon-s-comment"
            ></i>
          </span>
          
          <span class="newsTime"><span class="newsAuthor">{{item.author}}</span>{{last(item.last_update_date)}}</span>
        </li>
      </ul>
    </div>
  </el-col>
</template>
<script>
export default {
  name: "affiChe",
  props: {
    // 行内占比
    span: { type: Number, default: 24 }
  },
 //利用计算属性  
  computed: {
    // 未读信息
    afficheNum() {
      return this.$store.state.app.unreadNum;
    },
    // 删除
    afficheDelete(){
      return this.$store.state.app.unreadDelete;
    }
  },
  //监听执行
  watch: {
    afficheNum(val) {
      this.myNoticeTopArea()
    },
    afficheDelete(val) {
      this.myNoticeTopArea()
    },
  },
  data() {
    return {
      // 公告查询
      myNoticeObj: {
        pagesize: 10, // 显示的数量
        pageindex: 1
      },
      // 我的公告需要的参数
      myNoticeList: [],
      // 自适应高度
      affiCheHight:""
    };
  },
  created() {
    this.myNoticeTopArea();
    //  this.affiCheHight=  `height:calc(100%-${this.$parent.$children[0].$refs.todoArea.scrollHeight})` 
  },
  methods: {
    // 转换日期格式
    last(val) {
      if (val) {
        let time = val;
        let timearr = time
          .replace(" ", ":")
          .replace(/\:/g, "-")
          .split("-");
        let timestr = timearr[0] + "-" + timearr[1] + "-" + timearr[2];
        return timestr;
      }
    },
    // 我的公告API
    myNoticeTopArea() {
      const that = this;
      this.$store
        .dispatch("sysManage/announcementHome", this.myNoticeObj)
        .then(response => {
          if (response.result === "1") {
            this.myNoticeList = response.rows;
          }
        });
    },
    // 更多页面跳转
    jumpList() {
      this.$router.push({name: 'publicAnnouncements'});
    },
    // 跳转页面
    jumpDetails(index) {
      // 未读信息取消
     this.myNoticeList[index].isread=true
      var noticeid = this.myNoticeList[index].noticeid;
      this.$router.mode = "affiChe";
      this.$router.push({
        name: `publicAnnouncementDetail`,
        query: { noticeid: noticeid }
      });
    }
  }
};
</script>
<style lang="scss" scoped>

/deep/ .afficheHeight{
  height: calc(100% - 130px)!important;
}
/deep/ .list-group-item {
  position: relative;
  i {
    color: red;
    top: 5px;
    position: absolute;
  }
  .listSpan{
    display: inline-block;
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor:pointer;
  }
}
// /deep/ .newsTime {
//   position: absolute;
//   right: 0;
//   bottom: 0;

// }
/deep/ .list-group {
  height: 80%;
  overflow: auto;
}
/deep/ .partTitle {
  display: inline-block;
  font-size: 14px;
}
/deep/ .more {
  right: 20px;
  top: 18px;
  position: absolute;
}
/deep/ .myNoticeTopArea {
      height: 100%!important;
}
.newsAuthor{
  margin-right: 10px;
}
</style>
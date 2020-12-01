  <template>
  <div class="navbar" id="menu-navbar">
    <hamburger
      v-if="!menuStyle.isHorizontal"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <menuIcon
      v-if="$config.isHorizontalButtom"
      :is-active="menuStyle.isHorizontal"
      class="hamburger-container"
      @toggleClick="toggleMenu"
    />
    <div class="right-menu">
      <!-- <lang-select class="right-menu-item hover-effect lang" /> -->
      <el-dropdown
        class="avatar-container"
        style="float:left"
        trigger="click"
        placement="bottom-start"
      >
        <!-- <img
          :src="avatar"
          class="user-avatar"
        >-->
        <label>
          {{ orgInfo.empName }}
          <i class="el-icon-caret-bottom" />
        </label>
        <!-- <i class="el-icon-caret-bottom" /> -->

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>{{$t('sys.navbar.home')}}</el-dropdown-item>
          </router-link>
          <!--修改密码-->
          <el-dropdown-item divided v-if="isChangePassword">
            <span
              style="display:block;"
              @click="showEdit('edit')"
            >{{$t('sys.navbar.changePassword')}}</span>
          </el-dropdown-item>

          <!--系统设置-->
          <el-dropdown-item divided v-if="isSystemUser">
            <span style="display:block;" @click="systemSet()">{{$t('sys.navbar.systemSet')}}</span>
          </el-dropdown-item>

          <!--退出登录-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{$t('sys.navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--我的待办提醒-->
    <div class="my-upcoming" @click="jumpList">
      <el-badge :value="$store.state.app.unreadNum" :max="99" class="item">
        <i class="svg-icon iconfont icon-remind_fill" />
      </el-badge>
    </div>

    <!--换肤-->
    <div class="button-theme">
      <el-button class="svg-icon iconfont icon-pifu" type="text" @click="open"></el-button>
    </div>

    <!--当前账号组织-->
    <div class="organization" v-show="orgInfo.DLR_NAME && orgInfo.DLR_NAME.length > 0">
      <i class="iconfont iconicon-gps" />
      <label>{{orgInfo.DLR_NAME}}</label>
    </div>

    <!--全局搜索-->
    <div class="search-area">
      <search id="header-search" class="right-menu-item" />
    </div>

    <!--修改密码-->
    <changePassword
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
    ></changePassword>

    <!--系统设置-->
    <systemSet
      :popupsVisible="systemSetPopupsVisible"
      :key="systemSetPopupsKey"
      :popupsState="systemSetPopupsState"
      @close="systemSetclose"
    ></systemSet>
    <themeColor
      :popupsVisible="themeColorPopupsVisible"
      :key="themeColorPopupsKey"
      :popupsState="themeColorPopupsState"
      @close="close"
    ></themeColor>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import { mapGetters } from "vuex";
export default {
  name: "navbar",
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    Hamburger: () => import("@/components/Hamburger"),
    menuIcon: () => import("@/components/menuIcon"),
    Search: () => import("@/components/HeaderSearch"),
    LangSelect: () => import("@/components/LangSelect"),
    changePassword: () => import("./changePassword"),
    systemSet: () => import("./systemSet"),
    themeColor: () => import("@/components/themeColor")
  },
  data() {
    return {
      //提示对象key
      notificationKey: 0,
      //提示对象
      notifications: {},
      //提示信息
      recoredAlertMessage: "",
      editPopupsVisible: false,
      editPopupsKey: "",
      editPopupsState: "",
      systemSetPopupsState: "",
      systemSetPopupsKey: "systemSet",
      systemSetPopupsVisible: false,
      themeColorPopupsState: "",
      themeColorPopupsKey: "themeColor",
      themeColorPopupsVisible: false,
      isSystemUser: this.$store.getters.orgInfo.usertype === "1",
      isChangePassword: this.$store.getters.accountConfig.updatepwd,
      formField: {
        isHorizontal: this.$store.state.app.menuStyle.isHorizontal || false, // 横竖导航
        userId: this.$store.getters.orgInfo.userId || "", // 用户ID
        tableId: this.$store.state.app.configTableId || "", // 主键ID 编辑需传
        updateControlId: this.$store.state.app.configUpdateControlId || "", // 并发ID 编辑需传
        dataType: 10003, // 数据类型 系统设置10002 用户设置10003
        xmlString: {} // 保存JS字符串
      },
      // formField中的JSON字段
      xmlStringJson: this.$store.state.app.configxmlString || {}
    };
  },
  created() {
    this.checkPwdIsRule();
    this.announcementInformation();
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "orgInfo", "menuStyle"])
  },
  methods: {
    //关闭单个提示信息通知
    closeNotification(message) {
      this.notifications[message].close();
      delete this.notifications[message];
    },
    // 检查登陆密码是否符合密码强度
    checkPwdIsRule() {
      if (this.$store.getters.pwdIsRule === "0") {
        this.showEdit("edit");
      }
    },
    // 未读公告信息查询
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
    // 更多页面跳转
    jumpList() {
      this.$router.push({ name: `publicAnnouncements` });
    },
    open() {
      this.themeColorPopupsState = "个性换肤";
      this.themeColorPopupsVisible = true;
    },
    // // 关闭新增、编辑弹窗（type=1，保存成功）
    close() {
      this.themeColorPopupsVisible = false;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // 切换横竖导航点击事件
    toggleMenu() {
      if (this.sidebar.opened) {
        this.$store.dispatch("app/toggleSideBar");
      }
      this.saveApi();
    },
    // 配置化缓存横竖导航查询
    configureisHorizontal() {
      if (typeof this.$store.getters.orgInfo.userId != "undefined") {
        let that = this;
        const queryObj = {
          // api配置
          apiConfig: orgApis.proConfigDesktopQueryByPage,
          // 需要调用的API服务配置
          apiServices: [
            {
              // 表格中台返回网格的字段
              apiQueryRow: [
                "tableId",
                "dataType",
                "userId",
                "pwdExpress",
                "updateControlId"
              ]
            }
          ],
          // 条件/实体参数（变量），根据typeParam中的定义配置
          variables: {
            pageSize: 100,
            pageIndex: 1,
            // 当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: {
              userId: this.formField.userId,
              dataType: 10003
            }
          }
        };
        // 转换了中台请求格式数据
        const paramD = this.$getParams(queryObj);
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD).then(response => {
          if (response.result === "1") {
            let list = response.rows;
            if (list.length != 0) {
              // 用户保存信息 并发
              that.$store.commit("app/GET_CONFIGTABLEID", list[0].tableId);
              that.$store.commit(
                "app/GET_UPDATECONTROID",
                list[0].updateControlId
              );
              that.$store.commit(
                "app/GET_XMLSTRING",
                JSON.parse(list[0].pwdExpress)
              );
              that.formField.tableId = list[0].tableId;
              that.formField.updateControlId = list[0].updateControlId;
              that.formField.userId = list[0].userId;
              let json = JSON.parse(list[0].pwdExpress);
              if (JSON.stringify(json) != "{}") {
                this.xmlStringJson = json;
              }
            }
          } else {
            this.$message({
              message:
                "查询失败：" +
                response.msg,
              type: "warn",
              uration: 1000
            });
          }
        });
      }
    },
    // 是否显示横竖导航
    saveApi() {
      let that = this;
      // 解决与换肤功能并发问题
      if (this.$store.state.app.configUpdateControlId != "") {
        that.formField.updateControlId = this.$store.state.app.configUpdateControlId;
      }
      if (this.$store.state.app.configxmlString != "") {
        that.xmlStringJson = this.$store.state.app.configxmlString;
      }
      if (this.$store.state.app.configTableId != "") {
        that.formField.tableId = this.$store.state.app.configTableId;
      }
      that.xmlStringJson.isHorizontal = !this.formField.isHorizontal;
      that.$store.commit("app/TOGGLE_MENU", this.formField.isHorizontal);
      that.formField.xmlString = JSON.stringify(this.xmlStringJson);
      const queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.proConfigDesktopMutationSave,
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            // groupCode:this.$store.getters.orgInfo.GROUP_CODE,
            tableId: that.formField.tableId || "", // 表ID
            dataType: 10003, // 数据类型
            userId: this.$store.getters.orgInfo.userId, // 用户ID
            xmlString: that.formField.xmlString, //xml数据
            updateControlId: that.formField.updateControlId //并发ID
          }
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          this.$nextTick(() => {
            this.configureisHorizontal();
          });
          // 保存成功
          this.$message({
            message: "切换成功",
            type: "success",
            uration: 1000
          });
        } else {
          // 保存失败
          this.$message({
            message:
              "保存配置失败:" +
              response.msg,
            type: "warn",
            uration: 1000
          });
        }
      });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=%2Fdashboard`); //${this.$route.fullPath}
      //  当前页面刷新,解决切换登录侧边栏不更新问题
      this.$store.dispatch("tagsView/delAllViews", null);
      if (this.$utils.isIE() || this.$utils.isEdge()) {
        if (this.$config.loginConfig.loginType === '1') {
          // location.href = "/#/iamLogin";
          // IAM退出登录跳转
          location.href = this.$config.loginConfig.iamLoginOutUrl
        } else {
          location.href = "/#/login?redirect=%2Fdashboard";
        }
        location.reload();
      } else {
        if (this.$config.loginConfig.loginType === '1') {
          // this.$router.push(`/iamLogin`);
          // IAM退出登录跳转
          location.href = this.$config.loginConfig.iamLoginOutUrl
        } else {
          this.$router.push(`/login?redirect=%2Fdashboard`);
        }
      }
    },
    // 打开系统设置弹窗
    systemSet(index) {
      const that = this.$refs.multipleTable;
      this.showsystemSetEdit("edit");
    },
    // 系统设置弹窗
    showsystemSetEdit(type) {
      this.systemSetPopupsState = type;
      this.systemSetPopupsVisible = true;
    },
    // 关闭系统设置弹窗
    systemSetclose(type) {
      this.systemSetPopupsVisible = false;
      this.systemSetPopupsKey = this.$utils.generateId();
    }
  }
};
</script>
<style lang="scss">
.el-notification.left {
  left: 50%;
  margin-left: -165px;
  top: 300px !important;
}
</style>


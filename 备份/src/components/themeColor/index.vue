<!--
* description: 个性换肤
* author: liyanm
* createdDate: 2019-08-06
-->
<template>
  <section class="themeColorPopus">
    <el-dialog
      v-dialogDrag
      id="themeColorPopus"
      :close-on-click-modal="false"
      title="个性换肤"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="cancel"
      width="600"
    >
      <dialogHeader slot="title" :title="'个性换肤'" :styleType="$store.state.app.dialogType"></dialogHeader>
      <div class="title">导航栏皮肤</div>
      <div class="title-notes">请选择您要的皮肤导航，此设置不会影响到其他人</div>
      <el-radio-group v-model="chickColor" @change="onRadioChange">
        <el-radio :label="item.colorType" :key="item.id" v-for="item in themes">
          <span class="colorshow">
            <i :class="item.colorType"></i>
          </span>
          <span class="lableshow">{{item.label}}</span>
        </el-radio>
      </el-radio-group>
      <div class="theme-button">
        <el-button @click="cancel">取消</el-button>
        <el-button type="danger" @click="save">保存设置</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import storage from "@/utils/storage";
import { orgApis } from "@/api/apiList/org";
export default {
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    // 弹出是否显示
    popupsVisible: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters(["nowTheme", "menuStyle"])
  },
  data() {
    return {
      // 弹出是否显示
      curPopupsVisible: this.popupsVisible,
      // 新增、编辑弹窗状态
      themeColorPopupsVisible: false,
      //默认选择颜色
      chickColor: "red",
      //历史颜色
      list: [],
      //颜色
      themes: [
        {
          label: "东风红（默认）",
          id: "0",
          colorType: "red"
        },
        {
          label: "朝气蓬勃",
          id: "1",
          colorType: "silvery"
        },
        {
          label: "红色激情",
          id: "2",
          colorType: "pink"
        },
        {
          label: "护眼绿色",
          id: "3",
          colorType: "green"
        },
        {
          label: "天空之蓝",
          id: "4",
          colorType: "blue"
        },
        {
          label: "静谧之紫",
          id: "5",
          colorType: "violet"
        }
      ],
      formField: {
        userId: this.$store.getters.orgInfo.userId || "",
        tableId: "", // 主键ID 编辑需传
        updateControlId: "", // 并发ID 编辑需传
        dataType: 10003, // 数据类型 数字类型
        xmlString: {
          // nowTheme: ""
        } // 保存JS字符串
      },
      xmlStringJson: {},
      colorEsc: "",
      // 判断是否需要重置
      colorResetting: true
    };
  },
  mounted() {
    this.colorThemequery();
  },
  watch: {
    popupsVisible(val) {
      this.curPopupsVisible = val;
    }
  },
  methods: {
    ...mapMutations(["SET_THEMEINFO"]),
    // 关闭新增、编辑弹窗（type=1，保存成功）
    closedialo() {
      this.curPopupsVisible = false;
      this.$emit("close");
    },
    //选择颜色
    onRadioChange(value) {
      this.SET_THEMEINFO(value);
      this.xmlStringJson.nowTheme = value;
    },

    //取消
    cancel() {
      var chickColor = storage.get("chickColor");
      if (chickColor) {
        this.chickColor = chickColor;
        this.onRadioChange(this.chickColor);
      } else {
        if (this.colorEsc) {
          if (this.colorResetting) {
            this.chickColor = this.colorEsc;
            this.onRadioChange(this.colorEsc);
          } else {
            this.colorResetting = true;
          }
        }
      }
      this.closedialo();
    },
    //保存设置
    save() {
      this.saveApi();
    },
    // 颜色主题查询
    colorThemequery() {
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
            dataInfo: this.formField
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
              var chickColord = storage.get("chickColor"); // 本地缓存
              // 判断是否有本地缓存皮肤设置
              if (chickColord) {
                this.chickColor = chickColord;
                this.onRadioChange(this.chickColor);
              } else {
                if (JSON.stringify(json) != "{}") {
                  this.xmlStringJson = json;
                  that.chickColor = json.nowTheme;
                  let color = this.xmlStringJson.nowTheme;
                  this.colorEsc = this.xmlStringJson.nowTheme;
                  if (color) {
                    this.SET_THEMEINFO(color);
                  }
                }
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
    // 颜色主题保存
    saveApi() {
      let that = this;
      // 本地缓存保存
      storage.set("chickColor", this.chickColor);
      let colorIndex = that.xmlStringJson.nowTheme;
      that.SET_THEMEINFO(that.xmlStringJson.nowTheme);
      // 解决与导航方式并发问题
      if (this.$store.state.app.configxmlString != "") {
        that.xmlStringJson = this.$store.state.app.configxmlString;
        that.xmlStringJson.nowTheme = colorIndex;
      }
      if (this.$store.state.app.configUpdateControlId != "") {
        that.formField.updateControlId = this.$store.state.app.configUpdateControlId;
      }
      if (this.$store.state.app.configTableId != "") {
        that.formField.tableId = this.$store.state.app.configTableId;
      }
      that.formField.xmlString = JSON.stringify(that.xmlStringJson);
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
          this.colorEsc = this.xmlStringJson.nowTheme;
          this.colorResetting = false;
          this.$nextTick(() => {
            this.colorThemequery();
          });
          // 保存成功
          this.$message({
            message: "保存成功",
            type: "success",
            uration: 1000
          });
        } else {
          // 保存失败
          this.$message({
            message:
              "保存失败:" + response.msg,
            type: "warn",
            uration: 1000
          });
        }
        this.curPopupsVisible = false;
      });
    }
  }
};
</script>

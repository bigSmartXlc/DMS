<template>
  <div class="app-container app-container-table all-menu-exp" style="padding: 0 15px; display:inline-block">
    <!--    @click="clickMenu" -->
    <transition name="fade">
      <!-- 菜单 -->
      <div class="all-menu-exp" v-if="show">
        <!-- 关闭箭头 -->
        <div class="escArrow" @click="escarrowClick">
          <i class="el-icon-close"></i>
        </div>
        <ul>
          <li class="menLi" v-for="(val,index) in dropdownList" :key="val.id">
            <ul class="menUl">
              <li v-if="index<6">
                <span class="titleUl allMenuTitle">{{val.name}}</span>
                <ul>
                  <li
                    class="unfold"
                    v-for="table in splitList(val,dropdownList[index+1])"
                    :key="table.id"
                  >
                    <a class="titleLi" @click="drumpPath(table.name)">{{table.name}}</a>
                  </li>
                </ul>
              </li>
              <li v-if="dropdownList[index+6]">
                <span class="titleUl allMenuTitle">{{dropdownList[index+6].name}}</span>
                <ul>
                  <li
                    class="unfold"
                    v-for="table in splitList(dropdownList[index+6],dropdownList[index+6+1])"
                    :key="table.id"
                  >
                    <a class="titleLi" @click="drumpPath(table.name)">{{table.name}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "unfoldMenu",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 所有菜单
      dropdownList: [],
      // 所有菜单名称
      dropdownList2: [],
      // 跳转路径
      targetUrl: ""
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.clickMenu();
      }
    }
  },
  methods: {
    // 关闭箭头
    escarrowClick() {
      let shows = !this.show;
      this.$emit("escarrowClickd", shows);
    },
    // 主菜单取余
    titleQuery(val) {
      var nam = Math.floor(val / 2);
      return nam;
    },
    // 菜单展开
    clickMenu() {
      this.dropdownList = store.getters.menu;
      this.targetd(null, this.dropdownList);
      this.splitList();
    },
    // 递归获取名称
    targetd(opid, list) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].parentID == opid) {
            return;
          } else {
            // 过滤模板 保存页面 筛选主菜单
            if (list[i].parentID == "-1" || list[i].type == "P") {
              this.dropdownList2.push(list[i].name);
            }
            if (list[i].children) {
              this.targetd(opid, list[i].children);
            }
          }
        }
      }
    },
    // 递归获取路径
    targetdUrl(opname, list) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          // 过滤是否还有子节点
          if (list[i].name === opname && (list[i].children === null || list[i].children.length === 0)) {
            this.targetUrl = list[i].code;
            return;
          } else {
            if (list[i].children) {
              this.targetdUrl(opname, list[i].children);
            }
          }
        }
      }
    },
    // 截取
    splitList(val, val1) {
      if (val) {
        // 所有子菜单
        var arr = this.dropdownList2;
        if (val && val1) {
          let list = [];
          // 找到相应主菜单的下标 进行截取
          let dexof = arr.lastIndexOf(val.name);
          let dexof1 = arr.lastIndexOf(val1.name);
          let silce = arr.slice(dexof + 1, dexof1);
          for (var k of silce) {
            let obj = {
              name: k
            };
            list.push(obj);
          }
          return list;
        }
        if (typeof val1 == "undefined") {
          let list2 = [];
          let dexof = arr.lastIndexOf(val.name);
          let silce = arr.slice(dexof + 1);
          for (var k of silce) {
            let obj2 = {
              name: k
            };
            list2.push(obj2);
          }
          return list2;
        }
      }
    },
    // 跳转
    drumpPath(code) {
      this.targetdUrl(code, this.dropdownList);
      this.$router.push({ name: this.targetUrl });
      this.escarrowClick();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .all-menu-exp {
  position: fixed;
  // width: 1000px;
  top: 40px;
  left: 70px;
  height: calc(96% - 45px);
  max-width: 1000px;
  padding-left: 20px;
  z-index: 1000;
  padding-top: 5px;
  background-color: #e8e8e8;
  overflow: auto;
}
.all-menu-exp::-webkit-scrollbar {
  display: none;
}
.menuUnspread {
  top: 0px;
  left: 0px;
}

ul,
li {
  border: none;
  font-family: "微软雅黑", "黑体", "宋体";
  font-size: 14px;
  margin: 0px;
  padding: 0px;
}

ul,
ol,
li {
  list-style-type: none;
}

.menuUl {
  padding: 0;
  height: 100%;
  margin: 0;
  list-style: none;
}
.titleUl {
  border-left: 2px solid;
  font-size: 14px;
  color: #777;
  padding-left: 7px;
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;
}
.titleLi {
  color: #777 !important;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.menLi {
  float: left;
  width: 155px;
  height: 100%;
}
.menuUl {
  padding: 20px 0 15px 0;
}
.unfold {
  width: 100% !important;
  height: 30px !important;
  line-height: 30px !important;
  font-size: 12px;
  margin-top: 5px;
}

.escArrow {
  position: absolute;
  right: 20px;
  top: 0;
  font-size: 20px !important;
  i{
    position: fixed;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

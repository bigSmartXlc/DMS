<!--
* description: 面包屑
* logs:
* 2019-12-19 面包屑加入导航多级菜单 mwhao
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator=">" id="mianbaoxue">
    <!-- <transition-group name="breadcrumb"> -->
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <!-- <span v-if="index==0" class="iconfont iconicon-gps" />
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
      <span v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</span>-->
      <span v-if="index==0" @click.stop="selectClick(index, item)">
        {{
        item.path === '/dashboard' && $route.path === '/dashboard' ? '待办事项' : item.meta.title
        }}
      </span>
      <span v-if="index==1" @click.stop="selectClick(index)">
        {{ item.meta.title }}
        <el-cascader
          ref="cascader1"
          v-model="value1"
          placeholder
          :options="dropdownList"
          :props="defaultParams"
          :show-all-levels="false"
          :check-strictly="true"
          @change="drumpPath"
        />
      </span>
      <span v-if="index==2" @click.stop="selectClick(index)">
        {{ item.meta.title }}
        <el-cascader
          ref="cascader2"
          v-model="value2"
          placeholder
          :options="dropdownListto"
          :props="defaultParams"
          :show-all-levels="false"
          :check-strictly="true"
          @change="drumpPath"
        />
      </span>
      <span v-if="index==3" @click.stop="selectClick(index)">
        {{ item.meta.title }}
        <el-cascader
          ref="cascader3"
          v-model="value3"
          placeholder
          :options="dropdownListtwo"
          :props="defaultParams"
          :show-all-levels="false"
          :check-strictly="true"
          @change="drumpPath"
        />
      </span>
      <span v-if="index==4" @click.stop="selectClick(index)">
        {{ item.meta.title }}
        <el-cascader
          ref="cascader4"
          v-model="value4"
          placeholder
          :options="dropdownListfour"
          :props="defaultParams"
          :show-all-levels="false"
          :check-strictly="true"
          @change="drumpPath"
        />
      </span>
      <span v-if="index==5" @click.stop="selectClick(index)">
        {{ item.meta.title }}
        <el-cascader
          ref="cascader5"
          v-model="value5"
          placeholder
          :options="dropdownListfive"
          :props="defaultParams"
          :show-all-levels="false"
          :check-strictly="true"
          @change="drumpPath"
        />
         </span>
        <span v-if="index==6" @click.stop="selectClick(index)">
        {{ item.meta.title }}
        <el-cascader
          ref="cascader6"
          v-model="value6"
          placeholder
          :options="dropdownListsix"
          :props="defaultParams"
          :show-all-levels="false"
          :check-strictly="true"
          @change="drumpPath"
          @visible-change="visibleChange6"
        />
             <!-- @expand-change="expandChange"    样式事件 -->
      </span>
    </el-breadcrumb-item>
    <!-- </transition-group> -->
  </el-breadcrumb>
</template>

<script>
import store from "@/store";
import pathToRegexp from "path-to-regexp";
export default {
  data() {
    return {
      levelList: null,
      // 渲染数组
      dropdownList: [],
      dropdownListto: [],
      dropdownListtwo: [],
      dropdownListfour: [],
      dropdownListfive: [],
      dropdownListsix: [],
      // 下拉框绑定的数据
      defaultParams: {
        value: "id",
        label: "name",
        children: "children"
      },
      // 返回数组id
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      value6: [],
      // 路径
      targetUrl: "",
      target: "",
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
      this.getMyMenuTree();
    
    },
    // 监听标签页 判断是否清空状态栏
    "$store.state.tagsView.visitedViews"(val){
      this.handleClear();
    }
  },
  created() {
    this.getBreadcrumb();
    this.getMyMenuTree();
  },
  methods: {
    // 跳转路由
    drumpPath(val) {
      if(!val.length>0)return// 防止清空选中状态的时候跳转到空页面
      var id = val[val.length - 1];
      const router = this.generateRoutes(this.$router.options.routes, id)
      if (router) {
        this.$router.push({ name: router.path, query: router.query });
      } else {
        this.targetd(id, this.dropdownList);
        this.$router.push({ name: this.targetUrl });
        // if (this.target === undefined || this.target === null || this.target === '') {
        //   // 不含参数
        //   this.$router.push({ name: this.targetUrl });
        // } else {
        //   // 含参数
        //   const router = this.generateRoutes(this.$router.options.routes, id)
        //   if (router) {
        //     this.$router.push({ name: router.path, query: router.query });
        //   } else {
        //     this.$router.push({ name: this.targetUrl });
        //   }
        // }
      }
    },
    // 下拉框出现/隐藏
    visibleChange6(val) {
      if (val === true) {
        const cur = this.dropdownListfive.filter(o => o.code === this.$route.name);
        if (cur && cur.length === 1) this.value5 = [cur[0].id];
      }
    },
    // 递归获取路径
    targetd(opid, list) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === opid) {
            this.targetUrl = list[i].code;
            this.target = list[i].target;
            return;
          } else {
            if (list[i].children) {
              this.targetd(opid, list[i].children);
            }
          }
        }
      }
    },
    // 隐藏子菜单递归
    childrenFilter(list) {
      if (list && list.length > 0) {
        for(let k in list){
          if(list[k].children!=null&&list[k].children!=[]){
            list[k].children= this.childrenFilter(list[k].children)
          }
        }
        list=list.filter(o=>o.isauto_refresh === 0)
        return list 
      }
    },
    // 生成下拉列表
    query() {
        var dropdown = this.childrenFilter(this.dropdownList)
        for (let i = 0; i < this.levelList.length; i++) {
          for (let j = 0; j < dropdown.length; j++) {
            if (!(dropdown && dropdown.length > 0)) continue
            const result = dropdown[j].name.replace("_BS", "");
            if (this.levelList[i].meta.title !== result) continue
            this.dropdownListto = dropdown[j].children
            for (let k = 0; k < this.dropdownListto.length; k++) {
              if (this.levelList[i + 1].meta.title !==this.dropdownListto[k].name) continue
              this.dropdownListtwo = this.dropdownListto[k].children
              if (!(this.dropdownListtwo && this.dropdownListtwo.length > 0)) continue
              for (let y = 0; y < this.dropdownListtwo.length; y++) {
                if (this.levelList[i + 2].meta.title !==this.dropdownListtwo[y].name) continue
                this.dropdownListfour = this.dropdownListtwo[y].children
                if (!(this.dropdownListfour &&this.dropdownListfour.length > 0)) continue
                for (let q = 0;q < this.dropdownListfour.length;q++) {
                   if (this.levelList[i + 3].meta.title !==this.dropdownListfour[q].name) continue
                   this.dropdownListfive = this.dropdownListfour[q].children
                   if(!(this.dropdownListfive &&this.dropdownListfive.length > 0))continue
                   for (let w = 0;w < this.dropdownListfive.length;w++) {
                     if (this.levelList[i + 4].meta.title ===this.dropdownListfive[w].name) {
                       this.dropdownListsix = this.dropdownListfive[q].children
                       return;
                     }
                  }
                }  
              }
            }
          }
        }
    },
    // 下拉列表查询API
    getMyMenuTree() {
      // 不使用读取API获取menu
      // const that = this;
      // this.$store.dispatch("sysManage/getWebListPaged").then(response => {
      //   if (response.result === "1") {
      //     this.dropdownList = response.rows;
      //     that.query();
      //   }
      // });
      // 改为使用store中的menu
      this.dropdownList = JSON.parse(JSON.stringify(store.getters.menu));
      this.query();
    },
    // 下拉框触发事件 index:下拉框下标,item:跳转路径,list:下拉框数组
    selectClick(index, item,list) {
      if (index === 0 && item.path) {
        this.$router.push({path: item.path, query: item.query});
      } else {
        document.getElementsByClassName("el-input__inner")[index].click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           return false;
        }); 
        // this.handleClear()
      }
    },
    // 选中状态进行清空  
    handleClear(){
      let isClear=[]; // 判断条件
      let value=""; // 数组
      let labelPage=this.$store.state.tagsView.visitedViews; // 标签页
      for(let i =1;i<7;i++){
         value="value"+i
         isClear=[]
         if(this[value].length>0){
           for(let o=1;o<labelPage.length;o++){
               this[value].filter(id=>{
                   if(id==labelPage[o].meta.menuId) isClear.push(id)  
               })
           }
         }
         if(!isClear.length>0){
             let emptyRef="cascader"+i
             if( this.$refs[emptyRef]&&this.$refs[emptyRef].length>0){
               this.$refs[emptyRef][0].handleClear()  // 清空选中状态
              //  this.$refs[emptyRef][0].$refs.panel.clearCheckedNodes()
             }
         }
      }
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [
          { path: "/dashboard", meta: { title: this.$t("sys.navbar.home") } }
        ].concat(matched);
      }
      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "首页".toLocaleLowerCase();
    },
    // 遍历路由
    generateRoutes(routes, menuId) {
      let res = null;
      for (const router of routes) {
        if (router.menuId === menuId) {
          res = router
          break
        }
        if (router.children) {
          res = this.generateRoutes(
            router.children,
            menuId
          )
          if (res) {
            break
          }
        }
      }
      return res
    }
  }
};
</script>
<style lang="scss" scoped>
// 隐藏下拉框
/deep/.el-cascader.el-cascader--small {
  position: absolute;
  left: -5px;
  opacity: 0;
  width: 100%;
  top: 0;
  z-index: -100;
}
/deep/ .el-breadcrumb__inner {
  cursor: pointer !important;
}
</style>


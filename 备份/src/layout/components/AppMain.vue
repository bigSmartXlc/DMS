<template>
  <section
    class="app-main"
    id="AppMain"
  >
    <breadcrumb v-if="showContent" ref="breadcrumb" class="breadcrumb-container" />
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <transition mode="out-in">
      <keep-alive>
        <router-view
          :key="key"
          ref="refRouterView"
          v-if="!isIframe"
        />
      </keep-alive>
    </transition>

    <!--处理IFRAME KEEP-ALIVE失效问题-->
    <div v-show="isIframe" id="lnkIframeMenu" class="lnkIframeDiv">
      <!-- <iframe v-show="item.isCurrent" v-for="item in iframeArr" :key="item.path" :src="item.src"
        frameborder="no" border="0" marginwidth="0" marginheight="0" :id="'iframe_' + item.name"
        class="lnkIframeMenu"></iframe> -->
    </div>

    <div id="fineReportLogin" style="display:none;width:0;height:0">
      <iframe id="fineReportIframe" width="100%" style="display:none;" height="100%" frameborder="0"></iframe>
    </div>

  </section>
</template>

<script>
import watermark from "@/utils/watermark";
import { mapGetters } from "vuex";

export default {
  name: "AppMain",
  components: {
    Breadcrumb: () => import("@/components/Breadcrumb")
  },
  data() {
    return {
      isIframe: false,
      isIframeInit: true
    }
  },
  watch: {
    $route() {
      this.iframeRouteDrump()
    }
  },
  created() {
    this.iframeRouteDrump()
  },
  methods: {
    // iframe路由判断
    iframeRouteDrump() {
      if (this.$store.state.settings.showContent === false) {
        // 只显示内页时跳出判断
        return
      }
      const iframeUrls = this.$store.state.iframe.iframeUrls
      this.isIframe = iframeUrls.filter(o => o.path === this.$route.name).length > 0
      const curIframes = iframeUrls.filter(o => o.path === this.$route.name)
      // 检查是否帆软报表链接
      if (curIframes && curIframes.length > 0 && curIframes[0].url.indexOf(this.$config.fineReport.fineReportUrl) > -1) {
        const userName = this.$config.fineReport.fineReportUser
        const password = this.$config.fineReport.fineReportPwd
        if (userName && password) {
          this.loginFineReport(userName, password)
        } else {
          this.isIframePage('')
        }
      } else {
        this.isIframePage('')
      }
    },
    // 登陆fineReport
    loginFineReport(userName, password) {
      const that = this
      // 帆软是否已经登陆
      if (!that.$config.fineReport.isFineReportLogin) {
        var report = document.querySelector('#fineReportIframe')
        if (report) {
          that.$store.dispatch('app/loading', 'lock')
          report.src = that.$config.fineReport.fineReportUrl.replace('/v10/entry/access','') + '/login/cross/domain?fine_username=' + encodeURIComponent(userName) + '&fine_password=' + encodeURIComponent(password) + '&validity=' + -1 + '&callback=callback'
          // 将报表验证用户名密码的地址指向此iframe
          if (report.attachEvent) {
            // 判断是否为ie浏览器
            report.attachEvent('onload', function() {
              that.$config.fineReport.isFineReportLogin = true
              // 如果为 IE 浏览器则页面加载完成后立即执行
              // 直接跳转到数据决策系统报表
              that.isIframePage('')
              setTimeout(() => {
                that.$store.state.app.loading.close()
              }, 1000)
            })
          } else {
            // 其他浏览器则重新加载 onload 事件
            report.onload = function() {
              that.$config.fineReport.isFineReportLogin = true
              // 直接跳转到数据决策系统报表
              that.isIframePage('')
              setTimeout(() => {
                that.$store.state.app.loading.close()
              }, 1000)
            }
          }
        } else {
          this.isIframeInit = false
        }
      } else {
        // 直接跳转到数据决策系统报表
        that.isIframePage('')
      }
    },
    // 处理iframe菜单
    isIframePage(domain) {
      const cachedViews = this.$store.state.tagsView.cachedViews
      const iframeUrls = this.$store.state.iframe.iframeUrls
      if (iframeUrls && iframeUrls.length > 0) {
        // 找出已经显示的ifarme，设置为隐藏
        const iframeShow = document.querySelectorAll('.iframeShow')
        iframeShow.forEach((item) => {
          item.classList.remove('iframeShow')
        })
        // 根据tag删除多余的iframe
        const iframeAll = document.querySelectorAll('.lnkIframeMenu')
        iframeAll.forEach((item) => {
          const viewName = item.id.replace('iframe_', '')
          if (cachedViews.indexOf(viewName) < 0) {
            item.remove()
          }
        })
        const curIframes = iframeUrls.filter(o => o.path === this.$route.name)
        if (curIframes.length > 0) {
          const iframeEle = document.querySelector('#iframe_' + curIframes[0].path)
          if (iframeEle) {
            // 已经存在则显示
            iframeEle.classList.add('iframeShow')
          } else {
            // 新增iframe
            this.$nextTick(() => {
              const iframeDiv = document.querySelector('#lnkIframeMenu')
              const node = document.createElement("iframe")
              node.className = 'lnkIframeMenu iframeShow'
              node.src = domain + curIframes[0].url
              node.frameborder='no'
              node.border='0'
              node.marginwidth='0'
              node.marginheight='0'
              node.id='iframe_' + curIframes[0].path
              iframeDiv.appendChild(node)
            })
          }
        }
      }
    }
  },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews;
    // },
    key() {
      // 保证不同页面的 key 不相同，否则不会重新渲染（触发钩子）
      return this.$route.path;
    },
    showContent() {
      return this.$store.state.settings.showContent
    }
  },
  mounted() {
    // 防止直接刷新页面，iframe没加载情况
    if (!this.isIframeInit) {
      this.iframeRouteDrump()
    }

    var dlrCode = this.$store.getters.dlrCode || "null";
    var userName = this.$store.getters.userName || "null";
    watermark.set(dlrCode + '-' + userName + '-' + this.$utils.parseTime(new Date(), '{y}{m}{d}'));

    if (this.$store.state.settings.showContent === false) {
      // 只显示内页时跳出判断
      return
    }

    this.$nextTick(function(){
      window.addEventListener('keyup', function(event){
        if(event.keyCode === 13){
          const appMain = document.getElementById('AppMain')
          let dialog = document.getElementsByClassName('el-dialog__wrapper')
          let currentDialog = []
          let search = null
          dialog && dialog.length !== 0 && dialog.forEach(ele => {
            if(!ele.style.display){
              currentDialog.push(ele)
            }
          });
          if(currentDialog.length > 1){
            let z = 0
            currentDialog.forEach(ele => {
              Number(ele.style.zIndex) > z ? search = ele : false
            })
          }else if(currentDialog.length === 1){
            search = currentDialog[0]
          }else if(dialog && !dialog.length){
            search = dialog
          }
          if(search){
            search = search.querySelector('.icon-search') || (search.querySelector('.icon-search') && search.querySelector('.icon-search')[0]) || null
            if(search && search.tagName === 'I'){
              search = search.parentElement
            }
            search && search.click()
            return false
          }
          if(!search){
            search = appMain.querySelector('.icon-search') || (appMain.querySelector('.icon-search') && appMain.querySelector('.icon-search')[0]) || null
          }
          if(search && search.tagName === 'I'){
            search = search.parentElement
          }
          search && search.click()
          return false
        }
      })
    })
  }
};
</script>

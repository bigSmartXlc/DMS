export const destoryPageMixins = {
  data() {
    return {
      routePathForDestory: ''
    }
  },
  mounted() {
    if (this.$route && this.$route.path) {
      this.routePathForDestory = this.$route.path
    }
  },
  watch: {
    '$store.state.tagsView.visitedViews'(value) {
      if (this.routePathForDestory && this.routePathForDestory.length > 0 && !value.some(v => v.path === this.routePathForDestory)) {
        this.$destroy()
      }
    }
  }
  // deactivated() {
  //   console.info(this.$store.state.tagsView.visitedViews)
  //   if (!this.$store.state.tagsView.visitedViews.some(v => v.path === this.routePathForDestory)) {
  //     this.$destroy()
  //   }
  // }
}

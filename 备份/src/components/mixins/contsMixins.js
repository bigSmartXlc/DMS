// 通用计算组件
export const contsMixins = {
  props: {
    contWay: { type: Array, default: function() { return [] } }
  },
  data() {
    return {
      resulted: this.getResulted()
    }
  },
  watch: {
    contWay: {
      handler(newValue, oldValue) {
        this.resulted = this.getResulted()
      },
      deep: true
    }
  },
  methods: {
    getResulted() {
      var val = this.contWay[1]
      var row = this.contWay[0]
      if (val !== undefined && val !== '') {
        for (var i in row) {
          if (val.indexOf(i) >= 0) {
            val = val.replace(new RegExp(i, 'g'), row[i])
          }
        }
        eval('val=' + val)
        return val
      }
    }
  }
}

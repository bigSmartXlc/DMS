<!--
* description: 打印组件
* author: luojx
* createdDate: 2019-08-04
-->
<template>
  <section class="testPrint">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      title="打印"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      width="1000px"
      @close="close"
    >
      <dialogHeader
        slot="title"
        :title="'打印'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div style="height: 500px;">
        <div ref="printRef" class="print-ref">
          <div class="print-header">
            页头
          </div>

          <div class="print-barCode">
            <bar-code
              :value="barCodeValue"
              width="1px"
              height="45px"
              fontSize="16px"
              textMargin="0px"
            ></bar-code>
          </div>

          <div class="print-body">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th>序号</th>
                  <th v-for="(th, index) in tableCols.filter(o => o.hidden !== true)" :key="`th_${index}`">{{th.label}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, trIndex) in list" :key="`tr_${trIndex}`">
                  <td>{{trIndex + 1}}</td>
                  <td v-for="(td, tdIndex) in tableCols.filter(o => o.hidden !== true)" :key="`td_${tdIndex}_${tdIndex}`">{{row[td.prop]}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr><td :colspan="1 + tableCols.filter(o => o.hidden !== true).length">汇总：{{list.length}}</td></tr>
              </tfoot>
            </table>
          </div>

          <div class="print-footer">
            页尾
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button key="print" type="primary" @click="printTest">打印</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  components: {
    BarCode: () => import("vue-barcode"), dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    popupsVisible: { type: Boolean, default: false }
  },
  watch: {
    popupsVisible(v) {
      this.curPopupsVisible = v
    }
  },
  // 组件混入对象
  data() {
    return {
      curPopupsVisible: this.popupsVisible,
      // 动态生成网格列
      tableCols: [
        // 品牌编码
        { prop: 'carBrandCode', label: '品牌编码' },
        // 品牌
        { prop: 'carBrandCn', label: '品牌' },
        // 品牌英文名称
        { prop: 'carBrandEn', label: '品牌英文名称' },
        // 是否启用
        { prop: 'isEnable', label: '是否启用' },
        // 列1
        { prop: 'col1', label: '列1' },
        { prop: 'col2', label: '列2' },
        { prop: 'col3', label: '列3' },
        { prop: 'col4', label: '列4' },
        { prop: 'col5', label: '列5' }
      ],
      // 数据列表
      list: [],
      // 条形码数值
      barCodeValue: 'H2902HT201805100002'
    }
  },
  created() {
    for (var i = 1; i <= 40; i++) {
      this.list.push({
        carBrandCode: i.toString(),
        carBrandCn: '日产' + i,
        carBrandEn: '我是一个比较长的标题' + i,
        isEnable: '是',
        col1: 'col1' + i.toString(),
        col2: 'col2' + i.toString(),
        col3: 'col3' + i.toString(),
        col4: 'col4' + i.toString(),
        col5: 'col5' + i.toString()
      })
    }
  },
  methods: {
    printTest() {
      // 样式（获取style标签中的内容）
      const style = this.$printJs.getStyle('print_style')

      // 方式一：打印（通过ref）
      // this.$printJs.printByEle(this.$refs.printRef, style);

      // 方式二：打印（通过输入html内容）
      this.$printJs.printByHtml(this.$refs.printRef.innerHTML, style)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style id="print_style" scoped>
/*打印内容样式*/
html, body, .print-ref, .print-header, .print-body, .print-footer{
  font-family: 微软雅黑, sans-serif;
  border: 0;
  margin: 0;
  padding: 0;
  width:100%;
}
th, td{
  border: 0;
  margin: 0;
  padding: 0;
}
.print-header{
  font-size: 26px;
  font-weight: bold;
}
.print-footer{
  font-size: 26px;
  font-weight: bold;
}
.print-body table {
  font-size: 14px;
  word-break: break-all;
  width:100%;
  border-collapse: collapse;
}
.print-body table tr {
  height: 36px;
  line-height: 36px;
}
.print-body table thead tr th, .print-body table tbody tr td {
  text-align: center;
  border: 0.5px solid #333;
}

</style>

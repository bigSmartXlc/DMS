 <!--
* description: 首页-业绩报表组件
* author: mawenhao 修改
* createdDate: 2019-11-28
-->
<template>
  <el-col :span="span">
    <div class="formArea myNoticeLeft">
      <span class="partTitle">{{'业绩报表'}}</span>
      <div class="echartsDate">
        <span :class="{selectedClass:0==isActive}" @click="eachartSelected(0)">日</span>
        <span :class="{selectedClass:1==isActive}" @click="eachartSelected(1)">月</span>
        <span :class="{selectedClass:2==isActive}" @click="eachartSelected(2)">年</span>
      </div>
      <div id="formChart" :style="{width: '100%', height: '240px', margin: '0 auto',top:'-35px'}"></div>
    </div>
  </el-col>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    // 行内占比
    span: { type: Number, default: 24 }
  },
  data() {
    return {
      // 参数
      eachartData: [40, 60, 30, 47, 50, 20, 35],
      // 样式
      isActive: 0
    };
  },
  mounted() {
    // 调用业绩报表
    this.formChart();
  },
  methods: {
    // 业绩报表
    formChart() {
      // 初始化echarts实例
      let formChart = echarts.init(document.getElementById("formChart")); // 绘制图表

      var option = {
        color: ["#BDD4FB", "#B6F1F6"],
        borderColor: "#eee",
        title: {
          //   text: "本周出入库",
          //   textStyle: {
          //      fontSize: "12"
          //   }
        },
        // 提示框设置
        tooltip: {
          trigger: "axis",
          backgroundColor: "#ffff",
          padding: 10,
          borderWidth: 1,
          formatter: function(params) {
            // {b0}<br />{c0}个
            var str =
              "<span style='color:#000000'>" +
              params[0].name +
              "<br /><span style='color:red'>" +
              params[0].data +
              "</span>个</span>";
            return str;
          }
        },
        legend: {
          // data: ["出库", "入库"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: false },
            saveAsImage: { show: false } // 下载工具
          }
        },
        calculable: true,
        xAxis: [
          {
            offset: 15, // 偏移距离
            axisTick: {
              show: false //去掉x轴刻度线
            },
            type: "category",
            boundaryGap: true,
            data: [
              "线索数",
              "来电数",
              "意向客户数",
              "试乘试驾数",
              "订单数",
              "开票数",
              "交车数"
            ]
          }
        ],
        yAxis: [
          {
            axisLine: {
              show: false //是否显示坐标轴轴线
            },
            axisTick: {
              show: false //去掉y轴刻度线
            },
            offset: 15, // 偏移距离
            type: "value",
            min: 0, // 设置y轴刻度的最小值
            max: 100, // 设置y轴刻度的最大值
            splitNumber: 6 // 设置y轴刻度间隔个数
          }
        ],
        series: [
          {
            showSymbol: false, // 让圆点默认不显示,移入显示
            symbolSize: 5, // 设置折线上圆点大小
            type: "line",
            // name: "出库",
            // itemStyle: {
            //   normal: {}
            // },
            smooth: true, //设置折线为圆滑曲线,false则有转折点
            itemStyle: {
              normal: {
                // areaStyle: { type: "default" }, // 折线区域背景颜色
                lineStyle: {
                  width: 3,
                  color: "#e80b29",
                  shadowOffsetY: 10, // 阴影
                  shadowOffsetX: -2, // 阴影
                  shadowBlur: 3,
                  shadowColor: "rgba(232, 11, 41,.2)"
                }
              },
              emphasis: {
                //鼠标经过时折点小圆圈样式
                borderColor: "red",
                borderWidth: 2
              }
            },
            data: this.eachartData // 参数
          }
          // {
          //   name: "入库",
          //   type: "line",
          //   smooth: true,
          //   itemStyle: {
          //     normal: {
          //       areaStyle: { type: "default" },
          //       lineStyle: {
          //         width: 1,
          //         color: "#5595FC"
          //       }
          //     }
          //   },
          //   data: [10, 60, 50, 47, 20, 30, 35]
          // }
        ]
      };

      //防止越界，重绘canvas
      window.onresize = formChart.resize;
      formChart.setOption(option); //设置option
    },
    // 年/月/日点击事件
    eachartSelected(val) {
      if (val === 0) {
        this.eachartData = [40, 60, 30, 47, 50, 20, 35];
      }
      if (val === 1) {
        this.eachartData = [50, 60, 20, 47, 50, 10, 35];
      }
      if (val === 2) {
        this.eachartData = [40, 10, 30, 7, 60, 50, 32];
      }
      this.isActive = val;
      this.formChart();
    }
  }
};
</script>
<style lang="scss" scoped>
 /deep/ .echartsDate {
  position: relative;
  text-align: right;
  top: -25px;
  left: -50px;
  span {
    margin-left: 15px;
    display: inline-block;
    height: 20px;
    cursor: pointer;
  }
  // 选中后的样式
  .selectedClass {
    border-bottom: 2px #e70020 solid;
    color: #e70020;
  }
}
</style>
 <!--
* description: 用户活跃度报表-eachart
* author: mawenhao 修改
* createdDate: 2019-11-28
-->
<template>
  <el-col :span="span">
    <div class="formArea">
      <!-- <span class="partTitle">{{'业绩报表'}}</span> -->
      <div id="formChart" :style="{width: '100%', height: '320px', margin: '10px auto 0'}"></div>
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
          text: "用户活跃度统计",
          // 标题 居中
          x: "center",
          y: "top",
          textAlign: "center",
          textStyle: {
            fontSize: "12"
          }
        },
        // 折线图偏移
        grid: {
          left: "14%",
          right: "20%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["出库", "入库"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            // name: "出库",
            type: "line",
            itemStyle: {
              normal: {}
            },
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                lineStyle: {
                  width: 1,
                  color: "#4FD8F9"
                }
              }
            },
            data: [30, 182, 434, 791, 390, 30, 1000]
          },
          {
            // name: "入库",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                lineStyle: {
                  width: 1,
                  color: "#5595FC"
                }
              }
            },
            data: [1320, 1132, 601, 234, 120, 90, 20]
          }
        ]
      };

      //防止越界，重绘canvas
      window.onresize = formChart.resize;
      formChart.setOption(option); //设置option
    }
  }
};
</script>
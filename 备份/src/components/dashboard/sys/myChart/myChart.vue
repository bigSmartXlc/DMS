 <!--
* description: 首页-数据看板/我的公告echarts组件
* author: mawenhao 修改
* createdDate: 2019-11-28
-->
<template>
  <el-col :span="span">
    <div class="myNoticeBtmArea myNoticeTop">
      <span class="partTitle">{{'数据看板'}}</span>
      <div id="myChart" :style="{width: '312px', height: '275px', top:'-55px'}"></div>
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
      // 中间显示文字
      total:"86%",
      total2:"总访问量",
      optionShow:true,
      optionShow2:false,
    }
  },
  mounted() {
    this.echartsBlable()
    // 调用业绩报表
    this.draw();

  },
  methods: {
    // 我的公告图标 参数
    draw() {
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart")); // 绘制图表
      var option = {
        color: ["#f1f3f7", "#f5645f", "#fab547", "#13d1ff"],  // 图表显示文字
        tooltip: {
          trigger: "item",
          formatter: "{b}\n{c}"  //{a} <br/>{b}: {c} ({d}%)
        },
        legend: {
          // orient: 'vertical',
          itemWidth: 8,   // 设置图例图形的宽
          itemHeight: 8,  // 设置图例图形的高
          bottom: 10,
          left: "center",
          data: ["邮件营销", "联盟广告", "视频广告"]   // 图例图形显示
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "48%"],   // 饼图显示比例
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: this.optionShow,
                position: "center",
                formatter:this.echartsBlable,      
                rich: {
                  total: {
                    fontSize: 20,
                    fontFamily: "微软雅黑",
                    color: "#454c5c"
                  },
                  active: {
                    fontFamily: "微软雅黑",
                    fontSize: 12,
                    color: "#6c7a89",
                    lineHeight: "20"
                  }
                }
              },
              emphasis: {
                show: this.optionShow2,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // 需要显示的参数
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" }
            ]
          }
        ]
      };

      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
    },
    // 中间显示函数
    echartsBlable(){
      // {b}\n{c} 
      this.echartsBlable="{total|" + this.total + "}" + "\n\r" + "{active|" + this.total2 + "}"
      return this.echartsBlable;
    }
  }
};
</script>

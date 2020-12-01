<!--
* description: antd双日期选择器
* author: luojx
* createdDate: 2020-06-07
-->
<template>
  <el-col :span="span" id="antdTwoDatePicker" :key="fullComponentKey" v-if="curIsShow">
    <lableName
      :validrule="validrule"
      :curLabelName="curLabelName"
      :isShowLabel="isShowLabel"
      :isRequire="isRequire"
    ></lableName>
    <!-- a-config-provider  国际化容器
         a-locale-provider   弃用-->
    <a-config-provider :locale="zhCN">
      <a-range-picker
        :placeholder="['开始日期', '结束日期']"
        size="small"
        :value-format="valueFormat"
        :format="['YYYY-MM-DD', 'YYYY-MM-DD']"
        separator="-"
        :allowClear="clearable"
        :disabled="disabled"
        @calendarChange="onCalendarChange"
        @change="onChange"
        @clear="clearCode"
        @ok="onOk"
        @openChange="onOpenChange"
        v-model="modelCode"
        ref="antdRangePacker"
        class="doubleDate"
        className="doubleDate"
        :disabledDate="disabledStartDate"
      ></a-range-picker>
    </a-config-provider>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
  </el-col>
</template>

<script>
import { antdRangePackerMixins } from "@/components/mixins/antdRangePackerMixins";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"; //引入中文包
export default {
  name: "antdTwoDatePicker",
  mixins: [antdRangePackerMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    format: { type: String, default: () => 'YYYY-MM-DD HH:mm:ss' }
  },
  data() {
    return {
      clickInput: "left",
      valueFormat: this.format.length == 10 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss',
      zhCN // 中文设置
    };
  },
  watch: {
    format(newVal, oldVal) {
      if (newVal != oldVal) {
        if (newVal.length == 10) {
          this.valueFormat = 'YYYY-MM-DD'
        } else {
          this.valueFormat = 'YYYY-MM-DD HH:mm:ss'
        }
      }
    }
  },
  created() {
    this.dataToObject && this.dataToObject.timer ? this.resetTime() : undefined;
  },
  mounted() {
    this.bindOutClick();
  },
  methods: {
    resetTime() {
      // format 默认的时间格式
      // hhmmss  默认为false有时分秒 为true没有时分秒
      // 格式 {y}-{m}-{d} {h}:{i}:{s}
      var now = new Date();
      let defaultFormat = this.dataToObject.format ? this.dataToObject.format : "{y}-{m}-{d}"
      if(defaultFormat !== "{y}-{m}-{d}"){
        this.dataToObject.hhmmss = true
      }
      let endDate = this.$utils.parseTime(now, defaultFormat);
      endDate = this.dataToObject.hhmmss ? endDate : (endDate += " 00:00:00");
      // 年月
      endDate = this.dataToObject.format === "{y}-{m}" ? endDate += "-01 00:00:00" : endDate
      // 默认为当前时间
      if (this.dataToObject.presentTime) {
        now.setDate(now.getDate() - 1);
      }
      // 默认一周范围
      if (this.dataToObject.hebdomadTime) {
        now.setDate(now.getDate() - 6);
      }
      // 默认范围30天
      if(this.dataToObject.thirtyTime){
        now.setMonth(now.getMonth() - 1);
         now.setDate(now.getDate() +2);
      }
      // 默认累月
      if(this.dataToObject.totalMonth){
        now.setDate(1);
      }
      // 默认范围3个月
      if(this.dataToObject.threeMonth){
        now.setMonth(now.getMonth() - 2);
      }
      // 当月第一天
      if(this.dataToObject.curMonthBegin){
        now = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      // 默认一个月
      if(!(this.dataToObject.presentTime||this.dataToObject.hebdomadTime||this.dataToObject.thirtyTime||
           this.dataToObject.totalMonth||this.dataToObject.threeMonth||this.dataToObject.curMonthBegin)){
        now.setMonth(now.getMonth() - 1);
      }
      let beginDate = this.$utils.parseTime(now, defaultFormat);
      beginDate = this.dataToObject.hhmmss ? beginDate : (beginDate += " 00:00:00");
      // 年月
      beginDate = this.dataToObject.format === "{y}-{m}" ? beginDate += "-01 00:00:00" : beginDate
      // 自定义参数   customFormFields:this   customTimeCode:["开始时间字段","结束时间字段"]
      //例: dataToObject: { timer: true,customFormFields:this,customTimeCode:["submitBegDate","submitEndDate"] }, 案例: 技术报告时长查询页面
      if(this.dataToObject.customFormFields&&this.dataToObject.customTimeCode){
        let dataTimeFormFields=this.dataToObject.customFormFields.formField
        let dataTimeCode=this.dataToObject.customTimeCode
        beginDate=dataTimeFormFields[dataTimeCode[0]]
        endDate=dataTimeFormFields[dataTimeCode[1]]
      }
      this.modelCode = [beginDate, endDate];
      // 将参数传出
      this.sendCode();
    },
    // 获取每次点击日期弹层事件
    onCalendarChange(dates) {
      // 当第一次点击时进行判断：点击日期 <= 已选择日期的结束日期 则以点击日期作为开始日期直接返回
      if (dates && dates.length === 1) {
        const curDate = dates[0];
        if (curDate && this.modelCode && this.modelCode.length === 2) {
          // 选择日期
          if (this.clickInput === "left") {
            if (curDate <= this.modelCode[1]) {
              this.setModelCode([curDate, this.modelCode[1]]);
            }
          } else if (this.clickInput === "right") {
            this.setModelCode([this.modelCode[0], curDate]);
          }
        }
      }
    },
    onChange(dates, dateString) {
      this.setModelCode(dates);
    },
    onOk(dates) {
      this.setModelCode(dates);
    },
    // 回传值
    setModelCode(dates) {
      const that = this;
      // 兼容IE返回0的问题
      if (that.selectionRight >= 9 || that.selectionRight === 0) {
        that.modelCode = dates;
        that.sendCode();
        that.$refs.antdRangePacker.$refs.picker.sOpen = false;
        that.clickInput = "left";
        that.selectionRight = 0;
        that.outSelectionEnd = 0;
      }
    },
    // 回传值2
    inputModelCode(dates) {
      const that = this;
      that.modelCode = dates;
      that.sendCode();
    },
    // 当点击右边输入框时设置小于开始日期的日期不可用
    disabledStartDate(curDate) {
      if (this.clickInput !== "right") {
        return false;
      }
      if (!this.modelCode || this.modelCode.length !== 2) {
        return false;
      }
      // 86400000为一天的时间戳 设置不禁用当前日期选择
      return curDate < (Date.parse(this.modelCode[0])-86400000);
    },
    // 当弹层打开时设置高亮区域
    onOpenChange(status) {
      const that = this;
      that.selectionRight = 0;
      that.$nextTick(() => {
        setTimeout(function() {
          const inInputs = document.querySelectorAll(".ant-calendar-input");
          if (inInputs && inInputs.length === 2) {
            // 鼠标滚动事件
            // inInputs[0].addEventListener("mousewheel", function(e) {
            //   that.setMouseWheel(this, inInputs, e);
            // });
            // 输入事件
            inInputs[0].addEventListener("input", function(e) {
              if(new Date(inInputs[0].value).getDate() !== Number(inInputs[0].value.substring(inInputs[0].value.length-2)) && inInputs[0].value.length >= 10){
                inInputs[0].value = that.modelCode[0] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.modelCode[0].split(' ')[0] : that.modelCode[0] ) : ''
                inInputs[1].value = that.modelCode[1] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.modelCode[1].split(' ')[0] : that.modelCode[1]) : ''
                that.$message({
                  message: "请输入合法的日期格式和有效的日期！",
                  type: "warn"
                });
                return false
              }
              // 兼容IE返回0的问题
              if (inInputs[0].selectionEnd === 0) {
                if (that.selectionLeft === 6) {
                  inInputs[0].selectionEnd = 7
                } else if (that.selectionLeft === 9) {
                  inInputs[0].selectionEnd = 10
                }
              }
              that.selectionLeft = inInputs[0].selectionEnd;
              that.selectionRight = 1;
              if (inInputs[0].selectionEnd === 10) {
                // 从左边输入框跳到右边输入框
                that.selectInputText(inInputs[1], 0, 4)
              } else {
                that.selectTab(inInputs[0]);
              }
              // 满足日期格式
              if (inInputs[0].value.length === 10 && that.$refs.antdRangePacker.$refs.picker.sOpen === true) {
                that.inputModelCode([inInputs[0].value, inInputs[1].value]);
              }
            });
            // 点击事件
            inInputs[0].addEventListener("click", function(e) {
              that.selectionRight = 1;
              that.outSelectionEnd = 0;
              that.setClickSelect(this);
            });
            // 鼠标滚动事件
            // inInputs[1].addEventListener("mousewheel", function(e) {
            //   that.setMouseWheel(this, inInputs, e);
            // });
            // 输入事件
            inInputs[1].addEventListener("input", function(e) {
              if(new Date(inInputs[1].value).getDate() !== Number(inInputs[1].value.substring(inInputs[1].value.length-2)) && inInputs[1].value.length >= 10){
                inInputs[0].value = that.modelCode[0] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.modelCode[0].split(' ')[0] : that.modelCode[0]) : ''
                inInputs[1].value = that.modelCode[1] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.modelCode[1].split(' ')[0] : that.modelCode[1]) : ''   
                that.$message({
                  message: "请输入合法的日期格式和有效的日期！",
                  type: "warn"
                });
                return false
              }
              // 兼容IE返回0的问题
              if (inInputs[1].selectionEnd === 0) {
                if (that.selectionRight === 6) {
                  inInputs[1].selectionEnd = 7
                } else if (that.selectionRight === 9) {
                  inInputs[1].selectionEnd = 10
                }
              }
              that.selectionRight = inInputs[1].selectionEnd;
              that.outSelectionEnd = 0;
              if (that.selectionRight < 10) {
                that.selectTab(inInputs[1]);
              }
              // 满足日期格式
              if (inInputs[1].value.length === 10 && that.$refs.antdRangePacker.$refs.picker.sOpen === true) {
                that.inputModelCode([inInputs[0].value, inInputs[1].value]);
              }
            });
            // 点击事件
            inInputs[1].addEventListener("click", function(e) {
              that.selectionRight = inInputs[1].selectionEnd;
              that.outSelectionEnd = 0;
              that.setClickSelect(this);
            });
            // 选中年月日
            const input = that.clickInput === 'right' ? inInputs[1] : inInputs[0];
            if (that.outSelectionEnd < 5) {
              that.selectInputText(input, 0, 4);
            } else if (that.outSelectionEnd >= 5 && that.outSelectionEnd <= 7) {
              that.selectInputText(input, 5, 7);
            } else {
              that.selectInputText(input, 8, 10);
            }
          }
          // 设置弹层separator
          const middleText = document.querySelectorAll('.ant-calendar-range-middle')
          if (middleText && middleText.length > 0) {
            middleText[0].innerText = '-'
          }
        }, 100)
      });
      if (status === true && this.modelCode && this.modelCode.length === 2) {
        this.$refs.antdRangePacker.$refs.picker.setState({
          sHoverValue: [this.modelCode[0], this.modelCode[1]]
        });
      }
    }
  }
};
</script>

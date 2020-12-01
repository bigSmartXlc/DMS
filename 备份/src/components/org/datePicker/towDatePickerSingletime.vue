<!--
* description: 双日期选择器-(依次弹出)
* author: mwhao
* createdDate: 2020-3-17
* 修改modelCode绑定形式 linwm
-->
<template>
  <el-col :span="span" id="twoDatePicker">
    <lableName
      :validrule="validrule"
      :curLabelName="curLabelName"
      :isShowLabel="isShowLabel"
      :isRequire="isRequire"
    ></lableName>
    <el-date-picker
      ref="datepicker"
      v-model="modelCode"
      :type="dateType"
      :value-format="format"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :clearable="clearable"
      :disabled="disabled"
      @blur="sendCode"
      @clear="clearCode"
    ></el-date-picker>
    <el-date-picker
      class="picker"
      ref="picker"
      v-model="modelCode1"
      :type="dateType1"
      @change="sendCode1"
      :value-format="format"
      :clearable="clearable"
      :disabled="disabled"
      :editable="false"
      :unlink-panels="true"
    ></el-date-picker>
    <el-date-picker
      class="picker2"
      ref="picker2"
      v-model="modelCode2"
      :type="dateType1"
      @change="sendCode2"
      @blur="blur2"
      @focus="focus2"
      :value-format="format"
      :clearable="clearable"
      :disabled="disabled"
      :editable="false"
      :unlink-panels="true"
      :picker-options="pickerOptions1"
    ></el-date-picker>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
  </el-col>
</template>

<script>
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
import { inputMixins } from "@/components/mixins/inputMixins";
export default {
  name: "twoDatePicker",
  mixins: [inputMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    dateType: { type: String, default: "daterange" },
    format: { type: String, default: "yyyy-MM-dd hh:mm:ss" },
    dataToObject: { type: Object, default: () => { } }
  },
  watch: {
    // 清空
    modelCode(val) {
      if (val == null) {
        this.modelCode2 = "";
        this.modelCode1 = "";
        this.modelCode3 = "";
      }
    }
  },
  // created() {
  //   document.getElementsByClassName("el-range-input")[0].value = "";
  //   document.getElementsByClassName("el-range-input")[1].value = "";
  //   document.getElementsByClassName("el-range-input")[0].placeholder =
  //     "开始时间";
  //   document.getElementsByClassName("el-range-input")[1].placeholder =
  //     "结束时间";
  // },
  data() {
    return {
      dateType1: "date",
      isMul: true,
      modelCode: this.code.indexOf(",") > -1 ? this.code.split(",") : [],
      // 日期参数
      modelCode1: "",
      modelCode2: "",
      // 限制日期
      modelCode3: "",
      // 时间集合
      timeParameter: [],
      // 限制结束日期不能大于开始日期
      // pickerOptions0: {
      //   disabledDate: time => {
      //     if (this.modelCode2 != "") {
      //       return  time.getTime() > Date.parse(this.modelCode2);
      //     } else {
      //       return time.getTime() > Date.now();
      //     }
      //   }
      // },
      pickerOptions1: {
        disabledDate: time => {
          // console.log(this)
          return time.getTime() < Date.parse(this.modelCode3);
        }
      }
    };
  },
  methods: {
    // 第二个日期选择器
    blur2(val) {
      this.$nextTick(() => {
        this.chronological(this.modelCode1, this.modelCode2);
        this.modelCode = this.timeParameter;
        // 将值传递出去
        this.sendCode();
      });
    },
    focus2() {
      this.limitationCode(this.modelCode1);
    },
    // 选中触发
    sendCode1(val) {
      let val1 = val.split(" ");
      // IE兼容
      document.getElementsByClassName("el-range-input")[0].value = val1[0];
      document.getElementsByClassName(
        "el-range-input"
      )[1].value = this.modelCode2.split(" ")[0];
      document.getElementsByClassName("el-range-input")[1].placeholder =
        "结束日期";
      this.limitationCode(val1[0]);
      // 打开第二个弹窗
      this.$refs.picker2.focus();
    },
    sendCode2(val) {
      let val2 = val.split(" ");
      document.getElementsByClassName(
        "el-range-input"
      )[0].value = this.modelCode1;
      if (this.modelCode1 === "") {
        this.modelCode1 = val2[0];
      }
      this.limitationCode(val2[0]);
      this.chronological(this.modelCode1, this.modelCode2);
      this.modelCode = this.timeParameter;
      // 将值传递出去
      this.sendCode();
    },
    //  限制结束日期不能大于开始日期
    limitationCode(val) {
      let time = val.split(" ")[0];
      let list = time.split("-");
      if (Number(list[2]) - 1 <= 9) {
        this.modelCode3 =
          list[0] + "-" + list[1] + "-" + "0" + String(Number(list[2]) - 1);
      } else {
        this.modelCode3 = list[0] + "-" + list[1] + "-" + (Number(list[2]) - 1);
      }
    },
    // 判断时间前后顺序
    chronological(time, timer) {
      this.timeParameter = [];
      let begin = time.split("-");
      let finish = timer.split("-");
      let beginStr = begin[0] + begin[1] + begin[2];
      let finishStr = finish[0] + finish[1] + finish[2];
      if (beginStr > finishStr) {
        this.timeParameter.push(timer);
        this.timeParameter.push(time);
        this.modelCode1 = timer;
        this.modelCode2 = time;
        this.limitationCode(time);
      }
      if (beginStr <= finishStr) {
        this.timeParameter.push(time);
        this.timeParameter.push(timer);
      }
    },
    resetTime() {
      var now = new Date();
      let endDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      // 是否为当前时间
      if (this.dataToObject.presentTime) {
        now.setDate(now.getDate() - 1);
      } else {
        now.setMonth(now.getMonth() - 1);
      }
      let beginDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      // 判断返回的时间显示
      let form = this.format.split(" ");
      if (form.length > 1) {
        endDate += " 00:00:00";
        beginDate += " 00:00:00";
      }
      // let docu = document.getElementsByClassName("el-range-input");
      // this.modelCode = [beginDate, endDate];
      // 将参数传出
      // this.sendCode();
      // IE兼容
      // this.$nextTick(() => {

      //   document.getElementsByClassName("el-range-input")[0].value = "";
      //   document.getElementsByClassName("el-range-input")[1].value = "";
      // document.getElementsByClassName("el-range-input")[0].placeholder =
      //   "开始时间";
      // document.getElementsByClassName("el-range-input")[1].placeholder =
      //   "结束时间";

      //  document.getElementsByClassName("el-range-input")[0].value = endDate;
      //   document.getElementsByClassName("el-range-input")[1].value = beginDate;
      // });

      this.modelCode = [beginDate, endDate];
      // 将参数传出
      this.sendCode();
    }
  },
  created() {
    this.dataToObject && this.dataToObject.timer ? this.resetTime() : undefined;
  }
};
</script>
<style scoped lang="scss">
/deep/
  .el-date-editor.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--date {
  position: absolute;
  opacity: 0;
  left: 80px;
}
/deep/
  .el-date-editor.picker.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--date {
  width: 35%;
  left: 25%;
  z-index: 20000;
}
/deep/
  .el-date-editor.picker2.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--date {
  position: absolute;
  width: 35%;
  left: 60%;
  z-index: 20000;
}
</style>
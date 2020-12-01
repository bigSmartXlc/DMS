<!--
* description: 模板-表单
* author: zhongchh
* createdDate: 2019-10-06
* logs:
  2019-12-06 linwm 添加按钮的可配置是否显示
-->
<template>
  <a-config-provider :locale="zhCN">
    <a-range-picker 
      v-model="modelData"
      :valueFormat="valueFormat"
      ref="antdRangePacker" 
      @openChange="onOpenChange" 
      @calendarChange="onCalendarChange" 
      :disabledDate="disabledStartDate" 
      @change="doChange" 
      @ok="onOk"
      :disabled="disabled"  
      :allowClear="clearable"
      separator="-"
      :placeholder="['开始日期', '结束日期']" 
      :readonly="readonly"
      unlink-panels>
      <template slot="dateRender" slot-scope="current">
        <div class="ant-calendar-date">
          {{ current.date() }}
        </div>
      </template>
    </a-range-picker>
  </a-config-provider>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"; //引入中文包
export default {
  props: {
    datas: { type: Array, default: () => [] },
    valueFormat: { type: String, default: () => 'YYYY-MM-DD HH:mm:ss' },
    disabled: { type: Boolean, default: false },
    clearable: {type: Boolean, default: false},
    change: { type: Function, default: function(){ return false} },
    readonly: {type: Boolean, default: false},
    changeName: {type: String, default: () => ''}
  },
  data() {
    return {
      modelData: this.datas,
      clickInput: 'left',
      zhCN, // 中文设置
      newData:[] //储存每次变化的日期
    }
  },
  watch:{
   //日期数据变化时时监听变化
   datas: {
     handler(newValue, oldValue) {
       if(JSON.stringify(this.modelData) != JSON.stringify(newValue)){
         this.modelData = this.datas;
       }
     },
     deep: true
   }   
  },
  mounted() {
    const that = this
    that.$nextTick(() => {
      const inputs = that.$el.querySelectorAll('.ant-calendar-range-picker-input')
      if (inputs && inputs.length === 2) {
        inputs[0].addEventListener('click', function (e) {
          that.clickInput = 'left'
          that.outSelectionEnd = inputs[0].selectionEnd
        })
        // 右边日期输入框逻辑：限制不能点击小于开始日期
        inputs[1].addEventListener('click', function (e) {
          that.clickInput = 'right'
          that.outSelectionEnd = inputs[1].selectionEnd
        })
      }
    })
  },
  methods: {
    // 获取每次点击日期弹层事件
    onCalendarChange(dates) {
      //储存每次变化的日期
      this.newData = dates;
      // 当第一次点击时进行判断：点击日期 <= 已选择日期的结束日期 则以点击日期作为开始日期直接返回
      if (dates && dates.length === 1) {
        const curDate = dates[0]
        if (curDate && this.modelData && this.modelData.length === 2) {
          // 选择日期
          if (this.clickInput !== 'right') {
            if (curDate <= this.modelData[1]) {
              this.setModelCode([curDate, this.modelData[1]])
            }
          } else {
            this.setModelCode([this.modelData[0], curDate])
          }
          this.$emit('change')
        }
      }
    },
    doChange(dates, dateString) {
      this.setModelCode(dates)   
    },
    onOk(dates) {
      this.setModelCode(dates)
    },
    // 回传值
    setModelCode(dates) {
      const that = this
      this.$nextTick(() => {
        let date = dates.concat([])
        if((that.selectionRight >= 9 || that.selectionRight === 0) && date.length>0){
          that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? (date[0].length === 10 ? date[0] += ' 00:00:00' : '') : false
          that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? (date[1].length === 10 ? date[1] += ' 00:00:00' : '') : false
          that.modelData.splice(0)
          that.modelData.push(date[0].substring(0,10)+" 00:00:00")
          that.modelData.push(date[1].substring(0,10)+" 00:00:00")
          that.datas.splice(0) 
          that.datas.push(date[0].substring(0,10)+" 00:00:00")
          that.datas.push(date[1].substring(0,10)+" 00:00:00")
          that.$emit('update:datas', date)
          that.$forceUpdate()
          that.$refs.antdRangePacker.$refs.picker.sOpen = false
          that.clickInput = 'left'
        }else if(date.length === 0){
          that.modelData.splice(0)
          that.datas.splice(0)
          that.$emit('update:datas', date)
          that.$forceUpdate()
          that.$refs.antdRangePacker.$refs.picker.sOpen = false
          that.clickInput = 'left'
        }
      })
    },
    // 当点击右边输入框时设置小于开始日期的日期不可用
    disabledStartDate (curDate) {
      if (this.clickInput !== 'right') {
        return false
      }
      if (!this.modelData || this.modelData.length !== 2) {
        return false
      }
      return curDate.valueOf() < new Date(this.modelData[0]).getTime()
    },
    // 回传值2
    inputModelCode(dates) {
      const that = this;
      that.modelData.splice(0) 
      that.modelData.push(dates[0])
      that.modelData.push(dates[1])
      that.$emit('update:datas', dates)
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
              if(new Date(inInputs[0].value).getDate() !== Number(inInputs[0].value.substring(inInputs[0].value.length-2)) && inInputs[0].value.length === 10){
                inInputs[0].value = that.datas[0] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.datas[0].split(' ')[0] : that.datas[0]) : ''
                inInputs[1].value = that.datas[1] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.datas[1].split(' ')[0] : that.datas[1]) : ''
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
              console.log(that.selectionRight)
              if(new Date(inInputs[1].value).getDate() !== Number(inInputs[1].value.substring(inInputs[1].value.length-2)) && inInputs[1].value.length === 10){
                inInputs[0].value = that.datas[0] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.datas[0].split(' ')[0] : that.datas[0]) : ''
                inInputs[1].value = that.datas[1] ? (that.valueFormat === 'YYYY-MM-DD HH:mm:ss' ? that.datas[1].split(' ')[0] : that.datas[1]) : ''
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
          //关闭时触发渲染事件
          if(status === false && that.newData.length){
            that.setModelCode(that.newData);
            that.newData = [];
          }
        }, 100)
      });
      if (status === true && this.modelData && this.modelData.length === 2) {
        this.$refs.antdRangePacker.$refs.picker.setState({ sHoverValue: [this.modelData[0], this.modelData[1]] })
      }
    },
    // 选中字符
    selectInputText(input, selectionStart, selectionEnd) {
      if (input.setSelectionRange) {
        input.focus()
        setTimeout(function() {
          input.setSelectionRange(selectionStart, selectionEnd)
        })
      } else if (input.createTextRange) {
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', selectionEnd)
        range.moveStart('character', selectionStart)
        range.select()
      }
    },
    // 往后选择
    selectTab(input) {
      if (input.selectionEnd < 10) {
        if (input.selectionEnd === input.value.length) {
          if (input.value.length === 4 || input.value.length === 7) {
            input.value = input.value + '-'
          }
        } else {
          // (input.value.length > 0 && input.selectionEnd === 0)：解决IE返回0的问题
          if ((input.value.length > 0 && input.selectionEnd === 0) || input.selectionEnd === 4) {
            this.selectInputText(input, 5, 7)
          } else if ((input.value.length === 10 && input.selectionEnd === 0) || input.selectionEnd === 7) {
            this.selectInputText(input, 8, 10)
          }
        }
      }
    },
    // 点击选中
    setClickSelect(input) {
      console.log(input.selectionEnd)
      if (input.selectionEnd < 5) {
        this.selectInputText(input, 0, 4)
      } else if (input.selectionEnd >= 5 && input.selectionEnd <= 7) {
        this.selectInputText(input, 5, 7)
      } else {
        this.selectInputText(input, 8, 10)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-params {
  .el-col{ 
    .ant-calendar-picker{
      width: calc(100% - 5px);
    }  
    .ant-calendar-picker-input{
      height: 26px;
      margin: 0;
      padding: 0;  
    }
    .ant-calendar-range-picker-input{  
      width: 47%;
    }
  }
}  
</style>

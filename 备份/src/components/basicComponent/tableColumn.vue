<template>
  <el-table-column :label="coloumnHeader.label" :prop="coloumnHeader.codeField" align="center">
    <template v-for="(cols, index) in coloumnHeader.children">
      <tableColumn
        v-if="cols.children && cols.children.length"
        :key="`header_${cols.codeField}${index}`"
        :coloumn-header="cols"
      ></tableColumn>
      <el-table-column
        v-else
        :fixed="(cols.fixed || false) && !isRowDrop"
        :label="cols.label"
        :key="`header_${cols.codeField}${index}`"
        :prop="cols.codeField"
        :width="cols.width || null"
        :min-width="cols.minWidth || '100px'"
        :hidden="cols.hidden"
        :align=" 'center'|| cols.align"
        :sortable="cols.sortable || sortable"
        :show-overflow-tooltip="true"
      >
        <template slot="header" v-if="cols.isEdit">
          <span>
            {{cols.label}}
            <i class="el-icon-edit" style="padding: 0 5px"></i>
          </span>
        </template>
        <template slot-scope="{row}">
          <!-- 内容值-->
          <span v-if="!cols.comps">{{ row[cols.codeField] }}</span>
          <span v-else v-for="(col, i) in cols.comps" :key="`tableCols_${index}${i}`">
            <!-- dynamicTableCols参数
              * isComponent 是否是外部组件
              * comp 外部组件或非
            -->
            <!-- 参数
              * component 引入的组件
              * params 引入组件需要的参数的集合
              * sendCode 引入组件需要的方法
              * changeCode 引入组件需要的方法
              * code 默认值
              * 向前兼容
            -->
            <component
              v-if="col.isComponent && col"
              :is="col.component"
              :events="col.events"
              :params="col.params"
              :ref="col.isRequire ? col.isRequire+ col.compKey : col.compKey"
              :key="col.compKey"
              @changeCode="col.changeCode"
              @sendCode="col.sendCode"
              @focusCode="col.focusCode"
              @clickEvent="()=>{ col.clickEvent || 0}"
              :row="currentRow"
              :codeField="col.codeField"
              :textField="col.textField"
              :popupsKey="col.compKey"
              :isShow="row[col.compareField]===col.compareValue"
              :code="row[col.codeField]"
              :text="row[col.textField]"
              :comType="row.index+''"
              :isMul="col.isMul"
              :isShowLabel="row.renders[i].isRenderLabel"
              :labelName="col.labelName"
              :lookuptype="col.lookuptype"
              :format="col.format"
              :dateType="col.dateType"
              :dateOptionsType="col.dateOptionsType"
              :contWay="[row,col.contWay]"
              :clearable="col.clearable"
              :filterable="col.filterable"
              :curTableRow="col.rowFileds?row:null"
              :rowFileds="col.rowFileds"
              :queryParams="col.queryParams"
              :span="col.span || 24"
              :width="col.width"
            ></component>
            <!-- 过滤时间YYYY-MM-DD hh-mm-ss==> YYYY-MM-DD -->
            <span
              v-else-if="col.type === 'filterYMD' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].disabled))"
            >{{row[cols.codeField]|filterYMD}}</span>
            <!-- 自定义过滤显示内容 -->
            <span
              v-else-if="col.type === 'diyFilter' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].disabled))"
            >{{row[cols.codeField]|diyFilter(col.callback)}}</span>
            <!-- 下拉框-->
            <el-select
              v-else-if="col.type === 'dropdownList' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].disabled))"
              v-model="row[cols.codeField]"
              :no-data-text="col.noDataText || ''"
              @change="doChildEvent(col.event, {row})"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.blur, {row})"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || col.disabled || (col.deleteKey && (row[col.deleteKey]==col.deleteVal[0] || row[col.deleteKey]==col.deleteVal[1] || row[col.deleteKey]==col.deleteVal[2] || row[col.deleteKey]==col.deleteVal[3] || row[col.deleteKey]==col.deleteVal[4])) || false"
              class="u-mixInput dropClass"
              :clearable="col.clearable"
              collapse-tags
              size="small"
              :width="cols.width"
            >
              <el-option
                v-for="(item, i) in col.data || row[col.dataName]"
                :key="`${cols.codeField}_${i}`"
                :label="item.label||item[col.dataLable]"
                :value="item.value||item[col.dataValue]"
              ></el-option>
            </el-select>
            <!-- 文本输入框-->
            <el-input
              v-else-if="col.type === 'inputTxt' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              :width="cols.width"
              v-model="row[cols.codeField]"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.blur, {row})"
              @input="doChildEvent(col.input, {row: row, codeField: row[cols.codeField]})"
              @change="doChildEvent(col.change, {row: row, codeField: cols.codeField})"
              :readonly="(row.renders && row.renders[col.name] && row.renders[col.name].readonly) || col.readonly || (col.deleteKey && (row[col.deleteKey]==col.deleteVal[0] || row[col.deleteKey]==col.deleteVal[1] || row[col.deleteKey]==col.deleteVal[2] || row[col.deleteKey]==col.deleteVal[3] || row[col.deleteKey]==col.deleteVal[4])) || false"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
              class="u-mixInput"
              :placeholder="col.placeholder||'请输入'"
              size="small"
              :maxlength="col.maxlength||'100000000000'"
            ></el-input>
            <!-- 文本输入框-->
            <el-input
              v-else-if="col.type === 'inputTxtArea'  && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              type="textarea"
              class="dropClass"
              v-model="row[cols.codeField]"
              :readonly="(row.renders && row.renders[col.name] && row.renders[col.name].readonly) || col.readonly || false"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled)|| false"
              :placeholder="col.placeholder||'请输入'"
              size="small"
            ></el-input>
            <!-- 数字输入框-->
            <el-input
              v-else-if="col.type === 'txtNum' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              type="number"
              class="u-mixInput"
              v-model="row[cols.codeField]"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.focus, {row})"
              @change="doChildEvent(col.change, {row: row, codeField: cols.codeField})"
              :step="col.step || 1"
              :max="col.max"
              :min="col.min"
              :readonly="(row.renders && row.renders[col.name] && row.renders[col.name].readonly) || col.readonly || false"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || (col.deleteKey && (row[col.deleteKey]==col.deleteVal[0] || row[col.deleteKey]==col.deleteVal[1] || row[col.deleteKey]==col.deleteVal[2] || row[col.deleteKey]==col.deleteVal[3] || row[col.deleteKey]==col.deleteVal[4])) || false"
              :placeholder="col.placeholder||'请输入'"
              :oninput="col.oninput"
              size="small"
            ></el-input>
            <!-- 数字输入框（无按钮）-->
            <el-input-number
              v-else-if="col.type === 'btnNum' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              v-model="row[cols.codeField]"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.blur, {row})"
              @input="doChildEvent(col.input, {row: row, codeField: row[cols.codeField]})"
              @change="doChildEvent(col.change, {row: row, codeField: row[cols.codeField]})"
              :precision="col.precision || 0"
              :step="col.step || 1"
              :controls="false"
              :min="col.min"
              :readonly="(row.renders && row.renders[col.name] && row.renders[col.name].readonly) || col.readonly|| false"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled)|| false"
              :placeholder="col.placeholder||'请输入'"
              size="small"
            ></el-input-number>
            <!-- 时间输入框-->
            <el-date-picker
              v-else-if="col.type === 'inputDate' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              v-model="row[cols.codeField]"
              @change="doChildEvent(col.change, {row: row, codeField: row[cols.codeField]})"
              :type="col.dateType"
              :picker-options="col.datePickerOptions"
              :readonly="(row.renders && row.renders[col.name] && row.renders[col.name].readonly) || col.readonly|| false"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
              :clearable="col.clearable || false"
              class="u-mixInput dateInput"
              placeholder="选择日期"
              :value-format="col.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
            ></el-date-picker>
            <!-- a-->
            <a
              class="cursor"
              v-else-if="col.type === 'link' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
            >{{ row[cols.codeField] }}</a>
            <!-- 过滤器a -->
            <a
              class="curso"
              v-else-if="col.type === 'diyLink' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
            >{{ row[cols.codeField]|diyFilter(col.callback) }}</a>
            <!-- 图标 -->
            <a
              :class="col.class"
              class="curso"
              v-else-if="col.type === 'icon' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
            >{{ row[cols.codeField]|diyFilter(col.callback) }}</a>
            <!--自定义a标签带隐藏条件 -->
            <a
              class="textLink"
              v-else-if="col.type === 'textLink' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
              :hidden="col.deleteKey&&(row[col.deleteKey]==col.deleteVal[0]||row[col.deleteKey]==col.deleteVal[1]||row[col.deleteKey]==col.deleteVal[2]||row[col.deleteKey]==col.deleteVal[3]||row[col.deleteKey]==col.deleteVal[4]||row[col.deleteKey]==col.deleteVal[5]||row[col.deleteKey]==col.deleteVal[6]||row[col.deleteKey]==col.deleteVal[7])&&col.labelName==col.deleteName?true:false"
            >{{ col.labelName }}</a>
            <!-- 按钮-->
            <el-button
              v-else-if="col.type === 'button' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              size:small
              @click="doChildEvent(col.event, {row})"
              :disabled="col.disabled || false "
            >{{ col.labelName }}</el-button>
            <!-- 隔行禁用按钮-->
            <el-button
              v-else-if="col.type === 'textButton' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              size:small
              @click="doChildEvent(col.event, {row})"
              :disabled="col.deleteKey&&(row[col.deleteKey]==col.deleteVal[0]||row[col.deleteKey]==col.deleteVal[1]||row[col.deleteKey]==col.deleteVal[2]||row[col.deleteKey]==col.deleteVal[3]||row[col.deleteKey]==col.deleteVal[4])&&col.labelName==col.deleteName?true:false"
            >{{ col.labelName }}</el-button>
            <!-- 按钮isEnable-->
            <a
              v-else-if="col.type === 'isEnableBtn' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              size:small
              @click="doChildEvent(col.event, {row})"
              :disabled="(row.renders && row.renders[col.name] && row.renders[col.name].disabled) || false"
            >{{ row[col.labelName]==='启用'?'停用':"启用" }}</a>
            <!-- 复选框-->
            <el-checkbox
              v-else-if="col.type === 'checkBox' && (!col.name || (row.renders && row.renders[col.name] && !row.renders[col.name].readonly))"
              true-label="1"
              false-label="0"
              v-model="row[cols.codeField]"
              :readonly="col.readonly || false"
              :disabled="col.disabled || false"
              @change="doChildEvent(col.event, {row})"
            />
            <!-- 是否-->
            <span
              v-else-if="!col.isComponent && col.prop === 'isEnable'"
            >{{(row[cols.prop] === '1') ? '是' : '否' }}</span>
            <span
              v-else-if="col.name && row.renders && row.renders[col.name] && (row.renders[col.name].disabled || row.renders[col.name].readonly)"
            >{{ (cols.replaceField && row[cols.replaceField]) || row[cols.codeField] }}</span>
          </span>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "tableColumn",
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //是否排序
      sortable: false
    };
  },
  methods: {
    doChildEvent(clickEvent, args) {
      args = args || {};
      if (typeof clickEvent === "function") {
        clickEvent({ ...args });
      } else {
        if (clickEvent) {
          let t = this.$parent;
          while (!t[clickEvent]) {
            t = t.$parent;
          }
          t[clickEvent]({ ...args });
        }
      }
    }
  },
  filters: {
    filterYMD(value) {
      if (!value) return "";
      value = value.toString();
      return value.slice(0, 10);
    },
    diyFilter(value, callback) {
      return callback(value);
    }
  }
};
</script>
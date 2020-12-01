<!--
* description: 模板-网格
* author: zhongchh
* createdDate: 2019-10-06
* logs:
-->
<template>
  <section class="filter-params-e3s">
    <!-- 网格 -->
    <el-table
      :key="tableKey"
      ref="multipleTable"
      v-loading="listLoading"
      class="crmonepage-hello"
      :cell-style="rowStyle"
      :data="tableData"
      :element-loading-text="loadingTxt"
      fit
      border
      :span-method="dataArraySpanMethod"
      :header-cell-style="headercellstyle"
      :stripe="isStripe"
      :height="tableHeight"
      header-cell-class-name="header-cell"
      :row-class-name="tableRowClassName"
      :highlight-current-row="highlightCurrentRow"
      @row-click="handleTableRowChange"
      @selection-change="handleSelectionChange"
      @select="handleSelectionIn"
      @row-dblclick="handleDbclick"
      @select-all="handleSelectionInAll"
      :show-header="showHeader"
      @sort-change="sortChange"
    >
      <!-- 选择 或 序号 -->
      <el-table-column
        v-if="multipleSelect === 'selection'"
        type="selection"
        label="选择"
        :fixed="!isRowDrop"
        width="40"
        filed="chose"
        current-row-key="choose"
        align="center"
        :selectable="selectDisabled"
      />
      <!-- 序号 -->
      <el-table-column
        v-if="multipleSelect !== 'noNo'"
        :fixed="!isRowDrop"
        label="序号"
        width="40"
        type="index"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ (pageIndex - 1) * pageSize + row.index + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="(cols, index) in tableCols.filter((o) => !o.hidden)">
        <!-- 动态列 -->
        <table-column
          v-if="cols.children && cols.children.length"
          :key="`col_${index}`"
          :coloumn-header="cols"
        />
        <!-- 动态列 -->
        <el-table-column
          v-else
          :key="`col_${index}`"
          :fixed="(cols.fixed || false) && !isRowDrop"
          :label="cols.label"
          :prop="cols.codeField"
          :width="cols.width || null"
          :min-width="cols.minWidth || '100px'"
          :hidden="cols.hidden"
          :align="cols.align || 'center'"
          :header-align="cols.headerAlign || 'center'"
          :sortable="cols.sortable || sortable"
          :show-overflow-tooltip="((cols.comps && cols.comps.length !== 0) && (cols.comps && cols.comps[0].type !== 'inputTxtArea')) ? false : true"
          :render-header="cols.renderHeader"
          :class-name="cols.className"
        >
          <template slot="header">
            <span :class="cols.isLineBreak ? 'line-break' : ''">
              {{ cols.label }}
              <i
                v-if="cols.isEdit"
                class="el-icon-edit"
                style="padding: 0 5px"
              />
            </span>
          </template>
          <template slot-scope="{row}">
            <!-- 内容值-->
            <template v-if="!cols.comps">
              <span :style="isTableColor ? getIsTableDge(row) : ''">{{
                row[cols.codeField]
              }}</span>
              <!-- 用于多字段显示在同一列 -->
              <template v-if="cols.codeAnd">
                <span
                  :style="isTableColor ? getIsTableDge(row) : ''"
                  v-for="(and, ands) in cols.codeAnd"
                  :key="ands"
                  >{{ row[and.codeField] }}&nbsp;</span
                >
              </template>
            </template>
            <template v-for="(col, i) in cols.comps" v-else>
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
                :is="col.component"
                v-if="col.isComponent && col"
                :ref="col.isRequire ? col.isRequire + col.compKey : col.compKey"
                :key="col.compKey"
                :events="col.events"
                :params="col.params"
                :row="currentRow"
                :code-field="col.codeField"
                :text-field="col.textField"
                :popups-key="col.compKey"
                :is-show="row[col.compareField] === col.compareValue"
                :code="row[col.codeField]"
                :text="row[col.textField]"
                :com-type="row.index + ''"
                :is-mul="col.isMul"
                :is-show-label="row.renders[i].isRenderLabel"
                :label-name="col.labelName"
                :lookuptype="col.lookuptype"
                :format="col.format"
                :date-type="col.dateType"
                :date-options-type="col.dateOptionsType"
                :cont-way="[row, col.contWay]"
                :clearable="col.clearable"
                :filterable="col.filterable"
                :cur-table-row="col.rowFileds ? row : null"
                :row-fileds="col.rowFileds"
                :query-params="col.queryParams"
                :span="col.span || 24"
                :width="col.width"
                @changeCode="col.changeCode"
                @sendCode="col.sendCode"
                @focusCode="col.focusCode"
                @clickEvent="
                  () => {
                    col.clickEvent || 0;
                  }
                "
              />
              <!-- 过滤时间YYYY-MM-DD hh-mm-ss==> YYYY-MM-DD -->
              <span
                v-else-if="
                  col.type === 'filterYMD' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].disabled))
                "
                :key="`tableCols_${index}${i}`"
                >{{ row[cols.codeField] | filterYMD }}</span
              >
              <!-- 自定义过滤显示内容 -->
              <span
                v-else-if="
                  col.type === 'diyFilter' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].disabled))
                "
                :key="`tableCols_${index}${i}`"
                >{{ row[cols.codeField] | diyFilter(col.callback) }}</span
              >
              <!-- 下拉框-->
              <el-select
                v-else-if="
                  col.type === 'dropdownList' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].disabled))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                :no-data-text="col.noDataText || ''"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  col.disabled ||
                  (col.deleteKey &&
                    (row[col.deleteKey] == col.deleteVal[0] ||
                      row[col.deleteKey] == col.deleteVal[1] ||
                      row[col.deleteKey] == col.deleteVal[2] ||
                      row[col.deleteKey] == col.deleteVal[3] ||
                      row[col.deleteKey] == col.deleteVal[4])) ||
                  false
                "
                class="u-mixInput dropClass"
                :clearable="col.clearable"
                collapse-tags
                size="small"
                :width="cols.width"
                @change="doChildEvent(col.event, { row, col })"
                @focus="doChildEvent(col.focus, { row })"
                @blur="doChildEvent(col.blur, { row })"
              >
                <el-option
                  v-for="(item, i) in col.data || row[col.dataName]"
                  :key="`${cols.codeField}_${i}`"
                  :label="item.label || item[col.dataLable]"
                  :value="item.value || item[col.dataValue]"
                />
              </el-select>
              <!-- 文本输入框-->
              <el-input
                v-else-if="
                  col.type === 'inputTxt' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                :width="cols.width"
                :readonly="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].readonly) ||
                  col.readonly ||
                  (col.deleteKey &&
                    (row[col.deleteKey] == col.deleteVal[0] ||
                      row[col.deleteKey] == col.deleteVal[1] ||
                      row[col.deleteKey] == col.deleteVal[2] ||
                      row[col.deleteKey] == col.deleteVal[3] ||
                      row[col.deleteKey] == col.deleteVal[4])) ||
                  false
                "
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                class="u-mixInput"
                :placeholder="col.placeholder || row.placeholder || '请输入'"
                size="small"
                :maxlength="col.maxlength || '100000000000'"
                @focus="doChildEvent(col.focus, { row })"
                @blur="doChildEvent(col.blur, { row })"
                @input="
                  doChildEvent(col.input, {
                    row: row,
                    codeField: row[cols.codeField],
                  })
                "
                @change="
                  doChildEvent(col.change, {
                    row: row,
                    codeField: cols.codeField,
                  })
                "
              />
              <!-- 文本输入框-->
              <el-input
                v-else-if="
                  col.type === 'inputTxtArea' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                type="textarea"
                class="dropClass"
                :readonly="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].readonly) ||
                  col.readonly ||
                  false
                "
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :placeholder="col.placeholder || row.placeholder || '请输入'"
                size="small"
              />
              <!-- 数字输入框-->
              <el-input
                v-else-if="
                  col.type === 'txtNum' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                type="number"
                class="u-mixInput"
                :step="col.step || 1"
                :max="col.max"
                :min="col.min"
                :readonly="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].readonly) ||
                  col.readonly ||
                  false
                "
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  (col.deleteKey &&
                    (row[col.deleteKey] == col.deleteVal[0] ||
                      row[col.deleteKey] == col.deleteVal[1] ||
                      row[col.deleteKey] == col.deleteVal[2] ||
                      row[col.deleteKey] == col.deleteVal[3] ||
                      row[col.deleteKey] == col.deleteVal[4])) ||
                  false
                "
                :placeholder="col.placeholder || '请输入'"
                :oninput="col.oninput"
                size="small"
                @focus="doChildEvent(col.focus, { row })"
                @blur="doChildEvent(col.blur, { row })"
                @change="
                  doChildEvent(col.change, {
                    row: row,
                    codeField: cols.codeField,
                  })
                "
              />
              <!-- 数字输入框（无按钮）-->
              <el-input-number
                v-else-if="
                  col.type === 'btnNum' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                :precision="col.precision || 0"
                :step="col.step || 1"
                :controls="false"
                :min="col.min"
                :readonly="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].readonly) ||
                  col.readonly ||
                  false
                "
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :placeholder="col.placeholder || '请输入'"
                size="small"
                class="u-mixInput"
                @focus="doChildEvent(col.focus, { row })"
                @blur="doChildEvent(col.blur, { row })"
                @input="
                  doChildEvent(col.input, {
                    row: row,
                    codeField: row[cols.codeField],
                  })
                "
                @change="
                  doChildEvent(col.change, {
                    row: row,
                    codeField: row[cols.codeField],
                  })
                "
              />
              <!-- 时间输入框-->
              <el-date-picker
                v-else-if="
                  col.type === 'inputDate' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                :type="col.dateType"
                :picker-options="col.datePickerOptions"
                :readonly="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].readonly) ||
                  col.readonly ||
                  false
                "
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :clearable="col.clearable || false"
                class="u-mixInput dateInput"
                placeholder="选择日期"
                :value-format="col.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                @change="
                  doChildEvent(col.change, {
                    row: row,
                    codeField: row[cols.codeField],
                  })
                "
              />
              <!-- a-->
              <a
                v-else-if="
                  col.type === 'link1' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="cursor"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ row[cols.codeField] }}</a
              >
              <!-- a-->
              <a
                v-else-if="
                  col.type === 'link' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="cursor"
                :style="isTableColor ? getIsTableDge(row) : ''"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ row[cols.codeField] ? row[cols.codeField] : cols.label }}</a
              >
              <!-- 过滤器a -->
              <a
                v-else-if="
                  col.type === 'diyLink' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="cursor"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ row[cols.codeField] | diyFilter(col.callback) }}</a
              >
              <a
                v-else-if="
                  col.type === 'diyLinkHTML' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="cursor"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                @click="doChildEvent(col.event, { row })"
                v-html="diyFilterHTML(row[cols.codeField], col.callback)"
              ></a>
              <!--自定义a标签带隐藏条件 -->
              <a
                v-else-if="
                  col.type === 'textLink' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="textLink"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :hidden="
                  col.deleteKey &&
                  (row[col.deleteKey] == col.deleteVal[0] ||
                    row[col.deleteKey] == col.deleteVal[1] ||
                    row[col.deleteKey] == col.deleteVal[2] ||
                    row[col.deleteKey] == col.deleteVal[3] ||
                    row[col.deleteKey] == col.deleteVal[4] ||
                    row[col.deleteKey] == col.deleteVal[5] ||
                    row[col.deleteKey] == col.deleteVal[6] ||
                    row[col.deleteKey] == col.deleteVal[7]) &&
                  col.labelName == col.deleteName
                    ? true
                    : false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</a
              >
              <!--自定义a标签带多隐藏条件(delectKey通过,分隔 delectVal直接放在一起) -->
              <a
                v-else-if="
                  col.type === 'textLinks' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="textLink"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :hidden="
                  col.deleteKey &&
                  getDeleteCl(row, col.deleteVal, col.deleteKey) &&
                  col.labelName == col.deleteName
                    ? true
                    : false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</a
              >
              <!--自定义a标签带隐藏条件并存在禁用 -->
              <a
                v-else-if="
                  col.type === 'textDisableHiddenLink' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="textLink"
                :disabled="
                  col.hiddenKey &&
                  row[col.hiddenKey] == col.hiddenVal[0] &&
                  col.labelName == col.hiddenName
                    ? true
                    : false
                "
                :hidden="
                  col.deleteKey &&
                  (row[col.deleteKey] == col.deleteVal[0] ||
                    row[col.deleteKey] == col.deleteVal[1] ||
                    row[col.deleteKey] == col.deleteVal[2] ||
                    row[col.deleteKey] == col.deleteVal[3] ||
                    row[col.deleteKey] == col.deleteVal[4] ||
                    row[col.deleteKey] == col.deleteVal[5] ||
                    row[col.deleteKey] == col.deleteVal[6] ||
                    row[col.deleteKey] == col.deleteVal[7]) &&
                  col.labelName == col.deleteName
                    ? true
                    : false
                "
                :style="{
                  'pointer-events':
                    (col.hiddenKey &&
                    row[col.hiddenKey] == col.hiddenVal[0] &&
                    col.labelName == col.hiddenName
                      ? true
                      : false) === true
                      ? 'none'
                      : '',
                  cursor: 'pointer',
                  color:
                    (col.hiddenKey &&
                    row[col.hiddenKey] == col.hiddenVal[0] &&
                    col.labelName == col.hiddenName
                      ? true
                      : false) === true
                      ? 'gray !important'
                      : '',
                }"
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</a
              >
              <!--自定义a标签 两个字段组合隐藏条件 -->
              <a
                v-else-if="
                  col.type === 'textLink1' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="textLink"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :hidden="
                  ((col.deleteKey1 &&
                    row[col.deleteKey1] == col.deleteVal1 &&
                    row[col.deleteKey1] == '1' &&
                    col.deleteVal1 == '1') ||
                    (col.deleteKey1 &&
                      row[col.deleteKey1] == col.deleteVal1 &&
                      row[col.deleteKey1] == '0' &&
                      col.deleteVal1 == '0') ||
                    (row[col.deleteKey1] == '0' &&
                      col.deleteKey &&
                      (row[col.deleteKey] == col.deleteVal[0] ||
                        row[col.deleteKey] == col.deleteVal[1] ||
                        row[col.deleteKey] == col.deleteVal[2] ||
                        row[col.deleteKey] == col.deleteVal[3] ||
                        row[col.deleteKey] == col.deleteVal[4] ||
                        row[col.deleteKey] == col.deleteVal[5]))) &&
                  col.labelName == col.deleteName
                    ? true
                    : false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</a
              >
              <a
                v-else-if="
                  col.type === 'textLink2' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="textLink"
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                :hidden="
                  ((col.deleteKey &&
                    row[col.deleteKey] &&
                    row[col.deleteKey] == '0') ||
                    (col.deleteKey1 &&
                      row[col.deleteKey1] &&
                      row[col.deleteKey1] == '已停止') ||
                    (col.deleteKey &&
                      row[col.deleteKey] &&
                      row[col.deleteKey] == '1' &&
                      col.deleteKey1 &&
                      row[col.deleteKey1] &&
                      (row[col.deleteKey1] == col.deleteVal1[0] ||
                        row[col.deleteKey1] == col.deleteVal1[1]))) &&
                  col.labelName == col.deleteName
                    ? true
                    : false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</a
              >
              <!--自定义el-link标签带禁用条件 -->
              <el-link
                v-else-if="
                  col.type === 'textDisabledLink' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                class="textDisabledLink"
                :disabled="
                  col.deleteKey &&
                  (row[col.deleteKey] == col.deleteVal[0] ||
                    row[col.deleteKey] == col.deleteVal[1] ||
                    row[col.deleteKey] == col.deleteVal[2] ||
                    row[col.deleteKey] == col.deleteVal[3] ||
                    row[col.deleteKey] == col.deleteVal[4] ||
                    row[col.deleteKey] == col.deleteVal[5] ||
                    row[col.deleteKey] == col.deleteVal[6] ||
                    row[col.deleteKey] == col.deleteVal[7]) &&
                  col.labelName == col.deleteName
                    ? false
                    : true
                "
                :style="{
                  'font-size': '12px',
                  color:
                    (col.deleteKey &&
                    (row[col.deleteKey] == col.deleteVal[0] ||
                      row[col.deleteKey] == col.deleteVal[1] ||
                      row[col.deleteKey] == col.deleteVal[2] ||
                      row[col.deleteKey] == col.deleteVal[3] ||
                      row[col.deleteKey] == col.deleteVal[4]) &&
                    col.labelName == col.deleteName
                      ? true
                      : false) === true
                      ? ''
                      : 'gray !important',
                }"
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</el-link
              >
              <!-- 按钮-->
              <el-button
                v-else-if="
                  col.type === 'button' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                size:small
                :disabled="col.disabled || false"
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</el-button
              >
              <!-- 隔行禁用按钮-->
              <el-button
                v-else-if="
                  col.type === 'textButton' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                size:small
                :disabled="
                  col.deleteKey &&
                  (row[col.deleteKey] == col.deleteVal[0] ||
                    row[col.deleteKey] == col.deleteVal[1] ||
                    row[col.deleteKey] == col.deleteVal[2] ||
                    row[col.deleteKey] == col.deleteVal[3] ||
                    row[col.deleteKey] == col.deleteVal[4]) &&
                  col.labelName == col.deleteName
                    ? true
                    : false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ col.labelName }}</el-button
              >
              <!-- 按钮isEnable-->
              <a
                v-else-if="
                  col.type === 'isEnableBtn' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                size:small
                :disabled="
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                @click="doChildEvent(col.event, { row })"
                >{{ row[col.labelName] === "启用" ? "停用" : "启用" }}</a
              >
              <!-- 复选框-->
              <el-checkbox
                v-else-if="
                  col.type === 'checkBox' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                true-label="1"
                false-label="0"
                :readonly="col.readonly || false"
                :disabled="
                  col.disabled ||
                  (row.renders &&
                    row.renders[col.name] &&
                    row.renders[col.name].disabled) ||
                  false
                "
                @change="doChildEvent(col.event, { row })"
              />
              <!-- 单选组 -->
              <el-radio-group
                v-else-if="
                  col.type === 'radio' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                :readonly="col.readonly || false"
                :disabled="col.disabled || false"
                @change="
                  doChildEvent(col.event, { row: row, value: col.labelType })
                "
              >
                <el-radio :label="col.labelType">{{ col.labelName }}</el-radio>
              </el-radio-group>
              <!-- 单选组 -->
              <el-radio-group
                v-else-if="
                  col.type === 'radioGroup' &&
                  (!col.name ||
                    (row.renders &&
                      row.renders[col.name] &&
                      !row.renders[col.name].readonly))
                "
                :key="`tableCols_${index}${i}`"
                v-model="row[cols.codeField]"
                :readonly="col.readonly || false"
                :disabled="col.disabled || false"
                @change="doChildEvent(col.event, { row: row, value: col.labelType })"
              >
                <el-radio v-for="(obj, j) in col.children" :key="`radioGroup_${j}`" v-model="row[cols.codeField]" :label="obj.labelType" @click.native="doChildEvent(obj.click, { row: row, value: obj.labelType })"
                >{{ obj.labelName }}</el-radio>
              </el-radio-group>
              <!-- 是否-->
              <span
                v-else-if="!col.isComponent && col.prop === 'isEnable'"
                :key="`tableCols_${index}${i}`"
                >{{ row[cols.prop] === "1" ? "是" : "否" }}</span
              >
              <span
                v-else-if="
                  col.name &&
                  row.renders &&
                  row.renders[col.name] &&
                  (row.renders[col.name].disabled ||
                    row.renders[col.name].readonly)
                "
                :key="`tableCols_${index}${i}`"
                >{{
                  (cols.replaceField && row[cols.replaceField]) ||
                  row[cols.codeField]
                }}</span
              >
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="isPaging"
      id="paginationed"
      ref="paginationHeight"
      :page-sizes="pageSizesP.length === 0 ? [10, 20, 30] : pageSizesP"
      :page-size="pageSize"
      :prev-text="isPageSize ? $t('sys.content.prevPage') : ''"
      :next-text="isPageSize ? $t('sys.content.nextPage') : ''"
      layout="prev, pager, next, jumper, sizes, ->, total"
      :total="pageTotal"
      :current-page.sync="pageIndex"
      :background="isPageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
    />
    <div
      v-if="isOver"
      :class="
        isDefaultLeft
          ? !isPaging
            ? 'crm-page-leftScrollButton-default'
            : 'crm-page-leftScrollButton-page'
          : !isPaging
          ? 'crm-page-leftScrollButton-click'
          : 'crm-page-leftScrollButton-page'
      "
      @click="leftScroll(3)"
    >
      <i class="el-icon-caret-left" />
    </div>
    <!-- <div v-if="isOver" v-show="!isDefaultLeft" class="crm-page-leftScrollButton-click"    @click="leftScroll"><i class="el-icon-caret-left"></i></div> -->
    <div
      v-if="isOver"
      :class="
        isDefaultRight
          ? !isPaging
            ? 'crm-page-rightScrollButton-default'
            : 'crm-page-rightScrollButton-page'
          : !isPaging
          ? 'crm-page-rightScrollButton-click'
          : 'crm-page-rightScrollButton-page'
      "
      @click="rightScroll(3)"
    >
      <i class="el-icon-caret-right" />
    </div>
    <div
      v-if="rowBtns.length !== 0"
      v-show="showOpt"
      v-clickoutside="handleClose"
      class="pop"
      :style="popClass"
    >
      <el-button
        v-for="(item, i) in rowBtns"
        :key="`rowBtns_${i}`"
        :type="item.type"
        size="small"
        :class="item.class"
        @click="doChildEvent(item.event, { row })"
        >{{ item.label }}</el-button
      >
    </div>
  </section>
</template>
<script>
import tableColumn from "./tableColumn";
const checkSelectable = function(row) {
  if (row.id === "召回专用id") {
    return 0;
  } else {
    return 1;
  }
}
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target) || el.parentElement.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  directives: { clickoutside },
  components: {
    tableColumn,
  },
  filters: {
    filterYMD(value) {
      if (!value) return "";
      value = value.toString();
      return value.slice(0, 10);
    },
    diyFilter(value, callback) {
      return callback(value);
    },
  },
  props: {
    // 合并头
    headerCellStyle: {
      type: Function,
      default: () => {},
    },
    // 回调
    callbackObj: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 是否合并
    arraySpanMethod: { type: Function, default: () => {} },
    // 是否多选
    multipleSelect: { type: String, default: "index" },
    // 传入网格数据
    listData: { type: Array, default: () => [] },
    // 动态网格列
    dynamicTableCols: { type: Array, default: () => [] },
    // 是否分页
    isPaging: { type: Boolean, default: false },
    // 网格数据查询参数
    queryParams: { type: Object, default: () => {} },
    // 行点击事件
    rowClick: { type: Function, default: () => 0 },
    // 行双击事件
    dbClickRow: { type: Function, default: () => 0 },
    // 网格高度
    tableHeight: { type: Number, default: 350 },
    // 动态行操作
    rowBtns: { type: Array, default: () => [] },
    // checkbox勾选触发事件
    handleSelection: { type: Function, default: () => [] },
    rowAddClass: { type: Function, default: () => 0 },
    // 控制行内颜色显示
    rowStyle: { type: Function, default: () => [] },
    // 是否显示左右按钮
    showLeftRightIcon: { type: Boolean, default: false },
    // 数据规格
    pageSizeP: { type: Number, default: 0 },
    // 分页数组
    pageSizesP: { type: Array, default: () => [] },
    // 是否显示页数显示大小
    isPageSize: { type: Boolean, default: true },
    // 是否固定列
    isRowDrop: { type: Boolean, default: true },
    // 是否显示表头
    showHeader: { type: Boolean, default: true },
    // 时候点击高亮
    highlightCurrentRow: { type: Boolean, default: true },
    // 时候有斑马纹
    isStripe: { type: Boolean, default: true },
    selectDisabled: { type: Function, default: (row) => {
      return checkSelectable(row)
    }}
  },
  data() {
    return {
      loadingTxt: this.$store.state.app.loadingText, // 加载字
      tableKey: "tableKey",
      isOver: this.showLeftRightIcon,
      isDefaultLeft: true,
      isDefaultRight: false,
      scrollLeft: "",
      iindex: 0, // 当前滚动的角标
      headercellstyle: this.headerCellStyle,
      dataArraySpanMethod: this.arraySpanMethod,
      // 页码
      pageIndex: 1,
      // 数据规格
      pageSize: this.isPaging
        ? this.pageSizeP !== 0
          ? this.pageSizeP
          : 20
        : -1,
      // 总页数
      pageTotal: 0,
      // 网格动态生成列
      tableCols: this.dynamicTableCols,
      // 网格拖动列
      dropTableCol: this.dynamicTableCols,
      // 网格数据
      tableData: this.listData,
      // 多选行数据
      currentRow: [],
      // 单选行数据
      clickRow: [],
      // 选中行下标
      rowIndex: -1,
      // 是否固定
      // isRowDrop: true,
      // loading
      listLoading: false,
      // 是否排序
      sortable: false,
      // 行操作
      showOpt: false,
      popClass: "",
      callback: () => 0,
      //通过网格某属性判断是否变色
      isTableColor: "",
      //排序参数
      sortParam: "",
    };
  },
  watch: {
    "tableData.length": {
      handler(newVal, oldVal) {
        if (newVal == 0) {
          this.pageTotal = newVal;
        }
      },
    },
  },
  created() {
    //初始化判断网格中是否存在通过某值判断行变色
    this.getTableDge();
  },
  mounted() {
    const that = this;
    that.$nextTick(function () {
      that.isOverWidth();
      // window.addEventListener('scroll', that.handleScroll, true)
    });
  },
  methods: {
    //获取网格中需要判断的属性
    getTableDge() {
      if (this.dropTableCol.length) {
        this.dropTableCol.forEach((element) => {
          if (element.taleColor) {
            return (this.isTableColor = element.codeField);
          }
        });
      }
    },
    //获取网格中需要判断的属性 - 逻辑处理
    getIsTableDge(data) {
      if (parseFloat(data[this.isTableColor]) < 0) {
        return "color:red !important;";
      } else {
        return "";
      }
    },
    diyFilterHTML(value, callback) {
      return callback(value);
    },
    // 左右按钮点击滑动距离判断
    leftScroll(num) {
      // 获取移动个数列的宽度
      // 1.获取非固定列的数组
      if (this.iindex > 0) {
        const allColumnArr = this.$refs.multipleTable.$el
          .querySelector(".crmonepage-hello .el-table__header")
          .getElementsByTagName("th");
        const columnWidthArr = [];
        for (var i = 0; i < allColumnArr.length; i++) {
          if (allColumnArr[i].classList[2] != "is-hidden") {
            // 剔除固定列
            columnWidthArr.push(allColumnArr[i].offsetWidth);
          }
        }
        // 左滑动完成，终止
        if (this.iindex <= 0) {
          this.isDefaultLeft = true;
          this.isDefaultRight = false;
          return;
        }
        // scrollLeft距离
        var moveDistance = 0;
        this.iindex = this.iindex - num;
        if (this.iindex > 0) {
          for (var i = 0; i < columnWidthArr.length; i++) {
            moveDistance = moveDistance + parseFloat(columnWidthArr[i]);
            //  遍历到滚动的节点，终止
            if (i == this.iindex - 1) {
              break;
            }
          }
        }
      }

      if (this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft > 0) {
        this.$refs.multipleTable.$refs.bodyWrapper.style.scrollBehavior =
          "smooth";
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft = moveDistance;
        this.isDefaultLeft = false;
        this.isDefaultRight = false;
        return;
      }
      if (this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft == 0) {
        this.$refs.multipleTable.$refs.bodyWrapper.style.scrollBehavior =
          "smooth";
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft = 0;
        this.isDefaultLeft = true;
        this.isDefaultRight = false;
        return;
      }
    },
    rightScroll(num) {
      // 获取移动个数列的宽度
      // 1.获取非固定列的数组
      const allColumnArr = this.$refs.multipleTable.$el
        .querySelector(".crmonepage-hello .el-table__header")
        .getElementsByTagName("th");
      const columnWidthArr = [];
      for (var i = 0; i < allColumnArr.length; i++) {
        if (allColumnArr[i].classList[2] != "is-hidden") {
          // 剔除固定列
          columnWidthArr.push(allColumnArr[i].offsetWidth);
        }
      }
      // 右滑动完成，终止
      if (this.iindex >= columnWidthArr.length) {
        this.isDefaultLeft = false;
        this.isDefaultRight = true;
        return;
      }
      var moveDistance = 0;
      this.iindex = this.iindex + num;
      for (var i = 0; i < columnWidthArr.length; i++) {
        moveDistance = moveDistance + parseFloat(columnWidthArr[i]);
        //  遍历到滚动的节点，终止
        if (i == this.iindex - 1) {
          break;
        }
      }
      this.$refs.multipleTable.$refs.bodyWrapper.style.scrollBehavior =
        "smooth";
      this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft = moveDistance;
      // 固定列宽度
      const fixedWidth = this.$refs.multipleTable.$el.querySelector(
        ".crmonepage-hello .el-table__fixed"
      )
        ? this.$refs.multipleTable.$el
            .querySelector(".crmonepage-hello .el-table__fixed")
            .getBoundingClientRect().width
        : 0;
      //  框架宽度
      const frameworkWidth = this.$refs.multipleTable.$el.querySelector(
        ".filter-params-e3s"
      )
        ? this.$refs.multipleTable.$el
            .querySelector(".filter-params-e3s")
            .getBoundingClientRect().width
        : 0;
      //  所有列宽度
      const allColumWidth = this.$refs.multipleTable.$el.querySelector(
        ".crmonepage-hello .el-table__header"
      )
        ? this.$refs.multipleTable.$el
            .querySelector(".crmonepage-hello .el-table__header")
            .getBoundingClientRect().width
        : 0;
      //  scrollLeft距离
      const scrollLeftWidth = allColumWidth - frameworkWidth + 1;
      if (
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft >=
        parseFloat(scrollLeftWidth)
      ) {
        this.isDefaultLeft = false;
        this.isDefaultRight = true;
      } else {
        this.isDefaultLeft = false;
        this.isDefaultRight = false;
      }
      return;
    },
    isOverWidth() {
      // 是否使用滑动按钮
      if(this.$config.isShowTableSlide === false) {
        return
      }
      // 所有网格元素宽度
      const that = this;
      const allColumnWidth = this.$refs.multipleTable.$el.querySelector(
        ".crmonepage-hello .el-table__header"
      )
        ? this.$refs.multipleTable.$el
            .querySelector(".crmonepage-hello .el-table__header")
            .getBoundingClientRect().width + 1
        : 0;
      // 框架右侧宽度
      const frameWidth = this.$refs.multipleTable.$el.querySelector(
        ".filter-params-e3s"
      )
        ? this.$refs.multipleTable.$el
            .querySelector(".filter-params-e3s")
            .getBoundingClientRect().width
        : 0;
      if (allColumnWidth > frameWidth && this.showLeftRightIcon) {
        that.isOver = true;
        // 出现左右滑动按钮
      } else {
        that.isOver = false;
      }
    },
    queryList(
      page,
      dataType,
      excelName,
      excelSheetName,
      tableColumns,
      callback,
      size,
      sortable,
      scene
    ) {
      const that = this;
      that.listLoading = true;
      if (page) {
        this.pageIndex = page;
      } else {
        this.pageIndex = 1;
      }
      if (size) {
        this.pageSize = size;
      }
      const queryObj = {
        // 请求类型&参数 保存mutation  查询query
        type: "query",
        typeParam:
          "($pageIndex: Int, $pageSize: Int, $dataInfo: " +
          that.queryParams.InputType +
          (sortable ? ", $_orders: String" : "") +
          (scene ? ", $scene: String" : "") +
          ")",
        // 请求API
        apiUrl: that.queryParams.APIUrl,
        // 需要调用的API服务配置
        apiServices: [
          {
            // API服务编码&参数
            apiServiceCode: that.queryParams.ServiceCode,
            apiServiceParam:
              "(dataInfo: $dataInfo, pageIndex: $pageIndex, pageSize: $pageSize," +
              (sortable ? " _orders: $_orders" : "") +
              (scene ? " scene: $scene" : "") +
              ")",
            // 表格中台返回网格的字段
            apiQueryRow: that.queryParams.apiQueryRow,
          },
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: that.pageSize,
          pageIndex: that.pageIndex,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.queryParams.dataInfo,
        },
      };
      if (sortable) {
        queryObj.variables._orders = sortable;
      }
      if (scene) {
        queryObj.variables.scene = scene;
      }
      var paramD = that.$getParams(queryObj);
      that.$requestAPI(paramD).then((response) => {
        if (dataType == "excel") {
          // 导出excel查询
          var nowDate = new Date();
          this.$utils.downloadFile(
            response,
            `${excelName}${nowDate.getFullYear()} - ${
              nowDate.getMonth() + 1
            } - ${nowDate.getDate()} ${nowDate.getHours()}：${nowDate.getMinutes()}：${nowDate.getSeconds()}.xlsx`
          );
          return false;
        }
        const res =
          response[that.queryParams.ServiceCode] ||
          response.data[that.queryParams.ServiceCode];
        if (res.result === "1") {
          // 调用changeToOneDeepArray方法将返回的多层数据转一层数据
          that.tableData = this.$utils.changeToOneDeepArray(res.rows);
          that.pageTotal = res.records;
          if (typeof callback === "function") {
            this.callback = callback;
          }
          this.callback(that.tableData, response);
        } else {
          that.$message({
            message:
              "查询失败：" + response.data[that.queryParams.ServiceCode].msg,
            type: "warn",
            uration: 2000,
          });
        }
        that.clearTableSelect();
        that.listLoading = false;
      });
    },
    handleSizeChange(page) {
      this.execCallBack("onGetPage", page);
      this.pageSize = page;
      this.queryList(false, false, "", "", [], false, false, this.sortParam);
    },
    handleCurrentPageChange(page) {
      this.execCallBack("onGetPage", page);
      this.queryList(page, false, "", "", [], false, false, this.sortParam);
    },
    handleTableRowChange(row, index) {
      this.clickRow = [row];
      this.rowIndex = index;
      // 回调传入行点击事件
      // this.$emit('rowClick', this.currentRow)
      this.$emit("rowClick", [row]);

      if (this.rowBtns.length !== 0) {
        const x = arguments[2].currentTarget.offsetLeft + 100;
        const flag =
          Number(
            (
              arguments[2].currentTarget.offsetTop +
              arguments[2].currentTarget.offsetHeight
            ).toFixed(2)
          ) >= arguments[2].currentTarget.offsetParent.clientHeight;
        let y = Number((arguments[2].currentTarget.offsetTop + 30).toFixed(2));
        flag
          ? (y = Number(
              (y - arguments[2].currentTarget.scrollHeight).toFixed(2)
            ))
          : false;
        this.popClass = "left:" + x + "px;top:" + y + "px";
        this.showOpt = true;
      }
    },
    handleClose(e) {
      this.showOpt = false;
    },
    handleSelectionChange(rows) {
      this.$emit("selectClickChange", rows);
    },
    handleSelectionInAll(rows) {
      this.currentRow = rows;
      this.handleSelection(this.currentRow, rows);
    },
    handleSelectionIn(rows, cRows) {
      this.currentRow = rows;
      this.handleSelection(this.currentRow, cRows);
    },
    //根据唯一标识取消选中
    xzChange(showName, check, bool) {
      let that = this;
      if (that.tableData.length) {
        that.tableData.forEach((element) => {
          if (element[showName] === check) {
            that.$refs.multipleTable.toggleRowSelection(element, bool);
          }
        });
      }
    },
    // 复制网格字段
    copyTableCols(tableCols) {
      const colsObj = tableCols.filter((o) => o.hidden !== true);
      colsObj.map(function (item, i) {
        item.prop = null;
        if (item.comps) {
          !item.comps.event ? (item.comps.event = () => 0) : false;
          !item.comps.data ? [] : false;
        }
      });
      return colsObj;
    },
    // 手动设置某个属性值
    reloadFormFields(fieldName, attr, data) {
      this[data].map((item, i) => {
        if (item.fieldName === fieldName) {
          item[attr] = data;
          return false;
        }
      });
    },
    // 手动增加某个data
    updateCols(flag, value) {
      const f = Number(flag);
      this.$set(this.tableCols, f, value);
      this.$set(this.dropTableCol, f, value);
    },
    // 手动增加删除
    deleteCols(flag, value) {
      const f = Number(flag);
      this.$delete(this.tableCols, f);
      this.$delete(this.dropTableCol, f);
    },
    // 渲染自定义表头
    renderHeader(h, _ref) {
      // 获取index
      const index =
        this.multipleSelect === "selection" ? _ref.$index - 2 : _ref.$index - 1;
      // 返回编辑标志
      const html = _ref._self.dropTableCol[index].isEdit ? (
        <span>
          {_ref.column.label}
          <i class="el-icon-edit" style="padding: 0 5px "></i>
        </span>
      ) : (
        <span>{_ref.column.label}</span>
      );
      return html;
    },
    // 导出
    exportTableData(
      dataType,
      excelName,
      excelSheetName,
      tableColumns,
      lockOrUnlock
    ) {
      const that = this;
      if (that.listLoading) {
        return false;
      }
      that.listLoading = true;
      const queryObj = {
        // 请求类型&参数 保存mutation  查询query
        type: "query",
        typeParam:
          "($pageIndex: Int, $pageSize: Int, $dataInfo: " +
          that.queryParams.InputType +
          ")",
        // 请求API
        apiUrl: that.queryParams.APIUrl,
        // 需要调用的API服务配置
        apiServices: [
          {
            // API服务编码&参数
            apiServiceCode: that.queryParams.ServiceCode,
            apiServiceParam:
              "(dataInfo: $dataInfo, pageIndex: $pageIndex, pageSize: $pageSize)",
            // 表格中台返回网格的字段
            apiQueryRow: that.queryParams.apiQueryRow,
          },
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: that.pageIndex,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.queryParams.dataInfo,
        },
      };
      // 转换了中台请求格式数据
      const paramD = that.$getParams(queryObj);
      if (dataType === "excel") {
        // 网格列对象转为excel列对象
        tableColumns =
          tableColumns ||
          this.dropTableCol.filter(
            (o) =>
              o.label !== "操作" && o.label !== "附件" && o.label !== "审核意见"
          );
        var cols = JSON.parse(
          JSON.stringify(
            tableColumns.filter((o) => {
                if (typeof o.hidden == "function") {
                  o.hidden=o.hidden()
                }
              if (o.hidden !== true) {
                  return o;
              }
            })
          )
        );

        cols.forEach((item) => {
          this.$utils.getExportStringFromString(item.codeField);
        });
        var excelCols = {};
        for (var i = 0; i < cols.length; i++) {
          if (cols[i].codeField) excelCols[cols[i].codeField] = cols[i].label;
        }

        // 数据类型
        paramD.dataType = "excel";
        // excel文件名称
        paramD.excelName = excelName;
        // 根据请求API描述excel数据对象
        paramD.excels = [
          {
            // excel sheet名称
            title: excelSheetName,
            // 对应API服务编码
            actionName: that.queryParams.ServiceCode,
            // excel列
            columns: excelCols,
            // 字段格式化转换（用于导出excel）（kvs表示键值转换）
            converts: {
              kvs: {
                convert: "kvs",
                kvs: {
                  1: "是",
                  0: "否",
                },
              },
              int: {
                convert: "number",
                format: "0.00",
              },
            },
          },
        ];
      }
      paramD.lock = lockOrUnlock || "";
      that.$requestAPI(paramD).then((response) => {
        lockOrUnlock ? this.$store.state.app.loading.close() : "";
        if (dataType == "excel") {
          // 导出excel查询
          var nowDate = new Date();
          const name = `${excelName}${nowDate.getFullYear()}-${
            nowDate.getMonth() + 1
          }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}.xlsx`;
          this.$utils.downloadFile(response, name);
          that.listLoading = false;
          return false;
        }
      });
    },
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
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
      let classes = null;
      if (this.$parent.$parent.rowAddClass) {
        classes = this.$parent.$parent.rowAddClass(row, rowIndex);
      }
      return classes;
    },
    clearTableData() {
      this.clickRow = [];
      this.currentRow = [];
      this.pageIndex = 1;
      this.pageTotal = 0;
      this.tableData.splice(0);
    },
    clearTableSelect() {
      this.currentRow = [];
      this.$refs.multipleTable.clearSelection();
    },
    handleDbclick(row, column, event) {
      this.handleTableRowChange(row, column);
      this.$emit("dbClickRow", [row], column, event);
    },
    // 执行回调事件
    execCallBack() {
      if (arguments && arguments.length > 0) {
        const funcName = arguments[0];
        if (typeof this.callbackObj[funcName] === "function") {
          const args = [];
          if (arguments.length > 1) {
            for (let i = 1; i < arguments.length; i++) {
              args.push(arguments[i]);
            }
          }
          this.callbackObj[funcName](...args);
          return true;
        }
      }
      return false;
    },
    sortChange({ column, prop, order }) {
      this.sortParam = order === "descending" ? prop + ":desc" : prop + ":asc";
      this.queryList(false, false, "", "", [], false, false, this.sortParam);
    },
    //带隐藏多状态处理
    getDeleteCl(row, val, key) {
      let bool = false;
      if (val && key) {
        let newKey = key.split(",");
        newKey.forEach((element) => {
          val.forEach((element1) => {
            if (row[element] === element1) {
              return (bool = true);
            }
          });
        });
      }
      return bool;
    },
  },
};
</script>
<style lang="scss" scoped>
.u-mixInput {
  width: 100% !important;
}
/deep/ .dropClass {
  width: 100% !important;
}
.dateInput {
  padding: 0;
  width: 170px !important;
}
.pop {
  position: absolute;
  padding: 5px 15px;
  line-height: 35px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 2px #c3c3c3;
}
.cursor {
  cursor: pointer;
}

.cell.el-tooltip .textDisabledLink {
  cursor: pointer;
  vertical-align: bottom;
}

.cell.el-tooltip .textLink {
  padding: 0 3px;
  cursor: pointer;
}
/deep/.el-textarea__inner {
  height: 30px;
  padding: 2px;
}
.el-textarea__inner {
  height: 30px;
  padding: 2px;
}
/deep/.el-input__inner {
  text-align: center;
}
.el-input__inner {
  text-align: center;
}
.el-pagination__editor.el-input .el-input__inner {
  min-width: auto;
}
.line-break {
  white-space: normal !important;
}
.el-radio{
  margin-right: 0;
  font-size: 12px;
}
.el-radio__label{
  padding-left: 2px;
}
.el-radio__inner{
  padding-left: 5px;
}
</style>

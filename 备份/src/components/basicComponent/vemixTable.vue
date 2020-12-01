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
      v-loading="listLoading"
      :data="tableData"
      :element-loading-text="$store.state.app.loadingText"
      fit
      border
      :span-method="dataArraySpanMethod"
      stripe
      :height="tableHeight"
      header-cell-class-name="header-cell"
      :row-class-name="tableRowClassName"
      highlight-current-row
      ref="multipleTable"
      @row-click="handleTableRowChange"
      @selection-change="handleSelectionChange"
      @select="handleSelectionIn"
      @select-all="handleSelectionInAll"
    >
      <!-- 选择 或 序号 -->
      <el-table-column
        v-if="multipleSelect === 'selection'"
        type="selection"
        label="选择"
        :fixed="!isRowDrop"
        width="55"
        filed="chose"
        current-row-key="choose"
        align="center"
        :selectable="checkSelectable"
      />
      <!-- 序号 -->
      <el-table-column :fixed="!isRowDrop" label="序号" width="60" type="index" align="center">
        <template slot-scope="{row}">
          <span>{{(pageIndex - 1) * pageSize + row.index + 1}}</span>
        </template>
      </el-table-column>
      <!-- 动态列 -->
      <el-table-column
        v-for="(cols, index) in tableCols.filter(o => !o.hidden)"
        :fixed="(cols.fixed || false) && !isRowDrop"
        :label="cols.label"
        :key="`col_${index}`"
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
              v-else-if="col.type === 'filterYMD' && (!col.name || (row.renders[col.name] && !row.renders[col.name].disabled))"
            >{{row[cols.codeField]|filterYMD}}</span>
            <!-- 自定义过滤显示内容 -->
            <span
              v-else-if="col.type === 'diyFilter' && (!col.name || (row.renders[col.name] && !row.renders[col.name].disabled))"
            >{{row[cols.codeField]|diyFilter(col.callback)}}</span>
            <!-- 下拉框-->
            <el-select
              v-else-if="col.type === 'dropdownList' && (!col.name || (row.renders[col.name] && !row.renders[col.name].disabled))"
              v-model="row[cols.codeField]"
              :no-data-text="col.noDataText || ''"
              @change="doChildEvent(col.event, {row})"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.blur, {row})"
              :disabled="col.disabled || false"
              class="u-mixInput"
              :clearable="col.clearable"
              collapse-tags
              size="small"
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
              v-else-if="col.type === 'inputTxt' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              :width="cols.width"
              v-model="row[cols.codeField]"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.blur, {row})"
              @input="doChildEvent(col.input, {row: row, codeField: row[cols.codeField]})"
              @change="doChildEvent(col.change, {row: row, codeField: cols.codeField})"
              :readonly="col.readonly || false"
              :disabled="col.disabled || false"
              class="u-mixInput"
              :placeholder="col.placeholder||'请输入'"
              size="small"
            ></el-input>
            <!-- 文本输入框-->
            <el-input
              v-else-if="col.type === 'inputTxtArea'  && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              type="textarea"
              v-model="row[cols.codeField]"
              :readonly="col.readonly || false"
              :placeholder="col.placeholder||'请输入'"
              size="small"
            ></el-input>
            <!-- 数字输入框-->
            <el-input
              v-else-if="col.type === 'txtNum' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              type="number"
              v-model="row[cols.codeField]"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.focus, {row})"
              @change="doChildEvent(col.change, {row: row, codeField: cols.codeField})"
              :step="col.step || 1"
              :max="col.max"
              :min="col.min"
              :readonly="col.readonly|| false"
              :disabled="col.disabled|| false"
              :placeholder="col.placeholder||'请输入'"
              :oninput="col.oninput"
              size="small"
            ></el-input>
            <!-- 数字输入框（无按钮）-->
            <el-input-number
              v-else-if="col.type === 'btnNum' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              v-model="row[cols.codeField]"
              @focus="doChildEvent(col.focus, {row})"
              @blur="doChildEvent(col.blur, {row})"
              @input="doChildEvent(col.input, {row: row, codeField: row[cols.codeField]})"
              @change="doChildEvent(col.change, {row: row, codeField: row[cols.codeField]})"
              :precision="col.precision || 0"
              :step="col.step || 1"
              :controls="false"
              :min="col.min"
              :max="col.max"
              :readonly="col.readonly|| false"
              :disabled="col.disabled|| false"
              :placeholder="col.placeholder||'请输入'"
              size="small"
            ></el-input-number>
            <!-- 时间输入框-->
            <el-date-picker
              v-else-if="col.type === 'inputDate' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              v-model="row[cols.codeField]"
              @change="doChildEvent(col.change, {row: row, codeField: row[cols.codeField]})"
              :type="col.dateType"
              :picker-options="col.datePickerOptions"
              :readonly="col.readonly|| false"
              :disabled="col.disabled || false"
              class="u-mixInput"
              placeholder="选择日期"
              :value-format="col.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
            ></el-date-picker>
            <!-- a-->
            <a
              class="cursor"
              v-else-if="col.type === 'link' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
            >{{ row[cols.codeField] }}</a>
            <!-- 过滤器a -->
            <a
              class="curso"
              v-else-if="col.type === 'diyLink' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
            >{{ row[cols.codeField]|diyFilter(col.callback) }}</a>
            <!--自定义a标签带隐藏条件 -->
            <a
              class="textLink"
              v-else-if="col.type === 'textLink' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              @click="doChildEvent(col.event, {row})"
              :hidden="col.deleteKey&&(row[col.deleteKey]==col.deleteVal[0]||row[col.deleteKey]==col.deleteVal[1]||row[col.deleteKey]==col.deleteVal[2]||row[col.deleteKey]==col.deleteVal[3]||row[col.deleteKey]==col.deleteVal[4])&&col.labelName==col.deleteName?true:false"
            >{{ col.labelName }}</a>
            <!-- 按钮-->
            <el-button
              v-else-if="col.type === 'button' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              size:small
              @click="doChildEvent(col.event, {row})"
              :disabled="col.disabled || false"
            >{{ col.labelName }}</el-button>
            <!-- 按钮isEnable-->
            <el-button
              v-else-if="col.type === 'isEnableBtn' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              size:small
              @click="doChildEvent(col.event, {row})"
            >{{ row[col.labelName]==='启用'?'停用':"启用" }}</el-button>
            <!-- 复选框-->
            <el-checkbox
              v-else-if="col.type === 'checkBox' && (!col.name || (row.renders[col.name] && !row.renders[col.name].readonly))"
              true-label="1"
              false-label="0"
              v-model="row[cols.codeField]"
              @change="doChildEvent(col.event, {row})"
            />
            <!-- 是否-->
            <span
              v-else-if="!col.isComponent && col.prop === 'isEnable'"
            >{{(row[cols.prop] === '1') ? '是' : '否' }}</span>
            <span
              v-else-if="col.name && row.renders[col.name] && (row.renders[col.name].disabled || row.renders[col.name].readonly)"
            >{{ (cols.replaceField && row[cols.replaceField]) || row[cols.codeField] }}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="isPaging"
      id="paginationed"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      :prev-text="$t('sys.content.prevPage')"
      :next-text="$t('sys.content.nextPage')"
      layout="prev, pager, next, sizes, ->, total"
      ref="paginationHeight"
      :total="pageTotal"
      :current-page.sync="pageIndex"
      style="margin-bottom:10px"
      background
    ></el-pagination>
    <div v-if="tableCols.length>10" class="crm-page-leftScrollButton-click" @click="leftScroll">
      <i class="el-icon-caret-left"></i>
    </div>
    <div v-if="tableCols.length>10" class="crm-page-rightScrollButton-click" @click="rightScroll">
      <i class="el-icon-caret-right"></i>
    </div>
    <div
      v-if="rowBtns.length !== 0"
      v-show="showOpt"
      class="pop"
      :style="popClass"
      v-clickoutside="handleClose"
    >
      <el-button
        v-for="(item, i) in rowBtns"
        :key="`rowBtns_${i}`"
        :type="item.type"
        size="small"
        @click="doChildEvent(item.event, {row})"
        :class="item.class"
      >{{item.label}}</el-button>
    </div>
  </section>
</template>
<script>
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
  }
};
export default {
  directives: { clickoutside },
  props: {
    // 是否合并
    arraySpanMethod: { type: Function, default: () => {} },
    //是否多选
    multipleSelect: { type: String, default: "index" },
    //传入网格数据
    listData: { type: Array, default: () => [] },
    // 动态网格列
    dynamicTableCols: { type: Array, default: () => [] },
    //是否分页
    isPaging: { type: Boolean, default: false },
    //网格数据查询参数
    queryParams: { type: Object, default: () => {} },
    //行点击事件
    rowClick: { type: Function, default: () => 0 },
    //网格高度
    tableHeight: { type: Number, default: 350 },
    //动态行操作
    rowBtns: { type: Array, default: () => [] },
    //checkbox勾选触发事件
    handleSelection: { type: Function, default: () => [] }
  },
  data() {
    return {
      dataArraySpanMethod: this.arraySpanMethod,
      //页码
      pageIndex: 1,
      //数据规格
      pageSize: this.isPaging ? 10 : -1,
      //总页数
      pageTotal: 0,
      // 网格动态生成列
      tableCols: this.dynamicTableCols,
      // 网格拖动列
      dropTableCol: this.dynamicTableCols,
      //网格数据
      tableData: this.listData,
      //多选行数据
      currentRow: [],
      //单选行数据
      clickRow: [],
      //选中行下标
      rowIndex: -1,
      //是否固定
      isRowDrop: true,
      //loading
      listLoading: false,
      //是否排序
      sortable: false,
      //行操作
      showOpt: false,
      popClass: "",
      callback: () => 0
    };
  },
  created() {},
  watch: {
    "tableData.length": {
      handler(newVal, oldVal) {
        if (newVal == 0) {
          this.pageTotal = newVal;
        }
      }
    }
  },
  methods: {
    queryList(
      page,
      dataType,
      excelName,
      excelSheetName,
      tableColumns,
      callback,
      size
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
            apiQueryRow: that.queryParams.apiQueryRow
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: that.pageSize,
          pageIndex: that.pageIndex,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.queryParams.dataInfo
        }
      };
      var paramD = that.$getParams(queryObj);
      that.$requestAPI(paramD).then(response => {
        if (dataType == "excel") {
          //导出excel查询
          var nowDate = new Date();
          this.$utils.downloadFile(
            response,
            `${excelName}${nowDate.getFullYear()} - ${nowDate.getMonth() +
              1} - ${nowDate.getDate()} ${nowDate.getHours()}：${nowDate.getMinutes()}：${nowDate.getSeconds()}.xlsx`
          );
          return false;
        }
        let res =
          response[that.queryParams.ServiceCode] ||
          response.data[that.queryParams.ServiceCode];
        if (res.result === "1") {
          //调用changeToOneDeepArray方法将返回的多层数据转一层数据
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
            uration: 2000
          });
        }
        that.clearTableSelect();
        that.listLoading = false;
      });
    },
    handleSizeChange(page) {
      this.pageSize = page;
      this.queryList();
    },
    handleCurrentPageChange(page) {
      this.queryList(page);
    },
    handleTableRowChange(row, index) {
      this.clickRow = [row];
      this.rowIndex = index;
      //回调传入行点击事件
      // this.$emit('rowClick', this.currentRow)
      this.$emit("rowClick", [row]);

      if (this.rowBtns.length !== 0) {
        let x = arguments[2].currentTarget.offsetLeft + 100;
        let flag =
          Number(
            (
              arguments[2].currentTarget.offsetTop +
              arguments[2].currentTarget.offsetHeight
            ).toFixed(2)
          ) >= arguments[2].currentTarget.offsetParent.clientHeight
            ? true
            : false;
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
    handleSelectionChange(rows) {},
    handleSelectionInAll(rows) {
      this.currentRow = rows;
      this.handleSelection(this.currentRow, rows);
    },
    handleSelectionIn(rows, cRows) {
      this.currentRow = rows;
      this.handleSelection(this.currentRow, cRows);
    },
    // 复制网格字段
    copyTableCols(tableCols) {
      let colsObj = tableCols.filter(o => o.hidden !== true);
      colsObj.map(function(item, i) {
        item.prop = null;
        if (item.comps) {
          !item.comps.event ? (item.comps.event = () => 0) : false;
          !item.comps.data ? [] : false;
        }
      });
      return colsObj;
    },
    //手动设置某个属性值
    reloadFormFields(fieldName, attr, data) {
      this[data].map((item, i) => {
        if (item.fieldName === fieldName) {
          item[attr] = data;
          return false;
        }
      });
    },
    //手动增加某个data
    updateCols(flag, value) {
      let f = Number(flag);
      this.$set(this.tableCols, f, value);
      this.$set(this.dropTableCol, f, value);
    },
    //手动增加删除
    deleteCols(flag, value) {
      let f = Number(flag);
      this.$delete(this.tableCols, f);
      this.$delete(this.dropTableCol, f);
    },
    //渲染自定义表头
    renderHeader(h, _ref) {
      //获取index
      let index =
        this.multipleSelect === "selection" ? _ref.$index - 2 : _ref.$index - 1;
      //返回编辑标志
      let html = _ref._self.dropTableCol[index].isEdit ? (
        <span>
          {_ref.column.label}
          <i class="el-icon-edit" style="padding: 0 5px "></i>
        </span>
      ) : (
        <span>{_ref.column.label}</span>
      );
      return html;
    },
    //导出
    exportTableData(dataType, excelName, excelSheetName, tableColumns) {
      const that = this;
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
            apiQueryRow: that.queryParams.apiQueryRow
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: that.pageIndex,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.queryParams.dataInfo
        }
      };
      //转换了中台请求格式数据
      let paramD = that.$getParams(queryObj);
      if (dataType === "excel") {
        // 网格列对象转为excel列对象
        tableColumns =
          tableColumns ||
          this.dropTableCol.filter(
            o =>
              o.label !== "操作" && o.label !== "附件" && o.label !== "回复原因"
          );
        var cols = JSON.parse(
          JSON.stringify(tableColumns.filter(o => o.hidden !== true))
        );

        cols.forEach(item => {
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
                  "1": "是",
                  "0": "否"
                }
              },
              int: {
                convert: "number",
                format: "0.00"
              }
            }
          }
        ];
      }
      requestGraphQL(paramD).then(response => {
        if (dataType == "excel") {
          //导出excel查询
          var nowDate = new Date();
          let name = `${excelName}${nowDate.getFullYear()}-${nowDate.getMonth() +
            1}-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}.xlsx`;
          this.$utils.downloadFile(response, name);
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
    checkSelectable(row) {
      if (row.id === "召回专用id") {
        return false;
      } else {
        return true;
      }
    },
    leftScroll() {
      if (this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft >= 200) {
        this.$refs.multipleTable.$refs.bodyWrapper.style.scrollBehavior =
          "smooth";
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft =
          this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft - 200;
        return;
      }
      if (
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft < 200 &&
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft >= 0
      ) {
        this.$refs.multipleTable.$refs.bodyWrapper.style.scrollBehavior =
          "smooth";
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft = 0;
        return;
      }
    },
    rightScroll() {
      this.$refs.multipleTable.$refs.bodyWrapper.style.scrollBehavior =
        "smooth";
      this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft =
        this.$refs.multipleTable.$refs.bodyWrapper.scrollLeft + 200;
      return;
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
<style>
.u-mixInput {
  width: 100%;
}
.filter-params-e3s {
  position: relative;
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
.cell.el-tooltip .textLink {
  padding: 0 3px;
  cursor: pointer;
}
.el-table textarea {
  height: 30px;
}
</style>

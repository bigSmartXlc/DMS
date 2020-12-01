<!--
* description: 模板-单网格选择弹窗
* author: luojx
* createdDate: 2019-08-02
* log: 2019-08-09 liyanm 加入模块是否显示判断
*  2019-08-15  yinxy  增加输入框类型判断，默认text
-->
<template>
  <section>
    <div
      id="searchFormGroup"
      class="filter-container filter-params"
      ref="oneTable.searchArea"
    >
      <el-row :gutter="24">
        <el-col
          :span="24"
          class="table-col"
          ref="oneTable.must.tableComponents"
        >
          <component
            v-for="comp in tableComponents.filter(o => !isUseHideComp || o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :readonly="comp.readonly"
            :showPlaceholder="comp.showPlaceholder"
            :isShow="comp.isShow"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :isMul="comp.isMul"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateType="comp.dateType"
            :format="comp.format"
            :dateOptionsType="comp.dateOptionsType"
            :valueObject="curValueObject"
            :inputType="comp.inputType"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parentFileds="comp.parentFileds || ''"
            :mustFields="comp.mustFields || ''"
            :returnCodeField="comp.returnCodeField"
            :returnTextField="comp.returnTextField"
            :otherField="comp.otherField"
            :other="formField[comp.otherField]"
            :isAsync="comp.isAsync"
            :validrule="comp.validrule"
            :isUseDefault="comp.isUseDefault"
            :isHost="comp.isHost"
            :changeCodeArray="comp.changeCodeArray"
            :step="comp.step"
            :dataToObject="comp.dataToObject"
            :options="comp.options"
            :isInput="comp.isInput"
          ></component>
          <!--当查询数量较少时（建议少于等于3个），可以使用position='component'类型的按钮，直接显示在查询条件右侧-->
          <el-col
            :span="6"
            v-if="tableButtons.filter(o => o.position === 'component').length > 0"
          >
            <el-button
              v-for="(item, i) in tableButtons.filter(o => o.position === 'component')"
              :key="`${item.name}Component_${i}`"
              :compKey="item.compKey"
              :disabled="item.disabled"
              :type="item.type"
              :size="item.size"
              :class="item.class"
              @click="doChildEvent(item.clickEvent, item.argument)"
            >{{ item.text }}</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col
          :span="24"
          class="table-col"
          v-show="toggleParam"
        >
          <component
            v-for="comp in tableComponents.filter(o => isUseHideComp && o.isMust === false)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :isShow="comp.isShow"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :isMul="comp.isMul"
            :isRequire="comp.isRequire"
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateType="comp.dateType"
            :format="comp.format"
            :dateOptionsType="comp.dateOptionsType"
            :valueObject="curValueObject"
            :inputType="comp.inputType"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parentFileds="comp.parentFileds || ''"
            :mustFields="comp.mustFields || ''"
            :returnCodeField="comp.returnCodeField"
            :returnTextField="comp.returnTextField"
            :otherField="comp.otherField"
            :other="formField[comp.otherField]"
            :isAsync="comp.isAsync"
            :validrule="comp.validrule"
            :isUseDefault="comp.isUseDefault"
            :isHost="comp.isHost"
            :step="comp.step"
            :dataToObject="comp.dataToObject"
            :options="comp.options"
            :isInput="comp.isInput"
          ></component>
        </el-col>
      </el-row>
      <el-row
        v-if="isshowSearchTableButton && tableButtons.filter(o => o.position === 'component').length === 0"
        :gutter="24"
        class="butClass"
      >
        <el-col
          :span="24"
          class="table-col"
        >
          <mix-button
            v-if="tableButtons.filter(o => o.position !== 'component').length !== 0"
            name="searchBtns"
            :svFields="svFields"
            :dynamicButtons="(tableButtons.filter(o => o.position === 'right').length !== 0 ) ? tableButtons.filter(o => o.position === 'right') : tableButtons"
            :dynamicComponents="tableComponents"
            :isShowMore="true"
            :formField="formField"
            :templateType="isPopups"
            @toggle="changeToggleParam"
          ></mix-button>
        </el-col>
      </el-row>
    </div>
    <!-- 查询结果  -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="$store.state.app.loadingText"
      border
      stripe
      v-if="isshowTable"
      :height="tableHeight"
      highlight-current-row
      :ref="tableRef"
      :key="oneTableKey"
      @row-click="handleTableRowChange"
      @row-dblclick="handleTableRowDbClick"
      @select="checkSelect"
      @select-all="checkSelectAll"
      @selection-change="checkSelectChange"
      @sort-change="onSortChange"
    >
      <el-table-column
        type="selection"
        v-if="isShowSelect"
        :fixed="!isRowDrop && isFixChoose"
        width="55"
        :label="$t('sys.content.gridChoose')+'+'"
        filed="chose"
        align="center"
        current-row-key="choose"
        :selectable="getSelectable"
      />
      <!-- 选择 -->
      <el-table-column
        align="center"
        :fixed="!isRowDrop && isFixIndex"
        :label="$t('sys.content.gridIndex')"
        width="60"
        type="index"
      >
        <template slot-scope="scope">
          <span>{{(listIndex.pageIndex - 1) * listIndex.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-for="(col, index) in tableCols.filter(o => o.hidden !== true)"
        :fixed="(dropTableCols[index].fixed || false) && !isRowDrop"
        :label="col.label"
        :key="`col_${index}`"
        :show-overflow-tooltip="true"
        :prop="dropTableCols[index].prop"
        :width="dropTableCols[index].width || null"
        :hidden="dropTableCols[index].hidden"
        :align="dropTableCols[index].align"
        :sortable="dropTableCols[index].sortable || sortable"
      >
        <template slot-scope="scope">
          <span v-if="dropTableCols[index].isComponent === true && dropTableCols[index].comps">
            <component
              v-for="comp in dropTableCols[index].comps"
              :key="comp.compKey"
              :codeField="comp.codeField"
              :textField="comp.textField"
              :popupsKey="comp.compKey"
              :isShow="scope.row[comp.compareField]===comp.compareValue"
              :is="comp.component"
              :code="scope.row[comp.codeField]"
              :text="scope.row[comp.textField]"
              @changeCode="getRowComponentCode"
              @clickEvent="comp.clickEvent"
              :comType="scope.$index+''"
              :isMul="comp.isMul"
              :showPlaceholder="comp.showPlaceholder"
              :span="dropTableCols[index].span || 24"
              :isShowLabel="comp.isShowLabel"
              :labelName="comp.labelName"
              :lookuptype="comp.lookuptype"
              :format="comp.format"
              :dateType="comp.dateType"
              :isRequire="comp.isRequire"
              :dateOptionsType="comp.dateOptionsType"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
              :curTableRow="comp.rowFileds?scope.row:null"
              :rowFileds="comp.rowFileds"
              :parentFileds="comp.parentFileds || ''"
              :mustFields="comp.mustFields || ''"
              :returnCodeField="comp.returnCodeField"
              :returnTextField="comp.returnTextField"
              :disabled="comp.disabled"
              :otherField="comp.otherField"
              :isColComp="true"
              :options="comp.options"
              :isAsync="comp.isAsync"
              :isUseDefault="comp.isUseDefault"
              :isHost="comp.isHost"
              :step="comp.step"
              :dataToObject="comp.dataToObject"
              :isInput="comp.isInput"
            ></component>
          </span>
          <span v-else-if="!dropTableCols[index].isComponent && dropTableCols[index].prop === 'isEnable'">{{(scope.row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
          <span v-else>{{ scope.row[dropTableCols[index].prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizeArray"
      :page-size="listQuery.pageSize"
      :prev-text="$t('sys.content.prevPage')"
      :next-text="$t('sys.content.nextPage')"
      v-if="isShowPagination && tableCols.length > 0"
      layout="prev, pager, next, sizes, ->, total"
      ref="oneTable.pageArea"
      :total="pageTotal"
      :current-page.sync="listQuery.pageIndex"
    ></el-pagination>
    <!-- 底部按钮 -->
    <div
      v-if="isshowSearchTableButton"
      class="filter-container"
      ref="oneTable.buttonArea"
    >
      <el-row
        v-if="isshowSearchTableButton"
        :gutter="24"
        class="butClass"
      >
        <el-col
          :span="24"
          class="table-col"
        >
          <mix-button
            v-if="tableButtons.filter(o => o.position === 'left').length !==0"
            name="searchBtns"
            :svFields="svFields"
            :dynamicButtons="tableButtons.filter(o => o.position === 'left')"
            :dynamicComponents="tableComponents"
            :isShowMore="true"
            :formField="formField"
            :templateType="isPopups"
            @toggle="changeToggleParam"
          ></mix-button>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import { oneTableTemplateMixins } from "@/components/mixins/oneTableTemplateMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import mixButton from "@/components/basicComponent/mixButton";
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableTemplateMixins, valueObjectMixins],
  components: {
    mixButton
  },
  props: {
    isshowSearchTableButton: { type: Boolean, default: true }, //是否显示查询按钮模块；
    isshowSearchConTile: { type: Boolean, default: true }, //是否显示查询条件标题；
    isshowSearchCon: { type: Boolean, default: true }, //是否显示查询条件模块；
    isshowSearchResult: { type: Boolean, default: true }, //是否显示查询结果模块；
    isshowTable: { type: Boolean, default: true }, //是否显示表格
    isShowPagination: { type: Boolean, default: true } //是否显示分页
  },
  data() {
    return {
      // 是否用oneTable模板
      isOneTable: "1",
      // 是否需要隐藏查询组件
      isUseHideComp: false,
      // 是否弹窗
      isPopups: true,
      tableMarginHeight: 20,
      defalutCount: this.dynamicDefalutCount > 0 ? this.dynamicDefalutCount : 3
    };
  }
};
</script>

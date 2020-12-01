<!--
* description: 模板-单网格
* author: luojx
* createdDate: 2019-07-31
* logs:
* 2019-08-01 加入模板混入对象 luojx
* 2019-08-15  yinxy  增加输入框类型判断，默认text
* 2019-08-17  liyanm  增加table通用计算组件数据传递
-->
<template>
  <section
    id="UE-e3s"
    class="filter-params-e3s"
  >
    <div
      id="searchFormGroup"
      ref="oneTable.searchArea"
      class="filter-container filter-params"
    >
      <el-row
        v-for="page in getPageArea()"
        ref="oneTable.must.tableComponents"
        :key="page.compKey"
        :gutter="24"
      >
        <el-col
          :span="24"
          class="table-col"
        >
          <div
            v-if="page.pageArea !== '' && page.noShowArea !== true"
            class="filter-container filter-title"
          >
            {{ page.pageArea }}
          </div>
          <component
            :is="comp.component"
            v-for="comp in tableComponents.filter(o => o.isMust === true &&
              ((page.pageArea === '' && !o.pageArea) || o.pageArea === page.pageArea))"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :v-show="comp.isShow"
            :code-field="comp.codeField"
            :text-field="comp.textField"
            :popups-key="comp.compKey"
            :is-show="comp.isShow"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            :disabled="comp.disabled"
            :init-first="comp.initFirst"
            :is-mul="comp.isMul"
            :is-require="comp.isRequire"
            :span="comp.span || 6"
            :is-func="comp.isFunc"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :date-options-type="comp.dateOptionsType"
            :format="comp.format"
            :date-type="comp.dateType"
            :value-object="curValueObject"
            :input-type="comp.inputType"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parent-fileds="comp.parentFileds || ''"
            :must-fields="comp.mustFields || ''"
            :return-code-field="comp.returnCodeField"
            :return-text-field="comp.returnTextField"
            :other-field="comp.otherField"
            :is-async="comp.isAsync"
            :validrule="comp.validrule"
            :is-use-default="comp.isUseDefault"
            :is-host="comp.isHost"
            :o-fields="comp.oFields"
            :category="comp.category"
            :step="comp.step"
            :un-list-qury-fields="comp.unListQuryFields"
            :data-to-object="comp.dataToObject"
            :options="comp.options"
            :init-stop-select="comp.initStopSelect"
            :is-input="comp.isInput"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            @clickEvent="receiveEvent(comp.clickEvent)"
          />
          <!--当查询数量较少时（建议少于等于3个），可以使用position='component'类型的按钮，直接显示在查询条件右侧-->
          <el-col
            :span="6"
            v-if="tableButtons.filter(o => o.position === 'component').length > 0"
            ref="ext.Btn"
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
      <el-row
        v-if="tableComponents.length > 0"
        :gutter="24"
      >
        <el-col
          v-show="toggleParam"
          :span="24"
          class="table-col"
        >
          <component
            :is="comp.component"
            v-for="comp in tableComponents.filter(o => o.isMust === false)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :code-field="comp.codeField"
            :text-field="comp.textField"
            :popups-key="comp.compKey"
            :is-show="comp.isShow"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            :init-first="comp.initFirst"
            :disabled="comp.disabled"
            :is-mul="comp.isMul"
            :is-require="comp.isRequire"
            :span="comp.span || 6"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :input-type="comp.inputType"
            :date-options-type="comp.dateOptionsType"
            :format="comp.format"
            :date-type="comp.dateType"
            :value-object="curValueObject"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parent-fileds="comp.parentFileds || ''"
            :must-fields="comp.mustFields || ''"
            :return-code-field="comp.returnCodeField"
            :return-text-field="comp.returnTextField"
            :other-field="comp.otherField"
            :is-async="comp.isAsync"
            :validrule="comp.validrule"
            :is-use-default="comp.isUseDefault"
            :is-host="comp.isHost"
            :o-fields="comp.oFields"
            :category="comp.category"
            :un-list-qury-fields="comp.unListQuryFields"
            :data-to-object="comp.dataToObject"
            :options="comp.options"
            :step="comp.step"
            :init-stop-select="comp.initStopSelect"
            :is-input="comp.isInput"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            @clickEvent="receiveEvent(comp.clickEvent)"
          />
        </el-col>
      </el-row>
      <el-row v-if="textMessages.text">
        <span :class="textMessages.className || 'el-row-span-text'">{{ textMessages.text }}</span>
      </el-row>
      <el-row
        v-if="tableButtons.filter(o => o.position !== 'component').length > 0"
        :gutter="24"
        class="butClass"
      >
        <el-col
          :span="24"
          class="table-col"
        >
          <mix-button
            v-if="bounce && !isPopups"
            :key="curButtonKey"
            name="searchBtns"
            :position-span="tableSpan"
            :showbtn-length="tableLength"
            :sv-fields="svFields"
            :dynamic-buttons="tableButtons.filter(o => o.position !== 'component')"
            :dynamic-components="tableComponents"
            :form-field="formField"
            :is-show-more="isShowMoreBtn"
            :dynamic-toggle-param="dynamicToggleParam"
            @toggle="changeToggleParam"
          />
          <mix-button
            v-if="tableButtons.filter(o => o.position !== 'component').length !== 0 && isPopups"
            name="searchBtns"
            :sv-fields="svFields"
            :dynamic-buttons="(tableButtons.filter(o => o.position === 'right').length !== 0 ) ? tableButtons.filter(o => o.position === 'right') : tableButtons.filter(o => o.position !== 'component')"
            :dynamic-components="tableComponents"
            :is-show-more="true"
            :form-field="formField"
            :template-type="isPopups"
            @toggle="changeToggleParam"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 查询结果 -->
    <el-table
      v-if="tableCols.length > 0"
      :ref="tableRef"
      :key="oneTableKey"
      v-loading="listLoading"
      class="crmonepage-hello"
      :data="list"
      :element-loading-text="$store.state.app.loadingText"
      border
      stripe
      :height="tableHeight"
      highlight-current-row
      :span-method="dataArraySpanMethod"
      :show-summary="isShowSummary"
      :summary-method="summaryMethod"
      :cell-style="cellStyle"
      @header-dragend="columnWidthChange"
      @row-click="handleTableRowChange"
      @row-dblclick="handleTableRowDbClick"
      @select="checkSelect"
      @select-all="checkSelectAll"
      @selection-change="checkSelectChange"
      @sort-change="onSortChange"
    >
      <el-table-column
        v-if="isShowSelect"
        align="center"
        type="selection"
        :fixed="!isRowDrop && isFixChoose"
        width="55"
        filed="chose"
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
          <span>{{ (listIndex.pageIndex - 1) * listIndex.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 序号 -->

      <el-table-column
        v-for="(col, index) in tableCols.filter(o => o.hidden !== true)"
        :key="`col_${index}`"
        :fixed="(dropTableCols[index].fixed || false) && !isRowDrop"
        :label="col.label"
        :prop="dropTableCols[index].prop"
        :width="dropTableCols[index].width || null"
        :hidden="dropTableCols[index].hidden"
        :align="dropTableCols[index].align||'center'"
        :header-align="dropTableCols[index].headerAlign||'center'"
        :show-overflow-tooltip="true"
        :sortable="dropTableCols[index].sortable || sortable"
      >
        <template slot-scope="scope">
          <slot
            v-if="dropTableCols[index].isSlot === true"
            :name="dropTableCols[index].prop"
            :col="dropTableCols[index]"
            :row="scope.row"
            :scope="scope"
          />
          <span v-if="!dropTableCols[index].isSlot && dropTableCols[index].isComponent === true && dropTableCols[index].comps" :key="compInColsKey">
            <component
              :is="comp.component"
              v-for="(comp, compIndex) in dropTableCols[index].comps"
              :ref="comp.isRequire ? 'tableCom'+comp.isRequire+ comp.compKey : comp.compKey"
              :key="comp.compKey"
              :code-field="comp.codeField"
              :text-field="comp.textField"
              :popups-key="comp.compKey"
              :is-show="scope.row[comp.compareField]===comp.compareValue"
              :is-show-none="getIsShowNone(scope.row,comp.compareNone,comp.compareNoneVal)"
              :code="scope.row[comp.codeField]"
              :text="scope.row[comp.textField]"
              :validrule="comp.validrule"
              :com-type="scope.$index+''"
              :col-index="index+''"
              :comp-index="compIndex+''"
              :is-mul="comp.isMul"
              :span="dropTableCols[index].span || 24"
              :is-show-label="comp.isShowLabel"
              :is-show-comp="comp.isShowComp"
              :is-input="comp.isInput"
              :label-name="dropTableCols[index].link ? dropTableCols[index].prop : comp.labelName"
              :lookuptype="comp.lookuptype"
              :disabled="comp.disabled"
              :is-require="comp.isRequire"
              :format="comp.format"
              :step="comp.step"
              :date-type="comp.dateType"
              :date-options-type="comp.dateOptionsType"
              :cont-way="[scope.row,comp.contWay]"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
              :cur-table-row="comp.rowFileds?scope.row:null"
              :row-fileds="comp.rowFileds"
              :parent-fileds="comp.parentFileds || ''"
              :must-fields="comp.mustFields || ''"
              :return-code-field="comp.returnCodeField"
              :return-text-field="comp.returnTextField"
              :other-field="comp.otherField"
              :is-col-comp="true"
              :is-async="comp.isAsync"
              :is-use-default="comp.isUseDefault"
              :is-host="comp.isHost"
              :o-fields="comp.oFields"
              :un-list-qury-fields="comp.unListQuryFields"
              :data-to-object="comp.dataToObject"
              @changeCode="getRowComponentCode"
              @clickEvent="getRowClickEvent"
            />
          </span>
          <span v-else-if="!dropTableCols[index].isSlot && !dropTableCols[index].isComponent && dropTableCols[index].prop === 'isEnable'">{{ (scope.row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
          <span v-else-if="!dropTableCols[index].isSlot && dropTableCols[index].isFlag">{{ (scope.row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
          <span v-else-if="!dropTableCols[index].isSlot" :style="isTableColor?getIsTableDge(scope.row):''">{{ scope.row[dropTableCols[index].prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="isShowPagination && tableCols.length > 0"
      ref="oneTable.pageArea"
      background
      :page-sizes="pageSizeArray"
      :page-size="dynamicPageSize"
      :prev-text="$t('sys.content.prevPage')"
      :next-text="$t('sys.content.nextPage')"
      layout="prev, pager, next, jumper, sizes, ->, total"
      :total="pageTotal"
      :disabled="pageDisabled"
      :current-page.sync="listQuery.pageIndex"
      :pager-count="dynamicPagerCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div
      v-show="isOver"
      id="scrollLeftEle"
      class="page-ScrollButton"
      :class="getBtnClass('left')"
      @click="leftScroll(3)"
    ><i class="el-icon-caret-left" /></div>
    <div
      v-show="isOver"
      id="scrollRightEle"
      class="page-ScrollButton"
      :class="getBtnClass('right')"
      @click="rightScroll(3)"
    ><i class="el-icon-caret-right" /></div>
    <!-- 底部按钮 -->
    <div
      v-if="isshowSearchTableButton && isPopups"
      ref="oneTable.buttonArea"
      class="filter-container"
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
            :sv-fields="svFields"
            :dynamic-buttons="tableButtons.filter(o => o.position === 'left')"
            :dynamic-components="tableComponents"
            :is-show-more="true"
            :form-field="formField"
            :template-type="isPopups"
            @toggle="changeToggleParam"
          />
        </el-col>
      </el-row>
    </div>

  </section>
</template>
<script>
import { oneTableTemplateMixins } from '@/components/mixins/oneTableTemplateMixins'
import { valueObjectMixins } from '@/components/mixins/valueObjectMixins'
import { contsMixins } from '@/components/mixins/contsMixins'
import mixButton from '@/components/basicComponent/mixButton'
export default {
  components: {
    mixButton
  },
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableTemplateMixins, valueObjectMixins, contsMixins],
  props: {
    isshowSearchTableButton: { type: Boolean, default: true } // 是否显示查询按钮模块；
  },
  data() {
    return {
      // 是否用oneTable模板
      isOneTable: '1',
      // 是否点击一行时补充点击行多选标记
      isClickShowSelect: false
    }
  },
  mounted() {
    const that = this
    that.$nextTick(function() {
      that.isOverWidth()
    })
  }
}
</script>

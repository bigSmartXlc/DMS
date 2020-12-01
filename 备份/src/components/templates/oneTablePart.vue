<!--
* description: 模板-单网格
* author: luojx
* createdDate: 2019-07-31
* logs:
* 2019-08-01 加入模板混入对象 luojx
*  2019-08-15  yinxy  增加输入框类型判断，默认text
*  2019-08-17  liyanm  增加table通用计算组件数据传递
-->
<template>
  <section
    id="UE-e3s"
    class="filter-params-e3s"
  >
    <div
      id="searchFormGroup"
      class="filter-container filter-params"
      ref="oneTable.searchArea"
    >
      <el-row
        :gutter="24"
        ref="oneTable.must.tableComponents"
        v-for="page in getPageArea()"
        :key="page.compKey"
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
            v-for="comp in tableComponents.filter(o => o.isMust === true &&
                                                  ((page.pageArea === '' && !o.pageArea) || o.pageArea === page.pageArea))"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :v-show="comp.isShow"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :isShow="comp.isShow"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            @clickEvent="receiveEvent(comp.clickEvent)"
            :disabled="comp.disabled"
            :isMul="comp.isMul"
            :isRequire="comp.isRequire"
            :span="comp.span || 6"
            :isFunc="comp.isFunc"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateOptionsType="comp.dateOptionsType"
            :format="comp.format"
            :dateType="comp.dateType"
            :valueObject="curValueObject"
            :inputType="comp.inputType"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parentFileds="comp.parentFileds || ''"
            :mustFields="comp.mustFields || ''"
            :returnCodeField="comp.returnCodeField"
            :returnTextField="comp.returnTextField"
            :otherField="comp.otherField"
            :validrule="comp.validrule"
            :isUseDefault="comp.isUseDefault"
            :isHost="comp.isHost"
            :oFields="comp.oFields"
            :category="comp.category"
            :step="comp.step"
            :unListQuryFields="comp.unListQuryFields"
            :dataToObject="comp.dataToObject"
            :options="comp.options"
          ></component>
        </el-col>
      </el-row>
      <el-row
        :gutter="24"
        v-if="tableComponents.length > 0"
      >
        <el-col
          :span="24"
          class="table-col"
          v-show="toggleParam"
        >
          <component
            v-for="comp in tableComponents.filter(o => o.isMust === false)"
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
            @clickEvent="receiveEvent(comp.clickEvent)"
            :isMul="comp.isMul"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :span="comp.span || 6"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :inputType="comp.inputType"
            :dateOptionsType="comp.dateOptionsType"
            :format="comp.format"
            :dateType="comp.dateType"
            :valueObject="curValueObject"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parentFileds="comp.parentFileds || ''"
            :mustFields="comp.mustFields || ''"
            :returnCodeField="comp.returnCodeField"
            :returnTextField="comp.returnTextField"
            :otherField="comp.otherField"
            :validrule="comp.validrule"
            :isUseDefault="comp.isUseDefault"
            :isHost="comp.isHost"
            :oFields="comp.oFields"
            :category="comp.category"
            :unListQuryFields="comp.unListQuryFields"
            :dataToObject="comp.dataToObject"
            :step="comp.step"
          ></component>
        </el-col>
      </el-row>
      <el-row
        :gutter="24"
        v-if="tableButtons.length > 0"
        class="butClass"
      >
        <el-col
          :span="24"
          class="table-col"
        >
          <mix-button
            v-if="bounce"
            name="searchBtns"
            :positionSpan="tableSpan"
            :showbtnLength="tableLength"
            :svFields="svFields"
            :dynamicButtons="tableButtons"
            :dynamicComponents="tableComponents"
            :formField="formField"
            :key="curButtonKey"
            @toggle="changeToggleParam"
          ></mix-button>
        </el-col>
      </el-row>
    </div>
    <!-- 查询结果 -->
    <el-table
      v-if="tableCols.length > 0"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="$store.state.app.loadingText"
      border
      stripe
      :height="tableHeight"
      header-cell-class-name="header-cell"
      highlight-current-row
      :ref="tableRef"
      :key="oneTableKey"
      @row-click="handleTableRowChange"
      @row-dblclick="handleTableRowDbClick"
    >
      <el-table-column
        type="selection"
        v-if="isShowSelect"
        :fixed="!isRowDrop"
        width="55"
        filed="chose"
        current-row-key="choose"
        :selectable="getSelectable"
      />
      <!-- 选择 -->
      <el-table-column
        align="center"
        :fixed="!isRowDrop"
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
        :prop="dropTableCols[index].prop"
        :width="dropTableCols[index].width || null"
        :hidden="dropTableCols[index].hidden"
        :align="dropTableCols[index].align"
        :sortable="dropTableCols[index].sortable || sortable"
      >
        <template slot-scope="scope">
          <slot
            v-if="dropTableCols[index].isSlot === true"
            :name="dropTableCols[index].prop"
            :col="dropTableCols[index]"
            :row="scope.row"
          ></slot>
          <span v-if="!dropTableCols[index].isSlot && dropTableCols[index].isComponent === true && dropTableCols[index].comps">
            <component
              v-for="(comp, compIndex) in dropTableCols[index].comps"
              :key="comp.compKey"
              :is="comp.component"
              :codeField="comp.codeField"
              :textField="comp.textField"
              :popupsKey="comp.compKey"
              :isShow="scope.row[comp.compareField]===comp.compareValue"
              :code="scope.row[comp.codeField]"
              :text="scope.row[comp.textField]"
              @changeCode="getRowComponentCode"
              @clickEvent="getRowClickEvent"
              :comType="scope.$index+''"
              :colIndex="index+''"
              :compIndex="compIndex+''"
              :isMul="comp.isMul"
              :validrule="comp.validrule"
              :span="dropTableCols[index].span || 24"
              :isShowLabel="comp.isShowLabel"
              :labelName="dropTableCols[index].link ? dropTableCols[index].prop : comp.labelName"
              :lookuptype="comp.lookuptype"
              :disabled="comp.disabled"
              :format="comp.format"
              :step="comp.step"
              :dateType="comp.dateType"
              :dateOptionsType="comp.dateOptionsType"
              :contWay="[scope.row,comp.contWay]"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
              :curTableRow="comp.rowFileds?scope.row:null"
              :rowFileds="comp.rowFileds"
              :parentFileds="comp.parentFileds || ''"
              :mustFields="comp.mustFields || ''"
              :returnCodeField="comp.returnCodeField"
              :returnTextField="comp.returnTextField"
              :otherField="comp.otherField"
              :isColComp="true"
              :isAsync="comp.isAsync"
              :isUseDefault="comp.isUseDefault"
              :isHost="comp.isHost"
              :oFields="comp.oFields"
              :unListQuryFields="comp.unListQuryFields"
              :dataToObject="comp.dataToObject"
            ></component>
          </span>
          <span v-else-if="!dropTableCols[index].isSlot && !dropTableCols[index].isComponent && dropTableCols[index].prop === 'isEnable'">{{(scope.row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
          <span v-else-if="!dropTableCols[index].isSlot && dropTableCols[index].isFlag">{{(scope.row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
          <span v-else-if="!dropTableCols[index].isSlot">{{ scope.row[dropTableCols[index].prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="isShowPagination && tableCols.length > 0"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      :prev-text="$t('sys.content.prevPage')"
      :next-text="$t('sys.content.nextPage')"
      layout="prev, pager, next, sizes, ->, total"
      ref="oneTable.pageArea"
      :total="pageTotal"
      :current-page.sync="listQuery.pageIndex"
      :pager-count="dynamicPagerCount"
    >
    </el-pagination>
  </section>
</template>
<script>
import { oneTableTemplateMixins } from "@/components/mixins/oneTableTemplateMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import { contsMixins } from "@/components/mixins/contsMixins";
import mixButton from "@/components/basicComponent/mixButtonPart";
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableTemplateMixins, valueObjectMixins, contsMixins],
  components: {
    mixButton
  },
  data() {
    return {
      // 是否用oneTable模板
      isOneTable: "1",
      // 是否点击一行时补充点击行多选标记
      isClickShowSelect: false
    };
  },
  methods: {
    receiveEvent(clickEvent) {
      if (clickEvent === null || clickEvent === undefined) {
        console.info("empty event");
      } else {
        clickEvent.call();
      }
    }
  }
};
</script>

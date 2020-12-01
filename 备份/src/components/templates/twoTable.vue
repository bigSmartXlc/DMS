<!--
* description: 左右网格
* author: wangcx
* createdDate: 2019-09-05
* logs:
-->
<template>
  <div
    id="twoTable"
    class="app-container app-container-table"
  >
    <el-main class="leftMail MailOne">
      <div
        id="searchFormGroup"
        class="filter-container filter-params formList"
        v-if="tableComponents.length > 0"
        ref="oneTable.searchArea"
      >
        <el-row :gutter="24" ref="oneTable.must.tableComponents">
          <el-col
            :span="24"
            class="table-col"
          >
            <component
              v-for="comp in tableComponents.filter(o => o.isMust === true)"
              :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
              :key="comp.compKey"
              :codeField="comp.codeField"
              :textField="comp.textField"
              :popupsKey="comp.compKey"
              :is="comp.component"
              :isShow="comp.isShow || true"
              :code="formField[comp.codeField]"
              :text="formField[comp.textField]"
              @changeCode="getComponentCode"
              @focusCode="getFocusCode"
              :isMul="comp.isMul"
              :isRequire="comp.isRequire"
              :span="comp.span || 12"
              :labelName="comp.labelName"
              :lookuptype="comp.lookuptype"
              :dateOptionsType="comp.dateOptionsType"
              :format="comp.format"
              :dateType="comp.dateType"
              :valueObject="curValueObject"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
              :parentFileds="comp.parentFileds || ''"
              :returnCodeField="comp.returnCodeField"
              :returnTextField="comp.returnTextField"
              :validrule="comp.validrule"
            ></component>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col
            :span="24"
            v-show="toggleParam"
            class="table-col"
          >
            <component
              v-for="comp in tableComponents.filter(o => o.isMust === false)"
              :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
              :validrule="comp.validrule"
              :key="comp.compKey"
              :codeField="comp.codeField"
              :textField="comp.textField"
              :popupsKey="comp.compKey"
              :is="comp.component"
              :isShow="comp.isShow || true"
              :code="formField[comp.codeField]"
              :text="formField[comp.textField]"
              @changeCode="getComponentCode"
              @focusCode="getFocusCode"
              :isMul="comp.isMul"
              :isRequire="comp.isRequire"
              :span="comp.span || 12"
              :labelName="comp.labelName"
              :lookuptype="comp.lookuptype"
              :dateOptionsType="comp.dateOptionsType"
              :format="comp.format"
              :dateType="comp.dateType"
              :valueObject="curValueObject"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
              :parentFileds="comp.parentFileds || ''"
              :returnCodeField="comp.returnCodeField"
              :returnTextField="comp.returnTextField"
            ></component>
          </el-col>
        </el-row>
        <el-row
          :gutter="24"
          class="butClass"
        >
          <el-col
            :span="24"
            class="table-col"
          >
            <mix-button
              v-if="bounce"
              name="searchBtns"
              :svFields="svFields"
              :dynamicButtons="tableButtons"
              :dynamicComponents="tableComponents"
              :formField="formField"
              @toggle="changeToggleParam"
            ></mix-button>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果 -->
      <el-table
        v-loading="listLoading"
        :data="list"
         :element-loading-text="$store.state.app.loadingText"
        border
        stripe
        :height="tableHeight"
        highlight-current-row
        @selection-change="changeRowleftFun"
        :ref="tableRef"
        @row-click="handleTableRowChange"
      >
        <el-table-column
          type="selection"
          v-if="isShowSelect"
          :fixed="!isRowDrop && isLeftFixChoose"
          width="55"
          :label="$t('sys.content.gridChoose')+'+'"
          filed="chose"
          current-row-key="choose"
        />
        <!-- 选择 -->
        <el-table-column
          align="center"
          :fixed="!isRowDrop && isLeftFixIndex"
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
        >
          <template slot-scope="{row}">
            <span v-if="dropTableCols[index].isComponent === true && dropTableCols[index].comps">
              <component
                v-for="comp in dropTableCols[index].comps"
                :key="comp.compKey"
                :codeField="comp.codeField"
                :textField="comp.textField"
                :popupsKey="comp.compKey"
                :isShow="row[comp.compareField]===comp.compareValue"
                :is="comp.component"
                :code="row[comp.codeField]"
                :text="row[comp.textField]"
                @changeCode="getRowComponentCode"
                @clickEvent="comp.clickEvent"
                :comType="row.index+''"
                :isMul="comp.isMul"
                :span="dropTableCols[index].span || 24"
                :isShowLabel="comp.isShowLabel"
                :labelName="comp.labelName"
                :lookuptype="comp.lookuptype"
                :format="comp.format"
                :dateType="comp.dateType"
                :dateOptionsType="comp.dateOptionsType"
                :parentFileds="comp.parentFileds || ''"
                :clearable="comp.clearable"
                :filterable="comp.filterable"
                :returnCodeField="comp.returnCodeField"
                :returnTextField="comp.returnTextField"
                :isColComp="true"
                :options="comp.options"
              ></component>
            </span>
            <span v-else-if="!dropTableCols[index].isComponent && dropTableCols[index].prop === 'isEnable'">{{(row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
            <span v-else-if="!dropTableCols[index].isComponent && dropTableCols[index].isDefalus === true">{{(row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>

            <span v-else>{{ row[dropTableCols[index].prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        v-if="isShowLeftPagination"
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
        :pager-count="5"
      ></el-pagination>
    </el-main>
    <el-main class="MailOne rightElmain">
      <div
        id="searchFormGroup"
        v-if="tableComponents.length > 0"
        class="filter-container filter-params formList filter-right-form"
        ref="rightTable.searchArea"
      >
        <el-row :gutter="24" ref="rightTable.must.righttableComponents">
          <el-col
            :span="24"
            class="table-col"
            :key="righttableComponentsKey"
          >
            <component
              v-for="comp in righttableComponents.filter(o => o.isMust === true)"
              :ref="comp.isRequire ? 'twoTable'+comp.isRequire+ comp.compKey : comp.compKey"
              :validrule="comp.validrule"
              :key="comp.compKey"
              :codeField="comp.codeField"
              :textField="comp.textField"
              :popupsKey="comp.compKey"
              :is="comp.component"
              :code="rightFormField[comp.codeField]"
              :text="rightFormField[comp.textField]"
              @changeCode="getRightComponentCode"
              @focusCode="getRightFocusCode"
              :isMul="comp.isMul"
              :isRequire="comp.isRequire"
              :disabled="comp.disabled"
              :span="comp.span || 12"
              :labelName="comp.labelName"
              :lookuptype="comp.lookuptype"
              :dateOptionsType="comp.dateOptionsType"
              :parentFileds="comp.parentFileds || ''"
              :format="comp.format"
              :dateType="comp.dateType"
              :valueObject="curValueObject"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
            ></component>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col
            :span="24"
            v-show="toggleParamRight"
            class="table-col"
          >
            <component
              v-for="comp in righttableComponents.filter(o => o.isMust === false)"
              :ref="comp.isRequire ?  'twoTable'+comp.isRequire+ comp.compKey : comp.compKey"
              :validrule="comp.validrule"
              :key="comp.compKey"
              :codeField="comp.codeField"
              :textField="comp.textField"
              :popupsKey="comp.compKey"
              :is="comp.component"
              :code="rightFormField[comp.codeField]"
              :text="rightFormField[comp.textField]"
              @changeCode="getRightComponentCode"
              @focusCode="getRightFocusCode"
              :isMul="comp.isMul"
              :isRequire="comp.isRequire"
              :span="comp.span || 12"
              :labelName="comp.labelName"
              :lookuptype="comp.lookuptype"
              :dateOptionsType="comp.dateOptionsType"
              :format="comp.format"
              :dateType="comp.dateType"
              :valueObject="curValueObject"
              :clearable="comp.clearable"
              :filterable="comp.filterable"
            ></component>
          </el-col>
        </el-row>
        <el-row
          :gutter="24"
          class="butClass"
        >
          <el-col
            :span="24"
            class="table-col"
          >
            <mix-button
              v-if="bounce"
              name="searchBtns"
              :svFields="svFields"
              :dynamicButtons="righttableButtons"
              :dynamicComponents="righttableComponents"
              :formField="rightformField"
              @toggle="changeToggleParamRight"
            ></mix-button>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果 -->
      <el-table
        v-loading="rightListLoading"
        :data="rightList"
         :element-loading-text="$store.state.app.loadingText"
        border
        stripe
        :height="RightTableHeight"
        highlight-current-row
        :ref="rightTableRef"
        @selection-change="changeFun"
        @row-click="handleTableRightRowChange"
      >
        <el-table-column
          type="selection"
          v-if="isShowRightSelect"
          :fixed="!isRowDrop && isRightFixChoose"
          width="55"
          :label="$t('sys.content.gridChoose')+'+'"
          filed="chose"
          current-row-key="choose"
        />
        <!-- 选择 -->
        <el-table-column
          align="center"
          :fixed="!isRowDrop && isRightFixIndex"
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
          v-for="(col, index) in righttableCols.filter(o => o.hidden !== true)"
          :fixed="(dropRightTableCols[index].fixed || false) && !isRowDrop"
          :label="col.label"
          :key="`col_${index}`"
          :prop="dropRightTableCols[index].prop"
          :width="dropRightTableCols[index].width || null"
          :hidden="dropRightTableCols[index].hidden"
          :align="dropRightTableCols[index].align"
        >
          <template slot-scope="{row}">
            <span v-if="dropRightTableCols[index].isComponent === true && dropRightTableCols[index].comps">
              <component
                v-for="comp in dropRightTableCols[index].comps"
                :key="comp.compKey"
                :codeField="comp.codeField"
                :textField="comp.textField"
                :popupsKey="comp.compKey"
                :isShow="row[comp.compareField]===comp.compareValue"
                :is="comp.component"
                :code="row[comp.codeField]"
                :text="row[comp.textField]"
                @changeCode="getRightRowComponentCode"
                @clickEvent="comp.clickEvent"
                :comType="row.index+''"
                :isMul="comp.isMul"
                :span="dropRightTableCols[index].span || 24"
                :isShowLabel="comp.isShowLabel"
                :labelName="comp.labelName"
                :lookuptype="comp.lookuptype"
                :format="comp.format"
                :dateType="comp.dateType"
                :dateOptionsType="comp.dateOptionsType"
                :clearable="comp.clearable"
                :filterable="comp.filterable"
                :options="comp.options"
              ></component>
            </span>
            <span v-else-if="!dropRightTableCols[index].isComponent && dropRightTableCols[index].prop === 'isEnable'">{{(row[dropRightTableCols[index].prop] === '1') ? '是' : '否' }}</span>
            <span v-else-if="!dropRightTableCols[index].isComponent && dropRightTableCols[index].prop === 'isEnable'">{{(row[dropRightTableCols[index].prop] === '1') ? '是' : '否' }}</span>
            <span v-else-if="!dropRightTableCols[index].isComponent && dropRightTableCols[index].isDefalus === true">{{(row[dropRightTableCols[index].prop] === '1') ? '是' : '否' }}</span>

            <span v-else>{{ row[dropRightTableCols[index].prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        v-if="isShowRightPagination"
        @size-change="rightHandleSizeChange"
        @current-change="rightHandleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, sizes, ->, total"
        ref="rightTable.pageArea"
        :total="rightpageTotal"
        :current-page.sync="rightListQuery.pageIndex"
        :pager-count="5"
      ></el-pagination>
    </el-main>
  </div>
</template>
<script>
import { twoTableTemplateMixins } from "@/components/mixins/twoTableTemplateMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import mixButton from "@/components/basicComponent/mixButton";
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [twoTableTemplateMixins, valueObjectMixins],
  components: {
    mixButton
  },
  props:{
  },
  data() {
    return {
    }
  },
};
</script>




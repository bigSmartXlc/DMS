<!--
* description: 树网格
* author: meijq
* createdDate: 2019-08-13
* logs:
-->
<template>
  <section id="TreeTable">
    <el-aside class="el-slide">
      <el-tree
        ref="tree"
        :key="treeKey"
        class="filter-tree"
        :data="orgList"
        :empty-text="emptyText"
        node-key="orgTreeId"
        :props="defaultProps"
        highlight-current
        @node-click="handleNodeClicks"
      />
    </el-aside>
    <el-main ref="mainHeight">
      <div>
        <!-- <div class="filter-container filter-button" ref="searcheHeight">
          <el-button
            v-for="comp in tableButtons"
            :key="comp.compKey"
            :type="comp.type"
            @click="comp.clickEvent"
          >{{comp.text}}</el-button>
        </div>-->
        <!-- <div
          class="filter-container filter-title"
          ref="conTitleHeight"
        >{{$t('sys.content.gridTitle')}}</div>-->
        <!-- 查询条件 -->
        <div
          v-if="tableComponents.length > 0"
          id="searchFormGroup"
          ref="conHeight"
          class="filter-container filter-params"
        >
          <el-row ref="mustCompHeight" :gutter="24">
            <el-col :span="24" class="table-col">
              <component
                :is="comp.component"
                v-for="comp in tableComponents.filter(o => o.isMust === true)"
                :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
                :key="comp.compKey"
                :code-field="comp.codeField"
                :text-field="comp.textField"
                :popups-key="comp.compKey"
                :v-show="comp.isShow"
                :is-show="comp.isShow || true"
                :code="formField[comp.codeField]"
                :text="formField[comp.textField]"
                :span="comp.span || 6"
                :is-mul="comp.isMul"
                :is-require="comp.isRequire"
                :label-name="comp.labelName"
                :lookuptype="comp.lookuptype"
                :date-options-type="comp.dateOptionsType"
                :format="comp.format"
                :date-type="comp.dateType"
                :options="comp.options"
                :value-object="curValueObject"
                :clearable="comp.clearable"
                :filterable="comp.filterable"
                :parent-fileds="comp.parentFileds || ''"
                :return-code-field="comp.returnCodeField"
                :return-text-field="comp.returnTextField"
                :validrule="comp.validrule"
                @changeCode="getComponentCode"
                @focusCode="getFocusCode"
              />
            </el-col>
          </el-row>
          <el-row :gutter="24" class="butClass">
            <el-col v-show="toggleParam" :span="24" class="toggleParam">
              <el-row>
                <component
                  :is="comp.component"
                  v-for="comp in tableComponents.filter(o => o.isMust === false)"
                  :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
                  :key="comp.compKey"
                  :code-field="comp.codeField"
                  :text-field="comp.textField"
                  :popups-key="comp.compKey"
                  :is-show="comp.isShow || true"
                  :code="formField[comp.codeField]"
                  :text="formField[comp.textField]"
                  :span="comp.span || 6"
                  :is-mul="comp.isMul"
                  :is-require="comp.isRequire"
                  :label-name="comp.labelName"
                  :lookuptype="comp.lookuptype"
                  :date-options-type="comp.dateOptionsType"
                  :format="comp.format"
                  :date-type="comp.dateType"
                  :value-object="curValueObject"
                  :clearable="comp.clearable"
                  :filterable="comp.filterable"
                  :parent-fileds="comp.parentFileds || ''"
                  :return-code-field="comp.returnCodeField"
                  :return-text-field="comp.returnTextField"
                  :validrule="comp.validrule"
                  @changeCode="getComponentCode"
                  @focusCode="getFocusCode"
                />
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="butClass">
            <el-col :span="24" class="table-col">
              <mix-button
                v-if="bounce"
                name="searchBtns"
                :sv-fields="svFields"
                :dynamic-buttons="tableButtons"
                :dynamic-components="tableComponents"
                :form-field="formField"
                @toggle="changeToggleParam"
              />
            </el-col>
          </el-row>
        </div>
        <!-- <div
          class="filter-container filter-title"
          ref="resultTitleHeight"
        >{{$t('sys.content.gridTitle')}}</div>-->
        <!-- 查询结果 -->
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          :element-loading-text="$store.state.app.loadingText"
          border
          stripe
          :height="tableHeight"
          highlight-current-row
          @current-change="handleTableRowChange"
        >
          <el-table-column
            v-if="isShowSelect"
            type="selection"
            :fixed="!isRowDrop"
            width="55"
            :label="$t('sys.content.gridChoose')+'+'"
            filed="chose"
            current-row-key="choose"
          />
          <!-- 选择 -->
          <el-table-column
            align="center"
            :fixed="!isRowDrop"
            :label="$t('sys.content.gridIndex')"
            width="60"
            type="index"
          >
            <template slot-scope="{row}">
              <span>{{ (listIndex.pageIndex - 1) * listIndex.pageSize + row.index + 1 }}</span>
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
            :show-overflow-tooltip="true"
            :hidden="dropTableCols[index].hidden"
            :align="dropTableCols[index].align"
          >
            <template slot-scope="{row}">
              <span v-if="dropTableCols[index].isComponent === true && dropTableCols[index].comps">
                <component
                  :is="comp.component"
                  v-for="comp in dropTableCols[index].comps"
                  :key="comp.compKey"
                  :code-field="comp.codeField"
                  :text-field="comp.textField"
                  :popups-key="comp.compKey"
                  :is-show="row[comp.compareField]===comp.compareValue"
                  :code="row[comp.codeField]"
                  :text="row[comp.textField]"
                  :span="dropTableCols[index].span || 24"
                  :com-type="row.index+''"
                  :is-mul="comp.isMul"
                  :is-show-label="comp.isShowLabel"
                  :label-name="comp.labelName"
                  :lookuptype="comp.lookuptype"
                  :format="comp.format"
                  :date-type="comp.dateType"
                  :date-options-type="comp.dateOptionsType"
                  :clearable="comp.clearable"
                  :filterable="comp.filterable"
                  :parent-fileds="comp.parentFileds || ''"
                  :return-code-field="comp.returnCodeField"
                  :return-text-field="comp.returnTextField"
                  :is-col-comp="true"
                  :options="comp.options"
                  @changeCode="getRowComponentCode"
                  @clickEvent="comp.clickEvent"
                />
              </span>
              <span
                v-else-if="!dropTableCols[index].isComponent && dropTableCols[index].prop === 'isEnable'"
              >{{ (row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>
              <span
                v-else-if="!dropTableCols[index].isComponent && dropTableCols[index].isDefalus === true"
              >{{ (row[dropTableCols[index].prop] === '1') ? '是' : '否' }}</span>

              <span v-else>{{ row[dropTableCols[index].prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="isShowPagination && tableCols.length > 0"
          ref="paginationHeight"
          background
          :page-sizes="pageSizeArray"
          :page-size="dynamicPageSize"
          :prev-text="$t('sys.content.prevPage')"
          :next-text="$t('sys.content.nextPage')"
          layout="prev, pager, next, sizes, ->, total"
          :total="pageTotal"
          :current-page.sync="listQuery.pageIndex"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <component
          :is="comp.popups.component"
          v-for="comp in tableComponents.filter(o => o.type === 'popupsInput')"
          :key="comp.popups.key"
          :code-field="comp.codeField"
          :popups-visible="comp.popups.state"
          :com-type="comp.popups.type"
          :popups-key="comp.compKey"
          :code="formField[comp.codeField]"
          :value-object="curValueObject"
          @changeCode="getComponentCode"
        />
      </div>
    </el-main>
  </section>
</template>
<script>
import { treeTableTemplateMixins } from '@/components/mixins/treeTableTemplateMixins'
import { valueObjectMixins } from '@/components/mixins/valueObjectMixins'
import mixButton from '@/components/basicComponent/mixButton'
export default {
  components: {
    mixButton
  },
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [treeTableTemplateMixins, valueObjectMixins]
  // methods: {
  //   setTableHeight(isResize) {
  //     this.$nextTick(() => {
  //       this.tableHeight = this.$utils.setTableHeight(
  //         this,
  //         isResize,
  //         this.tableHeight
  //       );
  //     });
  //   }
  // },
  // mounted() {
  //   window.addEventListener("resize", () => {
  //     this.setTableHeight(true);
  //   });
  // }
}
</script>

<style lang="scss" scoped>
// /deep/ .el-slide {
//   max-height: 535px;
//   overflow-y: auto;
// }
</style>


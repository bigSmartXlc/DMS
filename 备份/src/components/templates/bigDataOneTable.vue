<!--
* description: 大数据展示模板-单网格
* author: luojx
* createdDate: 2020-03-21
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
            :is-mul="comp.isMul"
            :is-require="comp.isRequire"
            :span="comp.span || 6"
            :is-func="comp.isFunc"
            :is-show-comp="comp.isShowComp"
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
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            @clickEvent="receiveEvent(comp.clickEvent)"
          />
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
            :is-mul="comp.isMul"
            :disabled="comp.disabled"
            :is-require="comp.isRequire"
            :span="comp.span || 6"
            :label-name="comp.labelName"
            :lookuptype="comp.lookuptype"
            :input-type="comp.inputType"
            :date-options-type="comp.dateOptionsType"
            :format="comp.format"
            :date-type="comp.dateType"
            :is-show-comp="comp.isShowComp"
            :value-object="curValueObject"
            :clearable="comp.clearable"
            :filterable="comp.filterable"
            :parent-fileds="comp.parentFileds || ''"
            :must-fields="comp.mustFields || ''"
            :return-code-field="comp.returnCodeField"
            :return-text-field="comp.returnTextField"
            :other-field="comp.otherField"
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
        v-if="tableButtons.length > 0"
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
            :dynamic-buttons="tableButtons"
            :dynamic-components="tableComponents"
            :form-field="formField"
            :is-show-more="isShowMoreBtn"
            :dynamic-toggle-param="dynamicToggleParam"
            @toggle="changeToggleParam"
          />
          <mix-button
            v-if="tableButtons.length !== 0 && isPopups"
            name="searchBtns"
            :sv-fields="svFields"
            :dynamic-buttons="(tableButtons.filter(o => o.position === 'right').length !== 0 ) ? tableButtons.filter(o => o.position === 'right') : tableButtons"
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
    <div
      v-if="title !==''"
      class="filter-container filter-title"
    >{{ title }}</div>
    <div v-if="!isIE" class="el-table el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small" :style="'height: '+tableHeight+'px;'">
      <div class="hidden-columns">
        <div filed="chose" current-row-key="choose" />
        <div />
        <div v-for="(col, index) in tableCols.filter(o => o.hidden !== true)" :key="`col_${index}`" />
      </div>
      <div v-loading="listLoading" class="el-table__header-wrapper">
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" :style="'width: '+tableWidth+'px;'">
            <colgroup>
              <col name="el-table_15_column_9998" width="35">
              <col name="el-table_15_column_9999" width="40">
              <col v-for="(col, index) in tableCols.filter(o => o.hidden !== true)" :key="`col_${index}`" :name="'el-table_15_column_' + index" :width="col.width && col.width > 0 ? col.width : 'auto'">
            </colgroup>
            <thead class="has-gutter">
              <tr class="">
                <th v-if="dynamicIsShowSelect" class="el-table_15_column_108   el-table-column--selection  is-leaf" width="35">
                  <!-- <div class="cell">
                    <label class="el-checkbox">
                      <span class="el-checkbox__input">
                        <span class="el-checkbox__inner"></span>
                        <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                      </span>
                    </label>
                  </div> -->
                  <input type="checkbox" aria-hidden="false" :class="'big-data-checkall' + tableClass" value="" @click="checkAll">
                </th>
                <th class="el-table_15_column_109  is-center   is-leaf" width="40">
                  <div class="cell">序号</div>
                </th>
                <th
                  v-for="(col, index) in tableCols.filter(o => o.hidden !== true)"
                  :key="`col_${index}`"
                  :width="col.width && col.width > 0 ? col.width : 'auto'"
                  class="el-table_15_column_110  is-center   is-leaf"
                >
                  <div class="cell">{{ col.label }}</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="el-table__body-wrapper is-scrolling-none" :style="'height: ' +(tableHeight - 32)+ 'px;'">
          <table cellspacing="0" cellpadding="0" border="0" :class="'el-table__body big-data-table' + tableClass" :style="'width: '+tableWidth+'px;text-align:center'">
            <colgroup>
              <col name="el-table_15_column_9998" width="35">
              <col name="el-table_15_column_9999" width="40">
              <col v-for="(col, index) in tableCols.filter(o => o.hidden !== true)" :key="`col_${index}`" :name="'el-table_15_column_' + index" :width="col.width && col.width > 0 ? col.width : 'auto'">
            </colgroup>
            <tbody style="text-align:center">
              <tr v-for="(item, index) in list" :key="item.carConfigCode">
                <td v-if="dynamicIsShowSelect" :class="index % 2 === 0 ? 'custom_bg' : ''" width="35">
                  <!-- <div class="cell">
                    <label class="el-checkbox">
                      <span class="el-checkbox__input">
                        <span class="el-checkbox__inner"></span>
                        <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                      </span>
                    </label>
                  </div> -->
                  <input type="checkbox" :value="index" aria-hidden="false">
                </td>
                <td :class="index % 2 === 0 ? 'custom_bg' : ''" width="40" style="text-align:center">{{ index + 1 }}</td>
                <td
                  v-for="(col, index1) in tableCols.filter(o => o.hidden !== true)"
                  :key="`col_${index1}`"
                  style="text-align:center;line-height: inherit"
                  :width="col.width && col.width > 0 ? col.width : 'auto'"
                  :class="index % 2 === 0 ? 'custom_bg' : ''"
                >{{ item[col.prop] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="el-table__column-resize-proxy" style="display: none;" />
      </div>
    </div>

    <div v-if="isIE" :style="'height: '+tableHeight+'px;overflow-y:scroll;overflow-x:hidden'">
      <table v-loading="listLoading" cellspacing="0" cellpadding="0" border="0" :class="'el-bigtable-header'" :style="'width: '+tableWidth+'px;'">
        <thead class="has-gutter">
          <tr class="">
            <th v-if="dynamicIsShowSelect" width="55" style="text-align:center">
              <input type="checkbox" aria-hidden="false" :class="'big-data-checkall' + tableClass" value="" @click="checkAll">
            </th>
            <th width="60" style="text-align:center">序号</th>
            <th
              v-for="(col, index) in tableCols.filter(o => o.hidden !== true)"
              :key="`col_${index}`"
              style="text-align:center"
              :width="col.width && col.width > 0 ? col.width : 'auto'"
            >{{ col.label }}</th>
          </tr>
        </thead>
      </table>
      <div style="overflow-y:hide;overflow-x:hidden;" :style="'height: '+tableHeight-20+'px;'">
        <table cellspacing="0" cellpadding="0" border="0" :class="'el-bigtable big-data-table' + tableClass" :style="'width: '+(tableWidth-20)+'px;'">
          <tbody>
            <tr v-for="(item, index) in list" :key="item.carConfigCode">
              <td v-if="dynamicIsShowSelect" width="55" style="text-align:center">
                <input type="checkbox" :value="index" aria-hidden="false">
              </td>
              <td width="60" style="text-align:center">{{ index + 1 }}</td>
              <td
                v-for="(col, index1) in tableCols.filter(o => o.hidden !== true)"
                :key="`col_${index1}`"
                style="text-align:center;line-height: inherit"
                :width="col.width && col.width > 0 ? col.width : 'auto'"
              >{{ item[col.prop] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
    tableClass: '',
    tableWidth: { type: Number, default: 997 }, // 是否显示查询按钮模块；title
    title: { type: String, default: '' }, // 是否显示查询按钮模块；title
    ieWidth: { type: Number, default: 997 }, // 是否显示查询按钮模块；title
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
  watch: {
    listLoading(newVal, oldVal) {
      if (newVal === true) {
        this.$store.dispatch('app/loading', 'lock')
      } else {
        this.$store.state.app.loading.close()
      }
    }
  },

  methods: {
    // 获取复选框值
    getCheckedValue() {
      const that = this
      const selectData = []
      const els = document.querySelectorAll('.big-data-table' + this.tableClass + ' input[type="checkbox"]:checked')
      if (els && els.length > 0) {
        els.forEach((item, index) => {
          if (/^\d+$/.test(item.value)) {
            selectData.push(that.list[parseInt(item.value)])
          }
        })
      }
      return selectData
    },
    // 全选
    checkAll() {
      const chk = document.querySelectorAll('.big-data-checkall' + this.tableClass)
      let els = []
      if (chk && chk.length > 0) {
        els = document.querySelectorAll('.big-data-table' + this.tableClass + ' input[type="checkbox"]')
      }
      if (els.length > 0) {
        els.forEach((item, index) => {
          item.checked = chk[0].checked
        })
      }
    },
    clearCheck() {
      let els = []
      const chk = document.querySelectorAll('.big-data-checkall' + this.tableClass)
      els = document.querySelectorAll('.big-data-table' + this.tableClass + ' input[type="checkbox"]')
      chk[0].checked = false
      if (els.length > 0) {
        els.forEach((item, index) => {
          item.checked = false
        })
      }
    }
  }
}
</script>
<style scoped>
.el-table__body-wrapper tr{
  height: 35px;
}
.el-table__body-wrapper td.custom_bg{
  background-color: #fff !important;
}
.el-bigtable tr,.el-bigtable-header tr{
  height: 35px;
}
.el-bigtable-header tr{
  background-color: #E3E3E3 !important;
}
.el-bigtable tr td,.el-bigtable-header tr th{
  border-bottom: 1px solid #efefef;
  font-size: 12px;
}
</style>

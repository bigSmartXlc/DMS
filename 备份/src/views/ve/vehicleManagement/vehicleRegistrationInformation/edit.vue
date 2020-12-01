<!--
* description: 品牌管理-新增、修改弹窗
* author: luojx
* createdDate: 2019-08-04
-->
<template>
  <section class="editCarBrand">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      :key="popupsTableKey"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <!-- <div class="filter-container filter-params">
        <el-row :gutter="26" ref="vailComponentList">
          <component
            v-for="comp in tableComponents.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :validrule="comp.validrule"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isMul="comp.isMul"
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateOptionsType="comp.dateOptionsType"
            :dataToObject="comp.dataToObject"
          ></component>
        </el-row>
      </div> -->
      <one-table-template
        ref="multipleTable"
        :dynamic-api-config="ApiConfig"
        :dynamic-components="tableComponents"
        :dynamic-table-cols="dynamicTableCols"
        :dynamic-form-fields="formField"
        :dynamicTableDefultHeight="300"
        :dynamic-is-show-more-btn="true"
        :dynamic-is-show-select="false"
        :isShowPagination="false"
        :dynamic-api-style="apiStyle"
        :dynamicPageSize="15"
        :refresh-table-key="refreshTableKey"
        :callback-obj="callbackObj"
        @hiddenColData="hiddenColData"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          :icon="comp.icon"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
export default {
  components: {
    dialogHeader: () => import("@/components/dialogHeader"), //弹窗标题
    OneTableTemplate,
  },
  // 组件混入对象
  mixins: [formMixins, oneTableWithViewTemplateMixins],
  props: {
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: "" },
    comType: { type: String, default: "" },
    codeField: { type: String, default: "" },
    popupsKey: { type: String, default: "" },
    isMul: { type: Boolean, default: true },
    validrule: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    // 弹窗页面标识（由引用页面赋值）
    const viewPageCode = "orgBrandManageEdit";
    return {
      table: null,
      curSelected: null,
      selectData: {},
      clickRowsData: {},
      ApiConfig: {
        APIUrl: "ve/config/cartype",
      },
      apiStyle: "restful",
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-confirm",
          clickEvent: () => this.save(),
          text: "添加", 
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.sendCode(),
          text: "取消"
        },
      ],
      // 动态组件-查询条件
      tableComponents: [
        //VIN
        {
          compKey: "compKey1",
          labelName: "VIN:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //配置编码
        {
          compKey: "compKey2",
          labelName: "配置编码:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //车系
        {
          compKey: "compKey3",
          labelName: "车系:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //车型
        {
          compKey: "compKey4",
          labelName: "车型:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //车身颜色
        {
          compKey: "compKey5",
          labelName: "车身颜色:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //内饰颜色
        {
          compKey: "compKey6",
          labelName: "内饰颜色:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //质量状态
        {
          compKey: "compKey7",
          labelName: "质量状态:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //电池编号
        {
          compKey: "compKey8",
          labelName: "电池编号:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //电动机码
        {
          compKey: "compKey9",
          labelName: "电动机码:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //合格证号
        {
          compKey: "compKey10",
          labelName: "合格证号:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //车牌号
        {
          compKey: "compKey11",
          labelName: "车牌号:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //下线日期
        {
          compKey: "compKey12",
          labelName: "下线日期:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
        //客户名称
        {
          compKey: "compKey13",
          labelName: "客户名称:",
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50,
          },
        },
      ],
      dynamicTableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              {
                prop: "carSeriesCode",
                label: "异动日期",
              },
              {
                prop: "carSeriesName",
                label: "异动类型",
              },
              {
                prop: "vehicleCode",
                label: "异动节点",
                isFlag: true,
              },
              {
                prop: "vehicleName",
                label: "异动记录",
              },
              {
                prop: "vehicleConfigCode",
                label: "操作人员",
              },
            ],
      callbackObj: {
        // 当选择项发生变化时会触发该事件（多选时）
        onCheckSelectChange: (selection) => {
          console.log(this.$refs.multipleTable.$parent.$parent)
          this.handleOneSelect(selection);
          this.handleSelectionChange(selection);
        },
        // onCheckSelectAll(selection){
        //   console.log(selection)
        // },
        // onCheckSelect(selection, row){
        //
        // }
      },

      // 标题
      textMap: {
        edit: "车籍查询明细",
        add: this.$t("org.label.carBrandEditTextMap.add"),
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(
        this,
        {
          carBrandCode: "",
          carBrandCn: "",
          carBrandEn: "",
          isEnable: "",
          updateControlId: "",
          uid: "",
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode],
        null,
        "formComponents"
      ),
    };
  },
  methods: {
    // 获取数据
    sendCode() {
      if (this.selectData.hasOwnProperty("index")) {
        this.$parent.modelText = this.selectData.vehicleConfigName;
        this.$parent.modelCode = this.selectData.vehicleConfigCode;
        this.$emit("update:popupsVisible", false);
        this.table.toggleRowSelection(this.curSelected, false);
      } else {
        this.$message("还没有选择！");
      }
    },

    // 设置表格选择框 是否禁用
    // getSelectable(row, index) {
    // },

    // 设置表格单选
    handleOneSelect(selection) {
      if (selection.length === 0) {
        this.selectData = {};
        return;
      }
      let lastIndex = selection.length - 1;
      this.table = this.$refs.multipleTable.$children[2];
      this.selectData = selection[lastIndex];
      selection.forEach((sel, idx) => {
        lastIndex !== idx
          ? this.table.toggleRowSelection(sel, false)
          : (this.curSelected = sel);
      });
    },
    handleSelectionChange(selection) {
      const btns = this.dynamicButtons.filter((o) => o.disabled !== undefined);
      if (btns.length > 0) {
        const isCheck = selection && selection.length > 0;
        btns.forEach((item) => {
          item.disabled = !isCheck;
        });
      }
    },
    handleClose() {
      let message;
      this.selectData.hasOwnProperty("index")
        ? (message = "确认关闭？")
        : (message = "还未选择车型配置，确认关闭？");
      this.$confirm(`${message}`)
        .then((_) => {
          this.$emit("update:popupsVisible", false);
          this.table.toggleRowSelection(this.curSelected, false);
          done();
        })
        .catch((_) => {});
    },
    hiddenColData(data) {
      if (data && data.length > 0) {
        this.refreshTableKey += 1;
        this.dynamicTableCols = data;
      }
    },
  },
};
</script>

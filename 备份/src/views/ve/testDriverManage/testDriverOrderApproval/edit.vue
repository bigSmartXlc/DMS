<!--
* description: 试驾车订单明细
* author: wangmaolin
* createdDate: 2020-11-24
* logs:
-->
<template>
<section class="testDriver">
  <el-dialog v-dialogDrag
             :close-on-click-modal="true"
             :title="textMap[popupsState]"
             :append-to-body="true"
             :visible.sync="curPopupsVisible"
             @close="closePopups"
             width="900px"
  >
    <dialogHeader
      slot="title"
      :title="textMap[popupsState]"
      :styleType="$store.state.app.dialogType"
    ></dialogHeader>
    <div class="filter-container filter-params">
      <h3 :style="styleObj">内部用车信息</h3>
      <el-row :gutter="26" ref="vailComponentList1">
        <component
          v-for="comp in tableComponents1.filter(o => o.isMust === true)"
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
          :span="comp.span || 24"
          :labelName="comp.labelName"
          :lookuptype="comp.lookuptype"
          :dateOptionsType="comp.dateOptionsType"
        ></component>
      </el-row>
    </div>
    <div class="filter-container filter-params">
      <h3 :style="styleObj">开票信息</h3>
      <el-row :gutter="26" ref="vailComponentList2">
        <component
          v-for="comp in tableComponents2.filter(o => o.isMust === true)"
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
          :span="comp.span || 24"
          :labelName="comp.labelName"
          :lookuptype="comp.lookuptype"
          :dateOptionsType="comp.dateOptionsType"
        ></component>
      </el-row>
    </div>

    <div class="filter-container filter-params">
      <h3 :style="styleObj">
        车辆信息
      </h3>
      <el-row :gutter="26" ref="vailComponentList4">
        <el-table
          :data="orderList"
          border
          style="width: 100%"
        max-height="300">
          <el-table-column
            prop="index"
            label="序号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="auditOpinion"
            label="审核意见"
            align="center">
          </el-table-column>
          <el-table-column
            prop="vehicleConfigCode"
            label="车型配置编码"
            align="center" >
          </el-table-column>
          <el-table-column
            prop="vehicleConfigName"
            label="车型配置名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="vehiclePrice"
            label="车型价格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="deliveryCenter"
            label="体验中心"
            align="center">
          </el-table-column>
          <el-table-column
            prop="insideCarType"
            label="内部用车类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="carCount"
            label="数量"
            align="center">
          </el-table-column>
        </el-table>
      </el-row>

    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-for="comp in tableButtons"
        :key="comp.compKey"
        :type="comp.type"
        @click="comp.clickEvent"
      >{{comp.text}}</el-button>
    </div>
  </el-dialog>
</section>
</template>
<script>
  import { formMixins } from "@/components/mixins/formMixins";
  export default {
    name: 'tD_orderApproval_edit',
    // 组件混入对象
    mixins: [formMixins],
    components: {
      dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
    },
    data() {
      return {
        // h3标题行内样式
        styleObj: {borderLeft: null},
        // 订单列表
        orderList:[],
        //
        genCodeFiled: (array)=>(attr)=>array.reduce((p,c)=>{p[c[attr]]="";return p},{}),
        // 保存API配置对象
        apiConfig: this.dynamicApiConfig,
        // 动态组件-按钮
        tableButtons: [
          {
            compKey: "btnKey1",
            type: "primary",
            size: "small",
            clickEvent: () => this.save(),
            text: this.$t("sys.button.save")
          }, // '保存'
          {
            compKey: "btnKey2",
            type: "",
            size: "small",
            clickEvent: () => this.reset(),
            text: this.$t("sys.button.reset")
          } //重置
        ],
        // 动态组件-查询条件
        tableComponents:[],
        tableComponents1:
          [
            {
              compKey: 'compKey2',
              labelName: '内部用车单号',
              codeField: 'insideCarCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey1',
              labelName: 'OA单号',
              codeField: 'oaCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey3',
              labelName: '上牌省份',
              codeField: 'registerProvinces',
              textField: 'registerProvincesText',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isRequire:true,
              isMust: true,
              span: 8
            },
            {
              compKey: 'compKey4',
              labelName: '上牌城市',
              codeField: 'registerCity',
              textField: 'registerCityText',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey5',
              labelName: '交付城市',
              codeField: 'deliveryCity',
              textField: 'deliveryCityText',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey6',
              labelName: '交付中心',
              codeField: 'deliveryCenter',
              textField: 'deliveryCenterText',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey7',
              labelName: '开票城市',
              codeField: 'billCity',
              textField: 'billCityText',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey8',
              labelName: '备注',
              codeField: 'remark',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 16
            },
          ],
        tableComponents2:
          [
            {
              compKey: 'compKey9',
              labelName: '客户类型',
              codeField: 'clientType',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey10',
              labelName: '企业名称',
              codeField: 'companyName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey11',
              labelName: '联系电话',
              codeField: 'phoneNumber',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              validrule:{isPhone:true},
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey12',
              labelName: '证件类型',
              codeField: 'certificateType',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isMust: true,
              isRequire:true,
              span: 8
            },
            {
              compKey: 'compKey13',
              labelName: '社会信用代码',
              codeField: 'socialCreditCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              isRequire:true,
              span: 8
            },

          ],

        // 表单数据（无需赋值，由混入对象赋值）
        formField:{},
        initFormField:null
      };
    },
    created() {
      this.tableComponents = [...this.tableComponents1, ...this.tableComponents2]
      this.genCodeFiled = this.genUtil(this.tableComponents)
      this.formField = this.genCodeFiled('codeField');
    },
    mounted() {
      this.setColor();
    },
    methods: {

      setColor(){
        let systemColor = JSON.parse(localStorage.getItem('chickColor','black'));
        systemColor === "silvery" ? systemColor= "#FEA91D": '';
        this.styleObj.borderLeft = `5px solid ${systemColor}`;
      },
      genUtil:(array)=>(attr)=>array.reduce((p,c)=>{p[c[attr]]="";return p},{}),
      closePopups(){
        this.formField = this.genCodeFiled('codeField')
      },
      reset(){
        this.formField = this.genCodeFiled('codeField')
      },
      save(saveObj, cb) {
        // validpopup  弹窗  validpage 页面
        // console.log(this.$refs)
        this.$utils.validataMoth(this, 'validpopup')
        if (this.valid) {
          if(this.popupsState === 'edit'){
            this.dynamicApiConfig.APIUrl = 've/testdriver/order/edit'
            this.apiConfig.APIUrl = 've/testdriver/order/edit'
          }else{
            this.dynamicApiConfig.APIUrl = 've/testdriver/order/add'
            this.apiConfig.APIUrl = 've/testdriver/order/add'
          }
          this.saveForm(saveObj, cb)
        } else {
          if (typeof cb === 'function') {
            cb.call(0)
          }
        }
      },
    },
    watch: {
      curPopupsVisible(val){
        val ? this.setColor():''
        this.$emit('update:popupsVisible',val)
      },

    }
  };
</script>
<style scoped>

  h3 {
    padding-left: 10px;
    text-align: left;
    font-weight: 600;
  }
  h3 button.el-button {
    float: right;
    margin-right: 10px;
  }

  div.filter-container {
    margin-bottom: 35px;
  }

</style>

<template>
  <div class="app-container app-container-table">
    <div id="pagination" class="filter-container filter-params">
      <el-row :gutter="20">
        <template v-for="(item, i) in fileAndBtn">
          <el-col :span="8">
            <template>
              <div v-if="item.show">
                <span style="float:left;margin-left: 10px">{{ item.label1 }}</span>
                <el-radio-group v-model="item.status" @change="item.change(item,i)">
                  <template v-for="(col,x) in item.radios">
                    <el-radio :label="col.radio">{{ col.name }}</el-radio>
                  </template></el-radio-group>
              </div>
            </template>
          </el-col>

          <el-col :span="6">
            <template>
              <label>{{ item.label2 }}</label>
              <el-input v-if="item.type ==='input'" v-model="item.vin" style="float:right" :disabled="item.disabled||false" />
              <el-input v-else-if="item.type ==='numinput'" v-model="item.column1" style="float:right" :disabled="item.disabled||false" />
              <el-input v-else-if="item.type ==='codeinput'" v-model="item.billCode" style="float:right" :disabled="item.disabled||false" />
            </template>
          </el-col>

          <el-col :span="10" class="u-btn-right">
            <div class="right-btn">
              <el-button
                class="iconfont icon-importTemplate"
                style="margin-left: 10px"
                @click="item.clickEvent(item)"
              >
                {{ item.text }}
              </el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
import { orgApis } from '@/api/apiList/org'
import { getParams } from '@/utils/getParamter'
export default {
  data() {
    return {
      fileAndBtn: [
        { vin: '', column1: '', status: 'JK037', code: 'PLVM06', billCode: '', show: true, type: 'numinput', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: 'PLS计划', label1: '类型', label2: '车型配置编码', radios: [
          { radio: 'JK037', name: '燃油' },
          { radio: 'JK039', name: '新能源' }
        ] },
        { vin: '', column1: '', status: '', code: 'JK006', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '下线入库', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: 'S', code: 'JK002', billCode: '', show: true, type: 'codeinput', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '采购单确认反馈', label1: '类型', label2: '单据编号', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '', status: 'S', code: 'JK112', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '在线SAP反馈', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '', status: 'S', code: 'JK002', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '在库SAP反馈', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '1', status: 'S', code: 'JK012', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '发车申请SAP反馈(普通)', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '2', status: 'S', code: 'JK012', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '发车申请SAP反馈(换号)', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '', status: '', code: 'JKOO6', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: 'SAP车辆出库', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: '', code: 'JKOO6', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '车辆报废', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: 'S', code: 'JK002', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '配车解除SAP反馈', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '', status: '', code: 'JK504', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '换号发车申请', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: 'S', code: 'JK508', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '移库申请反馈', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '', status: 'S', code: 'JK502', billCode: '', show: true, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '移库出库', label1: '类型', label2: 'vin', radios: [
          { radio: 'S', name: '成功' },
          { radio: 'E', name: '失败' }
        ] },
        { vin: '', column1: '', status: '', code: 'JK503', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '移库入库', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: '', code: 'JK009', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '销退信息回答', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: '', code: 'JK006', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '销退入库', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: '', code: 'JK504', billCode: '', show: false, type: 'input', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: 'SAP退车', label1: '类型', label2: 'vin' },
        { vin: '', column1: '', status: '1', code: 'JK019', billCode: '', show: true, type: 'codeinput', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '备件采购订单反馈', label1: '类型', label2: '单据编号', radios: [
          { radio: '1', name: '正确' },
          { radio: '2', name: '错误' },
          { radio: '3', name: '订单已存在' }
        ] },
        { vin: '', column1: '', status: '1', code: 'JK023', billCode: '', show: true, type: 'codeinput', disabled: false, change: this.changeRadio, clickEvent: this.clickEvent, text: '备件索赔申请反馈', label1: '类型', label2: '单据编号', radios: [
          { radio: '1', name: '同意' },
          { radio: '2', name: '拒绝' }
        ] }
      ]
    }
  },
  methods: {
    changeRadio(val, i) {
      this.val
    },
    clickEvent(val) {
      var obj = {
        funName: val.text,
        vin: val.vin,
        column1: val.column1,
        status: val.status,
        code: val.code,
        billCode: val.billCode
      }

      this.save(obj)
    },
    save(dataInfo) {
      const queryObj = {
        // 请求类型&参数 保存mutation  查询query
        type: 'mutation',
        typeParam:
          '($dataInfo: ' + orgApis.mdmIfcPullMutationSave.InputType + ')',
        // 请求API
        apiUrl: orgApis.mdmIfcPullMutationSave.APIUrl,
        // 需要调用的API服务配置
        apiServices: [
          {
            // API服务编码&参数
            apiServiceCode: orgApis.mdmIfcPullMutationSave.ServiceCode,
            apiServiceParam:
              '(dataInfo: $dataInfo)',
            // 表格中台返回网格的字段
            apiQueryRow: []
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {

          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: dataInfo
        }
      }
      var paramD = getParams(queryObj)
      this.$requestAPI(paramD).then(response => {
        const res =
          response[orgApis.mdmIfcPullMutationSave.ServiceCode] ||
          response.data[orgApis.mdmIfcPullMutationSave.ServiceCode]
        if (res.result === '1') {
          // 调用changeToOneDeepArray方法将返回的多层数据转一层数据
          this.$message.success(res.msg)
        } else {
          this.$message({
            message:
              '调用失败：' + res.msg,
            type: 'warn',
            uration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <section class="editCarBrand">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="选择组织"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      width="800px"
      @close="closeCode"
    >
      <dialogHeader slot="title" :title="'选择组织'" :style-type="$store.state.app.dialogType" />
      <div class="filter-container filter-params">
        <el-tree
          ref="tree"
          :data="menueList"
          :empty-text="emptyText"
          :props="defaultProps"
          class="filter-tree el-slide"
          :default-expand-all="false"
          node-key="orgTreeId"
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleNodeClick"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          :icon="comp.icon"
          @click="comp.clickEvent"
        >{{ comp.text }}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { orgApis } from '@/api/apiList/org'
import { formMixins } from '@/components/mixins/formMixins'

export default {
  components: {
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  // 组件混入对象
  mixins: [formMixins],
  props: {
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: '' },
    comType: { type: String, default: '' },
    codeField: { type: String, default: '' },
    otherField: { type: String, default: '' },
    textField: { type: String, default: '' },
    popupsKey: { type: String, default: '' },
    isMul: { type: Boolean, default: true }
  },
  data() {
    return {
      menueList: [],
      sendData: {},
      curPopupsVisible: this.popupsVisible,
      listQuery: {
        isEnable: '1',
        // column1: "1",
        companyid: '',
        orgBelongType: ''
      },
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey3',
          type: 'primary',
          size: 'small',
          icon: 'iconfont  icon-confirm',
          clickEvent: () => this.sendCode(),
          text: '确定'
        },
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          icon: 'iconfont  icon-cancel',
          clickEvent: () => this.closeCode(),
          text: '取消'
        }
      ]
    }
  },
  created() {
    this.listQuery.companyid = this.$store.getters.orgInfo.COMPANY_ID
    this.getlLstQuery()
    this.queryMenue()
  },
  methods: {
    parseTreeFromList(list, parentFieldId, fieldId) {
      if (!list || list.length === 0) {
        return []
      }
      var first
      var rootList = list.filter(o => o[parentFieldId] === '-1')
      if (rootList && rootList.length > 0) {
        first = rootList[0]
      } else {
        first = list[0]
      }
      var rootParentId = this.$store.getters.orgInfo.COMPANY_ID
      var roots = []
      roots = list.filter(o => o.orgTreeId === rootParentId)

      if (!roots || roots.length < 1) {
        roots = list.filter(o => o[parentFieldId] === rootParentId)
      }
      for (var i = 0; i < roots.length; i++) {
        rootParentId = roots[i][fieldId]
        roots[i].children = this.parseTreeFromListFromRoot(rootParentId, list, parentFieldId, fieldId)
      }
      return roots
    },

    getTreeListRoot(parentId, list, parentFieldId, fieldId) {
      var rootId = parentId
      var parent = list.filter(i => i[fieldId] === rootId && i[fieldId] !== i[parentFieldId])
      if (parent && parent.length > 0) {
        rootId = this.getTreeListRoot(parent[0][parentFieldId], list, parentFieldId, fieldId)
      }
      return rootId
    },

    // 列表结构转为数结构JSON
    parseTreeFromListFromRoot(parentId, list, parentFieldId, fieldId) {
      var treeRows = list.filter(o => o[parentFieldId] === parentId && o[fieldId] !== parentId)
      if (treeRows) {
        for (var i = 0; i < treeRows.length; i++) {
          treeRows[i].children = this.parseTreeFromListFromRoot(treeRows[i][fieldId], list, parentFieldId, fieldId)
        }
      }
      return treeRows
    },
    getlLstQuery() {
      const orgType = this.$store.getters.orgInfo.ORG_TYPE
      switch (orgType) {
        // 经销商
        case '1':
          this.listQuery.orgBelongType = '1,8'
          if (this.$parent.$parent.$parent.$parent.tableComponents[3].dataToObject.orgBelongType) {
            this.listQuery.orgBelongType = '8'
          }
          break
        // 超级管理员
        case null:
          this.listQuery.orgBelongType = '0,1,2,3,4,5,6,7,8'
          break
        // 厂商
        default:
          this.listQuery.orgBelongType = '0,2,3,4,5,6,7,8'
          break
      }
    },
    queryMenue(page) {
      const that = this
      that.emptyText = that.$t('sys.content.loading')
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgRelationRealQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              'orgName',
              'orgCode',
              'orgBelongType',
              'orgTreeId',
              'linkId',
              'groupCode',
              'groupId',
              'isEnable',
              'parentOrgTreeId',
              'treeType',
              'orgRealId',
              'column1'
            ]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: -1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.listQuery
        }
      }
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj)
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        that.emptyText = that.$t('sys.content.emptyData')
        if (response.result === '1' &&response.rows != '') {
          var dataList =response.rows
          // var dataList = [{"orgName":"123456","orgCode":"123214","orgBelongType":"8","orgTreeId":"364c9b63bca4457cb3622f32dd84d59a","linkId":"364c9b63bca4457cb3622f32dd84d59a","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"HUB0103","treeType":"0","orgRealId":"8472f573fc1dcc7080b3c02f2b7e72ba","column1":null},{"orgName":"东安部分部","orgCode":"HUB01112","orgBelongType":"8","orgTreeId":"bcc7aa642d404bcc84694ea0aa887f36","linkId":"bcc7aa642d404bcc84694ea0aa887f36","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"1cfdcd923bc74708a6d641b1c4d21a82","treeType":"0","orgRealId":"d85ebba758dd91bb378dc65d788b4628","column1":null},{"orgName":"东安部分部2","orgCode":"HUB01Test2","orgBelongType":"8","orgTreeId":"e2d64968d6d14fc2bd80e888ef84cdac","linkId":"e2d64968d6d14fc2bd80e888ef84cdac","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"1cfdcd923bc74708a6d641b1c4d21a82","treeType":"0","orgRealId":"2dba263b6bb7db42de6a64ffd6314617","column1":null},{"orgName":"东安部门","orgCode":"HUB01DA","orgBelongType":"8","orgTreeId":"1cfdcd923bc74708a6d641b1c4d21a82","linkId":"1cfdcd923bc74708a6d641b1c4d21a82","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"71c76c9ede48425519cd5ddb08c487b7","column1":null},{"orgName":"售后服务部","orgCode":"HUB0102","orgBelongType":"8","orgTreeId":"HUB0102","linkId":"02","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"d749881c3df8ec67319f1c9c2e0970bd","column1":"DLR_DEPT"},{"orgName":"备件部","orgCode":"HUB0104","orgBelongType":"8","orgTreeId":"HUB0104","linkId":"04","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"6911c1a6f0691801bf9d1c7a97878791","column1":"DLR_DEPT"},{"orgName":"整车销售部","orgCode":"HUB0101","orgBelongType":"8","orgTreeId":"HUB0101","linkId":"01","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"92476475a0e8c0448fab4b4cebb50439","column1":"DLR_DEPT"},{"orgName":"管理部分部","orgCode":"HUB01test1","orgBelongType":"8","orgTreeId":"ffafe706ff4c4168bc008aefb86ba015","linkId":"ffafe706ff4c4168bc008aefb86ba015","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"HUB0103","treeType":"0","orgRealId":"673ec25f84d9d591796933929a0be354","column1":null},{"orgName":"管理部分部","orgCode":"HUB01test1","orgBelongType":"8","orgTreeId":"baf8a630686c4e6fb81439235674bbb3","linkId":"baf8a630686c4e6fb81439235674bbb3","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"HUB0103","treeType":"0","orgRealId":"eda44a2e5e7f939cb2315dcdf7a607fe","column1":null},{"orgName":"综合管理部","orgCode":"HUB0103","orgBelongType":"8","orgTreeId":"HUB0103","linkId":"03","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"903a93676782229076068f60e5f52d63","column1":"DLR_DEPT"},{"orgName":"自定义部门","orgCode":"diy01","orgBelongType":"8","orgTreeId":"274acbe4e870417eacc032479b388b61","linkId":"274acbe4e870417eacc032479b388b61","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"0f2d112dde507048ed65037a5aca4644","column1":null},{"orgName":"财务部","orgCode":"HUB0105","orgBelongType":"8","orgTreeId":"HUB0105","linkId":"05","groupCode":"1","groupId":"1","isEnable":"1","parentOrgTreeId":"A3F624E6ED3D29AAE05537A3C8A81FD1","treeType":"0","orgRealId":"16f9d3afeab8d0b84b260e393aa45c4f","column1":"DLR_DEPT"}]
          // if(that.$parent.$parent.$parent.$parent.tableComponents[3].dataToObject.orgBelongType){
          //   if(that.listQuery.orgBelongType == "8"){
          //     dataList= dataList.filter( x=>x.column1===null)
          //     console.log(response.data.mdmOrgRelationRealQueryByPage.rows)
          //     console.log(dataList)
          //   }
          // }
          // var tree = this.parseTreeFromList(
          //   dataList,
          //   'parentOrgTreeId',
          //   'orgTreeId'
          // )
          var tree=dataList
          this.menueList = tree
        }
      })
    },
    close() {
      this.$emit('close', '')
    },
    handleNodeClick(data) {
      this.sendData.name = data.orgName
      this.sendData.orgCode = data.linkId
      this.sendData.dlrId = data.groupId
      this.sendData.orgTreeId = data.orgTreeId
      this.sendData.dlrCode = data.groupCode
      if (!this.sendData.dlrId) {
        this.sendData.dlrId = ''
      }
      if (!this.sendData.dlrCode) {
        this.sendData.dlrCode = ''
      }
    },
    sendCode() {
      if (JSON.stringify(this.sendData) !== '{}') {
        this.$emit(
          'changeCode',
          this.sendData.orgCode.toString(),
          this.sendData.name.toString(),
          this.sendData.dlrId.toString(),
          this.sendData.dlrCode.toString(),
          this.codeField,
          this.comType,
          this.otherField,
          this.sendData
        )
      } else {
        this.$emit('changeCode')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-slide {
  height: calc(90vh - 185px);
  overflow-y: auto;
  background: #fff;
}
</style>
         

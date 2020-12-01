export default {
    // 使用mixButton的用name赋值：例如： icon: "preservation";若没使用mixButton(网格弹窗)的用icon赋值：例如： icon: "iconfont  icon-preservation"
    iconfont: function (item) {
        switch (item.name) {
            case "add": //新增
                item.class = "iconfont icon-newlyAdded";
                break;
            case "search": //查询
                item.class = "iconfont icon-search";
                break;
            case "reset": //重置
                item.class = "iconfont icon-reset";
                break;
            case "export": //导出
                item.class = "iconfont icon-export";
                break;
            case "reject": //驳回
                item.class = "iconfont icon-reject";
                break;
            case "stock": //库存
                item.class = "iconfont icon-stock";
                break;
            case "detailed": //明细
                item.class = "iconfont icon-detailed";
                break;
            case "refuse": //拒绝
                item.class = "iconfont icon-refuse";
                break;
            case "reasonRecovery": //回复原因
                item.class = "iconfont icon-reasonRecovery";
                break;
            case "closingInventory": //结束盘点
                item.class = "iconfont icon-closingInventory";
                break;
            case "closingAdded": //盘点新增
                item.class = "iconfont  icon-closingAdded";
                break;
            case "startCounting": //开始盘点
                item.class = "iconfont icon-startCounting";
                break;
            case "printing": //打印
                item.class = "iconfont icon-printing";
                break;
            case "SMSsending": //短信发送
                item.class = "iconfont icon-SMSsending";
                break;
            case "printReceipt": //打印入库单
                item.class = "iconfont icon-printReceipt";
                break;
            case "printStockInstruction": //打印入库指导单
                item.class = "iconfont icon-printStockInstruction";
                break;
            case "cancelApplicationForm": //撤销结算申请单
                item.class = "iconfont icon-cancelApplicationForm";
                break;
            case "importVINCode": //导入VIN码
                item.class = "iconfont icon-importVINCode";
                break;
            case "reverseAudit": //反审核
                item.class = "iconfont icon-reverseAudit";
                break;
            case "cancel": //取消
                item.class = "iconfont icon-cancel";
                break;
            case "outStock": //出库
                item.class = "iconfont icon-outStock";
                break;
            case "matchingAudit": //匹配审核
                item.class = "iconfont icon-matchingAudit";
                break;
            case "inventoryModification": //盘点修改
                item.class = "iconfont  icon-inventoryModification";
                break;
            case "deleteSheet": //删除盘点单
                item.class = "iconfont icon-deleteSheet";
                break;
            case "adopt": //通过
                item.class = "iconfont icon-adopt";
                break;
            case "batchSubmit": //批量提交
                item.class = "iconfont icon-batchSubmit";
                break;
            case "warehousing": //入库
                item.class = "iconfont icon-warehousing";
                break;
            case "batchReason": //批量删除回复原因
                item.class = "iconfont icon-batchReason";
                break;
            case "exportDetails": //导出明细
                item.class = "iconfont icon-exportDetails";
                break;
            case "submissionUp": //提交
                item.class = "iconfont icon-submissionUp";
                break;
            case "newOrder": //新建订单
                item.class = "iconfont icon-newOrder";
                break;
            case "modifyCustomerProfile": //修改客户档案
                item.class = "iconfont icon-modifyCustomerProfile";
                break;
            case "returnTo": //退回
                item.class = "iconfont icon-returnTo";
                break;
            case "exportMasterTable": //导出主表
                item.class = "iconfont icon-exportMasterTable";
                break;
            case "applicationForm": //制作结算申请单
                item.class = "iconfont icon-applicationForm";
                break;
            case "financialAudit": //财务审核
                item.class = "iconfont icon-financialAudit";
                break;
            case "preservation": //保存
                item.class = "iconfont  icon-preservation";
                break;
            case "examine": //审核
                item.class = "iconfont icon-examine";
                break;
            case "synchronizeCustomerProfile": //同步客户档案
                item.class = "iconfont icon-synchronizeCustomerProfile";
                break;
            case "regenerateDocument": //重新生成单据
                item.class = "iconfont icon-regenerateDocument";
                break;
            case "importTemplateDownload": //导入模版下载
                item.class = "iconfont icon-importTemplateDownload";
                break;
            case "manHourAllocation": //工时分摊
                item.class = "iconfont icon-manHourAllocation";
                break;
            case "importRecallProject": //导入召回专案
                item.class = "iconfont icon-importRecallProject";
                break;
            case "return": //返回
                item.class = "iconfont icon-return";
                break;
            case "importTemplate": //导入模版
                item.class = "iconfont icon-importTemplate";
                break;
            case "importAppointment": //导入预约
                item.class = "iconfont icon-importAppointment";
                break;
            case "customerVehicleDetails": //客户车辆详情
                item.class = "iconfont icon-customerVehicleDetails";
                break;
            case "inventoryEntry": //盘点录入
                item.class = "iconfont icon-inventoryEntry";
                break;
            case "showBtn": //显示隐藏按钮
                item.class = "iconfont icon-showBtn";
                break;
            case "submission": //提交
                item.class = "iconfont icon-submission";
                break;
            case "saveSubmit": //保存并提交
                item.class = "iconfont icon-saveSubmit";
                break;
            case "confirm": //确认
                item.class = "iconfont  icon-confirm";
                break;
            case "maintenanceResume": //维修履历
                item.class = "iconfont icon-maintenanceResume";
                break;
            case "realImport": //实数导入
                item.class = "iconfont icon-realImport";
                break;
            case "signOut": //退出
                item.class = "iconfont icon-signOut";
                break;
            case "selectCustomers": //选择客户
                item.class = "iconfont icon-selectCustomers";
                break;
            case "temporaryStorage": //暂存
                item.class = "iconfont icon-temporaryStorage";
                break;
            case "GPS": //gps
                item.class = "iconfont icon-GPS";
                break;
            case "additionalHours": //新增工时
                item.class = "iconfont icon-additionalHours";
                break;
            case "details": //详情
                item.class = "iconfont icon-details";
                break;
            case "deleteHour": //删除工时
                item.class = "iconfont icon-deleteHour";
                break;
            case "more": //更多
                item.class = "iconfont icon-more";
                break;
            case "message": //消息
                item.class = "iconfont icon-remind_fill";
                break;
            case "help": //帮助
                item.class = "iconfont icon-help";
                break;
            case "advancedSearch": //高级搜索
                item.class = "iconfont  icon-advancedSearch";
                break;
            case "returnVisit": //投诉回访
                item.class = "iconfont icon-returnVisit";
                break;
            case "capital": //资金明细
                item.class = "iconfont icon-capital";
                break;
            case "synchronization": //同步
                item.class = "iconfont icon-synchronization";
                break;
            case "applicationComplaint": //投诉申诉申请
                item.class = "iconfont icon-applicationComplaint";
                break;
            case "carProgress": //提车进度
                item.class = "iconfont icon-carProgress";
                break;
            case "clueCleaning": //线索清洗
                item.class = "iconfont icon-clueCleaning";
                break;
            case "heallSynchronizationlp": //全部同步
                item.class = "iconfont icon-allSynchronization";
                break;
            case "switch": //经销商启用开关
                item.class = "iconfont  icon-switch";
                break;
            case "zhiding": //置顶
                item.class = "iconfont icon-zhiding";
                break;
            case "zhidi": //置底
                item.class = "iconfont icon-zhidi";
                break;
            case "shangyi": //上移
                item.class = "iconfont icon-shangyi";
                break;
            case "xiayi": //下移
                item.class = "iconfont icon-xiayi";
                break;
            case "shouquan": //授权
                item.class = "iconfont icon-shouquan";
                break;
            case "quxiaoshouquan": //取消授权
                item.class = "iconfont icon-quxiaoshouquan";
                break;
            case "fabu": //发布
                item.class = "iconfont icon-fabu";
                break;
            case "fenpei": //分配
                item.class = "iconfont icon-fenpei";
                break;
            case "tingzhi": //停止
                item.class = "iconfont icon-tingzhi";
                break;
            case "selectCar": //选择适用车型
                item.class = "iconfont icon-selectCar";
                break;
            case "selecjinpingbeijian": //选择精品备件
                item.class = "iconfont icon-selecjinpingbeijian";
                break;
            case "quanbushanchu": //全部删除
                item.class = "iconfont icon-quanbushanchu";
                break;
            case "heallSynchronizationlp": //全部同步
                item.class = "iconfont icon-allSynchronization";
                break;
            case "hengshuqiehuanshu": //横竖切换（竖
                item.class = "iconfont icon-hengshuqiehuanshu";
                break;
            case "leftrun": //左移动
                item.class = "iconfont icon-leftrun";
                break;
            case "rightrun": //右移动
                item.class = "iconfont icon-rightrun";
                break;
            case "wendangfujian": //文档附件
                item.class = "iconfont icon-wendangfujian";
                break;
            case "biangengguanli": //变更管理
                item.class = "iconfont icon-biangengguanli";
                break;
            case "gerendaiban": //个人待办
                item.class = "iconfont icon-gerendaiban";
                break;
            case "yusuanguanli": //预算管理
                item.class = "iconfont icon-yusuanguanli";
                break;
            case "hetongguanli": //合同管理
                item.class = "iconfont icon-hetongguanli";
                break;
            case "shejibiangeng": //计划变更
                item.class = "iconfont icon-shejibiangeng";
                break;
            case "gengxinfanwei": //位置
                item.class = "iconfont icon-gengxinfanwei";
                break;
            case "guanlianwenda": //关联问题
                item.class = "iconfont icon-guanlianwenda";
                break;
            case "chakan": //查看
                item.class = "iconfont icon-chakan";
                break;
            case "shuaxin": //刷新
                item.class = "iconfont icon-shuaxin";
                break;
            case "tianjiazhiyin": //添加指引
                item.class = "iconfont icon-tianjiazhiyin";
                break;
            case "zuojiantou": //左箭头
                item.class = "iconfont icon-zuojiantou";
                break;
            case "youjiantou": //右箭头
                item.class = "iconfont icon-youjiantou";
                break;

        }
    },

}


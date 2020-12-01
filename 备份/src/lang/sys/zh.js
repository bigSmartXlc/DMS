import orgRouter from '../org/zh'
export default {
  sys: {
    router: {
      home: '首页',
      ...orgRouter.router
    },
    navbar: {
      title: '东风乘用车DMS系统',
      home: '首页',
      search: '菜单查询',
      position: '东风南方中大',
      logOut: '退出登录',
      changePassword: '修改密码',
      systemSet: '系统设置',
      theme: '换肤'
    },
    settings: {
      title: '系统配置',
      language: '语言切换'
    },
    tagsView: {
      refresh: '刷新',
      close: '关闭',
      closeOthers: '关闭其它',
      closeAll: '关闭所有'
    },
    login: {
      title: '东风乘用车DMS系统',
      logIn: '登录',
      iamLogin: '点击跳转IAM登录',
      username: '账号',
      password: '密码',
      promptUser: '请输入账号',
      promptPass: '请输入密码',
      usernameTip: '账号名不能为空',
      passwordTip: '密码名不能为空'
    },
    button: {
      query: '查询',
      infoModify: '订单信息修改',
      save: '保存',
      sync: '同步',
      allSync: '全部同步',
      add: '新增',
      addCar: '新增车型',
      edit: '编辑',
      modify: '修改',
      return: '返回',
      export: '导出',
      vehicles: '机动车开票',
      addValue: '增值税开票',
      agree: '同意',
      import: '导入',
      reset: '重置',
      allClear: '全部清除',
      pendingAplication: '退订申请',
      repeal: '撤销',
      delete: '删除',
      check: '审核',
      returnTimeSet: '销退时间限制',
      returnTimeSwitch: '销退时间限制开关',
      fundsMaintain: '资金维护',
      // 经销商搬入地维护
      twoNetMaintain: '二网维护',
      // 出货确认指示
      confirmOut: '出货确认',
      // 配车解除
      carRelease: '配车解除',
      // 车辆验收入库
      // 查看明细
      showDetial: '查看明细',
      receipt: '收款',
      examine: '审核', // 审核
      dislocation: '解配',
      distribution: '配车',
      confirm: '确认',
      cancel: '取消',
      reject: '驳回',
      pass: '通过',
      registration: '号码登记',
      getDetail: '查看角色',
      detail: '明细',
      enable: '启用',
      analysis: '解析',
      replacement: '置换',
      disable: '停用',
      moveTop: '置顶',
      print: '打印',
      drawer: '开票',
      moveUp: '上移',
      submit: '提交',
      retreat: '销退',
      moveDown: '下移',
      moveBottom: '置底',
      addStaff: '新增员工',
      memberManagement: '成员管理',
      userPermission: '查看用户权限',
      permissionSet: '功能权限设置',
      addMember: '添加成员',
      delMember: '删除成员',
      authorization: '授权',
      apiAuthorization: 'API授权', /* API授权*/
      apiPermissionsView: 'API权限查看', /* API权限查看*/
      userAuthorizationAnalysis: '用户授权分析', /* 用户授权分析*/
      editInteriorColor: '内饰色修改',
      editColor: '车身颜色修改',
      application: '申请',
      selFile: '选择文件',
      demandTemplateDownload: '需求模板下载',
      downloadImportTemplate: '下载导入模板',
      clickUpload: '点击上传',
      newAdd: '新增',
      filter: '过滤',
      checked: '勾选',
      unchecked: '不勾选',
      apply: '申请',
      transferOutConfirm: '调出确认',
      transferInConfirm: '调入确认',
      invalid: '作废',
      switchSet: '开关设置',
      genSearch: '搜索',
      advSearch: '高级搜索',
      downloadAttachment: '附件下载',
      pubAway: '收起',
      // 调拨出库
      outStock: '出库'
    },
    content: {
      emptyData: '暂无数据',
      loading: '加载中',
      searchTitle: '查询条件',
      gridTitle: '查询结果',
      gridIndex: '序号',
      gridChoose: '选择',
      nextPage: '下一页',
      prevPage: '上一页',

      operate: '操作',

      more: '更多'

    },
    tips: {
      'esTip0': '请选择',
      'esTip1': '语言切换成功',
      'esTip2': '登录失败',
      'esTip3': '用户已经超时',
      'esTip4': '服务器繁忙',
      'esTip5': '保存成功',
      'seTip6': '添加成功',
      'esTip7': '请选择一条数据',
      // 含变量调用：{{$t('sys.tips.esTip9', {msg: '采购单'})}}
      'esTip9': '{msg}已经存在',
      'esTip10': '保存失败',
      'esTip11': '导出成功',
      'esTip12': '审核成功',
      'esTip13': '请输入',
      'esTip14': '删除成功',
      'esTip16': '选择日期',
      'esTip18': '导入成功',
      'esTip17': '驳回成功',
      'esTip19': '解析成功',
      'esTip20': '置换成功',
      'esTip21': '作废成功',
      'esTip22': '请选择需要保存的资金类型',
      'esTip23': '解配成功',
      'esTip24': '配车成功',
      'esTip25': '导入失败',
      'esTip26': '导入错误',
      'esTip27': '文件必须为.xls或者.xlsx类型',
      'esTip28': '操作成功',
      'esTip29': '修改成功',
      'esTip30': '取消成功',
      'esTip31': '复核成功',
      'esTip32': '操作失败'
    }
  }
}

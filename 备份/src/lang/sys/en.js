import orgRouter from '../org/en'
export default {
  sys: {
    router: {
      home: 'Home',
      ...orgRouter.router
    },
    navbar: {
      title: 'DFPV',
      titleright: 'DMS',
      home: 'Home',
      search: 'Menu',
      position: 'South east wind',
      logOut: 'Log Out',
      changePassword: 'Change Password', // 修改密码
      systemSet: 'System Set', // 系统设置
      theme: 'Theme'
    },
    settings: {
      title: 'System Setting',
      language: 'Language'
    },
    tagsView: {
      refresh: 'Refresh',
      close: 'Close',
      closeOthers: 'Close Others',
      closeAll: 'Close All'
    },
    login: {
      title: 'DFPV',
      titleright: 'DMS',
      logIn: 'Login',
      iamLogin: 'Jump IAM Login',
      username: 'Username',
      password: 'Password',
      promptUser: 'User Name',
      promptPass: 'PassWord',
      usernameTip: 'The user name is require',
      passwordTip: 'The password is require'
    },
    button: {
      query: 'Query',
      infoModify: 'info Modify', // 订单信息修改
      save: 'Save',
      sync: 'Sync',
      allSync: 'allSync',
      add: 'Add',
      addCar: 'Add car',
      modify: 'modify', // 修改
      edit: 'Edit',
      export: 'Export',
      return: 'Return',
      import: 'Import',
      reset: 'Reset',
      modify: 'modify',
      agree: 'agree',
      reject: 'reject',
      detail: 'detail',
      allClear: 'Clear All',
      delete: 'Delete',
      apiAuthorization: 'API Authorization', /* API授权*/
      apiPermissionsView: 'API Permissions View', /* API权限查看*/
      userAuthorizationAnalysis: 'user Authorization Analysis', /* 用户授权分析*/
      switchSet: ' switchSet',
      fundsMaintain: 'Funds Maintain',

      // 出货确认指示
      confirmOut: 'ConfirmOutEn', // 出货确认
      // 配车解除
      carRelease: 'CarReleaseEn', // 配车解除
      showDetial: 'ShowDetialEn', // 查看明细

      examine: 'Examine', // 审核

      check: 'Check',
      enable: 'Enable', // 启用
      disable: 'Disable', // 停用
      returnTimeSet: 'Return Time Set', // 销退时间限制
      returnTimeSwitch: 'Return Time Switch', // 销退时间限制开关
      moveTop: 'Move To Top', /* 置顶*/
      print: 'print',
      submit: 'submit',
      moveUp: 'Move Up', /* 上移*/
      moveDown: 'Move Down', /* 下移*/
      moveBottom: 'Move To Bottom', /* 置底*/
      confirm: 'Confirm',
      analysis: 'analysis', /* 解析*/
      retreat: 'retreat', /* 撤销*/
      cancel: 'Cancel',
      addStaff: 'Add Staff', // '新增员工',
      memberManagement: 'Member Management', // 成员管理
      userPermission: 'User Permission', // 查看用户权限
      permissionSet: 'Function Permission Set', // 功能权限设置
      replacement: 'replacement', /* 置换*/
      addMember: 'Add Member', // 添加成员
      delMember: 'Delete Member', // 删除成员
      authorization: 'Authorization', /* 授权*/

      editInteriorColor: 'Edit Interior Color', // 内饰色修改
      editColor: 'Edit Color', // 车身颜色修改,
      application: 'Application'/* 申请*/,
      selFile: 'Select File', /* 选择文件*/
      demandTemplateDownload: 'Demand Template Download', /* 需求模板下载*/
      downloadImportTemplate: 'Down Template', /* 下载导入模板*/
      clickUpload: 'Upload', /* 点击上传*/
      newAdd: 'New Add', // 新增
      filter: 'Filter', // 过滤
      checked: 'Checked', // 勾选
      unchecked: 'Unchecked', // 不勾选
      apply: 'Apply', // 申请
      transferOutConfirm: 'Transfer Out Confirm', // 调出确认
      invalid: 'Invalid', // 作废
      genSearch: 'Search',
      downloadAttachment: 'Download Attachment',
      advSearch: 'Adv Search',
      pubAway: 'Put away'
    },
    content: {
      emptyData: 'empty data',
      loading: 'loading',
      searchTitle: 'Query Conditions',
      gridTitle: 'Query Results',
      gridIndex: 'Number',
      gridChoose: '',
      nextPage: 'Next',
      prevPage: 'Prev',

      operate: 'Operate',
      more: 'More' // 更多

    },
    tips: {
      'esTip0': 'Please Choose',
      'esTip1': 'Switch Language Success',
      'esTip2': 'Log Failure',
      'esTip3': 'The User has expired',
      'esTip4': 'Server is too busy',
      'esTip5': 'Save Success',
      'seTip6': 'Add Success',
      'esTip7': 'Please Select one data',
      'esTip10': 'Save Failure',
      'esTip11': 'Export Success',
      'esTip12': 'Check Success',
      'esTip13': 'Please Input',
      'esTip14': 'Delete Success',
      'esTip16': 'Select Date', // 选择日期
      'esTip18': 'improt Success',
      'esTip20': 'Replacement Success', // 置换成功
      'esTip17': 'Rejecte Success', // 驳回成功
      'esTip19': 'Analysis Success', // 解析成功
      'esTip22': 'Please Select The Funds Type To Save', // 请选择需要保存的资金类型,
      'esTip25': 'import failure',
      'esTip26': 'imports error',
      'esTip27': ' The file must be of type .xls or .xlsx',
      'esTip28': 'Successful operation',
      'esTip29': 'Successfully modified',
      'esTip30': 'Cancel success',
      'esTip31': 'Successful review',
      'esTip32': 'Operation failure'

    }
  }

}


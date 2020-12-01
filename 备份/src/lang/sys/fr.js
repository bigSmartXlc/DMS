import orgRouter from '../org/fr'
export default {
  sys: {
    router: {
      home: 'Accueil',
      ...orgRouter.router
    },
    navbar: {
      title: 'DFPV',
      home: 'Accueil',
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
      modify: 'modify', // 修改
      retreat: 'retreat', /* 撤销*/
      allSync: 'allSync',
      print: 'print',
      submit: 'submit',
      return: 'Return',
      add: 'Add',
      addCar: 'Add car',
      replacement: 'replacement', /* 置换*/
      edit: 'Edit',
      agree: 'agree',
      export: 'Export',
      analysis: 'analysis', /* 解析*/
      import: 'Import',
      reset: 'Reset',
      allClear: 'allClear',
      delete: 'Delete',
      apiAuthorization: 'API Authorization', /* API授权*/
      apiPermissionsView: 'API Permissions View', /* API权限查看*/
      userAuthorizationAnalysis: 'user Authorization Analysis', /* 用户授权分析*/
      returnTimeSet: 'Return Time Set', // 销退时间限制
      returnTimeSwitch: 'Return Time Switch', // 销退时间限制开关
      cancel: 'Cancel', // 取消
      // 出货确认指示
      confirmOut: 'ConfirmOutEn', // 出货确认
      // 配车解除
      carRelease: 'CarReleaseEn', // 配车解除
      showDetial: 'ShowDetialEn', // 查看明细
      reject: 'Reject', // 驳回
      examine: 'Examine', // 审核
      downloadImportTemplate: 'Down Template', /* 下载导入模板*/
      clickUpload: 'Upload', /* 点击上传*/
      newAdd: 'New Add', // 新增
      filter: 'Filter', // 过滤
      checked: 'Checked', // 勾选
      unchecked: 'Unchecked', // 不勾选,
      genSearch: 'Search',
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
      operate: 'Operate'
    },
    tips: {
      'esTip0': 'Input',
      'esTip1': 'Switch Language Success',
      'esTip2': 'Log Failure',
      'esTip3': 'The User has expired',
      'esTip4': 'Server is too busy',
      'esTip5': 'Save Success',
      'seTip6': 'Add Success',
      'esTip7': 'Please Select one data',
      'esTip16': 'improt Success',
      'esTip17': 'Rejecte Success', // 驳回成功
      'esTip19': 'Analysis Success', // 解析成功,
      'esTip20': 'Replacement Success', // 置换成功
      'esTip32': 'Operation failure'

    }
  }

}


// MP API返回报错信息
const infos = {
  l0100100001: '用户名不能为空', l0100100002: '用户不存在', l0100100003: '用户禁用，请联系管理员', l0100100004: '用户名密码错误或账号已过期，请重置密码或联系管理员处理', l0100100005: '注销失败', l0100100006: '操作异常，请联系管理员', l0100100007: '登录失败超过限制次数，请联系管理员；或通过找回密码功能重置密码后再登录', l0100100008: '用户已过期，请联系系统管理员处理！', l0100100009: '用户已失效，请联系管理员', l0100100010: '用户未激活，请联系管理员', l0100100011: '邮箱格式不对', l0100100012: '用户名或邮箱地址不对', l0100100013: '邮件发送失败，请联系管理员', l0100100014: '找回密码链接已失效，请用最新的找回链接或再次找回', l0100100015: 'CC号不能为空', l0100100016: '错误的CC登录ip地址', l0100100017: '错误的CC密钥', l0100100018: '域账号在数据库中不存在', l0100100019: '验证码不能为空', l0100100020: '验证码错误或失效', l0100100021: '用户未绑定手机号码', l0100100022: '用户不在域中或域服务错误', l0100100023: '用户未绑定邮箱', l0100100024: '验证码错误或失效', l0100100025: '域账号未设置属性值', l0100100026: 'CC用户已经登录使用过，不能再次使用', l0100100027: '1分钟内不能多次发送', l0100100028: '微信ID已被其他用户绑定', l0100100029: '用户已绑其他微信ID', l0100100030: '用户和微信ID已相互绑定', l0100100031: '微信还未绑定, 请选择其他方式登录', l0100100032: '微信扫码异常, 请选择其他方式登录', l0100100033: '微信解绑失败', l0100100034: '微信二维码失败, 请选择其他方式登录', l0100100035: '微信绑定失败', l0100100036: '请扫码再试', l0100100037: '未关注微信公众号', l0100100038: '用户还未绑定微信', l0100100039: '二维码已过期', l0100100040: '域账号错误', l0100100041: '刷脸注册失败', l0100100042: '用户名或活体数据不能为空', l0100100043: '刷脸数据保存失败, 请查看日志', l0100100044: '刷脸验证失败', l0100100045: '刷脸数据删除失败', l0100100046: '动态码错误或失效', l0100100047: '微信绑定二维码生成失败', l0100100048: '用户未注册人脸', l0100100049: '人脸不匹配，请重新再试', l0100100050: '没有检测到人脸', l0100100051: '检测到多个人脸', l0100100052: '人脸图片模糊', l0100100053: '人脸太小', l0100100054: '带眼镜', l0100100055: '图片质量差', l0100100056: '人脸太暗', l0100100057: '获取人脸错误，请查看日志', l0100100058: '人脸不存在', l0100100059: '域用户名或密码为空', l0100100060: '域用户名或密码错误', l0100100061: '刷脸识别应用权限错误', l0100100062: '刷脸识别参数不完整', l0100100063: '刷脸识别系统忙', l0100100064: '刷脸识别RPC通信错误', l0100100065: '刷脸识别操作不支持', l0100100066: '刷脸识别参数错误', l0100100067: '刷脸识别服务访问错误', l0100100068: '刷脸识别登录失败', l0100100069: '刷脸识别用户权限错误', l0100100070: '刷脸识别底层算法引擎错误', l0100100071: '刷脸识别系统异常', l0100100072: '刷脸识别欠费', l0100100073: '刷脸识别登出错误', l0100100074: '刷脸识别应用没有回复', l0100100075: '刷脸识别操作错误', l0100100076: '刷脸识别达到 TPS 上限', l0100100077: '刷脸识别缓存区太小', l0100100078: '刷脸识别处理过程中出现错误或异常', l0100100079: '刷脸识别没有检测到人脸', l0100100080: '刷脸识别检测到多个人脸', l0100100081: '刷脸识别人脸太小', l0100100082: '刷脸识别人脸太大', l0100100083: '刷脸识别人脸太亮', l0100100084: '刷脸识别人脸太暗', l0100100085: '刷脸识别人脸图片模糊', l0100100086: '刷脸识别带眼镜', l0100100087: '刷脸识别图片质量差', l0100100088: '刷脸识别Base64 编码错误或图片原始数据错误', l0100100089: '刷脸识别图片太大, 最大尺寸 6000*4000', l0100100090: '刷脸识别图片太小, 最小尺寸 24*24', l0100100091: '刷脸识别图片缓冲区太小', l0100100092: '刷脸识别获取关键点错误', l0100100093: '刷脸识别提取特征错误', l0100100094: '刷脸识别特征数据错误', l0100100095: '刷脸识别特征长度错误', l0100100096: '刷脸识别人脸识别错误', l0100100097: '刷脸识别人脸比对错误', l0100100098: '刷脸识别添加人脸错误', l0100100099: '刷脸识别编辑人脸错误', l0100100100: '刷脸识别删除人脸错误', l0100100101: '刷脸识别人脸不存在', l0100100102: '刷脸识别查询人脸错误', l0100100103: '刷脸识别人脸已经存在', l0100100104: '刷脸识别人脸到达上限', l0100100105: '刷脸识别创建组错误, 可能组编号已经存在', l0100100106: '刷脸识别编辑组错误', l0100100107: '刷脸识别删除组错误', l0100100108: '刷脸识别人员已经在组中', l0100100109: '刷脸识别组未建模', l0100100110: '刷脸识别组不存在', l0100100111: '刷脸识别组中没有人脸', l0100100112: '刷脸识别查询组错误', l0100100113: '刷脸识别组已经存在', l0100100114: '刷脸识别组数到达上限', l0100100115: '刷脸识别组中人脸数到达上限', l0100100116: '刷脸识别引擎添加人脸出现错误', l0100100117: '刷脸识别引擎删除人脸出现错误', l0100100118: '刷脸识别最多只能同时运行 3 个建模任务', l0100100119: '刷脸识别已经开始建模', l0100100120: '刷脸识别建模任务已经是停止状态', l0100100121: '刷脸识别查询建模进度失败', l0100100122: '刷脸识别启动建模错误', l0100100123: '刷脸识别启动建模异常', l0100100124: '刷脸识别停止建模错误', l0100100125: '刷脸识别停止建模异常', l0100100126: '刷脸识别人脸重新建模错误', l0100100127: '刷脸识别人脸重新建模异常', l0100100128: '刷脸识别已经开始加载', l0100100129: '刷脸识别加载任务已经是停止状态', l0100100130: '刷脸识别查询加载进度失败', l0100100131: '刷脸识别启动加载错误', l0100100132: '刷脸识别启动加载异常', l0100100133: '刷脸识别停止加载错误', l0100100134: '刷脸识别停止加载异常', l0100100135: '刷脸识别身份证识别错误', l0100100136: '刷脸识别图像模糊或身份证尺寸过小, 要求长宽应大于400x350', l0100100137: '刷脸识别没有识别出有效字符', l0100100138: '刷脸识别银行卡识别错误', l0100100139: '刷脸识别布控配置错误', l0100100140: '刷脸识别布控配置异常', l0100100141: '刷脸识别布控查询错误', l0100100142: '刷脸识别布控查询异常', l0100100143: '刷脸识别没有查询到布控信息', l0100100144: '刷脸识别唇语识别错误', l0100100145: '在线用户数量超过限制，请稍后登录或联系管理员', l0100100146: '手机号/邮箱地址错误', l0100100147: '手机号/邮箱地址不能为空', l0100100148: '当前用户已被锁定，请联系管理员', l0100100149: '系统开放时间为{0}至{1}', l0200300001: '获取我的菜单失败!', l0200300002: '密码修改成功', l0200300003: '密码修改失败', l0200300004: '旧密码验证错误', l0200300005: '旧密码不能和新密码相同', l0200300006: '获取菜单树失败!', l0200300007: '加载系统设置成功', l0200300008: '加载系统设置失败', l0200300009: '保存系统设置成功', l0200300010: '保存系统设置失败', l0200300011: '密码不符合密码规则', l0200300012: '新密码不能与最近三次设置的密码相同', l0200300013: '该版本已存在', l0200300014: '版本删除失败', l0200300015: '密码登录错误次数不能大于9次', l0200300016: '非法的用户、组织或角色', l0200300017: '非法的菜单', l0200300018: '同一个对象不能设置多个默认主页', l0200300019: '设置主页异常', l0200300020: 'CC号不能为空', l0200300021: '用户名不能为空', l0200300022: 'MQ消息设置未开启', l0200300023: '系统未设置系统编号', l0200300024: '接收人不能为空', l0200300025: '消息内容不能为空', l0200300026: '发送对象对应的用户未绑定微信', l0200300027: '微信规定群发人数至少2人', l0200300028: '微信群发失败', l0200400001: '删除菜单失败', l0200400002: '该模块存在下级节点不允许删除', l0200400003: '菜单删除成功', l0200400004: '菜单删除失败', l0200400005: '修改上级菜单失败', l0200400006: '更换上级菜单成功', l0200400007: '保存菜单失败', l0200400008: '更新菜单信息失败', l0200400009: '更新菜单信息成功', l0200400010: '新增菜单失败', l0200400011: '新增菜单成功', l0200400012: '获取菜单信息失败', l0200400013: '获取页面列表失败', l0200400014: '保存成功', l0200400015: '保存失败', l0200400016: '获取页面列表成功', l0200400017: '删除成功', l0200400018: '删除失败', l0200400019: '更新成功', l0200400020: '更新失败', l0200400021: '快捷菜单已存在', l0200400022: '页面正在使用无法删除', l0200400023: '资源文件已存在', l0200400024: '资源文件删除失败', l0200400025: '页面名称已存在', l0200400026: '快捷菜单参数不能为空', l0200400027: '快捷菜单JSON格式错误', l0200400028: '快捷菜单删除失败', l0200400029: '快捷菜单批量删除失败', l0200400030: '图标已经使用，不能删除', l0200400031: '文件名太长', l0200400032: '上传图标出错', l0200400033: '二维码识别失败', l0200400034: '无法打开页面，表单不存在', l0200400035: '当前登录用户没有权限访问此表单', l0200400036: '获取表单地址失败', l0200400037: '保存表单控件失败', l0200400038: '删除表单控件失败', l0200400039: '获取表单控件失败', l0200400040: '控件已被权限表引用，不能删除', l0200400041: '功能编号重复', l0301100001: '公告获取失败', l0301100002: '公告删除失败', l0301100003: '标题不能为空', l0301100004: '内容不能为空', l0301100005: '公告发布失败', l0301100006: '公告修改失败', l0301100007: '今天已发布该标题的公告', l0301100008: '数据来源不能为空', l0301100009: '公告已被删除', l0402100001: '增加功能服务关系出错', l0402100002: '更改功能服务关系出错', l0402100003: '删除功能服务关系出错', l0402100004: '查询功能服务关系出错', l0402100005: '导入功能服务关系出错', l0402100006: '导出功能服务关系出错', l0402100007: '查询功能调用出错', l0402100008: '统计功能调用出错', l0402100009: '增加功能调用出错', l0402100010: '更改功能调用出错', l0402100011: '删除功能调用出错', l0402100012: '查询运行日志出错', l0402100013: '统计运行日志出错', l0402100014: '增加运行日志出错', l0402100015: '更改运行日志出错', l0402100016: '删除运行日志出错', l0402100017: '增加组件功能关系出错', l0402100018: '修改组件功能关系出错', l0402100019: '删除组件功能关系出错', l0402100020: '查询组件功能关系出错', l0402100021: '导入组件功能关系出错', l0402100022: '导出组件功能关系出错', l0402100023: '功能编号和服务接口不唯一', l0402100024: '功能编号和功能路径不唯一', l0402100025: '统计数据只能查询7天的数据', l0402100026: '统计数据只能查询30天的数据', l0402100027: '亲，今天的统计数据还未生成', l0500200001: '用户名已经存在', l0500200002: '参数错误', l0500200003: '用户所属组织非空', l0500200004: '用户登录名不能为空', l0500200005: '用户列表获取错误', l0500200006: '用户信息获取错误', l0500200007: '用户信息修改错误', l0500200008: '新增用户错误', l0500200009: '用户ID不能为空', l0500200010: '用户删除失败', l0500200011: '用户名已存在且无效', l0500200012: '内置用户不能停用', l0500200013: '用户启用失败', l0500200014: '邮箱已被使用', l0500200015: '手机号码已被使用', l0500200016: '用户将在{0}分钟后强制退出', l0500200017: '无此表单', l0500200018: '用户没有访问表单对应菜单的权限', l0500200019: '获取表单地址失败', l0500200020: '用户名与其他用户邮箱相同', l0500200021: '用户名与其他用户手机号相同', l0500500001: '角色不存在', l0500500002: '角色保存成功', l0500500003: '获取角色列表失败', l0500500004: '新增角色失败', l0500500005: '修改角色失败', l0500500006: '添加成员失败', l0500500007: '成员删除失败', l0500500008: '成员加载失败', l0500500009: '组织ID不能为空', l0500500010: '角色编码不能为空', l0500500011: '角色名称不能为空', l0500500012: '角色编号已存在', l0500500013: '角色名称已存在', l0500500014: '修改成员失败', l0500500015: '删除成员失败', l0500500016: '删除角色失败', l0500500017: '更新角色权限成功', l0500500018: '角色权限操作失败', l0500500019: '角色权限保存成功', l0500500020: '角色的组织关系已经存在', l0500500021: '不能修改角色的组织关系类型', l0500500022: '所属组织数目超过限制', l0500500023: '内置角色不能删除', l0500600001: '岗位新增成功', l0500600002: '岗位新增失败', l0500600003: '岗位修改成功', l0500600004: '岗位修改失败', l0500600005: '删除失败, 请先删除岗位用户', l0500600006: '删除失败, 请先删除检查父岗位', l0500600007: '删除失败', l0500600008: '删除成功', l0500600009: '新增岗位成员成功', l0500600010: '新增岗位成员失败', l0500600011: '删除岗位成员成功', l0500600012: '删除岗位成员失败', l0500600013: '岗位ID不能为空', l0500600014: '岗位名称不能为空', l0500600015: '该岗位名称已存在', l0500600016: '该岗位已被引用', l0500700001: '组织编码为空', l0500700002: '组织名称为空', l0500700003: '组织关系已存在', l0500700004: '组织关系嵌套引用', l0500700005: '组织关系不存在', l0500700006: '组织架构下有用户存在', l0500700007: '组织架构有关联角色', l0500700008: '添加组织关系失败', l0500700009: '更新组织关系失败', l0500700010: '删除组织关系失败', l0500700011: '父组织架构非法', l0500700012: '组织编码已经存在', l0500700013: '组织架构不存在', l0500700014: '组织架构已被使用，无法删除', l0500700015: '组织架构操作异常', l0500700016: '第{0}条记录异常：组织编号或名称为空', l0500700017: '第{0}条记录异常：组织类型不正确', l0500700018: '第{0}条记录异常：序号不正确，需为正整数', l0500700019: '第{0}条记录异常：组织编号重复', l0500700020: '第{0}条记录异常：组织ID重复', l0500700021: '组织ID已经存在', l0500700022: '导入组织数据失败', l0500700023: '导入数据中包含不存在的组织管理员', l0500700024: '第{0}条记录异常：组织ID已存在', l0500700025: '第{0}条记录异常：组织编号已存在', l0500700026: '公司下存在同名的角色', l0500800001: '用户权限操作失败', l0500900001: '组织权限列表获取错误', l0500900002: '更新组织权限成功', l0500900003: '更新组织权限失败', l0501000001: '查询错误', l0502300001: '第{0}条记录异常：功能编号、名称、接口不能为空', l0502300002: '第{0}条记录异常：功能编号和服务接口组成的唯一键重复', l0502300003: '第{0}条记录导入异常：功能编号和服务接口组成的唯一键重复', l0502300004: '第{0}条记录异常：功能编号、名称、路径不能为空', l0502300005: '第{0}条记录异常：功能编号和功能路径组成的唯一键重复', l0502300006: '第{0}条记录异常：功能编号和功能路径组成的唯一键重复', l0502300007: '第{0}条记录异常：功能名称过长', l0502300008: '第{0}条记录异常：编号过长', l0502300009: '第{0}条记录异常：服务接口过长', l0502300010: '第{0}条记录异常：描述过长', l0502300011: '第{0}条记录异常：功能路径过长', l0502300012: '第{0}条记录异常：组织ID过长', l0502300013: '第{0}条记录异常：组织类型不能为空', l0502300014: '第{0}条记录异常：功能路径格式不正确', l0502300015: '第{0}条记录异常：功能编号命名不符合规范', l0502300016: '第{0}条记录异常：服务接口命名不符合规范', l0502600001: '接口名称已经存在', l0502600002: '接口不存在', l0502600003: '第{0}条记录异常：API编号、名称、路径、服务名称不能为空', l0502600004: '第{0}条记录异常：API名称重复', l0502600005: '第{0}条记录异常：API编号、名称、路径、服务名称、描述信息超长', l0502600006: '第{0}条记录异常：API编号不符合规范', l0601400001: '分类名称已存在', l0601400002: '删除分类失败', l0601400003: '该分类已被流程模板引用，不能删除', l0601400004: '该分类已被其他分类引用，不能删除', l0601500001: '流程模板名称已经存在', l0601500002: '流程模板操作异常', l0601500003: '流程模板不存在', l0601500004: '模板已启用, 不能删除', l0601500005: '删除代理失败', l0601500006: '修改代理失败', l0601500007: '流程节点{0}配置有错误', l0601500008: '流程节点{0}不能驳回', l0601500009: '不允许存在没有被线连接的步骤', l0601500010: '分流步骤多于合流步骤，不符合要求', l0601500011: '合流步骤多于分流步骤，不符合要求', l0601500012: '{0}步骤非结束节点，下一步骤不能为空', l0601500013: '开始步骤PC表单不能为空', l0601500014: '节点数据格式错误', l0601500015: '保存到数据库失败', l0601500016: '步骤{0}上的线条不能指向自身', l0601500017: '步骤之间存在多条直接相连的连接线', l0601700001: '代理已存在', l0601900001: '自定义责任人接口名称已存在', l0601900002: '自定义责任人操作异常', l0601900003: '公共责任人接口不存在', l0601900004: '责任人接口名称为空', l0601900005: '导入责任人接口为空', l0601900006: '导入责任人接口数据已存在', l0601900007: '导入责任人接口操作异常', l0601900008: '导入数据已经不存在', l0601900009: '自定义责任人被引用，不能删除', l0602000001: '取消共享成功', l0602000002: '取消共享设置失败', l0602000003: '已存在此用户流程分类设置', l0602000004: '保存失败', l0701800001: '没有传递主键', l0701800002: '引擎Json参数没包含动作参数', l0701800003: '流程节点键为空', l0701800004: '流程节点不存在', l0701800005: '流程模板键为空', l0701800006: '流程模板不存在', l0701800007: '该流程已经进入会签阶段，无法撤回，请知悉！', l0701800008: '不支持重设到已有责任人', l0701800009: '新责任人不能是当前步骤责任人', l0701800010: '基本配置抄送的扩展SQL配置错误', l0701800011: '动作关联脚本执行出错', l0701800012: '获取下步骤及责任人信息失败', l0701800013: '工作流引擎标签使用错误', l0701800014: '自定义责任人(抄送人)只能是查询sql', l0701800015: '条件表达式日期时间格式错误', l0701800016: '条件表达式时间格式错误', l0701800017: '汇总时只能执行审批与驳回动作', l0701800018: '执行条件表达式错误', l0701800019: '无法获取下一步骤信息或责任人信息', l0701800020: '责任人分析失败', l0701800021: '流程已结束，不能追加', l0701800022: '当前节点已处理完成', l0701800023: '扩展属性url解码出错', l0701800024: 'curr_step_id参数获取失败', l0701800025: '抄送信息分析失败', l0701800026: '工作流引擎执行出错', l0701800027: '当前用户不是待办责任人', l0701800028: '当前用户不是流程节点的责任人', l0701800029: '用户不是有效用户', l0701800030: '自定义抄送人不存在', l0701800031: '自定义抄送人标签使用错误', l0701800032: '自定义责任人标签使用错误', l0701800033: '不能将流程代理人设置为自己', l0701800034: '当前登录用户已经是该流程的代理用户', l0701800035: '代理人已经代理了该流程', l0701800036: '代理人已经将该流程代理给其他用户', l1201200001: '菜单名称已存在', l1201200002: '获取菜单列表信息失败', l1201200003: '菜单添加失败', l1201200004: '菜单编辑失败', l1201200005: '菜单删除失败', l1201200006: '获取菜单信息失败', l1201200007: '菜单名称不能为空', l1201200008: '菜单图标不能为空', l1201200009: '菜单ID不能为空', l1201200010: '设置权限失败', l1201200011: '设置菜单有效性失败', l1201200012: '获取通讯录失败', l1201300001: '我的应用添加失败', l1201300002: '应用列表获取失败', l1201300003: '获取菜单的未读记录数失败', l1201300004: '我的应用取消失败', l1201300005: '该流程已是常用流程', l1201300006: '生成二维码失败', l1201300007: 'IOS消息推送连接超时', l1302200001: '获取商品信息异常', l1302200002: '支付宝签单异常', l1302200003: '支付宝验签单异常', l1302200004: '支付宝查询历史异常', l1302200005: '指定的帐单号不存在', l1302200006: '错误的支付宝异步帐单信息', l1302200007: '创建扫码支付订单失败', l1302200008: '输入的订单格式错误', l1302200009: '支付宝App支付订单输入格式错误', l1302200010: '创建APP支付订单失败', l1302200011: '创建刷卡支付订单失败', l1302200012: '该订单已支付', l1302200013: '订单支付失败', l1302200014: '取消订单失败', l1302200015: '申请退款失败', l1302200016: '订单查询失败', l1302200017: '该订单异常，请生成新的交易号', l1402400001: '任务参数不正确', l1402400002: '存在相同名称的任务', l1402400003: '任务类名不存在', l1402400004: '请先停止任务', l1402400005: '获取任务信息失败', l1402400006: '获取任务运行信息失败', l1402400007: '新增任务失败', l1402400008: '更新任务失败', l1402400009: '删除任务失败', l1402400010: '启动任务失败', l1402400011: '暂停任务失败', l1402400012: '恢复任务失败', l1402400013: '停止任务失败', l1402400014: '任务计划表达式错误', l1402400015: '结束时间设置错误', l1402400016: '开始时间设置错误', l1402400017: '执行次数设置错误', l1402400018: '执行间隔秒数设置错误', l1402400019: '结束时间已过期', l1402400020: '开始时间已过期', l1502500001: '策略内容不能为空', l1502500002: '策略内容不能超过50条', l1502500003: '已经存在相同的名称', l1502500004: '策略已经被使用，不能禁用', l1502500005: '策略已经被使用，不能删除', l1502500006: '已经存在相同的名称或者服务路径', l1502500007: '服务路径不是合法的路径, 合法路径, 如: /mp/org/**', l1502500008: '正常节点不能为空', l1502500009: '正常节点不能同时是灰度的节点', l1502500010: '正常节点不是有效节点', l1502500011: '灰度节点不是有效节点', l9900000001: '用户过期，请重新登录', l9900000002: '非法用户操作', l9900000003: '您没有权限操作', l9900000004: '传入参数错误', l9900000005: '附件上传失败', l9900000006: '上传文件不符合规范', l9900000007: '版本检查异常', l9900000008: '数据加载失败', l9900000009: '超出文件大小限制', l9900000010: '操作失败', l9900000011: 'license已过期', l9900000012: '传入参数格式错误', l9900000013: '拉取消息失败', l9900000014: '获取版本失败', l9900000015: '数据解密失败', l9900000016: '数据解压失败', l9900000017: '登录失败', l9900000018: '推送消息失败', l9900000019: '文件分块序号不正常', l9900000020: '文件解密失败', l9900000021: '文件解压失败', l9900000022: '文件内容校验失败', l9900000023: '文件保存失败', l9900000024: '文件上传失败', l9900000025: '写附件表失败', l9900000026: '设备类型或者设备不存在', l9900000027: '文件下载失败', l9900000028: '激活码不能为空', l9900000029: '激活码不存在或过期', l9900000030: '短信服务连接失败', l9900000031: '短信发送失败', l9900000032: '文件不存在', l9900000033: '删除文件出错', l9900000034: '激活码格式错误', l9900000035: '开始日期大于结束日期', l9900000036: '开始日期或结束日期为空', l9900000037: '消息发送失败', l9900000038: '该用户已在其他设备登录', l9900000039: '二维码识别失败', l9900000040: '用户没有执行操作的权限', l0200300029: '保存失败，您输入的新密码不安全，请重新输入新密码.', l0200300030: '操作超过限制次数，请联系管理员重置密码.', l9900000041: '长时间未操作，请刷新页面.', l9900000042: '添加的内容已经存在，请勿重复添加.'
}

export default {
  infos
}

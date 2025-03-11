export default {
  menus: {
    root: {
      title: '理赔辅助服务',
      code: '',
      icon: 'yewubaobiao',
      children: [
        {
          title: '撤销案管理',
          code: '',
          icon: 'yewubaobiao',
          children: ['cancel/cancelapp/list', 'cancel/cancelrecover/list', 'cancel/removeCase/list', 'cancel/cancelList/list']
        },
        {
          title: '打假挤虚',
          icon: 'yewubaobiao',
          code: '',
          children: ['playFakes/playFakesApply/list', 'playFakes/playFakesAudit/list']
        },
      ]
    }
  },
  views: [
    {
      path: 'cancel/cancelapp/list',
      code: '',
      bread: '撤销案管理/销案申请',
      title: '立案注销申请'
    },
    {
      path: 'cancel/cancelrecover/list',
      code: '',
      bread: '撤销案管理/立案注销恢复',
      title: '立案注销恢复'
    },
    {
      path: 'cancel/removeCase/list',
      code: '',
      bread: '撤销案管理/撤案处理',
      title: '报案注销申请'
    },
    {
      path: 'cancel/cancelList/list',
      code: '',
      bread: '撤销案管理/销案查询',
      title: '销案查询'
    },

    {
      path: 'playFakes/playFakesApply/list',
      code: '',
      bread: '打假挤虚/打假挤虚申请查询',
      title: '打假挤虚申请'
    },
    {
      path: 'playFakes/playFakesAudit/list',
      code: '',
      bread: '打假挤虚/打假挤虚审核查询',
      title: '打假挤虚审核'
    }
  ]
}

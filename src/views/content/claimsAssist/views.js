export default {
  menus: {
    root: {
      title: '理赔辅助服务',
      code: '',
      icon: 'liuchengshenpi',
      children: [
        {
          title: '撤销案管理',
          code: '',
          icon: 'liuchengshenpi',
          children: ['cancel/cancelapp/list', 'cancel/cancelrecover/list', 'cancel/removeCase/list', 'cancel/cancelList/list']
        },
        {
          title: '打假挤虚',
          icon: 'liuchengshenpi',
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
      title: '立案注销申请'
    },
    {
      path: 'cancel/cancelrecover/list',
      code: '',
      title: '立案注销恢复'
    },
    {
      path: 'cancel/removeCase/list',
      code: '',
      title: '报案注销申请'
    },
    {
      path: 'cancel/cancelList/list',
      code: '',
      title: '销案查询'
    },

    {
      path: 'playFakes/playFakesApply/list',
      code: '',
      title: '打假挤虚申请'
    },
    {
      path: 'playFakes/playFakesAudit/list',
      code: '',
      title: '打假挤虚审核'
    }
  ]
}

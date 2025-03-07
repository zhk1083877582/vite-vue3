export default {
  menus: {
    root: {
      title: '报案中心',
      code: '',
      icon: 'houtaiguanli',
      children: [
        {
          title: '报案',
          icon: 'houtaiguanli',
          code: '',
          children: ['reportCase/queryPcis/list', 'reportCase/queryRptModify/list', 'reportCase/batchClaim/list', 'reportCase/queryRpt/list']
        }
      ]
    }
  },
  views: [
    {
      path: 'reportCase/queryPcis/list',
      code: '',
      bread: '报案/新增报案查询',
      title: '新增报案'
    },
    {
      path: 'reportCase/queryPcis/detail',
      menuPath: 'reportCase/queryPcis/list',
      code: '',
      bread: '报案/新增报案详情',
    },
    {
      path: 'reportCase/queryRptModify/list',
      code: '',
      bread: '报案/暂存报案查询',
      title: '暂存报案查询'
    },
    {
      path: 'reportCase/batchClaim/list',
      code: '',
      bread: '报案/批量理赔',
      title: '批量理赔'
    }, {
      path: 'reportCase/queryRpt/list',
      code: '',
      bread: '报案/已报案查询',
      title: '已报案查询'
    },
  ]
}

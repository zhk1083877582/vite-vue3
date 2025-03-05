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
      title: '新增报案'
    },
    {
      path: 'reportCase/queryRptModify/list',
      code: '',
      title: '暂存报案查询'
    },
    {
      path: 'reportCase/batchClaim/list',
      code: '',
      title: '批量理赔'
    }, {
      path: 'reportCase/queryRpt/list',
      code: '',
      title: '已报案查询'
    },
  ]
}

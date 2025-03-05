export default {
  menus: {
    root: {
      title: '报案中心',
      code: '',
      icon: 'icon-houtaiguanli',
      children: [
        {
          title: '报案',
          code: '',
          children: ['queryPcis', 'queryRptModify', 'batchClaim', 'queryRpt']
        }
      ]
    }
  },
  views: [
    {
      path: 'queryPcis',
      code: '',
      title: '新增报案'
    },
    {
      path: 'queryRptModify',
      code: '',
      title: '暂存报案查询'
    },
    {
      path: 'batchClaim',
      code: '',
      title: '批量理赔'
    }, {
      path: 'queryRpt',
      code: '',
      title: '已报案查询'
    },
  ]
}

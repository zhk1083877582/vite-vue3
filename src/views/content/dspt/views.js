export default {
  menus: {
    root: {
      title: '理赔中心',
      code: '',
      icon: 'icon-houtaiguanli',
      children: [
        {
          title: '调度任务',
          code: '',
          children: ['dsptquery']
        },
      ]
    }
  },
  views: [
    {
      path: 'dsptquery',
      code: '',
      title: '调度任务'
    },
    {
      path: 'dsptquery/detail',
      code: '',
      title: '调度任务详情'
    },
  ]
}

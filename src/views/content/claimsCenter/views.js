export default {
  menus: {
    root: {
      title: '理赔中心',
      code: '',
      icon: 'liuchengshenpi',
      children: [
        {
          title: '调度中心',
          code: '',
          icon: 'liuchengshenpi',
          children: ['dispatchCenter/dsptquery/list', 'dispatchCenter/taskquery/list']
        },
        {
          title: '查勘定损管理',
          icon: 'liuchengshenpi',
          code: '',
          children: ['survey/newSurveylossList/list', 'survey/simpleCasePend/list']
        },
      ]
    }
  },
  views: [
    {
      path: 'dispatchCenter/dsptquery/list',
      code: '',
      bread: '调度中心/调度任务查询',
      title: '调度任务'
    },
    {
      path: 'dispatchCenter/dsptquery/detail',
      menuPath: 'dispatchCenter/dsptquery/list',
      code: '',
      bread: '调度中心/调度任务详情',
      title: '调度任务详情'
    },
    {
      path: 'dispatchCenter/taskquery/list',
      code: '',
      bread: '调度中心/直接改派',
      title: '直接改派'
    },

    {
      path: 'survey/newSurveylossList/list',
      code: '',
      bread: '查勘定损管理/查勘定损任务',
      title: '查勘定损任务'
    },
    {
      path: 'survey/simpleCasePend/list',
      code: '',
      bread: '查勘定损管理/简易案件',
      title: '简易案件'

    }
  ]
}

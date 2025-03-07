import { Opt } from '__com/Opt.js'
import ruleOpt from '@/option/rule.js'

export class subOpt extends Opt {
  constructor() {
    super()
  }

  create() {
    return [
      {
        title: '上级菜单ID',
        key: 'id',
        text: {}
      },
      {
        title: '上级菜单名称',
        key: 'parentTitle',
        text: {}
      },
      {
        title: '菜单名称',
        key: 'title',
        input: {
          maxlength: 20
        },
        placeholder: '请输入菜单名称',
        rules: [ruleOpt.required('菜单名称不能为空')]
      },
      {
        title: '菜单类型',
        key: 'menuType',
        radio: {
          options: [
            {
              value: '入口',
              key: 1
            },
            {
              value: '按钮',
              key: 2
            }
          ]
        },
        rules: [ruleOpt.required('菜单类型不能为空', 'number')]
      }
    ]
  }
}

import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule";

export class changeOpt extends Opt {
  create() {
    return [
      {
        title: "原密码",
        key: "oldPassword",
        placeholder: "请输入原密码",
        input: {type:'password'},
        rules:[ruleOpt.required('请输入原密码')]
      },
      {
        title: "新密码",
        key: "newPassword",
        placeholder: "请输入8位密码，区分大小写",
        input: {type:'password'},
        rules:[
          ruleOpt.required('请输入新密码'),
          ruleOpt.check('密码不能包含特殊字符，请输入6-10位数字、字母', (value) => {
            let reg = /^[a-zA-Z0-9]+$/
            if (value) return !reg.test(value)
          }),
          ruleOpt.check('输入的密码太短，请输入6-10位数字、字母', (value) => {
            if (value) return value.length < 8
          })
        ]
      },
      {
        title: "确认密码",
        key: "verifyPassword",
        placeholder: "请输入新密码",
        input: {type:'password'},
        rules:[
          ruleOpt.required('请输入确认密码'),
          ruleOpt.check('两次输入的密码不匹配！',(val)=>{
            return this.infoData.newPassword != val
          }),
          
        ]
      },
    ];
  }
}

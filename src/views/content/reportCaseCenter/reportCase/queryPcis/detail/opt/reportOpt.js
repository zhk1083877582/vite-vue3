import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule.js";
import cityOpt from '@/option/city.js'

export class reportMsgOpt extends Opt {
  constructor(vm) {
    super(vm);
    this.info = this.infoData;
  }

  create() {
    return [
      {
        title: "无资料报案编号",
        key: "key1",
        disabled: true,
        input: {},
        placeholder: "保存后自动生成",
      },
      {
        title: "赔案号",
        key: "key2",
        disabled: true,
        input: {},
        placeholder: "保存后自动生成",
      },
      {
        title: "报案时间",
        key: "key3",
        disabled: true,
        date: {
          type: 'datetime',
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        },
      },
      {
        title: "赔案案件类别",
        key: "key4",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
        rules: [ruleOpt.required("请选择赔案案件类别")],
      },
      {
        title: "报案方式",
        key: "key5",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
      },
      {
        title: "报案人Email",
        key: "key6",
        input: {},
        placeholder: "请输入报案人Email",
      },
      {
        title: "调度方式",
        key: "key7",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
        rules: [ruleOpt.required("请选择调度方式")],
      },
      {
        title: "报案人类别",
        key: "key8",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
      },
      {
        title: "报案人姓名",
        key: "key9",
        input: {},
        placeholder: "请输入报案人姓名",
        rules: [ruleOpt.required("请输入报案人姓名")],
      },
      {
        title: "报案人电话",
        key: "key10",
        input: {},
        placeholder: "请输入报案人电话",
        rules: [ruleOpt.required("请输入报案人电话")],
      },
      {
        title: "与被保人关系",
        key: "key11",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
        rules: [ruleOpt.required("请选择与被保人关系")],
      },
      {
        title: "联系人姓名",
        key: "key12",
        input: {},
        placeholder: "请输入联系人姓名",
      },
      {
        title: "联系人电话",
        key: "key13",
        input: {},
        placeholder: "请输入联系人电话",
      },
    ];
  }
}

export class dangerMsgInfoOpt extends Opt {
  constructor(vm) {
    super(vm);
    this.info = this.infoData
  }

  create() {
    console.log(this)
    return [
      {
        title: "无资料报案编号",
        key: "key1",
        disabled: true,
        input: {},
        placeholder: "保存后自动生成",
      },
      {
        title: "赔案号",
        key: "key2",
        disabled: true,
        input: {},
        placeholder: "保存后自动生成",
      },
      {
        title: "报案时间",
        key: "key3",
        disabled: true,
        date: {
          type: 'datetime',
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        },
      },
      {
        title: "赔案案件类别",
        key: "key4",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
        rules: [ruleOpt.required("请选择赔案案件类别")],
      },
      {
        title: "报案方式",
        key: "key5",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
      },
      {
        title: "报案人Email",
        key: "key6",
        input: {},
        placeholder: "请输入报案人Email",
      },
      {
        title: "调度方式",
        key: "key7",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
        rules: [ruleOpt.required("请选择调度方式")],
      },
      {
        title: "报案人类别",
        key: "key8",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
      },
      {
        title: "报案人姓名",
        key: "key9",
        input: {},
        placeholder: "请输入报案人姓名",
        rules: [ruleOpt.required("请输入报案人姓名")],
      },
      {
        title: "报案人电话",
        key: "key10",
        input: {},
        placeholder: "请输入报案人电话",
        rules: [ruleOpt.required("请输入报案人电话")],
      },
      {
        title: "与被保人关系",
        key: "key11",
        select: {
          options: [{ key: 1, value: '本地查勘' }, { key: 2, value: '异地查勘' }]
        },
        rules: [ruleOpt.required("请选择与被保人关系")],
      },
      {
        title: "联系人姓名",
        key: "key12",
        input: {},
        placeholder: "请输入联系人姓名",
      },

      cityOpt.create({
        title: '地址',
        col: 16,
        info: this.infoData,
        // disabled: true
      }),
      {
        title: "备注",
        key: "key14",
        col: 24,
        input: { type: 'textarea' },
        placeholder: "请输入备注",
      },
    ];
  }
}
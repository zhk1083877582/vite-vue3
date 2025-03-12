import { Opt } from "@/components/com/Opt.js";

export class searchOpt extends Opt {
  create() {
    let list = []
    let showSearch = [{
      title: "报案号",
      key: "key1",
      col: 4,
      placeholder: "请输入",
      input: {},
    },
    {
      title: "报案人",
      key: "key2",
      placeholder: "请输入",
      input: {},
    },
    {
      key: "key3",
      title: "任务类型",
      placeholder: "全部",
      select: {
        options: [
          { key: "-1", value: "全部" },
          { key: "1", value: "任务类型1" },
          { key: "0", value: "任务类型2" },
        ],
      },
    },
    {
      key: "key4",
      title: "任务状态",
      placeholder: "全部",
      select: {
        options: [
          { key: "-1", value: "全部" },
          { key: "1", value: "任务状态1" },
          { key: "0", value: "任务状态2" },
        ],
      },
    },
    {
      title: "被保险人",
      key: "key5",
      placeholder: "请输入",
      input: {},
    },
    {
      title: "出险人",
      key: "key6",
      placeholder: "请输入",
      input: {},
    },
    {
      key: "key8",
      title: "处理机构",
      placeholder: "请选择",
      select: {
        options: [
          { key: "-1", value: "全部" },
          { key: "1", value: "处理机构1" },
          { key: "0", value: "处理机构2" },
        ],
      },
    }]
    let hideSearch = [{
      title: "出险时间",
      key: "key7",
      placeholder: "请输入",
      date: {
        type: 'date'
      },
    },
    {
      title: "报案时间",
      key: "key9",
      placeholder: "请输入",
      date: {
        type: 'date'
      },
    },
    {
      title: "任务完成时间",
      key: "key10",
      placeholder: "请输入",
      date: {
        type: 'date'
      },
    },]
    if (this.showAdvanced()) {
      list = [...showSearch, ...hideSearch]
    } else {
      list = showSearch
    }
    return list
  }
}

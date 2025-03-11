import { Opt } from "@/components/com/Opt.js";

export class searchOpt extends Opt {
  create() {
    return [{
      title: "报案号",
      key: "key1",
      col: 4,
      placeholder: "请输入",
      input: {},
    }, {
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
    },]
  }
}

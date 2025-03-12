import { Opt } from "@/components/com/Opt.js";

export class listColumn extends Opt {
  constructor(fun) {
    super(fun);
  }
  create() {
    return [
      {
        title: "序号",
        minWidth: 50,
        type: "index",
        fixed: "left",
      },
      {
        field: "orgName",
        title: "任务类型",
        minWidth: 150,
      },
      {
        field: "workNo",
        title: "报案号",
        minWidth: 90,

      },
      {
        field: "times",
        minWidth: 160,
        title: '被保险人'
      },
      {
        field: "userName",
        title: "损失名称",
        minWidth: 100,
      },
      {
        field: "times",
        minWidth: 160,
        title: '调查案件'
      },
      {
        field: "times",
        minWidth: 160,
        title: '报案时间'
      },
      {
        field: "times",
        minWidth: 160,
        title: '任务状态'
      },


      {
        field: "operate",
        title: "操作",
        fixed: "right",
        minWidth: 100,
        cell: (info) => {
          return {
            btn: [
              {
                title: "编辑",
                color: "#3366FF",
                click: (row) => {
                  this.onEdit(row);
                },
              },
            ],
          };
        },
      },
    ];
  }
}

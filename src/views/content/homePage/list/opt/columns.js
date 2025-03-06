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
        field: "authOrgNames",
        title: "赔案号",
        minWidth: 150,

      },
      {
        field: "workNo",
        title: "节点名称",
        minWidth: 90,
      },
      {
        field: "userName",
        title: "案件状态",
        minWidth: 100,
      },
      {
        field: "phone",
        title: "投保人名称",
        minWidth: 120,
      },
      {
        field: "roleNames",
        title: "险种",
        minWidth: 110,
        sort: {
          key: 'clockCountSort',
          asc: 1,
          desc: 2
        }
      },
      {
        field: "authOrgNames",
        title: "流入时间",
        minWidth: 220,
      },
      {
        field: "operate",
        title: "操作",
        fixed: "right",
        width: 80,
        cell: (info) => {
          return {
            btn: [
              {
                title: "查看",
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

import { Opt } from "@/components/com/Opt.js";

export class listColumn extends Opt {
  constructor(fun) {
    super(fun);
  }
  create() {
    return [

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
      }, {
        field: "times",
        minWidth: 160,
        title: '滞留时长'
      }, {
        field: "times",
        minWidth: 160,
        title: '任务金额'
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
                title: "认领",
                click: (row) => {
                  this.onClaim(row);
                },
              },
              {
                title: "派工",
                click: (row) => {
                  this.onSend(row);
                },
              },
            ],
          };
        },
      },
    ];
  }
}

export function getTabsList() {
  return [
    {
      key: 1,
      label: "查勘任务",
      taskNum: 200
    },
    {
      key: 2,
      label: "立案任务",
      taskNum: 201
    },
    {
      key: 3,
      label: "跟踪任务",
      taskNum: 201
    },
    {
      key: 4,
      label: "定损任务",
      taskNum: 201
    },
    {
      key: 5,
      label: "核损任务",
      taskNum: 201
    },
    {
      key: 6,
      label: "理算任务",
      taskNum: 201
    },
    {
      key: 7,
      label: "核赔任务",
      taskNum: 201
    },
    {
      key: 8,
      label: "重开案审核",
      taskNum: 201
    },
    {
      key: 9,
      label: "立案注销审核",
      taskNum: 201
    },
    {
      key: 10,
      label: "预付审核",
      taskNum: 201
    },
    {
      key: 11,
      label: "费用审核",
      taskNum: 201
    },
    {
      key: 12,
      label: "未决审核",
      taskNum: 201
    },
    {
      key: 13,
      label: "追偿任务",
      taskNum: 201
    },
    {
      key: 14,
      label: "残值审核",
      taskNum: 201
    },
    {
      key: 15,
      label: "退票任务",
      taskNum: 201
    },
    {
      key: 16,
      label: "简易案件任务",
      taskNum: 201
    },
    {
      key: 17,
      label: "大案上报任务",
      taskNum: 201
    },
    {
      key: 18,
      label: "其他审核任务",
      taskNum: 201
    },
    {
      key: 19,
      label: "审核任务池",
      taskNum: 201
    },
    {
      key: 20,
      label: "已完成任务",
      taskNum: 201
    }
  ]
}
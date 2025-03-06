import { Opt } from "@/components/com/Opt.js";
// import rolesOpt from "@/option/roles.js";
// import organApi from "@/biz/organization";

export class searchOpt extends Opt {
  create() {
    console.log(this, '1122')

    return [
      {
        title: "机构部门",
        groupNum: '0',
        group: [
          {
            key: "orgId",
            placeholder: "请选择",
            col: 20,
            disabled: true,
            select: {
              options: [],
              maxTagCount: 1,
            },
            load: (o) => {
              console.log("🚀 ~ searchOpt ~ create ~ o:", o);
              o.select.options = this.getOrglist()
              // o.select.options = [
              //   { key: "-1", value: "全部" },
              //   { key: "1", value: "组织1" },
              //   { key: "2", value: "组织2" },
              // ];
              // organApi.getOrganization().then((res) => {
              //     if (res.length == 0) return false;
              //     res.unshift({ key: "-1", value: "全部" });
              //     o.select.options = res;
              // });
            },
          }, {
            col: 4,
            button: {
              icon: 'Search',
              style: {
                width: '100%',
                height: "100%"
              },
              click: () => {
                this.showOrgModal()
              }
            }
          }
        ]

      },
      {
        title: "保单号",
        key: "userName",
        placeholder: "请输入",
        input: {},
      },
      {
        title: "赔案号",
        key: "userName1",
        placeholder: "请输入",
        input: {},
      },
      {
        key: "positionStatus",
        title: "险类代码",
        placeholder: "请选择",
        select: {
          options: [
            { key: "-1", value: "全部" },
            { key: "1", value: "险类1" },
            { key: "0", value: "险类2" },
          ],
        },
      },
      {
        key: "positionStatus1",
        title: "产品",
        placeholder: "清选择",
        select: {
          multiple: true,
          options: [
            { key: "1", value: "产品1" },
            { key: "0", value: "产品2" },
          ],
        },
      },
      {
        key: "dateTime1",
        title: "报案时间",
        placeholder: "清选择",
        date: {
          type: 'datetime',
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        }
      },
      {
        key: "dateTime2",
        title: "报案时间",
        placeholder: "清选择",
        date: {
          type: 'datetime',
          valueFormat: 'YYYY-MM-DD HH:mm:ss'

        }
      }
    ];
  }
}

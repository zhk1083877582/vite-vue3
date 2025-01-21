import { Opt } from '@/components/com/Opt.js'
// import rolesOpt from "@/option/roles.js";
// import organApi from "@/biz/organization";

export class searchOpt extends Opt {
  create() {
    return [
      {
        title: '组织',
        key: 'orgId',
        placeholder: '全部',
        select: {
          options: []
        },
        load: (o) => {
          // organApi.getOrganization().then((res) => {
          //     if (res.length == 0) return false;
          //     res.unshift({ key: "-1", value: "全部" });
          //     o.select.options = res;
          // });
        }
      },
      {
        title: '员工',
        key: 'userName',
        placeholder: '请输入员工姓名或工号',
        input: {}
      },
      // rolesOpt.create({
      //     key: "roleIds",
      //     title: "角色",
      //     multiple: false,
      //     showAll: true,
      //     rules: [],
      // }),
      {
        key: 'positionStatus',
        title: '状态',
        placeholder: '全部',
        select: {
          options: [
            { key: '-1', value: '全部' },
            { key: '1', value: '在职' },
            { key: '0', value: '离职' }
          ]
        }
      },
      {
        key: 'state',
        title: '人员状态',
        placeholder: '全部',
        select: {
          options: [
            { key: '-1', value: '全部' },
            { key: '1', value: '启用' },
            { key: '0', value: '禁用' }
          ]
        }
      },
      {
        key: 'commissionMonth',
        title: '月份',
        placeholder: '全部',
        date: {
          type: 'month'
        }
      },
      {
        key: 'time',
        title: '时间',
        date: {
          type: 'daterange'
        }
      }
    ]
  }
}

import { Opt } from "@/components/com/Opt.js";

export class payOpt extends Opt {
  constructor(vm) {
    super(vm);
  }
  create() {
    return [
      [
        {
          title: "结算对象",
          key: "shopName",
          text: {},
        },
        {
          title: "本次结算渠道费用",
          key: "settlementAmount",
          text: {
            type: "number",
            unit: "元",
          },
        },
      ],
      [
        {
          title: "本次抵扣预付金",
          key: "thisDeductionAmount",
          text: {
            type: "number",
            unit: "元",
          },
        },
        {
          title: "本次实际支付金额",
          key: "thisPayAmount",
          text: {
            type: "number",
            unit: "元",
          },
        },
      ],
      [
        {
          title: "未税金额",
          key: "noTaxAmount",
          text: {
            type: "number",
            unit: "元",
          },
        },
        {
          title: "税额",
          key: "taxAmount",
          text: {
            type: "number",
            unit: "元",
          },
        },
      ],
      [
        {
          title: "关联OA供应商名称",
          key: "supplierName",
          text: {},
        },
        {
          title: "收款方开户行",
          key: "payeeBank",
          text: {},
        },
      ],
      [
        {
          title: "收款方账号",
          key: "payeeAccount",
          text: {},
        },
        {
          title: "约定/期待付款日期",
          key: "expectPayDate",
          // visible: this.getDetailInfo().thisPayAmount != 0,
          text: {},
        },
      ],
      [
        {
          title: "成本中心代码",
          key: "costCode",
          text: {},
        },
      ],
      [
        {
          title: "入账公司",
          key: "accountingCompany",
          text: {},
        },
        {
          title: "入账公司编码",
          key: "accountingCompanyCode",
          text: {},
        },
      ],
    ];
  }
}

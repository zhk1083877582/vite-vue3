import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule.js";
import uploadOpt from "@/option/upload.js";

import toolMgr from "@/biz/file.js";
// function accessory(info) {
//     let api = toolMgr.upload();
//     let files = [];
//     if (info.infoData.imglist && info.infoData.imglist.length > 0) {
//         info.infoData.imglist.forEach((item) => {
//             if (item) {
//                 files.push({
//                     name: item.name,
//                     url: item.url,
//                 });
//             }
//         });
//     }
//     console.log(files, "files");
//     return [
//         {
//             title: "upload",
//             key: "imglist",
//             uploadImg: {
//                 title: "",
//                 api,
//                 files,
//                 multiple: false,
//                 hideDel: true,
//                 preview: (file) => {
//                     toolMgr.downloadFile(file.url, file.name);
//                 },
//                 show: false,
//                 maxlength: 10,
//                 format: ["jpg", "jpeg", "png"],
//                 style: {},
//             },
//             data: {
//                 to: (v) => {
//                     console.log("🚀 ~ accessory ~ v:", v);
//                     let imglist = v.map((item) => {
//                         return {
//                             name: item.name,
//                             url: item.response
//                                 ? item.response.data.imageURL
//                                 : item.url,
//                         };
//                     });
//                     // info.editChannelAttach(images);
//                     return { imglist };
//                 },
//             },
//         },
//     ];
// }
export class editOpt extends Opt {
  constructor(vm) {
    super(vm);
    this.info = this.infoData;
  }
  switchRules() {
    return this.infoData.switch1
      ? [
        ruleOpt.required(`visibleSelect不能为空`, "array"),
        ruleOpt.check(`visibleSelect不能为空`, value => {
          let flag = true;
          flag = this.infoData.visibleSelect == "";
          return flag;
        })
      ]
      : [];
  }
  create() {
    let part1 = reactive({
      key: "visibleSelect",
      placeholder: "select1",
      visible: false,
      select: {
        options: [],
        multiple: true,
        maxTagCount: 2
      },
      load: o => {
        o.select.options = [
          { key: "1", value: "1111" },
          { key: "2", value: "2222" },
          { key: "3", value: "3333" },
          { key: "4", value: "4444" }
        ];
      }
      // rules: [ruleOpt.required("select1不能为空", "array")],
    });

    return [
      uploadOpt.image(
        {
          title: "upload",
          key: "imglist",
          multiple: false,
          hideDel: false,
          preview: file => {
            // toolMgr.downloadFile(file.url, file.name);
          },
          show: false,
          maxlength: 10
        },
        this.infoData
      ),
      {
        title: "盖章单",
        key: "filesData",
        placeholder: "(最大支持50M文件，若文件过大请压缩或分多个文件)",
        upload: {
          maxSize: 51200,
          title: "附件上传",
          api: toolMgr.unloadFile(),
          files: [],
          multiple: true,
          disabled: true,
          showDel: false,
          showList: true,
          accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
          preview: file => {
            console.log("🚀 ~ editOpt ~ create ~ file:", file);
            toolMgr.downloadFile(file.url, file.name);
          }
        },
        data: {
          to: v => {
            console.log("🚀 ~ editOpt ~ create ~ v:", v);
            return {
              filesData: v.map(item => {
                return {
                  name: item.name,
                  url: item.response?.data.imageURL ?? item.url
                };
              })
            };
          }
        },
        rules: [
          {
            required: true,
            message: "请上传filesData",
            type: "array",
            trigger: "blur"
          }
        ]
      },
      [
        {
          title: "number格式",
          key: "number1",
          // labelWidth: "150",
          text: {
            type: "number",
            tooltip: true,
            color: "red",
            tipsTxt: `asdasdasdasd`
          }
        },
        {
          title: "date格式",
          key: "date1",
          text: {
            type: "date",
            tooltip: true,
            color: "red",
            tipsTxt: `asdasdasdasd`
          }
        }
      ],
      {
        title: "文件附件",
        key: "filesData",
        file: {
          click: itm => {
            toolMgr.downloadFile(itm.url, itm.name);
          }
        },
        data: {
          from: info =>
            info.filesData?.map(itm => ({
              url: itm.url,
              tip: itm.dateTIme,
              name: itm.name
            }))
        }
      },
      {
        title: "菜单名称",
        key: "title",
        col: 12,
        input: {
          maxlength: 20,
          suffixIcon: "Calendar",
          prefixIcon: "Search"
          // prependTxt: "123",
          // appendTxt: "456",
        },
        placeholder: "请输入菜单名称",
        rules: [ruleOpt.required("菜单名称不能为空")]
      },
      [
        {
          title: "日期",
          key: "day1",
          date: {
            type: "date"
          },
          // disabled: true,
          placeholder: "日期"
          // rules: [ruleOpt.required("日期不能为空", "date")],
        },
        {
          title: "日期2",
          key: "day2",
          date: {
            type: "daterange"
          },
          // disabled: true,
          placeholder: "日期"
          // rules: [ruleOpt.required("日期不能为空", "array")],
        }
      ],
      [
        {
          title: "日期3",
          key: "day3",
          date: {
            type: "datetimerange",
            valueFormat: "YYYY-MM-DD HH:mm:ss"
          },
          // disabled: true,
          placeholder: "日期"
          // rules: [ruleOpt.required("日期不能为空", "array")],
        },
        {
          title: "时间",
          key: "date3",
          TimePicker: {
            type: "timerange"
            // focus: (val, option) => {
            //     console.log(
            //         "🚀 ~ editOpt ~ create ~ val, option:",
            //         val,
            //         option
            //     );
            // },
          },
          // disabled: true,

          placeholder: "时间"
          // rules: [ruleOpt.required("时间不能为空", "array")],
        }
      ],

      [
        {
          title: "select1",
          key: "select1",
          placeholder: "select1",
          disabled: true,
          select: {
            options: [],
            multiple: true,
            maxTagCount: 2
          },
          load: o => {
            o.select.options = [
              { key: "1", value: "1111" },
              { key: "2", value: "2222" },
              { key: "3", value: "3333" },
              { key: "4", value: "4444" }
            ];
          }
          // rules: [ruleOpt.required("select1不能为空", "array")],
        },
        {
          title: "select2",
          key: "select2",
          placeholder: "select2",
          select: {
            options: [],
            multiple: false,
            clearable: true
          },
          load: o => {
            o.select.options = [
              { key: "1", value: "1" },
              { key: "2", value: "2" },
              { key: "3", value: "3" },
              { key: "4", value: "4" }
            ];
          }
          // rules: [ruleOpt.required("select2不能为空")],
        }
      ],
      [
        {
          title: "radio1",
          key: "radio1",
          radio: {
            options: [
              {
                value: "入口",
                key: 1
              },
              {
                value: "按钮",
                key: 2
              }
            ]
          }
          // rules: [ruleOpt.required("radio1", "number")],
        },
        {
          title: "checkBox",
          key: "checkBox1",
          disabled: false,
          checkbox: {
            options: []
          },
          load: o => {
            o.checkbox.options = [
              { key: "1", value: "1" },
              { key: "2", value: "2" },
              { key: "3", value: "3" },
              { key: "4", value: "4" }
            ];
          }
          // rules: [
          //     {
          //         type: "array",
          //         required: true,
          //         message: "checkBox1不能为空",
          //         trigger: "blur,change",
          //     },
          // ],
        }
      ],
      {
        title: "button1",
        key: "button1",
        // visible: false,
        group: [
          {
            button: {
              title: "button1",
              type: "primary",
              click: () => {
                console.log("🚀 ~ editOpt ~ create ~ click: button1");
              }
            }
          },
          {
            button: {
              title: "button2",
              type: "success",
              click: () => {
                console.log("🚀 ~ editOpt ~ create ~ click: button1");
              }
            }
          },
          {
            button: {
              title: "button3",
              type: "warning",
              click: () => {
                console.log("🚀 ~ editOpt ~ create ~ click: button1");
              }
            }
          },
          {
            button: {
              title: "button4",
              type: "danger",
              click: () => {
                console.log("🚀 ~ editOpt ~ create ~ click: button1");
              }
            }
          },
          {
            button: {
              title: "button5",
              type: "info",
              click: () => {
                console.log("🚀 ~ editOpt ~ create ~ click: button1");
              }
            }
          }
          // {
          //     button: {
          //         title: "button6",
          //         type: "text",
          //         click: () => {
          //             console.log(
          //                 "🚀 ~ editOpt ~ create ~ click: button1"
          //             );
          //         },
          //     },
          // },
        ]
      },
      {
        title: "tag1",
        key: "tag1",
        // visible: false, //垫付
        tag: {
          closable: false,
          options: [
            { key: "1", value: "1" },
            { key: "2", value: "2" }
          ],
          click: tag => {
            console.log("🚀 ~ editOpt ~ create ~ tag:", tag);
          }
        }
      },
      {
        title: "Image",
        key: "imglist",
        // visible: false, //垫付
        image: {}
      },
      {
        title: "cascader",
        placeholder: "请选择cascader",
        key: "cascaderIds",
        cascader: {
          filterable: true,
          changeOnSelect: true,
          expandTrigger: "hover",
          emitPath: true,
          value: "value",
          lable: "label",
          chilidren: "children",
          options: [
            {
              value: "1",
              label: "一级 1",
              children: [
                {
                  value: "1-1",
                  label: "二级 1-1",
                  children: [
                    {
                      value: "1-1-1",
                      label: "三级 1-1-1"
                    }
                  ]
                }
              ]
            },
            {
              value: "2",
              label: "一级 2",
              children: [
                {
                  value: "2-1",
                  label: "二级 2-1",
                  children: [
                    {
                      value: "2-1-1",
                      label: "三级 2-1-1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        title: "switch1",
        key: "visibleSelect",
        group: [
          {
            key: "switch1",
            col: 4,
            switch: {
              // openText: "上传",
              // closeText: "后补",
              size: "large"
            },
            tips: "switch1",
            change: v => {
              console.log("🚀 ~ editOpt ~ create ~ v:", v, this.switchRules());
              part1.visible = v.value;
              this.updateEdit();
              this.opts[10].rules = this.switchRules();
            }
          },
          part1
        ],
        rules: []
      },
      {
        title: "dt-time",
        key: "dtTime",
        dtTime: {
          dateType: "month",
          dateFormat: "YYYY-MM",
          transfer: false,
          clearable: true
        },
        rules: [
          ruleOpt.timeInterval(2),
          ruleOpt.check("不支持选择单边日期", value => {
            if (!value) return false;
            return (value[0] == "") ^ (value[1] == "");
          })
        ]
      },
      {
        title: "dt-time",
        key: "dtTime2",
        dtTime: {
          dateType: "datetime",
          dateFormat: "YYYY-MM-DD HH:mm:ss",
          transfer: false,
          clearable: true,
          isStartOption: false
        },
        rules: [
          ruleOpt.timeInterval(2),
          ruleOpt.check("不支持选择单边日期", value => {
            if (!value) return false;
            return (value[0] == "") ^ (value[1] == "");
          })
        ]
      }
    ];
  }
}

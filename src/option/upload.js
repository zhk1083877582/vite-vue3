import toolMgr from "@/biz/file.js";
// import oss from '@/config/oss'

function image(opt = {}, info = {}) {
    // key title itemName itemUrl
    let api = toolMgr.unloadFile();
    let files = [];
    let itemName = opt.itemName ?? "name";
    let itemUrl = opt.itemUrl ?? "url";
    if (info[opt.key]?.length > 0) {
        files = info[opt.key].map((item) => {
            return {
                name: item[itemName],
                url: item[itemUrl],
            };
        });
    }
    return {
        title: opt.title,
        key: opt.key,
        visible: opt.visible == false ? false : true,
        placeholder: opt.placeholder,
        uploadImg: {
            title: opt.title,
            api,
            files,
            multiple: opt.multiple ?? false,
            show: opt.show ?? false,
            hideDel: opt.hideDel ?? false,
            maxlength: opt.maxlength ?? 10,
            format: opt.format || ["jpg", "jpeg", "png"],
        },
        rules: opt.rules,
        data: {
            to: (v) => {
                return {
                    [opt.key]: v.map((item) => {
                        return {
                            [itemName]: item.name,
                            [itemUrl]: item.response
                                ? item.response.data.imageURL
                                : item.url,
                        };
                    }),
                };
            },
        },
    };
}

function video(opt = {}, info = {}) {
    // key title itemName itemUrl
    let api = toolMgr.unloadFile();
    let files = [];
    let itemName = opt.itemName ?? "name";
    let itemUrl = opt.itemUrl ?? "url";
    if (info[opt.key]?.length > 0) {
        files = info[opt.key].map((item) => {
            return {
                name: item[itemName],
                url: item[itemUrl],
            };
        });
    }
    let uploadImg = {
        title: opt.title,
        type: "video",
        api,
        files,
        multiple: opt.multiple ?? false,
        show: opt.show ?? false,
        hideDel: opt.hideDel ?? false,
        maxlength: opt.maxlength ?? 10,
        percent: 0,
        format: ["mp4"],
        maxSize: 1048576,
        before: (file) => {
            // oss
            //   .uploadVideo(file, (res) => {
            //     uploadImg.percent = Math.round(res * 100)
            //   })
            //   .then((res) => {
            //     info[opt.key] = [
            //       ...info[opt.key],
            //       {
            //         [itemName]: res.name,
            //         [itemUrl]: res.url
            //       }
            //     ]
            //   })
            return false;
        },
    };
    return {
        title: opt.title,
        key: opt.key,
        uploadImg,
        rules: opt.rules,
        data: {
            to: (v) => {
                return {
                    [opt.key]: v.map((item) => {
                        return {
                            [itemName]: item.name,
                            [itemUrl]: item.response
                                ? item.response.data.imageURL
                                : item.url,
                        };
                    }),
                };
            },
        },
    };
}

function vr(opt = {}, info = {}) {
    console.log(opt);
    // key title itemName itemUrl
    let api = toolMgr.unloadFile();
    let files = [];
    let itemName = opt.itemName ?? "name";
    let itemUrl = opt.itemUrl ?? "url";
    if (info[opt.key]?.length > 0) {
        files = info[opt.key].map((item) => {
            return {
                name: item[itemName],
                url: item[itemUrl],
            };
        });
    }
    let uploadImg = {
        title: opt.title,
        type: "vr",
        api,
        files,
        multiple: opt.multiple ?? false,
        show: opt.show ?? false,
        hideDel: opt.hideDel ?? false,
        maxlength: opt.maxlength ?? 10,
        percent: 0,
        format: ["zip"],
        maxSize: 1048576,
        before: (file) => {
            oss.uploadVR(file, (res) => {
                uploadImg.percent = Math.round(res * 100);
            }).then((res) => {
                console.log(res);
                info[opt.key] = [
                    ...info[opt.key],
                    {
                        [itemName]: res.name,
                        [itemUrl]: res.vr,
                    },
                ];
            });
            return false;
        },
    };
    return {
        title: opt.title,
        key: opt.key,
        uploadImg,
        rules: opt.rules,
        placeholder: opt.placeholder,
        data: {
            to: (v) => {
                return {
                    [opt.key]: v.map((item) => {
                        return {
                            [itemName]: item.name,
                            [itemUrl]: item.response
                                ? item.response.data.imageURL
                                : item.url,
                        };
                    }),
                };
            },
        },
    };
}

function fileOss(opt = {}, info = {}) {
    // key title itemName itemUrl
    let api = toolMgr.unloadFile();
    let files = [];
    let itemName = opt.itemName ?? "name";
    let itemUrl = opt.itemUrl ?? "url";
    if (info[opt.key]?.length > 0) {
        files = info[opt.key].map((item) => {
            return {
                name: item[itemName],
                url: item[itemUrl],
            };
        });
    }
    let upload = {
        title: opt.title,
        // type: 'video',
        api,
        files,
        multiple: opt.multiple ?? false,
        show: opt.show ?? false,
        showDel: opt.showDel ?? false,
        hideDel: opt.hideDel ?? false,
        maxlength: opt.maxlength ?? 10,
        placeholder: opt.placeholder ?? "",
        percent: 0,
        // format: ['mp4'],
        maxSize: opt.maxSize ?? 1048576,
        before: (file) => {
            // Message.loading({
            //   content: '上传中',
            //   duration: 0
            // })
            oss.uploadFile(file, (res) => {
                upload.percent = Math.round(res * 100);
            }).then((res) => {
                console.log(res, "vvvvvvv");
                info[opt.key] = [
                    ...info[opt.key],
                    {
                        [itemName]: res.name,
                        [itemUrl]: res.url,
                    },
                ];
                upload.files = info[opt.key];
                console.log(info[opt.key], "1111");
                // Message.destroy()
            });

            return false;
        },
    };
    return {
        title: opt.title,
        key: opt.key,
        upload,
        rules: opt.rules,
        data: {
            to: (v) => {
                return {
                    [opt.key]: v.map((item) => {
                        return {
                            [itemName]: item.name || item.accessoryName,
                            [itemUrl]: item.response
                                ? item.response.data.imageURL
                                : item.url || item.accessoryUrl,
                        };
                    }),
                };
            },
        },
    };
}

export default {
    image,
    video,
    fileOss,
    vr,
};

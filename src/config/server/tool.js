import dt from "@lr17/lr";
import moment from "moment";

function getVal(info, key) {
    let arr = key.split(".");
    let val = info;
    for (let idx = 0; idx < arr.length; idx++) {
        let key = arr[idx];
        if (val[key] != null) {
            val = val[key];
        } else {
            return null;
        }
    }
    return val;
}

//数组对象深拷贝
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                //判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = this.deepClone(obj[key]);
                } else {
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

function clearStorage(mess) {
    if (mess) {
        mess.forEach((item) => {
            dt.session.remove(item);
        });
    } else {
        dt.session.clear();
    }
}

// 判断日期差
function dateDiff(d1, d2) {
    d1 = new Date(d1.replace(/-/g, "/"));
    d2 = new Date(d2.replace(/-/g, "/"));
    var obj = {},
        M1 = d1.getMonth(),
        D1 = d1.getDate(),
        M2 = d2.getMonth(),
        D2 = d2.getDate();
    obj.Y =
        d2.getFullYear() -
        d1.getFullYear() +
        (M1 * 100 + D1 > M2 * 100 + D2 ? -1 : 0);
    obj.M = (obj.Y > 0 ? obj.Y * 12 : 12) + M2 - M1 + (D1 > D2 ? -1 : 0);
    obj.s = Math.floor((d2 - d1) / 1000); //差几秒
    obj.m = Math.floor(obj.s / 60); //差几分钟
    obj.h = Math.floor(obj.m / 60); //差几小时
    obj.D = Math.floor(obj.h / 24); //差几天
    return obj;
}

// 日期时分秒处理
function handleDateRange(val) {
    if (val && val.length == 2) {
        if (val[0].length > 0) {
            val[0] = val[0]
                ? val[0].length <= 10
                    ? val[0] + " 00:00:00"
                    : val[0]
                : "";
            val[1] = val[1]
                ? val[1].length <= 10
                    ? val[1] + " 23:59:59"
                    : val[1]
                : "";
        } else {
            // val[0] = null
            // val[1] = null
        }
    }
    return val;
}

/**
 * 获取元素到顶部距离-通用方法
 *
 */
function getPositionTop(node) {
    if (node) {
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while (parent != null) {
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top;
    } else {
        return 0;
    }
}

// 日期范围校验
function checkDate(startDate, endDate, msg, time = 2) {
    if (dateDiff(startDate, endDate).Y >= time) {
        // 日期最大跨度两年
        dt.ui.Message.warning(msg);
    }
    return !(dateDiff(startDate, endDate).Y >= time);
}

//日期选择器格式化日期
function resovleTime(type, date) {
    let chooseTime = {};
    // type 0 昨日 1 今日 2本周 3本月 4本年
    let time = date ? new Date(date) : new Date();
    switch (type) {
        case 0:
            time.setTime(time.getTime() - 24 * 60 * 60 * 1000);
            var curTime =
                time.getFullYear() +
                "-" +
                (time.getMonth() + 1 > 9
                    ? time.getMonth() + 1
                    : "0" + (time.getMonth() + 1)) +
                "-" +
                (time.getDate() > 9 ? time.getDate() : "0" + time.getDate());
            chooseTime = {
                startTime: curTime + " 00:00:00",
                endTime: curTime + " 23:59:59",
            };
            break;
        case 1:
            time.setTime(time.getTime());
            var curTime =
                time.getFullYear() +
                "-" +
                (time.getMonth() + 1 > 9
                    ? time.getMonth() + 1
                    : "0" + (time.getMonth() + 1)) +
                "-" +
                (time.getDate() > 9 ? time.getDate() : "0" + time.getDate());
            chooseTime = {
                startTime: curTime + " 00:00:00",
                endTime: curTime + " 23:59:59",
            };
            break;
        case 2:
            chooseTime = {
                startTime:
                    moment(time).startOf("isoWeek").format("YYYY-MM-DD") +
                    " 00:00:00",
                endTime:
                    moment(time).endOf("isoWeek").format("YYYY-MM-DD") +
                    " 23:59:59",
            };
            break;
        case 3:
            chooseTime = {
                startTime:
                    moment(time).startOf("month").format("YYYY-MM-DD") +
                    " 00:00:00",
                endTime:
                    moment(time).endOf("month").format("YYYY-MM-DD") +
                    " 23:59:59",
            };
            break;
        case 4:
            var startTime = time.getFullYear() + "-01-01" + " 00:00:00";
            var endTime = time.getFullYear() + "-12-31" + " 23:59:59";
            chooseTime = {
                startTime: startTime,
                endTime: endTime,
            };
            break;
        default:
            break;
    }
    return chooseTime;
}
//  数组扁平化
function flattenArr(arr) {
    return arr.reduce((result, item) => {
        return result.concat(
            item,
            Array.isArray(item.children) ? flattenArr(item.children) : []
        );
    }, []);
}

//金额转换成三位分割法
function formatterMoney(val) {
    return val != "-" && val != undefined
        ? Number(val).toLocaleString().includes(".")
            ? Number(val).toLocaleString()
            : Number(val).toLocaleString() + ".00"
        : "-";
}

function getBrowserType() {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1; // Opera浏览器
    var isIE10orLess =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // IE10以下
    var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1; // IE11
    var isFirefox = userAgent.indexOf("Firefox") > -1; // 火狐浏览器
    var isSafari =
        userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; // Safari浏览器
    var isChrome = // 谷歌浏览器
        userAgent.indexOf("Chrome") > -1 &&
        userAgent.indexOf("Safari") > -1 &&
        userAgent.indexOf("Edge") === -1;
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE10orLess; // Edge浏览器

    var trident = userAgent.indexOf("Trident") > -1; //IE内核
    var presto = userAgent.indexOf("Presto") > -1; //opera内核
    var webKit = userAgent.indexOf("AppleWebKit") > -1; //苹果、谷歌内核
    var gecko =
        userAgent.indexOf("Gecko") > -1 && userAgent.indexOf("KHTML") === -1; //火狐内核
    var mobile = !!userAgent.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
    var ios = !!userAgent.match(/\(i[^;]+;( userAgent;)? CPU.+Mac OS X/); //ios终端
    var android =
        userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1; //android终端
    var iPhone = userAgent.indexOf("iPhone") > -1; //是否为iPhone或者QQHD浏览器
    var iPad = userAgent.indexOf("iPad") > -1; //是否iPad
    var webApp = userAgent.indexOf("Safari") === -1; //是否web应该程序，没有头部与底部
    var weixin = userAgent.indexOf("MicroMessenger") > -1; //是否微信 （2015-01-22新增）
    var qq = userAgent.match(/\sQQ/i) === " qq"; //是否QQ
    var windowPhone = userAgent.indexOf("Windows Phone") > -1;
    if (isIE10orLess) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion === 7) {
            return "IE7";
        } else if (fIEVersion === 8) {
            return "IE8";
        } else if (fIEVersion === 9) {
            return "IE9";
        } else if (fIEVersion === 10) {
            return "IE10";
        } else {
            return "0";
        } //IE版本过低
    }
    if (isIE11) {
        return "IE11";
    }
    if (isFirefox) {
        return "Firefox";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}
function systemType() {
    let agent = navigator.userAgent.toLowerCase();
    let windows = agent.indexOf("win") > -1 || agent.indexOf("wow") > -1;
    let Linux = String(navigator.platform).indexOf("Linux") > -1;
    let mac = /macintosh|mac x/i.test(agent);
    let iOS = !!agent.match(/\(i[^;]+;( u;)? cpu.+mac os x/);
    let android = agent.indexOf("android") > -1 || agent.indexOf("adr") > -1;

    if (windows) return "Windows";
    if (Linux && !android) return "Linux ";
    if (mac) return "iOS";
    if (iOS) return "iOS";
    if (android) return "Android";
}

function floatRound(myFloat, mfNumber) {
    if (mfNumber == 0) {
        return Math.round(myFloat);
    } else {
        var cutNumber = Math.pow(10, mfNumber);
        return Math.round((myFloat + 0.000000000001) * cutNumber) / cutNumber;
    }
}

function formatDate(date) {
    var year = "";
    var month = "";
    var day = "";
    var now = date;
    year = "" + now.getFullYear();
    if (now.getMonth() + 1 < 10) {
        month = "0" + (now.getMonth() + 1);
    } else {
        month = "" + (now.getMonth() + 1);
    }
    if (now.getDate() < 10) {
        day = "0" + now.getDate();
    } else {
        day = "" + now.getDate();
    }
    return year + "-" + month + "-" + day;
}

/**
 * 图片压缩
 * @param {文件} file
 * quality 压缩质量
 */
function compressImg(file, quality) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        //获取原图的base64
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

        img.onload = function () {
            // 当图片宽度超过 700px 时, 就压缩成 700px, 高度按比例计算 // 压缩质量可以根据实际情况调整
            var w = Math.min(700, img.width);
            var h = img.height * (w / img.width);
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            //将canvas转成base64第二个参数是设置质量（越大越好最大1）
            let newFile = base64UrlToBlob(
                canvas.toDataURL("image/jpg", quality),
                file.name
            );
            resolve(newFile);
        };
    });
}

/*这里转blob 转file*/
function base64UrlToBlob(urlData, name) {
    let arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
        bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    //转file
    return new File([u8arr], name, {
        type: mime,
    });
    // 转Blob
    // return new Blob([u8arr], { type: mime, name: name, lastModified: Date.now() });
}

function treeChange(treeData, target, treeRef) {
    if (!target.checked) {
        deepChecked(target);
    } else {
        findParent(treeData, target);
    }
    let selectedNodes = treeRef.getCheckedNodes();
    return Promise.resolve(selectedNodes);
}
function deepChecked(data) {
    data.children.forEach((item) => {
        item.checked = false;
        if (item.children && item.children.length) {
            deepChecked(item);
        }
    });
}

//data：要遍历的数据， target：查找目标， result用于装查找结果的数组
function findParent(data, target, result = []) {
    for (let item of data) {
        if (item.id == target.id) {
            result.unshift(item);
            return true;
        }
        if (item.children && item.children.length > 0) {
            let isFind = findParent(item.children, target, result);
            if (isFind) {
                result.unshift(item);
                item.checked = true;
                return true;
            }
        }
    }
    return false;
}

/**
 * 过滤tree Data
 * tree  元数据
 * bList 过滤数据 id [1,2,3,4]
 * key   筛选条件
 */
function filterTreeArray(tree, bList, key = "id") {
    return tree
        .filter((item) => {
            return !bList || bList.indexOf(item[key]) > -1;
        })
        .map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
                item.children = filterTreeArray(item.children, bList);
            }
            return item;
        });
}

export default {
    getVal,
    deepClone,
    clearStorage,
    dateDiff,
    handleDateRange,
    getPositionTop,
    checkDate,
    resovleTime,
    flattenArr,
    formatterMoney,
    getBrowserType,
    systemType,
    floatRound,
    formatDate,
    compressImg,
    base64UrlToBlob,
    treeChange,
    findParent,
    filterTreeArray,
};

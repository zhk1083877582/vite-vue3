import Delegate from "./base/Delegate";
import dictMgr from "@/biz/dict";
import dt from "@lr17/lr";
// import { downloadStore } from "@/store/download";

import router from "@/router";

class DtDelegate extends Delegate {
    config() {
        console.log("🚀 ~ DtDelegate ~ config ~ config:");
        return Promise.all([dictMgr.update()]);
        // return Promise.all([]);
    }

    auth() {
        // 跳登录页
        // router.goLogin()
        // return Promise.reject(new Error('401'))
    }

    onSuccess(data, api) {
        if (api.tag == "downloadCenter") {
            // 跳下载中心
            // downloadStore().show();
        } else if (api.type == "download" && api.data.fileName) {
            // 下载文件
            const a = document.createElement("a");
            const blob = new Blob([data]);
            const blobUrl = window.URL.createObjectURL(blob);
            a.download = api.data.fileName;
            a.href = blobUrl;
            a.click();
        }
    }

    onError(err, api) {
        console.warn("server-err: ---------------");
        console.warn("server-err:", api.method, api.reqUrl);
        console.warn("server-err:", api.data);
        console.warn("server-err:", err.message, err.status, err.code);
        if (err.status == "500") {
            err.message = "服务器崩溃了~";
        }
        if (api.errTag != "no" && err.message != "401") {
            let time = 1.5;
            if (err.message.length > 8) time = 5;
            dt.ui.Message.error({
                content: `${err.message}`,
                duration: time,
            });
        }
        if (api.tag == "downloadCenter") {
            dt.ui.Message.error("生成失败，请重新生成！");
        }
    }
}

export default DtDelegate;

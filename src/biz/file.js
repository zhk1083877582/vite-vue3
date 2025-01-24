import server from "@/config/server/index.js";
import dt from "@/config/dt";

const api = {
    upload: () => server.api().upload("/hft-portal/v1/oss/uploadImage"),
};

// 上传文件
function upload(data = {}) {
    data.fileName = "multipartFile";
    let upload = api.upload();
    upload.setData(data);
    return upload;
}

// 区分ie浏览器和chrome浏览器实现修改文件名
function downloadFile(url, fileName, encode, suffix, noHomologous) {
    console.log(
        url,
        fileName,
        encode,
        suffix,
        noHomologous,
        "======downloadFile======"
    );
    let urlPathload = url;
    if (encode) {
        const tmpFileName = url.split("/").pop();
        const urlPath = url.split(tmpFileName)[0];
        urlPathload = urlPath + encodeURIComponent(tmpFileName);
        console.log(tmpFileName, urlPath, urlPathload);
    }
    let flagUrl = url.indexOf("tospurfang");
    if (noHomologous && flagUrl < 0) {
        console.log(url, "noHomologous");
        let link = document.createElement("a");
        link.href = `${url}`; // a标签下载同源策略
        link.download = fileName;
        link.click();
    } else if (url.indexOf("http://") >= 0) {
        let link = document.createElement("a"),
            href = url.replace("http://", "https://");
        link.href = `${href}?response-content-type=application/octet-stream`; // a标签下载同源策略
        link.download = fileName;
        link.click();
    } else {
        let link = document.createElement("a");
        let downloadUrl = encode ? urlPathload : url;
        var xhr = new XMLHttpRequest();
        xhr.open("get", downloadUrl, true);
        xhr.responseType = "blob";
        xhr.onload = () => {
            if (xhr.status === 200) {
                link.href = window.URL.createObjectURL(xhr.response);
                link.download = `${fileName}`;
                link.click();
                link.style.display = "none";
            } else {
                dt.ui.Message.error("下载失败");
            }
        };
        xhr.send();
    }
}

export default {
    upload,
    downloadFile,
};

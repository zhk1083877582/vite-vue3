import dt from "@lr17/lr";

class Fetch {
    constructor(handle) {
        this.handle = handle;
    }

    fetch(api) {
        if (this.handle.auth.need(api.path, api.needAuth)) {
            return this.handle.auth.do().then(() => {
                return this.fetch(api);
            });
        }
        if (
            this.handle.config &&
            this.handle.config.need(api.path, api.needConfig)
        ) {
            return this.handle.config.do().then(() => {
                return this.fetch(api);
            });
        }

        return this.handle.deal(api).then(() => {
            return this[api.type](api);
        });
    }

    // 请求
    request(api) {
        return this.handle.fly[api.method](api.reqPath, api.data, {
            ...api.opt,
            baseURL: api.url,
            headers: api.headers,
            timeout: api.timeout,
        }).then((res) => {
            return res;
        });
    }

    // 下载
    download(api) {
        if (dt.env.isUni) {
            return new Promise((resolve, reject) => {
                uni.downloadFile({
                    url: api.reqUrl,
                    header: api.headers,
                    success: (res) => {
                        resolve(res);
                    },
                    fail: (err) => {
                        reject(err);
                    },
                });
            });
        } else {
            api.setData(api.data, {
                ...api.opt,
                responseType: "blob",
            });
            return this.request(api);
        }
    }

    // 上传
    upload(api) {
        if (dt.env.isUni) {
            let file = api.data["file"];
            return new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: api.reqUrl,
                    filePath: file,
                    header: api.headers,
                    name: api.data["fileName"],
                    formData: api.data,
                    success: (res) => {
                        resolve(this.handle.data(JSON.parse(res.data)));
                    },
                    fail: (err) => {
                        reject(err);
                    },
                });
            });
        } else {
            let formData = new FormData();
            for (let k in api.data) {
                formData.append(k, api.data[k]);
            }
            api.setData(formData, api.opt);
            return this.request(api);
        }
    }
}

export default Fetch;

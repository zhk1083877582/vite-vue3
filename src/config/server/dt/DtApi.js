import Api from "../base/Api.js";
import dt from "@lr17/lr";

class DtApi extends Api {
    constructor(fetch) {
        super(fetch);
        this.url = this.url ? this.url : dt.env.dtUrl;
        setTimeout(() => {
            this.url = this.url ? this.url : dt.env.dtUrl;
        });
    }

    checkData() {
        this.needCheckData = true;
        return this;
    }

    setData(data, opt) {
        if (
            this.tag &&
            this.tag == "downloadCenter" &&
            data.page &&
            data.page != 1
        ) {
            data.page = 1;
        }
        // data可能是formdata
        super.setData(data, opt);
        let obj = {
            appId: dt.env.id,
            appName: dt.env.name,
            appVersion: dt.env.version,
        };
        this.headers = {
            ...obj,
            ...this.headers,
        };
        if (
            !(!dt.env.isUni && data instanceof FormData) &&
            !Array.isArray(data)
        ) {
            Object.assign(this.data, {
                ...obj,
            });
        }
        return this;
    }
}

export default DtApi;

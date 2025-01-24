import Auth from "./dt/DtAuth.js";
import dt from "@lr17/lr";

function uuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

class DtAuth extends Auth {
    constructor(delegate) {
        super(delegate);
        this.info = dt.session.get(this.authKey);
    }

    setInfo(info) {
        this.info = info;
        dt.session.set(this.authKey, info);
    }

    clear() {
        this.info = null;
        dt.session.remove(this.authKey);
    }

    header(path, need) {
        console.log(123123);
        let deviceNo = dt.storage.get("deviceNo");
        if (!deviceNo) {
            deviceNo = uuid();
            dt.storage.set("deviceNo", deviceNo);
        }
        let header = {
            deviceType: dt.env.deviceType,
            version: dt.env.version,
            deviceNo,
        };
        if (this.info) {
            header["Authorization-tospur"] = this.info.authorization;
            header.userId = this.info.userId;
        }
        return header;
    }

    need(path, need) {
        return !this.info && path.indexOf("/noToken/") < 0 && need;
    }
}

export default DtAuth;

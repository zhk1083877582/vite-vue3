import Auth from "./base/Auth.js";
import dt from "@lr17/lr";

function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

class DtAuth extends Auth {
  constructor(delegate) {
    super('dt_auth', delegate);
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
      header["Authorization"] = this.info.authorization;
      header.userId = this.info.userId;
    }
    return header;
  }

  need(path, need) {
    return !this.info && path.indexOf("/noToken/") < 0 && need;
  }
  needReAuth(code) {
    return [401, 40007, 40008, 40009, 50401, 50404, 50406, 50407, 50408, 50409].indexOf(Number(code)) >= 0
  }
}

export default DtAuth;

import Handle from "./base/Handle.js";
import server from "./index.js";
import dt from "@lr17/lr";

class DtHandle extends Handle {
  constructor(auth, config) {
    super(auth, config);

    this.refreshPath =
      "/dt-sc-oauth2/oauth/token?grant_type=refresh_token&client_id=dt&refresh_token=[refreshToken]";
  }
  request(req) {
    req.headers = {
      ...req.headers,
      ...this.auth.header(req.url, req.needAuth),
    };
    return req;
  }

  api() {
    return server.api().post(this.refreshPath).auth(true).config(true);
  }

  response(res) {
    let request = res.request;
    let data = res.data;
    if (this.auth.needReAuth(data.code)) {
      return this.auth.do().then(() => {
        request.needAuth = true;
        return this.fly.request(request.url, request.body, request);
      });
    } else if (50405 == data.code) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.api()
            .fetch({ refreshToken: this.auth.info.refreshToken })
            .then((res) => {
              server.auth.setInfo({
                authorization: `${res.token_type} ${res.access_token}`,
                refreshToken: res.refresh_token,
                userId: res.userId,
              });
              request.needAuth = true;
              return this.fly
                .request(request.url, request.body, request)
                .then(resolve, reject);
            }, reject);
        }, 200);
      });
    } else {
      return this.data(data);
    }
  }

  data(data) {
    data.success = data.code == 200;
    if (data.success) {
      return data.data;
    } else {
      let err = new Error(data.msg);
      err.fail = true;
      err.code = data.code;
      err.data = data.data;
      return Promise.reject(err);
    }
  }

  err(err) {
    let request = err.request;
    if (err.status == 401) {
      return this.auth.do().then(() => {
        return this.fly.request(request.url, request.body, request);
      });
    } else {
      if (err.message && err.message.indexOf("timeout") >= 0)
        err.message = dt.env.isUni
          ? "网络不佳，请下拉刷新"
          : "网络不佳，请手动刷新";
      return Promise.reject(err);
    }
  }

  deal(api) {
    if (api.needCheckData) {
      for (const key in api.data) {
        if (api.data[key] == "undefined") {
          return Promise.reject(new Error("无效参数 undefined"));
        }
      }
    }
    return Promise.resolve();
  }
}

export default DtHandle;

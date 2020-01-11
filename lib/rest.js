import Notify from "./notify";

class REST {
  constructor(cfg) {
    if (!fetch) throw Error("fetch library is not found");
    Object.assign(this, cfg);
    this.debugMode = this.debugMode || false;
  }

  async request(options) {
    if (typeof options == "string") options = { path: options };
    const url = options.url || `${this.url}${options.path}`;
    if (options.body) options.body = JSON.stringify(options.body);

    options.method = options.method || "GET";
    options.useAccessToken = options.useAccessToken || true;
    options.headers = options.headers || {};

    options.headers["content-type"] = "application/json";
    if (options.useAccessToken) options.headers["access_token"] = Cookies.get("access_token");
    let res = await fetch(url, options);
    if (!res.ok) return this.badResponse(res);
    let json = await res.json();
    return json;
  }

  get(options) {
    if (typeof options == "string") options = { path: options };
    return this.request(options);
  }

  post(options) {
    options.method = "POST";
    return this.request(options);
  }

  put(options) {
    options.method = "PUT";
    return this.request(options);
  }

  delete(options) {
    if (typeof options == "string") options = { path: options };
    options.method = "DELETE";
    return this.request(options);
  }

  patch(options) {
    options.method = "PATCH";
    return this.request(options);
  }

  notImplemented(name) {
    Notify.warning(`${name} is not implemented`);
  }

  async badResponse(res) {
    let message = res.statusText;

    if (this.debugMode) {
      let json = await res.json();
      message = json.message;
    } else {
      if (res.status === 401) {
        location.href = "/login";
        return;
      }
    }

    if (toastr) {
      toastr.error(`${message}<br />Error Code: ${res.status}`);
    } else {
      console.warn("Include toastr library to get nicer looking message");
      alert(message);
    }

    throw Error(message);
  }
}

export default REST;
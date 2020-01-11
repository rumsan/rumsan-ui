class Session {
  constructor(cfg) {
    if (!Cookies) throw Error("Cookies (js-cookie) library is not found");
  }

  getToken() {
    return { access_token: Cookies.get("access_token") };
  }

  getUser() {
    let userStr = Cookies.get("user");
    if (userStr) return JSON.parse(userStr);
    else return {};
  }
}

export default new Session();

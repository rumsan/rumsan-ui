class Session {
  constructor(cfg) {}

  getToken() {
    return { access_token: localStorage.getItem("access_token") };
  }

  getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    else return {};
  }

  get() {
    return {
      access_token: localStorage.getItem("access_token"),
      user: this.getUser(),
      permissions: localStorage.getItem("permissions")
        ? JSON.parse(localStorage.getItem("permissions"))
        : []
    };
  }

  set({ access_token, user, permissions } = {}) {
    if (!access_token) throw Error("Must pass token");
    if (!user) throw Error("Must pass user");
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }
}

export default new Session();

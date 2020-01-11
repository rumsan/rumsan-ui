import { RSUtils } from "rumsan-core";

class Permission {
  constructor(cfg) {
    if (!Cookies) throw Error("Cookies (js-cookie) library is not found");
  }

  list() {
    let permissions = Cookies.get("permissions");
    if (permissions) return JSON.parse(permissions);
    else return {};
  }

  has(perms = []) {
    try {
      if (typeof perms == "string") perms = perms.split(",");
      let permissions = Cookies.get("permissions");
      if (!permissions) return false;
      permissions = JSON.parse(permissions);
      return RSUtils.Array.arrayContainsArray(permissions, perms);
    } catch (e) {
      return false;
    }
  }
}

export default new Permission();

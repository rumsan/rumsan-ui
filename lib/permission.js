import { RSUtils } from "rumsan-core";

class Permission {
  constructor(cfg) {}

  list() {
    let permissions = localStorage.getItem("permissions");
    if (permissions) return JSON.parse(permissions);
    else return {};
  }

  has(perms = []) {
    try {
      if (typeof perms == "string") perms = perms.split(",");
      let permissions = this.list();
      return RSUtils.Array.arrayContainsArray(permissions, perms);
    } catch (e) {
      return false;
    }
  }
}

export default new Permission();

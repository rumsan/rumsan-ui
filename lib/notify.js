class Notify {
  hide() {
    if (toastr) toastr.clear();
  }

  show(message, options) {
    options = options || {};
    options.type = options.type || "success";
    options.title = options.title || "SUCCESS";
    options.hidePrevious = options.hidePrevious || true;

    if (options.hidePrevious) {
      options.maxOpened = options.maxOpened || 1;
      toastr.remove();
    }

    if (toastr) {
      let obj = toastr.success;
      if (options.type === "warning") obj = toastr.warning;
      else if (options.type === "error") obj = toastr.error;
      else obj = toastr.success;

      obj(message, options.title);
    } else {
      console.warn("Include toastr library to get nicer looking message");

      if (options.useAlert) alert(options.title + "\n" + message);
      else {
        let obj = console.info;
        if (options.type === "warning") obj = console.warn;
        else if (options.type === "error") obj = console.error;
        else obj = console.info;
        obj(options.title + ": " + message);
      }
    }
  }

  warning(message, options) {
    options = options || {};
    options.type = "warning";
    options.title = options.title || "WARNING";
    this.show(message, options);
  }

  error(message, options) {
    options = options || {};
    options.type = "error";
    options.title = options.title || "ERROR";
    this.show(message, options);
  }
}

export default new Notify();

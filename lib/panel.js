import Component from "./component";
import UIUtils from "./utils";

class Panel extends Component {
  constructor(cfg) {
    if (!cfg.target) throw Error("Must have target property");
    super(cfg);
    this.registerEvents("render");
  }

  showLoading(options) {
    UIUtils.Loading.show(this.target, options);
  }

  hideLoading(force = false) {
    UIUtils.Loading.hide(this.target, force);
  }

  show() {
    this.comp.show();
  }

  hide() {
    this.comp.hide();
  }
}

export default Panel;

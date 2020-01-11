import Component from "./component";

class Modal extends Component {
  constructor(cfg) {
    super(cfg);
    this.registerEvents("open", "close");

    this.comp.on("show.bs.modal", e => {
      this.fire("open", this);
    });

    this.comp.on("hide.bs.modal", e => {
      this.fire("close", this);
    });
  }

  open() {
    this.comp.modal("show");
  }

  close() {
    this.comp.modal("hide");
  }
}

export default Modal;

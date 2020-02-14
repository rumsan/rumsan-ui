class Component {
  constructor(cfg) {
    if (!$) throw Error("jQuery($) library is not found");
    if (!cfg.target) throw Error("Must have target property");

    Object.assign(this, cfg);

    this.comp = $(this.target);
    this.eventStore = [];

    this.listeners = this.listeners || {};
  }

  registerEvents() {
    this.eventStore = [...this.eventStore, ...arguments];

    //activate listeners
    for (const event in this.listeners) {
      let action = this.listeners[event];
      this.on(event, action);
    }
  }

  addListeners(listeners) {
    for (const event in listeners) {
      let action = listeners[event];
      this.on(event, action);
    }
  }

  on(event, cb) {
    let exists = this.eventStore.find(e => e === event);
    if (!exists) throw Error(`Event [${event}] is not registered`);
    $(this.target).on(event, cb);
  }

  trigger(event, data) {
    let exists = this.eventStore.find(e => e === event);
    if (!exists) throw Error(`Event [${event}] is not registered`);
    $(this.target).trigger(event, data);
  }

  fire(event, data) {
    this.trigger(event, data);
  }

  setValues(data) {
    let fields = [...document.querySelectorAll(`${this.target} [data-field]`)];
    fields.forEach(f => {
      let el = $(f);
      let fName = el.data("field");
      el.html(data[fName]);
    });
  }
}

export default Component;

import Component from "./component";

class Select extends Component {
  constructor(cfg) {
    super(cfg);
    this.useAccessToken = cfg.useAccessToken || true;
    this.initialize();

    this.registerEvents("select");

    //useAccessToken, limit, filterResults, queryField, idField, displayField/textField
  }

  async initialize() {
    this.textField = this.textField || this.displayField;

    let ajax = Object.assign(
      {
        url: this.url,
        dataType: "json",
        data: function(params) {
          var query = {
            limit: this.limit || 5
          };
          this.queryField = this.queryField || "name";
          if (this.queryField) query[this.queryField] = params.term;
          return query;
        },
        processResults: data => {
          let results = data.data.map(d => {
            d.id = this.idField ? d[this.idField] : d.id;
            return d;
          });
          if (this.filterResults) results = this.filterResults(results);
          return {
            results
          };
        },
        cache: true
      },
      this.ajax
    );

    if (this.useAccessToken) {
      ajax.headers = Object.assign(
        { access_token: localStorage.getItem("access_token") },
        ajax.headers
      );
    }

    let config = Object.assign(
      {
        placeholder: "Search a item to select",
        width: "100%",
        escapeMarkup: markup => {
          return markup;
        },
        templateResult: data => {
          if (data.loading) {
            return data.text;
          }
          var markup = `
            <div class="row" style="max-width:100%">
              <div class="col text-left">${this.textField ? data[this.textField] : data.text}</div>
            </div>`;
          return markup;
        },
        templateSelection: data => {
          let retText = this.textField ? data[this.textField] || data.text : data.text;
          return retText;
        }
      },
      this
    );
    if (this.renderInModal) config.dropdownParent = $(`${this.target} .modal-header`);

    if (this.data) {
      this.data.forEach(d => {
        d.id = this.idField ? d[this.idField] : d.id;
      });
      if (this.filterResults) this.data = this.filterResults(this.data);
      config.data = this.data;
    } else {
      config.ajax = ajax;
      config.minimumInputLength = 2;
    }
    this.select2 = $(this.target).select2(config);
    this.select2.on("select2:select", e => {
      this.fire("select", Object.assign(e.params.data, { select2: e }));
    });
  }

  getValue() {
    return $(this.target).val();
  }

  loadData(data) {
    $(this.target).empty();
    $(this.target).select2({ data });
  }

  clear() {
    $(this.target)
      .val(null)
      .trigger("change");
  }
}

export default Select;

import Panel from "./panel";
import { isString } from "util";

class TablePanel extends Panel {
  constructor(cfg) {
    super(cfg);
    if (!this.comp.DataTable) throw Error("DataTable library is not found");

    this.tblConfig = Object.assign(
      {
        pageLength: 20,
        processing: true,
        responsive: true,
        filter: true,
        sort: false,
        searchDelay: 500,
        dom: "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-4'i><'col-sm-8'<'float-right p-2'p>>>",
        columns: this.setColumns(this)
      },
      cfg.tblConfig
    );

    if (cfg.url) {
      this.tblConfig.serverSide = true;
      this.tblConfig.ajax = {
        url: cfg.url,
        headers: { access_token: localStorage.getItem("access_token") },
        dataFilter: data => {
          let json = JSON.parse(data);
          json.recordsTotal = json.total;
          json.recordsFiltered = json.total;
          this.toggleFooter(json.total);
          return JSON.stringify(json);
        },
        data: function(d) {
          return Object.assign(
            {},
            {
              start: d.start,
              limit: d.length,
              search: d.search.value
            }
          );
        }
      };
    }
  }

  toggleFooter(total, pageLength) {
    pageLength = pageLength || this.tblConfig.pageLength;
    if (total > pageLength) {
      $(`${this.target}_wrapper .dataTables_info`).show();
      $(`${this.target}_wrapper .dataTables_paginate`).show();
    } else {
      $(`${this.target}_wrapper .dataTables_info`).hide();
      $(`${this.target}_wrapper .dataTables_paginate`).hide();
    }
  }

  setColumns(parent) {
    return [];
  }

  getRowByValue(val, colIndex = 0) {
    let retIndex = null;
    this.table.rows().every(function(rowIdx, tableLoop, rowLoop) {
      var data = this.data()[colIndex];
      if (data == val) {
        retIndex = rowIdx;
        return;
      }
    });
    return retIndex;
  }

  render(tblConfig) {
    Object.assign(this.tblConfig, tblConfig);
    this.table = this.comp.DataTable(this.tblConfig);
  }

  load(url) {
    this.table.ajax.url(url).load();
  }

  loadData(data) {
    if (!Array.isArray(data)) data = [data];
    this.table.clear();
    data.forEach(d => {
      if (isString(d)) d = [d];
      this.table.row.add(d);
    });
    this.toggleFooter(data.length);
    this.table.draw();
  }

  reload() {
    this.table.ajax.reload();
  }
}

export default TablePanel;

class Alert {
  show(message) {
    alert(message);
  }

  async confirm(options) {
    if (!swal) throw new Error("SweetAlert2 (swal) library is not found");

    options = options || {};
    if (typeof options == "string") options = { text: options };

    let data = await swal.fire(
      Object.assign(
        {
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        },
        options
      )
    );
    return data.value;
  }
}

export default new Alert();

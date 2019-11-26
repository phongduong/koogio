(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('sweetalert2')) :
  typeof define === 'function' && define.amd ? define('home', ['sweetalert2'], factory) :
  (global = global || self, factory(global.Swal));
}(this, function (Swal) { 'use strict';

  Swal = Swal && Swal.hasOwnProperty('default') ? Swal['default'] : Swal;

  const DELETE = (url) => fetch(url, { method: "DELETE" }).then(res => res.json());
  //# sourceMappingURL=_request.js.map

  document.querySelectorAll(".delete").forEach(deleteButton => deleteButton.addEventListener("click", async (e) => {
      const { target: { dataset: { id } } } = e;
      Swal.fire({
          title: "Delete",
          text: "Do you want to delete?",
          icon: "question",
          showConfirmButton: true,
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm: async () => {
              const { deleted } = await DELETE(`/projects/${id}`);
              return deleted;
          }
      }).then(result => {
          if (result) {
              location.href = "/";
          }
      });
  }));

}));

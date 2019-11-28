import Swal from "sweetalert2";
import { DELETE } from "./_request";
import { HTMLInputEvent } from "./_interfaces";

document.querySelectorAll(".delete").forEach(deleteButton =>
  deleteButton.addEventListener("click", async (e: HTMLInputEvent) => {
    const {
      target: {
        dataset: { id }
      }
    } = e;

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
  })
);

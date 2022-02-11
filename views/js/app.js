import { addSectionTask } from "../helpers/tasks.mjs";
import { Eggy } from "./vendors/eggy.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const btnToggleModal = document.getElementById("btn-create");
  const modal = document.querySelector(".modal");
  const closeModal = document.getElementById("close");
  const formCreate = document.getElementById("form-create");

  function toggleModal() {
    wrapper.classList.toggle("modal-open");
    modal.classList.toggle("modal-open");
  }

  btnToggleModal.addEventListener("click", toggleModal);
  closeModal.addEventListener("click", toggleModal);
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) toggleModal();
  });

  formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      icon: e.target.icon.value,
    };

    addSectionTask(task);
    Eggy({
      title: "Categoría creada",
      message: "La categoría fue creada y añadida con exito",
      type: "success",
    });

    e.target.reset();
    toggleModal();

    console.log(task);
  });
});

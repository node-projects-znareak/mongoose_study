import { addSectionTask } from "../helpers/tasks.mjs";
import {
  createTaskSectionNode,
  saveSectionTasks,
  getNode,
  selector,
  on,
} from "../helpers/dom.mjs";
import { Eggy } from "./vendors/eggy.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const btnExportTasks = getNode("export-sections");
  const closeModal = getNode("close");
  const formCreate = getNode("form-create");
  const btnToggleModal = getNode("btn-create");
  const wrapper = selector(".wrapper");
  const modal = selector(".modal");

  function toggleModal() {
    wrapper.classList.toggle("modal-open");
    modal.classList.toggle("modal-open");
  }

  on(btnExportTasks).click(saveSectionTasks);
  on(btnToggleModal).click(toggleModal);
  on(closeModal).click(toggleModal);
  on(modal).click((e) => e.target.classList.contains("modal") && toggleModal());

  on(formCreate).submit((e) => {
    e.preventDefault();
    const task = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      icon: e.target.icon.value,
    };

    addSectionTask(task);
    createTaskSectionNode(task.title, task.desc, task.icon);

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

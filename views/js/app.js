import {
  addSectionTask,
  addTask,
  getCurrentSectionId,
} from "../helpers/tasks.mjs";
import {
  createTaskSectionNode,
  saveTasks,
  saveSectionTasks,
  loadOptionListIcons,
  getNode,
  on,
  selector,
  toggleCreateCategoryBanner,
  importCategories,
  importTasks,
} from "../helpers/dom.mjs";
import { Eggy } from "./vendors/eggy.mjs";
import { validateCategory, validateTask } from "../helpers/validations.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const btnExportCategories = getNode("export-sections");
  const btnExportTask = getNode("export-tasks");
  const btnImportCategories = getNode("import-sections");
  const btnImportTasks = getNode("import-tasks");

  const btnImportCategoriesFile = getNode("import-section-file");
  const btnImportTasksFile = getNode("import-task-file");

  const btnToggleModal = getNode("btn-create");
  const btnCreateTask = getNode("btn-create-task");
  const btnTogglerMenu = selector(".toggler-menu");
  const closeMenu = selector(".close-nav");
  const navMenu = selector(".nav");

  on(btnExportCategories).click(saveSectionTasks);
  on(btnExportTask).click(saveTasks);
  on(btnImportCategories).click(() => {
    btnImportCategoriesFile.click();
  });

  on(btnImportTasks).click(() => {
    btnImportTasksFile.click();
  });

  on(btnImportCategoriesFile).change(async (e) => {
    const [file] = e.target.files;
    await importCategories(file);
  });

  on(btnImportTasksFile).change(async (e) => {
    const [file] = e.target.files;
    await importTasks(file);
  });

  on(btnToggleModal).click(() => {
    Swal.fire({
      icon: "question",
      title: "Crear categoría",
      html: /*html*/ `
        <form id="form-create">
          <div class="input-row">
            <div class="input-group">
              <label for="title">Título de la categoría</label>
              <input
                type="text"
                class="input"
                id="title"
                name="title"
                placeholder="Hola! soy una categoría"
                required
              />
            </div>

            <div class="input-group">
              <label for="desc">Descripción de la categoría</label>
              <textarea
                type="text"
                class="input"
                id="desc"
                name="desc"
                placeholder="Puedes escribir más aquí!"
                required
              ></textarea>
            </div>

            <div class="input-group">
              <input
                type="hidden"
                form="form-create"
                name="icon"
                value=""
                id="_icon"
              />
              <div class="input dropdown">
                <span for="icon">Icóno</span>
                <ul id="icon"></ul>
              </div>
            </div>
          </div>
      </form>
      `,
      showCloseButton: true,
      confirmButtonText: "Crear",
    }).then((res) => {
      if (res.isConfirmed) {
        const formCreate = getNode("form-create");
        const sectionTask = {
          title: formCreate.title.value.trim(),
          desc: formCreate.desc.value.trim(),
          icon: formCreate.icon.value,
        };

        if (validateCategory(sectionTask)) {
          addSectionTask(sectionTask);
          toggleCreateCategoryBanner(true);
          createTaskSectionNode(
            sectionTask.title,
            sectionTask.desc,
            sectionTask.icon
          );

          Eggy({
            title: "Categoría creada",
            message: "La categoría fue creada y añadida con exito",
            type: "success",
          });
        }
      }
    });

    loadOptionListIcons();
  });

  on(btnCreateTask).click(() => {
    Swal.fire({
      title: "Crear tarea",
      icon: "question",
      text: "A continuación para crear una tarea debe ser rellanado los campos:",
      confirmButtonText: "Crear",
      showCloseButton: true,
      showDenyButton: true,
      denyButtonText: "Cancelar",
      html: /*html*/ `
        <form id="form-create-task">
          <div class="input-row">
            <div class="input-group">
              <label for="title">Título de la tarea</label>
              <input
                type="text"
                class="input"
                id="title"
                name="title"
                placeholder="Hola! soy una tarea"
                required
              />
            </div>

            <div class="input-group">
              <label for="desc">Descripción de la tarea</label>
              <textarea
                type="text"
                class="input"
                id="desc"
                name="desc"
                placeholder="Puedes escribir más aquí!"
                required
              ></textarea>
            </div>

            <div class="task-status" style="margin-left:2px;">
              <input type="checkbox" name="status" class="checkbox white" id="task-status"> 
              <label for="task-status">
                Incompleta
              </label>
            </div>
          </div>
      </form>
      `,
    }).then((res) => {
      if (res.isConfirmed) {
        const formTask = getNode("form-create-task");
        const task = {
          title: formTask.title.value.trim(),
          desc: formTask.desc.value.trim(),
          status: formTask.status.checked,
          sectionId: getCurrentSectionId(),
          date: new Date().toLocaleDateString(),
        };

        if (validateTask(task)) {
          addTask(task);
          Eggy({
            title: "Tarea creada",
            message: "La tarea fue creada y añadida con exito",
            type: "success",
          });
          setTimeout(() => window.location.reload(), 1000);
        }
      }
    });

    const chkTaskStatus = getNode("task-status");
    const label = selector("label[for='task-status']");
    on(chkTaskStatus).change((e) => {
      if (e.target.checked) {
        label.textContent = "Terminada";
      } else {
        label.textContent = "Incompleta";
      }
    });
  });

  on(btnTogglerMenu).click(() => {
    navMenu.classList.add("active");
  });

  on(closeMenu).click(() => {
    navMenu.classList.remove("active");
  });

  on(document).click((e) => {
    // evitar que el boton de abrir menu vuelva a cerrar el menu
    if (
      e.target.isEqualNode(btnTogglerMenu) ||
      btnTogglerMenu.contains(e.target) ||
      navMenu.contains(e.target)
    )
      return;

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  });
});

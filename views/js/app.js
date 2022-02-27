import { addSectionTask } from "../helpers/tasks.mjs";
import {
  createTaskSectionNode,
  saveSectionTasks,
  loadOptionListIcons,
  getNode,
  on,
} from "../helpers/dom.mjs";
import { Eggy } from "./vendors/eggy.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const btnExportTasks = getNode("export-sections");
  const btnToggleModal = getNode("btn-create");

  on(btnExportTasks).click(saveSectionTasks);
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
          title: formCreate.title.value,
          desc: formCreate.desc.value,
          icon: formCreate.icon.value,
        };

        addSectionTask(sectionTask);
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
    });

    loadOptionListIcons();
  });
});

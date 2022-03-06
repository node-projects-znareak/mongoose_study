import {
  setTasks,
  getAllsTask,
  getAllSectionTasks,
  deleteSectionTask,
  getSectionTask,
  editSectionTask,
  getLastSectionId,
  changeCurrentSectionId,
  getCurrentSectionId,
  getTaskBySection,
  getTaskCountBySection,
  deleteTask,
  getTaskById,
  editTaskById,
  setSectionTasks,
  deleteDuplicateCategories,
  deleteDuplicateTasks,
} from "./tasks.mjs";
import { Eggy } from "../js/vendors/eggy.mjs";
import { validateTask } from "../helpers/validations.mjs";
import ICONS from "./icons.mjs";
import { readFile, validateImportedFile, toArrayObject } from "./utils.mjs";

export const getNode = (id) => document.getElementById(id);
export const selector = (select) => document.querySelector(select);
export const selectorAll = (select) => document.querySelectorAll(select);

export const on = (node) => {
  const event = (e, cb) => node.addEventListener(e, cb, false);
  return {
    click(cb) {
      event("click", cb);
    },
    mouseenter(cb) {
      event("mouseenter", cb);
    },
    submit(cb) {
      event("submit", cb);
    },
    change(cb) {
      event("change", cb);
    },
  };
};

export const createElement = (initObj) => {
  var element = document.createElement(initObj.tag);
  for (var prop in initObj) {
    if (prop === "childNodes") {
      initObj.childNodes.forEach(function (node) {
        element.appendChild(node);
      });
    } else if (prop === "attributes") {
      initObj.attributes.forEach(function (attr) {
        element.setAttribute(attr.key, attr.value);
      });
    } else element[prop] = initObj[prop];
  }
  return element;
};

export function createTaskSectionNode(title, desc, icon, id) {
  const OPTIONS = [
    {
      title: "Editar",
      icon: ICONS.EDIT,
      "aria-label": "Editar",
      role: "button",
    },
    {
      title: "Eliminar",
      icon: ICONS.DELETE,
      "aria-label": "Eliminar",
      role: "button",
    },
  ];
  const [[_icon]] = window.icons[icon];
  const _id = id !== undefined ? id : getLastSectionId();
  const sectionTasksList = getNode("sections");
  const li = createElement({
    tag: "li",
    title: desc,
    attributes: [{ key: "data-section-id", value: _id }],
  });
  li.insertAdjacentHTML("afterbegin", _icon.svg_path);

  const spanText = createElement({ tag: "span", textContent: title });
  const navItemMenu = createElement({
    tag: "div",
    className: "nav-item-menu",
    attributes: [{ key: "tabindex", value: -1 }],
  });

  navItemMenu.insertAdjacentHTML("afterbegin", ICONS.VERTICAL_DOTS);

  const navItemSubMenu = createElement({
    tag: "div",
    className: "nav-item-submenu",
  });

  const navItemSubMenu_menu = createElement({
    tag: "ul",
    className: "nav-item-submenu-menu",
  });

  for (const { icon, title, ...args } of OPTIONS) {
    const op = createElement({
      tag: "li",
      attributes: toArrayObject(args),
    });
    const spanTitle = createElement({
      tag: "div",
      innerHTML: `${icon}<span>${title}</span>`,
    });
    op.appendChild(spanTitle);
    on(op).click(() => {
      if (title === "Eliminar") {
        Swal.fire({
          title: "Eliminar categoría",
          icon: "warning",
          text: "¿Seguro que desea eliminar esta categoría?",
          confirmButtonText: "Si",
          showDenyButton: true,
          showCloseButton: true,
        }).then((res) => {
          if (res.isConfirmed) {
            deleteSectionTask(_id);

            Eggy({
              title: "Categoría eliminada",
              message: "La categoría fue eliminada con exito",
              type: "success",
            });
            setTimeout(() => window.location.reload(), 1000);
          }
        });
      } else {
        const sectionTask = getSectionTask(_id);
        const [icon] = window.icons[sectionTask.icon][0];
        console.log(sectionTask);

        Swal.fire({
          icon: "question",
          title: "Editar categoría",
          text: "Por favor introducir los campos a continuación:",
          showCloseButton: true,
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
                    value="${sectionTask.title}"
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
                    required
                  >${sectionTask.desc}</textarea>
                </div>

                <div class="input-group">
                  <input
                    type="hidden"
                    form="form-create"
                    name="icon"
                    value="${sectionTask.icon}"
                    id="_icon"
                  />
                  <div class="input dropdown">
                    <span for="icon">${icon.svg_path} ${sectionTask.icon}</span>
                    <ul id="icon"></ul>
                  </div>
                </div>
              </div>
            </form>
          `,
        }).then((res) => {
          if (res.isConfirmed) {
            const formCreate = getNode("form-create");
            const sectionTask = {
              title: formCreate.title.value,
              desc: formCreate.desc.value,
              icon: formCreate.icon.value,
              id: _id,
            };
            editSectionTask(sectionTask);
            Eggy({
              title: "Categoría editada",
              message: "La categoría fue editada con exito",
              type: "success",
            });
            setTimeout(() => window.location.reload(), 1000);
          }
        });
        loadOptionListIcons();
      }
    });
    navItemSubMenu_menu.appendChild(op);
  }

  navItemSubMenu.appendChild(navItemSubMenu_menu);
  navItemMenu.appendChild(navItemSubMenu);

  li.appendChild(spanText);
  li.appendChild(navItemMenu);

  on(li).click((e) => {
    const categorySectionTitle = selector(".select-category-title");

    selector("li.active")?.classList?.remove("active");
    li.classList.add("active");
    changeCurrentSectionId(_id);

    const tasksLength = showTaskBySection();
    if (categorySectionTitle && !tasksLength) {
      categorySectionTitle.textContent = "No hay tareas en esta categoría";
    }

    toggleBtnCreateTask();
  });

  sectionTasksList.appendChild(li);
}

export function createOptionList(icon, name, select) {
  const op = createElement({
    tag: "li",
    attributes: [{ key: "data-icon", value: name }],
    innerHTML: `${icon} <span>${name}</span>`,
  });
  const dropdownContainer = select.parentNode;
  const containerSelect = dropdownContainer.parentNode;
  const inputIcon = containerSelect.querySelector("#_icon");
  on(op).click(() => {
    dropdownContainer.querySelector("span").innerHTML = op.innerHTML;
    inputIcon.value = op.querySelector("span").textContent;
  });
  select.appendChild(op);
}

export function createTask({ title, desc, date, status, id, sectionId }) {
  const tasksContainer = getNode("tasks");
  const taskContainer = createElement({
    tag: "div",
    className: "task",
    attributes: [
      { key: "data-task-id", value: id },
      { key: "data-task-section-id", value: sectionId },
      { key: "data-task-status", value: status },
    ],
  });
  const taskTitleContainer = createElement({
    tag: "div",
    className: "task-title",
  });
  const h3 = createElement({ tag: "h3", textContent: title });
  const taskContent = createElement({
    tag: "p",
    textContent: desc,
    className: "task-content",
  });
  const taskFooter = createElement({
    tag: "footer",
    className: "task-footer",
    innerHTML: ICONS.DATE,
  });
  const dateTime = createElement({
    tag: "time",
    className: "task-date",
    textContent: date,
    attributes: [{ key: "datetime", value: date }],
  });

  const taskDeleteBtn = createElement({
    tag: "button",
    className: "btn-task-delete",
    innerHTML: ICONS.TRASH,
    attributes: [
      { key: "data-task-id", value: id },
      {
        key: "aria-label",
        value: "Eliminar tarea",
      },
    ],
  });

  const taskEditBtn = createElement({
    tag: "button",
    className: "btn-task-edit",
    innerHTML: ICONS.PENCIL,
    attributes: [
      { key: "data-task-id", value: id },
      {
        key: "aria-label",
        value: "Editar tarea",
      },
    ],
  });

  on(taskEditBtn).click(() => {
    const task = getTaskById(id);

    Swal.fire({
      title: "Editar tarea",
      icon: "question",
      text: "A continuación para editar una tarea debe ser rellanado los campos:",
      confirmButtonText: "Editar",
      showCloseButton: true,
      showDenyButton: true,
      denyButtonText: "Cancelar",
      html: /*html*/ `
        <form id="form-edit-task">
          <div class="input-row">
            <div class="input-group">
              <label for="title">Título de la tarea</label>
              <input
                type="text"
                class="input"
                id="title"
                name="title"
                placeholder="Hola! soy una tarea"
                value="${task.title}"
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
              >${task.desc}</textarea>
            </div>

            <div class="task-status" style="margin-left:2px;">
              <input type="checkbox" name="status" class="checkbox white" id="task-status" ${
                task.status ? "checked" : ""
              }> 
              <label for="task-status">
                Incompleta
              </label>
            </div>
          </div>
      </form>
      `,
    }).then((res) => {
      if (res.isConfirmed) {
        const formTask = getNode("form-edit-task");
        const task = {
          title: formTask.title.value.trim(),
          desc: formTask.desc.value.trim(),
          status: formTask.status.checked,
          sectionId: getCurrentSectionId(),
        };

        if (validateTask(task)) {
          editTaskById(id, task);
          Eggy({
            title: "Tarea Editada",
            message: "La tarea fue edita con exito",
            type: "success",
          });
          setTimeout(() => window.location.reload(), 1000);
        }
      }
    });
  });

  on(taskDeleteBtn).click(() => {
    deleteTask(id, sectionId);
    taskContainer.remove();
    showTaskBySection();
  });
  
  const containerButtons = createElement({
    tag: "div",
    className: "task-container-buttons",
    childNodes: [taskEditBtn, taskDeleteBtn],
  });

  taskTitleContainer.appendChild(h3);
  taskContainer.appendChild(taskTitleContainer);
  taskContainer.appendChild(taskContent);
  taskFooter.appendChild(dateTime);
  taskFooter.appendChild(containerButtons);
  taskContainer.appendChild(taskFooter);
  tasksContainer.appendChild(taskContainer);
}

export function showTaskBySection() {
  const currentCategory = getCurrentSectionId();
  const tasks = getTaskBySection(currentCategory);
  const selectCategory = selector(".select-category");
  const tasksContainer = getNode("tasks");
  tasksContainer.innerHTML = "";
  selectCategory.style.display = tasks.length ? "none" : "block";
  if (tasks.length) {
    for (const task of tasks) createTask(task);
  }
  return tasks.length > 0;
}

export function saveJSONFile(content, name) {
  const _content = JSON.stringify(content, null, 3);
  const blob = new Blob([_content], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, name);
}

export function saveTasks() {
  let tasks = getAllsTask();
  tasks.map((task) => {
    delete task.sectionId;
    return task;
  });
  saveJSONFile(tasks, "tasks.json");
}

export function saveSectionTasks() {
  saveJSONFile(getAllSectionTasks(), "section_tasks.json");
}

export async function importCategories(fileJSON) {
  if (validateImportedFile(fileJSON)) {
    const currentCategories = getAllSectionTasks();
    const result = await readFile(fileJSON);
    const categoriesToImport = JSON.parse(result);
    const totalCategories = deleteDuplicateCategories(
      currentCategories,
      categoriesToImport
    );

    if (totalCategories.length) {
      setSectionTasks([...currentCategories, ...totalCategories]);
      Eggy({
        title: "Se importaron las categorías",
        message: `Se importaron ${totalCategories.length} categorías`,
        type: "success",
      });
      setTimeout(() => window.location.reload(), 1300);
    }
  }
}

export async function importTasks(fileJSON) {
  if (validateImportedFile(fileJSON)) {
    const currentCategory = getCurrentSectionId();
    if (!currentCategory) {
      return Eggy({
        title: "Error",
        message: `Selecciona una categoría para importar`,
        type: "error",
      });
    }

    const currentTasks = getAllsTask();
    const result = await readFile(fileJSON);
    const tasksToImport = JSON.parse(result);
    const totalTasks = deleteDuplicateTasks(currentTasks, tasksToImport);

    if (totalTasks.length) {
      const tasks = [...currentTasks, ...totalTasks].map((task) => {
        task.sectionId = currentCategory;
        return task;
      });

      setTasks(tasks);
      Eggy({
        title: "Se importaron las tareas",
        message: `Se importaron ${totalTasks.length} tareas`,
        type: "success",
      });
      setTimeout(() => window.location.reload(), 1300);
    }
  }
}

export function loadOptionListIcons() {
  for (const [name, [[icon]]] of Object.entries(window.icons)) {
    createOptionList(icon.svg_path, icon.name, getNode("icon"));
  }
}

export function toggleCreateCategoryBanner(flag) {
  const banner = selector(".create-section");
  const display = flag ? "none" : "block";
  banner.style.display = display;
}

export function toggleBtnCreateTask() {
  const currentSection = getCurrentSectionId();
  const btnCreateTasks = getNode("btn-create-task");
  const tasksLength = getTaskCountBySection(currentSection);
  btnCreateTasks.style.display = !tasksLength ? "block" : "none";
}

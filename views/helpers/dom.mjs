import {
  getAllsTask,
  getAllSectionTasks,
  deleteSectionTask,
  getSectionTask,
} from "./tasks.mjs";
import ICONS from "./icons.mjs";

export const getNode = (id) => document.getElementById(id);
export const selector = (select) => document.querySelector(select);
export const selectorAll = (select) => document.querySelectorAll(select);
const inputIcon = getNode("_icon");

export const on = (node) => {
  return {
    click(cb) {
      node.addEventListener("click", cb, false);
    },
    mouseenter(cb) {
      node.addEventListener("mouseenter", cb, false);
    },
    submit(cb) {
      node.addEventListener("submit", cb, false);
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
  const [[_icon]] = window.icons[icon];
  const sectionTasksList = getNode("sections");
  const li = createElement({
    tag: "li",
    title: desc,
    attributes: [{ key: "data-section-id", value: id }],
  });
  li.insertAdjacentHTML("afterbegin", _icon.svg_path);

  const OPTIONS = [
    {
      title: "Editar",
      icon: ICONS.EDIT,
    },
    {
      title: "Eliminar",
      icon: ICONS.DELETE,
    },
  ];
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
    const op = document.createElement("li");
    const spanTitle = createElement({
      tag: "div",
      innerHTML: `${icon}<span>${title}</span>`,
    });
    op.appendChild(spanTitle);
    on(op).click(() => {
      if (title === "Eliminar") {
        deleteSectionTask(id);
        li.remove();
      } else {
        const sectionTask = getSectionTask(id);
        const [icon] = window.icons[sectionTask.icon][0];
        console.log(sectionTask);
        Swal.fire({
          icon: "question",
          title: "Editar categoría",
          text: "Por favor introducir los campos a continuación:",
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
  sectionTasksList.appendChild(li);
}

export function createOptionList(icon, name, select) {
  const op = document.createElement("li");
  op.setAttribute("data-icon", name);
  op.insertAdjacentHTML("afterbegin", `${icon} <span>${name}</span>`);
  const dropdownContainer = select.parentNode;
  const containerSelect = dropdownContainer.parentNode;
  const inputIcon = containerSelect.querySelector("#_icon");
  on(op).click(() => {
    dropdownContainer.querySelector("span").innerHTML = op.innerHTML;
    inputIcon.value = op.querySelector("span").textContent;
  });
  select.appendChild(op);
}

export function saveJSONFile(content, name) {
  const _content = JSON.stringify(content, null, 3);
  const blob = new Blob([_content], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, name);
}

export function saveTasks() {
  saveJSONFile(getAllsTask(), "tasks.json");
}

export function saveSectionTasks() {
  saveJSONFile(getAllSectionTasks(), "section_tasks.json");
}

export async function getIcons() {
  const req = await fetch("./icons/icons.json");
  const json = await req.json();
  return json;
}

export function loadOptionListIcons() {
  for (const [name, [[icon]]] of Object.entries(window.icons)) {
    createOptionList(icon.svg_path, icon.name, getNode("icon"));
  }
}

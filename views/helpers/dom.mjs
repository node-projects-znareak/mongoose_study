import { getAllsTask, getAllSectionTasks } from "./tasks.mjs";
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

export function createTaskSectionNode(title, desc, icon) {
  const [[_icon]] = window.icons[icon];
  const sectionTasksList = getNode("sections");
  const li = createElement({
    tag: "li",
    title: desc,
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
    // console.log(title +"\n")
    // innerHTML
    const spanTitle = createElement({
      tag: "div",
      innerHTML: `${icon}<span>${title}</span>`,
    });
    op.appendChild(spanTitle);
    op.addEventListener("click", (e) => {
      console.log(e)
      if (title === "Eliminar") {
        console.log("eliminar");
        li.remove();
      } else {
        console.log("editar");
      }
    });
    // op.innerHTML = `${icon}<span>${title}</span>`;
    navItemSubMenu_menu.appendChild(op);
  }

  // navItemSubMenu_menu.addEventListener("click", ()=>{
  //   console.log("click!")

  // })

  navItemSubMenu.appendChild(navItemSubMenu_menu);
  navItemMenu.appendChild(navItemSubMenu);

  li.appendChild(spanText);
  li.appendChild(navItemMenu);
  sectionTasksList.appendChild(li);
}

export function createOptionList(icon, name, select) {
  const op = document.createElement("li");
  op.setAttribute("data-icon", icon.name);
  op.insertAdjacentHTML("afterbegin", `${icon} <span>${name}</span>`);
  op.addEventListener("click", () => {
    select.parentNode.querySelector("span").innerHTML = op.innerHTML;
    inputIcon.value = op.querySelector("span").textContent;
  });

  return op;
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

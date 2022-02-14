import { getAllSectionTasks } from "../helpers/tasks.mjs";
import { createTaskSectionNode, createOptionList } from "../helpers/dom.mjs";

window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const spinner = document.getElementById("spinner");
    const select = document.getElementById("icon");
    const req = await fetch("./icons/icons.json");
    const json = await req.json();
    window.icons = json;

    spinner.style.display = "none";

    for (const sectionTask of getAllSectionTasks()) {
      createTaskSectionNode(
        sectionTask.title,
        sectionTask.desc,
        sectionTask.icon
      );
    }

    for (const [name, [[icon]]] of Object.entries(window.icons)) {
      const op = createOptionList(icon.svg_path, icon.name, select);
      select.appendChild(op);
    }

    const subMenusIcon = document.querySelectorAll(".nav-item-menu");

    function calculatePosition(target) {
      const domRect = target.getBoundingClientRect();
      const space = Math.trunc(window.innerHeight - domRect.bottom);
      if (space < 0) {
        target.style.bottom = "23px";
      } else {
        target.style.bottom = "-95px";
      }
      console.log(space);
    }

    for (const subMenuIcon of subMenusIcon) {
      const calc = () => {
        const subMenu = subMenuIcon.querySelector(".nav-item-submenu");
        calculatePosition(subMenu);
      };

      subMenuIcon.addEventListener("mouseover", calc);
      window.addEventListener("scroll", calc);
      window.addEventListener("resize", calc);
    }
  })();
});

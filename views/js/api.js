import { getAllSectionTasks } from "../helpers/tasks.mjs";
import { createTaskSectionNode, getIcons } from "../helpers/dom.mjs";
import { getNode } from "../helpers/dom.mjs";

window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const spinner = getNode("spinner");
    window.icons = await getIcons();
    spinner.style.display = "none";

    for (const sectionTask of getAllSectionTasks()) {
      createTaskSectionNode(
        sectionTask.title,
        sectionTask.desc,
        sectionTask.icon,
        sectionTask.id
      );
    }

    const subMenusIcon = document.querySelectorAll(".nav-item-menu");

    function calculatePosition(target) {
      const domRect = target.getBoundingClientRect();
      const space = Math.trunc(window.innerHeight - domRect.bottom);
      if (space < 100) {
        target.querySelector(".nav-item-submenu").style.bottom = "25px";
      } else {
        target.querySelector(".nav-item-submenu").style.bottom = "-90px";
      }
    }

    for (const subMenuIcon of subMenusIcon) {
      const calc = () => {
        calculatePosition(subMenuIcon);
      };

      subMenuIcon.addEventListener("mouseenter", calc);
      window.addEventListener("scroll", calc);
      window.addEventListener("resize", calc);
    }
  })();
});

import {
  getAllSectionTasks,
  getCurrentSectionId,
  getTaskBySection,
} from "../helpers/tasks.mjs";

import {
  createTaskSectionNode,
  getIcons,
  getNode,
  selector,
  selectorAll,
  showTaskBySection
} from "../helpers/dom.mjs";

window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const spinner = getNode("spinner");
    const currentCategory = getCurrentSectionId();
    
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

    const activeCategory = selector(`li[data-section-id="${currentCategory}"]`);

    if (currentCategory) {
      activeCategory.classList.add("active");
      showTaskBySection();
    }

    const subMenusIcon = selectorAll(".nav-item-menu");

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

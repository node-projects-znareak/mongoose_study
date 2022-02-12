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
  })();
});

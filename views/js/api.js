import { getAllSectionTasks } from "../helpers/tasks.mjs";
import { createTaskSectionNode } from "../helpers/dom.mjs";

window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const spinner = document.getElementById("spinner");
    const sectionTasksList = document.getElementById("sections");
    const select = document.getElementById("icon");
    const req = await fetch("./icons/icons.json");
    const json = await req.json();
    const inputIcon = document.getElementById("_icon");
    window.icons = json;

    spinner.style.display = "none";

    for (const sectionTask of getAllSectionTasks()) {
      sectionTasksList.appendChild(
        createTaskSectionNode(
          sectionTask.title,
          sectionTask.desc,
          sectionTask.icon
        )
      );
    }

    for (const [name, [[icon]]] of Object.entries(window.icons)) {
      const op = document.createElement("li");
      op.setAttribute("data-icon", icon.name);
      // console.log(icon);
      op.innerHTML = `
          ${icon.svg_path}
          <span>${icon.name}</span>
      `;
      op.addEventListener("click", () => {
        select.parentNode.querySelector("span").innerHTML = op.innerHTML;
        inputIcon.value = op.querySelector("span").textContent;
      });
      select.appendChild(op);
    }
  })();
});

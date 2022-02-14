import { getAllsTask, getAllSectionTasks } from "./tasks.mjs";

const inputIcon = document.getElementById("_icon");

export function createTaskSectionNode(title, desc, icon) {
  const sectionTasksList = document.getElementById("sections");
  const li = document.createElement("li");
  const [[_icon]] = window.icons[icon];

  li.title = desc;
  li.innerHTML = `
        ${_icon.svg_path}
        <span>
          ${title}
        </span>

        <div class="nav-item-menu">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              title="Más opciones"
              aria-label="Más opciones"
            >
              <path
                d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
                fill="currentColor"
              />
              <path
                d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                fill="currentColor"
              />
              <path
                d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
                fill="currentColor"
              />
             <div class="nav-item-submenu">
                <ul class="nav-item-submenu-menu">
                  <li>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          fill-rule="evenodd" 
                          clip-rule="evenodd" 
                          d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z" fill="currentColor" /><path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" 
                          fill="currentColor" />
                      </svg>
                      <span>
                          Editar
                      </span>
                  </li>
                  <li>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z"
                          fill="currentColor"
                        />
                    </svg>
                  <span>
                    Eliminar
                  </span>
                  </li>
                </ul>
            </div>
        </div>
      `;

  sectionTasksList.appendChild(li);
}

export function createOptionList(icon, name, select) {
  const op = document.createElement("li");
  op.setAttribute("data-icon", icon.name);
  op.innerHTML = `${icon} <span>${name}</span>`;
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

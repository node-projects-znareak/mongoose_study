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
              width="20"
              height="20"
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

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

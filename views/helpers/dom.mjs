export function createTaskSectionNode(title, desc, icon) {
  const li = document.createElement("li");
  const [[_icon]] = window.icons[icon];

  li.title = desc;
  li.innerHTML = `
        ${_icon.svg_path}
        <span>
          ${title}
        </span>
      `;
  return li;
}

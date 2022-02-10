window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const select = document.getElementById("icon");
    const req = await fetch("./icons/icons.json");
    const json = await req.json();
    window.icons = json;

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
      });
      select.appendChild(op);
    }
  })();
});

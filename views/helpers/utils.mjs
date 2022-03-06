export function readFile(file) {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsText(file);
  });
}

export function isFileTooLarge(sizeFile) {
  const SIZE_ALLOWED = 2; // Mb
  const size = (sizeFile / (1024 * 1024)).toFixed(2);
  return size > SIZE_ALLOWED;
}

export function isJSONFile(file) {
  return file.type === "application/json";
}

export function validateImportedFile(file) {
  if (isFileTooLarge(file.size)) {
    return alert("El archivo no puede sobrepasar los 2 Mb"), false;
  }

  if (!isJSONFile(file)) {
    return alert("El archivo no es de formato JSON"), false;
  }
  return true;
}

export function ErrorAlert(msj, err = "Ocurrió un error") {
  Swal.fire(err, msj, "error");
  return false;
}

export const toArrayObject = (obj) => {
  const entries = Object.entries(obj);
  const parsed = entries.map(([key, value]) => ({ key, value }));
  return parsed;
};

export async function getIcons() {
  const req = await fetch("./icons/icons.json");
  const json = await req.json();
  return json;
}

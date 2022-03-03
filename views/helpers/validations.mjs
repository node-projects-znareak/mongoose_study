import { ErrorAlert } from "./utils.mjs";

const validateText = (str, msj) => {
  const text = /^[A-ZÀ-úa-z0-9\s\.]*$/gi;
  if (!text.test(str)) {
    ErrorAlert(`El campo ${msj} debe contener sólo letras y números`);
    return false;
  }
  return true;
};

export function validateCategory(category) {
  if (!category.title) return ErrorAlert("La categoría debe tener un titulo");
  if (!category.desc)
    return ErrorAlert("La categoría debe tener una descripción");
  if (!category.icon) return ErrorAlert("La categoría debe tener un ícono");

  return (
    validateText(category.title, "título") &&
    validateText(category.desc, "descripción")
  );
}

export function validateTask(task) {
  if (!task.title) return ErrorAlert("La tarea debe tener un titulo");
  if (!task.desc) return ErrorAlert("La tarea debe tener una descripción");

  return (
    validateText(task.title, "título") && validateText(task.desc, "descripción")
  );
}

// --------  TASKS --------

export function setTasks(tasks) {
  localStorage.setItem("task", JSON.stringify(tasks));
}

export function getAllsTask() {
  return JSON.parse(localStorage.getItem("task")) || [];
}

export function getTaskById(id) {
  const tasks = getAllsTask();
  const task = tasks.find((task) => task.id === id);
  return task;
}

export function editTaskById(id, _task) {
  const tasks = getAllsTask();
  const tasksEdited = tasks.map((task) => {
    return task.id === id ? { ...task, ..._task } : task;
  });
  setTasks(tasksEdited);
}

export function getLastTaskId() {
  const task = getAllsTask();
  const len = task.length;
  const lastId = task[len - 1]?.id;
  return lastId ? lastId + 1 : 1;
}

export function addTask(task) {
  const tasks = getAllsTask();
  task.id = getLastTaskId();
  increaseTaskCountBySection(task.sectionId);
  tasks.push(task);
  setTasks(tasks);
}

export function getTaskBySection(sectionId) {
  const taks = getAllsTask();
  const taskFilter = taks.filter((task) => task.sectionId === sectionId);
  return taskFilter;
}

export function toggleCompleteTask({ isCompleted, id }) {
  const tasks = getAllsTask();
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].isCompleted = isCompleted;
  setTasks(tasks);
}

export function deleteTask(id, sectionId) {
  const tasks = getAllsTask();
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
  setTasks(tasks);
  reduceTaskCountBySection(sectionId);
}

export function deleteTasksBySection(sectionId) {
  const tasks = getAllsTask();
  const tasksFilter = tasks.filter((task) => task.sectionId !== sectionId);
  setTasks(tasksFilter);

  return tasksFilter;
}

// -------- SECTION TASKS --------
export function getSectionTask(id) {
  const sectionTasks = getAllSectionTasks();
  const section = sectionTasks.find((task) => task.id === id);
  return section;
}

export function editSectionTask({ title, desc, icon, id }) {
  const sectionTask = getSectionTask(id);
  sectionTask.title = title || sectionTask.title;
  sectionTask.desc = desc || sectionTask.desc;
  sectionTask.icon = icon || sectionTask.icon;

  const sectionTasks = getAllSectionTasks().map((_sectionTask) => {
    return _sectionTask.id === sectionTask.id ? sectionTask : _sectionTask;
  });

  setSectionTasks(sectionTasks);
}

export function getAllSectionTasks() {
  return JSON.parse(localStorage.getItem("sectionTasks")) || [];
}

export function getCountSectionTasks() {
  return getAllSectionTasks().length;
}

export function getSectionById(sectionId, op) {
  const sectionTasks = getAllSectionTasks();
  const sectionTask = sectionTasks.find((section) => section.id === sectionId);
  op ? sectionTask.tasks++ : sectionTask.tasks--;
  setSectionTasks(sectionTasks);
}

export function deleteSectionTask(sectionId) {
  const sectionTasks = getAllSectionTasks();
  const sectionTasksFilter = sectionTasks.filter(
    (sectionTask) => sectionTask.id !== sectionId
  );
  setSectionTasks(sectionTasksFilter);
  deleteTasksBySection(sectionId);
  deleteCurrentSectionId();
  return sectionTasksFilter;
}

export function increaseTaskCountBySection(sectionId) {
  getSectionById(sectionId, true);
}

export function reduceTaskCountBySection(sectionId) {
  getSectionById(sectionId, false);
}

export function getTaskCountBySection(sectionId) {
  const tasks = getAllsTask();
  const count = tasks.filter((task) => task.sectionId === sectionId);
  return count.length;
}

export function setSectionTasks(sectionTasks) {
  localStorage.setItem("sectionTasks", JSON.stringify(sectionTasks));
}

export function getFirstSectionId() {
  return getAllSectionTasks()[0]?.id || 1;
}

export function createSectionId() {
  const sectionTasks = getAllSectionTasks();
  const len = sectionTasks.length;
  const lastId = sectionTasks[len - 1]?.id;
  return lastId ? lastId + 1 : 1;
}

export function getLastSectionId() {
  const sectionTasks = getAllSectionTasks();
  const len = sectionTasks.length;
  const lastId = sectionTasks[len - 1]?.id;
  return lastId !== undefined ? lastId : 1;
}

export function addSectionTask(sectionTask) {
  const sectionTasks = getAllSectionTasks();
  sectionTask.id = createSectionId();
  sectionTasks.push(sectionTask);
  setSectionTasks(sectionTasks);
}

export function getCurrentSectionId() {
  const id = localStorage.getItem("category_id");

  return id !== null ? Number(id) : null;
}

export function changeCurrentSectionId(sectionId) {
  localStorage.setItem("category_id", sectionId);
}

export function deleteCurrentSectionId() {
  localStorage.removeItem("category_id");
}

export function deleteDuplicateCategories(categoryArray1, categoriesArray2) {
  const categories = categoriesArray2.filter((_category) => {
    return !categoryArray1.some((category) => {
      return (
        category.id === _category.id &&
        category.title.toLocaleLowerCase() ===
          _category.title.toLocaleLowerCase()
      );
    });
  });
  return categories;
}

export function deleteDuplicateTasks(tasksArray1, taskArray2) {
  const tasks = taskArray2.filter((_task) => {
    return !tasksArray1.some((task) => {
      return (
        task.id === _task.id &&
        task.title.toLocaleLowerCase() === _task.title.toLocaleLowerCase()
      );
    });
  });
  return tasks;
}

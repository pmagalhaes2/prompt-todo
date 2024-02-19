const todoList = document.querySelector("#todo-list");
const menuButton = document.querySelector("#menu-button");
const form = document.getElementById("form-id");
const newTask = document.querySelector("#input-add");
const buttonAdd = document.querySelector("#button-add");

let tasks = [];

buttonAdd.addEventListener("click", (event) => {
  event.preventDefault();

  if (newTask.value.trim() === "") {
    alert("Tarefa inválida, digite novamente!");
    newTask.value = "";
  } else {
    addTask(newTask.value);
  }
});

menuButton.addEventListener("click", () => {
  menuOptions();
});

const menuOptions = () => {
  const option = parseInt(
    prompt(
      "Escolha uma opção para prosseguir: \n\n1 - Listar todas tarefas\n2 - Obter uma tarefa\n3 - Sair"
    )
  );
  switch (option) {
    case 1:
      listTasks();
      break;
    case 2:
      getTaskById();
      break;
    case 3:
      break;
    default:
      alert("Opção inválida!");
      break;
  }
};

const addTask = (name) => {
  const nextId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  tasks.push({
    id: nextId,
    nome: name,
    concluido: false,
  });

  updateTasks();
  form.reset();
};

const editTask = (taskId) => {
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    let newName = prompt("Informe o novo nome da tarefa: ");

    while (newName.trim() === "") {
      newName = prompt("Informe o novo nome da tarefa: ");
    }

    task.nome = newName;

    const newStatus = parseInt(
      prompt(
        "Informe o novo status da tarefa, sendo:\n1 - Concluída\n2 - Não concluída"
      )
    );

    if (newStatus != 1 && newStatus != 2) {
      alert(
        `Opção inválida! Tarefa permanece com status: ${
          task.concluido ? "Concluída" : "Não concluída"
        }`
      );
    } else {
      task.concluido = newStatus;
    }

    alert(`Tarefa de id: ${taskId} editada com sucesso!`);
  } else {
    alert(
      `Não existe nenhuma tarefa cadastrada com o id: ${taskId}. Tente novamente!`
    );
  }
  updateTasks();
};

const removeTask = (taskId) => {
  const indexToRemove = tasks.findIndex((task) => task.id === taskId);

  indexToRemove !== -1
    ? (tasks.splice(indexToRemove, 1),
      alert(`Tarefa de id: ${taskId} excluída com sucesso!`))
    : alert(
        `Não existe nenhuma tarefa cadastrada com o id: ${taskId}. Tente novamente!`
      );

  updateTasks();
};

const listTasks = () => {
  emptyTaskList();
  taskContent = "";

  if (tasks.length === 0) {
    const taskContent = document.createElement("h2");
    taskContent.innerHTML = "Lista de tarefas vazia!";
    todoList.appendChild(taskContent);
  } else {
    tasks.forEach((task) => {
      const taskItem = createTaskElement(task);
      todoList.appendChild(taskItem);
    });
  }
};

const createTaskElement = (task) => {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const taskName = document.createElement("span");
  taskName.innerHTML = task.nome;
  taskName.classList.add("task-name");

  const taskId = document.createElement("span");
  taskId.innerHTML = `Id: ${task.id}`;
  taskId.classList.add("task-id");

  const taskStatus = document.createElement("span");
  taskStatus.innerHTML = `${task.concluido ? "Concluída" : "Pendente"}`;
  taskStatus.classList.add("task-list");
  taskStatus.classList.add(task.concluido ? "done" : "pending");

  const iconsContainer = document.createElement("div");
  iconsContainer.setAttribute("class", "icons-container");

  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = "🗑️";

  const editIcon = document.createElement("span");
  editIcon.innerHTML = "✏️";

  iconsContainer.appendChild(deleteIcon);
  iconsContainer.appendChild(editIcon);

  taskItem.appendChild(taskName);
  taskItem.appendChild(taskId);
  taskItem.appendChild(taskStatus);
  taskItem.appendChild(iconsContainer);

  deleteIcon.addEventListener("click", () => removeTask(task.id));

  editIcon.addEventListener("click", () => editTask(task.id));

  return taskItem;
};

const emptyTaskList = () => {
  todoList.innerHTML = "";
};

const updateTasks = () => {
  emptyTaskList();
  listTasks();
};

const getTaskById = () => {
  const taskId = parseInt(prompt("Informe o id da tarefa: "));
  const task = tasks.find((task) => task.id === taskId);

  emptyTaskList();

  if (task) {
    const taskItem = createTaskElement(task);
    todoList.appendChild(taskItem);
  } else {
    const taskContent = document.createElement("h2");
    taskContent.innerHTML = `Tarefa de id: ${taskId} não encontrada!`;
    todoList.appendChild(taskContent);
  }
};

listTasks();

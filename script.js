const todoList = document.querySelector("#todo-list");
const menuButton = document.querySelector("#menu-button");

let tasks = [
  {
    id: 1,
    nome: "Tarefa 1",
    concluido: false,
  },
  {
    id: 2,
    nome: "Tarefa 2",
    concluido: false,
  },
  {
    id: 3,
    nome: "Tarefa 3",
    concluido: false,
  },
  {
    id: 4,
    nome: "Tarefa 4",
    concluido: true,
  },
];

menuButton.addEventListener("click", () => {
  menuOptions();
});

const menuOptions = () => {
  const option = parseInt(
    prompt(
      "Escolha uma opção para prosseguir: \n\n1 - Adicionar uma tarefa\n2 - Editar uma tarefa\n3 - Remover uma tarefa\n4 - Listar todas tarefas\n5 - Obter uma tarefa\n6 - Sair"
    )
  );
  switch (option) {
    case 1:
      addTask();
      break;
    case 2:
      editTask();
      break;
    case 3:
      removeTask();
      break;
    case 4:
      listTasks();
      break;
    case 5:
      getTaskById();
      break;
    case 6:
      break;
    default:
      alert("Opção inválida!");
      break;
  }
};

const addTask = () => {
  const name = prompt("Digite o nome da tarefa: ");
  const nextId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  tasks.push({
    id: nextId,
    nome: name,
    concluido: false,
  });

  alert("Tarefa adicionada com sucesso!");

  listTasks();
};

const editTask = () => {
  const taskId = parseInt(prompt("Informe o id da tarefa a ser editada: "));
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    const newName = prompt("Informe o novo nome da tarefa: ");
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

const removeTask = () => {
  const taskId = parseInt(prompt("Informe o id da tarefa a ser excluída: "));
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

      taskItem.appendChild(taskName);
      taskItem.appendChild(taskId);
      taskItem.appendChild(taskStatus);

      todoList.appendChild(taskItem);
    });
  }
};

const emptyTaskList = () => {
  todoList.innerHTML = "";
};

const updateTasks = () => {
  listTasks();
};

const getTaskById = () => {
  const taskId = parseInt(prompt("Informe o id da tarefa: "));
  const task = tasks.find((task) => task.id === taskId);

  emptyTaskList();

  if (task) {
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

    taskItem.appendChild(taskName);
    taskItem.appendChild(taskId);
    taskItem.appendChild(taskStatus);

    todoList.appendChild(taskItem);
  } else {
    const taskContent = document.createElement("h2");
    taskContent.innerHTML = `Tarefa de id: ${taskId} não encontrada!`;
    todoList.appendChild(taskContent);
  }
};

listTasks();

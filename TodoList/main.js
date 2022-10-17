// 1. 유저가 값을 입력한다.
// 2. + 버튼을 클릭하면, 할일이 추가된다.
// 3. Check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐진다.
// 4. Delete 버튼을 누르면 할일이 삭제된다.
// 5. List들을 클릭할 시 under-line이 움직인다.
// 6. All 메뉴를 누르면 전체 List 목록들이 보여진다.
// 7. Not Done 메뉴를 누르면 끝낸 List 목록들이 보여진다.
// 8. Done 메뉴를 누르면 해야하는 List 목록들이 보여진다.

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = [];
let taskTabs = document.querySelectorAll(".taskTabs li");
let mode = "all";
let filterList = [];

for (let i = 0; i < taskTabs.length; i++) {
  taskTabs[i].addEventListener("click", function (event) {
    fliter(event);
  });
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

function enter() {
  if (window.event.keyCode == 13) {
    addTask(), (taskInput.value = "");
  }
}

function addTask() {
  let task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <p class="taskDone">${list[i].taskContent}</p>
      <div class="listBtn">
        <button onclick="checkComplete('${list[i].id}')">Check</button>
        <button onclick="deletTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <p>${list[i].taskContent}</p>
      <div class="listBtn">
        <button onclick="checkComplete('${list[i].id}')">Check</button>
        <button onclick="deletTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    }
  }
  document.getElementById("listBoard").innerHTML = resultHTML;
}

function checkComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deletTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function fliter(event) {
  mode = event.target.id;
  filterList = [];

  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetBottom;
  document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px";

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomId() {
  return (
    "_" +
    (
      Number(String(Math.random()).slice(2)) +
      Date.now() +
      Math.round(performance.now())
    ).toString(36)
  );
}

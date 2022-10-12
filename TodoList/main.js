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
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
    <p>${taskList[i]}</p>
    <div class="listBtn">
      <button>Check</button>
      <button>Delete</button>
    </div>
   </div>`;
  }
  document.getElementById("listBoard").innerHTML = resultHTML;
}

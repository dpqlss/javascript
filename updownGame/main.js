// // 1. 랜덤번호 지정
// // 2. user가 번호를 입력한다. 그리고 go라는 버튼을 누름
// // 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// // 4. 랜덤번호가 < 유저번호 Down!!!
// // 5. 랜덤번호가 > 유저번호 Up!!
// // 6. Reset버튼을 누르면 게임 리셋
// // 7. 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가, 버튼 disable)
// // 8. 유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// // 9. 유저가 이미 입력한 숫자를 또 입력하면, 기회를 깎지 않는다.

let computerNum = 0;
let playBtn = document.getElementById("playBtn");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("resultArea");
let resetBtn = document.getElementById("resetBtn");
let chancesArea = document.getElementById("chancesArea");
let chances = 5;
let history = [];

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function randomNum() {
  computerNum = Math.floor(Math.random() * 50) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 50) {
    resultImg.src =
      "https://media.giphy.com/media/Atc9QCyWLGHgLZhHDp/giphy.gif";
    resultArea.textContent = "1부터 50사이의 숫자만 입력해주세요";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다.";
    return;
  }

  chances--;
  chancesArea.textContent = `남은 기회 : ${chances}번`;

  if (userValue < computerNum) {
    resultImg.src =
      "https://media.giphy.com/media/KBJTi1lxDGrfPsl8Hf/giphy.gif";
    resultArea.textContent = "Up!!";
  } else if (userValue > computerNum) {
    resultImg.src =
      "https://media.giphy.com/media/1zRh4Pd194SGsEjw6c/giphy.gif";
    resultArea.textContent = "Down!!";
  } else {
    resultImg.src = "https://media.giphy.com/media/P1HOxaZSTcp4k/giphy.gif";
    resultArea.textContent = "Success!!";
    playBtn.disabled = true;
  }

  history.push(userValue);
  console.log("남은 기회 :", chances, "입력한 숫자 :", history);

  if (chances < 1 && userValue != computerNum) {
    playBtn.disabled = true;
    resultArea.textContent = "Game Over";
    resultImg.src = "https://media.giphy.com/media/dkuZHIQsslFfy/giphy.gif";
  }
}

function reset() {
  resultArea.textContent = "결과가 나옵니다.";
  resultImg.src = "https://media.giphy.com/media/VwM9w72cXiSHu/giphy.gif";
  userInput.value = "";
  history;
  history = [];
  chances = 5;
  chancesArea.textContent = "남은 기회 : 5번";
  playBtn.disabled = false;
  randomNum();
}

randomNum();

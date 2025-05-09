//요청1) 강아지 여러마리 요청 -> https://dog.ceo/api/breeds/list/all
//요청2) 견종 정보 요청 -> https://dog.ceo/api/breeds/image/random/42

const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42";
const apiAllDogsInfo = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById("header");
const main = document.getElementById("main");
const input = document.getElementById("filter-text");
const button = document.getElementById("filter-button");
const select = document.getElementById("filter-select");

const currentDogs = [];

window.addEventListener("load", function () {
  // 강아지 사진 뿌리기
  request1.open("get", apiRandomDogs);
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response);
    response.message.forEach(function (item) {
      currentDogs.push(item);
      const dogImgDiv = document.createElement("div");
      dogImgDiv.classList.add("flex-item");
      dogImgDiv.innerHTML = `
        <img src=${item}>
      `;
      main.appendChild(dogImgDiv);
    });
  });
  request1.send();

  //select에 견종 정보 뿌리기
});

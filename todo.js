//요소 선택 및 배열 선언
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
let todoArr = []; //할일 배열

// (5) 로컬 스토리지에 저장
function saveTodos() {
  const todoString = JSON.stringify(todoArr);
  localStorage.setItem("myTodos", todoString);
}

// (6) 로컬 스토리지에서 가져오기 -> 페이지 열었을때 한번만 가져온다.
function loadTodos() {
  const myTodos = localStorage.getItem("myTodos");
  if (myTodos != null) {
    todoArr = JSON.parse(myTodos);
    ShowTodos();
  }
}
loadTodos();

// (4) 할 일 삭제
function DeletedTodoItems(clickedId) {
  todoArr = todoArr.filter(function (aTodo) {
    //클릭된 아이템은 제외하고 나머지는 남긴다
    return aTodo.todoId !== clickedId;
  });
  ShowTodos();
}

// (3) 할 일 수정하기
function TodoItemClick(clickedId) {
  todoArr = todoArr.map(function (aTodo) {
    //map에서 완성된 조작된 내용을 todoArr에 덮어쓰기
    if (aTodo.todoId === clickedId) {
      return {
        //클릭한 todoId가 map에서 나왔으면 기존의 todo내용에 todoDone을 반전시켜 처리한다. (! -> true를 false로 뒤집는 연산)
        ...aTodo,
        todoDone: !aTodo.todoDone,
      };
    } else {
      return aTodo;
    }
  });
  ShowTodos();
  saveTodos(); //스토리지에 저장
}

// (2) 할 일 보여주기
function ShowTodos() {
  todoList.innerHTML = "";
  todoArr.forEach(function (aTodo) {
    const todoItem = document.createElement("li");
    const todoDel = document.createElement("span");
    todoDel.textContent = "x";
    todoItem.textContent = aTodo.todoText;
    todoItem.title = "클릭하면 추가됩니다.";
    todoDel.title = "클릭하면 삭제됩니다.";
    if (aTodo.todoDone) {
      todoItem.classList.add("done"); //todoDone이냐 아니냐에 따라 값을 줄것임 -> true면 done, false면 yet
    } else {
      todoItem.classList.add("yet");
    }
    todoItem.addEventListener("click", function () {
      TodoItemClick(aTodo.todoId);
    });

    todoDel.addEventListener("click", function () {
      DeletedTodoItems(aTodo.todoId);
    });

    todoItem.appendChild(todoDel);
    todoList.appendChild(todoItem);
  });
}

// (1) 할 일 추가
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const toBeAdded = {
    //할일 객체 생성
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(),
    todoDone: false,
  };
  todoForm.todo.value = "";
  todoArr.push(toBeAdded);
  ShowTodos();
  saveTodos(); //스토리지에 저장
});

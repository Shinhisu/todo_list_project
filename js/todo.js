
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");//document.querySelector("#todo-form input")후손 셀렉터
const toDoList = document.getElementById("todo-list");
let toDos = [];
// 새로고침 시 빈 array로 재시작 --> 함수 실행 뒤 localStorage에는 빈 value만 남는 문제, 이전 value 저장 필요
const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  /*저장 but 새로고침 시 입력todo 보이지 않음 + 추가 입력 시 기존 localStorage 저장 내역 삭제 문제 + array아닌 단순 text로 저장되는 문제 -->stringify함수 통해 string(문자열)로 전환 -> localStorage 항목에 string 형식으로 저장 가능
  -->json parase 통해 string 입력값을 array로 저장 가능*/
}

function deleteTodo(event) { //event가 어떤 button에서 발견되는지 파악, 해당 li찾아서 제거
  const li = event.target.parentElement // 삭제 해당 li
  //event.target으로 특정 button 발견, parentElement로 button 부모요소 li 발견, dir로 확인할 것
  li.remove();

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  /*toDo는 toDos DB내부 배열의 각 요소를 의미
  toDo.id = number, li.id = string 
  parseInt function 통해 string을 int로 변환하여 비교*/
}

function paintToDo(newTodoObj) {//li 만들고 그것을 ul에 추가, object 저장됨
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span); // li 내부에 span을 삽입함, delete 버튼 삽입 위한 span 추가
  li.appendChild(button);
  toDoList.appendChild(li);
  //ul은 html 내부 값, js에서 바로 인식 불가능// li, span은 둘다 js 통해 생성되었기에 appendchild 바로 사용 된듯
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;//inputvalue 초기화 되더라도 값 저장, 단순 text
  toDoInput.value = ""//todo-list 작성 후 입력값 제거 
  const newTodoObj = {
    text: newTodo, //object내 개체 설정시 , 
    id: Date.now()//일종의 랜덤 변수
  }
  toDos.push(newTodoObj); //push 함수 통해 object를 배열에 저장 ->savetodo 함수로 localstorage에 저장
  paintToDo(newTodoObj);
  saveToDos();//newTodo 값을 lacalStorage에 저장
}

toDoForm.addEventListener("submit", handleToDoSubmit); //submit event를 handle 함수 첫번째 인자로 제공함

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos != null) {
  const parasedToDos = JSON.parse(savedToDos); //string 입력값을 array로 저장 가능
  toDos = parasedToDos
  /*새로고침시에도 localstorage에는 이전 값 저장, 함수 실행 전 array에 이전 localStorage 값 저장으로 새로고침 문제 해결, but array 값 삭제 후 새로고침 시에 이전값 남는 문제 발생-->newTodo*/
  parasedToDos.forEach(paintToDo);
}
  /*forEach = 받은 array를 for 반복문 없이 item 하나씩 function에 제공
item 변수는 parasedToDos array의 item으로 js가 기본 제공함*/
/*parasedToDos.forEach((item) => console.log("this is the turn of", item));후술 내용과 동일 방법

function sayHello(item) {//처리중인 array내 item 변수 js가 기본 제공
  console.log("the data", item);
}
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos) {
  const parasedToDos = JSON.parse(savedToDos);
  parasedToDos.forEach(sayHello);//받은 array를 for 반복문 없이 item 하나씩 function에 넣음*/
/*.filter() : forEach처럼 배열 값을 하나씩 제공 ->내부의 true 값 통과시 새로운 배열로 반환, 특정 값 제거 시 그 값을 제외한 새로운 배열을 작성 함
ex)
const array = [1,2,3,4]
array.filter(array => array !== 3);
//filter 통해 입력값에 array item을 하나씩 제공

= arrow function, 좌측 입력값에 대해 우측 표현에 대한 값을 return하는 함수 표현 방식
return 입력시 출력에 중괄호 입력,
출력에 return만 존재시 중괄호, return 생략 가능
*/

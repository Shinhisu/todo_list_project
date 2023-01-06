//getElememtById경우 #제거
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden"; // string값 자주 사용할 경우 대문자 변수로 지정
const USERNAME_KEY = "username";

function onLogInSubmit(event) { //console.dir(loginInput);으로 input 값 저장위치 확인
  event.preventDefault(); // event의 기본행동(ex. submit -> 새로고침) 발생을 막는 function
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);//브라우저에 값 저장하는 api(새로고침 후에도 남음), (변수, 값)으로 구성 - 문서참조
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(username);
}
function paintGreetings(username) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello ${username}`;//(string+변수), 변수에 ${}필요, ''x ``0
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLogInSubmit); //함수명 +() = 즉시실행}
  //eventlistner = 한 event 실행 후 바로 함수 실행x --> onlogin함수()에 어떤 값 넣은 뒤 실행함
  //따라서 onlogin 함수 첫 argument(매개변수)에 해당 값이 저장되며 대게 'event'라는 명칭 사용
  //저장 된 값에는 prevnetdefault함수 등이 있음

}
else {
  paintGreetings(savedUsername);
}

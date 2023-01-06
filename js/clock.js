/*css selector combination 규칙
- 후손 셀렉터(Descendent Selector) : '스페이스'로 연결, 자식 + 그 내부 요소도 포함
- 자식 셀렉터(Child Selector) : ' >' 로 연결 // 바로 아래 자식만 포함*/
const clock = document.querySelector("h2#clock");
//setinterval (함수명, 반복간격ms), 시간마다 반복
//setTimeout (함수명, 기다릴 시간ms), 반복x

const getClock = new Intl.DateTimeFormat('en-US', {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
})
function clockStart() {
  clock.innerHTML = getClock.format(new Date());
}
clockStart();
setInterval(clockStart, 1000);



/*function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");//String()통해 number -> string paddStart 적용
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}
getClock(); //새로고침 후 바로 시간 실행 - 1초 대기 제거
setInterval(getClock, 1000);
//padStart(원하는 string 길이, 길이 부족시 추가할 string),
//padEnd() - 부족시 뒤에 string 추가*/

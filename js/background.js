const images = ["0.jpg", "1.jpg", "2.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");//img tag 생성
bgImage.src = `img/${chosenImage}`;
document.body.appendChild(bgImage);// appendChild는 종속변수를 특정 노드의 마지막 자식으로 붙임
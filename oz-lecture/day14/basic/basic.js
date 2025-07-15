// 비동기 개념
// console.log("이미지 로딩 시작");
// // console.log("이미지 로딩");
// setTimeout(() => {
//   console.log("이미지 로딩");
// }, 2000);

// console.log("다른 작업 수행");

// 콜백함수
function sayHello(name, callback) {
  console.log(`안녕, ${name}`);
  setTimeout(() => {
    callback();
  }, 2000);
}

function sayHello2(name) {
  console.log(`[2]안녕, ${name}`);
}

sayHello("학생", () => {
  console.log("콜백 실행");
});
sayHello2("학생");
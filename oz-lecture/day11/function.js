// 구구단
// 함수 정의 - 함수 선언문
function gugudan3() {
  for (let i = 1; i <= 9; i++) {
    console.log(`3 x ${i} = ${3 * i}`);
  }
}

// 함수 정의 - 함수 표현식
const gugudan4 = function () {
  for (let i = 1; i <= 9; i++) {
    console.log(`4 x ${i} = ${4 * i}`);
  }
};

// 함수 정의 - 화살표 함수
const gugudan5 = () => {
  for (let i = 1; i <= 9; i++) {
    console.log(`5 x ${i} = ${5 * i}`);
  }
};

// gugudan3(); // 함수 실행
// gugudan4(); // 함수 실행
// gugudan5(); // 함수 실행

// 함수 선언문
function gugudanDeclare(num) {
  for (let i = 1; i <= 9; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
}
// gugudanDeclare(2); // 2단

// 2단 ~ 9단까지 출력하는 코드
// for (let i = 1; i < 9; i++) {
//   gugudanDeclare(i + 1);
// }

// 함수 표현식
const gugudanExpression = function (num) {
  for (let i = 1; i <= 9; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
};
// gugudanExpression(2); // 2단

// 화살표 함수 void()
const gugudanArrow = (num) => {
  for (let i = 1; i <= 9; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
};
// gugudanArrow(2);

// 숫자 계산 함수
function sum(scores) {
  let sumVal = 0;
  for (const score of scores) {
    sumVal += score;
  }
  return sumVal;
}
let math = 70;
let english = 90;
let social = 80;
let music = 70;
let science = 85;
const scores = [math, english, social, music, science];

// 합계
const total = sum(scores);
// console.log(total);

function avg(num1 = 10, num2 = 20) {
  return (num1 + num2) / 2;
}
const average = avg();

function sumDeclare(num1, num2) {
  return num1 + num2;
}
const sumArrow = (num1, num2) => num1 + num2;

// const sumArrow = (num1, num2) => {
//     return num1 + num2
// }
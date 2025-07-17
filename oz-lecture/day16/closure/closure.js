// 전역변수와 지역변수

// let globalVar = "I am global";

// function myFunction() {
//   let localVar = "I am local";
//   console.log(globalVar); // 출력
//   console.log(localVar); // 출력
// }
// myFunction(); // 함수의 생애주기 lifecycle

// console.log(globalVar); // 출력
// console.log(localVar); // 오류

// 클로저
// const x = 1;
// function outer() {
//   const x = 10;
//   const inner = function () {
//     console.log(x);
//   };
//   return inner;
// }

// const innerFunction = outer();
// innerFunction(); // 중첩함수

// 클로저 - 카운트 상태 변경 함수
// const increase = (function () {
//   let num = 0;
//   return function () {
//     return ++num;
//   };
// })();
// console.log(increase());
// console.log(increase());
// console.log(increase());
// console.log(increase());

const counter = (function () {
  let num = 0; // 카운트 상태 변수 (state)
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();
console.log(counter.increase());
console.log(counter.increase());
console.log(counter.increase());
console.log(counter.increase());
console.log(counter.decrease());
console.log(counter.decrease());
console.log(counter.decrease());
console.log(counter.decrease());
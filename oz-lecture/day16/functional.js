// function add(a, b) {
//   return a + b;
// }
// const result1 = add(2, 3); //5
// const result2 = add("나는", "태민");
// const result3 = add(true, false);

// let num1 = 2;
// let num2 = 3;
// const result4 = add(num1, num2); // 인수

// const add = function (a, b) {
//   return a + b;
// };

// const add = (a, b) => a + b;

// function addTotal(add1) {
//   return add1;
// }

// addTotal(1);
// let a = addTotal(add(1, 2));
// console.log(a);

// const add = function (a) {
//   return function (b) {
//     return a + b;
//   };
// };

// const add5 = add(5);
// const add5and10 = add5(10);

const add = function (a, b) {
  return a + b;
};
console.log(add(2, 3)); // 5

// 인자로 함수를 받아서
// 매개변수 2개를 함수의 인자로 사용함
function cal(func, num1, num2) {
  return func(num1, num2);
}
console.log(cal(add, 2, 3));

// 인자로 함수를 받음
// 함수 안에서 그 함수를 실행함
// 함수를 인자로 받을 수 있는 이유는 함수를 변수에 할당할 수 있는 것과 동일함
function addTotal(add1, add2) {
  return add1(add2(1, 2), 3);
}
const total = addTotal(add, add);
console.log(total);

// 호출부에서 이미 add(1,2)와 add(3,4가 계산됨)
// add1과 add2는 이미 숫자값임 (add1 = 3, add2 = 7)
function addTotalMistake(add1, add2) {
  return add(add1, add2);
}
console.log(addTotalMistake(add(1, 2), add(3, 4)));
{
  /* <button onclick="handleClick()"> </button> */
}
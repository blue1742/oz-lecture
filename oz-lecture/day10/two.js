let num1 = 10;
let num2 = 20;

// console.log(num1);
// console.log(num2);

// 이항 산술연산자
let sum = 10 + 20; // 30
let sub = 20 - 10; // 10
let multi = 10 * 20; // 200
let div = 10 / 2; // 5
let remain = 10 % 3; // 1
let expon = 2 ** 3; // 2 * 2 * 2 = 8

console.log("sum", sum);
console.log("sub", sub);
console.log("multi", multi);
console.log("div", div);
console.log("remain", remain);
console.log("expon", expon);

let sumNum1Num2 = num1 + num2; // 10 + 20
let subNum1Num2 = num1 - num2; // 10 - 20
let subNum2Num1 = num2 - num1; // 20 - 10
console.log("num1 + num2", sumNum1Num2); // 30
console.log("num1 - num2", subNum1Num2); // -10
console.log("num2 - num1", subNum2Num1); // 10

let totalSum = sumNum1Num2 + subNum1Num2 + subNum2Num1; // 30 - 10 + 10 = 30
console.log("sumNum1Num2 + subNum1Num2 + subNum2Num1", totalSum);

// totalSum = sumNum1Num2 + subNum1Num2 + subNum2Num1; // 30 - 10 + 10 = 30
// console.log("sumNum1Num2 + subNum1Num2 + subNum2Num1", totalSum);
// map
// let numbers = [1, 2, 3];

// numbers에 있는 모든 숫자 값을 2배로 하고싶다.
// let newNumbers = [];
// for (let i = 0; i < numbers.length; i++) {
//   const num = numbers[i];
//   newNumbers.push(num * 2);
// }
// numbers = newNumbers;

// function double(num) {
//   return num * 2;
// }
// let newNumbers = [];
// for (let i = 0; i < numbers.length; i++) {
//   const num = numbers[i];
//   newNumbers.push(double(num));
// }
// numbers = newNumbers;
// console.log(numbers);

let numbers = [1, 2, 3];
// numbers = numbers.map((num) => {
//   return num * 2;
// });

numbers = numbers.map((num) => num * 2);
// console.log(numbers);

// filter
let numbersA = [1, 2, 3, 4, 5, 6];
// 짝수인 값만 빼고 싶어요

// let newNumbersA = [];
// for (const num of numbersA) {
//   if (num % 2 === 0) newNumbersA.push(num);
// }
// console.log(newNumbersA);

// const even = function (num) {
//   if (num % 2 === 0) return num;
// };
// let newNumbersA = [];
// for (const num of numbersA) {
//   if (even(num)) newNumbersA.push(even(num));
// }
// console.log(newNumbersA);

// numbersA = numbersA.filter((num) => {
//   return num % 2 === 0;
// });

numbersA = numbersA.filter((num) => num % 2 === 0);
// console.log(numbersA);

// reduce
let numbersB = [1, 2, 3, 4];
// 배열에 있는 값의 총합
// let sum = 0;
// numbersB.forEach((num) => {
//   sum += num;
// });
// console.log(sum);

// const sum = (a, b) => {
//   return a + b;
// };

// const sum1 = sum(sum(sum(sum(0, 1), 2), 3), 4);
// console.log(sum1);

const sum = numbersB.reduce((acc, num) => acc + num, 10);
console.log(sum);
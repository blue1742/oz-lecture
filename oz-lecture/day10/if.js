let num = -2;

if (num > 0) {
  console.log("양수");
} else if (num === 0) {
  console.log("0");
} else {
  console.log("음수");
}

const LIMIT = 80;
let score = 90;
let isGoodStudent;

if (score < LIMIT) {
  console.log("낙제");
  if (score === 0) {
    console.log("점수 0 : 검토필요");
  }
} else {
  if (score > 90) {
    isGoodStudent = true;
    console.log("A");
  } else if (score > 80) {
    isGoodStudent = true;
    console.log("B");
  } else {
    isGoodStudent = false;
    console.log("C");
  }
}

// 이렇게 1과 0으로 표현하기도 하는데
// 가급적 true, false가 낫지 않을까요?
let isGood = 1; // true
if (isGood) {
  console.log("Good!!!!");
} else {
  console.log("BAD!!!!!!");
}
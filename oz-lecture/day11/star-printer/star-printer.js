// 사용자 입력
// input 검증

const STAR = "*";
const DASH = "-";
const PATTERNS = [2, 3, 4, 1, 9, 4, 5];

const getPromptInput = () => {
  let input;
  let isNotValid = true;
  while (isNotValid) {
    let inputStr = prompt("출력할 별 갯수를 입력하세요.");
    input = Number(inputStr);
    if (isNaN(input)) {
      isNotValid = true;
      console.log(
        `[입력: ${inputStr}] Invalid input! This is not number. Please enter number.`
      );
      continue;
    }
    if (input >= 1 && input <= 10) {
      isNotValid = false;
    } else {
      console.log(
        `[입력: ${inputStr}] Invalid input! Enter a number between 1 and 10.`
      );
    }
  }
  return input;
};

function getSigns(count, sign) {
  let signs = "";
  for (let i = 0; i < count; i++) {
    signs += sign;
  }
  return signs;
}

function getStars(count) {
  return getSigns(count, STAR);
}

function getDashes(count) {
  return getSigns(count, DASH);
}

function printResult(input, stars) {
  console.log(`[입력: ${input}] ${stars}`);
}

// 기본과제
const printNormalStars = function (input) {
  const stars = getStars(input);
  printResult(input, stars);
};

// 역순별출력
const printReverseStars = function (input) {
  // 3
  // ***
  // **
  // *
  console.log("[역순 별찍기]");
  for (let i = input; i >= 0; i--) {
    const stars = getStars(i);
    if (stars === "") break;
    console.log(stars);
  }
};

// 정사각형 출력
const printSquare = function (input) {
  // 3
  // ***
  // ***
  // ***
  console.log("[정사각형 별찍기]");
  for (let i = 0; i < input; i++) {
    const stars = getStars(input);
    console.log(stars);
    if (i + 1 !== input) console.log(getDashes(input));
  }
};

const printPatterns = () => {
  console.log("[패턴 별찍기]");
  console.log("저장된 패턴 :", PATTERNS.toString());
  PATTERNS.map((num) => console.log(`패턴값 ${num}: ${getStars(num)}`));
};

const printMultipleStars = (...multipleNums) => {
  console.log("[여러숫자 별찍기]");
  multipleNums.map((num) =>
    console.log(`Stars for count ${num}: ${getStars(num)}`)
  );
};

console.log("Enter the number of stars (1-10):");
const input = getPromptInput();
printNormalStars(input);
printReverseStars(input);
printSquare(input);
printPatterns();
printMultipleStars(4, 3, 2, 4, 4, 5, 3, 3, 3, 5, 3, 4, 2, 7, 5, 4);
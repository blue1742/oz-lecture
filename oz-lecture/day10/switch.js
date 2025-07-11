let food = "banana";

switch (food) {
  case "apple":
  case "banana":
  case "cherry":
  case "melon":
    console.log("fruit");
    break;

  default:
    console.log("not food");
    break;
}

////////////////////////

let score = 90;
let grade;
if (score >= 90 && score <= 100) {
  grade = "A++";
}

console.log("grade", grade);
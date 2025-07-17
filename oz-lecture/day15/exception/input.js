const input = "not-a-number";

try {
  const number = Number(input); // NaN
  if (isNaN(number)) throw new Error("숫자를 입력하세요.");
  console.log("입력값:", number);
} catch (error) {
  console.log(error);
  alert(error.message);
}
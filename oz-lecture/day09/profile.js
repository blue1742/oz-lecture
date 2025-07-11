// 1. 변수 선언 (var, let, const) 및 다양한 자료형 사용
// 이름 : 우명식
// 나이 : 30
// 직업 : 수강생
// 취미 : 코딩 , 독서 , 게임
// 특이사항 :
// 1.  2살 좀 넘은 말랑이와 함께 살고 있습니다.
// 2. OZ 코딩스쿨 강의를 듣고 있습니다.
// 3. 자바스크립스에 관심이 많습니다.

// 추가 자료형
let graduationYear = null;            // null
var middleName;                       // undefined
const uniqueCode = Symbol("userId");  // Symbol
const bigNumber = 12345678901234567890n; // BigInt

// 2. 문자열 처리 (이스케이프 문자, 문자열 연결 연산자)
console.log("📌 프로필 정보\n\t이름, 나이, 학생 여부를 포함합니다.\n");
console.log("안녕하세요! 제 닉네임은 " + nickname + "이고, 나이는 " + age + "살입니다.");

// 3. 배열 리터럴 - 취미 3개 이상
let hobbies = ["coding", "playing guitar", "traveling"];
console.log("나의 취미는: " + hobbies.join(", "));

// 4. 객체 리터럴 - 최소 3개 속성
const profile = {
  name: nickname,
  age: age,
  isStudent: isStudent
};
console.log("👤 이름: " + profile.name + ", 학생 여부: " + profile.isStudent);

// 5. typeof 연산자 사용
console.log("📌 typeof hobbies: " + typeof hobbies);   // object (배열)
console.log("📌 typeof profile: " + typeof profile);   // object
console.log("📌 typeof bigNumber: " + typeof bigNumber); // bigint
console.log("📌 typeof middleName: " + typeof middleName); // undefined
console.log("📌 typeof graduationYear: " + typeof graduationYear); // object (null 특이점)

// 참고 출력
console.log("\n🔍 Symbol 값:", uniqueCode.toString());


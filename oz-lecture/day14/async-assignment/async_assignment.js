// 변수 선언 (var, let, const 각각 최소 1회 사용)
const MAX_TIME = 10; // 최대 시간 상수
let timerCount = 0; // 현재 타이머 카운트
var timerMessage = ""; // 타이머 메시지 변수
let timerInterval = null; // 타이머 인터벌 저장

// DOM 요소 참조
const timerInput = document.getElementById("timerInput");
const startButton = document.getElementById("startTimer");
const timerDisplay = document.getElementById("timerDisplay");

// 타이머 시작 함수 (함수 선언문, 매개변수 기본값 사용)
function startTimer(seconds = 10) {
  // 입력 유효성 검사
  if (isNaN(seconds) || seconds < 1 || seconds > MAX_TIME) {
    // 에러 메시지 출력
    timerMessage = "유효한 숫자(1-10)를 입력하세요!";
    timerDisplay.textContent = timerMessage;
    timerDisplay.classList.add("error");
    return;
  }

  // 에러 클래스 제거
  timerDisplay.classList.remove("error");

  // 타이머 초기화
  timerCount = seconds;
  
  // 버튼 비활성화
  startButton.disabled = true;

  // 초기 타이머 표시
  timerMessage = `타이머: ${timerCount}초`;
  timerDisplay.textContent = timerMessage;

  // setInterval로 타이머 구현 (비동기 처리)
  timerInterval = setInterval(function() {
    timerCount--;
    
    if (timerCount > 0) {
      // 타이머 진행 중
      timerMessage = `타이머: ${timerCount}초`;
      timerDisplay.textContent = timerMessage;
    } else {
      // 타이머 종료
      clearInterval(timerInterval);
      timerMessage = "타이머 종료!";
      timerDisplay.textContent = timerMessage;
      
      // 버튼 재활성화
      startButton.disabled = false;
    }
  }, 1000); // 1초마다 실행
}

// 버튼 클릭 이벤트 리스너
startButton.addEventListener("click", function() {
  // 입력값 가져오기 및 숫자 변환
  const inputValue = timerInput.value;
  const seconds = Number(inputValue);
  
  // 타이머 시작
  startTimer(seconds);
});

// Enter 키 눌렀을 때도 타이머 시작 (추가 기능)
timerInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    startButton.click();
  }
});

// 입력 필드 포커스 시 이전 에러 메시지 제거 (추가 기능)
timerInput.addEventListener("focus", function() {
  if (timerDisplay.classList.contains("error")) {
    timerDisplay.textContent = "";
    timerDisplay.classList.remove("error");
  }
});
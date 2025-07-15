// 변수 선언 (var, let, const 각각 최소 1회 사용)
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts"; // API 기본 URL
let fetchResults = {}; // 가져온 게시물 저장 객체
var isLoading = false; // 로딩 상태 변수

// DOM 요소 참조
const postIdsInput = document.getElementById("postIds");
const fetchButton = document.getElementById("fetchPosts");
const outputDiv = document.getElementById("output");

// 화살표 함수로 다중 게시물 가져오기 (...rest 매개변수 사용)
const fetchMultiplePosts = async (...postIds) => {
  const results = {};
  
  // for...of 반복문으로 각 ID 순회
  for (const id of postIds) {
    try {
      // fetch API로 데이터 가져오기
      const response = await fetch(`${API_BASE_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const postData = await response.json();
      results[id] = postData;
    } catch (error) {
      // 에러 발생 시 에러 메시지 저장
      results[id] = { error: error.message };
    }
  }
  
  return results;
};

// 결과를 HTML로 렌더링하는 함수
function renderResults(results) {
  let html = "";
  
  // for...in 반복문으로 결과 객체 순회
  for (const id in results) {
    const post = results[id];
    
    if (post.error) {
      // 에러가 있는 경우
      html += `
        <div class="post">
          <strong>post${id}: 에러: ${post.error}</strong>
        </div>
      `;
    } else {
      // 정상 데이터인 경우
      html += `
        <div class="post">
          <strong>post${id}: ${post.title}</strong>
          <p>${post.body}</p>
        </div>
      `;
    }
  }
  
  outputDiv.innerHTML = html;
}

// 입력 유효성 검사 함수
function validateInput(inputValue) {
  // 빈 값 검사
  if (!inputValue.trim()) {
    return { valid: false, message: "게시물 ID를 입력하세요!" };
  }

  // 쉼표로 분리하여 배열로 변환
  const ids = inputValue.split(",").map(id => id.trim());
  const validIds = [];

  // 각 ID 검증
  for (const id of ids) {
    const numId = Number(id);
    
    // 숫자가 아니거나 1-100 범위를 벗어난 경우
    if (isNaN(numId) || numId < 1 || numId > 100) {
      return { valid: false, message: "유효한 ID(1-100)를 입력하세요!" };
    }
    
    validIds.push(numId);
  }

  return { valid: true, ids: validIds };
}

// 메인 로직 함수 (함수 표현식)
const runChallenge = async function() {
  // 이미 로딩 중이면 중단
  if (isLoading) return;

  // 입력값 가져오기
  const inputValue = postIdsInput.value;
  
  // 입력 유효성 검사
  const validation = validateInput(inputValue);
  
  if (!validation.valid) {
    // 에러 메시지 표시
    outputDiv.innerHTML = `<div class="error">${validation.message}</div>`;
    outputDiv.classList.add("error");
    return;
  }

  // 에러 클래스 제거
  outputDiv.classList.remove("error");
  
  // 로딩 상태 설정
  isLoading = true;
  fetchButton.disabled = true;
  outputDiv.innerHTML = '<div style="text-align: center; color: #007bff;">게시물을 가져오는 중...</div>';

  try {
    // 다중 게시물 가져오기 (스프레드 연산자로 배열 전개)
    fetchResults = await fetchMultiplePosts(...validation.ids);
    
    // 결과 렌더링
    renderResults(fetchResults);
    
  } catch (error) {
    // 전체적인 에러 처리
    outputDiv.innerHTML = `<div class="error">게시물을 가져오는 중 오류가 발생했습니다: ${error.message}</div>`;
    outputDiv.classList.add("error");
  } finally {
    // 로딩 상태 해제
    isLoading = false;
    fetchButton.disabled = false;
  }
};

// 버튼 클릭 이벤트 리스너
fetchButton.addEventListener("click", runChallenge);

// Enter 키 눌렀을 때도 실행 (추가 기능)
postIdsInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    runChallenge();
  }
});

// 입력 필드 포커스 시 이전 에러 메시지 제거 (추가 기능)
postIdsInput.addEventListener("focus", function() {
  if (outputDiv.classList.contains("error")) {
    outputDiv.innerHTML = "";
    outputDiv.classList.remove("error");
  }
});
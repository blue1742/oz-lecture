// list.js (포스트 목록 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 로딩 상태 표시
function showLoading() {
  const postList = document.getElementById("post-list");
  postList.innerHTML = '<li class="loading">포스트를 불러오는 중...</li>';
}

// 에러 메시지 표시
function showError(message) {
  const postList = document.getElementById("post-list");
  postList.innerHTML = `<li class="error">오류: ${message}</li>`;
}

// 포스트 목록 표시
async function displayPosts() {
  showLoading();
  
  try {
    const response = await fetch(`${apiUrl}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // 포스트가 없는 경우 처리
    if (!posts || posts.length === 0) {
      showError("표시할 포스트가 없습니다.");
      return;
    }

    const postList = document.getElementById("post-list");
    postList.innerHTML = ""; // 기존 목록 초기화
    
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.className = "post-item";
      li.innerHTML = `
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.body.substring(0, 100))}...</p>
        <span class="post-id">ID: ${post.id}</span>
      `;
      li.dataset.postId = post.id;
      
      // 포스트 클릭 시 상세 페이지로 이동
      li.addEventListener("click", (e) => {
        // 이벤트 버블링 방지
        e.preventDefault();
        window.location.href = `detail.html?postId=${post.id}`;
      });
      
      // 키보드 접근성 지원
      li.setAttribute("tabindex", "0");
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", `${post.title} 포스트 보기`);
      
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = `detail.html?postId=${post.id}`;
        }
      });
      
      postList.appendChild(li);
    });
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    showError("포스트를 불러오는 중 오류가 발생했습니다.");
  }
}

// XSS 방지를 위한 HTML 이스케이프 함수
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 새로고침 버튼 기능
function refreshPosts() {
  displayPosts();
}

// DOM 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  
  // 새로고침 버튼이 있다면 이벤트 리스너 추가
  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshPosts);
  }
});

// 페이지 가시성 변경 시 자동 새로고침 (선택적)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    // 페이지가 다시 활성화되면 5초 후 새로고침
    setTimeout(() => {
      displayPosts();
    }, 5000);
  }
});
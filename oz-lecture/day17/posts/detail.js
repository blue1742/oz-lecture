// detail.js (포스트 상세 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 상세 정보 표시
async function displayPostDetail() {
  // URL에서 postId 가져오기
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");
    if (!postId) throw new Error("No post ID provided");
    
    let post = {};

    // localStorage에서 캐시 확인 (도전 과제)
    const cachedPost = getCachedPost(postId);
    
    if (cachedPost) {
      // localStorage에서 캐시가 조건에 충족하면 캐시 사용하여 post 초기화
      post = cachedPost;
      console.log("Post loaded from localStorage");
    } else {
      // localStorage에서 캐시가 조건에 충족하지 않으면 상세 데이터 fetch하여 post 초기화
      const response = await fetch(`${apiUrl}/posts/${postId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`);
      }
      
      post = await response.json();
      
      // 새로 받은 데이터를 localStorage에 저장
      setCachedPost(postId, post);
      console.log("Post fetched from API");
    }

    renderPost(post);
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("post-detail").innerHTML =
      "<p>Error loading post details</p>";
  }
}

// localStorage에서 캐시된 포스트 데이터 가져오기
function getCachedPost(postId) {
  try {
    const cacheKey = `post_${postId}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = Date.now();
      const cacheTime = parsedData.timestamp;
      const fiveMinutes = 5 * 60 * 1000; // 5분을 밀리초로 변환

      // 5분 내의 캐시 데이터인지 확인
      if (currentTime - cacheTime < fiveMinutes) {
        return parsedData.post;
      } else {
        // 캐시가 만료된 경우 삭제
        localStorage.removeItem(cacheKey);
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error: Failed to read from localStorage");
    return null;
  }
}

// 포스트 데이터를 localStorage에 저장
function setCachedPost(postId, post) {
  try {
    const cacheKey = `post_${postId}`;
    const cacheData = {
      post: post,
      timestamp: Date.now()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error: Failed to save to localStorage");
  }
}

// 포스트 렌더링 함수
function renderPost(post) {
  const postDetail = document.getElementById("post-detail");
  postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

// 페이지 로드 시 포스트 상세 정보 표시
displayPostDetail();
async function login(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await response.json();
    console.log(user);

    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user)); // 설정
    const storedUser = localStorage.getItem("user"); // 조회
    console.log(storedUser);
    // localStorage.removeItem("user") // 삭제
  } catch (error) {
    console.log(error);
    showError(error.message);
  }
}

// path 파라미터에 매개변수로 받은 key값을 확인하여 value를 반환하는 함수
function getParams(key) {
  const url = new URL(location.href);
  const id = url.searchParams.get(key);
  return id;
}

function main() {
  // 해당 사용자가 적절한 id / pw 로 인증을 완료함
  const id = Number(getParams("userId"));

  // 해당 사용자 로그인 진행
  login(id);
}

main();
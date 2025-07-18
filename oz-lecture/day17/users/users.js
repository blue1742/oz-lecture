async function fetchMultiple(userId) {
  try {
    const [user, posts] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        (res) => res.json()
      ),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(
        (res) => res.json()
      ),
    ]);
    console.log("user", user); // obj
    console.log("posts", posts); // array
    document.querySelector("#output").innerHTML = `<h2>${user.name}</h2>`;

    const ul = document.createElement("ul");
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      ul.appendChild(li);
    });
    document.querySelector("#output").appendChild(ul);
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

function showError(message) {
  document.querySelector("#output").innerHTML = `<h2>${message}</h2>`;
}

function main() {
  const id = Number(getParams("id"));
  if (isNaN(id)) showError("id가 올바르지 않습니다");

  fetchMultiple(id);
}

main();
async function fetchUsers() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    if (!response.ok) throw new Error("fetch ERROR");
    console.log(response.ok);
    const users = await response.json();
    console.log(users); // obj
    document.querySelector("#output").innerHTML = `<h2>사용자 목록</h2>`;

    const ul = document.createElement("ul");
    users.forEach((user) => {
      const li = document.createElement("li");
      const aTag = document.createElement("a");
      aTag.setAttribute("href", `./view/index.html?userId=${user.id}`);
      aTag.textContent = user.name;
      li.appendChild(aTag);
      ul.appendChild(li);
    });
    document.querySelector("#output").appendChild(ul);
  } catch (error) {
    console.log(error);
    showError(error.message);
  }
}

function showError(message) {
  document.querySelector("#output").innerHTML = `<h2>${message}</h2>`;
}

function main() {
  fetchUsers();
}

main();
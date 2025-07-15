async function fetchData() {
  try {
    let promise = new Promise((resolve) =>
      setTimeout(() => resolve("데이터 가져옴!"), 1000)
    );
    let result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
fetchData();
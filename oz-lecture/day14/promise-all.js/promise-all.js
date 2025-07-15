const allTest = () => {
  const p1 = new Promise((resolve) => setTimeout(() => resolve("작업1"), 2000));
  const p2 = new Promise((resolve) => setTimeout(() => resolve("작업2"), 5000));
  Promise.all([p1, p2]).then((results) => console.log(results));
};

allTest();
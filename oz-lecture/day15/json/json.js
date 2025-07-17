const jsonString = `{
    "name": "지민",
    "age": 22
}`;
// const jsonObj = JSON.parse(jsonString);
// const name = jsonObj.name;
// const age = jsonObj.age;
const { name, age } = JSON.parse(jsonString);
console.log(name);
console.log(age);

// const jsonObj2 = {
//   name: "지민",
//   age: 22,
// };
// console.log(jsonObj);

const jsonStringArr = `[
    {
        "id":1,
        "name": "혜진"
    },
    {
        "id":2,
        "name": "민수"
    }
]`;
const users = JSON.parse(jsonStringArr);
console.log(jsonStringArr);
console.log(users);
users.push("222");
// const names = ["혜진", "민수"];

// for문사용
const namesFor = [];
for (let i = 0; i < users.length; i++) {
  const user = users[i];
  namesFor.push(user.name);
}
console.log(namesFor);

// Array.map() 사용
const namesMap = users.map((user) => {
  return user.name;
});
console.log(namesMap);

// Array.map + spread 연산자
const namesMapSp = users.map(({ name }) => name);
console.log(namesMapSp);
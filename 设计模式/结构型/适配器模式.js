/**
 * 适配器模式
 * 解决两个接口不匹配的问题
 */
const arr = [
  {
    name: "Peter",
    age: 11,
  },
  {
    name: "John",
    age: 12,
  },
];

const Adaptor = function (arr) {
  let obj = {};
  arr.forEach((el) => {
    obj[el.name] = el.age;
  });
  return obj;
};

console.log(Adaptor(arr));

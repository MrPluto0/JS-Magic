/**
 * 原型模式：实现一个可以克隆自身的接口，同时可以增加新方法。
 * 典型：new, Object.create(), 原型链
 */

// Object.create
function create(proto, properties) {
  let obj = {};
  obj.__proto__ = proto;
  properties && Object.defineProperties(obj, properties);
  return obj;
}

const obj = { a: 1, b: 2 };
const newObj = create(obj);
console.log(newObj.a, newObj.b);

// new for Function
function mynew(func, ...args) {
  let newObj = {};
  newObj.__proto__ = func.prototype;
  let ret = func.apply(newObj, args);
  return ret instanceof Object ? ret : newObj; // object | function
}

function Person(name) {
  this.name = name;
}

const person = mynew(Person, "Gypsophlia");
console.log(person.name);

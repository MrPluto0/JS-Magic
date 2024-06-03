function FakeNew(constructor, ...args) {
  // 创建新对象并设置原型
  const obj = Object.create(constructor.prototype);
  // 设置构造函数
  obj.constructor = constructor;
  // 调用构造函数
  const res = constructor.apply(obj, args);
  // 处理构造函数返回值
  return res instanceof Object ? res : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

p = FakeNew(Person, "zhangsan", 12);
console.log(p);

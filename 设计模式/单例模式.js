/**
 * 单例模式：存储全局的唯一一个可访问的实例。
 * */
class Instance {
  _name = String;

  constructor(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

const singleton = function () {
  let instance;
  return function (name) {
    return instance || (instance = new Instance(name));
  };
};

// 测试
const single = singleton();
let instance1 = single("instance1");
let instance2 = single("instance2");

console.log(instance1.getName()); // instance1
console.log(instance2.getName()); // instance2

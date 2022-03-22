/**
 * 代理模式，顾名思义
 * 主要用途：虚拟代理，代理缓存
 * 例子：Proxy，读取不存在的值时报错
 */

let user = {
  name: "user",
};

let proxy = new Proxy(user, {
  get(target, prop, receiver) {
    if (prop in target) {
      // return Reflect.get(target, prop, receiver);
      return Reflect.get(...arguments);
    } else {
      throw new ReferenceError(`Property doesn't exist: ${prop}`);
    }
  },
});

console.log(proxy.name);
console.log(proxy.age);

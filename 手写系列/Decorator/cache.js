// 内存装饰器
function cachingDecorator(func) {
  let cache = new Map();
  return function () {
    // 方法借用 String类型
    let key = [].join.call(arguments)
    console.log(key)
    if (cache.has(key)) {
      console.log("I get it.");
      return cache.get(key);
    }
    let result = func.apply(this, arguments); // 现在 "this" 被正确地传递了
    cache.set(key, result);
    return result;
  };
}

let worker = {
  slow() {
    console.log("max")
    return Math.max(...arguments)
  }
};

worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存

console.log(worker.slow(2, 3, 4)); // 工作正常
console.log(worker.slow(2, 3, 4)); // 工作正常，没有调用原始函数（使用的缓存）
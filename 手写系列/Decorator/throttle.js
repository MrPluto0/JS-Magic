// 节流装饰器
const throttle = function (func, interval) {
  let isThrottle = false;

  return function wrapper() {
    if (!isThrottle) {
      func.apply(this, arguments);
      isThrottle = true;

      setTimeout(() => {
        isThrottle = false;
      }, interval);
    }
  };
};

// function f(a) {
//     console.log(a);
// }

// // f1000 最多每 1000ms 将调用传递给 f 一次
// let f1000 = throttle(f, 1000);

// f1000(1); // 显示 1
// f1000(2); // (节流，尚未到 1000ms)
// f1000(3); // (节流，尚未到 1000ms)
// f1000(4);
// setTimeout(() => {
//     f1000(5);
// }, 1000)

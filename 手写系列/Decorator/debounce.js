// 防抖装饰器
function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout); // timeout 不为null
    if (immediate) {
      if (!timeout) {
        func.apply(context, args);
      }

      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

// 防抖函数从最后一次函数调用以后等待 1000ms
let f = debounce(console.log, 1000, true);

f("a");
f("b");
f("c");
setTimeout(() => f("e"), 1100);
setTimeout(() => f("f"), 2200);

// export default debounce;

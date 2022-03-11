// import { Dep } from "./watcher";

// 数据劫持，给对象增加 get和 set
function observe(data) {
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, value) {
  let dep = new Dep();
  observe(value);

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend();
      }

      return value;
    },
    set(newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify();
      }
    },
  });
}

// export default observe;

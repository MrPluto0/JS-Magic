import { Dep } from "./dep";

export function observe(data: any) {
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach((key) => {
    defineReactive(data, key);
  });
}

function defineReactive(data: Object, key: string) {
  let value = data[key];
  observe(value);

  let dep = new Dep();

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal;
        dep.notify();
      }
    },
  });
}

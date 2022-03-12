import { Mvvm } from "../mvvm";

export function proxyKey(
  vm: Mvvm,
  key: string,
  obj: Object,
  isSet: boolean = true
) {
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get() {
      return obj[key];
    },
    set(newVal) {
      if (isSet) obj[key] = newVal;
    },
  });
}

export function parsePath(exp: string) {
  return (obj: Object): any => {
    let val = obj;

    exp.split(".").forEach((key) => {
      val = val[key];
    });

    return val;
  };
}

export function parsePathSet(exp: string) {
  return (obj: Object, target: any) => {
    let arr = exp.split(".");
    let val = obj;

    arr.forEach((key, _i) => {
      if (_i === arr.length - 1) {
        val[key] = target;
      } else {
        val = val[key];
      }
    });
  };
}

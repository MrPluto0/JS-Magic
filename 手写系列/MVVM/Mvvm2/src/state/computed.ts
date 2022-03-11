import { Mvvm } from "../mvvm";
import { Dep } from "../observer/dep";

export function defineComputed(vm: Mvvm, key: string, userDef: any) {
  let getter = null;
  if (typeof userDef === "function") {
    getter = createComputedGetter(vm, key);
  } else {
    getter = userDef.get;
  }
  Object.defineProperty(vm, key, {
    get: getter,
    set: () => {},
  });
}

export function createComputedGetter(vm: Mvvm, key: string) {
  return function () {
    const watcher = vm._computedEvents[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      // add "render watch" to dep;
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

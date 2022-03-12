import { Mvvm } from "../mvvm";
import { Watcher } from "../observer/watcher";
import { parsePath, parsePathSet } from "../util";

export default {
  bind(vm: Mvvm, node: HTMLElement, exp: string, target: string) {
    let val = parsePath(exp)(vm);
    node.setAttribute(target, val);

    new Watcher(vm, exp, (newVal: string) => {
      node.setAttribute(target, newVal);
    });
  },

  on(vm: Mvvm, node: HTMLElement, exp: string, eventType: string) {
    const cb = parsePath(exp)(vm);

    if (cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  },

  model(vm: Mvvm, node: HTMLElement, exp: string) {
    // Type: inpuHTMLElementt
    if (node instanceof HTMLInputElement) {
      // initial
      let val = parsePath(exp)(vm);
      node.value = val;

      // bidirectional binding
      new Watcher(vm, exp, (newVal: string) => {
        node.value = newVal;
      });
      node.addEventListener("input", (evt: InputEvent) => {
        const newVal = (evt.target as HTMLInputElement).value;
        parsePathSet(exp)(vm, newVal);
      });
    }
  },

  show(vm: Mvvm, node: HTMLElement, exp: string) {
    let val = !!parsePath(exp)(vm);
    let savedDisplay = node.style.display;
    node.style.display = val ? savedDisplay : "none";

    new Watcher(vm, exp, (newVal: any) => {
      node.style.display = !!newVal ? savedDisplay : "none";
    });
  },

  if(vm: Mvvm, node: HTMLElement, exp: string) {},

  for(vm: Mvvm, node: HTMLElement, exp: string) {},
};

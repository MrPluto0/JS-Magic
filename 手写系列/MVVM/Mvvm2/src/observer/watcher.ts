import { Mvvm } from "../mvvm";
import { parsePath } from "../util";
import { Dep, popStack, pushStack } from "./dep";

interface IWatchOptions {
  lazy?: any;
}

let uid = 0;

export class Watcher {
  id: Number;
  vm: Mvvm;
  deps: Array<Dep>;
  depsId: Set<Number>;
  cb: Function;
  getter: Function;
  value: any;
  lazy: Boolean;
  dirty: Boolean;

  constructor(
    vm: Mvvm,
    expOrFn: string | Function,
    cb: Function,
    options?: IWatchOptions
  ) {
    this.vm = vm;
    // getter
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    // options
    if (options) {
      this.lazy = options.lazy;
    } else {
      this.lazy = false;
    }
    this.id = ++uid;
    this.cb = cb;
    this.dirty = this.lazy;
    this.deps = [];
    this.depsId = new Set();

    this.value = this.lazy ? undefined : this.get();
  }

  get() {
    pushStack(this);
    let val = this.getter.call(this.vm, this.vm);
    popStack();

    return val;
  }

  // dep collection
  depend() {
    this.deps.forEach((dep) => {
      dep.depend();
    });
  }

  addDep(dep: Dep) {
    const id = dep.id;

    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }

  evaluate() {
    this.dirty = false;
    this.value = this.get();
  }

  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      const oldVal = this.value;
      const newVal = this.get();
      this.value = newVal;

      this.cb.call(this.vm, newVal, oldVal);
    }
  }
}

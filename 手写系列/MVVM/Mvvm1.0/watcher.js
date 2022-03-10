let uid = 0;

function Watcher(vm, expOrFn, cb, options) {
  this.vm = vm;

  if (typeof expOrFn === "function") {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
  }

  if (options) {
    this.lazy = !!options.lazy;
  } else {
    this.lazy = false;
  }

  this.dirty = this.lazy;
  this.cb = cb;
  this.id = ++uid;
  this.deps = [];
  this.depsId = new Set();

  this.value = this.lazy ? undefined : this.get();
}

Watcher.prototype = {
  get() {
    pushTarget(this);
    // run getter
    let val = this.getter.call(this.vm, this.vm);
    popTarget();
    return val;
  },
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      // run callback
      const oldValue = this.value;
      const value = this.get();
      this.value = value;

      this.cb.call(this.vm, value, oldValue);
    }
  },
  // for computed
  evaluate() {
    this.dirty = false;
    this.value = this.get();
  },
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  },
  // dep collection
  depend() {
    this.deps.forEach((dep) => {
      dep.depend();
    });
  },
};

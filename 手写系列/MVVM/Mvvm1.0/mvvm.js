// import observe from "./observer";
// import Compile from "./compile";

function Mvvm(options = {}) {
  this.$options = options;

  // init methods
  options.methods && this.initMethods();

  // init data
  options.data && this.initData();

  // init computed
  options.computed && this.initComputed();

  // init watch
  options.watch && this.initWatch();

  // 数据编译
  new Compile(options.el, this);

  // mounted hook
  options.mounted && options.mounted.call(this);
}

Mvvm.prototype = {
  proxyKey(key, obj) {
    const vm = this;
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get() {
        return obj[key];
      },
      set(newVal) {
        obj[key] = newVal;
      },
    });
  },

  initMethods() {
    const vm = this;
    const methods = (this._methods = this.$options.methods);
    for (const key in methods) {
      const method = methods[key];
      vm[key] = typeof method === "function" ? method.bind(vm) : () => {};
    }
  },

  initData() {
    this._data = this.$options.data;

    // 数据代理
    Object.keys(this._data).forEach((key) => {
      this.proxyKey(key, this._data);
    });

    // 数据劫持
    observe(this._data);
  },

  initComputed() {
    const vm = this;
    const computed = this.$options.computed;
    const watchers = (this._computedWatchers = Object.create(null));

    Object.keys(computed).forEach((key) => {
      const userDef = computed[key];

      const getter = typeof userDef === "function" ? userDef : userDef.get;

      // 观察器
      watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true });

      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      }
    });
  },

  initWatch() {
    const watch = (this._watch = this.$options.watch);
    for (const key in watch) {
      const cb = watch[key];
      if (typeof cb === "function") {
        new Watcher(this, key, cb);
      }
    }
  },
};

function defineComputed(vm, key, userDef) {
  let getter = null;
  if (typeof userDef === "function") {
    getter = createComputedGetter(key);
  } else {
    getter = userDef.get;
  }
  Object.defineProperty(vm, key, {
    enumerable: true,
    configurable: true,
    get: getter,
    set: () => {},
  });
}

function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      // add "render watcher" to dep
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

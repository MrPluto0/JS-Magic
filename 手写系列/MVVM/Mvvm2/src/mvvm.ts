import { Compiler } from "./compiler";
import { observe } from "./observer/observe";
import { Watcher } from "./observer/watcher";
import { defineComputed } from "./state/computed";
import { proxyKey } from "./util";

interface IMvvmOptions {
  el: string;
  template?: string;
  methods?: Object;
  data?: Object;
  computed?: Object;
  watch?: Object;
}

interface IWatcherObj {
  [key: string]: Watcher;
}

export class Mvvm {
  $options: IMvvmOptions;
  $el: HTMLElement;
  _methods: Object;
  _data: Object;
  _watchEvents: IWatcherObj;
  _computedEvents: IWatcherObj;

  constructor(options: IMvvmOptions) {
    this.$options = options;

    this.initState();

    this.runCompiler();
  }

  initState() {
    const options = this.$options;

    options.methods && this.initMethods();
    options.data && this.initData();
    options.computed && this.initComputed();
    options.watch && this.initWatch();
  }

  initMethods() {
    const vm = this;
    const methods = (this._methods = this.$options.methods);

    Object.keys(methods).forEach((key) => {
      const val = methods[key];
      if (typeof val === "function") {
        proxyKey(vm, key, methods, false);
      }
    });
  }

  initData() {
    const vm = this;
    const data = (this._data = this.$options.data);

    // Data proxy
    Object.keys(data).forEach((key) => {
      proxyKey(vm, key, data);
    });

    // Data catch
    observe(data);
  }

  initComputed() {
    const vm = this;
    const computed = this.$options.computed;
    const watchers = (this._computedEvents = Object.create(null));

    Object.keys(computed).forEach((key) => {
      const userDef = computed[key];
      const getter = typeof userDef === "function" ? userDef : userDef.get;

      watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true });

      defineComputed(vm, key, userDef);
    });
  }

  initWatch() {
    const vm = this;
    const watch = this.$options.watch;
    const watchers = (this._watchEvents = Object.create(null));

    Object.keys(watch).forEach((key) => {
      const val = watch[key];
      if (typeof val === "function") {
        watchers[key] = new Watcher(vm, key, val);
      }
    });
  }

  runCompiler() {
    const options = this.$options;
    const el = (this.$el = document.querySelector(options.el));

    if (options.template) {
      el.innerHTML = options.template;
    }

    new Compiler(this, el);
  }
}

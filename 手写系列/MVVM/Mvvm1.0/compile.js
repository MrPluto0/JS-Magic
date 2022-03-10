// import { Watcher } from "./watcher";

function Compile(el, vm) {
  this.vm = vm;
  this.el = vm.$el = document.querySelector(el);
  this.init();
}

Compile.prototype = {
  init() {
    let fragment = document.createDocumentFragment();

    let child;
    while ((child = this.el.firstChild)) {
      fragment.appendChild(child);
    }

    this.compileFragment(fragment);
    this.el.appendChild(fragment);
  },
  compileFragment(frag) {
    Array.from(frag.childNodes).forEach((node) => {
      const txt = node.textContent;
      const reg = /\{\{(.*?)\}\}/; // 最小匹配

      if (node.nodeType === 1) {
        this.compileElementNode(node);
      } else if (node.nodeType === 3 && reg.test(txt)) {
        this.compileTextNode(node, reg.exec(txt)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileFragment(node);
      }
    });
  },
  compileElementNode(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      const reg = /\{\{(.*?)\}\}/; // 最小匹配
      let name = attr.name;
      let exp = attr.value;
      let dir = name.slice(2);

      if (name.indexOf("v-") === 0) {
        if (dir.indexOf("on:") === 0) {
          this.compileEvent(node, dir, exp);
        } else if (dir.indexOf("model") === 0) {
          this.compileModel(node, exp);
        }
      }
    });
  },
  compileTextNode(node, exp) {
    const reg = /\{\{(.*?)\}\}/; // 最小匹配
    let val = parsePath(exp)(this.vm);
    let txt = node.textContent;

    // 初始化
    node.textContent = txt.replace(reg, val ? val : "").trim();
    new Watcher(this.vm, reg.exec(txt)[1], (newval) => {
      node.textContent = txt.replace(reg, newval).trim();
    });
  },
  compileEvent(node, dir, exp) {
    const eventType = dir.split(":")[1];
    const cb = this.vm._methods && this.vm._methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(this.vm), false);
    }
  },
  compileModel(node, exp) {
    // init
    let val = parsePath(exp)(this.vm);
    node.value = val ? val : "";

    // watch from exp to node
    new Watcher(this.vm, exp, (newval) => {
      node.value = newval;
    });

    // cb from node to exp
    node.addEventListener("input", (e) => {
      const newVal = e.target.value;
      this.vm[exp] = newVal;
    });
  },
};

// export default Compile;

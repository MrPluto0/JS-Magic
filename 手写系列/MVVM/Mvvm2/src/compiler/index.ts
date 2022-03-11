import { Mvvm } from "../mvvm";
import { Watcher } from "../observer/watcher";
import { parsePath } from "../util";

const reg = /\{\{(.*?)\}\}/; // ? 非贪婪匹配 / 最小匹配

export class Compiler {
  el: HTMLElement;
  vm: Mvvm;
  fragment: DocumentFragment;

  constructor(vm: Mvvm, el: HTMLElement) {
    this.vm = vm;
    this.el = el;
    this.compile();
  }

  compile() {
    let fragment = (this.fragment = document.createDocumentFragment());

    let child;
    while ((child = this.el.firstChild)) {
      fragment.appendChild(child);
    }

    this.compileFragment(fragment);
    this.el.appendChild(fragment);
  }

  compileFragment(frag: DocumentFragment | Node) {
    Array.from(frag.childNodes).forEach((node) => {
      const txt = node.textContent;

      if (node.nodeType === node.ELEMENT_NODE) {
        this.compileElementNode(node);
      } else if (node.nodeType === node.TEXT_NODE && reg.test(txt)) {
        this.compileTextNode(node);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileFragment(node);
      }
    });
  }

  compileElementNode(node: Node) {}

  compileTextNode(node: Node) {
    const txt = node.textContent;
    const exp = reg.exec(txt)[1];
    let val: string = parsePath(exp)(this.vm);

    // init
    node.textContent = txt.replace(reg, val ? val : "").trim();

    new Watcher(this.vm, exp, (newVal: string) => {
      node.textContent = txt.replace(reg, newVal ? newVal : "").trim();
    });
  }
}

import { Mvvm } from "../mvvm";
import { Watcher } from "../observer/watcher";
import { parsePath } from "../util";
import {
  isBindAttr,
  isDirective,
  isElementNode,
  isEventAttr,
  isTextNode,
} from "./judge";
import Directive from "./directive";

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

  compileFragment(frag: DocumentFragment | ChildNode) {
    Array.from(frag.childNodes).forEach((node) => {
      const txt = node.textContent;

      if (isElementNode(node)) {
        this.compileElementNode(node as HTMLElement);
      } else if (isTextNode(node) && reg.test(txt)) {
        this.compileTextNode(node as HTMLElement);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileFragment(node);
      }
    });
  }

  compileElementNode(node: HTMLElement) {
    const attrs = node.attributes; // assert
    const vm = this.vm;

    Array.from(attrs).forEach((attr) => {
      let name = attr.name;
      let exp = attr.value;
      let [prefix, target] = name.split(":");

      // judge: v-on:click / v-bind:var / v-if / @click / :var / ...
      if (isDirective(prefix)) {
        const directive = prefix.slice(2);
        if (target) {
          Directive[directive](vm, node, exp, target);
        } else {
          Directive[directive](vm, node, exp);
        }
      } else if (isEventAttr(prefix)) {
        Directive.on(vm, node, exp, prefix.slice(1));
      } else if (isBindAttr(name)) {
        Directive.bind(vm, node, exp, target);
      }
    });
  }

  compileTextNode(node: HTMLElement) {
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

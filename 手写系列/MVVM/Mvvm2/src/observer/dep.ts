import { Watcher } from "./watcher";

let uid = 0;

export class Dep {
  static target: Watcher;
  private subs: Array<Watcher>;
  id: Number;

  constructor() {
    this.id = ++uid;
    this.subs = [];
  }

  addSub(watch: Watcher) {
    this.subs.push(watch);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

let targetStack: Array<Watcher> = [];

export function pushStack(watcher: Watcher) {
  targetStack.push(watcher);
  Dep.target = watcher;
}

export function popStack() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

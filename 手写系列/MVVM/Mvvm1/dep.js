// 依赖管理
function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  },
  notify() {
    this.subs.forEach((sub) => sub.update());
  },
};

const targetStack = [];

function pushTarget(watcher) {
  targetStack.push(watcher);
  Dep.target = watcher;
}

function popTarget(watcher) {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

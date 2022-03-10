let parent = {
  name: "parent",
  play: [1, 2, 3, 4],
  getName: function () {
    return this.name;
  },
};

// 增强浅拷贝
function clone(origin) {
  let obj = Object.create(origin);
  obj.getPlay = function () {
    return this.play;
  };
  return obj;
}

let child1 = clone(parent);
let child2 = clone(parent);

console.log(child1.play);
console.log(child2.play);

// 可访问parent的原型链上的方法
console.log(child1.getName());
console.log(child1.getPlay());

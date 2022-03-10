function deepClone(obj, cache = new WeakMap()) {
  if (!obj || typeof obj !== "object") return obj;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  if (cache.has(obj)) return cache.get(obj);

  // contruct new object
  let newObj = Array.isArray(obj) ? [] : {};
  cache.set(obj, newObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key], cache);
    }
  }

  return newObj;
}

// test
let obj = {
  a: 1,
  b: /^a/,
  c: new Date(),
  d: {
    e: [1, 2, 3],
    f: {
      g: Symbol(123),
    },
  },
};

let newObj = deepClone(obj);

console.log(obj === newObj);
console.log(newObj);

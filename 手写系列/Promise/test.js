const MyPromise = require("./promise");

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log("a");
  }, 100);
  resolve("b");
})
  .then((res) => {
    console.log(res, "c");
    throw new Error("error");
  })
  .then((res) => {
    console.log(res, "d");
  })
  .catch((err) => {
    console.log(err.message);
    return "after finnaly";
  })
  .finally((res) => {
    console.log(res);
  })
  .then((res) => {
    console.log(res);
  });

MyPromise.all([
  new MyPromise((resolve, reject) => resolve(1)),
  new MyPromise((resolve, reject) => resolve([1, 2, 3])),
  new MyPromise((resolve, reject) => resolve({ a: 1, b: 2 })),
  new MyPromise((resolve, reject) =>
    resolve(new MyPromise((resolve) => resolve("last")))
  ),
]).then((res) => {
  console.log(res);
});

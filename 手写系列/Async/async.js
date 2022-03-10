function asyncToGenerator(generator) {
  // keep same as async
  return function () {
    var self = this;
    var args = arguments;

    return new Promise((resolve, reject) => {
      let gen = generator.apply(self, arguments);

      function _next(val) {
        // error control
        try {
          var res = gen.next(val);
        } catch (err) {
          return reject(err);
        }
        if (res.done) {
          // finish state
          resolve(res.value);
        } else {
          // construct promise
          Promise.resolve(res.value).then(
            (val) => _next(val),
            (err) => gen.throw(err)
          );
        }
      }

      _next();
    });
  };
}

function* gen(val) {
  console.log(yield Promise.resolve(1 + val)); //1
  console.log(yield Promise.resolve(2 + val)); //2
  console.log(yield Promise.resolve(3 + val)); //3
  return 5 + (yield 4);
}

(async function () {
  let transform = asyncToGenerator(gen);
  let val = await transform.call(null, "res");
  console.log(val);
})();

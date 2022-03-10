function promisify(func, manyArgs) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            // 回调在func函数中触发reject和resolve，从而promise.then
            function callback(err, ...results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(manyArgs ? results : results[0]);
                }
            }
            args.push(callback);
            func.apply(this, args);
        })
    }
}

// 形参写callback且使用，传参时可不写
function loadScript(callback) {
    var a = 2, b = 2;
    console.log("loadscript");
    if (a + b > 5)
        callback(null, a + b);
    else
        callback(new Error(`Callback error`));
}

promisify(loadScript)().then(() => {
    console.log("OK");
}).catch((error) => {
    console.log(error.message);
})
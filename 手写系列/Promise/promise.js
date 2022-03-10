const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      executor(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }

  _status = PENDING;
  _value = undefined;

  // Call callbacks many times
  _resolveQueues = [];
  _rejectQueues = [];

  // if called directly, such as `resolve()`, then
  //   arrowfunction: this -> outer
  //   function: this -> window || undefined
  _resolve = (val) => {
    const run = () => {
      if (this._status === PENDING) {
        const runFulfilled = (val) => {
          let cb;
          while ((cb = this._resolveQueues.shift())) {
            cb(val);
          }
        };
        const runRejected = (err) => {
          let cb;
          while ((cb = this._rejectQueues.shift())) {
            cb(err);
          }
        };
        if (val instanceof MyPromise) {
          val.then(
            (value) => {
              this._status = FULFILLED;
              this._value = value;
              runFulfilled(value);
            },
            (error) => {
              this._status = REJECTED;
              this._value = error;
              runRejected(error);
            }
          );
        } else {
          this._status = FULFILLED;
          this._value = val;
          runFulfilled(val);
        }
      }
    };
    // queueMicrotask(run);
    setTimeout(run);
  };

  _reject = (err) => {
    const run = () => {
      if (this._status === PENDING) {
        this._status = REJECTED;
        this._value = err;
        let cb;
        while ((cb = this._rejectQueues.shift())) {
          cb(err);
        }
      }
    };
    setTimeout(run);
  };

  then(onFulfilled, onRejected) {
    const { _status, _value } = this;
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = (val) => {
        try {
          if (typeof onFulfilled !== "function") {
            onFulfilledNext(val);
          } else {
            // chain-call for promise
            let ret = onFulfilled(val);
            if (ret instanceof MyPromise) {
              ret.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(ret);
            }
          }
        } catch (error) {
          onRejectedNext(error);
        }
      };
      let rejected = (err) => {
        try {
          if (typeof onRejected !== "function") {
            onRejectedNext(err);
          } else {
            let ret = onRejected(err);
            if (ret instanceof MyPromise) {
              ret.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(ret);
            }
          }
        } catch (error) {
          onRejectedNext(error);
        }
      };
      if (_status === FULFILLED) {
        fulfilled(_value);
      } else if (_status === REJECTED) {
        rejected(_value);
      } else if (_status === PENDING) {
        this._resolveQueues.push(fulfilled);
        this._rejectQueues.push(rejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // finally has no params
  // finally can transfer the value/reason
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (error) => MyPromise.resolve(callback()).then(() => error)
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }

  static all(list) {
    return new MyPromise((resolve, reject) => {
      let returns = [];
      let count = 0;
      if (list instanceof Array) {
        list.forEach((promise, _i) => {
          // transform promise
          MyPromise.resolve(promise).then(
            (res) => {
              returns[_i] = res;
              count++;
              if (count === list.length) resolve(returns);
            },
            (err) => {
              reject(err);
            }
          );
        });
      }
    });
  }

  static race(list) {
    return new MyPromise((resolve, reject) => {
      if (list instanceof Array) {
        list.forEach((promise) => {
          MyPromise.resolve(promise).then(
            (res) => resolve(res),
            (err) => reject(err)
          );
        });
      }
    });
  }
}

module.exports = MyPromise;

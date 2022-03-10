// target
function* foo() {
  yield "result1";
  yield "result2";
  yield "result3";
}

// compiled
var context = {
  next: 0,
  prev: 0,
  done: false,
  stop: function () {
    this.done = true;
  },
};

/**
 * state machine based on context
 * @param {context} _context
 */
function gen$(_context) {
  while (_context) {
    switch (_context.next) {
      case 0:
        _context.next = 2;
        return "result1";
      case 2:
        _context.next = 4;
        return "result2";
      case 4:
        _context.next = 6;
        return "result3";
      default:
        return _context.stop();
    }
  }
}

let gen = function () {
  let value, done;
  return {
    next: function () {
      value = context.done ? undefined : gen$(context);
      done = context.done;
      return {
        value,
        done,
      };
    },
  };
};

const g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

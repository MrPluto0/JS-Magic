function* pseudoRandom(seed) {
  var num = seed;
  while (true) {
    num = (num * 16807) % 2147483647;
    yield num;
  }
}

let generator = pseudoRandom(1);

console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073

// // Numbers
//

const num = 23;

console.log(Number.MAX_SAFE_INTEGER); // максимальное число
let wierd = 2/0;
let wierd2 = 2/undefined;
console.log(2/0) // Infinity
console.log(Number.NaN) // NaN
console.log(typeof Number.NaN) // number
console.log(isNaN(wierd2)) // true
console.log(isNaN(42)) // false
console.log(isFinite(Infinity)) // false
console.log(isFinite(42)) // true

const stringInt = '42';
const stringFloat = '40.42';

console.log(Number.parseInt(stringInt) + 2) // 44
console.log(Number(stringInt) + 2) // 44
console.log(+stringInt + 2) // 44

const stringFloat = '40.42';
console.log(parseFloat(stringFloat) + 2);

console.log(0.4 + 0.2) // 0.6000000000000001
console.log(+(0.4 + 0.2).toFixed(1)) // 0.6 - string
console.log(parseFloat((0.4 + 0.2).toFixed(1))) // 0.6

// 3 Math

console.log(Math.sqrt(25)); // корень 5
console.log(Math.pow(25, 10));
console.log(Math.abs(-25));
console.log(Math.max(25, 33, 44, 234));
console.log(Math.min(25, 33, 44, 234));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.9));
console.log(Math.round(4.9));
console.log(Math.trunc(4.9));
console.log(Math.trunc(4.9));
console.log(Math.random());

// 4 Example
function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max-min +1) + min);
}

getRandomBetween(10, 42);

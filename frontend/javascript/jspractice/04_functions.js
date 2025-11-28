// Функции

// // function Declaration
// function greet(name) {
//   console.log(name)
// }
//
// const great2 = function greet2(name) {
//   console.log('Hi 2 - ', name);
// };
//
// greet('lena');
// great2('lena 2');
//
// let counter = 0;
//
// console.log('1', counter);
//
// const interval = setInterval(function () {
//   if (counter === 2) {
//     clearInterval(interval)
//   } else {
//     console.log(++counter);
//   }
//   console.log('2', counter);
// }, 500)
//
// console.log('3', counter);

// Анонимные функции
//
// const interval2 = setTimeout(function () {
//   if (counter === 5) {
//     clearTimeout(interval2)
//   } else {
//     console.log('interval2', ++counter);
//   }
//   console.log('4', counter);
// }, 500)
//
// console.log('5', counter);

// 3 стрелочные функции

// const arrow = (name) => {
//   console.log(name);
// };
//
// arrow('Vasia')
//
// const arrow2 = name => console.log(name)
// arrow2('Vasia 2')
//
// const pow = num => num ** 2
//
// console.log(pow(5));

// 4 Параметры по умолчанию

// const sum = (a = 20, b = a * 2) => a + b;
//
// console.log(sum());

// function summAll(...all) {
//   let result = 0;
//
//   for (let num of all) {
//     result += num
//   }
//
//   return result
// }
//
// const res = summAll(1, 2, 3, 4, 5, 6, 7);
//
// console.log(res);

// 5 Замыкание

function createMember(name) {
  return function (lastName) {
    console.log(name, lastName)
  }
}

const logWithLastName = createMember('Serhii');

console.log(logWithLastName('Kandyba'));
console.log(logWithLastName('Sabyla'));


























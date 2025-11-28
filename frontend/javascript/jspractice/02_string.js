// String

const name = 'Valentin';

console.log(name.toUpperCase()); // VALENTIN
console.log(name.toLowerCase()); // valentin
console.log(name.charAt(2)); // l
console.log(name.indexOf('en')); // 6
console.log(name.indexOf('!')); // -1
console.log(name.startsWith('Val')); // true
console.log(name.endsWith('in')); // true
console.log(name.repeat(2)); // ValentinValentin

let string = `    password      `;
console.log(string);
console.log(string.trim());

function checkSpam(str) {
  if (!str) return str;
  const badWords = ['viagra', 'XXX'];
  const lowerStr = str.toLowerCase();

  return badWords.some(word => lowerStr.includes(word))
}

checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false


// Урізання тексту
//
// function truncate (text, limit) {
//   return text.length && text.length > limit ? text.slice(0, limit - 1) + '...' : text;
// }
//
// truncate("Що я хотів би розповісти на цю тему:", 20) == "Що я хотів би розпо…"
//
// truncate("Всім привіт!", 20) == "Всім привіт!"

// Виділіть гроші

// function extractCurrencyValue(price) {
//   return +price.slice(1)
// }
//
// alert( extractCurrencyValue('$120') === 120 ); // true

// Підсумуйте властивості

// function sumSalaries(salaries) {
//   return Object.values(salaries).reduce((total, salary) => total + salary, 0)
// }
//
// let salaries = {
//   "Іван": 100,
//   "Петро": 300,
//   "Марія": 250
// };
//
// alert( sumSalaries(salaries) ); // 650

// Порахуйте властивості

// function count (obj) {
//   return Object.keys(obj).length
// }
//
// let user = {
//   name: 'Іван',
//   age: 30
// };
//
// alert( count(user) ); // 2


async function loadUser(name) {
  try {
    const res = await fetch(`https://api.github.com/users/${name}`);
    if(!res.ok) return null;
    return await res.json()
  } catch {
    return null;
  }
}

async function getUsers(names) {
  const users = names.map(name => loadUser(name))
  return await Promise.all(users)
}


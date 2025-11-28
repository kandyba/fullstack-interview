'use strict';

// что такое js - язык программирования, который позволяет Вам создать динамически обновляемый контент

// js компилируемый или интерпретируемый - это лёгкий, интерпретируемый, объектно-ориентированный язык

// типизирован или нет - JavaScript слабо типизирован. Это, безусловно, не "нетипизировано",
// но его слабо типизированная природа допускает большую гибкость в плане неявных преобразований.
// Имейте в виду, что JavaScript также динамически типизирован.

// многопоточность - JS однопоточный язык
// асинхронность, как это работает?
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D0%B5-%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D0%B5-%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B8-%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-javascript-%D1%81-async-await-ba5f47f4436
// https://habr.com/ru/company/ruvds/blog/340508/

// типы данных
// отличия null undefined - null -это особое значение, означающее "no value". null -это особый объект, потому что typeof null возвращает 'object'. С другой стороны, undefined означает, что переменная не была объявлена или ей не было присвоено значение.

// Just-in-Time (JiT) vs Ahead-of-Time (AoT) :
// JIT - скомпилируйте TypeScript как раз вовремя для его выполнения.
//     Скомпилирован в браузере.
//     Каждый файл компилируется отдельно.
//     Нет необходимости строить после изменения кода и перед перезагрузкой страницы браузера.
//     Подходит для местного развития.
//  AOT - компиляция TypeScript на этапе сборки.
//     Компилируется самой машиной, через командную строку (быстрее).
//     Весь код компилируется вместе, вставляя HTML/CSS в Скрипты.
//     Нет необходимости развертывать компилятор (половина размера Angular).
// Более надежно, первоисточник не разглашается.
//     Подходит для производственных сборок.

// Структура данных  (Дерево) - https://www.internet-technologies.ru/articles/strukturirovanie-dannyh-s-pomoschyu-javascript-derevo.html
// http - что это подробнее - https://developer.mozilla.org/ru/docs/Web/HTTP/Overview
// ajax - как можно сделать - https://habr.com/ru/post/14246/
// https://metanit.com/web/jquery/6.1.php

// карирование - https://learn.javascript.ru/currying-partials
// контекст вызова функции
// области видимости
// преобразование данных
// ...rest
// ...spread
// диструктуризация
// патерны проектирование
// svn git
// rebase merge
//rest api
//Что такое замыкания и callback-и?
//Что означает запись 'use strict' ?


// function sayHello(name, sign) {
//     name = name || 'Валера';
//     sign = sign || '...';
//     console.log('Hello ' +name+ sign);
// };
//
// sayHello('John', '!');
// var n = 'Mike';
// sayHello(n);
// sayHello();

// var x = 'X';
// var y = 'Y';
//
// function outer() {
//     var x = 'x';
//     console.log('x: ' + x);
//     console.log('y: ' + y);
//     y = 'y';
//
//     function inner(z) {
//         var y = '__y';
//         console.log('x: ' + x);
//         console.log('y: ' + y);
//         console.log('z: ' + z);
//     }
//
//     inner('zzz');
// }
//
// outer();
//
// console.log(x);
// console.log(y);

// function f(){
//     console.log(1222);
// };
// // console.log(typeof f);
// // f();
// var x = f;
// console.log(x());

//
// function say(greet) {
//     return function (name) {
//         return greet + ' ' + name;
//     }
// }
//
// var en = say('hi');
//
// console.log(en('Serg'));
//
// var ru = say('hello');
//
// console.log(ru('вася'));

// function compare(x) {
//     return function (y) {
//         if(x===y) return null;
//         return x<y;
//     }
// }
//
// console.log(compare(3)(4));
// console.log(compare(24344)(444));
// console.log(compare(22)(22));

// function power(base, exp) {
//     var result = 1;
//
//     for(var i = 0; i<exp; i++){
//         result *= base;
//     }
//
//     return result;
// }
//
// console.log(power(2,6));

// function power(base, exp) {
//     if(exp === 0) return 1;
//
//     return base * power(base, exp);
// }

// function say(greet) {
//     var greet = greet || 'X';
//     return function (name) {
//         return greet + ' ' + name;
//     }
// }
//
// var en = say('hi');
// var ru = say();
// console.log(ru('Lena'));
//
// console.log(en('Vasya'));

// console.log(typeof null,
// typeof 'dddd',
// typeof 111,
// typeof false,
// typeof {},
// typeof function () {})


// Call

// var person1 = {name: 'John', surname: 'King'};
// var person2 = {name: 'John2', surname: 'King2'};
//
// function say(greeting) {
//     console.log(greeting + ' ' + this.name + ' ' + this.surname);
// }

// say.call(person1, 'Hello');
// say.call(person2, 'hi');

// Apply

// say.apply(person3, ['Hello']);
// say.apply(person4, ['hi']);

// bind

// function myBind(fn, context) {
//     return function () {
//         return fn.apply(context, arguments)
//     }
// }
//
// var sayHelloJohn = myBind(say, person1);
// var sayHelloJohn2 = myBind(say, person2);
//
// sayHelloJohn(['hello']);
// sayHelloJohn2();

// var num = 234.45678;
//
// console.log(num.toFixed(2));
// console.log(num.toFixed(3));
// console.log(num.toFixed(1));
// console.log(num.toFixed());
// console.log(12345.3456789.toFixed(1));
// console.log(12345..toFixed(1));
//
// var radius = '12px';
// var width = '12.23px';
//
// console.log(parseInt(radius)); // 12
// console.log(parseInt(width)); // 12
// console.log(parseFloat(width)); // 12.23

//проверка на число

// function isNumeric(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

// Функция isFinite(n) преобразует аргумент к числу и возвращает true, если это не Infinity/-Infinity/NaN.
//
//     Таким образом, правая часть отсеет заведомо не-числа, но оставит такие значения как true/false/null и пустую строку '', так как они корректно преобразуются в числа.
//
//     Для их проверки нужна левая часть. Вызов parseFloat(true/false/null/'') вернёт NaN для этих значений.
//
//     Так устроена функция parseFloat:
// она преобразует аргумент к строке, то есть
// true/false/null становятся "true"/"false"/"null",
// а затем считывает из неё число, при этом пустая
// строка даёт NaN.

//округление чисел

// var num = 1.296;
//
// console.log(Math.round(num * 100) / 100);

// console.log(num.toFixed(1));
//
// var price1 = 0.1, price2 = 0.2;
// alert( +(price1 + price2).toFixed(2) );

// Случайное число
// var max = 10;
// var radomNum = Math.random() * max;
// console.log(Math.round(radomNum));

// var min = 2;

// Верное решение с round

//Правильный способ: Math.round(случайное от min-0.5 до max+0.5)
// В этом случае диапазон будет тот же (max-min+1), но учтена механика округления round.

// function randomInteger(min, max) {
//     var rand = min - 0.5 + Math.random() * (max - min + 1)
//     rand = Math.round(rand);
//     return rand;
// }
//
// alert( randomInteger(5, 10) );
//
// Решение с floor
// Альтернативный путь – применить округление Math.floor() к случайному числу от min до max+1.
//
// Например, для генерации целого числа от 1 до 3, создадим вспомогательное случайное значение от 1 до 4 (не включая 4).
//
// Тогда Math.floor() округлит их так:
//
//     1 ... 1.999+ станет 1
// 2 ... 2.999+ станет 2
// 3 ... 3.999+ станет 3
// Все диапазоны одинаковы. Итак, код:
//
// function randomInteger(min, max) {
//     var rand = min + Math.random() * (max + 1 - min);
//     rand = Math.floor(rand);
//     return rand;
// }
//
// alert( randomInteger(5, 10) );



// var str = 'Widget';
//
// if(~str.indexOf('geet')) {
//     console.log('matches');
// } else {
//     console.log('bad');
// }

//strings

//how to get 1 letter
//
// var str = 'jQuery';
//
// console.log(str.charAt(1));

//indexOf

// var str = "Ослик Иа-Иа посмотрел на виадук Иа"; // ищем в этой строке
// var target = "Иа"; // цель поиска

// var pos = 0;

// while (true) {
//     var foundPos = str.indexOf(target, pos);
//
//     if (foundPos == -1) break;
//
//     console.log(foundPos);
//
//     pos = foundPos + 1;
//
// }

// let s = 'Мы знаем, что монохром это серое вещество';
// let txt = 'хром';
// if(~s.indexOf(txt)) {
//     let pos = s.indexOf(txt);
//     let start = s.lastIndexOf(" ", pos)+1;
//     let end = s.indexOf(" ", pos);
//     let word = s.slice(start, end);
//     console.log(word);
// }


// var pos = -1;
// while ((pos = str.indexOf(target, pos + 1)) != -1) {
//     console.log(pos);
// }

// substring
// substring(start [, end])
// substring(start, end);
// функция возвращает подстроку с позиции start до end не включая

// var str = 'stringify';
// console.log(str.substring(0, 1)); //s

// console.log(str.substring(2)); // tringify

// substr
// substr(start [, length])
//Первый аргумент имеет такой же смысл, как и в substring,
// а второй содержит не конечную позицию, а количество символов.
// console.log(str.substr(2, 4)); // ring
// console.log(str.substr(3)); // ingify- до конца строки


// slice
// slice(start [, end])
// Возвращает часть строки от позиции start до,
// но не включая, позиции end.
// Смысл параметров – такой же как в substring.

// Отрицательные значения отсчитываются от конца строки:


// function ucFirst(str){
//     if(!str) return str;
//
//     str = str.charAt(0).toUpperCase() + str.slice(1);
//
//     console.log(str);
// };
//
// ucFirst("вася");
// ucFirst("");

// function checkSpam(str){
//     str = str.toLowerCase();
//
//     console.log(!!(~str.indexOf('viagra') || ~str.indexOf('xxx')));
//
// };
//
// checkSpam('buy ViAgRA now')// == true
// checkSpam('free xxxxx')// == true
// checkSpam("innocent rabbit")// == false

// function truncate(str, maxLimit){
//     if(str.length > maxLimit) {
//         var newString = str.slice(0, maxLimit - 3).trim() + '...';
//         console.log(newString);
//     }
// };

// function truncate(str, maxLimit){
//     return str.length>maxLimit ? str.slice(0, maxLimit - 3)+'...' : str;
// };
//
// console.log(truncate("Вот, что мне хотелось бы сказать  на эту тему:", 33));
// console.log(truncate("Всем привет!", 20));
// var str = '$120';
//
// function extractCurrencyValue(str) {
//     console.log(+str.slice(1));
// };
//
// extractCurrencyValue(str);

// Объекты

// let obj = {};
// let obj = new Object();

// let person = {};


// function func(){
//     console.log(this.a);
// }
//
// var obj = {
//     a: 100,
//     func: () => console.log(a)
// };
//
// obj.func();
//
// 'use strict';
// var obj = {
//     i: 10,
//     b: () => console.log(this.i, this),
//     c: function() {
//         console.log(this.i, this);
//     }
// }
// obj.b(); // prints undefined, Window {...} (или глобальный объект)
// obj.c(); // prints 10, Object {...}

//Arrays
// let arrFood = ["Яблоко", "Апельсин", "Груша"];
// forEach
// Метод «arr.forEach(callback[, thisArg])» используется для перебора массива.
// arrFood.forEach((item, i, arrFood) => {
//    console.log(item + ' ' + i + ' '+ 'массив:' + arrFood)
// });

// let names = [
//     {
//         title: 'HTML',
//         value: 'html'
//     },
//     {
//         title: 'HTML',
//         value: 'html'
//     },
//     {
//         title: 'HTML',
//         value: 'html'
//     }
// ];
//
// let newNames = [];
// for (let i = 0; i < names.length; i++) {
//     newNames.push(
//         {
//             title2: names[i].title,
//             name: names[i].value
//         }
//     )
// }
// console.log(newNames);

// filter
// Метод «arr.filter(callback[, thisArg])» используется для фильтрации массива через функцию.
// let arr = [1, -1, 2, -2, 3];
// let positiveArr = arr.filter((item) => {
//     return item>0
// });
//
// console.log(positiveArr);

//map
// Метод «arr.map(callback[, thisArg])» используется для трансформации массива.

// let names = ['HTML', 'CSS', 'JavaScript'];
// let nameLength = names.map((name) => {
//     return name.length;
// });
//
// console.log(nameLength);
//
// let names = [
//     {
//         title: 'HTML',
//         value: 'html'
//     },
//     {
//         title: 'HTML',
//         value: 'html'
//     },
//     {
//         title: 'HTML',
//         value: 'html'
//     }
// ];
// let newNames = names.map((item) => {
//     return item.value;
// });
//
// console.log(newNames);


// (function(a){
    // console.log(a);})(4);

// рекурсия
// function power(base, exp) {
//     if(exp == 0) return 1;
//
//     return base * power(base, exp - 1)
// }
//
// console.log(power(2, 3));

// Objects

// let user = {
//     'name': "John",
//     age: 33,
//     admin: true
// };
//
// for(let i in user) {
//     console.log(i+': ' + user[i])
// }

// function some(a, b) {
//     console.log(this.name);
//     console.log(a+b);
//     console.log(some.length);
//     console.log(arguments.length);
// }

// function sayHi() {
//     for (let i = 0; i<arguments.length; ++i){
//         console.log(`Привет ${arguments[i]}`);
//     }
// }
//
// sayHi();
// sayHi("Серж", "Вася");
// sayHi("Людка", "Олька", "Иванна");
//
// var vasya = {
//     age: 21,
//     name: 'Вася',
//     surname: 'Петров'
// };
//
// var user = {
//     isAdmin: false,
//     isEmailConfirmed: true
// };
//
// var student = {
//     university: 'My university'
// };

// function copy(dst){
//     for (let i = 1; i<arguments.length; i++) {
//         let arg = arguments[i];
//
//         for (let key in arg) {
//             dst[key] = arg[key]
//         }
//     }
//
//     return dst;
// }
//
// // добавить к vasya свойства из user и student
// copy(vasya, user, student);
// console.log(vasya);
//
// console.log( vasya.isAdmin ); // false
// console.log( vasya.university ); // My university

// Проверка на аргумент-undefined
// function f(x) {
//     return arguments.length ? arguments.length : 0;
//     // выведите 1, если первый аргумент есть, и 0 - если нет
// }
//
// console.log(f(undefined, undefined)); // 1
// console.log(f()); // 0

// Сумма аргументов

// function sum() {
//     let sum = 0;
//     for (let i=0; i<arguments.length; i++) {
//         sum += arguments[i]
//     }

//     return sum
// }

// console.log(sum()); // 0
// console.log(sum(1));// 1
// console.log(sum(1, 2)); // 3
// console.log(sum(1, 2, 3)); // 6
// console.log(sum(1, 2, 3, 4)); // 10


// let findById = (data, id) => {
//     let result = data.filter((item) => {
//         if(item.id === id) {
//             return item.label
//         };
//     })
//     return result;
// }



// let person = {
//   name: 'Serg',
//   admin: true,
//   say: function (word) {
//       console.log(word+ " " + this.name)
//   },
//   foo: some
// };

// person.say('hello');
// person.foo();

// let person1 = {
//     name: "Ivan"
// };
// person1.x = person.say;

// person1.x('hi');


// some.call(person1, 10, 20, 55, 77);


// let a = [5,12];
// let b = [];
// a[99] = 7;

// for(let i = 0; i<a.length; i++){
//     b.push(i= i*i);
// }
// for(let i in a) {
//     b.push(a[i]*=a[i])
// }

// for(let i in a) {
//     b.push(Math.pow(a[i], 2))
// }
// console.log(b);

// copy Obj
// clone = {...user};
// const bothSameObjects = {...user, ...clone};


//Определите, пуст ли объект
// function isEmpty(obj) {
//     var counter = 0;
//
//     for(let key in obj) {
//         counter++
//     }
//
//     return counter>0
// }

// function isEmpty(obj) {
//     for(let key in obj) {
//         return false
//     }
//
//     return true
// }
//
// var schedule = {};
//
// console.log(isEmpty(schedule));
//
// schedule["8:30"] = "подьем";
//
// console.log(isEmpty(schedule));

// Сумма свойств

// let salaries = {
//     "Вася": 100,
//     "Петя": 300,
//     "Даша": 250
// };
//
// let salary = {};
//
// function salarySum(obj){
//     let sum = 0;
//     for (let key in obj) {
//         sum += obj[key];
//     }
//
//     return sum;
// }
//
// console.log(salarySum(salaries));
// console.log(salarySum(salary));

// Свойство с наибольшим значением
// var salaries = {
//     "Вася": 100,
//     "Петя": 300,
//     "Даша": 250
// };
//
// let maxName = '';
// let max = 0;
//
// for(let name in salaries) {
//     if(max<salaries[name]){
//         max = salaries[name];
//         maxName = name;
//     }
// }
//
// console.log(maxName || 'нет сотрудников');

// Дата и Время
// new Date();
// let now = new Date();
// let now = new Date(2011, 0, 1);
// var date = new Date(2011, 0, 1, 2, 3, 4, 567);
// let date = new Date().getFullYear(); // 2019
// let date = new Date().getMonth(); // 0 (сейчас январь)
// let date = new Date().getDate(); //28
// getHours(), getMinutes(), getSeconds(), getMilliseconds()
// console.log( date );

// Все методы, указанные выше, возвращают результат для местной временной зоны.
//
// Существуют также UTC-варианты этих методов, возвращающие день, месяц, год и т.п.
// для зоны GMT+0 (UTC): getUTCFullYear(), getUTCMonth(), getUTCDay().
// То есть, сразу после "get" вставляется "UTC".

// текущая дата
// var date = new Date();

// час в текущей временной зоне
// console.log( date.getHours() );

// сколько сейчас времени в Лондоне?
// час в зоне GMT+0
// console.log( date.getUTCHours() );
// getTime()
// Возвращает число миллисекунд, прошедших с 1 января 1970 года GMT+0, то есть того же вида, который используется в конструкторе new Date(milliseconds).
//
// getTimezoneOffset()
// Возвращает разницу между местным и UTC-временем, в минутах.
// Установка компонентов даты
// Следующие методы позволяют устанавливать компоненты даты и времени:
//
//     setFullYear(year [, month, date])
// setMonth(month [, date])
// setDate(date)
// setHours(hour [, min, sec, ms])
// setMinutes(min [, sec, ms])
// setSeconds(sec [, ms])
// setMilliseconds(ms)
// setTime(milliseconds) (устанавливает всю дату по миллисекундам с 01.01.1970 UTC)

// var date = new Date(2014, 11, 31, 12, 30, 0);
//
// var options = {
//     era: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     weekday: 'long',
//     timezone: 'UTC',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
// };
//
// alert( date.toLocaleString("ru", options) ); // среда, 31 декабря 2014 г. н.э. 12:30:00

// let d = new Date();
// console.log(d.now());
//toUTCString() То же самое, что toString(), но дата в зоне UTC.

// YYYY-MM-DD – дата в формате год-месяц-день.
//     Обычный символ T используется как разделитель.
//     HH:mm:ss.sss – время: часы-минуты-секунды-миллисекунды.
//     Часть 'Z' обозначает временную зону – в формате +-hh:mm, либо символ Z, обозначающий UTC. По стандарту её можно не указывать, тогда UTC,
//     но в Safari с этим ошибка, так что лучше указывать всегда.
// Метод Date.now()
// Метод Date.now() возвращает дату сразу в виде миллисекунд.

// let dateNow = new Date(2012, 1, 20, 3, 12);
// console.log(dateNow.toString());

// Замыкания, функции изнутри
// Возврат функции
// function makeCounter() {
//     let counter = 1;
//
//     return function () {
//         return counter++
//     }
// }
// let count = makeCounter();
// console.log(count()); // 1
// console.log(count()); // 2
// console.log(count()); // 3
//
// function makeCounter() {
//     let currentCount = 1;
//
//     return {
//         getNext: function () {
//             return currentCount++;
//         },
//         set: function (value) {
//             currentCount = value;
//         },
//         reset: function () {
//             currentCount = 1;
//         }
//     }
// }
//
// let counter = makeCounter();
// console.log(counter.getNext());
// console.log(counter.getNext());
// counter.set(6);
// console.log(counter.getNext());

// function makeCounter() {
//   let currentCount = 1;
//
//   function counter() {
//       return currentCount++
//   }
//
//   counter.set = function (value) {
//       currentCount = value;
//   };
//
//   counter.reset = function () {
//       currentCount = 1;
//   }
//
//   return counter;
//
// }
//
// let counter = makeCounter();
//
// console.log(counter());
// console.log(counter());
// counter.set(12);
// console.log(counter());

// function sum(a){
//     return function (b) {
//         return a+b;
//     }
// };
//
// console.log(sum(1)(2)); //3
// console.log(sum(5)(-1)); // 4

// function makeBuffer() {
//     let text = "";
//
//     function buffer(value) {
//         if ( arguments.length === 0 ) return text;
//         text+=value;
//     };
//
//     buffer.clear = function() {
//         text = '';
//     };
//
//     return buffer;
// }
//
// var buffer = makeBuffer();
//
// // добавить значения к буферу
// buffer('Замыкания');
// buffer(' Использовать');
// buffer();
// buffer(' Нужно!');
//
// // получить текущее значение
// // console.log(buffer()); // Замыкания Использовать Нужно!
//
// buffer("Тест");
// buffer(" тебя не съест ");
// console.log(buffer()); // Тест тебя не съест
//
// buffer.clear();
// console.log(buffer());// ""
//
// buffer(0);
// buffer(1);
// buffer(0);
//
// console.log( buffer() ); // '010'


// // Сортировка
// var users = [{
//     name: "Вася",
//     surname: 'Иванов',
//     age: 20
// }, {
//     name: "Петя",
//     surname: 'Чапаев',
//     age: 25
// }, {
//     name: "Маша",
//     surname: 'Медведева',
//     age: 18
// }];
//
// function byField(field){
//     return function (a,b) {
//         return a[field] > b[field] ? 1 : -1;
//     }
// }
//
// users.sort(byField('name'));
// users.forEach(function(user) {
//     console.log( user.name );
// }); // Вася, Маша, Петя
//
// users.sort(byField('age'));
// users.forEach(function(user) {
//     console.log( user.name );
// }); // Маша, Вася, Петя

// Перехват ошибок, "try..catch"
// try {
//     /// code....
// } catch (e) {
//     // обработка ошибки
// }

// let data = '{"name":"Вася", "age": 30}';
// let user = JSON.parse(data);
// console.log(user);

// let data = "Has Error";
//
// try {
//     let user = JSON.parse(data);
//
//     console.log(user.name);
// } catch (e) {
//     console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз");
//     console.log(e.name);
//     console.log(e.message);
//     console.log(e.stack);
// }

// let data = "{'age': 30}";
//
// try {
//     let user = JSON.parse(data);
//     console.log(user.name);
// } catch (e) {
//     console.log("Извините, в данных ошибка");
// }

// function readData() {
//     var data = '{ "name": "Вася", "age": 30 }';
//
//     try {
//         // ...
//         blabla(); // ошибка!
//     } catch (e) {
//         // ...
//         if (e.name != 'SyntaxError') {
//             throw e; // пробрасываем
//         }
//     }
// }
//
// try {
//     readData();
// } catch (e) {
//     alert( "Поймал во внешнем catch: " + e ); // ловим
// }

// В примере выше try..catch внутри readData умеет обрабатывать только SyntaxError, а внешний – все ошибки.
//
// Без внешнего проброшенная ошибка «вывалилась» бы в консоль с остановкой скрипта.

// function ReadError(message, cause) {
//     this.message = message;
//     this.cause = cause;
//     this.name = 'ReadError';
//     this.stack = cause.stack;
// }
//
// function readData() {
//     var data = '{ bad data }';
//
//     try {
//         JSON.parse(data)
//     } catch (e) {
//         if ( e.name == 'URIError' ) {
//             throw new ReadError(`Ошибка в URI `, e)
//         } else if ( e.name == 'SyntaxError' ) {
//             throw new ReadError(`Синтаксическая ошибка в данных `, e)
//         } else {
//             throw e // пробрасываем
//         }
//     }
// }

// try {
//     readData()
// } catch (e) {
//     if ( e.name == 'ReadError' ){
//         console.log(e.message);
//         console.log(e.cause);
//     } else {
//         throw e;
//     }
// }

// Формат JSON, метод toJSON
// JSON.parse – читает объекты из строки в формате JSON.
// JSON.stringify – превращает объекты в строку в формате JSON, используется, когда нужно из JavaScript передать данные по сети.

// var numbers = "[0, 1, 2, 3]";
//
// numbers = JSON.parse(numbers);
// console.log(numbers);
//
// var user = '{ "name": "Вася", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
// user = JSON.parse(user);
// console.log(user);
// console.log(user.friends[2]);
//
// let str = '{"title":"Конференция","date":"2014-11-28T12:00:00.000Z"}';
// let event = JSON.parse(str, (key, value)=>{
//  if ( key == "date" ) return new Date(value)
//  return value
// });
//
// console.log(event.date.getDate());

// var schedule = '{ \
//   "events": [ \
//     {"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}, \
//     {"title":"День рождения","date":"2015-04-18T12:00:00.000Z"} \
//   ]\
// }';
//
// schedule = JSON.parse(schedule, function(key, value) {
//     if (key == 'date') return new Date(value);
//     return value;
// });
//
// alert( schedule.events[1].date.getDate() ); // сработает!

// var user = {
//     name: "Вася",
//     age: 25,
//     window: window
// };
//
// var str = JSON.stringify(user, function(key, value) {
//     if (key == 'window') return undefined;
//     return value;
// });
//
// alert( str ); // {"name":"Вася","age":25}

// var user = {
//     name: "Вася",
//     age: 25,
//     roles: {
//         isAdmin: false,
//         isEditor: true
//     }
// };
//
// var str = JSON.stringify(user, "", 4);
//
// alert( str );

// let leader = {
//     name: "Василий Иванович",
//     age: 35
// };
// leader = JSON.stringify(leader);
// console.log(leader);
// leader = JSON.parse(leader);
// console.log(leader);
//
// "use strict";
//
// var leader = {
//     id: 1,
//     name: "Василий Иванович"
// };
//
// var soldier = {
//     id: 2,
//     name: "Петька"
// };
//
// leader.soldier = soldier.id;
// soldier.leader = leader.id;
//
// var arr = [leader, soldier];
//
// var strify = JSON.stringify(arr, function(key, value){
//     return value;
// }, 4);
// alert(strify);

/* Результат -- красиво сериализованный объект:
{
    "name": "Вася",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

// var room = {
//     number: 23,
//     occupy: function() {
//         alert( this.number );
//     }
// };
//
// var event = {
//     title: "Конференция",
//     date: new Date(Date.UTC(2014, 0, 1)),
//     room: room
// };
//
// alert( JSON.stringify(event) );
/*
  {
    "title":"Конференция",
    "date":"2014-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/


// Алгоритм работы instanceof
// function Rabbit() {};
// let rabbit = new Rabbit();
// console.log(rabbit instanceof Rabbit); //true
//
// let arr = [1,2,4,5];
// console.log(arr instanceof Array);//true
// В проверке rabbit instanceof Rabbit совпадение происходит на первом же шаге этого алгоритма, так как:
// rabbit.__proto__ == Rabbit.prototype.

// console.log(arr instanceof Object);//true
// А если рассмотреть arr instanceof Object, то совпадение будет найдено на следующем шаге,
// так как arr.__proto__.__proto__ == Object.prototype.

// console.log(arr instanceof Function);//false

// function A() {}
// function B() {}
// A.prototype = B.prototype = {};
// var a = new A();
// alert( a instanceof B ); // true
// Да, это выглядит достаточно странно, поскольку объект a не создавался функцией B.
//Но методу instanceof на самом деле вообще не важна функция. Он смотрит на её prototype и сверяет его с цепочкой __proto__ объекта.
//В данном случае a.__proto__ == B.prototype, поэтому instanceof возвращает true.

// function Animal() {}
// function Rabbit() {}
// Rabbit.prototype = Object.create(Animal.prototype);
// var rabbit = new Rabbit();
// alert( rabbit instanceof Rabbit ); // true
// alert( rabbit instanceof Animal ); // true
// alert( rabbit instanceof Object ); // true





// class
// class User {
//     constructor(name){
//         this.name = name;
//     }
//
//     sayHi(){
//         console.log(this.name);
//     }
// }
//
// let ilich = new User('илич');
// ilich.sayHi();


// function User2(name) {
//     this.name = name;
// }
//
// User2.prototype.sayHi = function () {
//     console.log(this.name);
// };
//
// var vasya = new User2('Васяяя');
// vasya.sayHi();


// Геттеры, сеттеры и вычисляемые свойства

// class User {
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//
//     get fullName(){
//         console.log("Ваше имя: " + this.firstName +' '+ this.lastName )
//     }
//
//     set fullName(newName) {
//         [this.firstName, this.lastName] = newName.split(' ');
//     }
//
//     // вычисляемое название метода

//     ["test".toUpperCase()]() {
//         console.log("PASSED!")
//     }
//
//     static createGuest(){
//         return new User('Гость', 'Сайта');
//     }
// }
//
// let user = new User('Серега', 'Кандыба');
// user.fullName;
// user.fullName = 'Алеха Золотарев';
// user.fullName;
// let newUser = User.createGuest();
// newUser.fullName;

// Наследование

// class Animal {
//     constructor(name){
//         this.name = name;
//     }
//
//     walk(){
//         console.log('я могу ходить: ' + this.name);
//     }
// }
//
// class Rabit extends Animal {
//     walk(){
//         super.walk();
//
//         console.log('...and jump')
//     }
// }
//
// new Rabit('Игорь').walk();

//связь классов в наследовании

// Rabit.prototype.__proto__ = Animal.prototype;


//array
// Получить последний элемент массива
// let goods = ['good1', 'good2', 'good3'];
// let lastEl = goods[goods.length-1];
// console.log(lastEl);

// Добавить новый элемент в массив
// let goods = ['good1', 'good2', 'good3'];
// console.log(goods[goods.length] = 'Компьютер');

// Получить случайное значение из массива
// var arr = ["Яблоко", "Апельсин", "Груша", "Лимон"];
// var rand = Math.floor(Math.random() * arr.length);
// console.log(arr[rand]);

// let arr = [1, 2, 3];
//
// let arr2 = arr;
// arr2[0] = 5;
//
// console.log( arr[0] ); // 5
// console.log( arr2[0] ); // 5

//copy array
// let arr = ["Яблоко", "Апельсин", "Груша", "Лимон"];
//
// let arr2 = [];
// for(let i=0; i<arr.length; i++){
//     arr2[i] = arr[i];
// }
// console.log(arr2);

//Поиск в массиве
// let arr = ["test", 2, 1.5, false];

// function find(arr, value) {
//     let pos = -1;
//
//     pos = arr.indexOf(value);
//
//     console.log(pos);
// };

// function find(array, value) {
//
//     return array.indexOf ? array.indexOf(value) : -1
//
//     // for (var i = 0; i < array.length; i++) {
//     //     if (array[i] === value) return i;
//     // }
//     //
//     // return -1;
// }
// console.log(find(arr, "test")); // 0
// console.log(find(arr, 2)); // 1
// console.log(find(arr, 1.5)); // 2
//
// console.log(find(arr, 0)); // -1


// var arr = [5, 4, 3, 8, 0];
//
// function filterRange(arr, a, b) {
//     let results = [];
//     for (let i=0; i<arr.length; i++){
//         if ( a <= arr[i] && b >= arr[i] ){
//             results.push(arr[i]);
//         }
//     }
//     return results
// }
//
// var filtered = filterRange(arr, 3, 5);
// console.log(filtered);

// let names = 'Маша, Петя, Марина, Василий';
//
// let arr = names.split(', ');
// console.log(arr);
// let newArr = arr.join();

// Удаление из массива

// var arr = ["Я", "иду", "домой", "и", "мне", "похуй"];
// // delete arr[1];// плохой вариант
// console.log(arr);
// // .pop() .shift() - хорошие варианты
// let cutteddArr = arr.splice(1,3, arr.length);
// console.log(cutteddArr);
// console.log(arr);
//
// //можно вставить элементы
// arr.splice(2,0, "потому", "потому что");
// console.log(arr);

// Сортировка, метод sort(fn)
// let arr = [ 1, 2, 15 ];
// arr.sort();
// console.log(arr);// [ 1, 15, 2 ]
// // Это произошло потому, что по умолчанию sort сортирует, преобразуя элементы к строке.
//
// function compareNumeric(a,b) {
//     if(a>b) return -1;
//     if ( a<b ) return 1;
// }
//
// arr.sort(compareNumeric);
// console.log(arr);

// reverse
// Метод arr.reverse() меняет порядок элементов в массиве на обратный.

// var arr = [1, 2, 3];
// arr.reverse();

// alert( arr ); // 3,2,1

// concat
// let arr = [1, 2];
// let arr2 = [3,4,5,6];
// let arr3 = [7,8,9];
// let newArr = arr.concat(arr2, arr3, 10);
// console.log(newArr);

// let store = {}; // объект для коллекции
//
// let items = ["div", "a", "form"];
//
// for (let i = 0; i<items.length; i++) {
//     let key = items[i];
//     store[key] = true;
// }
//
// console.log(store);
// Теперь для проверки, есть ли ключ key, достаточно выполнить if (store[key]). Если есть – можно использовать значение, если нет – добавить.
//
//     Такое решение работает только со строками, но применимо к любым элементам, для которых можно вычислить строковый «уникальный ключ».


// Object.keys(obj)
// var user = {
//     name: "Петя",
//     age: 30
// }
//
// let keys = Object.keys(user);
// console.log(keys);

// Итого
// Методы массивов:
//
//     push/pop, shift/unshift, splice – для добавления и удаления элементов.
//     join/split – для преобразования строки в массив и обратно.
//     slice – копирует участок массива.
//     sort – для сортировки массива. Если не передать функцию сравнения – сортирует элементы как строки.
//     reverse – меняет порядок элементов на обратный.
//     concat – объединяет массивы.
//     indexOf/lastIndexOf – возвращают позицию элемента в массиве (не поддерживается в IE8-).
// Дополнительно:
//
//     Object.keys(obj) возвращает массив свойств объекта.

//forEach
// Этой функции он передаёт три параметра callback(item, i, arr):
//
// item – очередной элемент массива.
//     i – его номер.
//     arr – массив, который перебирается.

// var arr = ["Яблоко", "Апельсин", "Груша"];
//
// arr.forEach((item, i, arr) => {
//     console.log(`${i}: ${item}  массив: ${arr}`);
// });

// filter
// Метод «arr.filter(callback[, thisArg])» используется для фильтрации массива через функцию.
//
//     Он создаёт новый массив, в который войдут только те элементы arr, для которых вызов callback(item, i, arr) возвратит true.

// var arr = [1, -1, 2, -2, 3];
// let newArr = arr.filter(number => {
//    return number < 0;
// });
//
// console.log(newArr);

// map
// Метод «arr.map(callback[, thisArg])» используется для трансформации массива.
//
//     Он создаёт новый массив, который будет состоять из результатов вызова callback(item, i, arr) для каждого элемента arr.
//
// let names = ['HTML', 'CSS', 'JavaScript'];
// let newArr = names.map(item => {
//    return item.length;
// });
// console.log(newArr);

// every/some
// Эти методы используются для проверки массива.
//
//     Метод «arr.every(callback[, thisArg])» возвращает true, если вызов callback вернёт true для каждого элемента arr.
//     Метод «arr.some(callback[, thisArg])» возвращает true, если вызов callback вернёт true для какого-нибудь элемента arr.

// var arr = [1, -1, 2, -2, 3];
//
// function isPositive(number) {
//     return number > 0;
// }
//
// console.log(arr.some(isPositive));
// console.log(arr.every(isPositive));

// reduce/reduceRight
// let arr = [1, 2, 3, 4, 5];
//
// let result = arr.reduce((sum, current) => {
//     console.log(sum);
//     console.log(current + " current");
//     return sum +=current;
// });
//
// console.log(result);

// Мы рассмотрели методы:
//
//     forEach – для перебора массива.
//     filter – для фильтрации массива.
//     every/some – для проверки массива.
//     map – для трансформации массива в массив.
//     reduce/reduceRight – для прохода по массиву с вычислением значения.
//     Во многих ситуациях их использование позволяет написать код короче и понятнее, чем обычный перебор через for.

// Перепишите цикл через map
/// var arr = ["Есть", "жизнь", "на", "Марсе"];
//
// let arrLength = arr.map(item => {
//     return item.length;
// });
//
// console.log( arrLength ); // 4,5,2,5

// Массив частичных сумм
// let arr = [1,2,3,4,5];
//
// function getSums(arr) {
//     let result = [];
//     if ( !arr.length ) return result;
//     let totalResult = arr.reduce((sum, current) => {
//         result.push(sum);
//         return sum += current;
//     });
//     result.push(totalResult);
//
//     return result;
// };
//
// console.log(getSums(arr));


// Promises- explanation
// function doSomething() {
//     return new Promise((resolve, reject) => {
//         // Succeed half of the time.
//         console.log("It is done.");
//         if (true) {
//             resolve("Hi ")
//         } else {
//             reject("FAILURE")
//         }
//     })
// }
//
// function doSomethingElse() {
//     return new Promise((resolve, reject) => {
//         // Succeed half of the time.
//         if (true) {
//             resolve("my name is ")
//         } else {
//             reject("FAILURE")
//         }
//     })
// }
//
// function doThirdThing() {
//     return new Promise((resolve, reject) => {
//         // Succeed half of the time.
//         if (true) {
//             resolve("Serj ")
//         } else {
//             reject("FAILURE")
//         }
//     })
// }
//
// function failureCallback() {
//     return new Promise((resolve, reject) => {
//         reject("FAILURE")
//     })
// }
//
// doSomething()
//     .then(result => doSomethingElse(result))
//     .then(newResult => doThirdThing(newResult))
//     .then(finalResult => {
//         console.log(`Итоговый результат: ${finalResult}`);
//     })
//     .catch(failureCallback);

// new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(1), 500);
//
// }).then((result) => {
//     console.log(result);
//     return result + 2;
//
// }).then((result) => {
//     throw new Error("FAILED HERE");
//     console.log(result);
//     return result + 2;
//
// }).then((result) => {
//     console.log(result);
// })
// .catch((e) => {
//     console.log("Error ", e);
// });

// let normalizedComments = [
//     {comment: ['sansc,mna,smnc', 'xaksnxkjanskjnx']},
//     {comment: ['sansc,mna,smnc', 'xaksnxkjanskjnx']},
//     {comment: ['sansc,mna,smnc', 'xaksnxkjanskjnx']},
// ];
//
// const defaultComments = normalizedComments.reduce(
//     (acc, comment) => ({ ...acc, [comment.id]: comment }),
//     {}
// );
// console.log(defaultComments);

//es5
// function concatStrEs5(name, sign) {
//   name = name || 'Miha';
//   sign = sign || '!';
//
//   console.log('es5 ' + name + ' - ' + sign);
// }
//
// //es6
// function concatStrEs6(name='Miha', sign='!'){
//   console.log(`es6 ${name} - ${sign}`);
// };
//
// concatStrEs5('Miha', '!');
// concatStrEs5(undefined, '?');
//
// concatStrEs6('Miha', '!');
// concatStrEs6(undefined, '?');

// //es6
/* let sum = (...args) => args.reduce((s, num) => s + `-${num}`, 'Our'); */

// let sum = (...args) => args.join('-');
// console.log(sum('Miha', 'is', 'cool', '!'));

// concatStr('Miha', '!');
// concatStr('Miha', 'is', 'cool', '!');
// concatStr(['Miha', 'is', 'cool', '!']);


// function avarageNumber(...restNumbers) {
//   let average = 0;
//
//   for( let i = 0; i < restNumbers.length; i++ ) {
//     let value = restNumbers[i];
//     const isNumber = (value instanceof Number ||  typeof value === 'number') && !isNaN(value);
//
//     if (isNumber) {
//       average = average += restNumbers[i] / restNumbers.length;
//     } else {
//       console.error(`error type ${typeof value} in ${value}`)
//     }
//   }
//
//   average = average.toFixed(1);
//
//   console.log("Average value: " + average);
// }
//
// avarageNumber(1,23,4,5,6, '333', 'Miha', 44, null, true, 315);
// avarageNumber(2,3);

// Unsorted array
let array = [2, 1, 10, 7, 5, 6, 3, 5];

function sort(array) {
  for( let i = 1; i < array.length; i++ ) {
    for(let j = 0 ; j < array.length; j++){
      if (array[j] > array[j + 1]) {
        let temp = array[j];

        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

let cars = ['cascasc1', 'cas2casc', 'ca3scasc', 'casca4sc', 'cas5casc'];

for (let car of cars) {
  console.log(car);
}

for(var i = 0; i < 10; i++) {
  setTimeout((function(e) {
    return function() {
      console.log(e);
    }
  })(i), 1000)
}

for(var i = 0; i < 10; i++) {
  setTimeout(function (e) {
    return function () {
      console.log(e);
    }
  })(i)
}




console.log(sort(array));


// spread

// const arr1 = [1,2,3];

// const arr2 = [1,2,5];
//
// const shallow = [...arr1, ...arr2];
//
// const res = Math.max(...shallow);
//
// console.log(shallow);
//
// console.log(res);

// const person = {
//   name: {
//     first: 'First',
//     last: 'Last'
//   },
//   age: 22,
// };
//
// const {
//   name: {first: firstName, last: lastName},
//   age,
//   permisions: { role = 'user'} = {}
// } = person;
//
// console.log(role, firstName, lastName, age);

// деструктуризация обьектов

// function connect({
//    host = 'localhost2',
//    port = 4444,
//    user = 'guest',
// } = {}) {
//   console.log('host:',  host, 'port:', port, 'user:', user );
// }
//
// connect();

// const port = {
//   host: 'localhost2',
//   port: 4444,
//   user: 'guest',
// };
//
// const { host, ...otherParams } = port;
//
// console.log(host, otherParams);


// деструктуризация массив

// const line = [[12,33], [2,322]];
//
// const [[p1, p2],[a1, a2]] = line;
//
// console.log(p1, p2, a1, a2);

// const port = {
//   duck: 'duckk',
//   dog: 'dogg',
//   mouse: 'mousee',
//   ddd: 'mousee'
// };
//
// const res = Object.entries(port)
//     .filter(([, value]) => value === 'mousee')
//     .map(([key]) => key);
//
// console.log(res);

// const shape = {
//   type: 'segment',
//   coord: {
//     start: [12,13],
//     end: [17,15]
//   }
// };
//
// const {coord: {start: [x,y], end: [x1,y1]}} = shape;
//
// console.log(x, y, x1, y1);

// шаблоны строк

// const user = 'Bob';
// const num = 12;
// const txt = 'hello' + user + 'how are you' + num;
//
// const txt2 = `hello ${user} how are you ${Date.now()}`;
// console.log(txt2);

// оператор spread

// const prefix = 'blah_';
//
// const data = {
//   [prefix + 'name']: 'Bob',
//   [prefix + 'age']: 33
// };
//
// console.log(data);
//
// const person = {
//   name: 'Bob',
//   friends: ['Mark', 'Jacob'],
// };
//
// const address = {
//   name: 'Serg',
//   city: 'Kyiv',
//   country: 'Ukraine'
// };
//
// // const res = Object.assign({}, person, address);
//
// const port = 1234;
//
// const res = {
//   ...person,
//   ...address,
//   port,
//   connect() {
//
//   }
// };
//
// console.log(res);

// Прототипы

// const animal = {
//   say: function () {
//     console.log(this.name, this.voice)
//   }
// };
//
// const dog = Object.create(animal);
// dog.name = 'Dog';
// dog.voice = 'Woof';
//
// dog.say();

// function Animal(name, voice) {
//   this.name = name;
//   this.voice = voice;
// }
//
// Animal.prototype.say = function () {
//   console.log(this.name, this.voice);
// };
//
// const cat = new Animal('Cat', 'meeu');
// const dog = new Animal('Dog', 'woof');
//
// cat.say();
// dog.say();

// Классы
// class Animal {
//   constructor(name, voice){
//     this.name = name;
//     this.voice = voice;
//   }
//
//   say(){
//     console.log(this.name, this.voice);
//   }
// }
//
// class Bird extends Animal {
//   constructor(name, voice, canFly){
//     super(name, voice);
//     super.say();
//
//     this.canFly = canFly;
//   }
//
//   say(){
//     console.log('birsd don\'t like');
//   }
// }

// duck -> Bird.prototype ->
// Animal.prototype -> Object.prototype -> null
// const duck = new Bird('Duck', 'quack', true);
//
// duck.say();


// const arr = ['55','2','3','4'];
// const arr2 = ['5','555','3','4'];
//
// const res = arr
//     .map((el) => parseInt(el))
//     .filter((num) => num%2)
//     .reduce((max, value) => Math.max(max, value), 0);
//
// // console.log(res);
//
// function max(a,b,c, ...numbers) {
//   console.log(...numbers);
// }
//
// // max(1,5,3,4);
//
// const shallowCopy = [...arr, ...arr2];
//
// console.log(shallowCopy);
//
// const person = {
//   name: {
//     first: 'first',
//     last: 'last',
//   },
//   age: 22,
// };
//
// const { name: {first: firstName, last: lastName}, age} = person;
//
// console.log(firstName, lastName, age);






































































































// Методы объекта, "this"
// Значение this вычисляется во время выполнения кода и зависит от контекста.
// let admin = {name: "Admin"};
// let user = {name: "User"};
// function sayHi() {
//   return this.name;
// }
// admin.f = sayHi;
// user.f = sayHi;
// admin.f();
// user.f();

// Привязка контекста к функции
// привязать контекст с помощью bind

// let user = {
//   name: "Serhii",
//   sayHi(){
//     console.log(this.name);
//   }
// };
//
// let sayHi = user.sayHi.bind(user);
// sayHi();

// let user = {
//   name: "Serhii"
// };
// function func(phrase) {
//   console.log(phrase + " " + user.name);
// }
// let funcUser = func.bind(user);
// funcUser("Hi,");

// Числа

// .toString() // число в строку
// Округление
// Math.floor - Округление в меньшую сторону: 3.1 становится 3
// Math.ceil - Округление в большую сторону: 3.1 становится 4
// Math.round - Округление до ближайшего целого: 3.1 становится 3
// Math.trunc - Производит удаление дробной части без округления: 3.1 становится 3
// toFixed(n) - округляет число (будет строка) - Мы можем преобразовать полученное значение в число, используя унарный оператор + или Number(),
// пример с унарным оператором: +num.toFixed(5).

// Проверка: isFinite и isNaN
// isNaN(value) преобразует значение в число и проверяет является ли оно NaN
// Существует специальный метод Object.is, который сравнивает значения примерно как ===, но более надёжен в двух особых ситуациях

// parseInt и parseFloat
// Они «читают» число из строки. Если в процессе чтения возникает ошибка, они возвращают полученное до ошибки число.
// Функция parseInt возвращает целое число, а parseFloat возвращает число с плавающей точкой
// Math.random() - Возвращает псевдослучайное число в диапазоне от 0 (включительно) до 1 (но не включая 1)

// ___________________________

// Строки
// Поиск подстроки
// str.indexOf("Widget")

// let str = "Widget with id";
// if (str.indexOf("Widget") != -1) {
//   alert("Совпадение есть"); // теперь работает
// }

// includes, startsWith, endsWith
// alert( "Widget with id".includes("Widget") ); // true

// substring, substr и slice
// str.slice(start [, end])
// Возвращает часть строки от start до (не включая) end.
// str.substring(start [, end])
// Возвращает часть строки между start и end.
// Это — почти то же, что и slice, но можно задавать start больше end.

// str.trim() — убирает пробелы в начале и конце строки.
// str.repeat(n) — повторяет строку n раз.

// Сделать первый символ заглавным
// function ucFirst(str) {
//   if (!str) return str;
//
//   return str[0].toUpperCase() + str.slice(1);
// }
// alert( ucFirst("вася") );

// Проверка на спам
// function checkSpam(str){
//   let lowerStr = str.toLowerCase();
//
//   console.log(lowerStr.includes('viagra') || lowerStr.includes('xxx'));
// }
//
// checkSpam('buy ViAgRA now') == true
// checkSpam('free xxxxx') == true
// checkSpam("innocent rabbit") == false

// Усечение строки
// function truncate(str, max){
//   return (str.length > max) ? str.slice(0, max - 1) + "..." : str
// };
//
// console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
// console.log(truncate("Всем привет!", 20));

// Выделить число
// function extractCurrencyValue(num){
// //   return +num.slice(1)
// // };
// // console.log( extractCurrencyValue('$120') === 120 ); // true

// Массивы
// let fruits = ["Яблоко", "Апельсин", "Слива"];
// fruits[fruits.length] = "cacasc";
//
// console.log(fruits.length);
// Методы массивов
// let arr = ["Я", "изучаю", "JavaScript"];
// arr.splice(1,1); // начиная с позиции 1, удалить 1 элемент
// alert( arr ); // осталось ["Я", "JavaScript"]

// let arr = ["Я", "изучаю", "JavaScript"];
// arr.splice(2, 0, "сложный", "язык"); // удалить 0 элементов // вставить "сложный", "язык"
// console.log(arr);
// Метод arr.slice намного проще, чем похожий на него arr.splice.
// Можно вызвать slice и вообще без аргументов: arr.slice() создаёт копию массива arr
// concat
// arr.concat(arg1, arg2...) // создаёт новый массив, в который копирует данные из других массивов
// ПЕРЕБОР forEach
// arr.forEach((index, item, array) => {
// });
// Поиск в массиве
// indexOf/lastIndexOf и includes
// let arr = [1, 0, false];
//
// alert( arr.indexOf(0) ); // 1
// alert( arr.indexOf(false) ); // 2
// alert( arr.indexOf(null) ); // -1
//
// alert( arr.includes(1) ); // true

// find и findIndex
// let users = [
//   {id: 1, name: "Вася"},
//   {id: 2, name: "Петя"},
//   {id: 3, name: "Маша"}
// ];
// let user = users.find(item => item.id == 1);
// alert(user.name); // Вася

// filter
// let results = arr.filter(function(item, index, array) {
//   // если true - элемент добавляется к результату, и перебор продолжается
//   // возвращается пустой массив в случае, если ничего не найдено
// });

// Преобразование массива
// let result = arr.map(function (item, index, array) {
//   console.log(item);
// });

// sort(fn) - arr.sort( (a, b) => a - b );
// reverse
// split и join - разбивает строку на массив по заданному разделителю
// let names = 'Вася, Петя, Маша';
// let arr = names.split(', ');
// join - делает обратное
// Если нам нужно перебрать массив – мы можем использовать forEach, for или for..of.
// Если нам нужно перебрать массив и вернуть данные для каждого элемента – мы используем map.

// reduce/reduceRight - используются для вычисления какого-нибудь единого значения на основе всего массива
// let value = arr.reduce(function(previousValue, item, index, array) {
//   // ...
// }, [initial]);












arr.sort((a, b) => a % 2 - b % 2);

// ___________________________

// В строгом режиме ("use strict") в таком коде значением this будет являться undefined.
// В JavaScript this является «свободным», его значение вычисляется в момент вызова
// метода и не зависит от того, где этот метод был объявлен,
// а зависит от того, какой объект вызывает метод (какой объект стоит «перед точкой»).

// У стрелочных функций нет «this»
// let user = {
//   userName: "Serhii",
//   sayHi() {
//     let arrow = () => {alert(this.userName)}
//     arrow()
//   }
// };
//
// user.sayHi();

// Функции, которые находятся в объекте в качестве его свойств, называются «методами».

// Преобразование объектов в примитивы
// toPrimitive
// toString
// valueOf

// Существует всего 3 типа преобразований (хинтов):
//
// "string" (для alert и других операций, которым нужна строка)
// "number" (для математических операций)
// "default" (для некоторых операций)

// На практике довольно часто достаточно реализовать только obj.toString()
// как «универсальный» метод для всех типов преобразований,
// возвращающий «читаемое» представление объекта, достаточное для логирования или отладки.


// Введение: колбэки
// калбек это функция, которая передается в качестве аргумента другой функции,
// и выполняется только после выполнения действий первого аргумента.


// rest и spread
// Когда мы видим "..." в коде, это могут быть как остаточные параметры, так и оператор расширения.
// Как отличить их друг от друга:
// Если ... располагается в конце списка аргументов функции, то это «остаточные параметры». Он собирает остальные неуказанные аргументы и делает из них массив.
// Если ... встретился в вызове функции или где-либо ещё, то это «оператор расширения». Он извлекает элементы из массива.
// Полезно запомнить:
// Остаточные параметры используются, чтобы создавать новые функции с неопределённым числом аргументов.
// С помощью оператора расширения можно вставить массив в функцию, которая по умолчанию работает с обычным списком аргументов.


// Формат JSON, метод toJSON

// JavaScript предоставляет методы:
// JSON.stringify для преобразования объектов в JSON.
// JSON.parse для преобразования JSON обратно в объект.

// let student = {
//   name: 'John',
//   age: 30,
//   isAdmin: false,
//   courses: ['html', 'css', 'js'],
//   wife: null
// };

// JSON.stringify(student);

// let json = JSON.stringify(value[, replacer, space]);

// value - Значение для кодирования.
// replacer - Массив свойств для кодирования или функция соответствия function(key, value).
// space - Дополнительное пространство (отступы), используемое для форматирования.

// JSON.parse
// let value = JSON.parse(str, [reviver]);
// str - JSON для преобразования в объект.
// reviver - Необязательная функция, которая будет вызываться для каждой пары (ключ, значение)
// и может преобразовывать значение.












// Повторяем стрелочные функции

// Стрелочные функции:
// Не имеют this.
// Не имеют arguments.
// Не могут быть вызваны с new.
// У них также нет super

// function defer(f, ms) {
//   return function () {
//     setTimeout(() => f.apply(this, arguments), ms)
//   }
// }
//
// function sayHi(who) {
//   alert('Hello, ' + who)
// };
//
// let sayHiDeferred = defer(sayHi, 2000);
//
// sayHiDeferred("John");

// Замыкание
// Вложенные функции
// function User(name) {
//   this.sayHi = function () {
//     console.log(name);
//   }
// }
//
// let user = new User('Serhii')
// user.sayHi()

// function makeCounter() {
//   let counter = 0;
//
//   return function () {
//     return counter++
//   }
// }
//
// let count = new makeCounter();
//
// console.log(count());
// console.log(count());
// console.log(count());

// Замыкание
// «что такое замыкание?», – это функция, которая запоминает свои внешние переменные и может получить к ним доступ
// и все функции в JavaScript являются замыканиями,
// ехнических деталях: свойстве [[Environment]] и о том, как работает лексическое окружение.

// Сумма с помощью замыканий

// function sum(a) {
//   return function (b) {
//     return a + b;
//   }
// }
// console.log(sum(2)(3));


// function inBetween(a, b) {
//   return function (x) {
//     return x >= a && x <= b;
//   }
// }
// function inArray(arr) {
//   return function (x) {
//     return arr.includes(x)
//   }
// }
// let arr = [1, 2, 3, 4, 5, 6, 7];
// console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
// console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2

// Сортировать по полю
// let users = [
//   { name: "John", age: 20, surname: "Johnson" },
//   { name: "Pete", age: 18, surname: "Peterson" },
//   { name: "Ann", age: 19, surname: "Hathaway" }
// ];
//
// function byField(fieldName) {
//   return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
// };
//
// users.sort(byField('name'));
// users.forEach(user => console.log(user.name)); // Ann John Pete
//
// users.sort(byField('age'));
// users.forEach(user => console.log(user.age)); // 18 19 20
























// Декораторы и переадресация вызова, call/apply
// Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. Основная работа по-прежнему выполняется функцией.
//func.call(context, arg1, arg2…) – вызывает func с данным контекстом и аргументами.
// func.apply(context, args) – вызывает func, передавая context как this и псевдомассив args как список аргументов.

// Декоратор-шпион
// function work(a, b) {
//   console.log( a + b ); // произвольная функция или метод
// }
//
// function spy(func) {
//   wrapper.calls = [];
//
//   function wrapper(...args) {
//     wrapper.calls.push(args);
//     func.apply(this, arguments)
//   }
//
//   return wrapper;
// };
//
// work = spy(work);
//
// work(1, 2); // 3
// work(4, 5); // 9
//
// for (let args of work.calls) {
//   console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
// }

// Задерживающий декоратор
// function f(x) {
//   console.log(x);
// }
//
// function delay(func, ms){
//   return function () {
//     setTimeout(() => func.apply(this, arguments), ms)
//   }
// }
//
// // создаём обёртки
// let f1000 = delay(f, 1000);
// let f1500 = delay(f, 1500);
//
// f1000("test"); // показывает "test" после 1000 мс
// f1500("test2"); // показывает "test" после 1500 мс

// Декоратор debounce

// let f = debounce(alert, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован
//
// setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout( () => f(4), 1100); // выполняется
// setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// function debounce(f, ms) {
//   let isCooldown = false;
//   return function() {
//     if (isCooldown) return;
//     f.apply(this, arguments);
//     isCooldown = true;
//     setTimeout(() => isCooldown = false, ms);
//   };
// }

// Куки, document.cookie



// Копирование объектов и ссылки
// Когда переменная объекта копируется – копируется ссылка, сам же объект не дублируется.

// Мы можем использовать любую из переменных для доступа к ящику и изменения его содержимого:
// let user = { name: 'Иван' };
// let admin = user;
// admin.name = 'Петя'; // изменено по ссылке из переменной "admin"
// alert(user.name); // 'Петя', изменения видны по ссылке из переменной "user"

// Сравнение по ссылке
// Операторы равенства == и строгого равенства === для объектов работают одинаково.
// Два объекта равны только в том случае, если это один и тот же объект.
// let a = {};
// let b = a; // копирование по ссылке
//
// alert( a == b ); // true, т.к. обе переменные ссылаются на один и тот же объект
// alert( a === b ); // true


// FETCH
// «AJAX» (аббревиатура от Asynchronous JavaScript And XML)
// let promise = fetch(url, [options])
// Процесс получения ответа обычно происходит в два этапа.
// Во-первых, promise выполняется с объектом встроенного класса Response в качестве
// результата, как только сервер пришлёт заголовки ответа.
// let response = await fetch(url);
//
// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//                    // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }

// Response предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:
//
// response.text() – читает ответ и возвращает как обычный текст,
// response.json() – декодирует ответ в формате JSON,
// response.formData() – возвращает ответ как объект FormData
// response.blob() – возвращает объект как Blob (бинарные данные с типом),
// response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),
// помимо этого, response.body – это объект ReadableStream,
// с помощью которого можно считывать тело запроса по частям.

// (async () => {
//   let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
//   let response = await fetch(url);
//   let commits = await response.json();
//
//   alert(commits[0].author.login);
// })()
// То же самое без await, с использованием промисов:
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// fetch(url)
//     .then(response => response.json())
//     .then(commits => alert(commits[0].author.login))
// Для получения ответа в виде текста используем await response.text() вместо .json():
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// let response = await fetch(url);
// let text = await response.text();
//
// alert(text.slice(0, 80) + "...");

// Заголовки ответа
// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
//
// for (let [key, value] of response.headers) {
//   alert(`${key} of ${value}`)
// }

// POST-запросы
// fetch параметры:
// method – HTTP метод, например POST,
// body – тело запроса, одно из списка:
// строка (например, в формате JSON),
// объект FormData для отправки данных как form/multipart,
// Blob/BufferSource для отправки бинарных данных

// Чаще всего используется JSON.
// let user = {
//   name: 'John',
//   surname: "Kandyba"
// };
//
// let response = await fetch('/article/fetch/post/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });
//
// let result = await response.json();

// Итого
// Типичный запрос с помощью fetch состоит из двух операторов await:
// let response = await fetch(url, options); // завершается с заголовками ответа
// let result = await response.json(); // читать тело ответа в формате JSON

// response.status – HTTP-код ответа,
// response.ok – true, если статус ответа в диапазоне 200-299.
// response.headers – похожий на Map объект с HTTP-заголовками.

// async getUsers(names) {
//   let jobs;
//
//   for (let name of names) {
//     let job = fetch(`https://api.github.com/users/${name}`).then(
//       successResponse => {
//         if (!successResponse.ok) {
//           return null;
//         } else {
//           return successResponse.json();
//         }
//       },
//       failResponse => {
//         return null;
//       }
//     );
//     jobs.push(job)
//   }
//
//   let result = await Promise.all(jobs);
//
//   return result;
// }

// Fetch: прерывание запроса
// Он имеет единственный метод abort() и единственное свойство signal.
// При вызове abort():
// генерируется событие с именем abort на объекте controller.signal
// свойство controller.signal.aborted становится равным true.

// прервать через 1 секунду
// let controller = new AbortController();
// setTimeout(() => controller.abort(), 1000);
//
// try {
//   let response = await fetch('/article/fetch-abort/demo/hang', {
//     signal: controller.signal
//   });
// } catch(err) {
//   if (err.name == 'AbortError') { // обработать ошибку от вызова abort()
//     alert("Прервано!");
//   } else {
//     throw err;
//   }
// }

// Fetch: запросы на другие сайты
// Эта политика называется «CORS»: Cross-Origin Resource Sharing («совместное использование ресурсов между разными источниками»).



// Объекты URL
// href это полный URL-адрес, то же самое, что url.toString()
// protocol – протокол, заканчивается символом двоеточия :
// search строка параметров, начинается с вопросительного знака ?
// hash начинается с символа #
//
// есть свойство url.searchParams – объект типа URLSearchParams.
// Он предоставляет удобные методы для работы с параметрами:
// append(name, value) – добавить параметр по имени,
// delete(name) – удалить параметр по имени,
// get(name) – получить параметр по имени,
// getAll(name) – получить все параметры с одинаковым именем name (такое возможно, например: ?user=John&user=Pete),
// has(name) – проверить наличие параметра по имени,
// set(name, value) – задать/заменить параметр,
// sort() – отсортировать параметры по имени, используется редко,

// let url = new URL('https://google.com/search');
// url.searchParams.set('q', 'test me!'); // добавим параметр, содержащий пробел и !
// alert(url); // https://google.com/search?q=test+me%21
//
// url.searchParams.set('tbs', 'qdr:y'); // параметр с двоеточием :
//
// // параметры автоматически кодируются
// alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay
//
// // перебрать параметры (в исходном виде)
// for(let [name, value] of url.searchParams) {
//   alert(`${name}=${value}`); // q=test me!, далее tbs=qdr:y
// }

// Кодирование в строках

// encodeURI – кодирует URL-адрес целиком.
// decodeURI – декодирует URL-адрес целиком.
// encodeURIComponent – кодирует компонент URL, например, параметр, хеш, имя пути и т.п.
// decodeURIComponent – декодирует компонент URL.

// let music = encodeURIComponent('Rock&Roll');
// let url = `https://google.com/search?q=${music}`;
// alert(url); // https://google.com/search?q=Rock%26Roll

// WebSocket
// let socket = new WebSocket("ws://javascript.info");
// Как только объект WebSocket создан, мы должны слушать его события. Их всего 4:
// open – соединение установлено,
// message – получены данные,
// error – ошибка,
// close – соединение закрыто.
// Если сервер согласен переключиться на WebSocket, то он должен отправить в ответ код 101

// Методы:
// socket.send(data),
// socket.close([code], [reason]).

// Ограничение скорости
// Свойство socket.bufferedAmount хранит количество байт буферизованных данных на текущий момент, ожидающих отправки по сети.
// setInterval(() => {
//   if (socket.bufferedAmount == 0) {
//   socket.send(moreData());
// }
// }, 100);

// Server Sent Events
// WebSocket                           EventSource
// Двунаправленность:
// и сервер,
// и клиент могут обмениваться
// сообщениями                         Однонаправленность: данные посылает только сервер
// Бинарные и текстовые данные         Только текст
// Протокол WebSocket                  Обычный HTTP

// EventSource не настолько мощный способ коммуникации с сервером, как WebSocket.
// Основная причина: он проще. Многим приложениям не требуется вся мощь WebSocket.



// document.cookie

// document.cookie предоставляет доступ к куки

// операция записи изменяет только то куки, которое было указано.
// имя и значение куки должны быть закодированы.
// одно куки вмещает до 4kb данных, разрешается более 20 куки на сайт (зависит от браузера).
// Настройки куки:
//
// path=/, по умолчанию устанавливается текущий путь, делает куки видимым только по указанному пути и ниже.
// domain=site.com, по умолчанию куки видно только на текущем домене, если явно указан домен, то куки видно и на поддоменах.
// expires или max-age устанавливает дату истечения срока действия, без них куки умрёт при закрытии браузера.
// secure делает куки доступным только при использовании HTTPS.
// samesite запрещает браузеру отправлять куки с запросами, поступающими извне, помогает предотвратить XSRF-атаки.


// Map и Set

// let recipeMap = new Map([
//   ["огурец", 500],
//   ["помидор", 350],
//   ["лук",    50]
// ]);
//
// // перебор по ключам (овощи)
// for (let vegetable of recipeMap.keys()) {
//   alert(vegetable); // огурец, помидор, лук
// }
//
// // перебор по значениям (числа)
// for (let amount of recipeMap.values()) {
//   alert(amount); // 500, 350, 50
// }

// Map имеет встроенный метод forEach

// Object.entries: Map из Object
// let obj = {
//   name: "John",
//   age: 30
// };
//
// let map = new Map(Object.entries(obj));

// Object.fromEntries: Object из Map


// Set – коллекция уникальных значений, так называемое «множество».

// let user = {
//   name: "John",
//   age: 30
// };

// Object.keys(user) = ["name", "age"]
// Object.values(user) = ["John", 30]
// Object.entries(user) = [ ["name","John"], ["age",30] ]

// Используем Object.fromEntries(array) на результате, чтобы преобразовать его обратно в объект

// let prices = {
//   banana: 1,
//   orange: 2,
//   meat: 4,
// };
//
// let doublePrices = Object.fromEntries(
//   // преобразовать в массив, затем map, затем fromEntries обратно объект
//   Object.entries(prices).map(([key, value]) => [key, value * 2])
// );
//
// alert(doublePrices.meat); // 8



// ___________________________

// Свойства - геттеры и сеттеры

// Геттеры и сеттеры
// let user = {
//   name: "John",
//   surname: "Smith",
//
//   get fullName() {
//     return `${this.name} ${this.surname}`;
//   },
//
//   set fullName(value) {
//     [this.name, this.surname] = value.split(" ");
//   }
// };
//
// // set fullName запустится с данным значением
// user.fullName = "Alice Cooper";
//
// alert(user.name); // Alice
// alert(user.surname); // Cooper


// ++++++++++++++++++++++++++++++++++++++++++++++


// Прототипное наследование
// Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
// let animal = {
//   eats: true
// };
// let rabbit = {
//   jumps: true,
//   // __proto__: animal
// };
//
// rabbit.__proto__ = animal;
//
// // теперь мы можем найти оба свойства в rabbit:
// alert( rabbit.eats ); // true (**)
// alert( rabbit.jumps ); // true

// let user = {
//   name: "John",
//   surname: "Smith",
//   set fullName(value) {
//     [this.name, this.surname] = value.split(" ");
//   },
//   get fullName(){
//     return `${this.name} ${this.surname}`;
//   }
// };
//
// let admin = {
//   __proto__: user,
//   isAdmin: true
// };
//
// console.log(admin.surname);
// admin.fullName = "Alice Cooper";
// console.log(admin.surname);

// Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного
// метода obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное, не унаследованное, свойство с именем key.

// когда вызывается obj.toString(), метод берётся из Object.prototype

// Проверка класса: "instanceof"
// Оператор instanceof позволяет проверить, к какому классу принадлежит объект, с учётом наследования

// Итого
// В JavaScript все объекты имеют скрытое свойство [[Prototype]], которое является либо другим объектом, либо null.
// Мы можем использовать obj.__proto__ для доступа к нему (исторически обусловленный геттер/сеттер, есть другие способы, которые скоро будут рассмотрены).
// Объект, на который ссылается [[Prototype]], называется «прототипом».
// Если мы хотим прочитать свойство obj или вызвать метод, которого не существует у obj, тогда JavaScript попытается найти его в прототипе.
// Операции записи/удаления работают непосредственно с объектом, они не используют прототип (если это обычное свойство, а не сеттер).
// Если мы вызываем obj.method(), а метод при этом взят из прототипа, то this всё равно ссылается на obj. Таким образом, методы всегда работают с текущим объектом, даже если они наследуются.
// Цикл for..in перебирает как свои, так и унаследованные свойства. Остальные методы получения ключей/значений работают только с собственными свойствами объекта.



// Async/await
// У слова async один простой смысл: эта функция всегда возвращает промис
// async function f() {
//   let promise = new Promise((resolve, reject()) => {
//     setTimeout(() => resolve("Done!"), 1000);
//   });
//
//   let result = await promise;
//
//   return result;
// }
//
// f();

// Пока промис не выполнится, JS-движок может заниматься другими задачами: выполнять прочие скрипты, обрабатывать
// события и т.п.

// async function showAvatar() {
//   // запрашиваем JSON с данными пользователя
//   let response = await fetch('/article/promise-chaining/user.json');
//   let user = await response.json();
//
//   // запрашиваем информацию об этом пользователе из github
//   let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
//   let githubUser = await githubResponse.json();
//
//   // отображаем аватар пользователя
//   let img = document.createElement('img');
//   img.src = githubUser.avatar_url;
//   img.className = "promise-avatar-example";
//   document.body.append(img);
//
//   // ждём 3 секунды и затем скрываем аватар
//   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
//
//   img.remove();
//
//   return githubUser;
// }
//
// showAvatar();

// Асинхронные методы классов
// class Waiter {
//   async wait() {
//     return await Promise.resolve(1);
//   }
// }
// new Waiter().wait().then(alert);

// Обработка ошибок

// async function f() {
//   await Promise.reject(new Error("Упс!"))ж
// };
// Делает то же самое, что и такой:

// async function f1() {
//   throw new Error("Упс!");
// }

// try ... catch
// async function f() {
//   try {
//     let response = await fetch('/no-user-here');
//     let user = await response.json();
//   } catch(err) {
//     // перехватит любую ошибку в блоке try: и в fetch, и в response.json
//     alert(err);
//   }
// }
// f();

// Если у нас нет try..catch, асинхронная функция будет возвращать завершившийся с ошибкой промис (в состоянии rejected).
// async function f() {
//   let response = await fetch('http://no-such-url');
// }
//
// f().catch(alert);

// async/await отлично работает с Promise.all
// Когда необходимо подождать несколько промисов одновременно, можно обернуть их в Promise.all, и затем await

// async function f() {
//   try {
//     let result = await Promise.all([
//       fetch(url),
//       fetch(url2)
//     ])
//   } catch(err){
//     alert(err)
//   }
// }
// Ключевое слово async перед объявлением функции:
// Обязывает её всегда возвращать промис.
// Позволяет использовать await в теле этой функции.

// Ключевое слово await перед промисом заставит JavaScript дождаться его выполнения, после чего:
// Если промис завершается с ошибкой, будет сгенерировано исключение, как если бы на этом месте находилось throw.
// Иначе вернётся результат промиса.

// async function wait() {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//
//   return 10;
// }
//
// function f() {
//   wait().then(result => alert(result));
// }


 // Задачі на співбесіді

function digital_root(n) {
  let str = String(n);
  let newArr = str.split('');

  let result =  newArr.reduce((a, b) => {
    return Number(a) + Number(b)
  });

  return result;
}

console.log(digital_root(16));
console.log(digital_root(456));
// digital_root(456);



function checkBrakets(str) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let bracket = str[i];
    if ( bracket === '(' ) {
      stack.push(bracket);
    } else {
      let lasEl = stack.pop();
      if ( !lasEl ) {
        return false;
      }
    }
  }
  if ( !stack.length ) return false;
  return true;
}

checkBrakets('(((()))');

function checkBrakets(str) {
  let stack = [];
  let obj = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  for (let i = 0; i < str.length; i++) {
    let bracket = str[i];
    if ( bracket === '(' || bracket === '{' || bracket === '[' ) {
      stack.push(bracket);
    } else {
      let lasEl = stack.pop();
      if ( bracket !== obj[lasEl] ) {
        return false;
      }
    }
  }
  if ( !stack.length ) return false;
  return true;
}

checkBrakets('(((()))');










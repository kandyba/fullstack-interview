// Типи даних. Є вісім основних типів даних у JavaScript.

// У JavaScript є 8 основних типів:
// bigint для цілих чисел довільної довжини.
// string для рядків. Рядок може містити нуль або більше символів, окремого типу для символів немає.
// boolean для true/false.
// null для невідомих значень – окремий тип, що має одне значення null.
// undefined для неприсвоєних значень – окремий тип, що має одне значення undefined.
// object для складніших структур даних.
// symbol для унікальних ідентифікаторів.
// Оператор typeof дозволяє побачити, який тип даних збережено у змінній.

// Має дві форми: typeof x або typeof(x).
// Повертає рядок із назвою типу. Наприклад, "string".
// Для null повертається "object" – це помилка в мові, насправді це не об'єкт.

// Числове перетворення

// Значення        Перетворюється на…
// – undefined       NaN
// null             0
// true / false     1 / 0
// Якщо залишається порожній рядок, отримуємо 0, інакше з непорожнього рядка "зчитується" число. При помилці результат NaN.

// Логічне перетворення
// Значення                      Стає…
// – 0, null, undefined, NaN, ""    false
// – будь-яке інше значення          true

// Умовне розгалуження: if, '?'
// let result = умова ? значення1 : значення2;

// Логічні оператори
// || (АБО), && (І) і ! (НЕ).
// let currentUser = null;
// let defaultUser = "John";
// let name = currentUser || defaultUser || "unnamed";
// alert(name); // вибирається "John" – перше істинне значення

// Оператор об'єднання з null '??'
// result = (a !== null && a !== undefined) ? a : b;

// Конструкція "switch"

// switch (5) {
//   case 2:
//     'clsdc,ls;dc'
//   case 3:
//     "sdc,sdcdc"
//   case 5:
//     "dqwdqwdqwdqwdqwd"
// }

// Об'єкти
// Об'єкти використовуються для зберігання колекцій різних значень і складніших сутностей.
// ключ: значення
// де ключ – це рядок (також називається "іменем властивості"), а значення може бути будь-чим.

// let user = new Object(); // синтаксис "конструктор об'єкта"
// let user = {};  // синтаксис "літерал об'єкта"
// Для звернення до властивостей використовується запис через крапку:
// user.age
// delete user.age;

// Клонування і об'єднання об'єктів, Object.assign

// Копіювання об'єктів і посилання
// Коли змінна об'єкта копіюється – копіюється посилання, сам об'єкт не дублюється.

// Ми можемо використовувати будь-яку зі змінних для доступу до об'єкта і зміни його вмісту:
// let user = { name: 'Іван' };
// let admin = user;
// admin.name = 'Петро'; // змінено за посиланням із змінної "admin"
// alert(user.name); // 'Петро', зміни видимі за посиланням із змінної "user"

// Порівняння за посиланням
// Оператори рівності == і суворої рівності === для об'єктів працюють однаково.
// Два об'єкти рівні тільки в тому випадку, якщо це один і той самий об'єкт.
// let a = {};
// let b = a; // копіювання за посиланням
//
// alert(a == b); // true, оскільки обидві змінні посилаються на один і той самий об'єкт
// alert(a === b); // true

// var myArray = ['a', 'b', 'c', 'd'];
//
// myArray.push('end');
// myArray.unshift('start');
//
// myArray = ['start', ...myArray, 'end'];
//
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
//
//
// const object = new Person('Serhii', 32);
// console.log(object);

// class Person {
// 	constructor(name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// }
//
// const object = new Person('Serhii', 32);
// console.log(object);
//
// function sayHi(phrase) {
// 	alert(this.name + phrase);
// }
//
// const user = {name: 'User'};
// user.call(user, 'Hello');


// XMLHttpRequest
// XMLHttpRequest – це вбудований в браузер об'єкт,
//                  який дає можливість робити HTTP-запити до сервера без перезавантаження сторінки.
// На сьогоднішній день не обов'язково використовувати XMLHttpRequest, тому що існує сучасніший метод – fetch.
// XMLHttpRequest має два режими роботи: синхронний та асинхронний.

// Розглянемо асинхронний
// Щоб зробити запит, потрібно виконати три кроки:
// 1 Створити XMLHttpRequest.
// let xhr = new XMLHttpRequest();
// 2 Ініціалізувати його
// xhr.open(method, URL, [async, user, password])
// method – HTTP-метод. Зазвичай це "GET" або "POST".
// URL – URL, куди відправляється запит: рядок або об'єкт URL.
// async – якщо вказати false, тоді запит буде виконано синхронно, це ми розглянемо трохи пізніше.
// user, password – логін і пароль для базової HTTP-авторизації (якщо потрібно).
// виклик open, всупереч своїй назві, не відкриває з'єднання. Він лише налаштовує запит.
// 3 Відправити запит.
// xhr.send([body])

// Слухати події на xhr, щоб отримати відповідь.
// Три найбільш використовувані події:
// load – відбувається, коли отримано якусь відповідь, включаючи відповіді з HTTP-помилкою, наприклад 404.
// error – коли запит не може бути виконаний, наприклад, немає з'єднання або невалідний URL.
// progress – періодично відбувається під час завантаження відповіді, повідомляє про прогрес.

// // 1. Створюємо новий XMLHttpRequest-об'єкт
// let xhr = new XMLHttpRequest();
//
// // 2. Налаштовуємо його: GET-запит за URL /article/.../load
// xhr.open('GET', '/article/xmlhttprequest/example/load');
//
// // 3. Відправляємо запит
// xhr.send();
//
// // 4. Цей код спрацює після отримання відповіді від сервера
// xhr.onload = function() {
//   if (xhr.status != 200) { // аналізуємо HTTP-статус відповіді, якщо статус не 200, то сталася помилка
//     alert(`Помилка ${xhr.status}: ${xhr.statusText}`); // Наприклад, 404: Not Found
//   } else { // якщо все пройшло гладко, виводимо результат
//     alert(`Готово, отримано ${xhr.response.length} байт`); // response – це відповідь сервера
//   }
// };
//
// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     alert(`Отримано ${event.loaded} із ${event.total} байт`);
//   } else {
//     alert(`Отримано ${event.loaded} байт`); // якщо у відповіді немає заголовка Content-Length
//   }
//
// };
//
// xhr.onerror = function() {
//   alert("Запит не вдався");
// };

// <form name="person">
//     <input name="name" value="Петро">
//     <input name="surname" value="Васечкін">
// </form>
//
// <script>
// // заповнимо FormData даними з форми
// let formData = new FormData(document.forms.person);
//
// // додамо ще одне поле
// formData.append("middle", "Іванович");
//
// let xhr = new XMLHttpRequest();
//
// let json = JSON.stringify({
//   name: "Вася",
//   surname: "Петров"
// });
//
// xhr.open("POST", '/submit')
// xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//
// xhr.send(json);

/// loadstart – початок запиту.
// progress – надійшла частина даних відповіді, тіло відповіді на даний момент можна отримати зі властивості responseText.
// abort – запит був перерваний викликом xhr.abort().
// error – сталася помилка з'єднання, наприклад неправильне доменне ім'я. Подія не генерується для HTTP-помилок, як наприклад 404.
// load – запит успішно завершений.
// timeout – запит було скасовано через закінчення часу (відбувається, тільки якщо було встановлено тайм-аут).
// loadend – спрацьовує після load, error, timeout або abort.


// FETCH
// «AJAX» (абревіатура від Asynchronous JavaScript And XML)
// let promise = fetch(url, [options])
// Процес отримання відповіді зазвичай відбувається в два етапи.
// По-перше, promise виконується з об'єктом вбудованого класу Response як результат,
// як тільки сервер надішле заголовки відповіді.
// let response = await fetch(url);
//
// if (response.ok) { // якщо HTTP-статус у діапазоні 200-299
//                    // отримуємо тіло відповіді (див. про цей метод нижче)
//   let json = await response.json();
// } else {
//   alert("Помилка HTTP: " + response.status);
// }

// Response надає кілька методів, заснованих на promise, для доступу до тіла відповіді у різних форматах:
//
// response.text() – читає відповідь і повертає як звичайний текст,
// response.json() – декодує відповідь у форматі JSON,
// response.formData() – повертає відповідь як об'єкт FormData,
// response.blob() – повертає об'єкт як Blob (бінарні дані з типом),
// response.arrayBuffer() – повертає відповідь як ArrayBuffer (низькорівневе представлення бінарних даних),
// крім того, response.body – це об'єкт ReadableStream,
// за допомогою якого можна зчитувати тіло запиту частинами.

// (async () => {
//   let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
//   let response = await fetch(url);
//   let commits = await response.json();
//
//   alert(commits[0].author.login);
// })()
// Те саме без await, з використанням промісів:
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// fetch(url)
//     .then(response => response.json())
//     .then(commits => alert(commits[0].author.login))
// Для отримання відповіді у вигляді тексту використовуємо await response.text() замість .json():
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// let response = await fetch(url);
// let text = await response.text();
//
// alert(text.slice(0, 80) + "...");

// Заголовки відповіді
// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
//
// for (let [key, value] of response.headers) {
//   alert(`${key} of ${value}`)
// }

// POST-запити
// fetch параметри:
// method – HTTP метод, наприклад POST,
// body – тіло запиту, одне з переліку:
// рядок (наприклад, у форматі JSON),
// об'єкт FormData для надсилання даних як form/multipart,
// Blob/BufferSource для надсилання бінарних даних

// Найчастіше використовується JSON.
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

// Підсумок
// Типовий запит за допомогою fetch складається з двох операторів await:
// let response = await fetch(url, options); // завершується із заголовками відповіді
// let result = await response.json(); // читаємо тіло відповіді у форматі JSON

// response.status – HTTP-код відповіді,
// response.ok – true, якщо статус відповіді у діапазоні 200-299.
// response.headers – схожий на Map об'єкт з HTTP-заголовками.

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


// Fetch: переривання запиту
// Він має єдиний метод abort() і єдину властивість signal.
// При виклику abort():
// генерується подія з ім'ям abort на об'єкті controller.signal
// властивість controller.signal.aborted стає рівною true.

// перервати через 1 секунду
// let controller = new AbortController();
// setTimeout(() => controller.abort(), 1000);
//
// try {
//   let response = await fetch('/article/fetch-abort/demo/hang', {
//     signal: controller.signal
//   });
// } catch(err) {
//   if (err.name == 'AbortError') { // обробити помилку від виклику abort()
//     alert("Перервано!");
//   } else {
//     throw err;
//   }
// }

// Fetch: запити на інші сайти
// Ця політика називається «CORS»: Cross-Origin Resource Sharing («спільне використання ресурсів між різними джерелами»).

// Об'єкти URL
// href – це повна URL-адреса, те саме, що й url.toString()
// protocol – протокол, закінчується символом двокрапки :
// search – рядок параметрів, починається зі знака питання ?
// hash – починається з символу #
//
// є властивість url.searchParams – об'єкт типу URLSearchParams.
// Він надає зручні методи для роботи з параметрами:
// append(name, value) – додати параметр за іменем,
// delete(name) – видалити параметр за іменем,
// get(name) – отримати параметр за іменем,
// getAll(name) – отримати всі параметри з однаковим ім'ям name (це можливо, наприклад: ?user=John&user=Pete),
// has(name) – перевірити наявність параметра за іменем,
// set(name, value) – задати/замінити параметр,
// sort() – відсортувати параметри за іменем, використовується рідко,

// let url = new URL('https://google.com/search');
// url.searchParams.set('q', 'test me!'); // додамо параметр, що містить пробіл і !
// alert(url); // https://google.com/search?q=test+me%21
//
// url.searchParams.set('tbs', 'qdr:y'); // параметр із двокрапкою :
//
// // параметри автоматично кодуються
// alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay
//
// // перебрати параметри (в оригінальному вигляді)
// for(let [name, value] of url.searchParams) {
//   alert(`${name}=${value}`); // q=test me!, далі tbs=qdr:y
// }

// Кодування в рядках

// encodeURI – кодує URL-адресу цілком.
// decodeURI – декодує URL-адресу цілком.
// encodeURIComponent – кодує компонент URL, наприклад, параметр, хеш, ім'я шляху тощо.
// decodeURIComponent – декодує компонент URL.

// let music = encodeURIComponent('Rock&Roll');
// let url = `https://google.com/search?q=${music}`;
// alert(url); // https://google.com/search?q=Rock%26Roll

// WebSocket
// let socket = new WebSocket("ws://javascript.info");
// Як тільки об'єкт WebSocket створений, ми повинні слухати його події. Їх всього 4:
// open – з'єднання встановлено,
// message – отримано дані,
// error – помилка,
// close – з'єднання закрито.
// Якщо сервер погоджується перейти на WebSocket, він повинен надіслати у відповідь код 101

// Методи:
// socket.send(data),
// socket.close([code], [reason]).

// Обмеження швидкості
// Властивість socket.bufferedAmount зберігає кількість байт буферизованих даних на цей момент, що очікують відправлення по мережі.
// setInterval(() => {
//   if (socket.bufferedAmount == 0) {
//   socket.send(moreData());
// }
// }, 100);

// Server Sent Events
// WebSocket                           EventSource
// Двонаправленість:
// і сервер,
// і клієнт можуть обмінюватися
// повідомленнями                         Односпрямованість: дані надсилає тільки сервер
// Бінарні й текстові дані                Тільки текст
// Протокол WebSocket                     Звичайний HTTP

// EventSource – не такий потужний спосіб комунікації з сервером, як WebSocket.
// Основна причина: він простіший. Багатьом застосункам не потрібна вся потужність WebSocket.


// document.cookie

// document.cookie надає доступ до куки

// операція запису змінює тільки те куки, яке було вказане.
// ім'я та значення куки повинні бути закодовані.
// одне куки вміщує до 4kb даних, дозволяється більше 20 куки на сайт (залежить від браузера).
// Налаштування куки:
//
// path=/, за замовчуванням встановлюється поточний шлях, робить куки видимим тільки за вказаним шляхом і нижче.
// domain=site.com, за замовчуванням куки видно тільки на поточному домені, якщо явно вказано домен, то куки видно і на піддоменах.
// expires або max-age встановлює дату закінчення терміну дії, без них куки припиняє існування після закриття браузера.
// secure робить куки доступним тільки при використанні HTTPS.
// samesite забороняє браузеру надсилати куки із запитами, що надходять ззовні, допомагає запобігти XSRF-атакам.



// Async/await
// У слова async одне просте значення: ця функція завжди повертає проміс
// async function f() {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Готово!"), 1000);
//   });
//
//   let result = await promise;
//
//   return result;
// }
//
// f();

// Поки проміс не виконається, JS-движок може займатися іншими задачами: виконувати інші скрипти, обробляти
// події тощо.

// async function showAvatar() {
//   // запитуємо JSON з даними користувача
//   let response = await fetch('/article/promise-chaining/user.json');
//   let user = await response.json();
//
//   // запитуємо інформацію про цього користувача з github
//   let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
//   let githubUser = await githubResponse.json();
//
//   // відображаємо аватар користувача
//   let img = document.createElement('img');
//   img.src = githubUser.avatar_url;
//   img.className = "promise-avatar-example";
//   document.body.append(img);
//
//   // чекаємо 3 секунди і потім ховаємо аватар
//   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
//
//   img.remove();
//
//   return githubUser;
// }
//
// showAvatar();

// Асинхронні методи класів
// class Waiter {
//   async wait() {
//     return await Promise.resolve(1);
//   }
// }
// new Waiter().wait().then(alert);

// Обробка помилок

// async function f() {
//   await Promise.reject(new Error("Ой!"));
// };
// Робить те саме, що і таке:

// async function f1() {
//   throw new Error("Ой!");
// }

// try ... catch
// async function f() {
//   try {
//     let response = await fetch('/no-user-here');
//     let user = await response.json();
//   } catch(err) {
//     // перехопить будь-яку помилку в блоці try: як у fetch, так і в response.json
//     alert(err);
//   }
// }
// f();

// Якщо у нас немає try..catch, асинхронна функція буде повертати завершений з помилкою проміс (у стані rejected).
// async function f() {
//   let response = await fetch('http://no-such-url');
// }
//
// f().catch(alert);

// async/await чудово працює з Promise.all
// Коли необхідно зачекати на кілька промісів одночасно, можна обернути їх у Promise.all, а потім await

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
// Ключове слово async перед оголошенням функції:
// Зобов'язує її завжди повертати проміс.
// Дозволяє використовувати await у тілі цієї функції.


// Ключове слово await перед промісом змусить JavaScript дочекатися його виконання, після чого:
// Якщо проміс завершується з помилкою, буде згенеровано виняток, ніби на цьому місці знаходився throw.
// Інакше повернеться результат промісу.

// async function wait() {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//
//   return 10;
// }
//
// function f() {
//   wait().then(result => alert(result));
// }

// Типи даних. Є вісім основних типів даних у JavaScript.

// У JavaScript є 8 основних типів.
// bigint для цілих чисел довільної довжини.
// string для рядків. Рядок може містити нуль або більше символів, немає окремого типу для символів.
// boolean для true/false.
// null для невідомих значень – окремий тип, що має одне значення null.
// undefined для неприсвоєних значень – окремий тип, що має одне значення undefined.
// object для складніших структур даних.
// symbol для унікальних ідентифікаторів.
// Оператор typeof дозволяє нам побачити, який тип даних збережено в змінній.
//
// Має дві форми: typeof x або typeof(x).
// Повертає рядок із назвою типу. Наприклад, "string".
// Для null повертається "object" – це помилка в мові, насправді це не об'єкт.


// Числове перетворення

// Значення         Перетворюється в…
// undefined        NaN
// null             0
// true / false     1 / 0
// Далі, якщо залишається порожній рядок, то отримаємо 0, інакше з непорожнього рядка «зчитується» число. При помилці результат NaN.

// Логічне перетворення
// Значення	                      Стає…
// 0, null, undefined, NaN, ""    false
// будь-яке інше значення          true


// Умовне розгалуження: if, '?'
// let result = умова ? значення1 : значення2;

// Логічні оператори
// || (АБО), && (І) і ! (НЕ).
// let currentUser = null;
// let defaultUser = "John";
// let name = currentUser || defaultUser || "unnamed";
// alert( name ); // вибирається "John" – перше істинне значення

// Оператор об'єднання з null '??'
// result = (a !== null && a !== undefined) ? a : b;

// Конструкція "switch"

// switch (5) {
//   case 2:
//     'clsdc,ls;dc'
//   case 3:
//     "sdc,sdcdc"
//   case 5:
//     "dqwdqwdqwdqwdqwd"
// }

// Об'єкти
// Об'єкти використовуються для зберігання колекцій різних значень і складніших сутностей
// ключ: значення
// де ключ – це рядок (також називається «іменем властивості»), а значення може бути будь-яким

// let user = new Object(); // синтаксис "конструктор об'єкта"
// let user = {};  // синтаксис "літерал об'єкта"
// Для звернення до властивостей використовується запис «через крапку»:
// user.age
// delete user.age;

// Клонирование и объединение объектов, Object.assign

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


// XMLHttpRequest
// XMLHttpRequest – это встроенный в браузер объект,
//                  который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.
// На сегодняшний день не обязательно использовать XMLHttpRequest, так как существует другой, более современный метод fetch.
// XMLHttpRequest имеет два режима работы: синхронный и асинхронный.

// Рассмотрим асинхронный
// Чтобы сделать запрос, нам нужно выполнить три шага:
// 1 Создать XMLHttpRequest.
// let xhr = new XMLHttpRequest();
// 2 Инициализировать его
// xhr.open(method, URL, [async, user, password])
// method – HTTP-метод. Обычно это "GET" или "POST".
// URL – URL, куда отправляется запрос: строка, может быть и объект URL.
// async – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
// user, password – логин и пароль для базовой HTTP-авторизации (если требуется).
// вызов open, вопреки своему названию, не открывает соединение. Он лишь конфигурирует запрос
// 3 Послать запрос.
// xhr.send([body])

// Слушать события на xhr, чтобы получить ответ.
// Три наиболее используемых события:
// load – происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.
// error – когда запрос не может быть выполнен, например, нет соединения или невалидный URL.
// progress – происходит периодически во время загрузки ответа, сообщает о прогрессе.

// // 1. Создаём новый XMLHttpRequest-объект
// let xhr = new XMLHttpRequest();
//
// // 2. Настраиваем его: GET-запрос по URL /article/.../load
// xhr.open('GET', '/article/xmlhttprequest/example/load');
//
// // 3. Отсылаем запрос
// xhr.send();
//
// // 4. Этот код сработает после того, как мы получим ответ сервера
// xhr.onload = function() {
//   if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
//     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
//   } else { // если всё прошло гладко, выводим результат
//     alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
//   }
// };
//
// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     alert(`Получено ${event.loaded} из ${event.total} байт`);
//   } else {
//     alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
//   }
//
// };
//
// xhr.onerror = function() {
//   alert("Запрос не удался");
// };

// <form name="person">
//     <input name="name" value="Петя">
//     <input name="surname" value="Васечкин">
//     </form>
//
//     <script>
//     // заполним FormData данными из формы
//     let formData = new FormData(document.forms.person);
//
// // добавим ещё одно поле
// formData.append("middle", "Иванович");
//
// let xhr = new XMLHttpRequest();
//
// let json = JSON.stringify({
//   name: "Вася",
//   surname: "Петров"
// });
//
// xhr.open("POST", '/submit')
// xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//
// xhr.send(json);

// loadstart – начало запроса.
// progress – прибыла часть данных ответа, тело ответа полностью на данный момент можно получить из свойства responseText.
// abort – запрос был прерван вызовом xhr.abort().
// error – произошла ошибка соединения, например неправильное доменное имя. Событие не генерируется для HTTP-ошибок как, например, 404.
// load – запрос успешно завершён.
// timeout – запрос был отменён по причине истечения отведённого для него времени (происходит, только если был установлен таймаут).
// loadend – срабатывает после load, error, timeout или abort.


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

// let schedule = {};
//
// // const isEmpty = obj => Object.keys(obj).length ? false : true
//
// function isEmpty(obj) {
//   for (let key in obj) {
//     return false
//   }
//   return true
// }
//
// alert( isEmpty(schedule) ); // true
//
// schedule["8:30"] = "Вставай";
//
// alert( isEmpty(schedule) ); // false

// let salaries = {
//   John: 100,
//   Ann: 160,
//   Pete: 130
// }
//
// function salarySum(obj) {
//   let sum = 0
//   for (let key in obj) {
//     sum += obj[key]
//   }
//   return sum
// }
// salarySum(salaries)

// function multiplyNumeric(obj) {
//   for (let key in obj) {
//     if (typeof obj[key] === 'number') {
//       obj[key] = obj[key] * 2
//     }
//   }
// }
//
// // до виклику функції
// let menu = {
//   width: 200,
//   height: 300,
//   title: "Моє меню"
// };
//
// multiplyNumeric(menu);
//
// // після виклику функції
// menu = {
//   width: 400,
//   height: 600,
//   title: "Моє меню"
// };

// function ucFirst(str) {
//   return str.slice(0, 1).toUpperCase() + str.slice(1)
// }
//
// ucFirst("василь") == "Василь";

// function slice(str, start, end) {
//   return Array.from(str).slice(start, end).join('')
// }
//
// let str = '𝒳😂%';
//
// console.log(slice(str, 1, 3));

// Задача 1 — порахувати суму замовлень
// Умова:
// Є масив замовлень. Порахуй загальну суму тільки оплачених замовлень.

// const orders = [
//   { id: 1, status: 'paid', total: 100 },
//   { id: 2, status: 'pending', total: 200 },
//   { id: 3, status: 'paid', total: 300 }
// ];
// Expected
// 400

// function calculateOrdersSum(arr) {
//     return arr
//         .filter(o => o.status == 'paid')
//         .reduce((acc, order) => {
//             return acc + order.total
//         }, 0)
// };

// console.log(calculateOrdersSum(orders));

// function unique(arr) {
//     return arr.filter((item, index) => arr.indexOf(item) === index)
// }

return Math.max(...arr)


arr.reduce((max, current) => {
    return max > current ? max : current
}, arr[0])

new Set(arr).size !== arr.length


// Задача 2 — знайти користувачів по ролі
// Умова
// Поверни тільки користувачів з роллю admin.

// const roles = ['admin', 'user'];

// const users = [
//   { id: 1, name: 'Anna', role: 'admin' },
//   { id: 2, name: 'Max', role: 'user' },
//   { id: 3, name: 'John', role: 'admin' }
// ];

// Expected
// [
//   { id: 1, name: 'Anna', role: 'admin' },
//   { id: 3, name: 'John', role: 'admin' }
// ]

// function roleFilter(arr, role) {
//     if (!arr.length) return 'no users';
//     if (!isRoleExists(arr, role)) return 'no such role';

//     return arr.filter(u => u.role === role)
// };

// function isRoleExists(arr, role) {
//     return arr.map(r => r.role).includes(role)
// };

// console.log(roleFilter(users, 'admin'));
// console.log(roleFilter(users, 'user'));
// console.log(roleFilter(users, 'asxasx'));




// Задача 3 — перетворити користувачів для select
// Умова
// Є масив користувачів. Поверни масив опцій для dropdown/select.
// const users = [
//   { id: 1, firstName: 'Anna', lastName: 'Smith' },
//   { id: 2, firstName: 'Max', lastName: 'Brown' }
// ];
// Expected
// [
//   { value: 1, label: 'Anna Smith' },
//   { value: 2, label: 'Max Brown' }
// ]

// function optionsList(arr) {
//     return arr.map(user => ({
//         value: user.id,
//         label: `${user.firstName} ${user.lastName}`
//     }))
// };

// console.log(optionsList(users));






// Задача 4 — порахувати кількість по статусах
// Умова
// Є масив задач. Порахуй, скільки задач у кожному статусі.

// const tasks = [
//   { id: 1, title: 'Task 1', status: 'todo' },
//   { id: 2, title: 'Task 2', status: 'done' },
//   { id: 3, title: 'Task 3', status: 'todo' },
//   { id: 4, title: 'Task 4', status: 'in-progress' }
// ];

// Expected
// {
//   todo: 2,
//   done: 1,
//   'in-progress': 1
// }

// function tasksCounter(arr) {
//     return arr.reduce((acc, task) => {
//         acc[task.status] = (acc[task.status] || 0) + 1;

//         return acc;
//     }, {})
// };

// console.log(tasksCounter(tasks))






// Задача: знайти задачі, які є в бекенді, але відсутні в UI
// Є два великі масиви:

// const backendTasks = [
//   { id: 1, title: 'Login', status: 'done' },
//   { id: 2, title: 'Dashboard', status: 'todo' },
//   { id: 3, title: 'Profile', status: 'in-progress' },
//   { id: 4, title: 'Settings', status: 'todo' },
// ];

// const uiTasks = [
//   { id: 1, title: 'Login', status: 'done' },
//   { id: 3, title: 'Profile', status: 'in-progress' },
// ];

// Потрібно знайти задачі, які є в backendTasks, але яких немає в uiTasks.

// Expected:
// [
//   { id: 2, title: 'Dashboard', status: 'todo' },
//   { id: 4, title: 'Settings', status: 'todo' }
// ]

// function missingFields(backend, ui) {
//     const uiIds = new Set(ui.map(t => t.id));

//     return backend.filter(task => !uiIds.has(task.id))
// };

// console.log(missingFields(backendTasks, uiTasks));





// Ускладнення
// Знайди не тільки відсутні задачі, а ще задачі, у яких змінився статус.

// const backendTasks = [
//   { id: 1, title: 'Login', status: 'done' },
//   { id: 2, title: 'Dashboard', status: 'todo' },
//   { id: 3, title: 'Profile', status: 'in-progress' },
// ];

// const uiTasks = [
//   { id: 1, title: 'Login', status: 'todo' },
//   { id: 2, title: 'Dashboard', status: 'todo' },
//   { id: 3, title: 'Profile', status: 'done' },
// ];

// Expected:
// [
//   {
//     id: 1,
//     title: 'Login',
//     backendStatus: 'done',
//     uiStatus: 'todo'
//   },
//   {
//     id: 3,
//     title: 'Profile',
//     backendStatus: 'in-progress',
//     uiStatus: 'done'
//   }
// ];

// function missingFields(backendTasks, uiTasks) {
//     const uiMap = new Map(uiTasks.map(task => [task.id, task]));

//     const result = [];

//     for (const backendTask of backendTasks) {
//         const uiTask = uiMap.get(backendTask.id);

//         if (!uiTask) continue;

//         if (uiTask.status !== backendTask.status) {
//             result.push({
//                 id: backendTask.id,
//                 title: backendTask.title,
//                 backendStatus: backendTask.status,
//                 uiStatus: uiTask.status
//             })
//         }
//     };

//     return result;
// };

// console.log(missingFields(backendTasks, uiTasks));


// Задача 5 — оновити елемент по id
// Умова

// Є масив користувачів. Онови роль користувача з id = 2 на admin.

// const users = [
//   { id: 1, name: 'Anna', role: 'user' },
//   { id: 2, name: 'Max', role: 'user' }
// ];
// Expected
// [
//   { id: 1, name: 'Anna', role: 'user' },
//   { id: 2, name: 'Max', role: 'admin' }
// ]

// function updateUserRole(users, userId, newRole) {
//     return users.map(user => user.id === userId ? {...user, role: newRole} : user);
// };





// // Задача 6 — згрупувати товари по категорії
// // Умова

// // Є масив товарів. Згрупуй товари по category.

// // const products = [
// //   { id: 1, title: 'Phone', category: 'electronics' },
// //   { id: 2, title: 'Laptop', category: 'electronics' },
// //   { id: 3, title: 'T-shirt', category: 'clothes' }
// // ];
// // Expected
// // {
// //   electronics: [
// //     { id: 1, title: 'Phone', category: 'electronics' },
// //     { id: 2, title: 'Laptop', category: 'electronics' }
// //   ],
// //   clothes: [
// //     { id: 3, title: 'T-shirt', category: 'clothes' }
// //   ]
// // }

// function groupByCategory(products) {
//     return products.reduce((acc, product) => {
//         const category = product.category;

//         if (!acc[category]) {
//             acc[category] = [];
//         }

//         acc[category].push(product);

//         return acc
//     }, {});
// }



// Завдання: написати функцію, яка приймає невідому кількість параметрів і повертає суму тих, що є числами.

// function sumAll(...arg) {
//     if (arg.length === 0) throw new Error('something went wrong');

//     return arg
//         .filter(i => typeof i === 'string')
//         .reduce((acc, el) => acc + el, 0)
// }

// Завдання: порівняти два об'єкти (можуть бути вкладеними). Прості об'єкти, масиви, примітиви — всередині може бути будь-що.

// const a = { x: 1 };
// const b = { x: 1 };

// function equalObj(a, b) {
//     return JSON.stringify(a) === JSON.stringify(b)
// };

// equalObj(a, b);


// сума масиву через цикл for
// Завдання: Повернути суму всіх значень у масиві без reduce.
// Вхід: [1, 2, 3, 4, 5]
// Очікуваний результат: 15

// const arr = [1, 2, 3, 4, 5];

// function totalSum(arr) {
//     let sum = 0;
    
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i]
//     }

//     return sum
// };

// console.log(totalSum(arr));



// // Задача 7 — знайти найдорожчий товар
// // Умова

// // Є масив товарів. Знайди товар з найбільшою ціною.

// const products = [
//   { id: 1, title: 'Phone', price: 500 },
//   { id: 2, title: 'Laptop', price: 1200 },
//   { id: 3, title: 'Mouse', price: 1500 }
// ];
// // // Expected
// // // { id: 2, title: 'Laptop', price: 1200 }

// function maxPrice(products) {
//     if (!products.length) return null;

//     return products.reduce((maxProduct, product) => {
//         return maxProduct.price > product.price ? maxProduct : product
//     })

// };


// console.log(maxPrice(products))



// знайти найбільше число в масиві
// Завдання: Знайти максимальне значення через цикл без Math.max.
// Вхід: [7, 3, 11, 2, 9]
// Очікуваний результат: 11

// const array = [7, 3, 11, 2, 9];

// function maxNum(arr) {
//     let max = arr[0];

//     for(let i = 0; i < arr.length; i++) {
//         if (arr[i] > max) max = arr[i]
//     }

//     return max;
// };

// console.log(maxNum(array));



// Підрахунок кількості кожного елемента в масиві
// Завдання: Порахувати, скільки разів зустрічається кожне слово.

// const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

// function count(words) {
//     return words.reduce((acc, word) => {
//         acc[word] = (acc[word] || 0) + 1;

//         return acc
//     }, {})
// };


// const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

// function count(words) {
//     return words.reduce((acc, word) => {
//         acc[word] = (acc[word] || 0) + 1;

//         return acc
//     }, {})
// };

// Знайти унікальні значення
// Завдання: Видалити дублікати з масиву.

const arr = [1, 2, 2, 3, 4, 4, 5];

const unique = [...new Set(arr)];





// // Задача 8 — додати поле fullName
// // Умова

// // Є масив користувачів. Додай кожному користувачу поле fullName.

// // const users = [
// //   { id: 1, firstName: 'Anna', lastName: 'Smith' },
// //   { id: 2, firstName: 'Max', lastName: 'Brown' }
// // ];
// // Expected
// // [
// //   { id: 1, firstName: 'Anna', lastName: 'Smith', fullName: 'Anna Smith' },
// //   { id: 2, firstName: 'Max', lastName: 'Brown', fullName: 'Max Brown' }
// // ]







// Задача 9 — знайти дублікати email
// Умова

// Є масив користувачів. Поверни email, які повторюються.

// const users = [
//   { id: 1, email: 'a@test.com' },
//   { id: 2, email: 'b@test.com' },
//   { id: 3, email: 'a@test.com' }
// ];
// Expected
// ['a@test.com']






// Задача 10 — join users + orders
// Умова

// Є користувачі і замовлення. Додай до кожного замовлення ім’я користувача.

// const users = [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ];

// const orders = [
//   { id: 101, userId: 1, total: 200 },
//   { id: 102, userId: 2, total: 300 }
// ];
// Expected
// [
//   { id: 101, userId: 1, total: 200, userName: 'Anna' },
//   { id: 102, userId: 2, total: 300, userName: 'Max' }
// ]






// Порахувати суму по категорії
// const items = [
//   { id: 1, category: 'food', price: 100 },
//   { id: 2, category: 'tech', price: 500 },
//   { id: 3, category: 'food', price: 200 }
// ];

// Expected:

// 300




// 2. Порахувати кількість активних users
// const users = [
//   { id: 1, active: true },
//   { id: 2, active: false },
//   { id: 3, active: true }
// ];

// Expected:

// 2








// 3. Знайти користувача по email
// const users = [
//   { id: 1, email: 'a@test.com' },
//   { id: 2, email: 'b@test.com' }
// ];

// Expected:

// { id: 2, email: 'b@test.com' }






// 4. Перевірити, чи всі задачі завершені
// const tasks = [
//   { id: 1, done: true },
//   { id: 2, done: true }
// ];

// Expected:

// true







// 5. Знайти товари дорожчі за X
// const products = [
//   { id: 1, title: 'Phone', price: 500 },
//   { id: 2, title: 'Mouse', price: 30 },
//   { id: 3, title: 'Laptop', price: 1200 }
// ];

// Expected для minPrice = 100:

// [
//   { id: 1, title: 'Phone', price: 500 },
//   { id: 3, title: 'Laptop', price: 1200 }
// ]





// 6. Додати discountPrice
// const products = [
//   { id: 1, title: 'Phone', price: 1000 },
//   { id: 2, title: 'Mouse', price: 100 }
// ];

// Expected для discount = 10:

// [
//   { id: 1, title: 'Phone', price: 1000, discountPrice: 900 },
//   { id: 2, title: 'Mouse', price: 100, discountPrice: 90 }
// ]





// 7. Знайти середню оцінку
// const reviews = [
//   { id: 1, rating: 5 },
//   { id: 2, rating: 3 },
//   { id: 3, rating: 4 }
// ];

// Expected:

// 4






// 8. Перетворити масив у об’єкт по id
// const users = [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ];

// Expected:

// {
//   1: { id: 1, name: 'Anna' },
//   2: { id: 2, name: 'Max' }
// }









// 9. Повернути тільки потрібні поля
// const users = [
//   { id: 1, name: 'Anna', password: '123' },
//   { id: 2, name: 'Max', password: '456' }
// ];

// Expected:

// [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ]







// 10. Прибрати пароль з одного об’єкта
// const user = {
//   id: 1,
//   name: 'Anna',
//   password: '123'
// };

// Expected:

// {
//   id: 1,
//   name: 'Anna'
// }










// 11. Оновити поле в об’єкті
// const user = {
//   id: 1,
//   name: 'Anna',
//   role: 'user'
// };

// Expected:

// {
//   id: 1,
//   name: 'Anna',
//   role: 'admin'
// }







// 12. Оновити елемент в масиві по id
// const users = [
//   { id: 1, name: 'Anna', role: 'user' },
//   { id: 2, name: 'Max', role: 'user' }
// ];

// Expected для id = 2:

// [
//   { id: 1, name: 'Anna', role: 'user' },
//   { id: 2, name: 'Max', role: 'admin' }
// ]






// 13. Видалити елемент по id
// const users = [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ];

// Expected для id = 1:

// [
//   { id: 2, name: 'Max' }
// ]









// 14. Додати новий елемент immutable
// const users = [
//   { id: 1, name: 'Anna' }
// ];

// const newUser = { id: 2, name: 'Max' };

// Expected:

// [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ]









// 15. Згрупувати по ролі
// const users = [
//   { id: 1, name: 'Anna', role: 'admin' },
//   { id: 2, name: 'Max', role: 'user' },
//   { id: 3, name: 'John', role: 'admin' }
// ];

// Expected:

// {
//   admin: [
//     { id: 1, name: 'Anna', role: 'admin' },
//     { id: 3, name: 'John', role: 'admin' }
//   ],
//   user: [
//     { id: 2, name: 'Max', role: 'user' }
//   ]
// }






// 16. Універсальний groupBy
// const products = [
//   { id: 1, category: 'tech' },
//   { id: 2, category: 'food' },
//   { id: 3, category: 'tech' }
// ];







// 17. Порахувати кількість по ролі
// const users = [
//   { id: 1, role: 'admin' },
//   { id: 2, role: 'user' },
//   { id: 3, role: 'admin' }
// ];

// Expected:

// {
//   admin: 2,
//   user: 1
// }




// 18. Універсальний countBy
// function countBy(items, key) {
//   return items.reduce((acc, item) => {
//     const value = item[key];

//     acc[value] = (acc[value] || 0) + 1;

//     return acc;
//   }, {});
// }
// countBy(users, 'role');
// countBy(products, 'category');








// 19. Знайти дублікати по id
// const items = [
//   { id: 1, name: 'A' },
//   { id: 2, name: 'B' },
//   { id: 1, name: 'C' }
// ];

// Expected:

// [1]




// 20. Об’єднати users + orders
// const users = [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ];

// const orders = [
//   { id: 101, userId: 1, total: 200 },
//   { id: 102, userId: 1, total: 300 },
//   { id: 103, userId: 2, total: 100 }
// ];

// Expected:

// [
//   {
//     id: 1,
//     name: 'Anna',
//     orders: [
//       { id: 101, userId: 1, total: 200 },
//       { id: 102, userId: 1, total: 300 }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Max',
//     orders: [
//       { id: 103, userId: 2, total: 100 }
//     ]
//   }
// ]







// 21. Порахувати total для кожного user
// const users = [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ];

// const orders = [
//   { id: 101, userId: 1, total: 200 },
//   { id: 102, userId: 1, total: 300 },
//   { id: 103, userId: 2, total: 100 }
// ];

// Expected:

// [
//   { id: 1, name: 'Anna', totalSpent: 500 },
//   { id: 2, name: 'Max', totalSpent: 100 }
// ]






// 22. Відфільтрувати об’єкт по значеннях
// const filters = {
//   search: 'phone',
//   category: '',
//   page: 1,
//   sort: null
// };

// Expected:

// {
//   search: 'phone',
//   page: 1
// }







// 23. Перевірити required fields
// const form = {
//   name: 'Anna',
//   email: '',
//   password: '123'
// };

// const required = ['name', 'email', 'password'];

// Expected:

// {
//   isValid: false,
//   missingFields: ['email']
// }










// 24. Порівняти два масиви id
// const oldIds = [1, 2, 3];
// const newIds = [2, 3, 4];

// Expected:

// {
//   added: [4],
//   removed: [1]
// }










// 25. Порівняти два об’єкти shallow
// const a = { name: 'Anna', age: 25 };
// const b = { name: 'Anna', age: 25 };

// Expected:

// true









// 26. Повернути змінені поля
// const oldUser = {
//   name: 'Anna',
//   age: 25,
//   role: 'user'
// };

// const newUser = {
//   name: 'Anna',
//   age: 26,
//   role: 'admin'
// };

// Expected:

// {
//   age: 26,
//   role: 'admin'
// }









// 27. Flatten масивів без flat
// const data = [[1, 2], [3, 4], [5]];

// Expected:

// [1, 2, 3, 4, 5]







// 28. Flatten nested categories
// const categories = [
//   {
//     id: 1,
//     title: 'Electronics',
//     children: [
//       { id: 2, title: 'Phones', children: [] }
//     ]
//   },
//   {
//     id: 3,
//     title: 'Clothes',
//     children: []
//   }
// ];

// Expected:

// [
//   { id: 1, title: 'Electronics' },
//   { id: 2, title: 'Phones' },
//   { id: 3, title: 'Clothes' }
// ]









// 29. Побудувати breadcrumbs
// const categories = [
//   { id: 1, title: 'Electronics', parentId: null },
//   { id: 2, title: 'Phones', parentId: 1 },
//   { id: 3, title: 'iPhone', parentId: 2 }
// ];

// const currentId = 3;

// Expected:

// ['Electronics', 'Phones', 'iPhone']










// 30. Debounce
// function search(value) {
//   console.log(value);
// }

// const debouncedSearch = debounce(search, 500);

// debouncedSearch('r');
// debouncedSearch('re');
// debouncedSearch('react');

// Expected:

// // через 500ms тільки:
// 'react'












// 31. Throttle
// const throttledScroll = throttle(() => {
//   console.log('scroll');
// }, 1000);

// Expected:

// // виклик не частіше ніж 1 раз на секунду












// 32. Callback transformer
// const users = [
//   { id: 1, name: 'Anna' },
//   { id: 2, name: 'Max' }
// ];

// Expected:

// processItems(users, user => user.name);
// // ['Anna', 'Max']









// 33. Callback predicate
// filterItems(users, user => user.id > 1);

// Expected:

// [
//   { id: 2, name: 'Max' }
// ]






// 34. Class User
// const user = new User(1, 'Anna', 'admin');

// user.isAdmin(); // true





// 35. Class Cart
// const cart = new Cart();

// cart.addItem({ id: 1, title: 'Phone', price: 500, quantity: 2 });
// cart.getTotal();

// Expected:

// 1000






// 36. Repository class
// const repo = new UserRepository();

// repo.create({ id: 1, name: 'Anna' });
// repo.findById(1);

// Expected:

// { id: 1, name: 'Anna' }




// let itemList = $('.card > .card-area > ul > li');
//
// console.log(itemList);
//
// for (let i = 0; i < itemList.length; i++) {
//   itemList[i].prepend(i + 1 + '-')
// }
//
// console.log(itemList.length.toString());
//
// $('#qw-counter').prepend(itemList.length.toString());


// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
//
// let result = arr.reduce((a, b) => a + b);
// console.log(result);
//
// //массив парных чисел
//
// const data = [1, 2, 3, 4, 5, 6, 7, 8];
//
// let resultdata = data.sort((a, b) => {
//   return a % 2 - b % 2;
// });
//
// console.log(resultdata);
//
// const data2 = [1, 2, 3, 4, 5, 6, 7, 8];
//
// let result2 = data2.filter(x => x % 2 == 0);
//
// console.log(result2);
//
//
// const desiredModels = ['Hello Kitty', 'Barbie doll'];
//
// function grabDoll(dolls) {
//   let bag = [];
//   for (let i = 0; i < dolls.length; i++) {
//     if( !desiredModels.find(el => el === dolls[i]) ) {
//       continue
//     } else {
//       bag.push(dolls[i]);
//     }
//     if( bag.length === 3 ) break;
//   }
//   return bag;
// }
//
// function sum(a) {
//   return function (b) {
//     return a+b;
//   }
// }
// sum(1)(2)
// sum(5)(-1)

// let sumOfLen = (...rest) => {
//   return rest.reduce((calc, cur) => calc + cur.length, 0)
// }
//
// sumOfLen('hello', 'hi', 'my name', 'is')







class Student {
  constructor(fullName, direction) {
    this._fullName = fullName;
    this._direction = direction;
  }

  getFullName() {
    return this._fullName;
  }

  nameIncludes(data) {
    return this._fullName.toLowerCase().includes(data);
  }

  static studentBuilder() {
    return new Student()
  }

  get direction() {
    return this._direction;
  }

  set direction(direction) {
    return this._direction = direction;
  }
}

const stud1 = new Student('Ivan Petrenko', 'web');

const stud2 = new Student('Sergiy Koval', 'python');







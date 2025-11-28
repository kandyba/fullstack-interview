let itemList = $('.card > .card-area > ul > li');

console.log(itemList);

for (let i = 0; i < itemList.length; i++) {
  itemList[i].prepend(i+1 + "-")
}

console.log(itemList.length.toString());

$('#qw-counter').prepend(itemList.length.toString());


const arr = [1,2,3, 4, 5, 6, 7, 8];

let result = arr.reduce((a,b) => a+b);
console.log(result);

//массив парных чисел

const data = [1,2,3, 4, 5, 6, 7, 8];

let resultdata = data.sort((a,b) => {
 return a % 2 - b % 2;
});

console.log(resultdata);

const data2 = [1,2,3, 4, 5, 6, 7, 8];

let result2 = data2.filter(x => x % 2 == 0);

console.log(result2);










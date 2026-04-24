const person = {
  name: 'Serhii',
  age: 32,
  isProgrammer: true,
  languages: ['ru', 'en', 'de'],
  ['key_' + (1+3)]: 'Computed Key',
  greet() {
    console.log('greet from person')
  }
};

console.log(person.name);
const ageKey = 'age';
console.log(person[ageKey]);
person.greet();

person.age++
person.languages.push('uk')
delete person['key_4'];


const {name, age = 40, isProgrammer, languages} = person;

console.log(name);
console.log(age);
console.log(isProgrammer);
console.log(languages);



























//
// const timeout = setTimeout(()=> { // самая простая асинхроннсть
//   console.log('After Timeout')
// }, 2500);
//
// clearTimeout(timeout);
//
// const interval = setInterval(()=> { // самая простая асинхроннсть
//   console.log('After interval')
// }, 2500);
//
// clearInterval(interval);
//
// const delay = (callback, wait = 1000) => {
//   setTimeout(callback, wait)
// };
//
// delay(() => { // почти ничего не изменилось
//   console.log('after delay');
// }, 2000)


const delay = (wait = 2000) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Something went wrong, please try again')
    }, wait)
  });

  return promise;
};

delay(2500)
  .then(() => {
    console.log('After 2.5 seconds');
  })
  .catch(err => console.error('Error: ', err))
  .finally(() => console.log('Finally'))
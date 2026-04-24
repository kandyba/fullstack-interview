// Async/Await

// const fetchData = () => Promise.resolve({
//   data: ['Jack', 'Max', 'Leo']
// });
//
// const getNamesData = () => {
//   fetchData()
//       .then(data => {
//         console.log(data);
//         return 'done!';
//       })
// };
//
// getNamesData();
//
// const getNamesData2 = async () => {
//   console.log(await fetchData())
//   return "done";
// };
//
//
// getNamesData2();

// const fetchData = Promise.reject('some error...');
//
// const getNamesData = () => {
//   try {
//     console.log();
//   } catch (e) {
//     console.log(e);
//   }
// };
//
// getNamesData();

const load = () => {
  Promise.resolve(5)
      .then(a => {
        Promise.resolve(10)
            .then(b => {
              console.log(a+b)
            })
      })
};

load();

const load2 = async () => {
  const a = await Promise.resolve(5);
  const b = await Promise.resolve(10);
  console.log(a + b);
};

load2();





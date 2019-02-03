promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(() => { console.log('foo') });
    reject('error');
  }, 1000);
})

promise1.then((value) => {
  value();
});

console.log(promise1);

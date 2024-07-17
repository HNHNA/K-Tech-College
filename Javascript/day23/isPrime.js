function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    console.log(Math.sqrt(num))
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(2));

let age = 15
let mess = (age>=18) ? 'na' : 'd'
console.log(mess)
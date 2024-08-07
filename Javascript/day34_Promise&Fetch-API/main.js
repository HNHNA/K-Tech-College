function birthday(s, d, m) {
  let result = 0;
  for (let i = 0; i <= s.length - m; i++) {
    let sum = 0;
    for (let j = i; j < i + m; j++) {
      sum += s[j];
    } 
    if(sum === d){
      result += 1;
    }
  }
  return result;
}

console.log(birthday([1,2,1,3,2], 3, 2));


// function birthday(s, d, m) {
//   let count = 0;
//   let sum = 0;

//   for (let i = 0; i < s.length; i++) {
//     sum += s[i];

//     if (i >= m - 1) {
//       if (sum === d) {
//         count++;
//       }

//       sum -= s[i - m + 1];
//     }
//   }
//   return count;
// }

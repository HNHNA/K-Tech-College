// function getsum( total, num) {
//   return total + Math.round(num)
// }

// const sum = [1.4,2.6,3,4].reduce((total,num) => {
//   console.log('total:',total);
//   console.log('num:',num);
//   const sum =  Math.round(total) + Math.round(num);
//   console.log('sum:',sum);
//   return sum;
// });
// console.log(sum);


/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
function reduce (nums ,fn, init = 0) {
  // return nums.reduce(fn,init);
  return result = nums.reduce(fn,init);
}

let result = 0;
reduce([1,2,3,4,5], (prevvalue, currValue) => prevvalue + currValue)
// result = reduce([1,2,3,4,5], (prevvalue, currValue) => prevvalue + currValue, result)

console.log('result:',result);
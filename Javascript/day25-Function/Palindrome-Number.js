function isPalindrome(x) {
  const str = x.toString();
  
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    console.log(left);
    console.log(right);
    if (str[left] !== str[right]) {
      return false; 
    }
    left++;
    right--;
  }
  
  return true; 
}

const x = 11211;
console.log(isPalindrome(x));


console.log(i % 2);
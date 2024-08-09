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

function birthday2(s, d, m){
  let res = 0;
  let sum = 0;
  for(let i = 0; i < m; i++){
    sum += s[i];
  }
  if(sum === d){
    res += 1;
  }
  console.log(res);
  
  for(let j = m; j < s.length; j++){
    sum += s[j] - s[j-m];
    if(sum === d){
      res += 1;
    }
  }
  return res;
}
console.log(birthday2([1, 2, 1, 3, 2], 3 ,2));
console.log(birthday([1, 2, 1, 3, 2], 3 ,2));
function generateArray(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

function sum(arr) {
  try{
    let result = 0;
  console.log(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    console.log(arr[i]);
      // console.log(result);
  }

  if( result > 55 || Number.isNaN(result)){
    throw new Error('Wrong result')
  }

  return result;
  }catch (error) {
    console.log(error);
  }finally {
    console.log('Finally');
  }
}

// console.log(generateArray(10));
console.log(sum(generateArray(10)));
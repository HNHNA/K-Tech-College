// const arr1 = [1,2,3]
// const arr2 = [...arr1]

// arr1[2]=5

//  console.log('arr1:', arr1)
//  console.log('arr2:', arr2)


//  var object1 = { 
//   name: 'nanh',
//   age: 2
//  }

//  var object2 = {...object1}
//  object2.age = 4
//  var object3 = Object.create(object2);


//  console.log('ob1:', object1)
//  console.log('ob2:', object2)
//  console.log('ob3:', object3)


console.log(x); // undefined
var x = 5;
console.log(x); // 5

if (true) {
  var y = 10;
}
console.log(y); // 10 (vì phạm vi của var là toàn cục hoặc hàm)


// console.log(a); // ReferenceError: a is not defined
let a = 5;
console.log(a); // 5

if (true) {
  let b = 10;
  console.log(b); // 10
}
// console.log(b); // ReferenceError: b is not defined (vì phạm vi của let là khối)


const c = 5;
console.log(c); // 5

// c = 10; // TypeError: Assignment to constant variable.

if (true) {
  const d = 10;
  console.log(d); // 10
}
const d = 1;
console.log(d); // ReferenceError: d is not defined (vì phạm vi của const là khối)

const obj = { key: 'value' };
obj.key = 'newValue'; // Được phép vì chỉ thuộc tính của đối tượng thay đổi, không phải đối tượng.
console.log(obj);



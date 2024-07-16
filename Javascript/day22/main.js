const arr1 = [1,2,3]
const arr2 = [...arr1]

arr1[2]=5

 console.log('arr1:', arr1)
 console.log('arr2:', arr2)


 var object1 = { 
  name: 'nanh',
  age: 2
 }

 var object2 = {...object1}
 object2.age = 4
 var object3 = Object.create(object2);


 console.log('ob1:', object1)
 console.log('ob2:', object2)
 console.log('ob3:', object3)



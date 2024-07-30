// Write a function that takes an object with two properties as argument. It should return the value of the property with key country.
const object = {
  continent: "Asia",
  country: "Japan",
  "prop-2": 123,
  test: null,
};
// console.log(Object.values(object));
// console.log(Object.keys(object));

function takeCountry(obj) {
  return obj.country;
}
// console.log(takeCountry(object));

// Write a function that takes an object with two properties as argument.
// It should return the value of the property with key 'prop-2'. Hint: you might want to use the square brackets property accessor
function takeProperties(obj) {
  return obj["prop-2"];
}
// console.log(takeProperties(object));

// Write a function that takes an object with two properties and a string as arguments.
// It should return the value of the property with key equal to the value of the string
function takeValue(obj, key) {
  return obj[key];
}
// console.log(takeValue(object, "continent"));

// Write a function that takes an object (a) and a string (b) as argument. Return true if the object has a property with key 'b'.
// Return false otherwise. Hint: test case 3 is a bit tricky because the value of property 'z' is undefined. But the property itself exists.
function checkProperties(obj, key) {
  return key in obj;
}
function checkProperties2(obj, key) {
  // console.log(Boolean(obj[key]));
  return Boolean(obj[key]);
}
// console.log(checkProperties2(object, "test"));

// Write a function that takes a string as argument.
// Create an object that has a property with key 'key' and a value equal to the string. Return the object.
function createObject(str){
  // const ob = {
  //   key: str
  // }
  const ob = new Object()
  ob.key = str
  return ob
}

function createObject2(a, b){
  const ob = {}
  ob[a] = b  
  return ob
}

// console.log(createObject('na'))
// console.log(createObject2('names', 'john'))

function addTwoArray(arr1, arr2){
  // const ob = new Object();
  const obj = {};
  // for(let i = 0; i< arr1.length; i++){
  //   obj[arr1[i]] = arr2[i];
  // }
  return arr1.reduce((acc, cur, i) => ({ ...acc, [cur]: arr2[i] }), {});
  // return obj;
}
console.log(addTwoArray(['name', 'age', 'city'], ['Alice', 25, 'Paris'])); 


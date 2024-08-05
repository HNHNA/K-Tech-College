/***** Properties *****/
const obj = {
  firstName: "ngoc anh",
  lastName: "huynh",
  // age: 22,
  eyeColor: "brow",
};

// Adding or changing an object property
Object.defineProperty(obj, "age", { value: 22 });
// console.log(obj);

// Adding or changing object properties
Object.defineProperties(obj, {
  age: { value: 22 },
  address: { value: "HCM" },
});
// console.log(obj);

// Accessing a Property
const descriptor = Object.getOwnPropertyDescriptor(obj, "firstName");
// console.log(descriptor);

// Accessing Properties
Object.getOwnPropertyDescriptors(obj);
const descriptors = Object.getOwnPropertyDescriptors(obj);
// console.log(descriptors);

// Returns all properties as an array
const allPro = Object.getOwnPropertyNames(obj);
// console.log(allPro);

// // Accessing the prototype
const isPrototype = Object.getPrototypeOf(obj);
// console.log(isPrototype);

// /***** Methods *****/
const target = { a: 1 };
const source = { b: 2, c: 3 };
// // Copies properties from a source object to a target object
const result = Object.assign(target, source);
const result1 = Object.assign({}, target, source);
const result2 = Object.assign({}, result1, { c: 4, d: 100 });
// console.log(result2);

// Creates an object from an existing object
const newObj = Object.create(obj, {
  test: { value: true },
});
// console.log(newObj.firstName);
// console.log(newObj);

// Returns an array of the key/value pairs of an object
const isEntries = Object.entries(obj);
// console.log(isEntries);
// for (const [key, value] of isEntries) {
//   console.log(`${key}: ${value}`);
// }

const entries = [
  ["name", "Alice"],
  ["age", 30],
  ["city", "Seoul"],
  ["eyeColor", "black"],
];
// Creates an object from a list of keys/values
const person = Object.fromEntries(entries);
// console.log(person);

// Returns an array of the keys of an object
const keyOfArray = Object.keys(person);
// console.log(keyOfArray);

// // Returns an array of the property values of an object
const valueOfAraay = Object.values(person);
// console.log(valueOfAraay);

const data = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'vegetable', name: 'broccoli' },
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];
// // Groups object elements according to a function
const dataGroup = Object.groupBy(data, ({ category }) => category);
const dataGroup2 = Object.groupBy(data, ({ type }) => type);
// console.log(dataGroup2);

// /** Protection Methods */
const animal = {
  name: 'Lion',
  species: 'Panthera leo',
  habitat: 'Grasslands',
  roar: function() {
    console.log('Roar!');
  }
};
// // Prevents adding object properties
// Object.preventExtensions(animal);
// Object.defineProperty(animal, "age", { value: 22 });
// Object.defineProperties(animal, {
//   age: { value: 22 },
//   address: { value: "HCM" },
// });
// animal.name = 'Dog'
// console.log(animal);


// // Returns true if properties can be added to an object
const checkEntensible = Object.isExtensible(animal);
// console.log(checkEntensible); // return false because Object.preventExtensions(); or Object.freeze(animal);

// // Prevents adding and deleting object properties
// Object.seal(animal);
// Object.defineProperties(animal, {
//   age: { value: 22 },
//   address: { value: "HCM" },
// });
// animal.name = 'Dog'
// console.log(animal);
// delete animal.name;  
// console.log(animal);

// // Returns true if object is sealed
const checkSeal = Object.isSealed(animal);
// console.log(checkSeal);

// // Prevents any changes to an object
// Object.freeze(animal);

// // Returns true if object is frozen
const checkFrozen = Object.isFrozen(animal);
// console.log(checkFrozen);

// /***** Extra *****/
// /**
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
//  * delete keyword
//  */

// delete object[key]
console.log(animal);
delete animal.name;  
console.log(animal);


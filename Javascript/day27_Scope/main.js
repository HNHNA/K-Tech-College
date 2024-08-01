debugger;

// const global_var = 123


// function makeBread(quanlity, addSomething){
//   let name = 'hanh toi'
//   console.log(name);

//   function addSomething(a){
//     let giavi = 'ot cay'
//     console.log('gia vi:', a)
//   }
  
//   console.log('gia vi:', name);  
//   addSomething(name);
//   return 'bread'.repeat(quanlity);
// }

// function addSomething(a){
//   console.log('gia vi:', a)
// }  

// makeBread(5, addSomething)

// let name = 'catalog'

// const object  = {
//   name: 'bob',
//   h1: () => {
//     console.log('hello:', this.name)
//   }
// }

// console.log(object.name);
// object.h1();


// var a ='statiic'
// function f1(){
//   console.log(a)
// }

// function f2(){
//   var a = 'dynamic'
//   f1()
//   console.log(a) 
// }

// f2()


function sum(a, b) {
  let c = 6;
  function f1(){
    console.log(c);
    let d = 10
    return a + b + d + c
  }
  console.log(f1())
  return a + b;
}

console.log(sum(1,2));
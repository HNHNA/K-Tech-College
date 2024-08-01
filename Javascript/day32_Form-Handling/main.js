const myForm = document.querySelector("#myform")
const myInput = myForm.querySelector('input')
const userName = myForm.querySelector('#fusername')
const emailInput = myForm.querySelector('#femail')
const ageInput = myForm.querySelector('#fage')

myForm.addEventListener('submit', function(e){
  const value = ageInput.value;
    if (value === '' || isNaN(value)) {
      e.preventDefault();
      alert('Please enter a valid age');
    } 
    if(!emailInput.value.includes('@')){
      alert('Wrong email');
      return
    }

  myForm.reset();
  console.log('Submited');
});


ageInput.addEventListener('input', (e) => {
  const value = e.target.value;
  // Remove non-numeric characters
  e.target.value = value.replace(/\D/g, '');

  console.log(e.target.value);
});

// ageInput.addEventListener('keypress', (e) => {
//   if(isNaN(e.key)) {
//     console.log('not a number');
//     return
//   }
//   return true
// });





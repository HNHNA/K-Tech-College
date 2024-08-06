const btnAnnually = document.getElementById('btn-annually')
const btnMonthly = document.getElementById('btn-monthly')

const allCard = document.querySelectorAll('#card')

btnAnnually.addEventListener('click', function() {
  allCard.forEach((card,index) =>  {
  const priceCard = card.querySelector('.card-price span')
  console.log(priceCard);  
  priceCard.forEach(i => {
    i.
  })
  });
});

// btnMonthly.addEventListener('click', function() {
//   allCard.forEach((card,index) => {
//     if(index >= 3){
//     card.style.display = 'block';
//     }else {
//     card.style.display = 'none';
//     }
//   });
// });






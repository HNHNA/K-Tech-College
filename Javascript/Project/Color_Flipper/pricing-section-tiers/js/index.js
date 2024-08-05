const annullyDisplay =  document.getElementById('container-card')

const btnAnnually = document.getElementById('btn-annually')
const btnMonthly = document.getElementById('btn-monthly')

const allCard = document.querySelectorAll('#card')

btnAnnually.addEventListener('click', function() {
  allCard.forEach((card,index) =>  {
    if(index < 3){
    card.style.display = 'block';
    }else {
    card.style.display = 'none';
    }
  });
});

btnMonthly.addEventListener('click', function() {
  allCard.forEach((card,index) => {
    if(index >= 3){
    card.style.display = 'block';
    }else {
    card.style.display = 'none';
    }
  });
});

annullyDisplay.addEventListener('', () => {
  
})





const data = [
  {
    price: {
      monthly: 9.99,
      annually: 6.99,
    },
  },
  {
    price: {
      monthly: 19.99,
      annually: 15.99,
    },
  },
  {
    price: {
      monthly: 29.99,
      annually: 25.99,
    },
  },
];

function updatePrices(viewMode) {
  const priceElements = document.querySelectorAll(
    "#container-card .card-price"
  );
  priceElements.forEach((priceElement, index) => {
    const priceSpan = priceElement.querySelector(".card-price span");
    const priceP = priceElement.querySelector(".card-price p");

    const plan = data[index];

    if (plan) {
      if (viewMode === "monthly") {
        priceSpan.textContent = `$${plan.price.monthly}`;
        priceP.textContent = `Billed monthly`;
      } else if (viewMode === "annually") {
        priceSpan.textContent = `$${plan.price.annually}`;
        priceP.textContent = `Billed annually($${Math.round(
          plan.price.annually * 12
        )} )`;
      }
    }
  });
  localStorage.setItem("pricingViewMode", viewMode);
}

document.getElementById("btn-monthly").addEventListener("click", () => {
  updatePrices("monthly");
  document.getElementById("btn-monthly").classList.add("active-btn");
  document.getElementById("btn-annually").classList.remove("active-btn");
});

document.getElementById("btn-annually").addEventListener("click", () => {
  updatePrices("annually");
  document.getElementById("btn-annually").classList.add("active-btn");
  document.getElementById("btn-monthly").classList.remove("active-btn");
});

const allCard = document.querySelectorAll("#container-card #card");
allCard.forEach((card, index) => {
  card.addEventListener("click", () => {
    allCard.forEach((item) => {
      item.querySelector(".card-btn button").classList.remove("active-btn-buy");
      item.querySelector(".card-price span").classList.remove("active-text");
      item.classList.remove("active-card");
    });

    const buttonCard = card.querySelector(".card-btn button");
    const priceCard = card.querySelector(".card-price span");
    buttonCard.classList.add("active-btn-buy");
    priceCard.classList.add("active-text");
    card.classList.add("active-card");

    localStorage.setItem("activeCardIndex", index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const savedViewMode = localStorage.getItem("pricingViewMode");
  if (savedViewMode) {
    updatePrices(savedViewMode);
    document.getElementById(`btn-${savedViewMode}`).classList.add("active-btn");
  } else {
    updatePrices("monthly");
    document.getElementById("btn-monthly").classList.add("active-btn");
  }

  const activeCardIndex = localStorage.getItem("activeCardIndex");
  if (activeCardIndex !== null) {
    allCard[activeCardIndex].classList.add("active-card");
    allCard[activeCardIndex]
      .querySelector(".card-btn button")
      .classList.add("active-btn-buy");
    allCard[activeCardIndex]
      .querySelector(".card-price span")
      .classList.add("active-text");
  }
});

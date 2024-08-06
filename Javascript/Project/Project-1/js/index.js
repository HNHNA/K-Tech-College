document.addEventListener("DOMContentLoaded", () => {
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
    const priceElements = document.querySelectorAll("#container-card .card-price");
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

  const savedViewMode = localStorage.getItem("pricingViewMode");
  if (savedViewMode) {
    updatePrices(savedViewMode);
    document.getElementById(`btn-${savedViewMode}`).classList.add("active");
  } else {
    updatePrices("monthly"); 
    document.getElementById("btn-monthly").classList.add("active");
  }

  document.getElementById("btn-monthly").addEventListener("click", () => {
    updatePrices("monthly");
    document.getElementById("btn-monthly").classList.add("active");
    document.getElementById("btn-annually").classList.remove("active");
  });

  document.getElementById("btn-annually").addEventListener("click", () => {
    updatePrices("annually");
    document.getElementById("btn-annually").classList.add("active");
    document.getElementById("btn-monthly").classList.remove("active");
  });
});

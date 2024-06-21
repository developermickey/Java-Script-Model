let countries = [];
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".modal-close");
const container = document.querySelector(".countries");

//========================
//  Your Code Goes Here
//------------------------
container.addEventListener("click", (event) => {
  const countryCard = event.target.closest(".country");
  if (!countryCard) return;
  const countryName = countryCard.dataset.name;
  const country = countries.find(
    (country) => country.name.common === countryName
  );
  displayCountryModel(country);
});

function displayCountryModel(country) {
  const modelHTML = `
                 <h2>${country.name.common}</h2>
                <div class="flag">
                    <img src="${country.flags.svg}" alt="${country.flags.alt}" />
                </div>
                <div class="content">
                    <h3>Population:</h3>
                    <p>${country.population}</p>
                    <h3>Region:</h3>
                    <p>${country.region}</p>
                    <h3>Capital:</h3>
                    <p>${country.capital}</p>
                </div>
    `;
  modalContent.innerHTML = modelHTML;
  overlay.classList.add("open");
}

closeButton.addEventListener("click", () => {
  overlay.classList.remove("open");
});

overlay.addEventListener("click", (event) => {
  const isOutSide = !event.target.closest(".model");
  if (isOutSide) {
    overlay.classList.remove("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    overlay.classList.remove("open");
  }
});
// Create a click event listener on the container element
//   Make sure that only clicks on the country element are targeted
//   Get the country name from the clicked element
//   Find the country object in the countries array that matches the name

//   update the modal content with the country data
//   add the open class to the overlay element

// Create a click event listener on the close button
//   remove the open class from the overlay element

//========================
//  EXTRA CREDIT
//------------------------

// Close the modal when the user clicks outside of the modal

// Close the modal when the user presses the escape key

//========================
//  FETCH DATA
//------------------------
async function getCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
  );
  const data = await response.json();
  countries = data;
  displayCountries(data);
  return data;
}

function displayCountries(countries) {
  const countriesHTML = countries
    .map(
      (country) => `
          <div class="country" data-name="${country.name.common}">
              <h3 class="country-name">${country.name.common}</h3>
              <img class="country-flag" src="${country.flags.svg}" />
          </div>
      `
    )
    .join("");
  container.innerHTML = countriesHTML;
}

getCountries();

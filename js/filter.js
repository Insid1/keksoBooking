import { getData } from "./api.js";
import { generateMap } from "./map.js";
const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');

const data = getData()
  .then((response) => {
    mapFiltersElement.addEventListener('change', (evt) => {
      const sortedOffers = sortByType(response);
      generateMap(sortedOffers);
    })

  })


function sortByType(hotels) {
  const hotelsCoppy = hotels.slice();
  console.log(hotels);
  console.log(housingTypeElement.value);
  console.log(housingRoomsElement.value);
  console.log(housingGuestsElement.value);
  const sortedArr = hotelsCoppy.sort((a, b) => {
    a.filterRate = 0;
    if (a.offer.type === housingTypeElement.value) {
      a.filterRate += 1;
    }
    if (a.offer.rooms === +housingRoomsElement.value) {
      a.filterRate += 1;
    }
    if (a.offer.guests === +housingGuestsElement.value) {
      a.filterRate += 1;
    }

    return b.filterRate - a.filterRate;
  })

  return sortedArr.slice(0, 10);
}





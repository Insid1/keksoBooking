import { getData } from "./api.js";
import { generateMap } from "./map.js";

const PriceValue = {
  LOW: 10000,
  HIGH: 50000,
}
const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');

const data = getData()
  .then((response) => {
    mapFiltersElement.addEventListener('change', (evt) => {
      const sortedOffers = sortByType(response);
      generateMap(sortedOffers);
    })

  })


function sortByType(hotels) {
  const hotelsCoppy = hotels.slice();

  // взять элемент-коллекцию housingFeaturesElement
  // Пройтись по нему и вернуть  значения value только элементов со статусом checked
  const getFilterRate = function (hotel) {
    const checkFeatures = function () {
      if (!hotel.offer.features) {
        return;
      };

      for (let featureElement of housingFeaturesElement.querySelectorAll('input')) {
        if (featureElement.checked && hotel
          .offer
          .features
          .includes(featureElement.value)) {
          filterRate += 1;
        }
      }
    }

    // Взять элемент из фильтра со значением low /mid /high
    // Взять элемент из data и значения price
    // Сравнить Если значение фильтра и показатель цены одинаковы то прибавить 1
    //
    const checkPrice = function () {
      const hotelPrice = hotel.offer.price;
      const priceFilter = housingPriceElement.value;

      const isLowMidHigh = function () {
        if (hotelPrice < PriceValue.LOW) {
          return 'low';
        } if (hotelPrice > PriceValue.HIGH) {
          return 'high';
        } else {
          return 'middle';
        }
      };

      if (priceFilter === isLowMidHigh()) {
        filterRate += 1;
      }
    }

    let filterRate = 0;

    if (hotel.offer.type === housingTypeElement.value) {
      filterRate += 1;
    }
    if (hotel.offer.rooms === +housingRoomsElement.value) {
      filterRate += 1;
    }
    if (hotel.offer.guests === +housingGuestsElement.value) {
      filterRate += 1;
    }

    checkFeatures();
    checkPrice();

    return filterRate;
  }

  const sortedArr = hotelsCoppy.sort((a, b) => {

    a.filterRate = getFilterRate(a);
    b.filterRate = getFilterRate(b);

    return b.filterRate - a.filterRate;
  })
  console.log(sortedArr.slice(0,10));
  return sortedArr.slice(0, 10);
}





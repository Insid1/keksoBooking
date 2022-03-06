import { renderMap } from './map.js';
// eslint-disable-next-line no-unused-vars
import { lodash } from 'lodash';

const RENENDER_DELAY = 500;
const PriceValue = {
  LOW: 10000,
  HIGH: 50000,
};
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('select');
const mapFilterFeatureElements = mapFilterElement.querySelectorAll('input');
const housingTypeElement = mapFilterElement.querySelector('#housing-type');
const housingPriceElement = mapFilterElement.querySelector('#housing-price');
const housingRoomsElement = mapFilterElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFilterElement.querySelector('#housing-guests');

function applyFilter(hotels) {

  function filterHotels() {
    const getNumOfActiveFilters = function () {
      let counter = 0;
      for (const currFilter of mapFilterElements) {
        if (currFilter.value !== 'any') {
          counter += 1;
        }
      }
      for (const currFeatureFilter of mapFilterFeatureElements) {
        if (currFeatureFilter.checked) {
          counter += 1;
        }
      }
      return counter;
    };

    const checkType = function (hotel) {
      if (hotel.offer.type === housingTypeElement.value) {
        hotel.filterRate += 1;
      }
    };
    const checkRooms = function (hotel) {
      if (hotel.offer.rooms === +housingRoomsElement.value) {
        hotel.filterRate += 1;
      }
    };

    const checkGuests = function (hotel) {
      if (hotel.offer.guests === +housingGuestsElement.value) {
        hotel.filterRate += 1;
      }
    };

    const checkFeatures = function (hotel) {
      if (!hotel.offer.features) {
        return;
      }

      for (const featureElement of mapFilterFeatureElements) {
        if (featureElement.checked && hotel
          .offer
          .features
          .includes(featureElement.value)) {
          hotel.filterRate += 1;
        }
      }
    };

    const checkPrice = function (hotel) {
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
        hotel.filterRate += 1;
      }
    };

    const aprovedByFilter = [];

    hotels.forEach((hotel) => {
      hotel.filterRate = 0;

      checkType(hotel);
      checkPrice(hotel);
      checkRooms(hotel);
      checkGuests(hotel);
      checkFeatures(hotel);

      if (getNumOfActiveFilters() === hotel.filterRate) {
        aprovedByFilter.push(hotel);
      }
    });
    renderMap(aprovedByFilter);

  }

  function delayFunction(cb) {
    // eslint-disable-next-line no-undef
    return _.debounce(cb, RENENDER_DELAY)();
  }

  mapFilterElement.addEventListener('change', () => {
    // delay function execution
    delayFunction(filterHotels);
  });
}

export { applyFilter };

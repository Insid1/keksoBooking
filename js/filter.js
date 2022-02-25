// import { getData } from "./api.js";
import { generateMap } from "./map.js";

const PriceValue = {
  LOW: 10000,
  HIGH: 50000,
}
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('select');
const mapFilterFeatureElements = mapFilterElement.querySelectorAll('input');
const housingTypeElement = mapFilterElement.querySelector('#housing-type');
const housingPriceElement = mapFilterElement.querySelector('#housing-price');
const housingRoomsElement = mapFilterElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFilterElement.querySelector('#housing-guests');
const housingFeaturesElement = mapFilterElement.querySelector('#housing-features');

function filterHotels(hotels) {
  const getNumOfActiveFilters = function () {
    let counter = 0;
    for (let currFilter of mapFilterElements) {
      if (currFilter.value !== 'any') {
        counter += 1;
      }
    }
    for (let currFeatureFilter of mapFilterFeatureElements) {
      if (currFeatureFilter.checked) {
        counter += 1;
      }
    }
    return counter;
  }

  const checkType = function (hotel) {
    if (hotel.offer.type === housingTypeElement.value) {
      hotel.filterRate += 1;
    };
  }
  const checkRooms = function (hotel) {
    if (hotel.offer.rooms === +housingRoomsElement.value) {
      hotel.filterRate += 1;
    };
  }

  const checkGuests = function (hotel) {
    if (hotel.offer.guests === +housingGuestsElement.value) {
      hotel.filterRate += 1;
    };
  }

  const checkFeatures = function (hotel) {
    if (!hotel.offer.features) {
      return;
    };

    for (let featureElement of mapFilterFeatureElements) {
      if (featureElement.checked && hotel
        .offer
        .features
        .includes(featureElement.value)) {
        hotel.filterRate += 1;
      }
    }
  }

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
  }

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
  })
  console.log(aprovedByFilter);
  return aprovedByFilter;

}

function applyFilter(response) {

  mapFilterElement.addEventListener('change', () => {
    const filteredOffers = filterHotels(response);
    generateMap(filteredOffers);
  })
}

export { applyFilter };







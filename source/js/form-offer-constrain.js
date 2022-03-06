import { disableElement } from './util.js';
import { fillAdress } from './map.js';

const DELAY_FOR_RESET = 50;
// price constrains
const Prices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// HTML elements
const adFormElement = document.querySelector('.ad-form');
const apartamentTypeElement = adFormElement.querySelector('#type');
const apartamentPriceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const timeFieldElement = timeInElement.parentElement;
const roomNumberElement = document.querySelector('#room_number');
const guestNumberElements = document.querySelector('#capacity').children;

function addConstrains() {
  // functions for events
  function onPrice() {
    const assignMinimalPrice = () => {
      const minValue = Prices[apartamentTypeElement.value];
      // assign placeholder:
      apartamentPriceElement.placeholder = minValue;
      // assign minimal value
      apartamentPriceElement.min = minValue;
    };

    return assignMinimalPrice;
  }

  function onTime() {

    const assignTimeLink = (evt) => {
      const changer = evt.target;

      if (changer === timeInElement) {
        timeOutElement.value = timeInElement.value;
      } else {
        timeInElement.value = timeOutElement.value;
      }
    };

    return assignTimeLink;
  }
  // can be refactored through setCustonValidity
  function onRooms() {
    // function can be refactored quite hard to read conditional statements
    const asignGuests = () => {
      const marker = +roomNumberElement.value;
      // active not for guest if rooms = 100;
      if (marker === 100) {
        disableElement(guestNumberElements[0], false);
      } else {
        disableElement(guestNumberElements[0]);
      }
      // to work such loop elements must be in order;
      for (let i = 1; i < guestNumberElements.length; i++) {
        const currentElement = guestNumberElements[i];
        if (marker >= i && marker !== 100) {
          disableElement(currentElement, false);
        } else {
          disableElement(currentElement);
        }
      }
    };

    return asignGuests;
  }

  // assign events
  apartamentTypeElement.addEventListener('change', onPrice());
  timeFieldElement.addEventListener('change', onTime());
  roomNumberElement.addEventListener('change', onRooms());

  adFormElement.addEventListener('reset', () => {
    setTimeout(() => {
      // ^_^ sry :(
      onPrice()();
      onRooms()();
      fillAdress();
    }, DELAY_FOR_RESET);
  });

}

export { addConstrains, adFormElement };



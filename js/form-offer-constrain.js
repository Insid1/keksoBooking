// price constrains
const Prices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
}

// HTML elements
const adFormElement = document.querySelector('.ad-form');
const apartamentTypeElement = adFormElement.querySelector('#type');
const apartamentPriceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const timeFieldElement = timeInElement.parentElement;

function addConstrains() {
  // functions for events
  function onPrice() {
    const assignMinimalPrice = () => {
      const minValue = Prices[apartamentTypeElement.value]
      // assign placeholder:
      apartamentPriceElement.placeholder = minValue;
      // assign minimal value
      apartamentPriceElement.min = minValue;
    }

    return assignMinimalPrice;
  }

  function onTime() {

    const assignTimeLink = evt => {
      const changer = evt.target;

      if (changer === timeInElement) {
        timeOutElement.value = timeInElement.value;
      } else {
        timeInElement.value = timeOutElement.value;
      };
    }

    return assignTimeLink;
  }

  // assign events
  apartamentTypeElement.addEventListener('change', onPrice());
  timeFieldElement.addEventListener('change', onTime())
}

export { addConstrains, adFormElement };



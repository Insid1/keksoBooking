import { generateMap } from './map.js';
import { showErrorGet, showErrorPOST, showSuccessServerMessage } from './util.js';
import { adFormElement } from './form-offer-constrain.js';


const SHOW_TIME = 3000;
const AMOUNT_OF_OFFERS = 50;

function getData() {
  fetch(
    'https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return (json.slice(0, AMOUNT_OF_OFFERS));
    })
    .then(preparedData => {
      generateMap(preparedData);
    })
    .catch(err => {
      showErrorGet(err);
    });
}

function sendData(formData) {


  fetch('https://23.javascript.pages.academy/keksobookin', {
    method: 'POST',
    body: formData,
  }).then(response => {
    if (response.ok) {
      showSuccessServerMessage(SHOW_TIME);
      adFormElement.reset();
    } else {
      showErrorPOST(SHOW_TIME);
    }
  }).catch(err => {
    showErrorPOST(SHOW_TIME);
  })
}

function onSubmitForm(onSuccess) {

  adFormElement.addEventListener('submit', (evt) => {
    const formData = new FormData(evt.target);
    evt.preventDefault();
    sendData(formData);
  })
}


export { getData, onSubmitForm, sendData };

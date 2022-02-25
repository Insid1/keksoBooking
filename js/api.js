import { generateMap } from './map.js';
import { showErrorGet, showErrorPOST, showSuccessServerMessage } from './util.js';
import { adFormElement } from './form-offer-constrain.js';
import { disablePage } from './disable-mode.js'

const SHOW_TIME = 3000;
const AMOUNT_OF_OFFERS = 10;

function getData() {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temporaryData = json.slice(0, AMOUNT_OF_OFFERS);
      disablePage(false);
      generateMap(temporaryData);
      return json;
    })
    .catch(err => {
      showErrorGet(err);
    });
}

function sendData(formData) {


  fetch('https://23.javascript.pages.academy/keksobooking', {
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

function onSubmitForm() {

  adFormElement.addEventListener('submit', (evt) => {
    const formData = new FormData(evt.target);
    evt.preventDefault();
    sendData(formData);
  })
}


export { getData, onSubmitForm, sendData };

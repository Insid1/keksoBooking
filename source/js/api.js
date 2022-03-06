import { renderMap } from './map.js';
import {
  showErrorGet,
  showErrorPOST,
  showSuccessServerMessage,
} from './util.js';
import { adFormElement } from './form-offer-constrain.js';
import { disablePage } from './disable-mode.js';

const SHOW_TIME = 3000;
const AMOUNT_OF_OFFERS = 10;
const SERVER_URL_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER_URL_SEND = 'https://23.javascript.pages.academy/keksobooking';

function getData() {
  return fetch(SERVER_URL_GET)
    .then((response) => response.json())
    .then((json) => {
      const temporaryData = json.slice(0, AMOUNT_OF_OFFERS);
      disablePage(false);
      renderMap(temporaryData);
      return json;
    })
    .catch((err) => {
      showErrorGet(err);
    });
}

function sendData(formData) {
  fetch(SERVER_URL_SEND, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        showSuccessServerMessage(SHOW_TIME);
        adFormElement.reset();
      } else {
        showErrorPOST(SHOW_TIME);
      }
    })
    .catch(() => {
      showErrorPOST(SHOW_TIME);
    });
}

function onSubmitForm() {
  adFormElement.addEventListener('submit', (evt) => {
    const formData = new FormData(evt.target);
    evt.preventDefault();
    sendData(formData);
  });
}

export { getData, onSubmitForm, sendData };

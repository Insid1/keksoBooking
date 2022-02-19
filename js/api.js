import { generateMap } from './map.js';
import { showErrorGet, removeElementInTime } from './util.js';
import { adFormElement } from './form-offer-constrain.js';
const page = document.querySelector('body');
const SHOW_TIME = 3000;

function showErrorPOST() {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);

  page.appendChild(errorElement);

  removeElementInTime(errorElement, SHOW_TIME);

}

function showSuccessServerMessage() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const succesElement = successMessageTemplate.cloneNode(true);

  page.appendChild(succesElement);

  removeElementInTime(succesElement, SHOW_TIME);

}

function getData() {
  fetch(
    'https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return (json.slice(0, 10));
    })
    .then(preparedData => {
      generateMap(preparedData);
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
      showSuccessServerMessage();
    } else {
      showErrorPOST();
    }
  }).catch(err => {
    showErrorPOST();
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


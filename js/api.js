import { generateMap } from './map.js';
import { giveMessageServerError } from './util.js';


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
      giveMessageServerError(err);
    });
}

export { getData };


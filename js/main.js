import { addConstrains } from './form-offer-constrain.js';
import { disablePage } from './disable-mode.js';
import { generateMap } from './map.js';
addConstrains();
disablePage();

let serverData;

fetch(
  'https://23.javascript.pages.academy/keksobooking/data'
)
  .then((response) => {
    // console.log(response);
    return response.json();
  })
  .then((json) => {
    return (json.slice(0, 10));
  })
  .then(preparedData => {
    generateMap(preparedData);
  })
  .catch(err => {
    console.log('123');
    console.log(err);
  });




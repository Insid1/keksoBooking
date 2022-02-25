import { addConstrains as addConstrainsToForm } from './form-offer-constrain.js';
import { disablePage } from './disable-mode.js';
import { getData, onSubmitForm } from './api.js';
import { applyFilter } from './filter.js';


addConstrainsToForm();
disablePage();
onSubmitForm();

getData()
  .then((response) => {
    applyFilter(response);
  })














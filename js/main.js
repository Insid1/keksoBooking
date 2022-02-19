import { addConstrains as addConstrainsToForm } from './form-offer-constrain.js';
import { disablePage } from './disable-mode.js';
import { getData , onSubmitForm } from './api.js';
addConstrainsToForm();
disablePage();
getData();

// test

onSubmitForm();













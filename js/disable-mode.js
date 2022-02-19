import { adFormElement } from './form-offer-constrain.js';
const mapFilterFormElement = document.querySelector('.map__filters');

function disablePage(bool = true) {

  function disableFormElements(form) {
    const formElements = form.children;

    for (let element of formElements) {
      element.disabled = bool;
    }
  }

  function disableForm(form) {
    const disableClass = `${form.classList[0]}--disabled`;
    if (bool) {
      form.classList.add(disableClass)
    } else {
      form.classList.remove(disableClass);
    }
  }



  // disable main ad form
  disableForm(adFormElement);
  // disable map form
  disableForm(mapFilterFormElement);

  // disable form inputElements
  disableFormElements(adFormElement);

  // disable map filter Elements
  disableFormElements(mapFilterFormElement);
}

export { disablePage }

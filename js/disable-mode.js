// 1.1. Неактивное состояние. При открытии страница находится в неактивном состоянии:
// На месте карты отображается серый прямоугольник.
// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
// Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
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


function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  // to round number up to the next largest integer
  min = Math.ceil(min);

  // to round number to less then or equal number
  max = ~~max;

  const randomFloat = Math.random();

  const randomNumber = ~~(randomFloat * (max - min + 1)) + min;
  return randomNumber;
}

// Returns you random value true or false
function trueOrFalse() {
  const checker = getRandomInt(0, 1);
  if (checker) {
    return true;
  }
  return false;
}

function getRandomFloat(min, max, numOfdecimalPlace) {
  if (min >= max) {
    return;
  }

  const randomFloat = Math.random();

  const randomNumber = (randomFloat * (max - min)) + min;
  return +randomNumber.toFixed(numOfdecimalPlace);
}

// Function that returns true if given string has
// length lower than given maximum length
function isMaximumLength(string, maxLength) {
  if (string.length > maxLength) {
    return false;
  }
  return true;
}

//Function to capitalize string's 1-st letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function that returns random element(string) from array and deletes it from array
function randomSplice(arr) {
  const randomIndex = getRandomInt(0, arr.length - 1);

  const result = arr.splice(randomIndex, 1);
  return String(result);
}

// function that return card Element created from inner template
// id of template is #card
function createCardFromTemplate() {
  const cardTemplate = document.querySelector('#card').content;
  const clonedTemplate = cardTemplate.cloneNode(true);
  const cardElement = clonedTemplate.querySelector('.popup');

  return cardElement;
}

function createElement(tag = 'div', className, text) {
  const theElement = document.createElement(tag);

  if (className) {
    theElement.classList.add(className);
  }

  if (text) {
    theElement.textContent = text;
  }

  return theElement;
}

function disableElement(element, bool = true) {
  element.disabled = bool;
}

function removeElementInTime(element, time = 1000) {
  setTimeout(() => {
    element.remove();
  }, time);
}

function showErrorGet(err, SHOW_TIME) {
  const messageErrorElement = document.querySelector('.server-error');
  const errorTextElement = createElement('p', '', err);

  messageErrorElement.appendChild(errorTextElement);
  messageErrorElement.classList.remove('hidden');


  setTimeout(() => {
    messageErrorElement.classList.add('hidden');
    messageErrorElement.lastChild.remove();

  }, SHOW_TIME);
}

function showErrorPOST(SHOW_TIME) {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);

  document.body.appendChild(errorElement);

  errorElement.addEventListener('click', () => {
    errorElement.remove();
  });

  removeElementInTime(errorElement, SHOW_TIME);

}

function showSuccessServerMessage(SHOW_TIME) {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const succesElement = successMessageTemplate.cloneNode(true);

  document.body.appendChild(succesElement);

  removeElementInTime(succesElement, SHOW_TIME);

}

function myDebounce(cb, timeout) {
  let handler;

  return () => {
    clearTimeout(handler);
    handler = setTimeout(() => {
      cb();
    }, timeout);
  };


}


export { getRandomInt, getRandomFloat, trueOrFalse, isMaximumLength, capitalizeFirstLetter, randomSplice, createCardFromTemplate, createElement, disableElement, showErrorGet, showErrorPOST, showSuccessServerMessage, myDebounce };

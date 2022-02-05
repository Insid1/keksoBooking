// ----- UTILITIES -----

// Function that returns random integer from given range
// Range can be only positive (0 is included)
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

  let randomNumber;
  let randomFloat = Math.random();

  randomNumber = ~~(randomFloat * (max - min + 1)) + min;
  return randomNumber;
}

// Returns you random value true or false
function trueOrFalse() {
  let checker = getRandomInt(0, 1)
  if (checker) {
    return true;
  }
  return false;
}

// Function that returns random floating number from given range and given number of decimal point
// Range can be only positive (0 is included)
function getRandomFloat(min, max, numOfdecimalPlace) {
  if (min >= max) {
    console.log('Given range is incorrect.')
    return;
  }

  let randomNumber;
  let randomFloat = Math.random();

  randomNumber = (randomFloat * (max - min)) + min;
  return +randomNumber.toFixed(numOfdecimalPlace);
}

// Function that returns true if given string has
// length lower than given maximum length
function isMaximumLength(string, maxLength) {
  if (string.length > maxLength) {
    return false
  }
  return true;
}

//Function to capitalize string's 1-st letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function that returns random element(string) from array and deletes it from array
function randomSplice(arr) {
  let result;
  let randomIndex = getRandomInt(0, arr.length - 1);

  result = arr.splice(randomIndex, 1)
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

// function which create HTML element with given tag, class and textContent
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


export {getRandomInt, getRandomFloat, trueOrFalse, isMaximumLength, capitalizeFirstLetter, randomSplice, createCardFromTemplate, createElement, disableElement};

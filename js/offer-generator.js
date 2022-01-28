import { hotels } from './data.js';
import { createCardFromTemplate, createElement } from './util.js';
// Константы-объекты с заглавной буквы
// Массивы в CamelCase
// Константы БОЛЬШИМИ БУКВАМИ

// test for 1 hotel;
const mapArea = document.querySelector('#map-canvas');
const currentCard = createCardFromTemplate();
const hotel = hotels[0];

function assignDataToCard(cardElement, objData) {

  // Functions
  function decideType(type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'unknown type';
    }
  }

  // returns a string as html Element to inser into code through innerHtml
  function decideFeatures(features) {

    let featuresAsString= '';

    for (let i = 0; i < features.length; i++) {
      const currentFeature = features[i];
      featuresAsString += `
        <li class="popup__feature popup__feature--${currentFeature}"></li>
      `
    }
    return featuresAsString;
  }

  function decidePhotos(photos) {
    // <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    let photosAsString = '';
    for (let i = 0; i < photos.length ; i++) {
      let currentPhotoLink = photos[i];

      photosAsString += `<img src="${currentPhotoLink}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
    }

    return photosAsString;
  }

  // assign DOM element to variables
  const elementTitle = cardElement.querySelector(
    '.popup__title');
  const elementAdress = cardElement.querySelector(
    '.popup__text--address');
  const elementPrice = cardElement.querySelector(
    '.popup__text--price');
  const elementType = cardElement.querySelector(
    '.popup__type');
  const elementCapacity = cardElement.querySelector(
    '.popup__text--capacity');
  const elementTime = cardElement.querySelector(
    '.popup__text--time');
  const elementFeatures = cardElement.querySelector(
    '.popup__features');
  const elementDescription = cardElement.querySelector(
    '.popup__description');
  const elementPhotos = cardElement.querySelector(
    '.popup__photos');
  const elementAvatar = cardElement.querySelector(
    '.popup__avatar');

  // soruse objects from data
  const authorObj = objData[0];
  const descriptionObj = objData[1];
  const locationObj = objData[2];

  // assign data to variables
  // {String}
  const avatarLink = `${authorObj.author}`;
  const title = descriptionObj.title;
  const addres = descriptionObj.addres;
  const price = descriptionObj.price;
  const checkIn = descriptionObj.checkin;
  const checkOut = descriptionObj.checkout;
  const description = descriptionObj.description;
  const guest = descriptionObj.guests;
  const room = descriptionObj.rooms;
  const type = descriptionObj.type;
  // {Array}
  const features = descriptionObj.features;
  const photos = descriptionObj.photos;

  // assign data to DOM variables
  elementTitle.textContent = title;
  elementAdress.textContent = addres;
  elementPrice.textContent = `${price} ₽/ночь`;
  elementType.textContent = decideType(type);
  elementCapacity.textContent = `${room} Комнат для ${guest} гостей`;
  elementTime.textContent = `Заезд после ${checkIn}, выезд до ${checkOut}`;
  elementFeatures.innerHTML = decideFeatures(features);
  elementDescription.textContent = description;
  elementPhotos.innerHTML = decidePhotos(photos);
  elementAvatar.src = avatarLink;

}

assignDataToCard(currentCard, hotel);
mapArea.appendChild(currentCard);




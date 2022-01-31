import { hotels } from './data.js';
import { createCardFromTemplate, createElement } from './util.js';

// data for 1 offer;
const mapArea = document.querySelector('#map-canvas');
const currentCard = createCardFromTemplate();
const hotel = hotels[0];

function renderOffer() {

  function assignDataToCard(offerElement, offerData) {

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
    function decideFeatures() {
      let featuresElement = document.createDocumentFragment();
      // create html elements
      for (let i = 0; i < features.length; i++) {
        const currentFeature = features[i];
        const currentElement = createElement('li', 'popup__feature');
        currentElement.classList.add(`popup__feature--${currentFeature}`)

        featuresElement.appendChild(currentElement);
      }
      // remove already existing elements from parent Element
      elementFeatures.innerHTML = '';
      // add new elements
      elementFeatures.appendChild(featuresElement);

    }

    function decidePhotos(photos) {
      // <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      let photosAsString = '';
      for (let i = 0; i < photos.length; i++) {
        let currentPhotoLink = photos[i];

        photosAsString += `<img src="${currentPhotoLink}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      }

      return photosAsString;
    }

    // assign DOM element to variables
    const elementTitle = offerElement.querySelector(
      '.popup__title');
    const elementAdress = offerElement.querySelector(
      '.popup__text--address');
    const elementPrice = offerElement.querySelector(
      '.popup__text--price');
    const elementType = offerElement.querySelector(
      '.popup__type');
    const elementCapacity = offerElement.querySelector(
      '.popup__text--capacity');
    const elementTime = offerElement.querySelector(
      '.popup__text--time');
    const elementFeatures = offerElement.querySelector(
      '.popup__features');
    const elementDescription = offerElement.querySelector(
      '.popup__description');
    const elementPhotos = offerElement.querySelector(
      '.popup__photos');
    const elementAvatar = offerElement.querySelector(
      '.popup__avatar');

    // source objects from data (destructurizing)
    const [authorObj, descriptionObj] = offerData;

    // assign data to variables
    const avatarLink = authorObj.author;
    const {
      // Strings:
      title,
      addres,
      price,
      checkin,
      checkout,
      description,
      guests,
      rooms,
      type,
      // Arrays:
      features,
      photos
    } = descriptionObj;

    // assign data to DOM variables
    elementTitle.textContent = title;
    elementAdress.textContent = addres;
    elementPrice.textContent = `${price} ₽/ночь`;
    elementType.textContent = decideType(type);
    elementCapacity.textContent = `${rooms} Комнат для ${guests} гостей`;
    elementTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    elementDescription.textContent = description;
    elementPhotos.innerHTML = decidePhotos(photos);
    elementAvatar.src = avatarLink;
    decideFeatures();

  }

  assignDataToCard(currentCard, hotel);
  mapArea.appendChild(currentCard);
}

export {renderOffer};





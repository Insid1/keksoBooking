import {getRandomInt, getRandomFloat, trueOrFalse, randomSplice} from './util.js';
// create array with links to avatar photos

const DECIMALS_FOR_COORD = 5;
const AMOUNT_OF_HOTELS = 10;

const LocationCordRange = {
  MIN: 0,
  MAX: 150,
};
const Price = {
  MIN: 0,
  MAX: 1000000,
};
const Rooms = {
  MIN: 1,
  MAX: 10,
};
const Guests = {
  MIN: 1,
  MAX: 20,
};
const XRangeCord = {
  MIN: 35.65,
  MAX: 35.7,
};
const YRangeCord = {
  MIN: 139.7,
  MAX: 139.8,
};
const hotelTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const timeGaps = [
  '12:00',
  '13:00',
  '14:00',
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const photoLinks = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


const createAvatarLinks = function () {
  const links = [];
  const avatarPath = 'img/avatars/user';
  const imgFormat = 'png';

  // create an array with avatarLinks
  for (let i = 1; i <= 10; i++) {
    if (i < 10) {
      links.push(`${avatarPath  }0${  i  }.${  imgFormat}`);
    } else {
      links.push(`${avatarPath + i  }.${  imgFormat}`);
    }
  }
  return links;
};
// function to create object where key is 'author' and value is link of random avatar
const avatarLinks = createAvatarLinks();
function createAuthorDescription() {
  const result = {};

  const randomLink = randomSplice(avatarLinks);
  result.author = randomLink;
  return result;
}

// functiom that creates Offer (return object) with keys presented inside and specific values that are aslo presented inside
function createOffer() {
  const Offer = {};

  function getRandomLocation() {
    const result = `${getRandomFloat(LocationCordRange.MIN, LocationCordRange.MAX, DECIMALS_FOR_COORD)} ${getRandomFloat(LocationCordRange.MIN, LocationCordRange.MAX, DECIMALS_FOR_COORD)}`;

    return result;
  }

  function createRandomPrice() {
    return getRandomInt(Price.MIN, Price.MAX);
  }

  function getRandomHotelType() {
    return hotelTypes[getRandomInt(0, hotelTypes.length - 1)];
  }

  function getRandomNumOfRooms() {
    return getRandomInt(Rooms.MIN, Rooms.MAX);
  }

  function getRandomNumOfGuests() {
    return getRandomInt(Guests.MIN, Guests.MAX);
  }

  function getCheckInOutTime() {
    return timeGaps[getRandomInt(0, timeGaps.length - 1)];
  }

  function getRandomFeatures() {
    const newFeatures = [];

    for (let i = 0; i < features.length; i++) {
      if (trueOrFalse()) {
        newFeatures.push(features[i]);
      }
    }
    return newFeatures;
  }

  function getRandomPhotos() {
    const randomPhotos = [];


    for (let i = 1; i < photoLinks.length; i++) {
      if (trueOrFalse()) {
        randomPhotos.push(photoLinks[i]);
      }
    }
    return randomPhotos;
  }

  Offer.title = 'Заголовок для предложения, который придуман самостоятельно';
  Offer.addres = getRandomLocation();
  Offer.price = createRandomPrice();
  Offer.type = getRandomHotelType();
  Offer.rooms = getRandomNumOfRooms();
  Offer.guests = getRandomNumOfGuests();
  Offer.checkin = getCheckInOutTime();
  Offer.checkout = getCheckInOutTime();
  Offer.features = getRandomFeatures();
  Offer.description = 'Описание помещений придуманное самостоятельно!';
  Offer.photos = getRandomPhotos();

  return Offer;
}

function createLocation() {
  const Location = {};

  function getRandomX() {
    return getRandomFloat(XRangeCord.MIN, XRangeCord.MAX, DECIMALS_FOR_COORD);
  }

  function getRandomY() {
    return getRandomFloat(YRangeCord.MIN, YRangeCord.MAX, DECIMALS_FOR_COORD);
  }

  Location.x = getRandomX();
  Location.y = getRandomY();

  return Location;
}

const hotels = new Array(AMOUNT_OF_HOTELS).fill(null).map(() => [createAuthorDescription(), createOffer(), createLocation()]);

export {hotels};

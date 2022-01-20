import {getRandomInt, getRandomFloat, trueOrFalse, isMaximumLength, capitalizeFirstLetter, randomSplice} from './util.js';
// create array with links to avatar photos

const HOTEL_COUNT = 10;
const DECIMALS_FOR_COORD = 5;
const AMOUNT_OF_HOTELS = 10;

const LocationCordRange = {
  MIN: 0,
  MAX: 150,
}
const Price = {
  MIN: 3000,
  MAX: 15000,
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
]


const createAvatarLinks = function () {
  let avatarLinks = [];
  let avatarPath = 'img/avatars/user';
  let imgFormat = 'png';

  // create an array with avatarLinks
  for (let i = 1; i <= 10; i++) {
    if (i < 10) {
      avatarLinks.push(avatarPath + '0' + i + imgFormat);
    } else {
      avatarLinks.push(avatarPath + i + imgFormat);
    }
  }
  return avatarLinks;
};
// function to create object where key is 'author' and value is link of random avatar
let avatarLinks = createAvatarLinks();
function createAuthorDescription() {
  const result = {};

  let randomLink = randomSplice(avatarLinks);
  result.author = randomLink;
  return result;
}

// functiom that creates Offer (return object) with keys presented inside and specific values that are aslo presented inside
function createOffer() {
  let Offer = {};

  function getRandomLocation() {
    let result;

    result = `${getRandomFloat(LocationCordRange.MIN, LocationCordRange.MAX, DECIMALS_FOR_COORD)} ${getRandomFloat(LocationCordRange.MIN, LocationCordRange.MAX, DECIMALS_FOR_COORD)}`;

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
    let newFeatures = [];

    for (let i = 0; i < features.length; i++) {
      if (trueOrFalse()) {
        newFeatures.push(features[i]);
      }
    }
    return newFeatures;
  }

  function getRandomPhotos() {
    let randomPhotos = []
    randomPhotos.push(photoLinks[getRandomInt(0, photoLinks.length - 1)]);

    for (let i = 1; i < photoLinks.length; i++) {
      if (trueOrFalse()) {
        randomPhotos.push(photoLinks[i]);
      }
    }
    return randomPhotos
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

const hotels = new Array(AMOUNT_OF_HOTELS).fill(null).map(() => {
  return [createAuthorDescription(), createOffer(), createLocation()];
});

export {hotels};

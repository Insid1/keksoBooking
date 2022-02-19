const adressElement = document.querySelector('#address');
// import { hotels } from './data.js';
import { createOfferElements } from './offer.js';
import { disablePage } from './disable-mode.js';

// constants
const CityCoords = {
  tokyo: [35.68974, 139.75393],
};
const ZOOM = 14;
const GENERAL_ICON_SIZE = 40 // px
const MAIN_ICON_SIZE = 52 // px

// Map
const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована!')
  })
  .setView({
    lat: CityCoords.tokyo[0],
    lng: CityCoords.tokyo[1],
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


// sub Functions
function getMarkerCoordinates(marker) {
  const lat = marker._latlng.lat.toFixed(5);
  const lng = marker._latlng.lng.toFixed(5);

  return [lat, lng];
};

function generateMarker(coords, icon = generalIcon, drag = false) {
  const marker = L.marker(
    coords, {
    icon: icon,
    draggable: drag,
  })

  // add marker to map
  marker.addTo(map);
  return marker;
}

function fillAdress(element = adressElement) {

  function asignAdress(coordinates) {
    element.value = coordinates.join(' ');
  }

  const coordinates = getMarkerCoordinates(mainMarker);
  // fill the adress field with coordinates
  asignAdress(coordinates);
}

// Icons
const generalIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [GENERAL_ICON_SIZE, GENERAL_ICON_SIZE],
  iconAnchor: [GENERAL_ICON_SIZE / 2, GENERAL_ICON_SIZE],
});
const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
  iconAnchor: [MAIN_ICON_SIZE / 2, MAIN_ICON_SIZE],
});

// Markers
const mainMarker = generateMarker(CityCoords.tokyo, mainIcon, true);

// main function
function generateMap(hotels) {
  const offerElements = createOfferElements(hotels);

  function addSimpleMarkers() {
    hotels.forEach((currentOffer, index) => {
      const currentOfferElement = offerElements[index];

      // create coord arr of current data element
      const coord = [currentOffer['location'].lat, currentOffer['location'].lng];
      const marker = generateMarker(coord);
      marker.bindPopup(currentOfferElement);
    })

  }

  // fill adress area with coords of main marker
  fillAdress();

  // Events
  mainMarker.on('moveend', (evt) => {
    fillAdress();
  })
  // add simple marks
  addSimpleMarkers();
  // turn off disable mode
  disablePage(false);
}

export { generateMap, fillAdress }





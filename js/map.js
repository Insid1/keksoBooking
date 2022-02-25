const adressElement = document.querySelector('#address');
import { createOfferElements } from './offer.js';

// constants
const CityCoords = {
  TOKYO: [35.68974, 139.75393],
};
const ZOOM = 14;
const GENERAL_ICON_SIZE = 40 // px
const MAIN_ICON_SIZE = 52 // px
const MAX_HOTEL_NUM = 10;
let previousMarkers = L.layerGroup();

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

function createMap() {
  const map = L.map('map-canvas')
    .on('load', () => {
      console.log('Карта инициализирована!')
    })
    .setView({
      lat: CityCoords.TOKYO[0],
      lng: CityCoords.TOKYO[1],
    }, ZOOM);

  // Load map layer to initialized map
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map);

  return map
}

function getMarkerCoordinates(marker) {
  const lat = marker._latlng.lat.toFixed(5);
  const lng = marker._latlng.lng.toFixed(5);

  return [lat, lng];
};

function createMarker(coords, icon = generalIcon, drag = false) {
  const marker = L.marker(
    coords, {
    icon: icon,
    draggable: drag,
  })

  return marker;
}

function generateGeneralMarkers(hotels) {
  const offerElements = createOfferElements(hotels);
  const markers = [];

  hotels.forEach((currentOffer, index) => {
    const currentOfferElement = offerElements[index];

    // create coord arr of current data element
    const coord = [currentOffer['location'].lat, currentOffer['location'].lng];
    const marker = createMarker(coord);
    marker.bindPopup(currentOfferElement);
    markers.push(marker);
  })
  return markers;

}

function fillAdress(element = adressElement) {
  function asignAdress(coordinates) {
    element.value = coordinates.join(' ');
  }

  const coordinates = getMarkerCoordinates(mainMarker);
  // fill the adress field with coordinates
  asignAdress(coordinates);
}

const map = createMap();
const mainMarker = createMarker(CityCoords.TOKYO, mainIcon, true);
mainMarker.addTo(map);
mainMarker.on('moveend', () => {
  fillAdress();
})

// main function
function generateMap(hotels) {
  previousMarkers.removeFrom(map);
  const maximumHotels = hotels.slice(0, MAX_HOTEL_NUM);
  const generalMarkers = L.layerGroup(generateGeneralMarkers(maximumHotels));
  generalMarkers.addTo(map);
  // store markers to delete them after function call
  previousMarkers = generalMarkers;
  // fill adress area with coords of main marker
  fillAdress();
}

export { generateMap, fillAdress }

const adressElement = document.querySelector('#address');
// import { hotels } from './data.js';
import { createOfferElements } from './offer.js';
import { disablePage } from './disable-mode.js';

function generateMap(hotels) {

  // constants
  const CityCoords = {
    tokyo: [35.68974, 139.75393],
  };
  const ZOOM = 14;
  const offerElements = createOfferElements(hotels);
  const generalIconSize = 40 // px
  const mainIconSize = 52 // px

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


  // Functions
  function getMarkerCoordinates(marker) {
    const lat = marker._latlng.lat.toFixed(5);
    const lng = marker._latlng.lng.toFixed(5);

    return [lat, lng];
  };

  function fillAdress(element = adressElement) {

    function asignAdress(coordinates) {
      element.value = coordinates.join(' ');
    }

    const coordinates = getMarkerCoordinates(mainMarker);
    // fill the adress field with coordinates
    asignAdress(coordinates);
  }

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

  function addSimpleMarkers() {
    hotels.forEach((currentOffer, index) => {
      const currentOfferElement = offerElements[index];

      // create coord arr of current data element
      const coord = [currentOffer['location'].lat, currentOffer['location'].lng];
      const marker = generateMarker(coord);
      marker.bindPopup(currentOfferElement);
    })

  }

  // Icons
  const generalIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [generalIconSize, generalIconSize],
    iconAnchor: [generalIconSize / 2, generalIconSize],
  });
  const mainIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [mainIconSize, mainIconSize],
    iconAnchor: [mainIconSize / 2, mainIconSize],
  });

  // Markers
  const mainMarker = generateMarker(CityCoords.tokyo, mainIcon, true);

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

export { generateMap }





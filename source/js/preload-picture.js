import {createElement} from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PICTURE_WIDTH = 70;
const PICTURE_HEIGHT = 70;
const PICTURE_RADIUS = 70;
const avatarChooserElement = document.querySelector('#avatar');
const avatarFieldElement = document.querySelector('.ad-form-header__preview');
const hotelChooserElement = document.querySelector('#images');
const hotelFieldElement = document.querySelector('.ad-form__photo');

function renderImgInField(field, chooser) {

  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imgElement = createElement('img');
        imgElement.src = reader.result;
        imgElement.widht = PICTURE_WIDTH;
        imgElement.height = PICTURE_HEIGHT;
        imgElement.borderRadius = PICTURE_RADIUS;
        field.innerHTML = '';
        field.appendChild(imgElement);

      });
      reader.readAsDataURL(file);
    }
  });

}

function applyPreloadingPictures(){
  renderImgInField(avatarFieldElement, avatarChooserElement);
  renderImgInField(hotelFieldElement, hotelChooserElement);
}

export { applyPreloadingPictures };


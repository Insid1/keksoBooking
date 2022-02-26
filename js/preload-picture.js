import {createElement} from './util.js'


const avatarChooserElement = document.querySelector('#avatar');
const avatarFieldElement = document.querySelector('.ad-form-header__preview');
const hotelChooserElement = document.querySelector('#images');
const hotelFieldElement = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function renderImgInField(field, chooser) {

  chooser.addEventListener('change', (evt) => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imgElement = createElement('img');
        imgElement.src = reader.result;
        imgElement.widht = 70;
        imgElement.height = 70;
        imgElement.borderRadius = 15;
        field.innerHTML = '';
        field.appendChild(imgElement);

      })
      reader.readAsDataURL(file)
    }
  })

}

renderImgInField(avatarFieldElement, avatarChooserElement);
renderImgInField(hotelFieldElement, hotelChooserElement);

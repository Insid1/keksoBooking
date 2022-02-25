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
        // console.log(reader.result);
        field.innerHTML = `<img src="${reader.result}"></img>`;
      })
      reader.readAsDataURL(file)
    }
  })

}

renderImgInField(avatarFieldElement, avatarChooserElement);
renderImgInField(hotelFieldElement, hotelChooserElement);

// console.log(avatarChooserElement);
// console.log(avatarFieldElement);

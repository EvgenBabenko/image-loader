import Gallery from './Components/Gallery';
import './main.css';

const addImageButton = document.getElementById('addImage');
const removeImageButton = document.getElementById('removeImage');
const inputFiels = document.getElementById('inputFiels');
const imagesContainer = document.getElementById('images');

const gallery = new Gallery(imagesContainer, []);

let clickedImageID = null;

const handleAddImage = () => {
  if (!inputFiels.value) return;

  gallery.add(inputFiels.value);

  inputFiels.value = '';
};

const handleRemoveImage = () => {
  if (!clickedImageID) return;

  gallery.remove(clickedImageID);

  clickedImageID = null;
};

const handleClickImage = ({ target, currentTarget }) => {
  if (target.tagName !== 'CANVAS') return;

  if (currentTarget.querySelector('.active')) {
    currentTarget.querySelector('.active').classList.remove('active');
  }

  target.classList.add('active');

  clickedImageID = parseInt(target.id, 10);
};

addImageButton.addEventListener('click', handleAddImage);

removeImageButton.addEventListener('click', handleRemoveImage);

imagesContainer.addEventListener('click', handleClickImage);

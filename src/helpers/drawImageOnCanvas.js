export default (imagesContainer, index, image) => {
  const canvas = imagesContainer.children[index];
  const context = canvas.getContext('2d');

  const newImage = new Image();

  newImage.onload = () => context.drawImage(newImage, 0, 0);

  newImage.src = image.binaryData;
};

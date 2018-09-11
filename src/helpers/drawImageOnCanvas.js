export default (node, image) => {
  const context = node.getContext('2d');

  const newImage = new Image();

  newImage.onload = () => context.drawImage(newImage, 0, 0);

  newImage.src = image.binaryData;
};

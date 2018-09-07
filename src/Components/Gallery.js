import toDataURL from '../helpers/toDataURL';
import drawImageOnCanvas from '../helpers/drawImageOnCanvas';
import createNode from '../helpers/createNode';

export default class Gallery {
  constructor(galleryNode, images) {
    this.galleryNode = galleryNode;
    this.images = images;
  }

  async add(imageUrl) {
    try {
      const binaryData = await toDataURL(imageUrl);

      this.images.push({
        id: Date.now(),
        binaryData,
      });

      console.log(1, this.images);

      this.buildGallery(this.images);
    } catch (error) {
      console.error(error);
    }
  }

  remove(id) {
    const index = this.images.findIndex(image => image.id === id);

    this.images.splice(index, 1);

    this.buildGallery(this.images);
  }

  clearGallery() {
    this.galleryNode.innerHTML = '';
  }

  buildGallery(images) {
    console.log(2);
    this.clearGallery();

    images.forEach((image, index) => {
      this.buildGalleryItem(image);

      drawImageOnCanvas(this.galleryNode, index, image);
    });
  }

  buildGalleryItem(item) {
    // const image = createNode('img', { id: item.id, src: item.imageUrl });
    const canvas = createNode('canvas', { id: item.id });

    this.galleryNode.appendChild(canvas);
  }
}

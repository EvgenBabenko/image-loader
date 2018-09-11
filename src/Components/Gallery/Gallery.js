import Ractive from 'ractive/ractive.js';

import template from './Gallery.ractive';
import toDataURL from '../../helpers/toDataURL';
import images from './partials/images.ractive';
import Image from './Components/Image/Image';

const data = {
  greeting: 'Hello',
  name: 'Ractive',
  input: null,
  inputNode: null,
  clickedImageIndex: null,
  images: [],
};

const Gallery = Ractive.extend({
  template,
  data: () => data,

  partials: {
    images,
  },
  components: {
    Image,
  },

  addImage: async function (imageUrl) {
    this.push('images', {
      id: Date.now(),
      binaryData: await toDataURL(imageUrl),
    });
  },

  removeImage: function (index) {
    this.splice('images', index, 1);
  },

  on: {
    handleChangeInput: function (context) {
      this.set('input', context.node.value);
      this.set('inputNode', context);
    },

    handleAddImage: function () {
      const input = this.get('input');

      if (!input) return;

      this.addImage(input);

      const inputNode = this.get('inputNode');
      inputNode.node.value = '';
      inputNode.node.focus();
    },

    handleRemoveImage: function () {
      const clickedImageIndex = this.get('clickedImageIndex');

      if (clickedImageIndex === null) return;

      this.removeImage(clickedImageIndex);

      this.set('clickedImageIndex', null);
    },

    handleRemoveAllImage: function () {
      this.set('images', []);
      this.set('clickedImageIndex', null);
    },
  },
});

export default Gallery;

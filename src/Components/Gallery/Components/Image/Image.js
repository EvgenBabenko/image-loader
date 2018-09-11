import Ractive from 'ractive/ractive.js';

import template from './Image.ractive';
import drawImageOnCanvas from '../../../../helpers/drawImageOnCanvas';

const Image = Ractive.extend({
  template,
  data: () => ({
    image: {},
    selected: false,
  }),

  onrender: function () {
    const image = this.get('image');
    const node = this.find('canvas');

    drawImageOnCanvas(node, image);
  },

  on: {
    handleClickImage: function (ctx, index) {
      this.parent.set('clickedImageIndex', index);
    },
  },
});

export default Image;

import Ractive from 'ractive/ractive.js';

import template from './Image.ractive';
import drawImageOnCanvas from '../../../../helpers/drawImageOnCanvas';

const Image = Ractive.extend({
  template,
  data: () => ({
    image: {},
  }),

  onrender: function () {
    const image = this.get('image');
    const node = this.find('canvas');

    drawImageOnCanvas(node, image);
  },

  on: {
    handleClickImage: function (context, index) {
      this.parent.set('clickedImageIndex', index);

      const activeElement = this.parent.find('.active');

      if (activeElement) {
        activeElement.classList.remove('active');
      }

      context.node.classList.add('active');
    },
  },
});

export default Image;

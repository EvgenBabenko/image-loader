const makeRequest = (method, url, responseType = 'text') => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.responseType = responseType;

  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(xhr.response);
    } else {
      reject(xhr.statusText);
    }
  };

  xhr.onerror = error => reject(error);

  xhr.send();
});

const toDataResponse = response => new Promise((resolve, reject) => {
  const fileReader = new FileReader();

  fileReader.onload = () => resolve(fileReader.result);

  fileReader.onerror = error => reject(error);

  fileReader.readAsDataURL(response);
});

const toDataURL = async (url) => {
  const response = await makeRequest('get', url, 'blob');

  const binaryData = await toDataResponse(response);

  console.log(binaryData);

  return binaryData;
};

const drawImageOnCanvas = (node, image) => {
  // const canvas = imagesContainer.children[index];
  // const canvas = document.getElementById(`${image.id}`);

  const context = node.getContext('2d');

  const newImage = new Image();

  newImage.onload = () => context.drawImage(newImage, 0, 0);

  newImage.src = image.binaryData;
};

const data = {
  greeting: 'Hello',
  name: 'Ractive',
  input: null,
  clickedImageIndex: null,
  images: [],
};

const imageComponent = Ractive.extend({
  template: '#image',
  isolated: true,
  data: () => ({
    image: {},
    index: null,
    selected: false,
  }),
  onrender: () => {
  },
  oninit: () => {
  },
  oncomplete: () => {
  },
  on: {
    handleClickImage: (ctx, index, node, image) => {
      ractive.set('clickedImageIndex', index);

      console.log('handleClick', index, node, image);

      drawImageOnCanvas(node, image);
    },
  },
});

const imagesComponent = Ractive.extend({
  isolated: true,
  template: '#images',
  data: () => ({
    images: [],
  }),
  components: {
    image: imageComponent,
  },
});

const ractive = new Ractive({
  target: '#target',
  template: '#template',
  data,
  components: {
    images: imagesComponent,
  },
  addImage: async (imageUrl) => {
    const binaryData = await toDataURL(imageUrl);

    ractive.push('images', {
      id: Date.now(),
      binaryData,
    });
  },
  removeImage: (index) => {
    ractive.splice('images', index, 1);
  },

  on: {
    handleChangeInput: (context) => {
      ractive.set('input', context.node.value);
    },
    handleAddImage: () => {
      const input = ractive.get('input');

      if (!input) return;

      ractive.addImage(input);
    },
    handleRemoveImage: () => {
      const clickedImageIndex = ractive.get('clickedImageIndex');

      if (clickedImageIndex === null) return;

      ractive.removeImage(clickedImageIndex);

      ractive.set('clickedImageIndex', null);
    },
  },
});

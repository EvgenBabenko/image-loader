import Ractive from 'ractive/ractive.js';

import Gallery from './Components/Gallery/Gallery';
import template from './layout.ractive';
import './main.css';

const ractive = new Ractive({
  target: '#root',
  template,
  components: {
    Gallery,
  },
});

export default ractive;

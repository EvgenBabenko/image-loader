export default (tag, props, ...children) => {
  const element = document.createElement(tag);

  Object.keys(props).forEach((key) => {
    element[key] = props[key];
  });

  children.forEach((value) => {
    let child;

    if (!value) return;

    if (typeof value === 'string') {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
};

export default (method, url, responseType = 'text') => new Promise((resolve, reject) => {
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

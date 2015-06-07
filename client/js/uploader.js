function Uploader(content, contentType, callbacks, outputDOMElement) {
  'use strict';

  var xhrUpload = null;

  this.upload = function f() {

    xhrUpload = new XMLHttpRequest();

    xhrUpload.onreadystatechange = function() {
      if (this.readyState != 4) {
        return;
      }

      if (this.status != 200) {
        outputDOMElement.innerHTML = 'Ошибка при передаче данных';
        return;
      }

      outputDOMElement.innerHTML = 'Данные успешно переданы';
    };

    xhrUpload.open('POST', '/upload');
    xhrUpload.setRequestHeader('Content-Type', contentType);
    xhrUpload.send(content);
  };
}

"use strict";

function search () {
  var request = new XMLHttpRequest();
  var urlApi = "https://api.taiga.io/api/v1/issues";

  request.open('GET', urlApi, true);

  request.onload = function() {
        if (request.status >= 200 && request.status < 400) {

        } else {

        }
  };

  request.onerror = function() {

  };
  request.send();
}

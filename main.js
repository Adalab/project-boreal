"use strict";

function search () {
  var request = new XMLHttpRequest();
  var urlApi = "https://api.taiga.io/api/v1/issues";

  request.open('GET', urlApi, true);

  request.onload = function() {
  };

  request.onerror = function() {

  };
  request.send();
}

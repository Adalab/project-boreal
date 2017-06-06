"use strict";
var inputProject = document.querySelector(".js-input-slug");
var searchBtn = document.querySelector(".js-btn-search");

function getIssuesData () {
  var request = new XMLHttpRequest();
  var slugName = inputProject.value;
  var urlApiProject = "https://api.taiga.io/api/v1/projects/by_slug?slug=";
  urlApiProject = urlApiProject + slugName;

  request.open('GET', urlApiProject, true);

  request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            var projectId = data.id;
            var urlApiIssues = "https://api.taiga.io/api/v1/issues?project=";
            urlApiIssues = urlApiIssues + projectId;
        } else {

        }
  };

  request.onerror = function() {

  };
  request.send();
}

searchBtn.addEventListener('click', getIssuesData);

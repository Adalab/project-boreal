"use strict";
var inputProject = document.querySelector(".js-input-slug");
var searchBtn = document.querySelector(".js-btn-search");
var ramon = document.querySelector(".js-results");

function getIssuesData() {
  var requestProjectId = new XMLHttpRequest();
  var slugName = inputProject.value;
  var urlApiProject = "https://api.taiga.io/api/v1/projects/by_slug?slug=";
  urlApiProject = urlApiProject + slugName;

  requestProjectId.open('GET', urlApiProject, true);

  requestProjectId.onload = function() {
    if (requestProjectId.status >= 200 && requestProjectId.status < 400) {
      var dataProject = JSON.parse(requestProjectId.responseText);
      var projectId = dataProject.id;
      var urlApiIssues = "https://api.taiga.io/api/v1/projects/" + projectId + "/issues_stats";
      console.log(urlApiIssues);
      var requestProjectIssues = new XMLHttpRequest();
      requestProjectIssues.open('GET', urlApiIssues, true);
      requestProjectIssues.onload = function() {
        if (requestProjectIssues.status >= 200 && requestProjectIssues.status < 400) {
          var dataIssues = JSON.parse(requestProjectIssues.responseText);
          var priorities;
          var countLowPriorities;
          var countNormalPriorities;
          var countHighPriorities;

          for (var key in dataIssues.issues_per_priority) {
            priorities = dataIssues.issues_per_priority[key];
            if (priorities.name === "Low") {
              countLowPriorities = priorities.count;
            } else if (priorities.name === "Normal") {
              countNormalPriorities = priorities.count;
            } else if (priorities.name === "High") {
              countHighPriorities = priorities.count;
            }

          }
          console.log(countHighPriorities,countNormalPriorities,countLowPriorities);
        } else {

        }
      };
      requestProjectIssues.onerror = function() {
      };
      requestProjectIssues.send();
    } else {

    }
  };

  requestProjectId.onerror = function() {};
  requestProjectId.send();
}

searchBtn.addEventListener('click', getIssuesData);

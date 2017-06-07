"use strict";
var inputProject = document.querySelector(".js-input-slug");
var searchBtn = document.querySelector(".js-btn-search");
//var ramon = document.querySelector(".js-results");

// Main function
function getIssuesData() {
  //Access API to get ID of the project by slug
  var requestProjectId = new XMLHttpRequest();
  var slugName = inputProject.value;
  var urlApiProject = "https://api.taiga.io/api/v1/projects/by_slug?slug=";
  urlApiProject = urlApiProject + slugName;

  requestProjectId.open('GET', urlApiProject, true);

  // Function to get issues stats
  requestProjectId.onload = function() {
    if (requestProjectId.status >= 200 && requestProjectId.status < 400) {
      // Access API to get the issues stats
      var dataProject = JSON.parse(requestProjectId.responseText);
      var projectId = dataProject.id;
      var urlApiIssues = "https://api.taiga.io/api/v1/projects/" + projectId + "/issues_stats";
      console.log(urlApiIssues);
      var requestProjectIssues = new XMLHttpRequest();
      requestProjectIssues.open('GET', urlApiIssues, true);
      requestProjectIssues.onload = function() {
        if (requestProjectIssues.status >= 200 && requestProjectIssues.status < 400) {
          var dataIssues = JSON.parse(requestProjectIssues.responseText);
          //Iter JSON propieties to get the amount of issues per priority
          var priorities;
          var countLowPriorities = 0;
          var countNormalPriorities = 0;
          var countHighPriorities = 0;

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
          console.log("Low priorities: " + countLowPriorities, " Normal priorities: " + countNormalPriorities, " High priorities: " +countHighPriorities);
        //(PIntar gráfico)

        //Get data of opended, closed and total issues
          var openedIssues = 0;
          var closedIssues = 0;
          var totalIssues = 0;
          openedIssues = dataIssues.opened_issues;
          closedIssues = dataIssues.closed_issues;
          totalIssues = dataIssues.total_issues;
          console.log("Opened issues: " + openedIssues, "Closed issues: " + closedIssues, "Total issues: " + totalIssues);
        //(pintar gráfico)

        //Get data of not assigned issues.
          var notAssignedIssues = 0;
          notAssignedIssues = dataIssues.issues_per_assigned_to["0"].count;
          console.log("Issues not assigned :" + notAssignedIssues);

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

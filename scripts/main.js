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
          //Priorities chart
          var ctxPriority = document.getElementById("js-priorityChart");
          Chart.defaults.global.maintainAspectRatio = false;
          var priorityChart = new Chart(ctxPriority, {
            type: 'polarArea',
            data:{
              labels: [ "High Priority", "Normal Priority", "Low Priority"],
              datasets: [{
                label: '# of Priority',
                data: [countHighPriorities, countNormalPriorities, countLowPriorities],
                backgroundColor: [

                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
          });

        //Get data of opended, closed and total issues.
          var openIssues = 0;
          var closedIssues = 0;
          var totalIssues = 0;
          openIssues = dataIssues.open_issues;
          closedIssues = dataIssues.closed_issues;
          totalIssues = dataIssues.total_issues;
          console.log("Open issues: " + openIssues, "Closed issues: " + closedIssues, "Total issues: " + totalIssues);

        // Get data of open issues per status
        var status;
        var readyForTestIssues = 0;
        var newIssues = 0;
        var inProgressIssues = 0;
        var needsInfoIssues = 0;
        for (var key in dataIssues.issues_per_status) {
          status = dataIssues.issues_per_status[key];
          if (status.name === "Ready for test") {
            readyForTestIssues = status.count;
          } else if (status.name === "New") {
            newIssues = status.count;
          } else if (status.name === "In progress") {
            inProgressIssues = status.count;
          } else if (status.name === "Needs Info") {
            needsInfoIssues = status.count;
          }
        }
          console.log("listos para test: " + readyForTestIssues, "New :" + newIssues, "in progress Issues: " + inProgressIssues, "needs info issues. " + needsInfoIssues);

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

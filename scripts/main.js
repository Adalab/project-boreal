"use strict";

/* global Chart */

var inputProject = document.querySelector(".js-input-slug");
var searchBtn = document.querySelector(".js-btn-search");
//var ramon = document.querySelector(".js-results");

function getPriorityData(dataIssues) {
  var prioritiesCount = {
    low: 0,
    normal: 0,
    high: 0
  };

  for (var key in dataIssues.issues_per_priority) {
    var prioritiesData = dataIssues.issues_per_priority[key];
    if (prioritiesData.name === "Low") {
      prioritiesCount.low = prioritiesData.count;
    } else if (prioritiesData.name === "Normal") {
      prioritiesCount.normal = prioritiesData.count;
    } else if (prioritiesData.name === "High") {
      prioritiesCount.high = prioritiesData.count;
    }

  }
  console.log(
    "Low priorities: " + prioritiesCount.low,
    " Normal priorities: " + prioritiesCount.normal,
    " High priorities: " +prioritiesCount.high
  );

  return prioritiesCount;
}

function printPrioritiesChart(prioritiesCount) {

  var ctxPriority = document.getElementById("js-priorityChart");

  Chart.defaults.global.maintainAspectRatio = false;
  var priorityChart = new Chart(ctxPriority, {
    type: 'polarArea',
    data:{
      labels: [ "High Priority", "Normal Priority", "Low Priority"],
      datasets: [{
        label: '# of Priority',
        data: [prioritiesCount.high, prioritiesCount.normal, prioritiesCount.low],
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
}

function getSeverityData(dataIssues){
  var severityCount = {
   wishlist:0,
   minor:0,
   normal:0,
   important:0,
   critical:0
 };
  for (var key in dataIssues.issues_per_severity) {
     var severityData = dataIssues.issues_per_severity[key];
    if (severityData.name === "Wishlist") {
      severityCount.wishlist = severityData.count;
    } else if (severityData.name === "Minor") {
      severityCount.minor = severityData.count;
    } else if (severityData.name === "Normal") {
      severityCount.normal = severityData.count;
    } else if (severityData.name === "Important") {
      severityCount.important = severityData.count;
    } else if (severityData.name === "Critical") {
      severityCount.critical = severityData.count;
    }
  }
  console.log(
    "Wishlist: " + severityCount.wishlist,
    "Minor: " + severityCount.minor,
    "Normal: " + severityCount.normal,
    "Important: " + severityCount.important,
    "critical issues :" + severityCount.critical
  );
  return severityCount;
}

//(Pintar gráfico)

function getOpenClosedData(dataIssues) {
    var closedIssues = 0;
    var openIssues = {
      readyForTest: 0,
      new: 0,
      inProgress: 0,
      needsInfo: 0
    };
    closedIssues = dataIssues.closed_issues;
    for (var key in dataIssues.issues_per_status) {
      var statusData = dataIssues.issues_per_status[key];
      if (statusData.name === "Ready for test") {
        openIssues.readyForTest = statusData.count;
      } else if (statusData.name === "New") {
        openIssues.new = statusData.count;
      } else if (statusData.name === "In progress") {
        openIssues.inProgress = statusData.count;
      } else if (statusData.name === "Needs Info") {
        openIssues.needsInfo = statusData.count;
      }
    }
    console.log(
      "Closed issues: " + closedIssues,
      "listos para test: " + openIssues.readyForTest,
      "New :" + openIssues.new,
      "in progress Issues: " + openIssues.inProgress,
      "needs info issues. " + openIssues.needsInfo
    );
    return [openIssues, closedIssues];
}
//Pintar gráfica open closed

function getNotAssignedData(dataIssues) {
  var notAssignedIssues = 0;
  notAssignedIssues = dataIssues.issues_per_assigned_to["0"].count;
  console.log("Issues not assigned :" + notAssignedIssues);
}
//Pintar con innerHTML

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

          var prioritiesCount = getPriorityData(dataIssues);
          printPrioritiesChart(prioritiesCount);
          var severityCount= getSeverityData(dataIssues);
          //debe ir printSeverityChart(severityCount);
          var openClosedCount = getOpenClosedData(dataIssues);
          //debe it printOpenClosedChart(openClosedCount);
          var notAssignedCount = getNotAssignedData(dataIssues);
          //debe pintarse con innerHTML;

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

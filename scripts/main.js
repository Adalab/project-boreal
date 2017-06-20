"use strict";

/* global Chart */

function showCharts() {
  var loginScreen = document.querySelector('.login-container');
  var chartsScreen = document.querySelector('.data-container');

  loginScreen.classList.add('hidden');
  chartsScreen.classList.remove('hidden');
}

function onKeyPress(event) {
  var ENTER_KEY = 13;
  if (event.charCode === ENTER_KEY) {
    getIssuesData();
  }
}

var inputProject = document.querySelector(".js-input-slug");
var searchBtn = document.querySelector(".js-btn-search");

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
    " High priorities: " + prioritiesCount.high
  );

  return prioritiesCount;
}

function printPrioritiesChart(prioritiesCount) {

  var ctxPriority = document.getElementById("js-priorityChart");

  Chart.defaults.global.maintainAspectRatio = false;
  var priorityChart = new Chart(ctxPriority, {
    type: 'pie',
    data:{
      labels: [ "High Priority", "Normal Priority", "Low Priority"],
      datasets: [{
        label: '# of Priority',
        data: [prioritiesCount.high, prioritiesCount.normal, prioritiesCount.low],
        backgroundColor: [

          '#BD513F',
          '#3C715A',
          '#52BD8F'
        ],
        borderColor:[
          "white"
        ],
            borderWidth: 3
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

function printSeveritiesChart(severityCount) {

  var ctxSeverity = document.getElementById("js-severityChart");

  Chart.defaults.global.maintainAspectRatio = false;
  var severityChart = new Chart(ctxSeverity, {
    type: 'pie',
    data:{
      labels: [ "Critical", "Important", "Normal", "Minor", "Wishlist"],
      datasets: [{
        label: '# of Severity',
        data: [
          severityCount.critical,
          severityCount.important,
          severityCount.normal,
          severityCount.minor,
          severityCount.wishlist
        ],
        backgroundColor: [

          '#5A231F',
          '#A75F5A',
          '#31704B',
          '#5AA77A',
          '#9CF3C0'
        ],
        borderColor:[
          "white"
        ],
        borderWidth: 3
      }]
    },
  });
}


function getOpenClosedData(dataIssues) {
  var closedIssues = 0;
  var openIssues = {
    readyForTest: 0,
    new: 0,
    inProgress: 0,
    needsInfo: 0,
    totalOpen: 0
  };

  closedIssues = dataIssues.closed_issues;
  openIssues.totalOpen = dataIssues.opened_issues;
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
    "Ready for test: " + openIssues.readyForTest,
    "New :" + openIssues.new,
    "in progress Issues: " + openIssues.inProgress,
    "needs info issues. " + openIssues.needsInfo
  );
  return [openIssues, closedIssues];
}


function printOpenClosedChart(openClosedCount) {
  var readyForTest = openClosedCount[0].readyForTest;
  var newIssue = openClosedCount[0].new;
  var inProgress = openClosedCount[0].inProgress;
  var needsInfo = openClosedCount[0].needsInfo;
  var closedIssues = openClosedCount[1];
  var totalOpen = openClosedCount[0].totalOpen;

  var readyForTestPercent = ((readyForTest * 100)/totalOpen).toFixed(2);
  var newIssuePercent = ((newIssue * 100)/totalOpen).toFixed(2);
  var inProgressPercent = ((inProgress * 100)/totalOpen).toFixed(2);
  var needsInfoPercent = ((needsInfo * 100)/totalOpen).toFixed(2);


  console.log("closedIssues: " + closedIssues + " readyForTest: " + readyForTest);
  console.log("porcentaje readyForTest " + readyForTestPercent,
  " porcentaje new " + newIssuePercent, " porcentaje inProgress " + inProgressPercent,
  " porcentaje needsInfo " + needsInfoPercent);


  var dataPack1 = [readyForTest, closedIssues];
  var dataPack2 = [newIssue];
  var dataPack3 = [inProgress];
  var dataPack4 = [needsInfo];
  var openClosedLabels = ["Open", "Closed"];

  // Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';

  var ctxOpenClosed = document.getElementById('js-openClosedChart');
  var openClosedChart = new Chart(ctxOpenClosed, {
    type: 'bar',
    data: {
      labels: openClosedLabels,
      datasets:[{
        label: 'Closed',
        data: dataPack1,
        backgroundColor: '#5F3869'
      },
      {
        label: 'New',
        data: dataPack2,
        backgroundColor: '#589E82'
      },
      {
        label: 'In progress',
        data: dataPack3,
        backgroundColor: '#71D493'
      },
      {
        label: 'Needs info',
        data: dataPack4,
        backgroundColor: '#9DE3BE'
      }
  ]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
  var printTable = document.querySelector("#js-openIssuesPerStatus");
  printTable.innerHTML = '<table><tr><td>Ready for test</td><td>' + readyForTestPercent + ' %</td></tr><tr><td>New</td><td>' + newIssuePercent + ' %</td></tr><tr><td>In Progress</td><td> ' + inProgressPercent + ' %</td></tr><tr><td>Needs info</td><td> ' + needsInfoPercent + ' %</td></tr></table>';
}


function getNotAssignedData(dataIssues) {
  var notAssignedIssues = 0;
  notAssignedIssues = dataIssues.issues_per_assigned_to["0"].count;
  console.log("Issues not assigned :" + notAssignedIssues);
  return notAssignedIssues;
}

function getTimelineData(dataTimeline) {
  console.log(dataTimeline);
  var lastTimelineItems = [];
  for (var i = 0; lastTimelineItems.length < 5 && i < dataTimeline.length; i++) {
    if(dataTimeline[i].event_type === "issues.issue.change" || dataTimeline[i].event_type === "issues.issue.create"){
      var timeLineItems = {
        type: dataTimeline[i].event_type,
        subject: dataTimeline[i].data.issue.subject,
        photo: dataTimeline[i].data.user.photo,
        userName: dataTimeline[i].data.user.name,
        created: dataTimeline[i].created
      };
      if (timeLineItems.photo === null) {
        timeLineItems.photo = "img/user.png";
      }
      if (timeLineItems.type === "issues.issue.change") {
        timeLineItems.type = "changed";
      }else {
        timeLineItems.type = "created";
      }
      lastTimelineItems.push(timeLineItems);
    }
  }
  return lastTimelineItems;
}

function printTimeline(lastTimelineItems) {
  var timelineContainer = document.querySelector('.timeline');
  timelineContainer.innerHTML="";
  for (var i = 0; i < lastTimelineItems.length; i++) {
    var time = new Date(lastTimelineItems[i].created).toLocaleString();
    timelineContainer.innerHTML +=
    "<div class='timeline-item'> <div class='flex-photo-text'><div class='timeline-user-photo  padding-photo'><img src='" + lastTimelineItems[i].photo + "'></div><div class='timeline-text'> <span>"+ lastTimelineItems[i].userName + "</span> " + lastTimelineItems[i].type + " the issue <span>" + lastTimelineItems[i].subject + "<span> </div></div><div class='timeline-date'>" + time + " </div></div>";
  }
}

function getUserWithMostIssues(dataIssues) {
  var topUser = {
    name:"" ,
    count: 0
  };
  for (var key in dataIssues.issues_per_assigned_to){
    if (dataIssues.issues_per_assigned_to[key].count > topUser.count && dataIssues.issues_per_assigned_to[key].name !== "No asignado") {
      topUser.count = dataIssues.issues_per_assigned_to[key].count;
      topUser.name = dataIssues.issues_per_assigned_to[key].name;
    }
  }
  console.log("El nuevo Ramón es: " + topUser.name + " con " + topUser.count + " issues");
  return topUser;
}

function printUserAndUnassigned(userWithMostIssues, notAssignedCount) {
  var topUserUnassigned = document.querySelector('.topUserUnassigned-container');
  topUserUnassigned.innerHTML= "<div class='top-user  flex-photo-text'><div class='top-user-photo padding-photo'><img src='img/planta-ramon.png'></div><div class='top-user-text'><span>"+ userWithMostIssues.name +"</span> has <span>"+ userWithMostIssues.count + "</span> issues assigned, someone please hug " + userWithMostIssues.name + "!</div></div> <div class='unassigned  flex-photo-text'><div class='unassigned-text'>Sponsor an issue in need, there are <span>" + notAssignedCount + " unassigned issues</span></div><div class='unassigned-photo'><img src='img/box.png'></div></div>";
}


// Main function
function getIssuesData() {
  showCharts();
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
      console.log("URL API issues: " + urlApiIssues);

      setInterval(function (){
      var requestProjectIssues = new XMLHttpRequest();
      requestProjectIssues.open('GET', urlApiIssues, true);
      requestProjectIssues.onload = function() {
        if (requestProjectIssues.status >= 200 && requestProjectIssues.status < 400) {
          var dataIssues = JSON.parse(requestProjectIssues.responseText);

          var prioritiesCount = getPriorityData(dataIssues);
          printPrioritiesChart(prioritiesCount);
          var severityCount= getSeverityData(dataIssues);
          printSeveritiesChart(severityCount);
          var openClosedCount = getOpenClosedData(dataIssues);
          printOpenClosedChart(openClosedCount);
          var notAssignedCount = getNotAssignedData(dataIssues);
          var userWithMostIssues = getUserWithMostIssues(dataIssues);
          printUserAndUnassigned(userWithMostIssues, notAssignedCount);
        } else {

        }
      };
      requestProjectIssues.onerror = function() {
      };
      requestProjectIssues.send(); }, 10000);

setInterval(function (){
  var urlApiTimeline = "https://api.taiga.io/api/v1/timeline/project/" + projectId;
  var requestProjectTimeline = new XMLHttpRequest();
  requestProjectTimeline.open('GET', urlApiTimeline, true);
  requestProjectTimeline.onload = function() {
    if (requestProjectTimeline.status >= 200 && requestProjectTimeline.status < 400) {
      var dataTimeline = JSON.parse(requestProjectTimeline.responseText);
      var issuesTimeLine = getTimelineData(dataTimeline);
      printTimeline(issuesTimeLine);
      console.log(issuesTimeLine);
      console.log("URL timeline: " + urlApiTimeline);
    }
    else {
    }
  };
  requestProjectTimeline.onerror = function() {
  };
  requestProjectTimeline.send();}, 10000);

    } else {

    }
  };

  requestProjectId.onerror = function() {};
  requestProjectId.send();
}

searchBtn.addEventListener('click', getIssuesData);
inputProject.addEventListener("keypress", onKeyPress);

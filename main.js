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
            var urlApiIssues = "https://api.taiga.io/api/v1/issues?project=";
            urlApiIssues = urlApiIssues + projectId;

            var requestProjectIssues = new XMLHttpRequest();
            requestProjectIssues.open('GET', urlApiIssues, true);
            requestProjectIssues.onload = function() {
                if (requestProjectIssues.status >= 200 && requestProjectIssues.status < 400) {
                    var dataIssues = JSON.parse(requestProjectIssues.responseText);
                    ramon.innerHTML = dataIssues[0].subject;
                } else {

                }

            };
            requestProjectIssues.onerror = function() {

            };
            requestProjectIssues.send();

        } else {

        }
    };

    requestProjectId.onerror = function() {

    };
    requestProjectId.send();
}

searchBtn.addEventListener('click', getIssuesData);

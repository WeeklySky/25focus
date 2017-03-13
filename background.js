chrome.browserAction.setBadgeText({text: "OFF"});

var blockedPages = [
    "*://www.facebook.com/*",
    "*://www.reddit.com/*"
];

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {cancel: true};
    },
    {urls: blockedPages},
    ["blocking"]
);

chrome.alarms.onAlarm.addListener(function () {
    alert("Time's up! Websites unblocked.");
});

document.addEventListener('DOMContentLoaded', function () {
    var startTimerButton = document.getElementById('startTimer');
    var getTimerButton = document.getElementById('getTimer');
    var stopTimerButton = document.getElementById('stopTimer');

    startTimerButton.addEventListener('click', function () {

        chrome.alarms.create('timer', {delayInMinutes: 25});
        chrome.browserAction.setBadgeText({text: "ON"});

    }, false);

    getTimerButton.addEventListener('click', function () {

        chrome.alarms.get('timer', function (alarm) {
            console.log(alarm);
        });

    }, false);

    stopTimerButton.addEventListener('click', function () {

        chrome.alarms.clearAll();
        chrome.browserAction.setBadgeText({text: "OFF"});

    }, false);
}, false);
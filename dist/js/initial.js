"use strict";var app=app||{};app.awaitInterval=50;var l=window.location;app.isLocalhost="localhost"===l.hostname||"127.0.0.1"===l.hostname||"192.168.40.100"===l.hostname,!app.isLocalhost&&"serviceWorker"in navigator&&window.addEventListener("load",function(){var e=app.isLocalhost?"/":"/layoutr/";navigator.serviceWorker.register(e+"service-worker.js",{scope:e}).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){var e=setInterval(function(){if(document.documentElement.classList.contains("site-loaded"))switch(console.log("installationWorker.state:",installationWorker.state),clearInterval(e),n.state){case"installed":navigator.serviceWorker.controller?console.log("New or updated content is available."):console.log("Content is now available offline!");break;case"redundant":console.error("The installing service worker became redundant.")}},app.awaitInterval)}}}).catch(function(e){console.error("Error during service worker registration:",e)})});var trackingId="UA-99633521-2";function sendAnalyticsEvent(o,r){return console.log("Sending analytics event: "+r+"/"+o),trackingId?o||r?self.registration.pushManager.getSubscription().then(function(e){if(null===e)throw new Error("No subscription currently available.");var n={v:1,cid:e.endpoint,tid:trackingId,t:"event",ec:r,ea:o,el:"serviceworker"},t=Object.keys(n).filter(function(e){return n[e]}).map(function(e){return e+"="+encodeURIComponent(n[e])}).join("&");return fetch("https://www.google-analytics.com/collect",{method:"post",body:t})}).then(function(n){if(!n.ok)return n.text().then(function(e){throw new Error("Bad response from Google Analytics:\n"+n.status)});console.log(r+"/"+o+"hit sent, check the Analytics dashboard")}).catch(function(e){console.warn("Unable to send the analytics event",e)}):(console.warn("sendAnalyticsEvent() called with no eventAction or eventCategory."),Promise.resolve()):(console.error("You need your tracking ID in analytics-helper.js"),console.error("Add this code:\nvar trackingId = 'UA-XXXXXXXX-X';"),Promise.resolve())}
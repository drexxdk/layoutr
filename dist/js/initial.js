var app = app || {};

app.awaitInterval = 50;

var l = window.location;
app.isLocalhost = l.hostname === 'localhost' || l.hostname === '127.0.0.1' || l.hostname === '192.168.40.100';
// Set this to your tracking ID
var trackingId = 'UA-99633521-2';

function sendAnalyticsEvent(eventAction, eventCategory) {
    'use strict';

    console.log('Sending analytics event: ' + eventCategory + '/' + eventAction);

    if (!trackingId) {
        console.error('You need your tracking ID in analytics-helper.js');
        console.error('Add this code:\nvar trackingId = \'UA-XXXXXXXX-X\';');
        // We want this to be a safe method, so avoid throwing unless absolutely necessary.
        return Promise.resolve();
    }

    if (!eventAction && !eventCategory) {
        console.warn('sendAnalyticsEvent() called with no eventAction or ' +
            'eventCategory.');
        // We want this to be a safe method, so avoid throwing unless absolutely necessary.
        return Promise.resolve();
    }

    return self.registration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription === null) {
                throw new Error('No subscription currently available.');
            }

            // Create hit data
            var payloadData = {
                // Version Number
                v: 1,
                // Client ID
                cid: subscription.endpoint,
                // Tracking ID
                tid: trackingId,
                // Hit Type
                t: 'event',
                // Event Category
                ec: eventCategory,
                // Event Action
                ea: eventAction,
                // Event Label
                el: 'serviceworker'
            };

            // Format hit data into URI
            var payloadString = Object.keys(payloadData)
                .filter(function (analyticsKey) {
                    return payloadData[analyticsKey];
                })
                .map(function (analyticsKey) {
                    return analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]);
                })
                .join('&');

            // Post to Google Analytics endpoint
            return fetch('https://www.google-analytics.com/collect', {
                method: 'post',
                body: payloadString
            });
        })
        .then(function (response) {
            if (!response.ok) {
                return response.text()
                    .then(function (responseText) {
                        throw new Error(
                            'Bad response from Google Analytics:\n' + response.status
                        );
                    });
            } else {
                console.log(eventCategory + '/' + eventAction +
                    'hit sent, check the Analytics dashboard');
            }
        })
        .catch(function (err) {
            console.warn('Unable to send the analytics event', err);
        });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9pbml0aWFsLmpzIiwiYW5hbHl0aWNzLWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbml0aWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcclxuXHJcbmFwcC5hd2FpdEludGVydmFsID0gNTA7XHJcblxyXG52YXIgbCA9IHdpbmRvdy5sb2NhdGlvbjtcclxuYXBwLmlzTG9jYWxob3N0ID0gbC5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgfHwgbC5ob3N0bmFtZSA9PT0gJzEyNy4wLjAuMScgfHwgbC5ob3N0bmFtZSA9PT0gJzE5Mi4xNjguNDAuMTAwJzsiLCIvLyBTZXQgdGhpcyB0byB5b3VyIHRyYWNraW5nIElEXHJcbnZhciB0cmFja2luZ0lkID0gJ1VBLTk5NjMzNTIxLTInO1xyXG5cclxuZnVuY3Rpb24gc2VuZEFuYWx5dGljc0V2ZW50KGV2ZW50QWN0aW9uLCBldmVudENhdGVnb3J5KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ1NlbmRpbmcgYW5hbHl0aWNzIGV2ZW50OiAnICsgZXZlbnRDYXRlZ29yeSArICcvJyArIGV2ZW50QWN0aW9uKTtcclxuXHJcbiAgICBpZiAoIXRyYWNraW5nSWQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdZb3UgbmVlZCB5b3VyIHRyYWNraW5nIElEIGluIGFuYWx5dGljcy1oZWxwZXIuanMnKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdBZGQgdGhpcyBjb2RlOlxcbnZhciB0cmFja2luZ0lkID0gXFwnVUEtWFhYWFhYWFgtWFxcJzsnKTtcclxuICAgICAgICAvLyBXZSB3YW50IHRoaXMgdG8gYmUgYSBzYWZlIG1ldGhvZCwgc28gYXZvaWQgdGhyb3dpbmcgdW5sZXNzIGFic29sdXRlbHkgbmVjZXNzYXJ5LlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWV2ZW50QWN0aW9uICYmICFldmVudENhdGVnb3J5KSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdzZW5kQW5hbHl0aWNzRXZlbnQoKSBjYWxsZWQgd2l0aCBubyBldmVudEFjdGlvbiBvciAnICtcclxuICAgICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnkuJyk7XHJcbiAgICAgICAgLy8gV2Ugd2FudCB0aGlzIHRvIGJlIGEgc2FmZSBtZXRob2QsIHNvIGF2b2lkIHRocm93aW5nIHVubGVzcyBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlbGYucmVnaXN0cmF0aW9uLnB1c2hNYW5hZ2VyLmdldFN1YnNjcmlwdGlvbigpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHN1YnNjcmlwdGlvbiBjdXJyZW50bHkgYXZhaWxhYmxlLicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgaGl0IGRhdGFcclxuICAgICAgICAgICAgdmFyIHBheWxvYWREYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgLy8gVmVyc2lvbiBOdW1iZXJcclxuICAgICAgICAgICAgICAgIHY6IDEsXHJcbiAgICAgICAgICAgICAgICAvLyBDbGllbnQgSURcclxuICAgICAgICAgICAgICAgIGNpZDogc3Vic2NyaXB0aW9uLmVuZHBvaW50LFxyXG4gICAgICAgICAgICAgICAgLy8gVHJhY2tpbmcgSURcclxuICAgICAgICAgICAgICAgIHRpZDogdHJhY2tpbmdJZCxcclxuICAgICAgICAgICAgICAgIC8vIEhpdCBUeXBlXHJcbiAgICAgICAgICAgICAgICB0OiAnZXZlbnQnLFxyXG4gICAgICAgICAgICAgICAgLy8gRXZlbnQgQ2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgIGVjOiBldmVudENhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgLy8gRXZlbnQgQWN0aW9uXHJcbiAgICAgICAgICAgICAgICBlYTogZXZlbnRBY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAvLyBFdmVudCBMYWJlbFxyXG4gICAgICAgICAgICAgICAgZWw6ICdzZXJ2aWNld29ya2VyJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gRm9ybWF0IGhpdCBkYXRhIGludG8gVVJJXHJcbiAgICAgICAgICAgIHZhciBwYXlsb2FkU3RyaW5nID0gT2JqZWN0LmtleXMocGF5bG9hZERhdGEpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChhbmFseXRpY3NLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZERhdGFbYW5hbHl0aWNzS2V5XTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChhbmFseXRpY3NLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5hbHl0aWNzS2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBheWxvYWREYXRhW2FuYWx5dGljc0tleV0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5qb2luKCcmJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBQb3N0IHRvIEdvb2dsZSBBbmFseXRpY3MgZW5kcG9pbnRcclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKCdodHRwczovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9jb2xsZWN0Jywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBwYXlsb2FkU3RyaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdCYWQgcmVzcG9uc2UgZnJvbSBHb29nbGUgQW5hbHl0aWNzOlxcbicgKyByZXNwb25zZS5zdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50Q2F0ZWdvcnkgKyAnLycgKyBldmVudEFjdGlvbiArXHJcbiAgICAgICAgICAgICAgICAgICAgJ2hpdCBzZW50LCBjaGVjayB0aGUgQW5hbHl0aWNzIGRhc2hib2FyZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBzZW5kIHRoZSBhbmFseXRpY3MgZXZlbnQnLCBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG59Il19

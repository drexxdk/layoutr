var app = app || {};

var l = window.location;
app.isLocalhost = l.hostname === 'localhost' || l.hostname === '127.0.0.1' || l.hostname === '192.168.40.100'; 

/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */
'use strict';
if ('serviceWorker' in navigator) {
    // Delay registration until after the page has loaded, to ensure that our
    // precaching requests don't degrade the first visit experience.
    // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
    window.addEventListener('load', function () {
        // Your service-worker.js *must* be located at the top-level directory relative to your site.
        // It won't be able to control pages unless it's located at the same level or higher than them.
        // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
        // See https://github.com/slightlyoff/ServiceWorker/issues/468
        
        var repository = app.isLocalhost ? '/' : '/layoutr/';

        navigator.serviceWorker.register(repository + 'service-worker.js', { scope: repository }).then(function (reg) {
            // updatefound is fired if service-worker.js changes.
            reg.onupdatefound = function () {
                // The updatefound event implies that reg.installing is set; see
                // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
                var installingWorker = reg.installing;

                installingWorker.onstatechange = function () {
                    switch (installingWorker.state) {
                        case 'installed':
                            if (navigator.serviceWorker.controller) {
                                // At this point, the old content will have been purged and the fresh content will
                                // have been added to the cache.
                                // It's the perfect time to display a "New content is available; please refresh."
                                // message in the page's interface.
                                console.log('New or updated content is available.');
                            } else {
                                // At this point, everything has been precached.
                                // It's the perfect time to display a "Content is cached for offline use." message.
                                console.log('Content is now available offline!');
                            }
                            break;

                        case 'redundant':
                            console.error('The installing service worker became redundant.');
                            break;
                    }
                };
            };
        }).catch(function (e) {
            console.error('Error during service worker registration:', e);
        });
    });
}
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
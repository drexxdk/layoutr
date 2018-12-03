{
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
            .then((subscription) => {
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
                    .filter((analyticsKey) => {
                        return payloadData[analyticsKey];
                    })
                    .map((analyticsKey) => {
                        return analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]);
                    })
                    .join('&');

                // Post to Google Analytics endpoint
                return fetch('https://www.google-analytics.com/collect', {
                    method: 'post',
                    body: payloadString
                });
            })
            .then((response) => {
                if (!response.ok) {
                    return response.text()
                        .then((responseText) => {
                            throw new Error(
                                'Bad response from Google Analytics:\n' + response.status
                            );
                        });
                } else {
                    console.log(eventCategory + '/' + eventAction +
                        'hit sent, check the Analytics dashboard');
                }
            })
            .catch((err) => {
                console.warn('Unable to send the analytics event', err);
            });
    }
}
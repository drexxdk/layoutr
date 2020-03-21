/**
 * Copyright 2016 Google Inc. All rights reserved.
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

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","f60503d0a1f8d60a227543d649235202"],["dist/css/initial.css","63ad99faf8c6d2565f0b5407e7114d04"],["dist/css/katex.css","f600b0cd3d69171f7e9bcf856e0600e8"],["dist/css/nouislider.css","d53a89829a250008cca2d5ec7ea608af"],["dist/css/plyr.css","1e03b50d45f26088beaedd2dffce853d"],["dist/css/swiper.css","fc163a17582e0b73753445fd49c612f2"],["dist/css/theme/dark.css","60f4cb5fc150e4ef1a7954bd2b68ddc2"],["dist/css/theme/light.css","49ed8297659f49544f066adab409f86d"],["dist/fonts/katex/KaTeX_AMS-Regular.woff","e78f217c38267703d444fb8f3940a431"],["dist/fonts/katex/KaTeX_Caligraphic-Bold.woff","bac61997af03ef4747cd73b3757749ca"],["dist/fonts/katex/KaTeX_Caligraphic-Regular.woff","a64e134208e4b556aa9adfd286aa46ab"],["dist/fonts/katex/KaTeX_Fraktur-Bold.woff","0a0aa194aa39cc284a3d8826cd23cfa9"],["dist/fonts/katex/KaTeX_Fraktur-Regular.woff","f980ca72a0d0876d0451f9e8d7b25c02"],["dist/fonts/katex/KaTeX_Main-Bold.woff","d8a629d21894b90448b5f42f457c2060"],["dist/fonts/katex/KaTeX_Main-Italic.woff","8dd42e02d20082db960018b6488338f7"],["dist/fonts/katex/KaTeX_Main-Regular.woff","2dffc87573a6d6dd440e801b5cce5c8e"],["dist/fonts/katex/KaTeX_Math-BoldItalic.woff","65a38aa60d8e857bc2b8b9d6373b1152"],["dist/fonts/katex/KaTeX_Math-Italic.woff","da586018a5f1b55beb343d53bf804007"],["dist/fonts/katex/KaTeX_Math-Regular.woff","91cb3688dbc54686b7c8032a511dd77c"],["dist/fonts/katex/KaTeX_SansSerif-Bold.woff","bfe58d70050dee17e6520b383d519b98"],["dist/fonts/katex/KaTeX_SansSerif-Italic.woff","dabdeee17ca945eb5382550288ccee34"],["dist/fonts/katex/KaTeX_SansSerif-Regular.woff","48c7df6f4d3d4df25748a666d0520b5c"],["dist/fonts/katex/KaTeX_Script-Regular.woff","5acb381b12b66ca6afef5d9edb948672"],["dist/fonts/katex/KaTeX_Size1-Regular.woff","bdd0d5e034ab4a8641bd05736d5ed84f"],["dist/fonts/katex/KaTeX_Size2-Regular.woff","fd67fb35731da39667ae210a98c60ef4"],["dist/fonts/katex/KaTeX_Size3-Regular.woff","943c94f89c864bae86f603aee2bf83ea"],["dist/fonts/katex/KaTeX_Size4-Regular.woff","68537743d23b63655387918e39fe65c1"],["dist/fonts/katex/KaTeX_Typewriter-Regular.woff","9bd7cfe51b99f09cb1e82144804f0e89"],["dist/html/layout/navigation.html","389f4ce194fde4e327615978ea500e2e"],["dist/html/layout/settings.html","3b91406fe0666955255699d673b83343"],["dist/html/pages/accordion.html","2f472c01b3aaeb2d72ff15bf1d47cc4b"],["dist/html/pages/alert.html","48da206b3f851fb316cf3fe1273db86e"],["dist/html/pages/button.html","fd4d708ce8bac73e6f844a59273c1922"],["dist/html/pages/color.html","7d3ca766b886d4e258e111dfc6e4326f"],["dist/html/pages/cover-and-two-content.html","9390396ee0069371280f4141f63a58b8"],["dist/html/pages/cover.html","f82405aab9157fcf607add4a1d73ef13"],["dist/html/pages/datatables.html","528e44e1e9760dd9d5f7b969fc4910df"],["dist/html/pages/drag-and-drop.html","949e8bb0d9676974195cfc06b8873a75"],["dist/html/pages/dropdown.html","6d280785ed1ee175d1dac79e32575a84"],["dist/html/pages/error.html","8bcaabd6a49150838c4b542a1b0d4ba7"],["dist/html/pages/full-width-content.html","726afb93a4bca09a169ded83c05545d0"],["dist/html/pages/headline.html","9436a1f6806ffa0bf5921e01b68b41df"],["dist/html/pages/home.html","5a204e29645e6e4e10868ab855493381"],["dist/html/pages/img.html","1706d6c8bed8e0f21cf27fccb0b6a02a"],["dist/html/pages/list.html","592b19514d4a354fd86503fa2b73e2ad"],["dist/html/pages/map.html","7dc8bd424c84328c6125003adaf52c0c"],["dist/html/pages/math.html","8b01da01bae55149bb234f7063d48eca"],["dist/html/pages/media.html","fe8b8dec45f3caea7aa78fb5de9fbfcf"],["dist/html/pages/modal.html","41def00c2809d96a095bbb89abf4c3ab"],["dist/html/pages/percentage.html","d39de17b6972aaeaf59cd5c1c9bfd458"],["dist/html/pages/popup.html","9cb28bef2130554dde2a9ca3a1c4f44b"],["dist/html/pages/progress.html","3e5fc4e4d570a8a3f6cfee1a545b0653"],["dist/html/pages/puzzle.html","9f878cf7f27af4217827fdca8cda5091"],["dist/html/pages/quote.html","2ccf02f54600572398321a7012075145"],["dist/html/pages/radio-checkbox-switch.html","d1174029e154de1d9c74c0c54657d83f"],["dist/html/pages/range.html","9d48c919f814d12e57a5fc485b73d94e"],["dist/html/pages/sort.html","2b2fba06306c4d0f9e0e5456117a6e68"],["dist/html/pages/swiper.html","9e060c56eecb3664fb5d947da403ecee"],["dist/html/pages/table.html","52ca105272a16085c3a950d8fd8eb470"],["dist/html/pages/tabs.html","26af78e9b61dc73b672229c8b2a0417e"],["dist/html/pages/textbox.html","6d2dfac4b37fc3f2ce8d717248a16db1"],["dist/html/pages/tooltip.html","6ddcdac824cbba55e1c24030722e63c5"],["dist/html/pages/two-content.html","5b80fd133138028b41cea3e7d291c5ab"],["dist/html/svg/base.html","607aa7b7ebb75043e8d951c73b76f521"],["dist/html/svg/browser.html","c04933cd221efa44f83805ba7bf47513"],["dist/html/svg/os.html","ed5ee7a109b54150e0a4fb3346f4e893"],["dist/img/avatar-60-60.jpg","1f56b72b61093bfde089b073c48cd566"],["dist/img/error/background.jpg","3cd7389b23426bb5d653bd45412fa93c"],["dist/img/error/hydra.png","791ea93282b315eaa8b373a971670422"],["dist/img/favicon/android-chrome-192x192.png","fc1ff404cae7ede6a7e34c91bbcac253"],["dist/img/favicon/android-chrome-512x512.png","521ae0a8308e7aa3216ac9d5c3f82ebb"],["dist/img/favicon/apple-touch-icon.png","fe3072b0bf19e4a6fcfc024c33864f7b"],["dist/img/favicon/mstile-150x150.png","36734055181ca700629d0a10b84c0845"],["dist/img/favicon/mstile-310x150.png","f89f573d6a0a69c540c0d4dbca0f46cb"],["dist/img/favicon/mstile-310x310.png","03dff20dfb6d07dd1763d088f477b6be"],["dist/img/favicon/mstile-70x70.png","15c55df245d7c4dcc13514cb1da73e6d"],["dist/img/favicon/original/hexagons-blue.svg","a10ea0e018aeed0569fe720f7fff73bf"],["dist/img/favicon/original/hexagons-white.svg","23b106321838605fb680de666ad16ca5"],["dist/img/favicon/safari-pinned-tab.svg","5b11a1034d8caffb8d7a341b1933b838"],["dist/img/pages/avengers-infinity-war-1920-1080-min.jpg","2ef63f3ba12d7df876ba073223053fcd"],["dist/img/pages/avengers-infinity-war-1920-1080.jpg","06d9524141354cfc81b5d704d6e57a8e"],["dist/img/pages/deadpool-1920-1080-min.jpg","2654f466aab0ed8e8326c359f80f64e7"],["dist/img/pages/deadpool-1920-1080.jpg","aeef9e11d6efdc0735412dd49c74365f"],["dist/img/pages/deadpool-200-200.jpg","9302e755e37c24cb8691f4a98a1aedbb"],["dist/img/pages/guardians-of-the-galaxy-vol.-2-1920-1080-min.jpg","4abba18e973c5b9884723074256e3904"],["dist/img/pages/guardians-of-the-galaxy-vol.-2-1920-1080.jpg","f438ad5bd5ca973b9229bc5d27349b28"],["dist/img/pages/justice-league-1920-1080-min.jpg","dd57e56c444a65d8a415b22990eb74ed"],["dist/img/pages/justice-league-1920-1080.jpg","63bcbca0325037e5d64ba8551b26849b"],["dist/img/pages/spider-man-homecoming-1920-1080-min.jpg","8237696fd5d4fa7ac4d696dd048264aa"],["dist/img/pages/spider-man-homecoming-1920-1080.jpg","442405e40132d0f6bc530825af996dac"],["dist/img/rb/thor-ragnarok-1024.jpg","b945f9beb5734f22e569ff9d9d55b6c4"],["dist/img/rb/thor-ragnarok-1200.jpg","05f79f511bde0d9a8abf0342c19c732d"],["dist/img/rb/thor-ragnarok-1920.jpg","df83d367a66d4f69c2c4dbb95e32150b"],["dist/img/rb/thor-ragnarok-3840.jpg","30a2e2ce8329275ea7b33a7462b31eba"],["dist/img/rb/thor-ragnarok-800.jpg","a26d0f38ead675084e90e583183a3e92"],["dist/img/rb/wonder-woman-1024.jpg","6a7c69843ff39403eab14fad2de33bb4"],["dist/img/rb/wonder-woman-1200.jpg","044ba0fe69df49315c1ac6521e1c8a7b"],["dist/img/rb/wonder-woman-1920.jpg","dec1bec6d05a101377298f8cb1269cc5"],["dist/img/rb/wonder-woman-3840.jpg","80c21313cd287afc7d62d92ee9e91532"],["dist/img/rb/wonder-woman-800.jpg","5c2bb148481709ee7eaada2ed8a5e1d1"],["dist/js/app.js","98d9715825a0ed63623615c0e7d5f035"],["dist/js/assignment.js","422a553792523f88c69cc1d2d8f68ed9"],["dist/js/datatables.js","68d06910fefb677c7ee2e368dd133be1"],["dist/js/focus.js","8af3de0b52b92434a6469982810382ca"],["dist/js/katex.js","6b8a370da2a5dae9754ffdd75edbf1f6"],["dist/js/nouislider.js","5b9ec06931e144b88279bee279befa91"],["dist/js/plyr.js","ad3693220050aaa41efc209f1a707806"],["dist/js/swiper.js","575fa54aecd66c525e95785ed93bfae3"],["dist/js/tts.js","d2789e92ceea528121b62e87f086836d"],["dist/video/wonder-woman-intro.jpg","b86394c9ab39223436e1c00fa73fc5c4"],["index.html","2835f9d5b57a1addc7a505e68d239b97"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});








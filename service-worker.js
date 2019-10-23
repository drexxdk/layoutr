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

var precacheConfig = [["404.html","f60503d0a1f8d60a227543d649235202"],["dist/ajax/layout/navigation.html","dd665d22ae97084d3eca0be6a7ea5945"],["dist/ajax/layout/settings.html","1472d47987973e6b89a72f6636735a97"],["dist/ajax/pages/accordion.html","1064bf39628b0f1f77a191f075e761b4"],["dist/ajax/pages/alert.html","5eb38b8c197acb85fa0524148b2e6d65"],["dist/ajax/pages/button.html","83a07dfc920159424a0df6282e751f5f"],["dist/ajax/pages/color.html","f8e8dd51d5f38bc507cddc591b5ccb77"],["dist/ajax/pages/cover-and-two-content.html","f82eb64111a53a2232a9f0b62341c2fe"],["dist/ajax/pages/cover.html","a6363a6e4d3b8a0388750bcdf70d128d"],["dist/ajax/pages/datatables.html","2791883a8ae0f14490b921078f7763ac"],["dist/ajax/pages/drag-and-drop.html","1cda8306cc8ce2d5121eb7d87fc19304"],["dist/ajax/pages/error.html","6de77e9371705ba45629c01055ce53b2"],["dist/ajax/pages/form.html","759b9a0cdbed31df707ae60da05d45a3"],["dist/ajax/pages/full-width-content.html","5c46857c1bfbdf75f531ef0d3e61749e"],["dist/ajax/pages/headline.html","5d0b2c72241cce4a768488303dba82e8"],["dist/ajax/pages/home.html","9c0ee71d7a458be3fafd22735afc7faa"],["dist/ajax/pages/img.html","a74597d5092b2dcb742895993249a8d7"],["dist/ajax/pages/list.html","d440893c0104587116fda85373789176"],["dist/ajax/pages/map.html","939e7d1fe293d16b97b96feda01e6b90"],["dist/ajax/pages/math.html","81d70d04e255a0f813aea6b2b46630b8"],["dist/ajax/pages/media.html","a326dcc75927bf7167c32ae50944bad2"],["dist/ajax/pages/modal.html","52fe87513945b72e8859d40324cffa23"],["dist/ajax/pages/percentage.html","1fb7e362c4ae3495083ec18c2e7afb28"],["dist/ajax/pages/popup.html","68c4c231fb335811503b77f368169761"],["dist/ajax/pages/progress.html","384e2a253b830142543c61bba95e5367"],["dist/ajax/pages/puzzle.html","b7fcc43cab71acd0d02ea80df8b5ceb9"],["dist/ajax/pages/quote.html","b2c99714409549d05d825570bc28621a"],["dist/ajax/pages/sort.html","19a74fe59b46a821b06caa597343ea93"],["dist/ajax/pages/swiper.html","20b2c50796a7dc700f1330b5473fac63"],["dist/ajax/pages/table.html","4e39c08ec0597f2cfcb7acfac967e8da"],["dist/ajax/pages/tooltip.html","05f950752d98e37c991d5af6162736c2"],["dist/ajax/pages/two-content.html","b47f008e94fd35502bf25611014b27ce"],["dist/ajax/svg/base.html","3ebcb6771cca58647b54768bdc252cc5"],["dist/ajax/svg/browser.html","575c068c435c250073686efdc5fae21b"],["dist/ajax/svg/os.html","772152b3b0783a0bd9bbc8f39db09725"],["dist/css/initial.css","63ad99faf8c6d2565f0b5407e7114d04"],["dist/css/katex.css","f600b0cd3d69171f7e9bcf856e0600e8"],["dist/css/plyr.css","1e03b50d45f26088beaedd2dffce853d"],["dist/css/swiper.css","fc163a17582e0b73753445fd49c612f2"],["dist/css/theme/dark.css","3463d3c0b4a0bf277fc28075d9f9b35d"],["dist/css/theme/light.css","927a0501d22c8ad4baab207cb73debf9"],["dist/fonts/katex/KaTeX_AMS-Regular.woff","e78f217c38267703d444fb8f3940a431"],["dist/fonts/katex/KaTeX_Caligraphic-Bold.woff","bac61997af03ef4747cd73b3757749ca"],["dist/fonts/katex/KaTeX_Caligraphic-Regular.woff","a64e134208e4b556aa9adfd286aa46ab"],["dist/fonts/katex/KaTeX_Fraktur-Bold.woff","0a0aa194aa39cc284a3d8826cd23cfa9"],["dist/fonts/katex/KaTeX_Fraktur-Regular.woff","f980ca72a0d0876d0451f9e8d7b25c02"],["dist/fonts/katex/KaTeX_Main-Bold.woff","d8a629d21894b90448b5f42f457c2060"],["dist/fonts/katex/KaTeX_Main-Italic.woff","8dd42e02d20082db960018b6488338f7"],["dist/fonts/katex/KaTeX_Main-Regular.woff","2dffc87573a6d6dd440e801b5cce5c8e"],["dist/fonts/katex/KaTeX_Math-BoldItalic.woff","65a38aa60d8e857bc2b8b9d6373b1152"],["dist/fonts/katex/KaTeX_Math-Italic.woff","da586018a5f1b55beb343d53bf804007"],["dist/fonts/katex/KaTeX_Math-Regular.woff","91cb3688dbc54686b7c8032a511dd77c"],["dist/fonts/katex/KaTeX_SansSerif-Bold.woff","bfe58d70050dee17e6520b383d519b98"],["dist/fonts/katex/KaTeX_SansSerif-Italic.woff","dabdeee17ca945eb5382550288ccee34"],["dist/fonts/katex/KaTeX_SansSerif-Regular.woff","48c7df6f4d3d4df25748a666d0520b5c"],["dist/fonts/katex/KaTeX_Script-Regular.woff","5acb381b12b66ca6afef5d9edb948672"],["dist/fonts/katex/KaTeX_Size1-Regular.woff","bdd0d5e034ab4a8641bd05736d5ed84f"],["dist/fonts/katex/KaTeX_Size2-Regular.woff","fd67fb35731da39667ae210a98c60ef4"],["dist/fonts/katex/KaTeX_Size3-Regular.woff","943c94f89c864bae86f603aee2bf83ea"],["dist/fonts/katex/KaTeX_Size4-Regular.woff","68537743d23b63655387918e39fe65c1"],["dist/fonts/katex/KaTeX_Typewriter-Regular.woff","9bd7cfe51b99f09cb1e82144804f0e89"],["dist/img/avatar-60-60.jpg","1f56b72b61093bfde089b073c48cd566"],["dist/img/error/background.jpg","3cd7389b23426bb5d653bd45412fa93c"],["dist/img/error/hydra.png","791ea93282b315eaa8b373a971670422"],["dist/img/favicon/android-chrome-192x192.png","fc1ff404cae7ede6a7e34c91bbcac253"],["dist/img/favicon/android-chrome-512x512.png","521ae0a8308e7aa3216ac9d5c3f82ebb"],["dist/img/favicon/apple-touch-icon.png","fe3072b0bf19e4a6fcfc024c33864f7b"],["dist/img/favicon/mstile-150x150.png","36734055181ca700629d0a10b84c0845"],["dist/img/favicon/mstile-310x150.png","f89f573d6a0a69c540c0d4dbca0f46cb"],["dist/img/favicon/mstile-310x310.png","03dff20dfb6d07dd1763d088f477b6be"],["dist/img/favicon/mstile-70x70.png","15c55df245d7c4dcc13514cb1da73e6d"],["dist/img/favicon/original/hexagons-blue.svg","a10ea0e018aeed0569fe720f7fff73bf"],["dist/img/favicon/original/hexagons-white.svg","23b106321838605fb680de666ad16ca5"],["dist/img/favicon/safari-pinned-tab.svg","5b11a1034d8caffb8d7a341b1933b838"],["dist/img/pages/avengers-infinity-war-1920-1080-min.jpg","2ef63f3ba12d7df876ba073223053fcd"],["dist/img/pages/avengers-infinity-war-1920-1080.jpg","06d9524141354cfc81b5d704d6e57a8e"],["dist/img/pages/deadpool-1920-1080-min.jpg","2654f466aab0ed8e8326c359f80f64e7"],["dist/img/pages/deadpool-1920-1080.jpg","aeef9e11d6efdc0735412dd49c74365f"],["dist/img/pages/deadpool-200-200.jpg","9302e755e37c24cb8691f4a98a1aedbb"],["dist/img/pages/guardians-of-the-galaxy-vol.-2-1920-1080-min.jpg","4abba18e973c5b9884723074256e3904"],["dist/img/pages/guardians-of-the-galaxy-vol.-2-1920-1080.jpg","f438ad5bd5ca973b9229bc5d27349b28"],["dist/img/pages/justice-league-1920-1080-min.jpg","dd57e56c444a65d8a415b22990eb74ed"],["dist/img/pages/justice-league-1920-1080.jpg","63bcbca0325037e5d64ba8551b26849b"],["dist/img/pages/spider-man-homecoming-1920-1080-min.jpg","8237696fd5d4fa7ac4d696dd048264aa"],["dist/img/pages/spider-man-homecoming-1920-1080.jpg","442405e40132d0f6bc530825af996dac"],["dist/img/rb/thor-ragnarok-1024.jpg","b945f9beb5734f22e569ff9d9d55b6c4"],["dist/img/rb/thor-ragnarok-1200.jpg","05f79f511bde0d9a8abf0342c19c732d"],["dist/img/rb/thor-ragnarok-1920.jpg","df83d367a66d4f69c2c4dbb95e32150b"],["dist/img/rb/thor-ragnarok-3840.jpg","30a2e2ce8329275ea7b33a7462b31eba"],["dist/img/rb/thor-ragnarok-800.jpg","a26d0f38ead675084e90e583183a3e92"],["dist/img/rb/wonder-woman-1024.jpg","6a7c69843ff39403eab14fad2de33bb4"],["dist/img/rb/wonder-woman-1200.jpg","044ba0fe69df49315c1ac6521e1c8a7b"],["dist/img/rb/wonder-woman-1920.jpg","dec1bec6d05a101377298f8cb1269cc5"],["dist/img/rb/wonder-woman-3840.jpg","80c21313cd287afc7d62d92ee9e91532"],["dist/img/rb/wonder-woman-800.jpg","5c2bb148481709ee7eaada2ed8a5e1d1"],["dist/js/app.js","939ac0cd249327f0fce9957edfd3d0f9"],["dist/js/assignment.js","7331def688c00bd5cdc227240e094de0"],["dist/js/datatables.js","68d06910fefb677c7ee2e368dd133be1"],["dist/js/focus.js","8af3de0b52b92434a6469982810382ca"],["dist/js/katex.js","6b8a370da2a5dae9754ffdd75edbf1f6"],["dist/js/plyr.js","ad3693220050aaa41efc209f1a707806"],["dist/js/swiper.js","575fa54aecd66c525e95785ed93bfae3"],["dist/js/tts.js","d2789e92ceea528121b62e87f086836d"],["dist/video/wonder-woman-intro.jpg","b86394c9ab39223436e1c00fa73fc5c4"],["index.html","0793c80c0e7dea4321d2ef399e3c2004"]];
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








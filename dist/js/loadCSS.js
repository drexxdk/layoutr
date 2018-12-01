/*! onloadCSS. (onload callback for loadCSS) [c]2017 Filament Group, Inc. MIT License */
/* global navigator */
/* exported onloadCSS */
function onloadCSS( ss, callback ) {
	var called;
	function newcb(){
			if( !called && callback ){
				called = true;
				callback.call( ss );
			}
	}
	if( ss.addEventListener ){
		ss.addEventListener( "load", newcb );
	}
	if( ss.attachEvent ){
		ss.attachEvent( "onload", newcb );
	}

	// This code is for browsers that don’t support onload
	// No support for onload (it'll bind but never fire):
	//	* Android 4.3 (Samsung Galaxy S4, Browserstack)
	//	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
	//	* Android 2.3 (Pantech Burst P9070)

	// Weak inference targets Android < 4.4
 	if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
		ss.onloadcssdefined( newcb );
	}
}

/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof window !== "undefined" ? window : this ));

var app = app || {};

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var l = window.location;
var segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
app.host = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/';


app.settings = JSON.parse(localStorage.getItem("settings"));
if (app.settings === null) app.settings = [];

var theme = 'light';
app.settings.forEach(function (entry) {
    if (entry.name === 'theme') {
        theme = entry.id.substring(entry.id.indexOf("-") + 1);
    }
});
var stylesheet = loadCSS(app.host + "dist/css/theme/" + theme + '.css');
onloadCSS(stylesheet, function () {
    let body = document.body;
    let awaitCSS = setInterval(() => {
        var visibility = window.getComputedStyle(body, null).getPropertyValue('visibility');
        if (visibility !== 'hidden') {
            clearInterval(awaitCSS);
            app.cssLoaded = true;
        }
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9ubG9hZENTUy5qcyIsImxvYWRDU1MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImxvYWRDU1MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgb25sb2FkQ1NTLiAob25sb2FkIGNhbGxiYWNrIGZvciBsb2FkQ1NTKSBbY10yMDE3IEZpbGFtZW50IEdyb3VwLCBJbmMuIE1JVCBMaWNlbnNlICovXHJcbi8qIGdsb2JhbCBuYXZpZ2F0b3IgKi9cclxuLyogZXhwb3J0ZWQgb25sb2FkQ1NTICovXHJcbmZ1bmN0aW9uIG9ubG9hZENTUyggc3MsIGNhbGxiYWNrICkge1xyXG5cdHZhciBjYWxsZWQ7XHJcblx0ZnVuY3Rpb24gbmV3Y2IoKXtcclxuXHRcdFx0aWYoICFjYWxsZWQgJiYgY2FsbGJhY2sgKXtcclxuXHRcdFx0XHRjYWxsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwoIHNzICk7XHJcblx0XHRcdH1cclxuXHR9XHJcblx0aWYoIHNzLmFkZEV2ZW50TGlzdGVuZXIgKXtcclxuXHRcdHNzLmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBuZXdjYiApO1xyXG5cdH1cclxuXHRpZiggc3MuYXR0YWNoRXZlbnQgKXtcclxuXHRcdHNzLmF0dGFjaEV2ZW50KCBcIm9ubG9hZFwiLCBuZXdjYiApO1xyXG5cdH1cclxuXHJcblx0Ly8gVGhpcyBjb2RlIGlzIGZvciBicm93c2VycyB0aGF0IGRvbuKAmXQgc3VwcG9ydCBvbmxvYWRcclxuXHQvLyBObyBzdXBwb3J0IGZvciBvbmxvYWQgKGl0J2xsIGJpbmQgYnV0IG5ldmVyIGZpcmUpOlxyXG5cdC8vXHQqIEFuZHJvaWQgNC4zIChTYW1zdW5nIEdhbGF4eSBTNCwgQnJvd3NlcnN0YWNrKVxyXG5cdC8vXHQqIEFuZHJvaWQgNC4yIEJyb3dzZXIgKFNhbXN1bmcgR2FsYXh5IFNJSUkgTWluaSBHVC1JODIwMEwpXHJcblx0Ly9cdCogQW5kcm9pZCAyLjMgKFBhbnRlY2ggQnVyc3QgUDkwNzApXHJcblxyXG5cdC8vIFdlYWsgaW5mZXJlbmNlIHRhcmdldHMgQW5kcm9pZCA8IDQuNFxyXG4gXHRpZiggXCJpc0FwcGxpY2F0aW9uSW5zdGFsbGVkXCIgaW4gbmF2aWdhdG9yICYmIFwib25sb2FkY3NzZGVmaW5lZFwiIGluIHNzICkge1xyXG5cdFx0c3Mub25sb2FkY3NzZGVmaW5lZCggbmV3Y2IgKTtcclxuXHR9XHJcbn1cclxuIiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcclxuXHJcblN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc3VmZml4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmRleE9mKHN1ZmZpeCwgdGhpcy5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTE7XHJcbn07XHJcbnZhciBsID0gd2luZG93LmxvY2F0aW9uO1xyXG52YXIgc2VnbWVudENvdW50ID0gbC5vcmlnaW4uZW5kc1dpdGgoJ2dpdGh1Yi5pbycpID8gMSA6IDA7XHJcbmFwcC5ob3N0ID0gbC5wcm90b2NvbCArICcvLycgKyBsLmhvc3RuYW1lICsgKGwucG9ydCA/ICc6JyArIGwucG9ydCA6ICcnKSArIGwucGF0aG5hbWUuc3BsaXQoJy8nKS5zbGljZSgwLCAxICsgc2VnbWVudENvdW50KS5qb2luKCcvJykgKyAnLyc7XHJcblxyXG5cclxuYXBwLnNldHRpbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNldHRpbmdzXCIpKTtcclxuaWYgKGFwcC5zZXR0aW5ncyA9PT0gbnVsbCkgYXBwLnNldHRpbmdzID0gW107XHJcblxyXG52YXIgdGhlbWUgPSAnbGlnaHQnO1xyXG5hcHAuc2V0dGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5uYW1lID09PSAndGhlbWUnKSB7XHJcbiAgICAgICAgdGhlbWUgPSBlbnRyeS5pZC5zdWJzdHJpbmcoZW50cnkuaWQuaW5kZXhPZihcIi1cIikgKyAxKTtcclxuICAgIH1cclxufSk7XHJcbnZhciBzdHlsZXNoZWV0ID0gbG9hZENTUyhhcHAuaG9zdCArIFwiZGlzdC9jc3MvdGhlbWUvXCIgKyB0aGVtZSArICcuY3NzJyk7XHJcbm9ubG9hZENTUyhzdHlsZXNoZWV0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICBsZXQgYXdhaXRDU1MgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdmFyIHZpc2liaWxpdHkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2R5LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd2aXNpYmlsaXR5Jyk7XHJcbiAgICAgICAgaWYgKHZpc2liaWxpdHkgIT09ICdoaWRkZW4nKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYXdhaXRDU1MpO1xyXG4gICAgICAgICAgICBhcHAuY3NzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7Il19

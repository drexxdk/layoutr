/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):C.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/[^\x20\t\r\n\f]+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),
a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:X.test(a)?JSON.parse(a):a)}function $(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=Z(c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),$(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=$(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var _=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,aa=new RegExp("^(?:([+-])=|)("+_+")([a-z%]*)$","i"),ba=["Top","Right","Bottom","Left"],ca=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function ea(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&aa.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var fa={};function ga(a){var b,c=a.ownerDocument,d=a.nodeName,e=fa[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),fa[d]=e,e)}function ha(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ca(d)&&(e[f]=ga(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ha(this,!0)},hide:function(){return ha(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ca(this)?r(this).show():r(this).hide()})}});var ia=/^(?:checkbox|radio)$/i,ja=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ka=/^$|\/(?:java|ecma)script/i,la={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};la.optgroup=la.option,la.tbody=la.tfoot=la.colgroup=la.caption=la.thead,la.th=la.td;function ma(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function na(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var oa=/<|&#?\w+;/;function pa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(oa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ja.exec(f)||["",""])[1].toLowerCase(),i=la[h]||la._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=ma(l.appendChild(f),"script"),j&&na(g),c){k=0;while(f=g[k++])ka.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var qa=d.documentElement,ra=/^key/,sa=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ta=/^([^.]*)(?:\.(.+)|)/;function ua(){return!0}function va(){return!1}function wa(){try{return d.activeElement}catch(a){}}function xa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)xa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=va;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(qa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==wa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===wa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ua:va,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:va,isPropagationStopped:va,isImmediatePropagationStopped:va,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ua,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ua,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ua,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&ra.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&sa.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return xa(this,a,b,c,d)},one:function(a,b,c,d){return xa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=va),this.each(function(){r.event.remove(this,a,c,b)})}});var ya=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,za=/<script|<style|<link/i,Aa=/checked\s*(?:[^=]|=\s*.checked.)/i,Ba=/^true\/(.*)/,Ca=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Da(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Ea(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Fa(a){var b=Ba.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ga(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ha(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ia.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ia(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Aa.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ia(f,b,c,d)});if(m&&(e=pa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(ma(e,"script"),Ea),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,ma(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Fa),l=0;l<i;l++)j=h[l],ka.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ca,""),k))}return a}function Ja(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(ma(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&na(ma(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(ya,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=ma(h),f=ma(a),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);if(b)if(c)for(f=f||ma(a),g=g||ma(h),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);else Ga(a,h);return g=ma(h,"script"),g.length>0&&na(g,!i&&ma(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ja(this,a,!0)},remove:function(a){return Ja(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.appendChild(a)}})},prepend:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(ma(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!za.test(a)&&!la[(ja.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(ma(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ia(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(ma(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ka=/^margin/,La=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),Ma=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",qa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,qa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Na(a,b,c){var d,e,f,g,h=a.style;return c=c||Ma(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&La.test(g)&&Ka.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Oa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Pa=/^(none|table(?!-c[ea]).+)/,Qa={position:"absolute",visibility:"hidden",display:"block"},Ra={letterSpacing:"0",fontWeight:"400"},Sa=["Webkit","Moz","ms"],Ta=d.createElement("div").style;function Ua(a){if(a in Ta)return a;var b=a[0].toUpperCase()+a.slice(1),c=Sa.length;while(c--)if(a=Sa[c]+b,a in Ta)return a}function Va(a,b,c){var d=aa.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Wa(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ba[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ba[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ba[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ba[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ba[f]+"Width",!0,e)));return g}function Xa(a,b,c){var d,e=!0,f=Ma(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Na(a,b,f),(d<0||null==d)&&(d=a.style[b]),La.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Wa(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Na(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=aa.exec(c))&&e[1]&&(c=ea(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Na(a,b,d)),"normal"===e&&b in Ra&&(e=Ra[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Pa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Xa(a,b,d):da(a,Qa,function(){return Xa(a,b,d)})},set:function(a,c,d){var e,f=d&&Ma(a),g=d&&Wa(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=aa.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Va(a,c,g)}}}),r.cssHooks.marginLeft=Oa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Na(a,"marginLeft"))||a.getBoundingClientRect().left-da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ba[d]+b]=f[d]||f[d-2]||f[0];return e}},Ka.test(a)||(r.cssHooks[a+b].set=Va)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=Ma(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Ya(a,b,c,d,e){return new Ya.prototype.init(a,b,c,d,e)}r.Tween=Ya,Ya.prototype={constructor:Ya,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Ya.propHooks[this.prop];return a&&a.get?a.get(this):Ya.propHooks._default.get(this)},run:function(a){var b,c=Ya.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ya.propHooks._default.set(this),this}},Ya.prototype.init.prototype=Ya.prototype,Ya.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Ya.propHooks.scrollTop=Ya.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Ya.prototype.init,r.fx.step={};var Za,$a,_a=/^(?:toggle|show|hide)$/,ab=/queueHooks$/;function bb(){$a&&(a.requestAnimationFrame(bb),r.fx.tick())}function cb(){return a.setTimeout(function(){Za=void 0}),Za=r.now()}function db(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ba[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function eb(a,b,c){for(var d,e=(hb.tweeners[b]||[]).concat(hb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function fb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ca(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],_a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ha([a],!0),j=a.style.display||j,k=r.css(a,"display"),ha([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ha([a],!0),m.done(function(){p||ha([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=eb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function gb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function hb(a,b,c){var d,e,f=0,g=hb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Za||cb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Za||cb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(gb(k,j.opts.specialEasing);f<g;f++)if(d=hb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,eb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(hb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return ea(c.elem,a,aa.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],hb.tweeners[c]=hb.tweeners[c]||[],hb.tweeners[c].unshift(b)},prefilters:[fb],prefilter:function(a,b){b?hb.prefilters.unshift(a):hb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:"number"!=typeof e.duration&&(e.duration in r.fx.speeds?e.duration=r.fx.speeds[e.duration]:e.duration=r.fx.speeds._default),null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ca).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=hb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ab.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(db(b,!0),a,d,e)}}),r.each({slideDown:db("show"),slideUp:db("hide"),slideToggle:db("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Za=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Za=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){$a||($a=a.requestAnimationFrame?a.requestAnimationFrame(bb):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame($a):a.clearInterval($a),$a=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var ib,jb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?ib:void 0)),
void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),ib={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=jb[b]||r.find.attr;jb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=jb[g],jb[g]=e,e=null!=c(a,b,d)?g:null,jb[g]=f),e}});var kb=/^(?:input|select|textarea|button)$/i,lb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):kb.test(a.nodeName)||lb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function mb(a){var b=a.match(K)||[];return b.join(" ")}function nb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,nb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,nb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,nb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=nb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(nb(c))+" ").indexOf(b)>-1)return!0;return!1}});var ob=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ob,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:mb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ia.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,"$1"),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=pa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=mb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||qa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Oa(o.pixelPosition,function(a,c){if(c)return c=Na(a,b),La.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});

/*! jQuery Validation Plugin - v1.17.0 - 7/29/2017
 * https://jqueryvalidation.org/
 * Copyright (c) 2017 Jörn Zaefferer; Licensed MIT */
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) { a.extend(a.fn, { validate: function (b) { if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")); var c = a.data(this[0], "validator"); return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) { c.submitButton = b.currentTarget, a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.on("submit.validate", function (b) { function d() { var d, e; return c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), !c.settings.submitHandler || (e = c.settings.submitHandler.call(c, c.currentForm, b), d && d.remove(), void 0 !== e && e) } return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1) })), c) }, valid: function () { var b, c, d; return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () { b = c.element(this) && b, b || (d = d.concat(c.errorList)) }), c.errorList = d), b }, rules: function (b, c) { var d, e, f, g, h, i, j = this[0]; if (null != j && (!j.form && j.hasAttribute("contenteditable") && (j.form = this.closest("form")[0], j.name = this.attr("name")), null != j.form)) { if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) { case "add": a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages)); break; case "remove": return c ? (i = {}, a.each(c.split(/\s/), function (a, b) { i[b] = f[b], delete f[b] }), i) : (delete e[j.name], f) }return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g)), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g } } }), a.extend(a.expr.pseudos || a.expr[":"], { blank: function (b) { return !a.trim("" + a(b).val()) }, filled: function (b) { var c = a(b).val(); return null !== c && !!a.trim("" + c) }, unchecked: function (b) { return !a(b).prop("checked") } }), a.validator = function (b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function (b, c) { return 1 === arguments.length ? function () { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () { return c }) }), b) }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function (a) { this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) }, onfocusout: function (a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) }, onkeyup: function (b, c) { var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]; 9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b) }, onclick: function (a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) }, highlight: function (b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) }, unhighlight: function (b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) } }, setDefaults: function (b) { a.extend(a.validator.defaults, b) }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function () { function b(b) { !this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0], this.name = a(this).attr("name")); var c = a.data(this.form, "validator"), d = "on" + b.type.replace(/^validate/, ""), e = c.settings; e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b) } this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(); var c, d = this.groups = {}; a.each(this.settings.groups, function (b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) { d[c] = b }) }), c = this.settings.rules, a.each(c, function (b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler) }, form: function () { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() }, checkForm: function () { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++)this.check(b[a]); return this.valid() }, element: function (b) { var c, d, e = this.clean(b), f = this.validationTargetFor(e), g = this, h = !0; return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function (a, b) { b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h)) }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h }, showErrors: function (b) { if (b) { var c = this; a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function (a, b) { return { message: a, element: c.findByName(b)[0] } }), this.successList = a.grep(this.successList, function (a) { return !(a.name in b) }) } this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function () { a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors(); var b = this.elements().removeData("previousValue").removeAttr("aria-invalid"); this.resetElements(b) }, resetElements: function (a) { var b; if (this.settings.unhighlight) for (b = 0; a[b]; b++)this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass); else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass) }, numberOfInvalids: function () { return this.objectLength(this.invalid) }, objectLength: function (a) { var b, c = 0; for (b in a) void 0 !== a[b] && null !== a[b] && a[b] !== !1 && c++; return c }, hideErrors: function () { this.hideThese(this.toHide) }, hideThese: function (a) { a.not(this.containers).text(""), this.addWrapper(a).hide() }, valid: function () { return 0 === this.size() }, size: function () { return this.errorList.length }, focusInvalid: function () { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (b) { } }, findLastActive: function () { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function (a) { return a.element.name === b.name }).length && b }, elements: function () { var b = this, c = {}; return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () { var d = this.name || a(this).attr("name"); return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0], this.name = d), !(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0) }) }, clean: function (b) { return a(b)[0] }, errors: function () { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) }, resetInternals: function () { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]) }, reset: function () { this.resetInternals(), this.currentElements = a([]) }, prepareForm: function () { this.reset(), this.toHide = this.errors().add(this.containers) }, prepareElement: function (a) { this.reset(), this.toHide = this.errorsFor(a) }, elementValue: function (b) { var c, d, e = a(b), f = b.type; return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c) }, check: function (b) { b = this.validationTargetFor(this.clean(b)); var c, d, e, f, g = a(b).rules(), h = a.map(g, function (a, b) { return b }).length, i = !1, j = this.elementValue(b); if ("function" == typeof g.normalizer ? f = g.normalizer : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f) { if (j = f.call(b, j), "string" != typeof j) throw new TypeError("The normalizer should return a string value."); delete g.normalizer } for (d in g) { e = { method: d, parameters: g[d] }; try { if (c = a.validator.methods[d].call(this, j, b, e.parameters), "dependency-mismatch" === c && 1 === h) { i = !0; continue } if (i = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (k) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", k), k instanceof TypeError && (k.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), k } } if (!i) return this.objectLength(g) && this.successList.push(b), !0 }, customDataMessage: function (b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") }, customMessage: function (a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) }, findDefined: function () { for (var a = 0; a < arguments.length; a++)if (void 0 !== arguments[a]) return arguments[a] }, defaultMessage: function (b, c) { "string" == typeof c && (c = { method: c }); var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"), e = /\$?\{(\d+)\}/g; return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d }, formatAndAdd: function (a, b) { var c = this.defaultMessage(a, b); this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c }, addWrapper: function (a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a }, defaultShowErrors: function () { var a, b, c; for (a = 0; this.errorList[a]; a++)c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message); if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++)this.showLabel(this.successList[a]); if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++)this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass); this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show() }, validElements: function () { return this.currentElements.not(this.invalidElements()) }, invalidElements: function () { return a(this.errorList).map(function () { return this.element }) }, showLabel: function (b, c) { var d, e, f, g, h = this.errorsFor(b), i = this.idOrName(b), j = a(b).attr("aria-describedby"); h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function (b, c) { c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id")) })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h) }, errorsFor: function (b) { var c = this.escapeCssMeta(this.idOrName(b)), d = a(b).attr("aria-describedby"), e = "label[for='" + c + "'], label[for='" + c + "'] *"; return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e) }, escapeCssMeta: function (a) { return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1") }, idOrName: function (a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) }, validationTargetFor: function (b) { return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0] }, checkable: function (a) { return /radio|checkbox/i.test(a.type) }, findByName: function (b) { return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']") }, getLength: function (b, c) { switch (c.nodeName.toLowerCase()) { case "select": return a("option:selected", c).length; case "input": if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length }return b.length }, depend: function (a, b) { return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b) }, dependTypes: { "boolean": function (a) { return a }, string: function (b, c) { return !!a(b, c.form).length }, "function": function (a, b) { return a(b) } }, optional: function (b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" }, startRequest: function (b) { this.pending[b.name] || (this.pendingRequest++ , a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0) }, stopRequest: function (b, c) { this.pendingRequest-- , this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) }, previousValue: function (b, c) { return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) }) }, destroy: function () { this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur") } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function (b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) }, classRules: function (b) { var c = {}, d = a(b).attr("class"); return d && a.each(d.split(" "), function () { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c }, normalizeAttributeRule: function (a, b, c, d) { /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0) }, attributeRules: function (b) { var c, d, e = {}, f = a(b), g = b.getAttribute("type"); for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d); return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e }, dataRules: function (b) { var c, d, e = {}, f = a(b), g = b.getAttribute("type"); for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d); return e }, staticRules: function (b) { var c = {}, d = a.data(b.form, "validator"); return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c }, normalizeRules: function (b, c) { return a.each(b, function (d, e) { if (e === !1) return void delete b[d]; if (e.param || e.depends) { var f = !0; switch (typeof e.depends) { case "string": f = !!a(e.depends, c.form).length; break; case "function": f = e.depends.call(c, c) }f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]) } }), a.each(b, function (d, e) { b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e }), a.each(["minlength", "maxlength"], function () { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function () { var c; b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])])) }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b }, normalizeRule: function (b) { if ("string" == typeof b) { var c = {}; a.each(b.split(/\s/), function () { c[this] = !0 }), b = c } return b }, addMethod: function (b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) }, methods: { required: function (b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0 }, email: function (a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) }, url: function (a, b) { return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a) }, date: function (a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString()) }, dateISO: function (a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) }, number: function (a, b) { return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) }, digits: function (a, b) { return this.optional(b) || /^\d+$/.test(a) }, minlength: function (b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d }, maxlength: function (b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e <= d }, rangelength: function (b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d[0] && e <= d[1] }, min: function (a, b, c) { return this.optional(b) || a >= c }, max: function (a, b, c) { return this.optional(b) || a <= c }, range: function (a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] }, step: function (b, c, d) { var e, f = a(c).attr("type"), g = "Step attribute on input type " + f + " is not supported.", h = ["text", "number", "range"], i = new RegExp("\\b" + f + "\\b"), j = f && !i.test(h.join()), k = function (a) { var b = ("" + a).match(/(?:\.(\d+))?$/); return b && b[1] ? b[1].length : 0 }, l = function (a) { return Math.round(a * Math.pow(10, e)) }, m = !0; if (j) throw new Error(g); return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m }, equalTo: function (b, c, d) { var e = a(d); return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () { a(c).valid() }), b === e.val() }, remote: function (b, c, d, e) { if (this.optional(c)) return "dependency-mismatch"; e = "string" == typeof e && e || "remote"; var f, g, h, i = this.previousValue(c, e); return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function (a) { var d, g, h, j = a === !0 || "true" === a; f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j) } }, d)), "pending") } } }); var b, c = {}; return a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) { var e = a.port; "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d) }) : (b = a.ajax, a.ajax = function (d) { var e = ("mode" in d ? d : a.ajaxSettings).mode, f = ("port" in d ? d : a.ajaxSettings).port; return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments) }), a });
/*! jQuery & Zepto Lazy v1.7.6 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2017 Daniel 'Eisbehr' Kern */
!function (t, e) { "use strict"; function r(r, a, i, u, l) { function f() { L = t.devicePixelRatio > 1, i = c(i), a.delay >= 0 && setTimeout(function () { s(!0) }, a.delay), (a.delay < 0 || a.combined) && (u.e = v(a.throttle, function (t) { "resize" === t.type && (w = B = -1), s(t.all) }), u.a = function (t) { t = c(t), i.push.apply(i, t) }, u.g = function () { return i = n(i).filter(function () { return !n(this).data(a.loadedName) }) }, u.f = function (t) { for (var e = 0; e < t.length; e++) { var r = i.filter(function () { return this === t[e] }); r.length && s(!1, r) } }, s(), n(a.appendScroll).on("scroll." + l + " resize." + l, u.e)) } function c(t) { var i = a.defaultImage, o = a.placeholder, u = a.imageBase, l = a.srcsetAttribute, f = a.loaderAttribute, c = a._f || {}; t = n(t).filter(function () { var t = n(this), r = m(this); return !t.data(a.handledName) && (t.attr(a.attribute) || t.attr(l) || t.attr(f) || c[r] !== e) }).data("plugin_" + a.name, r); for (var s = 0, d = t.length; s < d; s++) { var A = n(t[s]), g = m(t[s]), h = A.attr(a.imageBaseAttribute) || u; g === N && h && A.attr(l) && A.attr(l, b(A.attr(l), h)), c[g] === e || A.attr(f) || A.attr(f, c[g]), g === N && i && !A.attr(E) ? A.attr(E, i) : g === N || !o || A.css(O) && "none" !== A.css(O) || A.css(O, "url('" + o + "')") } return t } function s(t, e) { if (!i.length) return void (a.autoDestroy && r.destroy()); for (var o = e || i, u = !1, l = a.imageBase || "", f = a.srcsetAttribute, c = a.handledName, s = 0; s < o.length; s++)if (t || e || A(o[s])) { var g = n(o[s]), h = m(o[s]), b = g.attr(a.attribute), v = g.attr(a.imageBaseAttribute) || l, p = g.attr(a.loaderAttribute); g.data(c) || a.visibleOnly && !g.is(":visible") || !((b || g.attr(f)) && (h === N && (v + b !== g.attr(E) || g.attr(f) !== g.attr(F)) || h !== N && v + b !== g.css(O)) || p) || (u = !0, g.data(c, !0), d(g, h, v, p)) } u && (i = n(i).filter(function () { return !n(this).data(c) })) } function d(t, e, r, i) { ++z; var o = function () { y("onError", t), p(), o = n.noop }; y("beforeLoad", t); var u = a.attribute, l = a.srcsetAttribute, f = a.sizesAttribute, c = a.retinaAttribute, s = a.removeAttribute, d = a.loadedName, A = t.attr(c); if (i) { var g = function () { s && t.removeAttr(a.loaderAttribute), t.data(d, !0), y(T, t), setTimeout(p, 1), g = n.noop }; t.off(I).one(I, o).one(D, g), y(i, t, function (e) { e ? (t.off(D), g()) : (t.off(I), o()) }) || t.trigger(I) } else { var h = n(new Image); h.one(I, o).one(D, function () { t.hide(), e === N ? t.attr(C, h.attr(C)).attr(F, h.attr(F)).attr(E, h.attr(E)) : t.css(O, "url('" + h.attr(E) + "')"), t[a.effect](a.effectTime), s && (t.removeAttr(u + " " + l + " " + c + " " + a.imageBaseAttribute), f !== C && t.removeAttr(f)), t.data(d, !0), y(T, t), h.remove(), p() }); var m = (L && A ? A : t.attr(u)) || ""; h.attr(C, t.attr(f)).attr(F, t.attr(l)).attr(E, m ? r + m : null), h.complete && h.trigger(D) } } function A(t) { var e = t.getBoundingClientRect(), r = a.scrollDirection, n = a.threshold, i = h() + n > e.top && -n < e.bottom, o = g() + n > e.left && -n < e.right; return "vertical" === r ? i : "horizontal" === r ? o : i && o } function g() { return w >= 0 ? w : w = n(t).width() } function h() { return B >= 0 ? B : B = n(t).height() } function m(t) { return t.tagName.toLowerCase() } function b(t, e) { if (e) { var r = t.split(","); t = ""; for (var a = 0, n = r.length; a < n; a++)t += e + r[a].trim() + (a !== n - 1 ? "," : "") } return t } function v(t, e) { var n, i = 0; return function (o, u) { function l() { i = +new Date, e.call(r, o) } var f = +new Date - i; n && clearTimeout(n), f > t || !a.enableThrottle || u ? l() : n = setTimeout(l, t - f) } } function p() { --z, i.length || z || y("onFinishedAll") } function y(t, e, n) { return !!(t = a[t]) && (t.apply(r, [].slice.call(arguments, 1)), !0) } var z = 0, w = -1, B = -1, L = !1, T = "afterLoad", D = "load", I = "error", N = "img", E = "src", F = "srcset", C = "sizes", O = "background-image"; "event" === a.bind || o ? f() : n(t).on(D + "." + l, f) } function a(a, o) { var u = this, l = n.extend({}, u.config, o), f = {}, c = l.name + "-" + ++i; return u.config = function (t, r) { return r === e ? l[t] : (l[t] = r, u) }, u.addItems = function (t) { return f.a && f.a("string" === n.type(t) ? n(t) : t), u }, u.getItems = function () { return f.g ? f.g() : {} }, u.update = function (t) { return f.e && f.e({}, !t), u }, u.force = function (t) { return f.f && f.f("string" === n.type(t) ? n(t) : t), u }, u.loadAll = function () { return f.e && f.e({ all: !0 }, !0), u }, u.destroy = function () { return n(l.appendScroll).off("." + c, f.e), n(t).off("." + c), f = {}, e }, r(u, l, a, f, c), l.chainable ? a : u } var n = t.jQuery || t.Zepto, i = 0, o = !1; n.fn.Lazy = n.fn.lazy = function (t) { return new a(this, t) }, n.Lazy = n.lazy = function (t, r, i) { if (n.isFunction(r) && (i = r, r = []), n.isFunction(i)) { t = n.isArray(t) ? t : [t], r = n.isArray(r) ? r : [r]; for (var o = a.prototype.config, u = o._f || (o._f = {}), l = 0, f = t.length; l < f; l++)(o[t[l]] === e || n.isFunction(o[t[l]])) && (o[t[l]] = i); for (var c = 0, s = r.length; c < s; c++)u[r[c]] = t[0] } }, a.prototype.config = { name: "lazy", chainable: !0, autoDestroy: !0, bind: "load", threshold: 500, visibleOnly: !1, appendScroll: t, scrollDirection: "both", imageBase: null, defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", placeholder: null, delay: -1, combined: !1, attribute: "data-src", srcsetAttribute: "data-srcset", sizesAttribute: "data-sizes", retinaAttribute: "data-retina", loaderAttribute: "data-loader", imageBaseAttribute: "data-imagebase", removeAttribute: !0, handledName: "handled", loadedName: "loaded", effect: "show", effectTime: 0, enableThrottle: !0, throttle: 250, beforeLoad: e, afterLoad: e, onError: e, onFinishedAll: e }, n(t).on("load", function () { o = !0 }) }(window);
/*! =======================================================
                      VERSION  10.0.0              
========================================================= */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * bootstrap-slider is released under the MIT License
 * Copyright (c) 2017 Kyle Kemp, Rohit Kalkur, and contributors
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * ========================================================= */

/**
 * Bridget makes jQuery widgets
 * v1.0.1
 * MIT license
 */
var windowIsDefined = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";

(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        var jQuery;
        try {
            jQuery = require("jquery");
        } catch (err) {
            jQuery = null;
        }
        module.exports = factory(jQuery);
    } else if (window) {
        window.Slider = factory(window.jQuery);
    }
})(function ($) {
    // Constants
    var NAMESPACE_MAIN = 'slider';
    var NAMESPACE_ALTERNATE = 'bootstrapSlider';

    // Polyfill console methods
    if (windowIsDefined && !window.console) {
        window.console = {};
    }
    if (windowIsDefined && !window.console.log) {
        window.console.log = function () { };
    }
    if (windowIsDefined && !window.console.warn) {
        window.console.warn = function () { };
    }

    // Reference to Slider constructor
    var Slider;

    (function ($) {

        'use strict';

        // -------------------------- utils -------------------------- //

        var slice = Array.prototype.slice;

        function noop() { }

        // -------------------------- definition -------------------------- //

        function defineBridget($) {

            // bail if no jQuery
            if (!$) {
                return;
            }

            // -------------------------- addOptionMethod -------------------------- //

			/**
    * adds option method -> $().plugin('option', {...})
    * @param {Function} PluginClass - constructor class
    */
            function addOptionMethod(PluginClass) {
                // don't overwrite original option method
                if (PluginClass.prototype.option) {
                    return;
                }

                // option setter
                PluginClass.prototype.option = function (opts) {
                    // bail out if not an object
                    if (!$.isPlainObject(opts)) {
                        return;
                    }
                    this.options = $.extend(true, this.options, opts);
                };
            }

            // -------------------------- plugin bridge -------------------------- //

            // helper function for logging errors
            // $.error breaks jQuery chaining
            var logError = typeof console === 'undefined' ? noop : function (message) {
                console.error(message);
            };

			/**
    * jQuery plugin bridge, access methods like $elem.plugin('method')
    * @param {String} namespace - plugin name
    * @param {Function} PluginClass - constructor class
    */
            function bridge(namespace, PluginClass) {
                // add to jQuery fn namespace
                $.fn[namespace] = function (options) {
                    if (typeof options === 'string') {
                        // call plugin method when first argument is a string
                        // get arguments for method
                        var args = slice.call(arguments, 1);

                        for (var i = 0, len = this.length; i < len; i++) {
                            var elem = this[i];
                            var instance = $.data(elem, namespace);
                            if (!instance) {
                                logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
                                continue;
                            }
                            if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                                logError("no such method '" + options + "' for " + namespace + " instance");
                                continue;
                            }

                            // trigger method with arguments
                            var returnValue = instance[options].apply(instance, args);

                            // break look and return first value if provided
                            if (returnValue !== undefined && returnValue !== instance) {
                                return returnValue;
                            }
                        }
                        // return this if no return value
                        return this;
                    } else {
                        var objects = this.map(function () {
                            var instance = $.data(this, namespace);
                            if (instance) {
                                // apply options & init
                                instance.option(options);
                                instance._init();
                            } else {
                                // initialize new instance
                                instance = new PluginClass(this, options);
                                $.data(this, namespace, instance);
                            }
                            return $(this);
                        });

                        if (!objects || objects.length > 1) {
                            return objects;
                        } else {
                            return objects[0];
                        }
                    }
                };
            }

            // -------------------------- bridget -------------------------- //

			/**
    * converts a Prototypical class into a proper jQuery plugin
    *   the class must have a ._init method
    * @param {String} namespace - plugin name, used in $().pluginName
    * @param {Function} PluginClass - constructor class
    */
            $.bridget = function (namespace, PluginClass) {
                addOptionMethod(PluginClass);
                bridge(namespace, PluginClass);
            };

            return $.bridget;
        }

        // get jquery from browser global
        defineBridget($);
    })($);

	/*************************************************
 			BOOTSTRAP-SLIDER SOURCE CODE
 	**************************************************/

    (function ($) {

        var ErrorMsgs = {
            formatInvalidInputErrorMsg: function formatInvalidInputErrorMsg(input) {
                return "Invalid input value '" + input + "' passed in";
            },
            callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
        };

        var SliderScale = {
            linear: {
                toValue: function toValue(percentage) {
                    var rawValue = percentage / 100 * (this.options.max - this.options.min);
                    var shouldAdjustWithBase = true;
                    if (this.options.ticks_positions.length > 0) {
                        var minv,
                            maxv,
                            minp,
                            maxp = 0;
                        for (var i = 1; i < this.options.ticks_positions.length; i++) {
                            if (percentage <= this.options.ticks_positions[i]) {
                                minv = this.options.ticks[i - 1];
                                minp = this.options.ticks_positions[i - 1];
                                maxv = this.options.ticks[i];
                                maxp = this.options.ticks_positions[i];

                                break;
                            }
                        }
                        var partialPercentage = (percentage - minp) / (maxp - minp);
                        rawValue = minv + partialPercentage * (maxv - minv);
                        shouldAdjustWithBase = false;
                    }

                    var adjustment = shouldAdjustWithBase ? this.options.min : 0;
                    var value = adjustment + Math.round(rawValue / this.options.step) * this.options.step;
                    if (value < this.options.min) {
                        return this.options.min;
                    } else if (value > this.options.max) {
                        return this.options.max;
                    } else {
                        return value;
                    }
                },
                toPercentage: function toPercentage(value) {
                    if (this.options.max === this.options.min) {
                        return 0;
                    }

                    if (this.options.ticks_positions.length > 0) {
                        var minv,
                            maxv,
                            minp,
                            maxp = 0;
                        for (var i = 0; i < this.options.ticks.length; i++) {
                            if (value <= this.options.ticks[i]) {
                                minv = i > 0 ? this.options.ticks[i - 1] : 0;
                                minp = i > 0 ? this.options.ticks_positions[i - 1] : 0;
                                maxv = this.options.ticks[i];
                                maxp = this.options.ticks_positions[i];

                                break;
                            }
                        }
                        if (i > 0) {
                            var partialPercentage = (value - minv) / (maxv - minv);
                            return minp + partialPercentage * (maxp - minp);
                        }
                    }

                    return 100 * (value - this.options.min) / (this.options.max - this.options.min);
                }
            },

            logarithmic: {
                /* Based on http://stackoverflow.com/questions/846221/logarithmic-slider */
                toValue: function toValue(percentage) {
                    var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
                    var max = Math.log(this.options.max);
                    var value = Math.exp(min + (max - min) * percentage / 100);
                    if (Math.round(value) === this.options.max) {
                        return this.options.max;
                    }
                    value = this.options.min + Math.round((value - this.options.min) / this.options.step) * this.options.step;
					/* Rounding to the nearest step could exceed the min or
      * max, so clip to those values. */
                    if (value < this.options.min) {
                        return this.options.min;
                    } else if (value > this.options.max) {
                        return this.options.max;
                    } else {
                        return value;
                    }
                },
                toPercentage: function toPercentage(value) {
                    if (this.options.max === this.options.min) {
                        return 0;
                    } else {
                        var max = Math.log(this.options.max);
                        var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
                        var v = value === 0 ? 0 : Math.log(value);
                        return 100 * (v - min) / (max - min);
                    }
                }
            }
        };

		/*************************************************
  						CONSTRUCTOR
  	**************************************************/
        Slider = function Slider(element, options) {
            createNewSlider.call(this, element, options);
            return this;
        };

        function createNewSlider(element, options) {

			/*
   	The internal state object is used to store data about the current 'state' of slider.
   	This includes values such as the `value`, `enabled`, etc...
   */
            this._state = {
                value: null,
                enabled: null,
                offset: null,
                size: null,
                percentage: null,
                inDrag: false,
                over: false
            };

            // The objects used to store the reference to the tick methods if ticks_tooltip is on
            this.ticksCallbackMap = {};
            this.handleCallbackMap = {};

            if (typeof element === "string") {
                this.element = document.querySelector(element);
            } else if (element instanceof HTMLElement) {
                this.element = element;
            }

			/*************************************************
   					Process Options
   	**************************************************/
            options = options ? options : {};
            var optionTypes = Object.keys(this.defaultOptions);

            for (var i = 0; i < optionTypes.length; i++) {
                var optName = optionTypes[i];

                // First check if an option was passed in via the constructor
                var val = options[optName];
                // If no data attrib, then check data atrributes
                val = typeof val !== 'undefined' ? val : getDataAttrib(this.element, optName);
                // Finally, if nothing was specified, use the defaults
                val = val !== null ? val : this.defaultOptions[optName];

                // Set all options on the instance of the Slider
                if (!this.options) {
                    this.options = {};
                }
                this.options[optName] = val;
            }

            // Check options.rtl
            if (this.options.rtl === 'auto') {
                this.options.rtl = window.getComputedStyle(this.element).direction === 'rtl';
            }

			/*
   	Validate `tooltip_position` against 'orientation`
   	- if `tooltip_position` is incompatible with orientation, swith it to a default compatible with specified `orientation`
   		-- default for "vertical" -> "right", "left" if rtl
   		-- default for "horizontal" -> "top"
   */
            if (this.options.orientation === "vertical" && (this.options.tooltip_position === "top" || this.options.tooltip_position === "bottom")) {
                if (this.options.rtl) {
                    this.options.tooltip_position = "left";
                } else {
                    this.options.tooltip_position = "right";
                }
            } else if (this.options.orientation === "horizontal" && (this.options.tooltip_position === "left" || this.options.tooltip_position === "right")) {

                this.options.tooltip_position = "top";
            }

            function getDataAttrib(element, optName) {
                var dataName = "data-slider-" + optName.replace(/_/g, '-');
                var dataValString = element.getAttribute(dataName);

                try {
                    return JSON.parse(dataValString);
                } catch (err) {
                    return dataValString;
                }
            }

			/*************************************************
   					Create Markup
   	**************************************************/

            var origWidth = this.element.style.width;
            var updateSlider = false;
            var parent = this.element.parentNode;
            var sliderTrackSelection;
            var sliderTrackLow, sliderTrackHigh;
            var sliderMinHandle;
            var sliderMaxHandle;

            if (this.sliderElem) {
                updateSlider = true;
            } else {
                /* Create elements needed for slider */
                this.sliderElem = document.createElement("div");
                this.sliderElem.className = "slider";

                /* Create slider track elements */
                var sliderTrack = document.createElement("div");
                sliderTrack.className = "slider-track";

                sliderTrackLow = document.createElement("div");
                sliderTrackLow.className = "slider-track-low";

                sliderTrackSelection = document.createElement("div");
                sliderTrackSelection.className = "slider-selection";

                sliderTrackHigh = document.createElement("div");
                sliderTrackHigh.className = "slider-track-high";

                sliderMinHandle = document.createElement("div");
                sliderMinHandle.className = "slider-handle min-slider-handle";
                sliderMinHandle.setAttribute('tabindex', 0);
                sliderMinHandle.setAttribute('role', 'slider');
                sliderMinHandle.setAttribute('aria-valuemin', this.options.min);
                sliderMinHandle.setAttribute('aria-valuemax', this.options.max);

                sliderMaxHandle = document.createElement("div");
                sliderMaxHandle.className = "slider-handle max-slider-handle";
                sliderMaxHandle.setAttribute('tabindex', 0);
                sliderMaxHandle.setAttribute('role', 'slider');
                sliderMaxHandle.setAttribute('aria-valuemin', this.options.min);
                sliderMaxHandle.setAttribute('aria-valuemax', this.options.max);

                sliderTrack.appendChild(sliderTrackLow);
                sliderTrack.appendChild(sliderTrackSelection);
                sliderTrack.appendChild(sliderTrackHigh);

                /* Create highlight range elements */
                this.rangeHighlightElements = [];
                var rangeHighlightsOpts = this.options.rangeHighlights;
                if (Array.isArray(rangeHighlightsOpts) && rangeHighlightsOpts.length > 0) {
                    for (var j = 0; j < rangeHighlightsOpts.length; j++) {
                        var rangeHighlightElement = document.createElement("div");
                        var customClassString = rangeHighlightsOpts[j].class || "";
                        rangeHighlightElement.className = "slider-rangeHighlight slider-selection " + customClassString;
                        this.rangeHighlightElements.push(rangeHighlightElement);
                        sliderTrack.appendChild(rangeHighlightElement);
                    }
                }

                /* Add aria-labelledby to handle's */
                var isLabelledbyArray = Array.isArray(this.options.labelledby);
                if (isLabelledbyArray && this.options.labelledby[0]) {
                    sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby[0]);
                }
                if (isLabelledbyArray && this.options.labelledby[1]) {
                    sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby[1]);
                }
                if (!isLabelledbyArray && this.options.labelledby) {
                    sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby);
                    sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby);
                }

                /* Create ticks */
                this.ticks = [];
                if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                    this.ticksContainer = document.createElement('div');
                    this.ticksContainer.className = 'slider-tick-container';

                    for (i = 0; i < this.options.ticks.length; i++) {
                        var tick = document.createElement('div');
                        tick.className = 'slider-tick';
                        if (this.options.ticks_tooltip) {
                            var tickListenerReference = this._addTickListener();
                            var enterCallback = tickListenerReference.addMouseEnter(this, tick, i);
                            var leaveCallback = tickListenerReference.addMouseLeave(this, tick);

                            this.ticksCallbackMap[i] = {
                                mouseEnter: enterCallback,
                                mouseLeave: leaveCallback
                            };
                        }
                        this.ticks.push(tick);
                        this.ticksContainer.appendChild(tick);
                    }

                    sliderTrackSelection.className += " tick-slider-selection";
                }

                this.tickLabels = [];
                if (Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) {
                    this.tickLabelContainer = document.createElement('div');
                    this.tickLabelContainer.className = 'slider-tick-label-container';

                    for (i = 0; i < this.options.ticks_labels.length; i++) {
                        var label = document.createElement('div');
                        var noTickPositionsSpecified = this.options.ticks_positions.length === 0;
                        var tickLabelsIndex = this.options.reversed && noTickPositionsSpecified ? this.options.ticks_labels.length - (i + 1) : i;
                        label.className = 'slider-tick-label';
                        label.innerHTML = this.options.ticks_labels[tickLabelsIndex];

                        this.tickLabels.push(label);
                        this.tickLabelContainer.appendChild(label);
                    }
                }

                var createAndAppendTooltipSubElements = function createAndAppendTooltipSubElements(tooltipElem) {
                    var arrow = document.createElement("div");
                    arrow.className = "tooltip-arrow";

                    var inner = document.createElement("div");
                    inner.className = "tooltip-inner";

                    tooltipElem.appendChild(arrow);
                    tooltipElem.appendChild(inner);
                };

                /* Create tooltip elements */
                var sliderTooltip = document.createElement("div");
                sliderTooltip.className = "tooltip tooltip-main";
                sliderTooltip.setAttribute('role', 'presentation');
                createAndAppendTooltipSubElements(sliderTooltip);

                var sliderTooltipMin = document.createElement("div");
                sliderTooltipMin.className = "tooltip tooltip-min";
                sliderTooltipMin.setAttribute('role', 'presentation');
                createAndAppendTooltipSubElements(sliderTooltipMin);

                var sliderTooltipMax = document.createElement("div");
                sliderTooltipMax.className = "tooltip tooltip-max";
                sliderTooltipMax.setAttribute('role', 'presentation');
                createAndAppendTooltipSubElements(sliderTooltipMax);

                /* Append components to sliderElem */
                this.sliderElem.appendChild(sliderTrack);
                this.sliderElem.appendChild(sliderTooltip);
                this.sliderElem.appendChild(sliderTooltipMin);
                this.sliderElem.appendChild(sliderTooltipMax);

                if (this.tickLabelContainer) {
                    this.sliderElem.appendChild(this.tickLabelContainer);
                }
                if (this.ticksContainer) {
                    this.sliderElem.appendChild(this.ticksContainer);
                }

                this.sliderElem.appendChild(sliderMinHandle);
                this.sliderElem.appendChild(sliderMaxHandle);

                /* Append slider element to parent container, right before the original <input> element */
                parent.insertBefore(this.sliderElem, this.element);

                /* Hide original <input> element */
                this.element.style.display = "none";
            }
            /* If JQuery exists, cache JQ references */
            if ($) {
                this.$element = $(this.element);
                this.$sliderElem = $(this.sliderElem);
            }

			/*************************************************
   						Setup
   	**************************************************/
            this.eventToCallbackMap = {};
            this.sliderElem.id = this.options.id;

            this.touchCapable = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;

            this.touchX = 0;
            this.touchY = 0;

            this.tooltip = this.sliderElem.querySelector('.tooltip-main');
            this.tooltipInner = this.tooltip.querySelector('.tooltip-inner');

            this.tooltip_min = this.sliderElem.querySelector('.tooltip-min');
            this.tooltipInner_min = this.tooltip_min.querySelector('.tooltip-inner');

            this.tooltip_max = this.sliderElem.querySelector('.tooltip-max');
            this.tooltipInner_max = this.tooltip_max.querySelector('.tooltip-inner');

            if (SliderScale[this.options.scale]) {
                this.options.scale = SliderScale[this.options.scale];
            }

            if (updateSlider === true) {
                // Reset classes
                this._removeClass(this.sliderElem, 'slider-horizontal');
                this._removeClass(this.sliderElem, 'slider-vertical');
                this._removeClass(this.sliderElem, 'slider-rtl');
                this._removeClass(this.tooltip, 'hide');
                this._removeClass(this.tooltip_min, 'hide');
                this._removeClass(this.tooltip_max, 'hide');

                // Undo existing inline styles for track
                ["left", "right", "top", "width", "height"].forEach(function (prop) {
                    this._removeProperty(this.trackLow, prop);
                    this._removeProperty(this.trackSelection, prop);
                    this._removeProperty(this.trackHigh, prop);
                }, this);

                // Undo inline styles on handles
                [this.handle1, this.handle2].forEach(function (handle) {
                    this._removeProperty(handle, 'left');
                    this._removeProperty(handle, 'right');
                    this._removeProperty(handle, 'top');
                }, this);

                // Undo inline styles and classes on tooltips
                [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (tooltip) {
                    this._removeProperty(tooltip, 'left');
                    this._removeProperty(tooltip, 'right');
                    this._removeProperty(tooltip, 'top');

                    this._removeClass(tooltip, 'right');
                    this._removeClass(tooltip, 'left');
                    this._removeClass(tooltip, 'top');
                }, this);
            }

            if (this.options.orientation === 'vertical') {
                this._addClass(this.sliderElem, 'slider-vertical');
                this.stylePos = 'top';
                this.mousePos = 'pageY';
                this.sizePos = 'offsetHeight';
            } else {
                this._addClass(this.sliderElem, 'slider-horizontal');
                this.sliderElem.style.width = origWidth;
                this.options.orientation = 'horizontal';
                if (this.options.rtl) {
                    this.stylePos = 'right';
                } else {
                    this.stylePos = 'left';
                }
                this.mousePos = 'pageX';
                this.sizePos = 'offsetWidth';
            }
            // specific rtl class
            if (this.options.rtl) {
                this._addClass(this.sliderElem, 'slider-rtl');
            }
            this._setTooltipPosition();
            /* In case ticks are specified, overwrite the min and max bounds */
            if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                this.options.max = Math.max.apply(Math, this.options.ticks);
                this.options.min = Math.min.apply(Math, this.options.ticks);
            }

            if (Array.isArray(this.options.value)) {
                this.options.range = true;
                this._state.value = this.options.value;
            } else if (this.options.range) {
                // User wants a range, but value is not an array
                this._state.value = [this.options.value, this.options.max];
            } else {
                this._state.value = this.options.value;
            }

            this.trackLow = sliderTrackLow || this.trackLow;
            this.trackSelection = sliderTrackSelection || this.trackSelection;
            this.trackHigh = sliderTrackHigh || this.trackHigh;

            if (this.options.selection === 'none') {
                this._addClass(this.trackLow, 'hide');
                this._addClass(this.trackSelection, 'hide');
                this._addClass(this.trackHigh, 'hide');
            } else if (this.options.selection === 'after' || this.options.selection === 'before') {
                this._removeClass(this.trackLow, 'hide');
                this._removeClass(this.trackSelection, 'hide');
                this._removeClass(this.trackHigh, 'hide');
            }

            this.handle1 = sliderMinHandle || this.handle1;
            this.handle2 = sliderMaxHandle || this.handle2;

            if (updateSlider === true) {
                // Reset classes
                this._removeClass(this.handle1, 'round triangle');
                this._removeClass(this.handle2, 'round triangle hide');

                for (i = 0; i < this.ticks.length; i++) {
                    this._removeClass(this.ticks[i], 'round triangle hide');
                }
            }

            var availableHandleModifiers = ['round', 'triangle', 'custom'];
            var isValidHandleType = availableHandleModifiers.indexOf(this.options.handle) !== -1;
            if (isValidHandleType) {
                this._addClass(this.handle1, this.options.handle);
                this._addClass(this.handle2, this.options.handle);

                for (i = 0; i < this.ticks.length; i++) {
                    this._addClass(this.ticks[i], this.options.handle);
                }
            }

            this._state.offset = this._offset(this.sliderElem);
            this._state.size = this.sliderElem[this.sizePos];
            this.setValue(this._state.value);

			/******************************************
   				Bind Event Listeners
   	******************************************/

            // Bind keyboard handlers
            this.handle1Keydown = this._keydown.bind(this, 0);
            this.handle1.addEventListener("keydown", this.handle1Keydown, false);

            this.handle2Keydown = this._keydown.bind(this, 1);
            this.handle2.addEventListener("keydown", this.handle2Keydown, false);

            this.mousedown = this._mousedown.bind(this);
            this.touchstart = this._touchstart.bind(this);
            this.touchmove = this._touchmove.bind(this);

            if (this.touchCapable) {
                // Test for passive event support
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener("test", null, opts);
                } catch (e) { }
                // Use our detect's results. passive applied if supported, capture will be false either way.
                var eventOptions = supportsPassive ? { passive: true } : false;
                // Bind touch handlers
                this.sliderElem.addEventListener("touchstart", this.touchstart, eventOptions);
                this.sliderElem.addEventListener("touchmove", this.touchmove, eventOptions);
            }
            this.sliderElem.addEventListener("mousedown", this.mousedown, false);

            // Bind window handlers
            this.resize = this._resize.bind(this);
            window.addEventListener("resize", this.resize, false);

            // Bind tooltip-related handlers
            if (this.options.tooltip === 'hide') {
                this._addClass(this.tooltip, 'hide');
                this._addClass(this.tooltip_min, 'hide');
                this._addClass(this.tooltip_max, 'hide');
            } else if (this.options.tooltip === 'always') {
                this._showTooltip();
                this._alwaysShowTooltip = true;
            } else {
                this.showTooltip = this._showTooltip.bind(this);
                this.hideTooltip = this._hideTooltip.bind(this);

                if (this.options.ticks_tooltip) {
                    var callbackHandle = this._addTickListener();
                    //create handle1 listeners and store references in map
                    var mouseEnter = callbackHandle.addMouseEnter(this, this.handle1);
                    var mouseLeave = callbackHandle.addMouseLeave(this, this.handle1);
                    this.handleCallbackMap.handle1 = {
                        mouseEnter: mouseEnter,
                        mouseLeave: mouseLeave
                    };
                    //create handle2 listeners and store references in map
                    mouseEnter = callbackHandle.addMouseEnter(this, this.handle2);
                    mouseLeave = callbackHandle.addMouseLeave(this, this.handle2);
                    this.handleCallbackMap.handle2 = {
                        mouseEnter: mouseEnter,
                        mouseLeave: mouseLeave
                    };
                } else {
                    this.sliderElem.addEventListener("mouseenter", this.showTooltip, false);
                    this.sliderElem.addEventListener("mouseleave", this.hideTooltip, false);
                }

                this.handle1.addEventListener("focus", this.showTooltip, false);
                this.handle1.addEventListener("blur", this.hideTooltip, false);

                this.handle2.addEventListener("focus", this.showTooltip, false);
                this.handle2.addEventListener("blur", this.hideTooltip, false);
            }

            if (this.options.enabled) {
                this.enable();
            } else {
                this.disable();
            }
        }

		/*************************************************
  				INSTANCE PROPERTIES/METHODS
  	- Any methods bound to the prototype are considered
  part of the plugin's `public` interface
  	**************************************************/
        Slider.prototype = {
            _init: function _init() { }, // NOTE: Must exist to support bridget

            constructor: Slider,

            defaultOptions: {
                id: "",
                min: 0,
                max: 10,
                step: 1,
                precision: 0,
                orientation: 'horizontal',
                value: 5,
                range: false,
                selection: 'before',
                tooltip: 'show',
                tooltip_split: false,
                handle: 'round',
                reversed: false,
                rtl: 'auto',
                enabled: true,
                formatter: function formatter(val) {
                    if (Array.isArray(val)) {
                        return val[0] + " : " + val[1];
                    } else {
                        return val;
                    }
                },
                natural_arrow_keys: false,
                ticks: [],
                ticks_positions: [],
                ticks_labels: [],
                ticks_snap_bounds: 0,
                ticks_tooltip: false,
                scale: 'linear',
                focus: false,
                tooltip_position: null,
                labelledby: null,
                rangeHighlights: []
            },

            getElement: function getElement() {
                return this.sliderElem;
            },

            getValue: function getValue() {
                if (this.options.range) {
                    return this._state.value;
                } else {
                    return this._state.value[0];
                }
            },

            setValue: function setValue(val, triggerSlideEvent, triggerChangeEvent) {
                if (!val) {
                    val = 0;
                }
                var oldValue = this.getValue();
                this._state.value = this._validateInputValue(val);
                var applyPrecision = this._applyPrecision.bind(this);

                if (this.options.range) {
                    this._state.value[0] = applyPrecision(this._state.value[0]);
                    this._state.value[1] = applyPrecision(this._state.value[1]);

                    this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0]));
                    this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]));
                } else {
                    this._state.value = applyPrecision(this._state.value);
                    this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))];
                    this._addClass(this.handle2, 'hide');
                    if (this.options.selection === 'after') {
                        this._state.value[1] = this.options.max;
                    } else {
                        this._state.value[1] = this.options.min;
                    }
                }

                if (this.options.max > this.options.min) {
                    this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), this.options.step * 100 / (this.options.max - this.options.min)];
                } else {
                    this._state.percentage = [0, 0, 100];
                }

                this._layout();
                var newValue = this.options.range ? this._state.value : this._state.value[0];

                this._setDataVal(newValue);
                if (triggerSlideEvent === true) {
                    this._trigger('slide', newValue);
                }
                if (oldValue !== newValue && triggerChangeEvent === true) {
                    this._trigger('change', {
                        oldValue: oldValue,
                        newValue: newValue
                    });
                }

                return this;
            },

            destroy: function destroy() {
                // Remove event handlers on slider elements
                this._removeSliderEventHandlers();

                // Remove the slider from the DOM
                this.sliderElem.parentNode.removeChild(this.sliderElem);
                /* Show original <input> element */
                this.element.style.display = "";

                // Clear out custom event bindings
                this._cleanUpEventCallbacksMap();

                // Remove data values
                this.element.removeAttribute("data");

                // Remove JQuery handlers/data
                if ($) {
                    this._unbindJQueryEventHandlers();
                    this.$element.removeData('slider');
                }
            },

            disable: function disable() {
                this._state.enabled = false;
                this.handle1.removeAttribute("tabindex");
                this.handle2.removeAttribute("tabindex");
                this._addClass(this.sliderElem, 'slider-disabled');
                this._trigger('slideDisabled');

                return this;
            },

            enable: function enable() {
                this._state.enabled = true;
                this.handle1.setAttribute("tabindex", 0);
                this.handle2.setAttribute("tabindex", 0);
                this._removeClass(this.sliderElem, 'slider-disabled');
                this._trigger('slideEnabled');

                return this;
            },

            toggle: function toggle() {
                if (this._state.enabled) {
                    this.disable();
                } else {
                    this.enable();
                }
                return this;
            },

            isEnabled: function isEnabled() {
                return this._state.enabled;
            },

            on: function on(evt, callback) {
                this._bindNonQueryEventHandler(evt, callback);
                return this;
            },

            off: function off(evt, callback) {
                if ($) {
                    this.$element.off(evt, callback);
                    this.$sliderElem.off(evt, callback);
                } else {
                    this._unbindNonQueryEventHandler(evt, callback);
                }
            },

            getAttribute: function getAttribute(attribute) {
                if (attribute) {
                    return this.options[attribute];
                } else {
                    return this.options;
                }
            },

            setAttribute: function setAttribute(attribute, value) {
                this.options[attribute] = value;
                return this;
            },

            refresh: function refresh() {
                this._removeSliderEventHandlers();
                createNewSlider.call(this, this.element, this.options);
                if ($) {
                    // Bind new instance of slider to the element
                    $.data(this.element, 'slider', this);
                }
                return this;
            },

            relayout: function relayout() {
                this._resize();
                this._layout();
                return this;
            },

			/******************************+
   				HELPERS
   	- Any method that is not part of the public interface.
   - Place it underneath this comment block and write its signature like so:
   		_fnName : function() {...}
   	********************************/
            _removeSliderEventHandlers: function _removeSliderEventHandlers() {
                // Remove keydown event listeners
                this.handle1.removeEventListener("keydown", this.handle1Keydown, false);
                this.handle2.removeEventListener("keydown", this.handle2Keydown, false);

                //remove the listeners from the ticks and handles if they had their own listeners
                if (this.options.ticks_tooltip) {
                    var ticks = this.ticksContainer.getElementsByClassName('slider-tick');
                    for (var i = 0; i < ticks.length; i++) {
                        ticks[i].removeEventListener('mouseenter', this.ticksCallbackMap[i].mouseEnter, false);
                        ticks[i].removeEventListener('mouseleave', this.ticksCallbackMap[i].mouseLeave, false);
                    }
                    this.handle1.removeEventListener('mouseenter', this.handleCallbackMap.handle1.mouseEnter, false);
                    this.handle2.removeEventListener('mouseenter', this.handleCallbackMap.handle2.mouseEnter, false);
                    this.handle1.removeEventListener('mouseleave', this.handleCallbackMap.handle1.mouseLeave, false);
                    this.handle2.removeEventListener('mouseleave', this.handleCallbackMap.handle2.mouseLeave, false);
                }

                this.handleCallbackMap = null;
                this.ticksCallbackMap = null;

                if (this.showTooltip) {
                    this.handle1.removeEventListener("focus", this.showTooltip, false);
                    this.handle2.removeEventListener("focus", this.showTooltip, false);
                }
                if (this.hideTooltip) {
                    this.handle1.removeEventListener("blur", this.hideTooltip, false);
                    this.handle2.removeEventListener("blur", this.hideTooltip, false);
                }

                // Remove event listeners from sliderElem
                if (this.showTooltip) {
                    this.sliderElem.removeEventListener("mouseenter", this.showTooltip, false);
                }
                if (this.hideTooltip) {
                    this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, false);
                }
                this.sliderElem.removeEventListener("touchstart", this.touchstart, false);
                this.sliderElem.removeEventListener("touchmove", this.touchmove, false);
                this.sliderElem.removeEventListener("mousedown", this.mousedown, false);

                // Remove window event listener
                window.removeEventListener("resize", this.resize, false);
            },
            _bindNonQueryEventHandler: function _bindNonQueryEventHandler(evt, callback) {
                if (this.eventToCallbackMap[evt] === undefined) {
                    this.eventToCallbackMap[evt] = [];
                }
                this.eventToCallbackMap[evt].push(callback);
            },
            _unbindNonQueryEventHandler: function _unbindNonQueryEventHandler(evt, callback) {
                var callbacks = this.eventToCallbackMap[evt];
                if (callbacks !== undefined) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i] === callback) {
                            callbacks.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            _cleanUpEventCallbacksMap: function _cleanUpEventCallbacksMap() {
                var eventNames = Object.keys(this.eventToCallbackMap);
                for (var i = 0; i < eventNames.length; i++) {
                    var eventName = eventNames[i];
                    delete this.eventToCallbackMap[eventName];
                }
            },
            _showTooltip: function _showTooltip() {
                if (this.options.tooltip_split === false) {
                    this._addClass(this.tooltip, 'in');
                    this.tooltip_min.style.display = 'none';
                    this.tooltip_max.style.display = 'none';
                } else {
                    this._addClass(this.tooltip_min, 'in');
                    this._addClass(this.tooltip_max, 'in');
                    this.tooltip.style.display = 'none';
                }
                this._state.over = true;
            },
            _hideTooltip: function _hideTooltip() {
                if (this._state.inDrag === false && this.alwaysShowTooltip !== true) {
                    this._removeClass(this.tooltip, 'in');
                    this._removeClass(this.tooltip_min, 'in');
                    this._removeClass(this.tooltip_max, 'in');
                }
                this._state.over = false;
            },
            _setToolTipOnMouseOver: function _setToolTipOnMouseOver(tempState) {
                var formattedTooltipVal = this.options.formatter(!tempState ? this._state.value[0] : tempState.value[0]);
                var positionPercentages = !tempState ? getPositionPercentages(this._state, this.options.reversed) : getPositionPercentages(tempState, this.options.reversed);
                this._setText(this.tooltipInner, formattedTooltipVal);

                this.tooltip.style[this.stylePos] = positionPercentages[0] + "%";

                function getPositionPercentages(state, reversed) {
                    if (reversed) {
                        return [100 - state.percentage[0], this.options.range ? 100 - state.percentage[1] : state.percentage[1]];
                    }
                    return [state.percentage[0], state.percentage[1]];
                }
            },
            _addTickListener: function _addTickListener() {
                return {
                    addMouseEnter: function addMouseEnter(reference, tick, index) {
                        var enter = function enter() {
                            var tempState = reference._state;
                            var idString = index >= 0 ? index : this.attributes['aria-valuenow'].value;
                            var hoverIndex = parseInt(idString, 10);
                            tempState.value[0] = hoverIndex;
                            tempState.percentage[0] = reference.options.ticks_positions[hoverIndex];
                            reference._setToolTipOnMouseOver(tempState);
                            reference._showTooltip();
                        };
                        tick.addEventListener("mouseenter", enter, false);
                        return enter;
                    },
                    addMouseLeave: function addMouseLeave(reference, tick) {
                        var leave = function leave() {
                            reference._hideTooltip();
                        };
                        tick.addEventListener("mouseleave", leave, false);
                        return leave;
                    }
                };
            },
            _layout: function _layout() {
                var positionPercentages;

                if (this.options.reversed) {
                    positionPercentages = [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]];
                } else {
                    positionPercentages = [this._state.percentage[0], this._state.percentage[1]];
                }

                this.handle1.style[this.stylePos] = positionPercentages[0] + "%";
                this.handle1.setAttribute('aria-valuenow', this._state.value[0]);
                if (isNaN(this.options.formatter(this._state.value[0]))) {
                    this.handle1.setAttribute('aria-valuetext', this.options.formatter(this._state.value[0]));
                }

                this.handle2.style[this.stylePos] = positionPercentages[1] + "%";
                this.handle2.setAttribute('aria-valuenow', this._state.value[1]);
                if (isNaN(this.options.formatter(this._state.value[1]))) {
                    this.handle2.setAttribute('aria-valuetext', this.options.formatter(this._state.value[1]));
                }

                /* Position highlight range elements */
                if (this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
                    for (var _i = 0; _i < this.options.rangeHighlights.length; _i++) {
                        var startPercent = this._toPercentage(this.options.rangeHighlights[_i].start);
                        var endPercent = this._toPercentage(this.options.rangeHighlights[_i].end);

                        if (this.options.reversed) {
                            var sp = 100 - endPercent;
                            endPercent = 100 - startPercent;
                            startPercent = sp;
                        }

                        var currentRange = this._createHighlightRange(startPercent, endPercent);

                        if (currentRange) {
                            if (this.options.orientation === 'vertical') {
                                this.rangeHighlightElements[_i].style.top = currentRange.start + "%";
                                this.rangeHighlightElements[_i].style.height = currentRange.size + "%";
                            } else {
                                if (this.options.rtl) {
                                    this.rangeHighlightElements[_i].style.right = currentRange.start + "%";
                                } else {
                                    this.rangeHighlightElements[_i].style.left = currentRange.start + "%";
                                }
                                this.rangeHighlightElements[_i].style.width = currentRange.size + "%";
                            }
                        } else {
                            this.rangeHighlightElements[_i].style.display = "none";
                        }
                    }
                }

                /* Position ticks and labels */
                if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {

                    var styleSize = this.options.orientation === 'vertical' ? 'height' : 'width';
                    var styleMargin;
                    if (this.options.orientation === 'vertical') {
                        styleMargin = 'marginTop';
                    } else {
                        if (this.options.rtl) {
                            styleMargin = 'marginRight';
                        } else {
                            styleMargin = 'marginLeft';
                        }
                    }
                    var labelSize = this._state.size / (this.options.ticks.length - 1);

                    if (this.tickLabelContainer) {
                        var extraMargin = 0;
                        if (this.options.ticks_positions.length === 0) {
                            if (this.options.orientation !== 'vertical') {
                                this.tickLabelContainer.style[styleMargin] = -labelSize / 2 + "px";
                            }

                            extraMargin = this.tickLabelContainer.offsetHeight;
                        } else {
                            /* Chidren are position absolute, calculate height by finding the max offsetHeight of a child */
                            for (i = 0; i < this.tickLabelContainer.childNodes.length; i++) {
                                if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
                                    extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
                                }
                            }
                        }
                        if (this.options.orientation === 'horizontal') {
                            this.sliderElem.style.marginBottom = extraMargin + "px";
                        }
                    }
                    for (var i = 0; i < this.options.ticks.length; i++) {

                        var percentage = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);

                        if (this.options.reversed) {
                            percentage = 100 - percentage;
                        }

                        this.ticks[i].style[this.stylePos] = percentage + "%";

                        /* Set class labels to denote whether ticks are in the selection */
                        this._removeClass(this.ticks[i], 'in-selection');
                        if (!this.options.range) {
                            if (this.options.selection === 'after' && percentage >= positionPercentages[0]) {
                                this._addClass(this.ticks[i], 'in-selection');
                            } else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
                                this._addClass(this.ticks[i], 'in-selection');
                            }
                        } else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
                            this._addClass(this.ticks[i], 'in-selection');
                        }

                        if (this.tickLabels[i]) {
                            this.tickLabels[i].style[styleSize] = labelSize + "px";

                            if (this.options.orientation !== 'vertical' && this.options.ticks_positions[i] !== undefined) {
                                this.tickLabels[i].style.position = 'absolute';
                                this.tickLabels[i].style[this.stylePos] = percentage + "%";
                                this.tickLabels[i].style[styleMargin] = -labelSize / 2 + 'px';
                            } else if (this.options.orientation === 'vertical') {
                                if (this.options.rtl) {
                                    this.tickLabels[i].style['marginRight'] = this.sliderElem.offsetWidth + "px";
                                } else {
                                    this.tickLabels[i].style['marginLeft'] = this.sliderElem.offsetWidth + "px";
                                }
                                this.tickLabelContainer.style[styleMargin] = this.sliderElem.offsetWidth / 2 * -1 + 'px';
                            }
                        }
                    }
                }

                var formattedTooltipVal;

                if (this.options.range) {
                    formattedTooltipVal = this.options.formatter(this._state.value);
                    this._setText(this.tooltipInner, formattedTooltipVal);
                    this.tooltip.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0]) / 2 + "%";

                    var innerTooltipMinText = this.options.formatter(this._state.value[0]);
                    this._setText(this.tooltipInner_min, innerTooltipMinText);

                    var innerTooltipMaxText = this.options.formatter(this._state.value[1]);
                    this._setText(this.tooltipInner_max, innerTooltipMaxText);

                    this.tooltip_min.style[this.stylePos] = positionPercentages[0] + "%";

                    this.tooltip_max.style[this.stylePos] = positionPercentages[1] + "%";
                } else {
                    formattedTooltipVal = this.options.formatter(this._state.value[0]);
                    this._setText(this.tooltipInner, formattedTooltipVal);

                    this.tooltip.style[this.stylePos] = positionPercentages[0] + "%";
                }

                if (this.options.orientation === 'vertical') {
                    this.trackLow.style.top = '0';
                    this.trackLow.style.height = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

                    this.trackSelection.style.top = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
                    this.trackSelection.style.height = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

                    this.trackHigh.style.bottom = '0';
                    this.trackHigh.style.height = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
                } else {
                    if (this.stylePos === 'right') {
                        this.trackLow.style.right = '0';
                    } else {
                        this.trackLow.style.left = '0';
                    }
                    this.trackLow.style.width = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

                    if (this.stylePos === 'right') {
                        this.trackSelection.style.right = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
                    } else {
                        this.trackSelection.style.left = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
                    }
                    this.trackSelection.style.width = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

                    if (this.stylePos === 'right') {
                        this.trackHigh.style.left = '0';
                    } else {
                        this.trackHigh.style.right = '0';
                    }
                    this.trackHigh.style.width = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

                    var offset_min = this.tooltip_min.getBoundingClientRect();
                    var offset_max = this.tooltip_max.getBoundingClientRect();

                    if (this.options.tooltip_position === 'bottom') {
                        if (offset_min.right > offset_max.left) {
                            this._removeClass(this.tooltip_max, 'bottom');
                            this._addClass(this.tooltip_max, 'top');
                            this.tooltip_max.style.top = '';
                            this.tooltip_max.style.bottom = 22 + 'px';
                        } else {
                            this._removeClass(this.tooltip_max, 'top');
                            this._addClass(this.tooltip_max, 'bottom');
                            this.tooltip_max.style.top = this.tooltip_min.style.top;
                            this.tooltip_max.style.bottom = '';
                        }
                    } else {
                        if (offset_min.right > offset_max.left) {
                            this._removeClass(this.tooltip_max, 'top');
                            this._addClass(this.tooltip_max, 'bottom');
                            this.tooltip_max.style.top = 18 + 'px';
                        } else {
                            this._removeClass(this.tooltip_max, 'bottom');
                            this._addClass(this.tooltip_max, 'top');
                            this.tooltip_max.style.top = this.tooltip_min.style.top;
                        }
                    }
                }
            },
            _createHighlightRange: function _createHighlightRange(start, end) {
                if (this._isHighlightRange(start, end)) {
                    if (start > end) {
                        return { 'start': end, 'size': start - end };
                    }
                    return { 'start': start, 'size': end - start };
                }
                return null;
            },
            _isHighlightRange: function _isHighlightRange(start, end) {
                if (0 <= start && start <= 100 && 0 <= end && end <= 100) {
                    return true;
                } else {
                    return false;
                }
            },
            _resize: function _resize(ev) {
                /*jshint unused:false*/
                this._state.offset = this._offset(this.sliderElem);
                this._state.size = this.sliderElem[this.sizePos];
                this._layout();
            },
            _removeProperty: function _removeProperty(element, prop) {
                if (element.style.removeProperty) {
                    element.style.removeProperty(prop);
                } else {
                    element.style.removeAttribute(prop);
                }
            },
            _mousedown: function _mousedown(ev) {
                if (!this._state.enabled) {
                    return false;
                }

                this._state.offset = this._offset(this.sliderElem);
                this._state.size = this.sliderElem[this.sizePos];

                var percentage = this._getPercentage(ev);

                if (this.options.range) {
                    var diff1 = Math.abs(this._state.percentage[0] - percentage);
                    var diff2 = Math.abs(this._state.percentage[1] - percentage);
                    this._state.dragged = diff1 < diff2 ? 0 : 1;
                    this._adjustPercentageForRangeSliders(percentage);
                } else {
                    this._state.dragged = 0;
                }

                this._state.percentage[this._state.dragged] = percentage;
                this._layout();

                if (this.touchCapable) {
                    document.removeEventListener("touchmove", this.mousemove, false);
                    document.removeEventListener("touchend", this.mouseup, false);
                }

                if (this.mousemove) {
                    document.removeEventListener("mousemove", this.mousemove, false);
                }
                if (this.mouseup) {
                    document.removeEventListener("mouseup", this.mouseup, false);
                }

                this.mousemove = this._mousemove.bind(this);
                this.mouseup = this._mouseup.bind(this);

                if (this.touchCapable) {
                    // Touch: Bind touch events:
                    document.addEventListener("touchmove", this.mousemove, false);
                    document.addEventListener("touchend", this.mouseup, false);
                }
                // Bind mouse events:
                document.addEventListener("mousemove", this.mousemove, false);
                document.addEventListener("mouseup", this.mouseup, false);

                this._state.inDrag = true;
                var newValue = this._calculateValue();

                this._trigger('slideStart', newValue);

                this._setDataVal(newValue);
                this.setValue(newValue, false, true);

                ev.returnValue = false;

                if (this.options.focus) {
                    this._triggerFocusOnHandle(this._state.dragged);
                }

                return true;
            },
            _touchstart: function _touchstart(ev) {
                if (ev.changedTouches === undefined) {
                    this._mousedown(ev);
                    return;
                }

                var touch = ev.changedTouches[0];
                this.touchX = touch.pageX;
                this.touchY = touch.pageY;
            },
            _triggerFocusOnHandle: function _triggerFocusOnHandle(handleIdx) {
                if (handleIdx === 0) {
                    this.handle1.focus();
                }
                if (handleIdx === 1) {
                    this.handle2.focus();
                }
            },
            _keydown: function _keydown(handleIdx, ev) {
                if (!this._state.enabled) {
                    return false;
                }

                var dir;
                switch (ev.keyCode) {
                    case 37: // left
                    case 40:
                        // down
                        dir = -1;
                        break;
                    case 39: // right
                    case 38:
                        // up
                        dir = 1;
                        break;
                }
                if (!dir) {
                    return;
                }

                // use natural arrow keys instead of from min to max
                if (this.options.natural_arrow_keys) {
                    var ifVerticalAndNotReversed = this.options.orientation === 'vertical' && !this.options.reversed;
                    var ifHorizontalAndReversed = this.options.orientation === 'horizontal' && this.options.reversed; // @todo control with rtl

                    if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
                        dir = -dir;
                    }
                }

                var val = this._state.value[handleIdx] + dir * this.options.step;
                var percentage = val / this.options.max * 100;
                this._state.keyCtrl = handleIdx;
                if (this.options.range) {
                    this._adjustPercentageForRangeSliders(percentage);
                    var val1 = !this._state.keyCtrl ? val : this._state.value[0];
                    var val2 = this._state.keyCtrl ? val : this._state.value[1];
                    val = [val1, val2];
                }

                this._trigger('slideStart', val);
                this._setDataVal(val);
                this.setValue(val, true, true);

                this._setDataVal(val);
                this._trigger('slideStop', val);
                this._layout();

                this._pauseEvent(ev);
                delete this._state.keyCtrl;

                return false;
            },
            _pauseEvent: function _pauseEvent(ev) {
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                }
                if (ev.preventDefault) {
                    ev.preventDefault();
                }
                ev.cancelBubble = true;
                ev.returnValue = false;
            },
            _mousemove: function _mousemove(ev) {
                if (!this._state.enabled) {
                    return false;
                }

                var percentage = this._getPercentage(ev);
                this._adjustPercentageForRangeSliders(percentage);
                this._state.percentage[this._state.dragged] = percentage;
                this._layout();

                var val = this._calculateValue(true);
                this.setValue(val, true, true);

                return false;
            },
            _touchmove: function _touchmove(ev) {
                if (ev.changedTouches === undefined) {
                    return;
                }

                var touch = ev.changedTouches[0];

                var xDiff = touch.pageX - this.touchX;
                var yDiff = touch.pageY - this.touchY;

                if (!this._state.inDrag) {
                    // Vertical Slider
                    if (this.options.orientation === 'vertical' && xDiff <= 5 && xDiff >= -5 && (yDiff >= 15 || yDiff <= -15)) {
                        this._mousedown(ev);
                    }
                    // Horizontal slider.
                    else if (yDiff <= 5 && yDiff >= -5 && (xDiff >= 15 || xDiff <= -15)) {
                        this._mousedown(ev);
                    }
                }
            },
            _adjustPercentageForRangeSliders: function _adjustPercentageForRangeSliders(percentage) {
                if (this.options.range) {
                    var precision = this._getNumDigitsAfterDecimalPlace(percentage);
                    precision = precision ? precision - 1 : 0;
                    var percentageWithAdjustedPrecision = this._applyToFixedAndParseFloat(percentage, precision);
                    if (this._state.dragged === 0 && this._applyToFixedAndParseFloat(this._state.percentage[1], precision) < percentageWithAdjustedPrecision) {
                        this._state.percentage[0] = this._state.percentage[1];
                        this._state.dragged = 1;
                    } else if (this._state.dragged === 1 && this._applyToFixedAndParseFloat(this._state.percentage[0], precision) > percentageWithAdjustedPrecision) {
                        this._state.percentage[1] = this._state.percentage[0];
                        this._state.dragged = 0;
                    } else if (this._state.keyCtrl === 0 && this._state.value[1] / this.options.max * 100 < percentage) {
                        this._state.percentage[0] = this._state.percentage[1];
                        this._state.keyCtrl = 1;
                        this.handle2.focus();
                    } else if (this._state.keyCtrl === 1 && this._state.value[0] / this.options.max * 100 > percentage) {
                        this._state.percentage[1] = this._state.percentage[0];
                        this._state.keyCtrl = 0;
                        this.handle1.focus();
                    }
                }
            },
            _mouseup: function _mouseup() {
                if (!this._state.enabled) {
                    return false;
                }
                if (this.touchCapable) {
                    // Touch: Unbind touch event handlers:
                    document.removeEventListener("touchmove", this.mousemove, false);
                    document.removeEventListener("touchend", this.mouseup, false);
                }
                // Unbind mouse event handlers:
                document.removeEventListener("mousemove", this.mousemove, false);
                document.removeEventListener("mouseup", this.mouseup, false);

                this._state.inDrag = false;
                if (this._state.over === false) {
                    this._hideTooltip();
                }
                var val = this._calculateValue(true);

                this._layout();
                this._setDataVal(val);
                this._trigger('slideStop', val);

                return false;
            },
            _calculateValue: function _calculateValue(snapToClosestTick) {
                var val;
                if (this.options.range) {
                    val = [this.options.min, this.options.max];
                    if (this._state.percentage[0] !== 0) {
                        val[0] = this._toValue(this._state.percentage[0]);
                        val[0] = this._applyPrecision(val[0]);
                    }
                    if (this._state.percentage[1] !== 100) {
                        val[1] = this._toValue(this._state.percentage[1]);
                        val[1] = this._applyPrecision(val[1]);
                    }
                } else {
                    val = this._toValue(this._state.percentage[0]);
                    val = parseFloat(val);
                    val = this._applyPrecision(val);
                }

                if (snapToClosestTick) {
                    var min = [val, Infinity];
                    for (var i = 0; i < this.options.ticks.length; i++) {
                        var diff = Math.abs(this.options.ticks[i] - val);
                        if (diff <= min[1]) {
                            min = [this.options.ticks[i], diff];
                        }
                    }
                    if (min[1] <= this.options.ticks_snap_bounds) {
                        return min[0];
                    }
                }

                return val;
            },
            _applyPrecision: function _applyPrecision(val) {
                var precision = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                return this._applyToFixedAndParseFloat(val, precision);
            },
            _getNumDigitsAfterDecimalPlace: function _getNumDigitsAfterDecimalPlace(num) {
                var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if (!match) {
                    return 0;
                }
                return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
            },
            _applyToFixedAndParseFloat: function _applyToFixedAndParseFloat(num, toFixedInput) {
                var truncatedNum = num.toFixed(toFixedInput);
                return parseFloat(truncatedNum);
            },
			/*
   	Credits to Mike Samuel for the following method!
   	Source: http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
   */
            _getPercentage: function _getPercentage(ev) {
                if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
                    ev = ev.touches[0];
                }

                var eventPosition = ev[this.mousePos];
                var sliderOffset = this._state.offset[this.stylePos];
                var distanceToSlide = eventPosition - sliderOffset;
                if (this.stylePos === 'right') {
                    distanceToSlide = -distanceToSlide;
                }
                // Calculate what percent of the length the slider handle has slid
                var percentage = distanceToSlide / this._state.size * 100;
                percentage = Math.round(percentage / this._state.percentage[2]) * this._state.percentage[2];
                if (this.options.reversed) {
                    percentage = 100 - percentage;
                }

                // Make sure the percent is within the bounds of the slider.
                // 0% corresponds to the 'min' value of the slide
                // 100% corresponds to the 'max' value of the slide
                return Math.max(0, Math.min(100, percentage));
            },
            _validateInputValue: function _validateInputValue(val) {
                if (!isNaN(+val)) {
                    return +val;
                } else if (Array.isArray(val)) {
                    this._validateArray(val);
                    return val;
                } else {
                    throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(val));
                }
            },
            _validateArray: function _validateArray(val) {
                for (var i = 0; i < val.length; i++) {
                    var input = val[i];
                    if (typeof input !== 'number') {
                        throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(input));
                    }
                }
            },
            _setDataVal: function _setDataVal(val) {
                this.element.setAttribute('data-value', val);
                this.element.setAttribute('value', val);
                this.element.value = val;
            },
            _trigger: function _trigger(evt, val) {
                val = val || val === 0 ? val : undefined;

                var callbackFnArray = this.eventToCallbackMap[evt];
                if (callbackFnArray && callbackFnArray.length) {
                    for (var i = 0; i < callbackFnArray.length; i++) {
                        var callbackFn = callbackFnArray[i];
                        callbackFn(val);
                    }
                }

                /* If JQuery exists, trigger JQuery events */
                if ($) {
                    this._triggerJQueryEvent(evt, val);
                }
            },
            _triggerJQueryEvent: function _triggerJQueryEvent(evt, val) {
                var eventData = {
                    type: evt,
                    value: val
                };
                this.$element.trigger(eventData);
                this.$sliderElem.trigger(eventData);
            },
            _unbindJQueryEventHandlers: function _unbindJQueryEventHandlers() {
                this.$element.off();
                this.$sliderElem.off();
            },
            _setText: function _setText(element, text) {
                if (typeof element.textContent !== "undefined") {
                    element.textContent = text;
                } else if (typeof element.innerText !== "undefined") {
                    element.innerText = text;
                }
            },
            _removeClass: function _removeClass(element, classString) {
                var classes = classString.split(" ");
                var newClasses = element.className;

                for (var i = 0; i < classes.length; i++) {
                    var classTag = classes[i];
                    var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
                    newClasses = newClasses.replace(regex, " ");
                }

                element.className = newClasses.trim();
            },
            _addClass: function _addClass(element, classString) {
                var classes = classString.split(" ");
                var newClasses = element.className;

                for (var i = 0; i < classes.length; i++) {
                    var classTag = classes[i];
                    var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
                    var ifClassExists = regex.test(newClasses);

                    if (!ifClassExists) {
                        newClasses += " " + classTag;
                    }
                }

                element.className = newClasses.trim();
            },
            _offsetLeft: function _offsetLeft(obj) {
                return obj.getBoundingClientRect().left;
            },
            _offsetRight: function _offsetRight(obj) {
                return obj.getBoundingClientRect().right;
            },
            _offsetTop: function _offsetTop(obj) {
                var offsetTop = obj.offsetTop;
                while ((obj = obj.offsetParent) && !isNaN(obj.offsetTop)) {
                    offsetTop += obj.offsetTop;
                    if (obj.tagName !== 'BODY') {
                        offsetTop -= obj.scrollTop;
                    }
                }
                return offsetTop;
            },
            _offset: function _offset(obj) {
                return {
                    left: this._offsetLeft(obj),
                    right: this._offsetRight(obj),
                    top: this._offsetTop(obj)
                };
            },
            _css: function _css(elementRef, styleName, value) {
                if ($) {
                    $.style(elementRef, styleName, value);
                } else {
                    var style = styleName.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (all, letter) {
                        return letter.toUpperCase();
                    });
                    elementRef.style[style] = value;
                }
            },
            _toValue: function _toValue(percentage) {
                return this.options.scale.toValue.apply(this, [percentage]);
            },
            _toPercentage: function _toPercentage(value) {
                return this.options.scale.toPercentage.apply(this, [value]);
            },
            _setTooltipPosition: function _setTooltipPosition() {
                var tooltips = [this.tooltip, this.tooltip_min, this.tooltip_max];
                if (this.options.orientation === 'vertical') {
                    var tooltipPos;
                    if (this.options.tooltip_position) {
                        tooltipPos = this.options.tooltip_position;
                    } else {
                        if (this.options.rtl) {
                            tooltipPos = 'left';
                        } else {
                            tooltipPos = 'right';
                        }
                    }
                    var oppositeSide = tooltipPos === 'left' ? 'right' : 'left';
                    tooltips.forEach(function (tooltip) {
                        this._addClass(tooltip, tooltipPos);
                        tooltip.style[oppositeSide] = '100%';
                    }.bind(this));
                } else if (this.options.tooltip_position === 'bottom') {
                    tooltips.forEach(function (tooltip) {
                        this._addClass(tooltip, 'bottom');
                        tooltip.style.top = 22 + 'px';
                    }.bind(this));
                } else {
                    tooltips.forEach(function (tooltip) {
                        this._addClass(tooltip, 'top');
                        tooltip.style.top = -this.tooltip.outerHeight - 14 + 'px';
                    }.bind(this));
                }
            }
        };

		/*********************************
  		Attach to global namespace
  	*********************************/
        if ($ && $.fn) {
            var autoRegisterNamespace = void 0;

            if (!$.fn.slider) {
                $.bridget(NAMESPACE_MAIN, Slider);
                autoRegisterNamespace = NAMESPACE_MAIN;
            } else {
                if (windowIsDefined) {
                    window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.");
                }
                autoRegisterNamespace = NAMESPACE_ALTERNATE;
            }
            $.bridget(NAMESPACE_ALTERNATE, Slider);

            // Auto-Register data-provide="slider" Elements
            $(function () {
                $("input[data-provide=slider]")[autoRegisterNamespace]();
            });
        }
    })($);

    return Slider;
});
/*! tooltipster v4.2.5 */!function (a, b) { "function" == typeof define && define.amd ? define(["jquery"], function (a) { return b(a) }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery) }(this, function (a) {
    function b(a) { this.$container, this.constraints = null, this.__$tooltip, this.__init(a) } function c(b, c) { var d = !0; return a.each(b, function (a, e) { return void 0 === c[a] || b[a] !== c[a] ? (d = !1, !1) : void 0 }), d } function d(b) { var c = b.attr("id"), d = c ? h.window.document.getElementById(c) : null; return d ? d === b[0] : a.contains(h.window.document.body, b[0]) } function e() { if (!g) return !1; var a = g.document.body || g.document.documentElement, b = a.style, c = "transition", d = ["Moz", "Webkit", "Khtml", "O", "ms"]; if ("string" == typeof b[c]) return !0; c = c.charAt(0).toUpperCase() + c.substr(1); for (var e = 0; e < d.length; e++)if ("string" == typeof b[d[e] + c]) return !0; return !1 } var f = { animation: "fade", animationDuration: 350, content: null, contentAsHTML: !1, contentCloning: !1, debug: !0, delay: 300, delayTouch: [300, 500], functionInit: null, functionBefore: null, functionReady: null, functionAfter: null, functionFormat: null, IEmin: 6, interactive: !1, multiple: !1, parent: null, plugins: ["sideTip"], repositionOnScroll: !1, restoration: "none", selfDestruction: !0, theme: [], timer: 0, trackerInterval: 500, trackOrigin: !1, trackTooltip: !1, trigger: "hover", triggerClose: { click: !1, mouseleave: !1, originClick: !1, scroll: !1, tap: !1, touchleave: !1 }, triggerOpen: { click: !1, mouseenter: !1, tap: !1, touchstart: !1 }, updateAnimation: "rotate", zIndex: 9999999 }, g = "undefined" != typeof window ? window : null, h = { hasTouchCapability: !(!g || !("ontouchstart" in g || g.DocumentTouch && g.document instanceof g.DocumentTouch || g.navigator.maxTouchPoints)), hasTransitions: e(), IE: !1, semVer: "4.2.5", window: g }, i = function () { this.__$emitterPrivate = a({}), this.__$emitterPublic = a({}), this.__instancesLatestArr = [], this.__plugins = {}, this._env = h }; i.prototype = { __bridge: function (b, c, d) { if (!c[d]) { var e = function () { }; e.prototype = b; var g = new e; g.__init && g.__init(c), a.each(b, function (a, b) { 0 != a.indexOf("__") && (c[a] ? f.debug && console.log("The " + a + " method of the " + d + " plugin conflicts with another plugin or native methods") : (c[a] = function () { return g[a].apply(g, Array.prototype.slice.apply(arguments)) }, c[a].bridged = g)) }), c[d] = g } return this }, __setWindow: function (a) { return h.window = a, this }, _getRuler: function (a) { return new b(a) }, _off: function () { return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this }, _on: function () { return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this }, _one: function () { return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this }, _plugin: function (b) { var c = this; if ("string" == typeof b) { var d = b, e = null; return d.indexOf(".") > 0 ? e = c.__plugins[d] : a.each(c.__plugins, function (a, b) { return b.name.substring(b.name.length - d.length - 1) == "." + d ? (e = b, !1) : void 0 }), e } if (b.name.indexOf(".") < 0) throw new Error("Plugins must be namespaced"); return c.__plugins[b.name] = b, b.core && c.__bridge(b.core, c, b.name), this }, _trigger: function () { var a = Array.prototype.slice.apply(arguments); return "string" == typeof a[0] && (a[0] = { type: a[0] }), this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, a), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, a), this }, instances: function (b) { var c = [], d = b || ".tooltipstered"; return a(d).each(function () { var b = a(this), d = b.data("tooltipster-ns"); d && a.each(d, function (a, d) { c.push(b.data(d)) }) }), c }, instancesLatest: function () { return this.__instancesLatestArr }, off: function () { return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this }, on: function () { return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this }, one: function () { return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this }, origins: function (b) { var c = b ? b + " " : ""; return a(c + ".tooltipstered").toArray() }, setDefaults: function (b) { return a.extend(f, b), this }, triggerHandler: function () { return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this } }, a.tooltipster = new i, a.Tooltipster = function (b, c) { this.__callbacks = { close: [], open: [] }, this.__closingTime, this.__Content, this.__contentBcr, this.__destroyed = !1, this.__$emitterPrivate = a({}), this.__$emitterPublic = a({}), this.__enabled = !0, this.__garbageCollector, this.__Geometry, this.__lastPosition, this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random()), this.__options, this.__$originParents, this.__pointerIsOverOrigin = !1, this.__previousThemes = [], this.__state = "closed", this.__timeouts = { close: [], open: null }, this.__touchEvents = [], this.__tracker = null, this._$origin, this._$tooltip, this.__init(b, c) }, a.Tooltipster.prototype = { __init: function (b, c) { var d = this; if (d._$origin = a(b), d.__options = a.extend(!0, {}, f, c), d.__optionsFormat(), !h.IE || h.IE >= d.__options.IEmin) { var e = null; if (void 0 === d._$origin.data("tooltipster-initialTitle") && (e = d._$origin.attr("title"), void 0 === e && (e = null), d._$origin.data("tooltipster-initialTitle", e)), null !== d.__options.content) d.__contentSet(d.__options.content); else { var g, i = d._$origin.attr("data-tooltip-content"); i && (g = a(i)), g && g[0] ? d.__contentSet(g.first()) : d.__contentSet(e) } d._$origin.removeAttr("title").addClass("tooltipstered"), d.__prepareOrigin(), d.__prepareGC(), a.each(d.__options.plugins, function (a, b) { d._plug(b) }), h.hasTouchCapability && a(h.window.document.body).on("touchmove." + d.__namespace + "-triggerOpen", function (a) { d._touchRecordEvent(a) }), d._on("created", function () { d.__prepareTooltip() })._on("repositioned", function (a) { d.__lastPosition = a.position }) } else d.__options.disabled = !0 }, __contentInsert: function () { var a = this, b = a._$tooltip.find(".tooltipster-content"), c = a.__Content, d = function (a) { c = a }; return a._trigger({ type: "format", content: a.__Content, format: d }), a.__options.functionFormat && (c = a.__options.functionFormat.call(a, a, { origin: a._$origin[0] }, a.__Content)), "string" != typeof c || a.__options.contentAsHTML ? b.empty().append(c) : b.text(c), a }, __contentSet: function (b) { return b instanceof a && this.__options.contentCloning && (b = b.clone(!0)), this.__Content = b, this._trigger({ type: "updated", content: b }), this }, __destroyError: function () { throw new Error("This tooltip has been destroyed and cannot execute your method call.") }, __geometry: function () { var b = this, c = b._$origin, d = b._$origin.is("area"); if (d) { var e = b._$origin.parent().attr("name"); c = a('img[usemap="#' + e + '"]') } var f = c[0].getBoundingClientRect(), g = a(h.window.document), i = a(h.window), j = c, k = { available: { document: null, window: null }, document: { size: { height: g.height(), width: g.width() } }, window: { scroll: { left: h.window.scrollX || h.window.document.documentElement.scrollLeft, top: h.window.scrollY || h.window.document.documentElement.scrollTop }, size: { height: i.height(), width: i.width() } }, origin: { fixedLineage: !1, offset: {}, size: { height: f.bottom - f.top, width: f.right - f.left }, usemapImage: d ? c[0] : null, windowOffset: { bottom: f.bottom, left: f.left, right: f.right, top: f.top } } }; if (d) { var l = b._$origin.attr("shape"), m = b._$origin.attr("coords"); if (m && (m = m.split(","), a.map(m, function (a, b) { m[b] = parseInt(a) })), "default" != l) switch (l) { case "circle": var n = m[0], o = m[1], p = m[2], q = o - p, r = n - p; k.origin.size.height = 2 * p, k.origin.size.width = k.origin.size.height, k.origin.windowOffset.left += r, k.origin.windowOffset.top += q; break; case "rect": var s = m[0], t = m[1], u = m[2], v = m[3]; k.origin.size.height = v - t, k.origin.size.width = u - s, k.origin.windowOffset.left += s, k.origin.windowOffset.top += t; break; case "poly": for (var w = 0, x = 0, y = 0, z = 0, A = "even", B = 0; B < m.length; B++) { var C = m[B]; "even" == A ? (C > y && (y = C, 0 === B && (w = y)), w > C && (w = C), A = "odd") : (C > z && (z = C, 1 == B && (x = z)), x > C && (x = C), A = "even") } k.origin.size.height = z - x, k.origin.size.width = y - w, k.origin.windowOffset.left += w, k.origin.windowOffset.top += x } } var D = function (a) { k.origin.size.height = a.height, k.origin.windowOffset.left = a.left, k.origin.windowOffset.top = a.top, k.origin.size.width = a.width }; for (b._trigger({ type: "geometry", edit: D, geometry: { height: k.origin.size.height, left: k.origin.windowOffset.left, top: k.origin.windowOffset.top, width: k.origin.size.width } }), k.origin.windowOffset.right = k.origin.windowOffset.left + k.origin.size.width, k.origin.windowOffset.bottom = k.origin.windowOffset.top + k.origin.size.height, k.origin.offset.left = k.origin.windowOffset.left + k.window.scroll.left, k.origin.offset.top = k.origin.windowOffset.top + k.window.scroll.top, k.origin.offset.bottom = k.origin.offset.top + k.origin.size.height, k.origin.offset.right = k.origin.offset.left + k.origin.size.width, k.available.document = { bottom: { height: k.document.size.height - k.origin.offset.bottom, width: k.document.size.width }, left: { height: k.document.size.height, width: k.origin.offset.left }, right: { height: k.document.size.height, width: k.document.size.width - k.origin.offset.right }, top: { height: k.origin.offset.top, width: k.document.size.width } }, k.available.window = { bottom: { height: Math.max(k.window.size.height - Math.max(k.origin.windowOffset.bottom, 0), 0), width: k.window.size.width }, left: { height: k.window.size.height, width: Math.max(k.origin.windowOffset.left, 0) }, right: { height: k.window.size.height, width: Math.max(k.window.size.width - Math.max(k.origin.windowOffset.right, 0), 0) }, top: { height: Math.max(k.origin.windowOffset.top, 0), width: k.window.size.width } }; "html" != j[0].tagName.toLowerCase();) { if ("fixed" == j.css("position")) { k.origin.fixedLineage = !0; break } j = j.parent() } return k }, __optionsFormat: function () { return "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]), "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]), "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]), "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]), null === this.__options.parent ? this.__options.parent = a(h.window.document.body) : "string" == typeof this.__options.parent && (this.__options.parent = a(this.__options.parent)), "hover" == this.__options.trigger ? (this.__options.triggerOpen = { mouseenter: !0, touchstart: !0 }, this.__options.triggerClose = { mouseleave: !0, originClick: !0, touchleave: !0 }) : "click" == this.__options.trigger && (this.__options.triggerOpen = { click: !0, tap: !0 }, this.__options.triggerClose = { click: !0, tap: !0 }), this._trigger("options"), this }, __prepareGC: function () { var b = this; return b.__options.selfDestruction ? b.__garbageCollector = setInterval(function () { var c = (new Date).getTime(); b.__touchEvents = a.grep(b.__touchEvents, function (a, b) { return c - a.time > 6e4 }), d(b._$origin) || b.close(function () { b.destroy() }) }, 2e4) : clearInterval(b.__garbageCollector), b }, __prepareOrigin: function () { var a = this; if (a._$origin.off("." + a.__namespace + "-triggerOpen"), h.hasTouchCapability && a._$origin.on("touchstart." + a.__namespace + "-triggerOpen touchend." + a.__namespace + "-triggerOpen touchcancel." + a.__namespace + "-triggerOpen", function (b) { a._touchRecordEvent(b) }), a.__options.triggerOpen.click || a.__options.triggerOpen.tap && h.hasTouchCapability) { var b = ""; a.__options.triggerOpen.click && (b += "click." + a.__namespace + "-triggerOpen "), a.__options.triggerOpen.tap && h.hasTouchCapability && (b += "touchend." + a.__namespace + "-triggerOpen"), a._$origin.on(b, function (b) { a._touchIsMeaningfulEvent(b) && a._open(b) }) } if (a.__options.triggerOpen.mouseenter || a.__options.triggerOpen.touchstart && h.hasTouchCapability) { var b = ""; a.__options.triggerOpen.mouseenter && (b += "mouseenter." + a.__namespace + "-triggerOpen "), a.__options.triggerOpen.touchstart && h.hasTouchCapability && (b += "touchstart." + a.__namespace + "-triggerOpen"), a._$origin.on(b, function (b) { !a._touchIsTouchEvent(b) && a._touchIsEmulatedEvent(b) || (a.__pointerIsOverOrigin = !0, a._openShortly(b)) }) } if (a.__options.triggerClose.mouseleave || a.__options.triggerClose.touchleave && h.hasTouchCapability) { var b = ""; a.__options.triggerClose.mouseleave && (b += "mouseleave." + a.__namespace + "-triggerOpen "), a.__options.triggerClose.touchleave && h.hasTouchCapability && (b += "touchend." + a.__namespace + "-triggerOpen touchcancel." + a.__namespace + "-triggerOpen"), a._$origin.on(b, function (b) { a._touchIsMeaningfulEvent(b) && (a.__pointerIsOverOrigin = !1) }) } return a }, __prepareTooltip: function () { var b = this, c = b.__options.interactive ? "auto" : ""; return b._$tooltip.attr("id", b.__namespace).css({ "pointer-events": c, zIndex: b.__options.zIndex }), a.each(b.__previousThemes, function (a, c) { b._$tooltip.removeClass(c) }), a.each(b.__options.theme, function (a, c) { b._$tooltip.addClass(c) }), b.__previousThemes = a.merge([], b.__options.theme), b }, __scrollHandler: function (b) { var c = this; if (c.__options.triggerClose.scroll) c._close(b); else if (d(c._$origin) && d(c._$tooltip)) { var e = null; if (b.target === h.window.document) c.__Geometry.origin.fixedLineage || c.__options.repositionOnScroll && c.reposition(b); else { e = c.__geometry(); var f = !1; if ("fixed" != c._$origin.css("position") && c.__$originParents.each(function (b, c) { var d = a(c), g = d.css("overflow-x"), h = d.css("overflow-y"); if ("visible" != g || "visible" != h) { var i = c.getBoundingClientRect(); if ("visible" != g && (e.origin.windowOffset.left < i.left || e.origin.windowOffset.right > i.right)) return f = !0, !1; if ("visible" != h && (e.origin.windowOffset.top < i.top || e.origin.windowOffset.bottom > i.bottom)) return f = !0, !1 } return "fixed" == d.css("position") ? !1 : void 0 }), f) c._$tooltip.css("visibility", "hidden"); else if (c._$tooltip.css("visibility", "visible"), c.__options.repositionOnScroll) c.reposition(b); else { var g = e.origin.offset.left - c.__Geometry.origin.offset.left, i = e.origin.offset.top - c.__Geometry.origin.offset.top; c._$tooltip.css({ left: c.__lastPosition.coord.left + g, top: c.__lastPosition.coord.top + i }) } } c._trigger({ type: "scroll", event: b, geo: e }) } return c }, __stateSet: function (a) { return this.__state = a, this._trigger({ type: "state", state: a }), this }, __timeoutsClear: function () { return clearTimeout(this.__timeouts.open), this.__timeouts.open = null, a.each(this.__timeouts.close, function (a, b) { clearTimeout(b) }), this.__timeouts.close = [], this }, __trackerStart: function () { var a = this, b = a._$tooltip.find(".tooltipster-content"); return a.__options.trackTooltip && (a.__contentBcr = b[0].getBoundingClientRect()), a.__tracker = setInterval(function () { if (d(a._$origin) && d(a._$tooltip)) { if (a.__options.trackOrigin) { var e = a.__geometry(), f = !1; c(e.origin.size, a.__Geometry.origin.size) && (a.__Geometry.origin.fixedLineage ? c(e.origin.windowOffset, a.__Geometry.origin.windowOffset) && (f = !0) : c(e.origin.offset, a.__Geometry.origin.offset) && (f = !0)), f || (a.__options.triggerClose.mouseleave ? a._close() : a.reposition()) } if (a.__options.trackTooltip) { var g = b[0].getBoundingClientRect(); g.height === a.__contentBcr.height && g.width === a.__contentBcr.width || (a.reposition(), a.__contentBcr = g) } } else a._close() }, a.__options.trackerInterval), a }, _close: function (b, c, d) { var e = this, f = !0; if (e._trigger({ type: "close", event: b, stop: function () { f = !1 } }), f || d) { c && e.__callbacks.close.push(c), e.__callbacks.open = [], e.__timeoutsClear(); var g = function () { a.each(e.__callbacks.close, function (a, c) { c.call(e, e, { event: b, origin: e._$origin[0] }) }), e.__callbacks.close = [] }; if ("closed" != e.__state) { var i = !0, j = new Date, k = j.getTime(), l = k + e.__options.animationDuration[1]; if ("disappearing" == e.__state && l > e.__closingTime && e.__options.animationDuration[1] > 0 && (i = !1), i) { e.__closingTime = l, "disappearing" != e.__state && e.__stateSet("disappearing"); var m = function () { clearInterval(e.__tracker), e._trigger({ type: "closing", event: b }), e._$tooltip.off("." + e.__namespace + "-triggerClose").removeClass("tooltipster-dying"), a(h.window).off("." + e.__namespace + "-triggerClose"), e.__$originParents.each(function (b, c) { a(c).off("scroll." + e.__namespace + "-triggerClose") }), e.__$originParents = null, a(h.window.document.body).off("." + e.__namespace + "-triggerClose"), e._$origin.off("." + e.__namespace + "-triggerClose"), e._off("dismissable"), e.__stateSet("closed"), e._trigger({ type: "after", event: b }), e.__options.functionAfter && e.__options.functionAfter.call(e, e, { event: b, origin: e._$origin[0] }), g() }; h.hasTransitions ? (e._$tooltip.css({ "-moz-animation-duration": e.__options.animationDuration[1] + "ms", "-ms-animation-duration": e.__options.animationDuration[1] + "ms", "-o-animation-duration": e.__options.animationDuration[1] + "ms", "-webkit-animation-duration": e.__options.animationDuration[1] + "ms", "animation-duration": e.__options.animationDuration[1] + "ms", "transition-duration": e.__options.animationDuration[1] + "ms" }), e._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"), e.__options.animationDuration[1] > 0 && e._$tooltip.delay(e.__options.animationDuration[1]), e._$tooltip.queue(m)) : e._$tooltip.stop().fadeOut(e.__options.animationDuration[1], m) } } else g() } return e }, _off: function () { return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this }, _on: function () { return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this }, _one: function () { return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this }, _open: function (b, c) { var e = this; if (!e.__destroying && d(e._$origin) && e.__enabled) { var f = !0; if ("closed" == e.__state && (e._trigger({ type: "before", event: b, stop: function () { f = !1 } }), f && e.__options.functionBefore && (f = e.__options.functionBefore.call(e, e, { event: b, origin: e._$origin[0] }))), f !== !1 && null !== e.__Content) { c && e.__callbacks.open.push(c), e.__callbacks.close = [], e.__timeoutsClear(); var g, i = function () { "stable" != e.__state && e.__stateSet("stable"), a.each(e.__callbacks.open, function (a, b) { b.call(e, e, { origin: e._$origin[0], tooltip: e._$tooltip[0] }) }), e.__callbacks.open = [] }; if ("closed" !== e.__state) g = 0, "disappearing" === e.__state ? (e.__stateSet("appearing"), h.hasTransitions ? (e._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"), e.__options.animationDuration[0] > 0 && e._$tooltip.delay(e.__options.animationDuration[0]), e._$tooltip.queue(i)) : e._$tooltip.stop().fadeIn(i)) : "stable" == e.__state && i(); else { if (e.__stateSet("appearing"), g = e.__options.animationDuration[0], e.__contentInsert(), e.reposition(b, !0), h.hasTransitions ? (e._$tooltip.addClass("tooltipster-" + e.__options.animation).addClass("tooltipster-initial").css({ "-moz-animation-duration": e.__options.animationDuration[0] + "ms", "-ms-animation-duration": e.__options.animationDuration[0] + "ms", "-o-animation-duration": e.__options.animationDuration[0] + "ms", "-webkit-animation-duration": e.__options.animationDuration[0] + "ms", "animation-duration": e.__options.animationDuration[0] + "ms", "transition-duration": e.__options.animationDuration[0] + "ms" }), setTimeout(function () { "closed" != e.__state && (e._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), e.__options.animationDuration[0] > 0 && e._$tooltip.delay(e.__options.animationDuration[0]), e._$tooltip.queue(i)) }, 0)) : e._$tooltip.css("display", "none").fadeIn(e.__options.animationDuration[0], i), e.__trackerStart(), a(h.window).on("resize." + e.__namespace + "-triggerClose", function (b) { var c = a(document.activeElement); (c.is("input") || c.is("textarea")) && a.contains(e._$tooltip[0], c[0]) || e.reposition(b) }).on("scroll." + e.__namespace + "-triggerClose", function (a) { e.__scrollHandler(a) }), e.__$originParents = e._$origin.parents(), e.__$originParents.each(function (b, c) { a(c).on("scroll." + e.__namespace + "-triggerClose", function (a) { e.__scrollHandler(a) }) }), e.__options.triggerClose.mouseleave || e.__options.triggerClose.touchleave && h.hasTouchCapability) { e._on("dismissable", function (a) { a.dismissable ? a.delay ? (m = setTimeout(function () { e._close(a.event) }, a.delay), e.__timeouts.close.push(m)) : e._close(a) : clearTimeout(m) }); var j = e._$origin, k = "", l = "", m = null; e.__options.interactive && (j = j.add(e._$tooltip)), e.__options.triggerClose.mouseleave && (k += "mouseenter." + e.__namespace + "-triggerClose ", l += "mouseleave." + e.__namespace + "-triggerClose "), e.__options.triggerClose.touchleave && h.hasTouchCapability && (k += "touchstart." + e.__namespace + "-triggerClose", l += "touchend." + e.__namespace + "-triggerClose touchcancel." + e.__namespace + "-triggerClose"), j.on(l, function (a) { if (e._touchIsTouchEvent(a) || !e._touchIsEmulatedEvent(a)) { var b = "mouseleave" == a.type ? e.__options.delay : e.__options.delayTouch; e._trigger({ delay: b[1], dismissable: !0, event: a, type: "dismissable" }) } }).on(k, function (a) { !e._touchIsTouchEvent(a) && e._touchIsEmulatedEvent(a) || e._trigger({ dismissable: !1, event: a, type: "dismissable" }) }) } e.__options.triggerClose.originClick && e._$origin.on("click." + e.__namespace + "-triggerClose", function (a) { e._touchIsTouchEvent(a) || e._touchIsEmulatedEvent(a) || e._close(a) }), (e.__options.triggerClose.click || e.__options.triggerClose.tap && h.hasTouchCapability) && setTimeout(function () { if ("closed" != e.__state) { var b = "", c = a(h.window.document.body); e.__options.triggerClose.click && (b += "click." + e.__namespace + "-triggerClose "), e.__options.triggerClose.tap && h.hasTouchCapability && (b += "touchend." + e.__namespace + "-triggerClose"), c.on(b, function (b) { e._touchIsMeaningfulEvent(b) && (e._touchRecordEvent(b), e.__options.interactive && a.contains(e._$tooltip[0], b.target) || e._close(b)) }), e.__options.triggerClose.tap && h.hasTouchCapability && c.on("touchstart." + e.__namespace + "-triggerClose", function (a) { e._touchRecordEvent(a) }) } }, 0), e._trigger("ready"), e.__options.functionReady && e.__options.functionReady.call(e, e, { origin: e._$origin[0], tooltip: e._$tooltip[0] }) } if (e.__options.timer > 0) { var m = setTimeout(function () { e._close() }, e.__options.timer + g); e.__timeouts.close.push(m) } } } return e }, _openShortly: function (a) { var b = this, c = !0; if ("stable" != b.__state && "appearing" != b.__state && !b.__timeouts.open && (b._trigger({ type: "start", event: a, stop: function () { c = !1 } }), c)) { var d = 0 == a.type.indexOf("touch") ? b.__options.delayTouch : b.__options.delay; d[0] ? b.__timeouts.open = setTimeout(function () { b.__timeouts.open = null, b.__pointerIsOverOrigin && b._touchIsMeaningfulEvent(a) ? (b._trigger("startend"), b._open(a)) : b._trigger("startcancel") }, d[0]) : (b._trigger("startend"), b._open(a)) } return b }, _optionsExtract: function (b, c) { var d = this, e = a.extend(!0, {}, c), f = d.__options[b]; return f || (f = {}, a.each(c, function (a, b) { var c = d.__options[a]; void 0 !== c && (f[a] = c) })), a.each(e, function (b, c) { void 0 !== f[b] && ("object" != typeof c || c instanceof Array || null == c || "object" != typeof f[b] || f[b] instanceof Array || null == f[b] ? e[b] = f[b] : a.extend(e[b], f[b])) }), e }, _plug: function (b) { var c = a.tooltipster._plugin(b); if (!c) throw new Error('The "' + b + '" plugin is not defined'); return c.instance && a.tooltipster.__bridge(c.instance, this, c.name), this }, _touchIsEmulatedEvent: function (a) { for (var b = !1, c = (new Date).getTime(), d = this.__touchEvents.length - 1; d >= 0; d--) { var e = this.__touchEvents[d]; if (!(c - e.time < 500)) break; e.target === a.target && (b = !0) } return b }, _touchIsMeaningfulEvent: function (a) { return this._touchIsTouchEvent(a) && !this._touchSwiped(a.target) || !this._touchIsTouchEvent(a) && !this._touchIsEmulatedEvent(a) }, _touchIsTouchEvent: function (a) { return 0 == a.type.indexOf("touch") }, _touchRecordEvent: function (a) { return this._touchIsTouchEvent(a) && (a.time = (new Date).getTime(), this.__touchEvents.push(a)), this }, _touchSwiped: function (a) { for (var b = !1, c = this.__touchEvents.length - 1; c >= 0; c--) { var d = this.__touchEvents[c]; if ("touchmove" == d.type) { b = !0; break } if ("touchstart" == d.type && a === d.target) break } return b }, _trigger: function () { var b = Array.prototype.slice.apply(arguments); return "string" == typeof b[0] && (b[0] = { type: b[0] }), b[0].instance = this, b[0].origin = this._$origin ? this._$origin[0] : null, b[0].tooltip = this._$tooltip ? this._$tooltip[0] : null, this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, b), a.tooltipster._trigger.apply(a.tooltipster, b), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, b), this }, _unplug: function (b) { var c = this; if (c[b]) { var d = a.tooltipster._plugin(b); d.instance && a.each(d.instance, function (a, d) { c[a] && c[a].bridged === c[b] && delete c[a] }), c[b].__destroy && c[b].__destroy(), delete c[b] } return c }, close: function (a) { return this.__destroyed ? this.__destroyError() : this._close(null, a), this }, content: function (a) { var b = this; if (void 0 === a) return b.__Content; if (b.__destroyed) b.__destroyError(); else if (b.__contentSet(a), null !== b.__Content) { if ("closed" !== b.__state && (b.__contentInsert(), b.reposition(), b.__options.updateAnimation)) if (h.hasTransitions) { var c = b.__options.updateAnimation; b._$tooltip.addClass("tooltipster-update-" + c), setTimeout(function () { "closed" != b.__state && b._$tooltip.removeClass("tooltipster-update-" + c) }, 1e3) } else b._$tooltip.fadeTo(200, .5, function () { "closed" != b.__state && b._$tooltip.fadeTo(200, 1) }) } else b._close(); return b }, destroy: function () { var b = this; if (b.__destroyed) b.__destroyError(); else { "closed" != b.__state ? b.option("animationDuration", 0)._close(null, null, !0) : b.__timeoutsClear(), b._trigger("destroy"), b.__destroyed = !0, b._$origin.removeData(b.__namespace).off("." + b.__namespace + "-triggerOpen"), a(h.window.document.body).off("." + b.__namespace + "-triggerOpen"); var c = b._$origin.data("tooltipster-ns"); if (c) if (1 === c.length) { var d = null; "previous" == b.__options.restoration ? d = b._$origin.data("tooltipster-initialTitle") : "current" == b.__options.restoration && (d = "string" == typeof b.__Content ? b.__Content : a("<div></div>").append(b.__Content).html()), d && b._$origin.attr("title", d), b._$origin.removeClass("tooltipstered"), b._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle") } else c = a.grep(c, function (a, c) { return a !== b.__namespace }), b._$origin.data("tooltipster-ns", c); b._trigger("destroyed"), b._off(), b.off(), b.__Content = null, b.__$emitterPrivate = null, b.__$emitterPublic = null, b.__options.parent = null, b._$origin = null, b._$tooltip = null, a.tooltipster.__instancesLatestArr = a.grep(a.tooltipster.__instancesLatestArr, function (a, c) { return b !== a }), clearInterval(b.__garbageCollector) } return b }, disable: function () { return this.__destroyed ? (this.__destroyError(), this) : (this._close(), this.__enabled = !1, this) }, elementOrigin: function () { return this.__destroyed ? void this.__destroyError() : this._$origin[0] }, elementTooltip: function () { return this._$tooltip ? this._$tooltip[0] : null }, enable: function () { return this.__enabled = !0, this }, hide: function (a) { return this.close(a) }, instance: function () { return this }, off: function () { return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this }, on: function () { return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this }, one: function () { return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this }, open: function (a) { return this.__destroyed ? this.__destroyError() : this._open(null, a), this }, option: function (b, c) { return void 0 === c ? this.__options[b] : (this.__destroyed ? this.__destroyError() : (this.__options[b] = c, this.__optionsFormat(), a.inArray(b, ["trigger", "triggerClose", "triggerOpen"]) >= 0 && this.__prepareOrigin(), "selfDestruction" === b && this.__prepareGC()), this) }, reposition: function (a, b) { var c = this; return c.__destroyed ? c.__destroyError() : "closed" != c.__state && d(c._$origin) && (b || d(c._$tooltip)) && (b || c._$tooltip.detach(), c.__Geometry = c.__geometry(), c._trigger({ type: "reposition", event: a, helper: { geo: c.__Geometry } })), c }, show: function (a) { return this.open(a) }, status: function () { return { destroyed: this.__destroyed, enabled: this.__enabled, open: "closed" !== this.__state, state: this.__state } }, triggerHandler: function () { return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this } }, a.fn.tooltipster = function () { var b = Array.prototype.slice.apply(arguments), c = "You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE."; if (0 === this.length) return this; if ("string" == typeof b[0]) { var d = "#*$~&"; return this.each(function () { var e = a(this).data("tooltipster-ns"), f = e ? a(this).data(e[0]) : null; if (!f) throw new Error("You called Tooltipster's \"" + b[0] + '" method on an uninitialized element'); if ("function" != typeof f[b[0]]) throw new Error('Unknown method "' + b[0] + '"'); this.length > 1 && "content" == b[0] && (b[1] instanceof a || "object" == typeof b[1] && null != b[1] && b[1].tagName) && !f.__options.contentCloning && f.__options.debug && console.log(c); var g = f[b[0]](b[1], b[2]); return g !== f || "instance" === b[0] ? (d = g, !1) : void 0 }), "#*$~&" !== d ? d : this } a.tooltipster.__instancesLatestArr = []; var e = b[0] && void 0 !== b[0].multiple, g = e && b[0].multiple || !e && f.multiple, h = b[0] && void 0 !== b[0].content, i = h && b[0].content || !h && f.content, j = b[0] && void 0 !== b[0].contentCloning, k = j && b[0].contentCloning || !j && f.contentCloning, l = b[0] && void 0 !== b[0].debug, m = l && b[0].debug || !l && f.debug; return this.length > 1 && (i instanceof a || "object" == typeof i && null != i && i.tagName) && !k && m && console.log(c), this.each(function () { var c = !1, d = a(this), e = d.data("tooltipster-ns"), f = null; e ? g ? c = !0 : m && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."), console.log(this)) : c = !0, c && (f = new a.Tooltipster(this, b[0]), e || (e = []), e.push(f.__namespace), d.data("tooltipster-ns", e), d.data(f.__namespace, f), f.__options.functionInit && f.__options.functionInit.call(f, f, { origin: this }), f._trigger("init")), a.tooltipster.__instancesLatestArr.push(f) }), this }, b.prototype = { __init: function (b) { this.__$tooltip = b, this.__$tooltip.css({ left: 0, overflow: "hidden", position: "absolute", top: 0 }).find(".tooltipster-content").css("overflow", "auto"), this.$container = a('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(h.window.document.body) }, __forceRedraw: function () { var a = this.__$tooltip.parent(); this.__$tooltip.detach(), this.__$tooltip.appendTo(a) }, constrain: function (a, b) { return this.constraints = { width: a, height: b }, this.__$tooltip.css({ display: "block", height: "", overflow: "auto", width: a }), this }, destroy: function () { this.__$tooltip.detach().find(".tooltipster-content").css({ display: "", overflow: "" }), this.$container.remove() }, free: function () { return this.constraints = null, this.__$tooltip.css({ display: "", height: "", overflow: "visible", width: "" }), this }, measure: function () { this.__forceRedraw(); var a = this.__$tooltip[0].getBoundingClientRect(), b = { size: { height: a.height || a.bottom - a.top, width: a.width || a.right - a.left } }; if (this.constraints) { var c = this.__$tooltip.find(".tooltipster-content"), d = this.__$tooltip.outerHeight(), e = c[0].getBoundingClientRect(), f = { height: d <= this.constraints.height, width: a.width <= this.constraints.width && e.width >= c[0].scrollWidth - 1 }; b.fits = f.height && f.width } return h.IE && h.IE <= 11 && b.size.width !== h.window.document.documentElement.clientWidth && (b.size.width = Math.ceil(b.size.width) + 1), b } }; var j = navigator.userAgent.toLowerCase(); -1 != j.indexOf("msie") ? h.IE = parseInt(j.split("msie")[1]) : -1 !== j.toLowerCase().indexOf("trident") && -1 !== j.indexOf(" rv:11") ? h.IE = 11 : -1 != j.toLowerCase().indexOf("edge/") && (h.IE = parseInt(j.toLowerCase().split("edge/")[1])); var k = "tooltipster.sideTip"; return a.tooltipster._plugin({
        name: k, instance: {
            __defaults: function () { return { arrow: !0, distance: 6, functionPosition: null, maxWidth: null, minIntersection: 16, minWidth: 0, position: null, side: "top", viewportAware: !0 } }, __init: function (a) { var b = this; b.__instance = a, b.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random()), b.__previousState = "closed", b.__options, b.__optionsFormat(), b.__instance._on("state." + b.__namespace, function (a) { "closed" == a.state ? b.__close() : "appearing" == a.state && "closed" == b.__previousState && b.__create(), b.__previousState = a.state }), b.__instance._on("options." + b.__namespace, function () { b.__optionsFormat() }), b.__instance._on("reposition." + b.__namespace, function (a) { b.__reposition(a.event, a.helper) }) }, __close: function () { this.__instance.content() instanceof a && this.__instance.content().detach(), this.__instance._$tooltip.remove(), this.__instance._$tooltip = null }, __create: function () {
                var b = a('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>'); this.__options.arrow || b.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(), this.__options.minWidth && b.css("min-width", this.__options.minWidth + "px"), this.__options.maxWidth && b.css("max-width", this.__options.maxWidth + "px"),
                    this.__instance._$tooltip = b, this.__instance._trigger("created")
            }, __destroy: function () { this.__instance._off("." + self.__namespace) }, __optionsFormat: function () { var b = this; if (b.__options = b.__instance._optionsExtract(k, b.__defaults()), b.__options.position && (b.__options.side = b.__options.position), "object" != typeof b.__options.distance && (b.__options.distance = [b.__options.distance]), b.__options.distance.length < 4 && (void 0 === b.__options.distance[1] && (b.__options.distance[1] = b.__options.distance[0]), void 0 === b.__options.distance[2] && (b.__options.distance[2] = b.__options.distance[0]), void 0 === b.__options.distance[3] && (b.__options.distance[3] = b.__options.distance[1]), b.__options.distance = { top: b.__options.distance[0], right: b.__options.distance[1], bottom: b.__options.distance[2], left: b.__options.distance[3] }), "string" == typeof b.__options.side) { var c = { top: "bottom", right: "left", bottom: "top", left: "right" }; b.__options.side = [b.__options.side, c[b.__options.side]], "left" == b.__options.side[0] || "right" == b.__options.side[0] ? b.__options.side.push("top", "bottom") : b.__options.side.push("right", "left") } 6 === a.tooltipster._env.IE && b.__options.arrow !== !0 && (b.__options.arrow = !1) }, __reposition: function (b, c) { var d, e = this, f = e.__targetFind(c), g = []; e.__instance._$tooltip.detach(); var h = e.__instance._$tooltip.clone(), i = a.tooltipster._getRuler(h), j = !1, k = e.__instance.option("animation"); switch (k && h.removeClass("tooltipster-" + k), a.each(["window", "document"], function (d, k) { var l = null; if (e.__instance._trigger({ container: k, helper: c, satisfied: j, takeTest: function (a) { l = a }, results: g, type: "positionTest" }), 1 == l || 0 != l && 0 == j && ("window" != k || e.__options.viewportAware)) for (var d = 0; d < e.__options.side.length; d++) { var m = { horizontal: 0, vertical: 0 }, n = e.__options.side[d]; "top" == n || "bottom" == n ? m.vertical = e.__options.distance[n] : m.horizontal = e.__options.distance[n], e.__sideChange(h, n), a.each(["natural", "constrained"], function (a, d) { if (l = null, e.__instance._trigger({ container: k, event: b, helper: c, mode: d, results: g, satisfied: j, side: n, takeTest: function (a) { l = a }, type: "positionTest" }), 1 == l || 0 != l && 0 == j) { var h = { container: k, distance: m, fits: null, mode: d, outerSize: null, side: n, size: null, target: f[n], whole: null }, o = "natural" == d ? i.free() : i.constrain(c.geo.available[k][n].width - m.horizontal, c.geo.available[k][n].height - m.vertical), p = o.measure(); if (h.size = p.size, h.outerSize = { height: p.size.height + m.vertical, width: p.size.width + m.horizontal }, "natural" == d ? c.geo.available[k][n].width >= h.outerSize.width && c.geo.available[k][n].height >= h.outerSize.height ? h.fits = !0 : h.fits = !1 : h.fits = p.fits, "window" == k && (h.fits ? "top" == n || "bottom" == n ? h.whole = c.geo.origin.windowOffset.right >= e.__options.minIntersection && c.geo.window.size.width - c.geo.origin.windowOffset.left >= e.__options.minIntersection : h.whole = c.geo.origin.windowOffset.bottom >= e.__options.minIntersection && c.geo.window.size.height - c.geo.origin.windowOffset.top >= e.__options.minIntersection : h.whole = !1), g.push(h), h.whole) j = !0; else if ("natural" == h.mode && (h.fits || h.size.width <= c.geo.available[k][n].width)) return !1 } }) } }), e.__instance._trigger({ edit: function (a) { g = a }, event: b, helper: c, results: g, type: "positionTested" }), g.sort(function (a, b) { if (a.whole && !b.whole) return -1; if (!a.whole && b.whole) return 1; if (a.whole && b.whole) { var c = e.__options.side.indexOf(a.side), d = e.__options.side.indexOf(b.side); return d > c ? -1 : c > d ? 1 : "natural" == a.mode ? -1 : 1 } if (a.fits && !b.fits) return -1; if (!a.fits && b.fits) return 1; if (a.fits && b.fits) { var c = e.__options.side.indexOf(a.side), d = e.__options.side.indexOf(b.side); return d > c ? -1 : c > d ? 1 : "natural" == a.mode ? -1 : 1 } return "document" == a.container && "bottom" == a.side && "natural" == a.mode ? -1 : 1 }), d = g[0], d.coord = {}, d.side) { case "left": case "right": d.coord.top = Math.floor(d.target - d.size.height / 2); break; case "bottom": case "top": d.coord.left = Math.floor(d.target - d.size.width / 2) }switch (d.side) { case "left": d.coord.left = c.geo.origin.windowOffset.left - d.outerSize.width; break; case "right": d.coord.left = c.geo.origin.windowOffset.right + d.distance.horizontal; break; case "top": d.coord.top = c.geo.origin.windowOffset.top - d.outerSize.height; break; case "bottom": d.coord.top = c.geo.origin.windowOffset.bottom + d.distance.vertical }"window" == d.container ? "top" == d.side || "bottom" == d.side ? d.coord.left < 0 ? c.geo.origin.windowOffset.right - this.__options.minIntersection >= 0 ? d.coord.left = 0 : d.coord.left = c.geo.origin.windowOffset.right - this.__options.minIntersection - 1 : d.coord.left > c.geo.window.size.width - d.size.width && (c.geo.origin.windowOffset.left + this.__options.minIntersection <= c.geo.window.size.width ? d.coord.left = c.geo.window.size.width - d.size.width : d.coord.left = c.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - d.size.width) : d.coord.top < 0 ? c.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0 ? d.coord.top = 0 : d.coord.top = c.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : d.coord.top > c.geo.window.size.height - d.size.height && (c.geo.origin.windowOffset.top + this.__options.minIntersection <= c.geo.window.size.height ? d.coord.top = c.geo.window.size.height - d.size.height : d.coord.top = c.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - d.size.height) : (d.coord.left > c.geo.window.size.width - d.size.width && (d.coord.left = c.geo.window.size.width - d.size.width), d.coord.left < 0 && (d.coord.left = 0)), e.__sideChange(h, d.side), c.tooltipClone = h[0], c.tooltipParent = e.__instance.option("parent").parent[0], c.mode = d.mode, c.whole = d.whole, c.origin = e.__instance._$origin[0], c.tooltip = e.__instance._$tooltip[0], delete d.container, delete d.fits, delete d.mode, delete d.outerSize, delete d.whole, d.distance = d.distance.horizontal || d.distance.vertical; var l = a.extend(!0, {}, d); if (e.__instance._trigger({ edit: function (a) { d = a }, event: b, helper: c, position: l, type: "position" }), e.__options.functionPosition) { var m = e.__options.functionPosition.call(e, e.__instance, c, l); m && (d = m) } i.destroy(); var n, o; "top" == d.side || "bottom" == d.side ? (n = { prop: "left", val: d.target - d.coord.left }, o = d.size.width - this.__options.minIntersection) : (n = { prop: "top", val: d.target - d.coord.top }, o = d.size.height - this.__options.minIntersection), n.val < this.__options.minIntersection ? n.val = this.__options.minIntersection : n.val > o && (n.val = o); var p; p = c.geo.origin.fixedLineage ? c.geo.origin.windowOffset : { left: c.geo.origin.windowOffset.left + c.geo.window.scroll.left, top: c.geo.origin.windowOffset.top + c.geo.window.scroll.top }, d.coord = { left: p.left + (d.coord.left - c.geo.origin.windowOffset.left), top: p.top + (d.coord.top - c.geo.origin.windowOffset.top) }, e.__sideChange(e.__instance._$tooltip, d.side), c.geo.origin.fixedLineage ? e.__instance._$tooltip.css("position", "fixed") : e.__instance._$tooltip.css("position", ""), e.__instance._$tooltip.css({ left: d.coord.left, top: d.coord.top, height: d.size.height, width: d.size.width }).find(".tooltipster-arrow").css({ left: "", top: "" }).css(n.prop, n.val), e.__instance._$tooltip.appendTo(e.__instance.option("parent")), e.__instance._trigger({ type: "repositioned", event: b, position: d }) }, __sideChange: function (a, b) { a.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" + b) }, __targetFind: function (a) { var b = {}, c = this.__instance._$origin[0].getClientRects(); if (c.length > 1) { var d = this.__instance._$origin.css("opacity"); 1 == d && (this.__instance._$origin.css("opacity", .99), c = this.__instance._$origin[0].getClientRects(), this.__instance._$origin.css("opacity", 1)) } if (c.length < 2) b.top = Math.floor(a.geo.origin.windowOffset.left + a.geo.origin.size.width / 2), b.bottom = b.top, b.left = Math.floor(a.geo.origin.windowOffset.top + a.geo.origin.size.height / 2), b.right = b.left; else { var e = c[0]; b.top = Math.floor(e.left + (e.right - e.left) / 2), e = c.length > 2 ? c[Math.ceil(c.length / 2) - 1] : c[0], b.right = Math.floor(e.top + (e.bottom - e.top) / 2), e = c[c.length - 1], b.bottom = Math.floor(e.left + (e.right - e.left) / 2), e = c.length > 2 ? c[Math.ceil((c.length + 1) / 2) - 1] : c[c.length - 1], b.left = Math.floor(e.top + (e.bottom - e.top) / 2) } return b }
        }
    }), a
});
/*! Sortable 1.7.0 - MIT | git://github.com/rubaxa/Sortable.git */

!function (t) { "use strict"; "function" == typeof define && define.amd ? define(t) : "undefined" != typeof module && void 0 !== module.exports ? module.exports = t() : window.Sortable = t() }(function () { "use strict"; function t(e, n) { if (!e || !e.nodeType || 1 !== e.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(e); this.el = e, this.options = n = g({}, n), e[j] = this; var i = { group: null, sort: !0, disabled: !1, store: null, handle: null, scroll: !0, scrollSensitivity: 30, scrollSpeed: 10, draggable: /[uo]l/i.test(e.nodeName) ? "li" : ">*", ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", dragClass: "sortable-drag", ignore: "a, img", filter: null, preventOnFilter: !0, animation: 0, setData: function (t, e) { t.setData("Text", e.textContent) }, dropBubble: !1, dragoverBubble: !1, dataIdAttr: "data-id", delay: 0, forceFallback: !1, fallbackClass: "sortable-fallback", fallbackOnBody: !1, fallbackTolerance: 0, fallbackOffset: { x: 0, y: 0 }, supportPointer: !1 !== t.supportPointer }; for (var r in i) !(r in n) && (n[r] = i[r]); rt(n); for (var a in this) "_" === a.charAt(0) && "function" == typeof this[a] && (this[a] = this[a].bind(this)); this.nativeDraggable = !n.forceFallback && Z, o(e, "mousedown", this._onTapStart), o(e, "touchstart", this._onTapStart), n.supportPointer && o(e, "pointerdown", this._onTapStart), this.nativeDraggable && (o(e, "dragover", this), o(e, "dragenter", this)), nt.push(this._onDragOver), n.store && this.sort(n.store.get(this)) } function e(t, e) { "clone" !== t.lastPullMode && (e = !0), w && w.state !== e && (a(w, "display", e ? "none" : ""), e || w.state && (t.options.group.revertClone ? (T.insertBefore(w, C), t._animate(b, w)) : T.insertBefore(w, b)), w.state = e) } function n(t, e, n) { if (t) { n = n || W; do { if (">*" === e && t.parentNode === n || f(t, e)) return t } while (t = function (t) { var e = t.host; return e && e.nodeType ? e : t.parentNode }(t)) } return null } function o(t, e, n) { t.addEventListener(e, n, Q) } function i(t, e, n) { t.removeEventListener(e, n, Q) } function r(t, e, n) { if (t) if (t.classList) t.classList[n ? "add" : "remove"](e); else { var o = (" " + t.className + " ").replace(F, " ").replace(" " + e + " ", " "); t.className = (o + (n ? " " + e : "")).replace(F, " ") } } function a(t, e, n) { var o = t && t.style; if (o) { if (void 0 === n) return W.defaultView && W.defaultView.getComputedStyle ? n = W.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e]; e in o || (e = "-webkit-" + e), o[e] = n + ("string" == typeof n ? "" : "px") } } function l(t, e, n) { if (t) { var o = t.getElementsByTagName(e), i = 0, r = o.length; if (n) for (; i < r; i++)n(o[i], i); return o } return [] } function s(t, e, n, o, i, r, a, l) { t = t || e[j]; var s = W.createEvent("Event"), c = t.options, d = "on" + n.charAt(0).toUpperCase() + n.substr(1); s.initEvent(n, !0, !0), s.to = i || e, s.from = r || e, s.item = o || e, s.clone = w, s.oldIndex = a, s.newIndex = l, e.dispatchEvent(s), c[d] && c[d].call(t, s) } function c(t, e, n, o, i, r, a, l) { var s, c, d = t[j], h = d.options.onMove; return (s = W.createEvent("Event")).initEvent("move", !0, !0), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = i || e, s.relatedRect = r || e.getBoundingClientRect(), s.willInsertAfter = l, t.dispatchEvent(s), h && (c = h.call(d, s, a)), c } function d(t) { t.draggable = !1 } function h() { K = !1 } function u(t, e) { var n = 0; if (!t || !t.parentNode) return -1; for (; t && (t = t.previousElementSibling);)"TEMPLATE" === t.nodeName.toUpperCase() || ">*" !== e && !f(t, e) || n++; return n } function f(t, e) { if (t) { var n = (e = e.split(".")).shift().toUpperCase(), o = new RegExp("\\s(" + e.join("|") + ")(?=\\s)", "g"); return !("" !== n && t.nodeName.toUpperCase() != n || e.length && ((" " + t.className + " ").match(o) || []).length != e.length) } return !1 } function p(t, e) { var n, o; return function () { void 0 === n && (n = arguments, o = this, q(function () { 1 === n.length ? t.call(o, n[0]) : t.apply(o, n), n = void 0 }, e)) } } function g(t, e) { if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]); return t } function v(t) { return G && G.dom ? G.dom(t).cloneNode(!0) : z ? z(t).clone(!0)[0] : t.cloneNode(!0) } function m(t) { return q(t, 0) } function _(t) { return clearTimeout(t) } if ("undefined" == typeof window || !window.document) return function () { throw new Error("Sortable.js requires a window with a document") }; var b, D, y, w, T, C, S, E, x, N, k, B, P, Y, X, O, I, R, A, M, L = {}, F = /\s+/g, U = /left|right|inline/, j = "Sortable" + (new Date).getTime(), H = window, W = H.document, V = H.parseInt, q = H.setTimeout, z = H.jQuery || H.Zepto, G = H.Polymer, Q = !1, Z = "draggable" in W.createElement("div"), J = function (t) { return !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) && (t = W.createElement("x"), t.style.cssText = "pointer-events:auto", "auto" === t.style.pointerEvents) }(), K = !1, $ = Math.abs, tt = Math.min, et = [], nt = [], ot = function () { return !1 }, it = p(function (t, e, n) { if (n && e.scroll) { var o, i, r, a, l, s, c = n[j], d = e.scrollSensitivity, h = e.scrollSpeed, u = t.clientX, f = t.clientY, p = window.innerWidth, g = window.innerHeight; if (x !== n && (E = e.scroll, x = n, N = e.scrollFn, !0 === E)) { E = n; do { if (E.offsetWidth < E.scrollWidth || E.offsetHeight < E.scrollHeight) break } while (E = E.parentNode) } E && (o = E, i = E.getBoundingClientRect(), r = ($(i.right - u) <= d) - ($(i.left - u) <= d), a = ($(i.bottom - f) <= d) - ($(i.top - f) <= d)), r || a || (a = (g - f <= d) - (f <= d), ((r = (p - u <= d) - (u <= d)) || a) && (o = H)), L.vx === r && L.vy === a && L.el === o || (L.el = o, L.vx = r, L.vy = a, clearInterval(L.pid), o && (L.pid = setInterval(function () { if (s = a ? a * h : 0, l = r ? r * h : 0, "function" == typeof N) return N.call(c, l, s, t); o === H ? H.scrollTo(H.pageXOffset + l, H.pageYOffset + s) : (o.scrollTop += s, o.scrollLeft += l) }, 24))) } }, 30), rt = function (t) { function e(t, e) { return null != t && !0 !== t || null != (t = n.name) ? "function" == typeof t ? t : function (n, o) { var i = o.options.group.name; return e ? t : t && (t.join ? t.indexOf(i) > -1 : i == t) } : ot } var n = {}, o = t.group; o && "object" == typeof o || (o = { name: o }), n.name = o.name, n.checkPull = e(o.pull, !0), n.checkPut = e(o.put), n.revertClone = o.revertClone, t.group = n }; try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function () { Q = { capture: !1, passive: !1 } } })) } catch (t) { } return t.prototype = { constructor: t, _onTapStart: function (t) { var e, o = this, i = this.el, r = this.options, a = r.preventOnFilter, l = t.type, c = t.touches && t.touches[0], d = (c || t).target, h = t.target.shadowRoot && t.path && t.path[0] || d, f = r.filter; if (function (t) { et.length = 0; for (var e = t.getElementsByTagName("input"), n = e.length; n--;) { var o = e[n]; o.checked && et.push(o) } }(i), !b && !(/mousedown|pointerdown/.test(l) && 0 !== t.button || r.disabled) && !h.isContentEditable && (d = n(d, r.draggable, i)) && S !== d) { if (e = u(d, r.draggable), "function" == typeof f) { if (f.call(this, t, d, this)) return s(o, h, "filter", d, i, i, e), void (a && t.preventDefault()) } else if (f && (f = f.split(",").some(function (t) { if (t = n(h, t.trim(), i)) return s(o, t, "filter", d, i, i, e), !0 }))) return void (a && t.preventDefault()); r.handle && !n(h, r.handle, i) || this._prepareDragStart(t, c, d, e) } }, _prepareDragStart: function (t, e, n, i) { var a, c = this, h = c.el, u = c.options, f = h.ownerDocument; n && !b && n.parentNode === h && (R = t, T = h, D = (b = n).parentNode, C = b.nextSibling, S = n, O = u.group, Y = i, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, b.style["will-change"] = "all", a = function () { c._disableDelayedDrag(), b.draggable = c.nativeDraggable, r(b, u.chosenClass, !0), c._triggerDragStart(t, e), s(c, T, "choose", b, T, T, Y) }, u.ignore.split(",").forEach(function (t) { l(b, t.trim(), d) }), o(f, "mouseup", c._onDrop), o(f, "touchend", c._onDrop), o(f, "touchcancel", c._onDrop), o(f, "selectstart", c), u.supportPointer && o(f, "pointercancel", c._onDrop), u.delay ? (o(f, "mouseup", c._disableDelayedDrag), o(f, "touchend", c._disableDelayedDrag), o(f, "touchcancel", c._disableDelayedDrag), o(f, "mousemove", c._disableDelayedDrag), o(f, "touchmove", c._disableDelayedDrag), u.supportPointer && o(f, "pointermove", c._disableDelayedDrag), c._dragStartTimer = q(a, u.delay)) : a()) }, _disableDelayedDrag: function () { var t = this.el.ownerDocument; clearTimeout(this._dragStartTimer), i(t, "mouseup", this._disableDelayedDrag), i(t, "touchend", this._disableDelayedDrag), i(t, "touchcancel", this._disableDelayedDrag), i(t, "mousemove", this._disableDelayedDrag), i(t, "touchmove", this._disableDelayedDrag), i(t, "pointermove", this._disableDelayedDrag) }, _triggerDragStart: function (t, e) { (e = e || ("touch" == t.pointerType ? t : null)) ? (R = { target: b, clientX: e.clientX, clientY: e.clientY }, this._onDragStart(R, "touch")) : this.nativeDraggable ? (o(b, "dragend", this), o(T, "dragstart", this._onDragStart)) : this._onDragStart(R, !0); try { W.selection ? m(function () { W.selection.empty() }) : window.getSelection().removeAllRanges() } catch (t) { } }, _dragStarted: function () { if (T && b) { var e = this.options; r(b, e.ghostClass, !0), r(b, e.dragClass, !1), t.active = this, s(this, T, "start", b, T, T, Y) } else this._nulling() }, _emulateDragOver: function () { if (A) { if (this._lastX === A.clientX && this._lastY === A.clientY) return; this._lastX = A.clientX, this._lastY = A.clientY, J || a(y, "display", "none"); var t = W.elementFromPoint(A.clientX, A.clientY), e = t, n = nt.length; if (t && t.shadowRoot && (e = t = t.shadowRoot.elementFromPoint(A.clientX, A.clientY)), e) do { if (e[j]) { for (; n--;)nt[n]({ clientX: A.clientX, clientY: A.clientY, target: t, rootEl: e }); break } t = e } while (e = e.parentNode); J || a(y, "display", "") } }, _onTouchMove: function (e) { if (R) { var n = this.options, o = n.fallbackTolerance, i = n.fallbackOffset, r = e.touches ? e.touches[0] : e, l = r.clientX - R.clientX + i.x, s = r.clientY - R.clientY + i.y, c = e.touches ? "translate3d(" + l + "px," + s + "px,0)" : "translate(" + l + "px," + s + "px)"; if (!t.active) { if (o && tt($(r.clientX - this._lastX), $(r.clientY - this._lastY)) < o) return; this._dragStarted() } this._appendGhost(), M = !0, A = r, a(y, "webkitTransform", c), a(y, "mozTransform", c), a(y, "msTransform", c), a(y, "transform", c), e.preventDefault() } }, _appendGhost: function () { if (!y) { var t, e = b.getBoundingClientRect(), n = a(b), o = this.options; r(y = b.cloneNode(!0), o.ghostClass, !1), r(y, o.fallbackClass, !0), r(y, o.dragClass, !0), a(y, "top", e.top - V(n.marginTop, 10)), a(y, "left", e.left - V(n.marginLeft, 10)), a(y, "width", e.width), a(y, "height", e.height), a(y, "opacity", "0.8"), a(y, "position", "fixed"), a(y, "zIndex", "100000"), a(y, "pointerEvents", "none"), o.fallbackOnBody && W.body.appendChild(y) || T.appendChild(y), t = y.getBoundingClientRect(), a(y, "width", 2 * e.width - t.width), a(y, "height", 2 * e.height - t.height) } }, _onDragStart: function (t, e) { var n = this, i = t.dataTransfer, l = n.options; n._offUpEvents(), O.checkPull(n, n, b, t) && ((w = v(b)).draggable = !1, w.style["will-change"] = "", a(w, "display", "none"), r(w, n.options.chosenClass, !1), n._cloneId = m(function () { T.insertBefore(w, b), s(n, T, "clone", b) })), r(b, l.dragClass, !0), e ? ("touch" === e ? (o(W, "touchmove", n._onTouchMove), o(W, "touchend", n._onDrop), o(W, "touchcancel", n._onDrop), l.supportPointer && (o(W, "pointermove", n._onTouchMove), o(W, "pointerup", n._onDrop))) : (o(W, "mousemove", n._onTouchMove), o(W, "mouseup", n._onDrop)), n._loopId = setInterval(n._emulateDragOver, 50)) : (i && (i.effectAllowed = "move", l.setData && l.setData.call(n, i, b)), o(W, "drop", n), n._dragStartId = m(n._dragStarted)) }, _onDragOver: function (o) { var i, r, l, s, d = this.el, u = this.options, f = u.group, p = t.active, g = O === f, v = !1, m = u.sort; if (void 0 !== o.preventDefault && (o.preventDefault(), !u.dragoverBubble && o.stopPropagation()), !b.animated && (M = !0, p && !u.disabled && (g ? m || (s = !T.contains(b)) : I === this || (p.lastPullMode = O.checkPull(this, p, b, o)) && f.checkPut(this, p, b, o)) && (void 0 === o.rootEl || o.rootEl === this.el))) { if (it(o, u, this.el), K) return; if (i = n(o.target, u.draggable, d), r = b.getBoundingClientRect(), I !== this && (I = this, v = !0), s) return e(p, !0), D = T, void (w || C ? T.insertBefore(b, w || C) : m || T.appendChild(b)); if (0 === d.children.length || d.children[0] === y || d === o.target && function (t, e) { var n = t.lastElementChild.getBoundingClientRect(); return e.clientY - (n.top + n.height) > 5 || e.clientX - (n.left + n.width) > 5 }(d, o)) { if (0 !== d.children.length && d.children[0] !== y && d === o.target && (i = d.lastElementChild), i) { if (i.animated) return; l = i.getBoundingClientRect() } e(p, g), !1 !== c(T, d, b, r, i, l, o) && (b.contains(d) || (d.appendChild(b), D = d), this._animate(r, b), i && this._animate(l, i)) } else if (i && !i.animated && i !== b && void 0 !== i.parentNode[j]) { k !== i && (k = i, B = a(i), P = a(i.parentNode)); var _ = (l = i.getBoundingClientRect()).right - l.left, S = l.bottom - l.top, E = U.test(B.cssFloat + B.display) || "flex" == P.display && 0 === P["flex-direction"].indexOf("row"), x = i.offsetWidth > b.offsetWidth, N = i.offsetHeight > b.offsetHeight, Y = (E ? (o.clientX - l.left) / _ : (o.clientY - l.top) / S) > .5, X = i.nextElementSibling, R = !1; if (E) { var A = b.offsetTop, L = i.offsetTop; R = A === L ? i.previousElementSibling === b && !x || Y && x : i.previousElementSibling === b || b.previousElementSibling === i ? (o.clientY - l.top) / S > .5 : L > A } else v || (R = X !== b && !N || Y && N); var F = c(T, d, b, r, i, l, o, R); !1 !== F && (1 !== F && -1 !== F || (R = 1 === F), K = !0, q(h, 30), e(p, g), b.contains(d) || (R && !X ? d.appendChild(b) : i.parentNode.insertBefore(b, R ? X : i)), D = b.parentNode, this._animate(r, b), this._animate(l, i)) } } }, _animate: function (t, e) { var n = this.options.animation; if (n) { var o = e.getBoundingClientRect(); 1 === t.nodeType && (t = t.getBoundingClientRect()), a(e, "transition", "none"), a(e, "transform", "translate3d(" + (t.left - o.left) + "px," + (t.top - o.top) + "px,0)"), e.offsetWidth, a(e, "transition", "all " + n + "ms"), a(e, "transform", "translate3d(0,0,0)"), clearTimeout(e.animated), e.animated = q(function () { a(e, "transition", ""), a(e, "transform", ""), e.animated = !1 }, n) } }, _offUpEvents: function () { var t = this.el.ownerDocument; i(W, "touchmove", this._onTouchMove), i(W, "pointermove", this._onTouchMove), i(t, "mouseup", this._onDrop), i(t, "touchend", this._onDrop), i(t, "pointerup", this._onDrop), i(t, "touchcancel", this._onDrop), i(t, "pointercancel", this._onDrop), i(t, "selectstart", this) }, _onDrop: function (e) { var n = this.el, o = this.options; clearInterval(this._loopId), clearInterval(L.pid), clearTimeout(this._dragStartTimer), _(this._cloneId), _(this._dragStartId), i(W, "mouseover", this), i(W, "mousemove", this._onTouchMove), this.nativeDraggable && (i(W, "drop", this), i(n, "dragstart", this._onDragStart)), this._offUpEvents(), e && (M && (e.preventDefault(), !o.dropBubble && e.stopPropagation()), y && y.parentNode && y.parentNode.removeChild(y), T !== D && "clone" === t.active.lastPullMode || w && w.parentNode && w.parentNode.removeChild(w), b && (this.nativeDraggable && i(b, "dragend", this), d(b), b.style["will-change"] = "", r(b, this.options.ghostClass, !1), r(b, this.options.chosenClass, !1), s(this, T, "unchoose", b, D, T, Y), T !== D ? (X = u(b, o.draggable)) >= 0 && (s(null, D, "add", b, D, T, Y, X), s(this, T, "remove", b, D, T, Y, X), s(null, D, "sort", b, D, T, Y, X), s(this, T, "sort", b, D, T, Y, X)) : b.nextSibling !== C && (X = u(b, o.draggable)) >= 0 && (s(this, T, "update", b, D, T, Y, X), s(this, T, "sort", b, D, T, Y, X)), t.active && (null != X && -1 !== X || (X = Y), s(this, T, "end", b, D, T, Y, X), this.save()))), this._nulling() }, _nulling: function () { T = b = D = y = C = w = S = E = x = R = A = M = X = k = B = I = O = t.active = null, et.forEach(function (t) { t.checked = !0 }), et.length = 0 }, handleEvent: function (t) { switch (t.type) { case "drop": case "dragend": this._onDrop(t); break; case "dragover": case "dragenter": b && (this._onDragOver(t), function (t) { t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.preventDefault() }(t)); break; case "mouseover": this._onDrop(t); break; case "selectstart": t.preventDefault() } }, toArray: function () { for (var t, e = [], o = this.el.children, i = 0, r = o.length, a = this.options; i < r; i++)n(t = o[i], a.draggable, this.el) && e.push(t.getAttribute(a.dataIdAttr) || function (t) { for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--;)o += e.charCodeAt(n); return o.toString(36) }(t)); return e }, sort: function (t) { var e = {}, o = this.el; this.toArray().forEach(function (t, i) { var r = o.children[i]; n(r, this.options.draggable, o) && (e[t] = r) }, this), t.forEach(function (t) { e[t] && (o.removeChild(e[t]), o.appendChild(e[t])) }) }, save: function () { var t = this.options.store; t && t.set(this) }, closest: function (t, e) { return n(t, e || this.options.draggable, this.el) }, option: function (t, e) { var n = this.options; if (void 0 === e) return n[t]; n[t] = e, "group" === t && rt(n) }, destroy: function () { var t = this.el; t[j] = null, i(t, "mousedown", this._onTapStart), i(t, "touchstart", this._onTapStart), i(t, "pointerdown", this._onTapStart), this.nativeDraggable && (i(t, "dragover", this), i(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function (t) { t.removeAttribute("draggable") }), nt.splice(nt.indexOf(this._onDragOver), 1), this._onDrop(), this.el = t = null } }, o(W, "touchmove", function (e) { t.active && e.preventDefault() }), t.utils = { on: o, off: i, css: a, find: l, is: function (t, e) { return !!n(t, e, t) }, extend: g, throttle: p, closest: n, toggleClass: r, clone: v, index: u, nextTick: m, cancelNextTick: _ }, t.create = function (e, n) { return new t(e, n) }, t.version = "1.7.0", t });
(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.katex=e()}})(function(){var e,t,r;return function e(t,r,a){function n(l,o){if(!r[l]){if(!t[l]){var u=typeof require=="function"&&require;if(!o&&u)return u(l,!0);if(i)return i(l,!0);var s=new Error("Cannot find module '"+l+"'");throw s.code="MODULE_NOT_FOUND",s}var f=r[l]={exports:{}};t[l][0].call(f.exports,function(e){var r=t[l][1][e];return n(r?r:e)},f,f.exports,e,t,r,a)}return r[l].exports}var i=typeof require=="function"&&require;for(var l=0;l<a.length;l++)n(a[l]);return n}({1:[function(e,t,r){"use strict";var a=e("./src/ParseError");var n=v(a);var i=e("./src/Settings");var l=v(i);var o=e("./src/buildTree");var u=v(o);var s=e("./src/parseTree");var f=v(s);var c=e("./src/utils");var d=v(c);function v(e){return e&&e.__esModule?e:{default:e}}var h=function e(t,r,a){d.default.clearNode(r);var n=new l.default(a);var i=(0,f.default)(t,n);var o=(0,u.default)(i,t,n).toNode();r.appendChild(o)};if(typeof document!=="undefined"){if(document.compatMode!=="CSS1Compat"){typeof console!=="undefined"&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your "+"website has a suitable doctype.");h=function e(){throw new n.default("KaTeX doesn't work in quirks mode.")}}}var p=function e(t,r){var a=new l.default(r);var n=(0,f.default)(t,a);return(0,u.default)(n,t,a).toMarkup()};var m=function e(t,r){var a=new l.default(r);return(0,f.default)(t,a)};t.exports={render:h,renderToString:p,__parse:m,ParseError:n.default}},{"./src/ParseError":84,"./src/Settings":87,"./src/buildTree":94,"./src/parseTree":109,"./src/utils":115}],2:[function(e,t,r){t.exports={default:e("core-js/library/fn/array/from"),__esModule:true}},{"core-js/library/fn/array/from":12}],3:[function(e,t,r){t.exports={default:e("core-js/library/fn/get-iterator"),__esModule:true}},{"core-js/library/fn/get-iterator":13}],4:[function(e,t,r){t.exports={default:e("core-js/library/fn/is-iterable"),__esModule:true}},{"core-js/library/fn/is-iterable":14}],5:[function(e,t,r){t.exports={default:e("core-js/library/fn/json/stringify"),__esModule:true}},{"core-js/library/fn/json/stringify":15}],6:[function(e,t,r){t.exports={default:e("core-js/library/fn/object/define-property"),__esModule:true}},{"core-js/library/fn/object/define-property":16}],7:[function(e,t,r){t.exports={default:e("core-js/library/fn/object/freeze"),__esModule:true}},{"core-js/library/fn/object/freeze":17}],8:[function(e,t,r){"use strict";r.__esModule=true;r.default=function(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}},{}],9:[function(e,t,r){"use strict";r.__esModule=true;var a=e("../core-js/object/define-property");var n=i(a);function i(e){return e&&e.__esModule?e:{default:e}}r.default=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||false;a.configurable=true;if("value"in a)a.writable=true;(0,n.default)(e,a.key,a)}}return function(t,r,a){if(r)e(t.prototype,r);if(a)e(t,a);return t}}()},{"../core-js/object/define-property":6}],10:[function(e,t,r){"use strict";r.__esModule=true;var a=e("../core-js/is-iterable");var n=o(a);var i=e("../core-js/get-iterator");var l=o(i);function o(e){return e&&e.__esModule?e:{default:e}}r.default=function(){function e(e,t){var r=[];var a=true;var n=false;var i=undefined;try{for(var o=(0,l.default)(e),u;!(a=(u=o.next()).done);a=true){r.push(u.value);if(t&&r.length===t)break}}catch(e){n=true;i=e}finally{try{if(!a&&o["return"])o["return"]()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t)){return t}else if((0,n.default)(Object(t))){return e(t,r)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}()},{"../core-js/get-iterator":3,"../core-js/is-iterable":4}],11:[function(e,t,r){"use strict";r.__esModule=true;var a=e("../core-js/array/from");var n=i(a);function i(e){return e&&e.__esModule?e:{default:e}}r.default=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++){r[t]=e[t]}return r}else{return(0,n.default)(e)}}},{"../core-js/array/from":2}],12:[function(e,t,r){e("../../modules/es6.string.iterator");e("../../modules/es6.array.from");t.exports=e("../../modules/_core").Array.from},{"../../modules/_core":24,"../../modules/es6.array.from":73,"../../modules/es6.string.iterator":77}],13:[function(e,t,r){e("../modules/web.dom.iterable");e("../modules/es6.string.iterator");t.exports=e("../modules/core.get-iterator")},{"../modules/core.get-iterator":71,"../modules/es6.string.iterator":77,"../modules/web.dom.iterable":78}],14:[function(e,t,r){e("../modules/web.dom.iterable");e("../modules/es6.string.iterator");t.exports=e("../modules/core.is-iterable")},{"../modules/core.is-iterable":72,"../modules/es6.string.iterator":77,"../modules/web.dom.iterable":78}],15:[function(e,t,r){var a=e("../../modules/_core");var n=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function e(t){return n.stringify.apply(n,arguments)}},{"../../modules/_core":24}],16:[function(e,t,r){e("../../modules/es6.object.define-property");var a=e("../../modules/_core").Object;t.exports=function e(t,r,n){return a.defineProperty(t,r,n)}},{"../../modules/_core":24,"../../modules/es6.object.define-property":75}],17:[function(e,t,r){e("../../modules/es6.object.freeze");t.exports=e("../../modules/_core").Object.freeze},{"../../modules/_core":24,"../../modules/es6.object.freeze":76}],18:[function(e,t,r){t.exports=function(e){if(typeof e!="function")throw TypeError(e+" is not a function!");return e}},{}],19:[function(e,t,r){t.exports=function(){}},{}],20:[function(e,t,r){var a=e("./_is-object");t.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":40}],21:[function(e,t,r){var a=e("./_to-iobject");var n=e("./_to-length");var i=e("./_to-absolute-index");t.exports=function(e){return function(t,r,l){var o=a(t);var u=n(o.length);var s=i(l,u);var f;if(e&&r!=r)while(u>s){f=o[s++];if(f!=f)return true}else for(;u>s;s++)if(e||s in o){if(o[s]===r)return e||s||0}return!e&&-1}}},{"./_to-absolute-index":62,"./_to-iobject":64,"./_to-length":65}],22:[function(e,t,r){var a=e("./_cof");var n=e("./_wks")("toStringTag");var i=a(function(){return arguments}())=="Arguments";var l=function(e,t){try{return e[t]}catch(e){}};t.exports=function(e){var t,r,o;return e===undefined?"Undefined":e===null?"Null":typeof(r=l(t=Object(e),n))=="string"?r:i?a(t):(o=a(t))=="Object"&&typeof t.callee=="function"?"Arguments":o}},{"./_cof":23,"./_wks":69}],23:[function(e,t,r){var a={}.toString;t.exports=function(e){return a.call(e).slice(8,-1)}},{}],24:[function(e,t,r){var a=t.exports={version:"2.5.1"};if(typeof __e=="number")__e=a},{}],25:[function(e,t,r){"use strict";var a=e("./_object-dp");var n=e("./_property-desc");t.exports=function(e,t,r){if(t in e)a.f(e,t,n(0,r));else e[t]=r}},{"./_object-dp":50,"./_property-desc":56}],26:[function(e,t,r){var a=e("./_a-function");t.exports=function(e,t,r){a(e);if(t===undefined)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,a){return e.call(t,r,a)};case 3:return function(r,a,n){return e.call(t,r,a,n)}}return function(){return e.apply(t,arguments)}}},{"./_a-function":18}],27:[function(e,t,r){t.exports=function(e){if(e==undefined)throw TypeError("Can't call method on  "+e);return e}},{}],28:[function(e,t,r){t.exports=!e("./_fails")(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},{"./_fails":32}],29:[function(e,t,r){var a=e("./_is-object");var n=e("./_global").document;var i=a(n)&&a(n.createElement);t.exports=function(e){return i?n.createElement(e):{}}},{"./_global":33,"./_is-object":40}],30:[function(e,t,r){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],31:[function(e,t,r){var a=e("./_global");var n=e("./_core");var i=e("./_ctx");var l=e("./_hide");var o="prototype";var u=function(e,t,r){var s=e&u.F;var f=e&u.G;var c=e&u.S;var d=e&u.P;var v=e&u.B;var h=e&u.W;var p=f?n:n[t]||(n[t]={});var m=p[o];var g=f?a:c?a[t]:(a[t]||{})[o];var b,y,x;if(f)r=t;for(b in r){y=!s&&g&&g[b]!==undefined;if(y&&b in p)continue;x=y?g[b]:r[b];p[b]=f&&typeof g[b]!="function"?r[b]:v&&y?i(x,a):h&&g[b]==x?function(e){var t=function(t,r,a){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,a)}return e.apply(this,arguments)};t[o]=e[o];return t}(x):d&&typeof x=="function"?i(Function.call,x):x;if(d){(p.virtual||(p.virtual={}))[b]=x;if(e&u.R&&m&&!m[b])l(m,b,x)}}};u.F=1;u.G=2;u.S=4;u.P=8;u.B=16;u.W=32;u.U=64;u.R=128;t.exports=u},{"./_core":24,"./_ctx":26,"./_global":33,"./_hide":35}],32:[function(e,t,r){t.exports=function(e){try{return!!e()}catch(e){return true}}},{}],33:[function(e,t,r){var a=t.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();if(typeof __g=="number")__g=a},{}],34:[function(e,t,r){var a={}.hasOwnProperty;t.exports=function(e,t){return a.call(e,t)}},{}],35:[function(e,t,r){var a=e("./_object-dp");var n=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,r){return a.f(e,t,n(1,r))}:function(e,t,r){e[t]=r;return e}},{"./_descriptors":28,"./_object-dp":50,"./_property-desc":56}],36:[function(e,t,r){var a=e("./_global").document;t.exports=a&&a.documentElement},{"./_global":33}],37:[function(e,t,r){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a!=7})},{"./_descriptors":28,"./_dom-create":29,"./_fails":32}],38:[function(e,t,r){var a=e("./_cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return a(e)=="String"?e.split(""):Object(e)}},{"./_cof":23}],39:[function(e,t,r){var a=e("./_iterators");var n=e("./_wks")("iterator");var i=Array.prototype;t.exports=function(e){return e!==undefined&&(a.Array===e||i[n]===e)}},{"./_iterators":46,"./_wks":69}],40:[function(e,t,r){t.exports=function(e){return typeof e==="object"?e!==null:typeof e==="function"}},{}],41:[function(e,t,r){var a=e("./_an-object");t.exports=function(e,t,r,n){try{return n?t(a(r)[0],r[1]):t(r)}catch(t){var i=e["return"];if(i!==undefined)a(i.call(e));throw t}}},{"./_an-object":20}],42:[function(e,t,r){"use strict";var a=e("./_object-create");var n=e("./_property-desc");var i=e("./_set-to-string-tag");var l={};e("./_hide")(l,e("./_wks")("iterator"),function(){return this});t.exports=function(e,t,r){e.prototype=a(l,{next:n(1,r)});i(e,t+" Iterator")}},{"./_hide":35,"./_object-create":49,"./_property-desc":56,"./_set-to-string-tag":58,"./_wks":69}],43:[function(e,t,r){"use strict";var a=e("./_library");var n=e("./_export");var i=e("./_redefine");var l=e("./_hide");var o=e("./_has");var u=e("./_iterators");var s=e("./_iter-create");var f=e("./_set-to-string-tag");var c=e("./_object-gpo");var d=e("./_wks")("iterator");var v=!([].keys&&"next"in[].keys());var h="@@iterator";var p="keys";var m="values";var g=function(){return this};t.exports=function(e,t,r,b,y,x,w){s(r,t,b);var k=function(e){if(!v&&e in S)return S[e];switch(e){case p:return function t(){return new r(this,e)};case m:return function t(){return new r(this,e)}}return function t(){return new r(this,e)}};var M=t+" Iterator";var _=y==m;var z=false;var S=e.prototype;var T=S[d]||S[h]||y&&S[y];var A=T||k(y);var C=y?!_?A:k("entries"):undefined;var N=t=="Array"?S.entries||T:T;var O,j,E;if(N){E=c(N.call(new e));if(E!==Object.prototype&&E.next){f(E,M,true);if(!a&&!o(E,d))l(E,d,g)}}if(_&&T&&T.name!==m){z=true;A=function e(){return T.call(this)}}if((!a||w)&&(v||z||!S[d])){l(S,d,A)}u[t]=A;u[M]=g;if(y){O={values:_?A:k(m),keys:x?A:k(p),entries:C};if(w)for(j in O){if(!(j in S))i(S,j,O[j])}else n(n.P+n.F*(v||z),t,O)}return O}},{"./_export":31,"./_has":34,"./_hide":35,"./_iter-create":42,"./_iterators":46,"./_library":47,"./_object-gpo":52,"./_redefine":57,"./_set-to-string-tag":58,"./_wks":69}],44:[function(e,t,r){var a=e("./_wks")("iterator");var n=false;try{var i=[7][a]();i["return"]=function(){n=true};Array.from(i,function(){throw 2})}catch(e){}t.exports=function(e,t){if(!t&&!n)return false;var r=false;try{var i=[7];var l=i[a]();l.next=function(){return{done:r=true}};i[a]=function(){return l};e(i)}catch(e){}return r}},{"./_wks":69}],45:[function(e,t,r){t.exports=function(e,t){return{value:t,done:!!e}}},{}],46:[function(e,t,r){t.exports={}},{}],47:[function(e,t,r){t.exports=true},{}],48:[function(e,t,r){var a=e("./_uid")("meta");var n=e("./_is-object");var i=e("./_has");var l=e("./_object-dp").f;var o=0;var u=Object.isExtensible||function(){return true};var s=!e("./_fails")(function(){return u(Object.preventExtensions({}))});var f=function(e){l(e,a,{value:{i:"O"+ ++o,w:{}}})};var c=function(e,t){if(!n(e))return typeof e=="symbol"?e:(typeof e=="string"?"S":"P")+e;if(!i(e,a)){if(!u(e))return"F";if(!t)return"E";f(e)}return e[a].i};var d=function(e,t){if(!i(e,a)){if(!u(e))return true;if(!t)return false;f(e)}return e[a].w};var v=function(e){if(s&&h.NEED&&u(e)&&!i(e,a))f(e);return e};var h=t.exports={KEY:a,NEED:false,fastKey:c,getWeak:d,onFreeze:v}},{"./_fails":32,"./_has":34,"./_is-object":40,"./_object-dp":50,"./_uid":68}],49:[function(e,t,r){var a=e("./_an-object");var n=e("./_object-dps");var i=e("./_enum-bug-keys");var l=e("./_shared-key")("IE_PROTO");var o=function(){};var u="prototype";var s=function(){var t=e("./_dom-create")("iframe");var r=i.length;var a="<";var n=">";var l;t.style.display="none";e("./_html").appendChild(t);t.src="javascript:";l=t.contentWindow.document;l.open();l.write(a+"script"+n+"document.F=Object"+a+"/script"+n);l.close();s=l.F;while(r--)delete s[u][i[r]];return s()};t.exports=Object.create||function e(t,r){var i;if(t!==null){o[u]=a(t);i=new o;o[u]=null;i[l]=t}else i=s();return r===undefined?i:n(i,r)}},{"./_an-object":20,"./_dom-create":29,"./_enum-bug-keys":30,"./_html":36,"./_object-dps":51,"./_shared-key":59}],50:[function(e,t,r){var a=e("./_an-object");var n=e("./_ie8-dom-define");var i=e("./_to-primitive");var l=Object.defineProperty;r.f=e("./_descriptors")?Object.defineProperty:function e(t,r,o){a(t);r=i(r,true);a(o);if(n)try{return l(t,r,o)}catch(e){}if("get"in o||"set"in o)throw TypeError("Accessors not supported!");if("value"in o)t[r]=o.value;return t}},{"./_an-object":20,"./_descriptors":28,"./_ie8-dom-define":37,"./_to-primitive":67}],51:[function(e,t,r){var a=e("./_object-dp");var n=e("./_an-object");var i=e("./_object-keys");t.exports=e("./_descriptors")?Object.defineProperties:function e(t,r){n(t);var l=i(r);var o=l.length;var u=0;var s;while(o>u)a.f(t,s=l[u++],r[s]);return t}},{"./_an-object":20,"./_descriptors":28,"./_object-dp":50,"./_object-keys":54}],52:[function(e,t,r){var a=e("./_has");var n=e("./_to-object");var i=e("./_shared-key")("IE_PROTO");var l=Object.prototype;t.exports=Object.getPrototypeOf||function(e){e=n(e);if(a(e,i))return e[i];if(typeof e.constructor=="function"&&e instanceof e.constructor){return e.constructor.prototype}return e instanceof Object?l:null}},{"./_has":34,"./_shared-key":59,"./_to-object":66}],53:[function(e,t,r){var a=e("./_has");var n=e("./_to-iobject");var i=e("./_array-includes")(false);var l=e("./_shared-key")("IE_PROTO");t.exports=function(e,t){var r=n(e);var o=0;var u=[];var s;for(s in r)if(s!=l)a(r,s)&&u.push(s);while(t.length>o)if(a(r,s=t[o++])){~i(u,s)||u.push(s)}return u}},{"./_array-includes":21,"./_has":34,"./_shared-key":59,"./_to-iobject":64}],54:[function(e,t,r){var a=e("./_object-keys-internal");var n=e("./_enum-bug-keys");t.exports=Object.keys||function e(t){return a(t,n)}},{"./_enum-bug-keys":30,"./_object-keys-internal":53}],55:[function(e,t,r){var a=e("./_export");var n=e("./_core");var i=e("./_fails");t.exports=function(e,t){var r=(n.Object||{})[e]||Object[e];var l={};l[e]=t(r);a(a.S+a.F*i(function(){r(1)}),"Object",l)}},{"./_core":24,"./_export":31,"./_fails":32}],56:[function(e,t,r){t.exports=function(e,t){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:t}}},{}],57:[function(e,t,r){t.exports=e("./_hide")},{"./_hide":35}],58:[function(e,t,r){var a=e("./_object-dp").f;var n=e("./_has");var i=e("./_wks")("toStringTag");t.exports=function(e,t,r){if(e&&!n(e=r?e:e.prototype,i))a(e,i,{configurable:true,value:t})}},{"./_has":34,"./_object-dp":50,"./_wks":69}],59:[function(e,t,r){var a=e("./_shared")("keys");var n=e("./_uid");t.exports=function(e){return a[e]||(a[e]=n(e))}},{"./_shared":60,"./_uid":68}],60:[function(e,t,r){var a=e("./_global");var n="__core-js_shared__";var i=a[n]||(a[n]={});t.exports=function(e){return i[e]||(i[e]={})}},{"./_global":33}],61:[function(e,t,r){var a=e("./_to-integer");var n=e("./_defined");t.exports=function(e){return function(t,r){var i=String(n(t));var l=a(r);var o=i.length;var u,s;if(l<0||l>=o)return e?"":undefined;u=i.charCodeAt(l);return u<55296||u>56319||l+1===o||(s=i.charCodeAt(l+1))<56320||s>57343?e?i.charAt(l):u:e?i.slice(l,l+2):(u-55296<<10)+(s-56320)+65536}}},{"./_defined":27,"./_to-integer":63}],62:[function(e,t,r){var a=e("./_to-integer");var n=Math.max;var i=Math.min;t.exports=function(e,t){e=a(e);return e<0?n(e+t,0):i(e,t)}},{"./_to-integer":63}],63:[function(e,t,r){var a=Math.ceil;var n=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(e>0?n:a)(e)}},{}],64:[function(e,t,r){var a=e("./_iobject");var n=e("./_defined");t.exports=function(e){return a(n(e))}},{"./_defined":27,"./_iobject":38}],65:[function(e,t,r){var a=e("./_to-integer");var n=Math.min;t.exports=function(e){return e>0?n(a(e),9007199254740991):0}},{"./_to-integer":63}],66:[function(e,t,r){var a=e("./_defined");t.exports=function(e){return Object(a(e))}},{"./_defined":27}],67:[function(e,t,r){var a=e("./_is-object");t.exports=function(e,t){if(!a(e))return e;var r,n;if(t&&typeof(r=e.toString)=="function"&&!a(n=r.call(e)))return n;if(typeof(r=e.valueOf)=="function"&&!a(n=r.call(e)))return n;if(!t&&typeof(r=e.toString)=="function"&&!a(n=r.call(e)))return n;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":40}],68:[function(e,t,r){var a=0;var n=Math.random();t.exports=function(e){return"Symbol(".concat(e===undefined?"":e,")_",(++a+n).toString(36))}},{}],69:[function(e,t,r){var a=e("./_shared")("wks");var n=e("./_uid");var i=e("./_global").Symbol;var l=typeof i=="function";var o=t.exports=function(e){return a[e]||(a[e]=l&&i[e]||(l?i:n)("Symbol."+e))};o.store=a},{"./_global":33,"./_shared":60,"./_uid":68}],70:[function(e,t,r){var a=e("./_classof");var n=e("./_wks")("iterator");var i=e("./_iterators");t.exports=e("./_core").getIteratorMethod=function(e){if(e!=undefined)return e[n]||e["@@iterator"]||i[a(e)]}},{"./_classof":22,"./_core":24,"./_iterators":46,"./_wks":69}],71:[function(e,t,r){var a=e("./_an-object");var n=e("./core.get-iterator-method");t.exports=e("./_core").getIterator=function(e){var t=n(e);if(typeof t!="function")throw TypeError(e+" is not iterable!");return a(t.call(e))}},{"./_an-object":20,"./_core":24,"./core.get-iterator-method":70}],72:[function(e,t,r){var a=e("./_classof");var n=e("./_wks")("iterator");var i=e("./_iterators");t.exports=e("./_core").isIterable=function(e){var t=Object(e);return t[n]!==undefined||"@@iterator"in t||i.hasOwnProperty(a(t))}},{"./_classof":22,"./_core":24,"./_iterators":46,"./_wks":69}],73:[function(e,t,r){"use strict";var a=e("./_ctx");var n=e("./_export");var i=e("./_to-object");var l=e("./_iter-call");var o=e("./_is-array-iter");var u=e("./_to-length");var s=e("./_create-property");var f=e("./core.get-iterator-method");n(n.S+n.F*!e("./_iter-detect")(function(e){Array.from(e)}),"Array",{from:function e(t){var r=i(t);var n=typeof this=="function"?this:Array;var c=arguments.length;var d=c>1?arguments[1]:undefined;var v=d!==undefined;var h=0;var p=f(r);var m,g,b,y;if(v)d=a(d,c>2?arguments[2]:undefined,2);if(p!=undefined&&!(n==Array&&o(p))){for(y=p.call(r),g=new n;!(b=y.next()).done;h++){s(g,h,v?l(y,d,[b.value,h],true):b.value)}}else{m=u(r.length);for(g=new n(m);m>h;h++){s(g,h,v?d(r[h],h):r[h])}}g.length=h;return g}})},{"./_create-property":25,"./_ctx":26,"./_export":31,"./_is-array-iter":39,"./_iter-call":41,"./_iter-detect":44,"./_to-length":65,"./_to-object":66,"./core.get-iterator-method":70}],74:[function(e,t,r){"use strict";var a=e("./_add-to-unscopables");var n=e("./_iter-step");var i=e("./_iterators");var l=e("./_to-iobject");t.exports=e("./_iter-define")(Array,"Array",function(e,t){this._t=l(e);this._i=0;this._k=t},function(){var e=this._t;var t=this._k;var r=this._i++;if(!e||r>=e.length){this._t=undefined;return n(1)}if(t=="keys")return n(0,r);if(t=="values")return n(0,e[r]);return n(0,[r,e[r]])},"values");i.Arguments=i.Array;a("keys");a("values");a("entries")},{"./_add-to-unscopables":19,"./_iter-define":43,"./_iter-step":45,"./_iterators":46,"./_to-iobject":64}],75:[function(e,t,r){var a=e("./_export");a(a.S+a.F*!e("./_descriptors"),"Object",{defineProperty:e("./_object-dp").f})},{"./_descriptors":28,"./_export":31,"./_object-dp":50}],76:[function(e,t,r){var a=e("./_is-object");var n=e("./_meta").onFreeze;e("./_object-sap")("freeze",function(e){return function t(r){return e&&a(r)?e(n(r)):r}})},{"./_is-object":40,"./_meta":48,"./_object-sap":55}],77:[function(e,t,r){"use strict";var a=e("./_string-at")(true);e("./_iter-define")(String,"String",function(e){this._t=String(e);this._i=0},function(){var e=this._t;var t=this._i;var r;if(t>=e.length)return{value:undefined,done:true};r=a(e,t);this._i+=r.length;return{value:r,done:false}})},{"./_iter-define":43,"./_string-at":61}],78:[function(e,t,r){e("./es6.array.iterator");var a=e("./_global");var n=e("./_hide");var i=e("./_iterators");var l=e("./_wks")("toStringTag");var o=("CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,"+"DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,"+"MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,"+"SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,"+"TextTrackList,TouchList").split(",");for(var u=0;u<o.length;u++){var s=o[u];var f=a[s];var c=f&&f.prototype;if(c&&!c[l])n(c,l,s);i[s]=i.Array}},{"./_global":33,"./_hide":35,"./_iterators":46,"./_wks":69,"./es6.array.iterator":74}],79:[function(e,t,r){function a(e){if(!e.__matchAtRelocatable){var t=e.source+"|()";var r="g"+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"");e.__matchAtRelocatable=new RegExp(t,r)}return e.__matchAtRelocatable}function n(e,t,r){if(e.global||e.sticky){throw new Error("matchAt(...): Only non-global regexes are supported")}var n=a(e);n.lastIndex=r;var i=n.exec(t);if(i[i.length-1]==null){i.length=i.length-1;return i}else{return null}}t.exports=n},{}],80:[function(e,t,r){"use strict";var a=Object.getOwnPropertySymbols;var n=Object.prototype.hasOwnProperty;var i=Object.prototype.propertyIsEnumerable;function l(e){if(e===null||e===undefined){throw new TypeError("Object.assign cannot be called with null or undefined")}return Object(e)}function o(){try{if(!Object.assign){return false}var e=new String("abc");e[5]="de";if(Object.getOwnPropertyNames(e)[0]==="5"){return false}var t={};for(var r=0;r<10;r++){t["_"+String.fromCharCode(r)]=r}var a=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if(a.join("")!=="0123456789"){return false}var n={};"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e});if(Object.keys(Object.assign({},n)).join("")!=="abcdefghijklmnopqrst"){return false}return true}catch(e){return false}}t.exports=o()?Object.assign:function(e,t){var r;var o=l(e);var u;for(var s=1;s<arguments.length;s++){r=Object(arguments[s]);for(var f in r){if(n.call(r,f)){o[f]=r[f]}}if(a){u=a(r);for(var c=0;c<u.length;c++){if(i.call(r,u[c])){o[u[c]]=r[u[c]]}}}}return o}},{}],81:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r.controlWordRegex=undefined;var a=e("babel-runtime/helpers/classCallCheck");var n=h(a);var i=e("babel-runtime/helpers/createClass");var l=h(i);var o=e("match-at");var u=h(o);var s=e("./ParseError");var f=h(s);var c=e("./SourceLocation");var d=h(c);var v=e("./Token");function h(e){return e&&e.__esModule?e:{default:e}}var p="%[^\n]*[\n]";var m="\\\\[a-zA-Z@]+";var g="\\\\[^\ud800-\udfff]";var b=new RegExp("([ \r\n\t]+)|"+("("+p+"|")+"[!-\\[\\]-\u2027\u202a-\ud7ff\uf900-\uffff]"+"|[\ud800-\udbff][\udc00-\udfff]"+"|\\\\verb\\*([^]).*?\\3"+"|\\\\verb([^*a-zA-Z]).*?\\4"+("|"+m)+("|"+g)+")");var y=r.controlWordRegex=new RegExp("^"+m);var x=new RegExp("^"+p);var w=function(){function e(t){(0,n.default)(this,e);this.input=t;this.pos=0}(0,l.default)(e,[{key:"lex",value:function e(){var t=this.input;var r=this.pos;if(r===t.length){return new v.Token("EOF",new d.default(this,r,r))}var a=(0,u.default)(b,t,r);if(a===null){throw new f.default("Unexpected character: '"+t[r]+"'",new v.Token(t[r],new d.default(this,r,r+1)))}var n=a[2]||" ";var i=this.pos;this.pos+=a[0].length;var l=this.pos;if(x.test(n)){return this.lex()}else{return new v.Token(n,new d.default(this,i,l))}}}]);return e}();r.default=w},{"./ParseError":84,"./SourceLocation":88,"./Token":90,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9,"match-at":79}],82:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/toConsumableArray");var n=b(a);var i=e("babel-runtime/helpers/classCallCheck");var l=b(i);var o=e("babel-runtime/helpers/createClass");var u=b(o);var s=e("./Lexer");var f=b(s);var c=e("./Token");var d=e("./macros");var v=b(d);var h=e("./ParseError");var p=b(h);var m=e("object-assign");var g=b(m);function b(e){return e&&e.__esModule?e:{default:e}}var y=function(){function e(t,r){(0,l.default)(this,e);this.lexer=new f.default(t);this.macros=(0,g.default)({},v.default,r);this.stack=[]}(0,u.default)(e,[{key:"future",value:function e(){if(this.stack.length===0){this.pushToken(this.lexer.lex())}return this.stack[this.stack.length-1]}},{key:"popToken",value:function e(){this.future();return this.stack.pop()}},{key:"consumeSpaces",value:function e(){for(;;){var t=this.future();if(t.text===" "){this.stack.pop()}else{break}}}},{key:"expandOnce",value:function e(){var t;var r=this.popToken();var a=r.text;var i=a.charAt(0)==="\\";if(i&&s.controlWordRegex.test(a)){this.consumeSpaces()}if(!(i&&this.macros.hasOwnProperty(a))){this.pushToken(r);return r}var l=this._getExpansion(a),o=l.tokens,u=l.numArgs;var f=o;if(u){var c=[];for(var d=0;d<u;++d){this.consumeSpaces();var v=this.popToken();if(v.text==="{"){var h=[];var m=1;while(m!==0){var g=this.popToken();h.push(g);if(g.text==="{"){++m}else if(g.text==="}"){--m}else if(g.text==="EOF"){throw new p.default("End of input in macro argument",v)}}h.pop();h.reverse();c[d]=h}else if(v.text==="EOF"){throw new p.default("End of input expecting macro argument",r)}else{c[d]=[v]}}f=f.slice();for(var b=f.length-1;b>=0;--b){var y=f[b];if(y.text==="#"){if(b===0){throw new p.default("Incomplete placeholder at end of macro body",y)}y=f[--b];if(y.text==="#"){f.splice(b+1,1)}else if(/^[1-9]$/.test(y.text)){var x;(x=f).splice.apply(x,[b,2].concat((0,n.default)(c[+y.text-1])))}else{throw new p.default("Not a valid argument number",y)}}}}(t=this.stack).push.apply(t,(0,n.default)(f));return f}},{key:"expandAfterFuture",value:function e(){this.expandOnce();return this.future()}},{key:"expandNextToken",value:function e(){for(;;){var t=this.expandOnce();if(t instanceof c.Token){if(t.text==="\\relax"){this.stack.pop()}else{return this.stack.pop()}}}throw new Error}},{key:"_getExpansion",value:function e(t){var r=this.macros[t];var a=typeof r==="function"?r(this):r;if(typeof a==="string"){var n=0;if(a.indexOf("#")!==-1){var i=a.replace(/##/g,"");while(i.indexOf("#"+(n+1))!==-1){++n}}var l=new f.default(a);var o=[];var u=l.lex();while(u.text!=="EOF"){o.push(u);u=l.lex()}o.reverse();var s={tokens:o,numArgs:n};if(typeof r!=="function"){this.macros[t]=s}return s}return a}},{key:"pushToken",value:function e(t){this.stack.push(t)}}]);return e}();r.default=y},{"./Lexer":81,"./ParseError":84,"./Token":90,"./macros":107,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9,"babel-runtime/helpers/toConsumableArray":11,"object-assign":80}],83:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/classCallCheck");var n=s(a);var i=e("babel-runtime/helpers/createClass");var l=s(i);var o=e("./fontMetrics");var u=s(o);function s(e){return e&&e.__esModule?e:{default:e}}var f=[[1,1,1],[2,1,1],[3,1,1],[4,2,1],[5,2,1],[6,3,1],[7,4,2],[8,6,3],[9,7,6],[10,8,7],[11,10,9]];var c=[.5,.6,.7,.8,.9,1,1.2,1.44,1.728,2.074,2.488];var d=function e(t,r){return r.size<2?t:f[t-1][r.size-1]};var v=function(){function e(t){(0,n.default)(this,e);this.style=t.style;this.color=t.color;this.size=t.size||e.BASESIZE;this.textSize=t.textSize||this.size;this.phantom=!!t.phantom;this.font=t.font;this.sizeMultiplier=c[this.size-1];this.maxSize=t.maxSize;this._fontMetrics=undefined}(0,l.default)(e,[{key:"extend",value:function t(r){var a={style:this.style,size:this.size,textSize:this.textSize,color:this.color,phantom:this.phantom,font:this.font,maxSize:this.maxSize};for(var n in r){if(r.hasOwnProperty(n)){a[n]=r[n]}}return new e(a)}},{key:"havingStyle",value:function e(t){if(this.style===t){return this}else{return this.extend({style:t,size:d(this.textSize,t)})}}},{key:"havingCrampedStyle",value:function e(){return this.havingStyle(this.style.cramp())}},{key:"havingSize",value:function e(t){if(this.size===t&&this.textSize===t){return this}else{return this.extend({style:this.style.text(),size:t,textSize:t})}}},{key:"havingBaseStyle",value:function t(r){r=r||this.style.text();var a=d(e.BASESIZE,r);if(this.size===a&&this.textSize===e.BASESIZE&&this.style===r){return this}else{return this.extend({style:r,size:a})}}},{key:"withColor",value:function e(t){return this.extend({color:t})}},{key:"withPhantom",value:function e(){return this.extend({phantom:true})}},{key:"withFont",value:function e(t){return this.extend({font:t||this.font})}},{key:"sizingClasses",value:function e(t){if(t.size!==this.size){return["sizing","reset-size"+t.size,"size"+this.size]}else{return[]}}},{key:"baseSizingClasses",value:function t(){if(this.size!==e.BASESIZE){return["sizing","reset-size"+this.size,"size"+e.BASESIZE]}else{return[]}}},{key:"fontMetrics",value:function e(){if(!this._fontMetrics){this._fontMetrics=u.default.getFontMetrics(this.size)}return this._fontMetrics}},{key:"getColor",value:function t(){if(this.phantom){return"transparent"}else if(this.color!=null&&e.colorMap.hasOwnProperty(this.color)){return e.colorMap[this.color]}else{return this.color}}}]);return e}();v.BASESIZE=6;v.colorMap={"katex-blue":"#6495ed","katex-orange":"#ffa500","katex-pink":"#ff00af","katex-red":"#df0030","katex-green":"#28ae7b","katex-gray":"gray","katex-purple":"#9d38bd","katex-blueA":"#ccfaff","katex-blueB":"#80f6ff","katex-blueC":"#63d9ea","katex-blueD":"#11accd","katex-blueE":"#0c7f99","katex-tealA":"#94fff5","katex-tealB":"#26edd5","katex-tealC":"#01d1c1","katex-tealD":"#01a995","katex-tealE":"#208170","katex-greenA":"#b6ffb0","katex-greenB":"#8af281","katex-greenC":"#74cf70","katex-greenD":"#1fab54","katex-greenE":"#0d923f","katex-goldA":"#ffd0a9","katex-goldB":"#ffbb71","katex-goldC":"#ff9c39","katex-goldD":"#e07d10","katex-goldE":"#a75a05","katex-redA":"#fca9a9","katex-redB":"#ff8482","katex-redC":"#f9685d","katex-redD":"#e84d39","katex-redE":"#bc2612","katex-maroonA":"#ffbde0","katex-maroonB":"#ff92c6","katex-maroonC":"#ed5fa6","katex-maroonD":"#ca337c","katex-maroonE":"#9e034e","katex-purpleA":"#ddd7ff",
    "katex-purpleB": "#c6b9fc", "katex-purpleC": "#aa87ff", "katex-purpleD": "#7854ab", "katex-purpleE": "#543b78", "katex-mintA": "#f5f9e8", "katex-mintB": "#edf2df", "katex-mintC": "#e0e5cc", "katex-grayA": "#f6f7f7", "katex-grayB": "#f0f1f2", "katex-grayC": "#e3e5e6", "katex-grayD": "#d6d8da", "katex-grayE": "#babec2", "katex-grayF": "#888d93", "katex-grayG": "#626569", "katex-grayH": "#3b3e40", "katex-grayI": "#21242c", "katex-kaBlue": "#314453", "katex-kaGreen": "#71B307"
}; r.default = v
}, { "./fontMetrics": 101, "babel-runtime/helpers/classCallCheck": 8, "babel-runtime/helpers/createClass": 9 }], 84: [function (e, t, r) { "use strict"; Object.defineProperty(r, "__esModule", { value: true }); var a = e("babel-runtime/helpers/classCallCheck"); var n = u(a); var i = e("./ParseNode"); var l = u(i); var o = e("./Token"); function u(e) { return e && e.__esModule ? e : { default: e } } var s = function e(t, r) { (0, n.default)(this, e); var a = "KaTeX parse error: " + t; var i = void 0; var l = r && r.loc; if (l && l.start <= l.end) { var o = l.lexer.input; i = l.start; var u = l.end; if (i === o.length) { a += " at end of input: " } else { a += " at position " + (i + 1) + ": " } var s = o.slice(i, u);var f=void 0;if(i>15){f="\u2026"+o.slice(i-15,i)}else{f=o.slice(0,i)}var c=void 0;if(u+15<o.length){c=o.slice(u,u+15)+"\u2026"}else{c=o.slice(u)}a+=f+s+c}var d=new Error(a);d.name="ParseError";d.__proto__=e.prototype;d.position=i;return d};s.prototype.__proto__=Error.prototype;r.default=s},{"./ParseNode":85,"./Token":90,"babel-runtime/helpers/classCallCheck":8}],85:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/classCallCheck");var n=u(a);var i=e("./Token");var l=e("./SourceLocation");var o=u(l);function u(e){return e&&e.__esModule?e:{default:e}}var s=function e(t,r,a,i,l){(0,n.default)(this,e);this.type=t;this.value=r;this.mode=a;this.loc=o.default.range(i,l)};r.default=s},{"./SourceLocation":88,"./Token":90,"babel-runtime/helpers/classCallCheck":8}],86:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/classCallCheck");var n=M(a);var i=e("babel-runtime/helpers/createClass");var l=M(i);var o=e("./functions");var u=M(o);var s=e("./environments");var f=M(s);var c=e("./MacroExpander");var d=M(c);var v=e("./symbols");var h=M(v);var p=e("./utils");var m=M(p);var g=e("./units");var b=e("./unicodeRegexes");var y=e("./ParseNode");var x=M(y);var w=e("./ParseError");var k=M(w);function M(e){return e&&e.__esModule?e:{default:e}}function _(e,t){return{type:"arg",result:e,token:t}}function z(e){return{type:"fn",result:e.text,token:e}}function S(e){return{type:"$",result:"$",token:e}}function T(e){if(e.type==="$"){throw new k.default("Unexpected $",e.token)}return e}var A=function(){function e(t,r){(0,n.default)(this,e);this.gullet=new d.default(t,r.macros);if(r.colorIsTextColor){this.gullet.macros["\\color"]="\\textcolor"}this.settings=r;this.leftrightDepth=0}(0,l.default)(e,[{key:"expect",value:function e(t,r){if(this.nextToken.text!==t){throw new k.default("Expected '"+t+"', got '"+this.nextToken.text+"'",this.nextToken)}if(r!==false){this.consume()}}},{key:"consume",value:function e(){this.nextToken=this.gullet.expandNextToken()}},{key:"switchMode",value:function e(t){this.mode=t}},{key:"parse",value:function e(){this.mode="math";this.consume();var e=this.parseInput();return e}},{key:"parseInput",value:function e(){var t=this.parseExpression(false);this.expect("EOF",false);return t}},{key:"parseExpression",value:function t(r,a){var n=[];while(true){if(this.mode==="math"){this.consumeSpaces()}var i=this.nextToken;if(e.endOfExpression.indexOf(i.text)!==-1){break}if(a&&i.text===a){break}if(r&&u.default[i.text]&&u.default[i.text].infix){break}var l=this.parseAtom(a);if(!l){if(!this.settings.throwOnError&&i.text[0]==="\\"){var o=this.handleUnsupportedCmd();n.push(o);continue}break}n.push(l)}return this.handleInfixNodes(n)}},{key:"handleInfixNodes",value:function e(t){var r=-1;var a=void 0;for(var n=0;n<t.length;n++){var i=t[n];if(i.type==="infix"){if(r!==-1){throw new k.default("only one infix operator per group",i.value.token)}r=n;a=i.value.replaceWith}}if(r!==-1){var l=void 0;var o=void 0;var u=t.slice(0,r);var s=t.slice(r+1);if(u.length===1&&u[0].type==="ordgroup"){l=u[0]}else{l=new x.default("ordgroup",u,this.mode)}if(s.length===1&&s[0].type==="ordgroup"){o=s[0]}else{o=new x.default("ordgroup",s,this.mode)}var f=this.callFunction(a,[l,o],[]);return[new x.default(f.type,f,this.mode)]}else{return t}}},{key:"handleSupSubscript",value:function t(r){var a=this.nextToken;var n=a.text;this.consume();this.consumeSpaces();var i=this.parseGroup();if(!i){if(!this.settings.throwOnError&&this.nextToken.text[0]==="\\"){return this.handleUnsupportedCmd()}else{throw new k.default("Expected group after '"+n+"'",a)}}var l=T(i);if(l.type==="fn"){var o=u.default[i.result].greediness;if(o>e.SUPSUB_GREEDINESS){return this.parseGivenFunction(i)}else{throw new k.default("Got function '"+i.result+"' with no arguments "+"as "+r,a)}}else{return i.result}}},{key:"handleUnsupportedCmd",value:function e(){var t=this.nextToken.text;var r=[];for(var a=0;a<t.length;a++){r.push(new x.default("textord",t[a],"text"))}var n=new x.default("text",{body:r,type:"text"},this.mode);var i=new x.default("color",{color:this.settings.errorColor,value:[n],type:"color"},this.mode);this.consume();return i}},{key:"parseAtom",value:function e(t){var r=this.parseImplicitGroup(t);if(this.mode==="text"){return r}var a=void 0;var n=void 0;while(true){this.consumeSpaces();var i=this.nextToken;if(i.text==="\\limits"||i.text==="\\nolimits"){if(!r||r.type!=="op"){throw new k.default("Limit controls must follow a math operator",i)}else{var l=i.text==="\\limits";r.value.limits=l;r.value.alwaysHandleSupSub=true}this.consume()}else if(i.text==="^"){if(a){throw new k.default("Double superscript",i)}a=this.handleSupSubscript("superscript")}else if(i.text==="_"){if(n){throw new k.default("Double subscript",i)}n=this.handleSupSubscript("subscript")}else if(i.text==="'"){if(a){throw new k.default("Double superscript",i)}var o=new x.default("textord","\\prime",this.mode);var u=[o];this.consume();while(this.nextToken.text==="'"){u.push(o);this.consume()}if(this.nextToken.text==="^"){u.push(this.handleSupSubscript("superscript"))}a=new x.default("ordgroup",u,this.mode)}else{break}}if(a||n){return new x.default("supsub",{base:r,sup:a,sub:n},this.mode)}else{return r}}},{key:"parseImplicitGroup",value:function t(r){var a=this.parseSymbol();if(a==null){return this.parseFunction()}var n=a.result;if(n==="\\left"){var i=this.parseGivenFunction(a);++this.leftrightDepth;var l=this.parseExpression(false);--this.leftrightDepth;this.expect("\\right",false);var o=this.parseFunction();return new x.default("leftright",{body:l,left:i.value.value,right:o.value.value},this.mode)}else if(n==="\\begin"){var u=this.parseGivenFunction(a);var s=u.value.name;if(!f.default.has(s)){throw new k.default("No such environment: "+s,u.value.nameGroup)}var c=f.default.get(s);var d=this.parseArguments("\\begin{"+s+"}",c),v=d.args,h=d.optArgs;var p={mode:this.mode,envName:s,parser:this};var g=c.handler(p,v,h);this.expect("\\end",false);var b=this.nextToken;var y=this.parseFunction();if(y.value.name!==s){throw new k.default("Mismatch: \\begin{"+s+"} matched "+"by \\end{"+y.value.name+"}",b)}g.position=y.position;return g}else if(m.default.contains(e.sizeFuncs,n)){this.consumeSpaces();var w=this.parseExpression(false,r);return new x.default("sizing",{size:m.default.indexOf(e.sizeFuncs,n)+1,value:w},this.mode)}else if(m.default.contains(e.styleFuncs,n)){this.consumeSpaces();var M=this.parseExpression(true,r);return new x.default("styling",{style:n.slice(1,n.length-5),value:M},this.mode)}else if(n in e.oldFontFuncs){var _=e.oldFontFuncs[n];this.consumeSpaces();var z=this.parseExpression(true,r);if(_.slice(0,4)==="text"){return new x.default("text",{style:_,body:new x.default("ordgroup",z,this.mode)},this.mode)}else{return new x.default("font",{font:_,body:new x.default("ordgroup",z,this.mode)},this.mode)}}else if(n==="\\color"){var S=this.parseColorGroup(false);if(!S){throw new k.default("\\color not followed by color")}var T=this.parseExpression(true,r);return new x.default("color",{type:"color",color:S.result.value,value:T},this.mode)}else if(n==="$"){if(this.mode==="math"){throw new k.default("$ within math mode")}this.consume();var A=this.mode;this.switchMode("math");var C=this.parseExpression(false,"$");this.expect("$",true);this.switchMode(A);return new x.default("styling",{style:"text",value:C},"math")}else{return this.parseGivenFunction(a)}}},{key:"parseFunction",value:function e(){var t=this.parseGroup();return t?this.parseGivenFunction(t):null}},{key:"parseGivenFunction",value:function e(t){t=T(t);if(t.type==="fn"){var r=t.result;var a=u.default[r];if(this.mode==="text"&&!a.allowedInText){throw new k.default("Can't use function '"+r+"' in text mode",t.token)}else if(this.mode==="math"&&a.allowedInMath===false){throw new k.default("Can't use function '"+r+"' in math mode",t.token)}var n=this.parseArguments(r,a),i=n.args,l=n.optArgs;var o=t.token;var s=this.callFunction(r,i,l,o);return new x.default(s.type,s,this.mode)}else{return t.result}}},{key:"callFunction",value:function e(t,r,a,n){var i={funcName:t,parser:this,token:n};return u.default[t].handler(i,r,a)}},{key:"parseArguments",value:function e(t,r){var a=r.numArgs+r.numOptionalArgs;if(a===0){return{args:[],optArgs:[]}}var n=r.greediness;var i=[];var l=[];for(var o=0;o<a;o++){var s=r.argTypes&&r.argTypes[o];var f=o<r.numOptionalArgs;if(o>0&&!f){this.consumeSpaces()}if(o===0&&!f&&this.mode==="math"){this.consumeSpaces()}var c=this.nextToken;var d=s?this.parseGroupOfType(s,f):this.parseGroup(f);if(!d){if(f){l.push(null);continue}if(!this.settings.throwOnError&&this.nextToken.text[0]==="\\"){d=_(this.handleUnsupportedCmd(),c)}else{throw new k.default("Expected group after '"+t+"'",c)}}var v=void 0;d=T(d);if(d.type==="fn"){var h=u.default[d.result].greediness;if(h>n){v=this.parseGivenFunction(d)}else{throw new k.default("Got function '"+d.result+"' as "+"argument to '"+t+"'",c)}}else{v=d.result}(f?l:i).push(v)}return{args:i,optArgs:l}}},{key:"parseGroupOfType",value:function e(t,r){var a=this.mode;if(t==="original"){t=a}if(t==="color"){return this.parseColorGroup(r)}if(t==="size"){return this.parseSizeGroup(r)}this.switchMode(t);var n=this.parseGroup(r);this.switchMode(a);return n}},{key:"consumeSpaces",value:function e(){while(this.nextToken.text===" "){this.consume()}}},{key:"parseStringGroup",value:function e(t,r){if(r&&this.nextToken.text!=="["){return null}var a=this.mode;this.mode="text";this.expect(r?"[":"{");var n="";var i=this.nextToken;var l=i;while(this.nextToken.text!==(r?"]":"}")){if(this.nextToken.text==="EOF"){throw new k.default("Unexpected end of input in "+t,i.range(this.nextToken,n))}l=this.nextToken;n+=l.text;this.consume()}this.mode=a;this.expect(r?"]":"}");return i.range(l,n)}},{key:"parseRegexGroup",value:function e(t,r){var a=this.mode;this.mode="text";var n=this.nextToken;var i=n;var l="";while(this.nextToken.text!=="EOF"&&t.test(l+this.nextToken.text)){i=this.nextToken;l+=i.text;this.consume()}if(l===""){throw new k.default("Invalid "+r+": '"+n.text+"'",n)}this.mode=a;return n.range(i,l)}},{key:"parseColorGroup",value:function e(t){var r=this.parseStringGroup("color",t);if(!r){return null}var a=/^(#[a-f0-9]{3}|#[a-f0-9]{6}|[a-z]+)$/i.exec(r.text);if(!a){throw new k.default("Invalid color: '"+r.text+"'",r)}return _(new x.default("color",a[0],this.mode),r)}},{key:"parseSizeGroup",value:function e(t){var r=void 0;if(!t&&this.nextToken.text!=="{"){r=this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,"size")}else{r=this.parseStringGroup("size",t)}if(!r){return null}var a=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(r.text);if(!a){throw new k.default("Invalid size: '"+r.text+"'",r)}var n={number:+(a[1]+a[2]),unit:a[3]};if(!(0,g.validUnit)(n)){throw new k.default("Invalid unit: '"+n.unit+"'",r)}return _(new x.default("size",n,this.mode),r)}},{key:"parseGroup",value:function e(t){var r=this.nextToken;if(this.nextToken.text===(t?"[":"{")){this.consume();var a=this.parseExpression(false,t?"]":"}");var n=this.nextToken;this.expect(t?"]":"}");if(this.mode==="text"){this.formLigatures(a)}return _(new x.default("ordgroup",a,this.mode,r,n),r.range(n,r.text))}else{return t?null:this.parseSymbol()}}},{key:"formLigatures",value:function e(t){var r=t.length-1;for(var a=0;a<r;++a){var n=t[a];var i=n.value;if(i==="-"&&t[a+1].value==="-"){if(a+1<r&&t[a+2].value==="-"){t.splice(a,3,new x.default("textord","---","text",n,t[a+2]));r-=2}else{t.splice(a,2,new x.default("textord","--","text",n,t[a+1]));r-=1}}if((i==="'"||i==="`")&&t[a+1].value===i){t.splice(a,2,new x.default("textord",i+i,"text",n,t[a+1]));r-=1}}}},{key:"parseSymbol",value:function e(){var t=this.nextToken;if(u.default[t.text]){this.consume();return z(t)}else if(h.default[this.mode][t.text]){this.consume();return _(new x.default(h.default[this.mode][t.text].group,t.text,this.mode,t),t)}else if(this.mode==="text"&&b.cjkRegex.test(t.text)){this.consume();return _(new x.default("textord",t.text,this.mode,t),t)}else if(t.text==="$"){return S(t)}else if(/^\\verb[^a-zA-Z]/.test(t.text)){this.consume();var r=t.text.slice(5);var a=r.charAt(0)==="*";if(a){r=r.slice(1)}if(r.length<2||r.charAt(0)!==r.slice(-1)){throw new k.default("\\verb assertion failed --\n                    please report what input caused this bug")}r=r.slice(1,-1);return _(new x.default("verb",{body:r,star:a},"text"),t)}else{return null}}}]);return e}();A.endOfExpression=["}","\\end","\\right","&","\\\\","\\cr"];A.SUPSUB_GREEDINESS=1;A.sizeFuncs=["\\tiny","\\sixptsize","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"];A.styleFuncs=["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"];A.oldFontFuncs={"\\rm":"mathrm","\\sf":"mathsf","\\tt":"mathtt","\\bf":"mathbf","\\it":"mathit"};r.default=A},{"./MacroExpander":82,"./ParseError":84,"./ParseNode":85,"./environments":99,"./functions":103,"./symbols":112,"./unicodeRegexes":113,"./units":114,"./utils":115,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9}],87:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/classCallCheck");var n=o(a);var i=e("./utils");var l=o(i);function o(e){return e&&e.__esModule?e:{default:e}}var u=function e(t){(0,n.default)(this,e);t=t||{};this.displayMode=l.default.deflt(t.displayMode,false);this.throwOnError=l.default.deflt(t.throwOnError,true);this.errorColor=l.default.deflt(t.errorColor,"#cc0000");this.macros=t.macros||{};this.colorIsTextColor=l.default.deflt(t.colorIsTextColor,false);this.maxSize=Math.max(0,l.default.deflt(t.maxSize,Infinity))};r.default=u},{"./utils":115,"babel-runtime/helpers/classCallCheck":8}],88:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/core-js/object/freeze");var n=s(a);var i=e("babel-runtime/helpers/classCallCheck");var l=s(i);var o=e("babel-runtime/helpers/createClass");var u=s(o);function s(e){return e&&e.__esModule?e:{default:e}}var f=function(){function e(t,r,a){(0,l.default)(this,e);this.lexer=t;this.start=r;this.end=a;(0,n.default)(this)}(0,u.default)(e,null,[{key:"range",value:function t(r,a){if(!a){return r&&r.loc}else if(!r||!r.loc||!a.loc||r.loc.lexer!==a.loc.lexer){return null}else{return new e(r.loc.lexer,r.loc.start,a.loc.end)}}}]);return e}();r.default=f},{"babel-runtime/core-js/object/freeze":7,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9}],89:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/classCallCheck");var n=o(a);var i=e("babel-runtime/helpers/createClass");var l=o(i);function o(e){return e&&e.__esModule?e:{default:e}}var u=function(){function e(t,r,a){(0,n.default)(this,e);this.id=t;this.size=r;this.cramped=a}(0,l.default)(e,[{key:"sup",value:function e(){return g[b[this.id]]}},{key:"sub",value:function e(){return g[y[this.id]]}},{key:"fracNum",value:function e(){return g[x[this.id]]}},{key:"fracDen",value:function e(){return g[w[this.id]]}},{key:"cramp",value:function e(){return g[k[this.id]]}},{key:"text",value:function e(){return g[M[this.id]]}},{key:"isTight",value:function e(){return this.size>=2}}]);return e}();var s=0;var f=1;var c=2;var d=3;var v=4;var h=5;var p=6;var m=7;var g=[new u(s,0,false),new u(f,0,true),new u(c,1,false),new u(d,1,true),new u(v,2,false),new u(h,2,true),new u(p,3,false),new u(m,3,true)];var b=[v,h,v,h,p,m,p,m];var y=[h,h,h,h,m,m,m,m];var x=[c,d,v,h,p,m,p,m];var w=[d,d,h,h,m,m,m,m];var k=[f,f,d,d,h,h,m,m];var M=[s,f,c,d,c,d,c,d];r.default={DISPLAY:g[s],TEXT:g[c],SCRIPT:g[v],SCRIPTSCRIPT:g[p]}},{"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9}],90:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r.Token=undefined;var a=e("babel-runtime/helpers/classCallCheck");var n=s(a);var i=e("babel-runtime/helpers/createClass");var l=s(i);var o=e("./SourceLocation");var u=s(o);function s(e){return e&&e.__esModule?e:{default:e}}var f=r.Token=function(){function e(t,r){(0,n.default)(this,e);this.text=t;this.loc=r}(0,l.default)(e,[{key:"range",value:function t(r,a){return new e(a,u.default.range(this,r))}}]);return e}()},{"./SourceLocation":88,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9}],91:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./domTree");var n=c(a);var i=e("./fontMetrics");var l=c(i);var o=e("./symbols");var u=c(o);var s=e("./utils");var f=c(s);function c(e){return e&&e.__esModule?e:{default:e}}var d=["\\imath","\\jmath","\\pounds"];var v=function e(t,r,a){if(u.default[a][t]&&u.default[a][t].replace){t=u.default[a][t].replace}return{value:t,metrics:l.default.getCharacterMetrics(t,r)}};var h=function e(t,r,a,i,l){var o=v(t,r,a);var u=o.metrics;t=o.value;var s=void 0;if(u){var f=u.italic;if(a==="text"){f=0}s=new n.default.symbolNode(t,u.height,u.depth,f,u.skew,l)}else{typeof console!=="undefined"&&console.warn("No character metrics for '"+t+"' in style '"+r+"'");s=new n.default.symbolNode(t,0,0,0,0,l)}if(i){s.maxFontSize=i.sizeMultiplier;if(i.style.isTight()){s.classes.push("mtight")}if(i.getColor()){s.style.color=i.getColor()}}return s};var p=function e(t,r,a,n){if(t==="\\"||u.default[r][t].font==="main"){return h(t,"Main-Regular",r,a,n)}else{return h(t,"AMS-Regular",r,a,n.concat(["amsrm"]))}};var m=function e(t,r,a,n,i){if(i==="mathord"){var l=g(t,r,a,n);return h(t,l.fontName,r,a,n.concat([l.fontClass]))}else if(i==="textord"){var o=u.default[r][t]&&u.default[r][t].font;if(o==="ams"){return h(t,"AMS-Regular",r,a,n.concat(["amsrm"]))}else{return h(t,"Main-Regular",r,a,n.concat(["mathrm"]))}}else{throw new Error("unexpected type: "+i+" in mathDefault")}};var g=function e(t,r,a,n){if(/[0-9]/.test(t.charAt(0))||f.default.contains(d,t)){return{fontName:"Main-Italic",fontClass:"mainit"}}else{return{fontName:"Math-Italic",fontClass:"mathit"}}};var b=function e(t,r,a){var n=t.mode;var i=t.value;var l=["mord"];var o=r.font;if(o){var u=void 0;if(o==="mathit"||f.default.contains(d,i)){u=g(i,n,r,l)}else{u=T[o]}if(v(i,u.fontName,n).metrics){return h(i,u.fontName,n,r,l.concat([u.fontClass||o]))}else{return m(i,n,r,l,a)}}else{return m(i,n,r,l,a)}};var y=function e(t){for(var r=0;r<t.length-1;r++){if(t[r].tryCombine(t[r+1])){t.splice(r+1,1);r--}}return t};var x=function e(t){var r=0;var a=0;var n=0;if(t.children){for(var i=0;i<t.children.length;i++){if(t.children[i].height>r){r=t.children[i].height}if(t.children[i].depth>a){a=t.children[i].depth}if(t.children[i].maxFontSize>n){n=t.children[i].maxFontSize}}}t.height=r;t.depth=a;t.maxFontSize=n};var w=function e(t,r,a){var i=new n.default.span(t,r,a);x(i);return i};var k=function e(t,r){t.children=r.concat(t.children);x(t)};var M=function e(t){var r=new n.default.documentFragment(t);x(r);return r};var _=function e(t,r,a,i){var l=void 0;var o=void 0;var u=void 0;if(r==="individualShift"){var s=t;t=[s[0]];l=-s[0].shift-s[0].elem.depth;o=l;for(u=1;u<s.length;u++){var f=-s[u].shift-o-s[u].elem.depth;var c=f-(s[u-1].elem.height+s[u-1].elem.depth);o=o+f;t.push({type:"kern",size:c});t.push(s[u])}}else if(r==="top"){var d=a;for(u=0;u<t.length;u++){if(t[u].type==="kern"){d-=t[u].size}else{d-=t[u].elem.height+t[u].elem.depth}}l=d}else if(r==="bottom"){l=-a}else if(r==="shift"){l=-t[0].elem.depth-a}else if(r==="firstBaseline"){l=-t[0].elem.depth}else{l=0}var v=0;for(u=0;u<t.length;u++){if(t[u].type==="elem"){var h=t[u].elem;v=Math.max(v,h.maxFontSize,h.height)}}v+=2;var p=w(["pstrut"],[]);p.style.height=v+"em";var m=[];var g=l;var b=l;o=l;for(u=0;u<t.length;u++){if(t[u].type==="kern"){o+=t[u].size}else{var y=t[u].elem;var x=w([],[p,y]);x.style.top=-v-o-y.depth+"em";if(t[u].marginLeft){x.style.marginLeft=t[u].marginLeft}if(t[u].marginRight){x.style.marginRight=t[u].marginRight}m.push(x);o+=y.height+y.depth}g=Math.min(g,o);b=Math.max(b,o)}var k=w(["vlist"],m);k.style.height=b+"em";var M=void 0;if(g<0){var _=w(["vlist"],[]);_.style.height=-g+"em";var z=w(["vlist-s"],[new n.default.symbolNode("\u200b")]);M=[w(["vlist-r"],[k,z]),w(["vlist-r"],[_])]}else{M=[w(["vlist-r"],[k])]}var S=w(["vlist-t"],M);if(M.length===2){S.classes.push("vlist-t2")}S.height=b;S.depth=-g;return S};var z=function e(t,r){var a=t.value.body;if(t.value.star){a=a.replace(/ /g,"\u2423")}else{a=a.replace(/ /g,"\xa0")}return a};var S={"\\qquad":{size:"2em",className:"qquad"},"\\quad":{size:"1em",className:"quad"},"\\enspace":{size:"0.5em",className:"enspace"},"\\;":{size:"0.277778em",className:"thickspace"},"\\:":{size:"0.22222em",className:"mediumspace"},"\\,":{size:"0.16667em",className:"thinspace"},"\\!":{size:"-0.16667em",className:"negativethinspace"}};var T={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},textit:{variant:"italic",fontName:"Main-Italic"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}};r.default={fontMap:T,makeSymbol:h,mathsym:p,makeSpan:w,makeFragment:M,makeVList:_,makeOrd:b,makeVerb:z,tryCombineChars:y,prependChildren:k,spacingFunctions:S}},{"./domTree":98,"./fontMetrics":101,"./symbols":112,"./utils":115}],92:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r.buildGroup=r.groupTypes=r.makeNullDelimiter=r.buildExpression=r.spliceSpaces=undefined;var a=e("babel-runtime/core-js/json/stringify");var n=x(a);r.default=R;var i=e("./ParseError");var l=x(i);var o=e("./Style");var u=x(o);var s=e("./buildCommon");var f=x(s);var c=e("./delimiter");var d=x(c);var v=e("./domTree");var h=x(v);var p=e("./units");var m=e("./utils");var g=x(m);var b=e("./stretchy");var y=x(b);function x(e){return e&&e.__esModule?e:{default:e}}var w=f.default.makeSpan;var k=function e(t){return t instanceof h.default.span&&t.classes[0]==="mspace"};var M=function e(t){return t&&t.classes[0]==="mbin"};var _=function e(t,r){if(t){return g.default.contains(["mbin","mopen","mrel","mop","mpunct"],t.classes[0])}else{return r}};var z=function e(t,r){if(t){return g.default.contains(["mrel","mclose","mpunct"],t.classes[0])}else{return r}};var S=r.spliceSpaces=function e(t,r){var a=r;while(a<t.length&&k(t[a])){a++}if(a===r){return null}else{return t.splice(r,a-r)}};var T=r.buildExpression=function e(t,r,a){var n=[];for(var i=0;i<t.length;i++){var l=t[i];var o=P(l,r);if(o instanceof h.default.documentFragment){Array.prototype.push.apply(n,o.children)}else{n.push(o)}}for(var u=0;u<n.length;u++){var s=S(n,u);if(s){if(u<n.length){if(n[u]instanceof h.default.symbolNode){n[u]=w([].concat(n[u].classes),[n[u]])}f.default.prependChildren(n[u],s)}else{Array.prototype.push.apply(n,s);break}}}for(var c=0;c<n.length;c++){if(M(n[c])&&(_(n[c-1],a)||z(n[c+1],a))){n[c].classes[0]="mord"}}for(var d=0;d<n.length;d++){if(n[d].value==="\u0338"&&d+1<n.length){var v=n.slice(d,d+2);v[0].classes=["mainrm"];v[0].style.position="absolute";v[0].style.right="0";var p=n[d+1].classes;var m=w(p,v);if(p.indexOf("mord")!==-1){m.style.paddingLeft="0.277771em"}m.style.position="relative";n.splice(d,2,m)}}return n};var A=function e(t){if(t instanceof h.default.documentFragment){if(t.children.length){return e(t.children[t.children.length-1])}}else{if(g.default.contains(["mord","mop","mbin","mrel","mopen","mclose","mpunct","minner"],t.classes[0])){return t.classes[0]}}return null};var C=function e(t,r){if(!t.value.base){return false}else{var a=t.value.base;if(a.type==="op"){return a.value.limits&&(r.style.size===u.default.DISPLAY.size||a.value.alwaysHandleSupSub)}else if(a.type==="accent"){return O(a.value.base)}else if(a.type==="horizBrace"){var n=t.value.sub?false:true;return n===a.value.isOver}else{return null}}};var N=function e(t){if(!t){return false}else if(t.type==="ordgroup"){if(t.value.length===1){return e(t.value[0])}else{return t}}else if(t.type==="color"){if(t.value.value.length===1){return e(t.value.value[0])}else{return t}}else if(t.type==="font"){return e(t.value.body)}else{return t}};var O=function e(t){var r=N(t);return r.type==="mathord"||r.type==="textord"||r.type==="bin"||r.type==="rel"||r.type==="inner"||r.type==="open"||r.type==="close"||r.type==="punct"};var j=r.makeNullDelimiter=function e(t,r){var a=["nulldelimiter"].concat(t.baseSizingClasses());return w(r.concat(a))};var E=r.groupTypes={};E.mathord=function(e,t){return f.default.makeOrd(e,t,"mathord")};E.textord=function(e,t){return f.default.makeOrd(e,t,"textord")};E.bin=function(e,t){return f.default.mathsym(e.value,e.mode,t,["mbin"])};E.rel=function(e,t){return f.default.mathsym(e.value,e.mode,t,["mrel"])};E.open=function(e,t){return f.default.mathsym(e.value,e.mode,t,["mopen"])};E.close=function(e,t){return f.default.mathsym(e.value,e.mode,t,["mclose"])};E.inner=function(e,t){return f.default.mathsym(e.value,e.mode,t,["minner"])};E.punct=function(e,t){return f.default.mathsym(e.value,e.mode,t,["mpunct"])};E.ordgroup=function(e,t){return w(["mord"],T(e.value,t,true),t)};E.text=function(e,t){var r=t.withFont(e.value.font);var a=T(e.value.body,r,true);f.default.tryCombineChars(a);return w(["mord","text"],a,r)};E.color=function(e,t){var r=T(e.value.value,t.withColor(e.value.color),false);return new f.default.makeFragment(r)};E.supsub=function(e,t){if(C(e,t)){return E[e.value.base.type](e,t)}var r=P(e.value.base,t);var a=void 0;var n=void 0;var i=t.fontMetrics();var l=void 0;var o=0;var s=0;if(e.value.sup){l=t.havingStyle(t.style.sup());a=P(e.value.sup,l,t);if(!O(e.value.base)){o=r.height-l.fontMetrics().supDrop*l.sizeMultiplier/t.sizeMultiplier}}if(e.value.sub){l=t.havingStyle(t.style.sub());n=P(e.value.sub,l,t);if(!O(e.value.base)){s=r.depth+l.fontMetrics().subDrop*l.sizeMultiplier/t.sizeMultiplier}}var c=void 0;if(t.style===u.default.DISPLAY){c=i.sup1}else if(t.style.cramped){c=i.sup3}else{c=i.sup2}var d=t.sizeMultiplier;var v=.5/i.ptPerEm/d+"em";var p=void 0;if(!e.value.sup){s=Math.max(s,i.sub1,n.height-.8*i.xHeight);var m=[{type:"elem",elem:n,marginRight:v}];if(r instanceof h.default.symbolNode){m[0].marginLeft=-r.italic+"em"}p=f.default.makeVList(m,"shift",s,t)}else if(!e.value.sub){o=Math.max(o,c,a.depth+.25*i.xHeight);p=f.default.makeVList([{type:"elem",elem:a,marginRight:v}],"shift",-o,t)}else{o=Math.max(o,c,a.depth+.25*i.xHeight);s=Math.max(s,i.sub2);var g=i.defaultRuleThickness;if(o-a.depth-(n.height-s)<4*g){s=4*g-(o-a.depth)+n.height;var b=.8*i.xHeight-(o-a.depth);if(b>0){o+=b;s-=b}}var y=[{type:"elem",elem:n,shift:s,marginRight:v},{type:"elem",elem:a,shift:-o,marginRight:v}];if(r instanceof h.default.symbolNode){y[0].marginLeft=-r.italic+"em"}p=f.default.makeVList(y,"individualShift",null,t)}var x=A(r)||"mord";return w([x],[r,w(["msupsub"],[p])],t)};E.genfrac=function(e,t){var r=t.style;if(e.value.size==="display"){r=u.default.DISPLAY}else if(e.value.size==="text"){r=u.default.TEXT}var a=r.fracNum();var n=r.fracDen();var i=void 0;i=t.havingStyle(a);var l=P(e.value.numer,i,t);i=t.havingStyle(n);var o=P(e.value.denom,i,t);var s=void 0;var c=void 0;var v=void 0;if(e.value.hasBarLine){s=L("frac-line",t);c=s.height;v=s.height}else{s=null;c=0;v=t.fontMetrics().defaultRuleThickness}var h=void 0;var p=void 0;var m=void 0;if(r.size===u.default.DISPLAY.size){h=t.fontMetrics().num1;if(c>0){p=3*v}else{p=7*v}m=t.fontMetrics().denom1}else{if(c>0){h=t.fontMetrics().num2;p=v}else{h=t.fontMetrics().num3;p=3*v}m=t.fontMetrics().denom2}var g=void 0;if(c===0){var b=h-l.depth-(o.height-m);if(b<p){h+=.5*(p-b);m+=.5*(p-b)}g=f.default.makeVList([{type:"elem",elem:o,shift:m},{type:"elem",elem:l,shift:-h}],"individualShift",null,t)}else{var y=t.fontMetrics().axisHeight;if(h-l.depth-(y+.5*c)<p){h+=p-(h-l.depth-(y+.5*c))}if(y-.5*c-(o.height-m)<p){m+=p-(y-.5*c-(o.height-m))}var x=-(y-.5*c);g=f.default.makeVList([{type:"elem",elem:o,shift:m},{type:"elem",elem:s,shift:x},{type:"elem",elem:l,shift:-h}],"individualShift",null,t)}i=t.havingStyle(r);g.height*=i.sizeMultiplier/t.sizeMultiplier;g.depth*=i.sizeMultiplier/t.sizeMultiplier;var k=void 0;if(r.size===u.default.DISPLAY.size){k=t.fontMetrics().delim1}else{k=t.fontMetrics().delim2}var M=void 0;var _=void 0;if(e.value.leftDelim==null){M=j(t,["mopen"])}else{M=d.default.customSizedDelim(e.value.leftDelim,k,true,t.havingStyle(r),e.mode,["mopen"])}if(e.value.rightDelim==null){_=j(t,["mclose"])}else{_=d.default.customSizedDelim(e.value.rightDelim,k,true,t.havingStyle(r),e.mode,["mclose"])}return w(["mord"].concat(i.sizingClasses(t)),[M,w(["mfrac"],[g]),_],t)};E.spacing=function(e,t){if(e.value==="\\ "||e.value==="\\space"||e.value===" "||e.value==="~"){if(e.mode==="text"){return f.default.makeOrd(e,t,"textord")}else{return w(["mspace"],[f.default.mathsym(e.value,e.mode,t)],t)}}else{return w(["mspace",f.default.spacingFunctions[e.value].className],[],t)}};E.lap=function(e,t){var r=void 0;if(e.value.alignment==="clap"){r=w([],[P(e.value.body,t)]);r=w(["inner"],[r],t)}else{r=w(["inner"],[P(e.value.body,t)])}var a=w(["fix"],[]);return w(["mord",e.value.alignment],[r,a],t)};E.smash=function(e,t){var r=w(["mord"],[P(e.value.body,t)]);if(!e.value.smashHeight&&!e.value.smashDepth){return r}if(e.value.smashHeight){r.height=0;if(r.children){for(var a=0;a<r.children.length;a++){r.children[a].height=0}}}if(e.value.smashDepth){r.depth=0;if(r.children){for(var n=0;n<r.children.length;n++){r.children[n].depth=0}}}return f.default.makeVList([{type:"elem",elem:r}],"firstBaseline",null,t)};E.op=function(e,t){var r=void 0;var a=void 0;var n=false;if(e.type==="supsub"){r=e.value.sup;a=e.value.sub;e=e.value.base;n=true}var i=t.style;var l=["\\smallint"];var o=false;if(i.size===u.default.DISPLAY.size&&e.value.symbol&&!g.default.contains(l,e.value.body)){o=true}var s=void 0;if(e.value.symbol){var c=o?"Size2-Regular":"Size1-Regular";s=f.default.makeSymbol(e.value.body,c,"math",t,["mop","op-symbol",o?"large-op":"small-op"])}else if(e.value.value){var d=T(e.value.value,t,true);if(d.length===1&&d[0]instanceof h.default.symbolNode){s=d[0];s.classes[0]="mop"}else{s=w(["mop"],d,t)}}else{var v=[];for(var p=1;p<e.value.body.length;p++){v.push(f.default.mathsym(e.value.body[p],e.mode))}s=w(["mop"],v,t)}var m=0;var b=0;if(s instanceof h.default.symbolNode){m=(s.height-s.depth)/2-t.fontMetrics().axisHeight;b=s.italic}if(n){s=w([],[s]);var y=void 0;var x=void 0;var k=void 0;var M=void 0;var _=void 0;if(r){_=t.havingStyle(i.sup());y=P(r,_,t);x=Math.max(t.fontMetrics().bigOpSpacing1,t.fontMetrics().bigOpSpacing3-y.depth)}if(a){_=t.havingStyle(i.sub());k=P(a,_,t);M=Math.max(t.fontMetrics().bigOpSpacing2,t.fontMetrics().bigOpSpacing4-k.height);
}var z=void 0;var S=void 0;var A=void 0;if(!r){S=s.height-m;z=f.default.makeVList([{type:"kern",size:t.fontMetrics().bigOpSpacing5},{type:"elem",elem:k,marginLeft:-b+"em"},{type:"kern",size:M},{type:"elem",elem:s}],"top",S,t)}else if(!a){A=s.depth+m;z=f.default.makeVList([{type:"elem",elem:s},{type:"kern",size:x},{type:"elem",elem:y,marginLeft:b+"em"},{type:"kern",size:t.fontMetrics().bigOpSpacing5}],"bottom",A,t)}else if(!r&&!a){return s}else{A=t.fontMetrics().bigOpSpacing5+k.height+k.depth+M+s.depth+m;z=f.default.makeVList([{type:"kern",size:t.fontMetrics().bigOpSpacing5},{type:"elem",elem:k,marginLeft:-b+"em"},{type:"kern",size:M},{type:"elem",elem:s},{type:"kern",size:x},{type:"elem",elem:y,marginLeft:b+"em"},{type:"kern",size:t.fontMetrics().bigOpSpacing5}],"bottom",A,t)}return w(["mop","op-limits"],[z],t)}else{if(m){s.style.position="relative";s.style.top=m+"em"}return s}};E.mod=function(e,t){var r=[];if(e.value.modType==="bmod"){if(!t.style.isTight()){r.push(w(["mspace","negativemediumspace"],[],t))}r.push(w(["mspace","thickspace"],[],t))}else if(t.style.size===u.default.DISPLAY.size){r.push(w(["mspace","quad"],[],t))}else if(e.value.modType==="mod"){r.push(w(["mspace","twelvemuspace"],[],t))}else{r.push(w(["mspace","eightmuspace"],[],t))}if(e.value.modType==="pod"||e.value.modType==="pmod"){r.push(f.default.mathsym("(",e.mode))}if(e.value.modType!=="pod"){var a=[f.default.mathsym("m",e.mode),f.default.mathsym("o",e.mode),f.default.mathsym("d",e.mode)];if(e.value.modType==="bmod"){r.push(w(["mbin"],a,t));r.push(w(["mspace","thickspace"],[],t));if(!t.style.isTight()){r.push(w(["mspace","negativemediumspace"],[],t))}}else{Array.prototype.push.apply(r,a);r.push(w(["mspace","sixmuspace"],[],t))}}if(e.value.value){Array.prototype.push.apply(r,T(e.value.value,t,false))}if(e.value.modType==="pod"||e.value.modType==="pmod"){r.push(f.default.mathsym(")",e.mode))}return f.default.makeFragment(r)};E.katex=function(e,t){var r=w(["k"],[f.default.mathsym("K",e.mode)],t);var a=w(["a"],[f.default.mathsym("A",e.mode)],t);a.height=(a.height+.2)*.75;a.depth=(a.height-.2)*.75;var n=w(["t"],[f.default.mathsym("T",e.mode)],t);var i=w(["e"],[f.default.mathsym("E",e.mode)],t);i.height=i.height-.2155;i.depth=i.depth+.2155;var l=w(["x"],[f.default.mathsym("X",e.mode)],t);return w(["mord","katex-logo"],[r,a,n,i,l],t)};var L=function e(t,r,a){var n=w([t],[],r);n.height=a||r.fontMetrics().defaultRuleThickness;n.style.borderBottomWidth=n.height+"em";n.maxFontSize=1;return n};E.overline=function(e,t){var r=P(e.value.body,t.havingCrampedStyle());var a=L("overline-line",t);var n=f.default.makeVList([{type:"elem",elem:r},{type:"kern",size:3*a.height},{type:"elem",elem:a},{type:"kern",size:a.height}],"firstBaseline",null,t);return w(["mord","overline"],[n],t)};E.underline=function(e,t){var r=P(e.value.body,t);var a=L("underline-line",t);var n=f.default.makeVList([{type:"kern",size:a.height},{type:"elem",elem:a},{type:"kern",size:3*a.height},{type:"elem",elem:r}],"top",r.height,t);return w(["mord","underline"],[n],t)};E.sqrt=function(e,t){var r=P(e.value.body,t.havingCrampedStyle());if(r.height===0){r.height=t.fontMetrics().xHeight}if(r instanceof h.default.documentFragment){r=w([],[r],t)}var a=t.fontMetrics();var n=a.defaultRuleThickness;var i=n;if(t.style.id<u.default.TEXT.id){i=t.fontMetrics().xHeight}var l=n+i/4;var o=(r.height+r.depth+l+n)*t.sizeMultiplier;var s=d.default.customSizedDelim("\\surd",o,false,t,e.mode);var c=t.fontMetrics().sqrtRuleThickness*s.sizeMultiplier;var v=s.height-c;if(v>r.height+r.depth+l){l=(l+v-r.height-r.depth)/2}var p=s.height-r.height-l-c;r.style.paddingLeft=s.advanceWidth+"em";var m=f.default.makeVList([{type:"elem",elem:r},{type:"kern",size:-(r.height+p)},{type:"elem",elem:s},{type:"kern",size:c}],"firstBaseline",null,t);m.children[0].children[0].classes.push("svg-align");if(!e.value.index){return w(["mord","sqrt"],[m],t)}else{var g=t.havingStyle(u.default.SCRIPTSCRIPT);var b=P(e.value.index,g,t);var y=.6*(m.height-m.depth);var x=f.default.makeVList([{type:"elem",elem:b}],"shift",-y,t);var k=w(["root"],[x]);return w(["mord","sqrt"],[k,m],t)}};function q(e,t,r){var a=T(e,t,false);var n=t.sizeMultiplier/r.sizeMultiplier;for(var i=0;i<a.length;i++){var l=g.default.indexOf(a[i].classes,"sizing");if(l<0){Array.prototype.push.apply(a[i].classes,t.sizingClasses(r))}else if(a[i].classes[l+1]==="reset-size"+t.size){a[i].classes[l+1]="reset-size"+r.size}a[i].height*=n;a[i].depth*=n}return f.default.makeFragment(a)}E.sizing=function(e,t){var r=t.havingSize(e.value.size);return q(e.value.value,r,t)};E.styling=function(e,t){var r={display:u.default.DISPLAY,text:u.default.TEXT,script:u.default.SCRIPT,scriptscript:u.default.SCRIPTSCRIPT};var a=r[e.value.style];var n=t.havingStyle(a);return q(e.value.value,n,t)};E.font=function(e,t){var r=e.value.font;return P(e.value.body,t.withFont(r))};E.verb=function(e,t){var r=f.default.makeVerb(e,t);var a=[];var n=t.havingStyle(t.style.text());for(var i=0;i<r.length;i++){if(r[i]==="\xa0"){var l=w(["mord","rule"],[],n);l.style.marginLeft="0.525em";a.push(l)}else{a.push(f.default.makeSymbol(r[i],"Typewriter-Regular",e.mode,n,["mathtt"]))}}f.default.tryCombineChars(a);return w(["mord","text"].concat(n.sizingClasses(t)),a,n)};E.rule=function(e,t){var r=w(["mord","rule"],[],t);var a=0;if(e.value.shift){a=(0,p.calculateSize)(e.value.shift,t)}var n=(0,p.calculateSize)(e.value.width,t);var i=(0,p.calculateSize)(e.value.height,t);r.style.borderRightWidth=n+"em";r.style.borderTopWidth=i+"em";r.style.bottom=a+"em";r.width=n;r.height=i+a;r.depth=-a;r.maxFontSize=i*1.125*t.sizeMultiplier;return r};E.kern=function(e,t){var r=w(["mord","rule"],[],t);if(e.value.dimension){var a=(0,p.calculateSize)(e.value.dimension,t);r.style.marginLeft=a+"em"}return r};E.accent=function(e,t){var r=e.value.base;var a=void 0;if(e.type==="supsub"){var n=e;e=n.value.base;r=e.value.base;n.value.base=r;a=P(n,t)}var i=P(r,t.havingCrampedStyle());var l=e.value.isShifty&&O(r);var o=0;if(l){var u=N(r);var s=P(u,t.havingCrampedStyle());o=s.skew}var c=Math.min(i.height,t.fontMetrics().xHeight);var d=void 0;if(!e.value.isStretchy){var v=f.default.makeSymbol(e.value.label,"Main-Regular",e.mode,t);v.italic=0;var h=null;if(e.value.label==="\\vec"){h="accent-vec"}else if(e.value.label==="\\H"){h="accent-hungarian"}d=w([],[v]);d=w(["accent-body",h],[d]);d.style.marginLeft=2*o+"em";d=f.default.makeVList([{type:"elem",elem:i},{type:"kern",size:-c},{type:"elem",elem:d}],"firstBaseline",null,t)}else{d=y.default.svgSpan(e,t);d=f.default.makeVList([{type:"elem",elem:i},{type:"elem",elem:d}],"firstBaseline",null,t);var p=d.children[0].children[0].children[1];p.classes.push("svg-align");if(o>0){p.style.width="calc(100% - "+2*o+"em)";p.style.marginLeft=2*o+"em"}}var m=w(["mord","accent"],[d],t);if(a){a.children[0]=m;a.height=Math.max(m.height,a.height);a.classes[0]="mord";return a}else{return m}};E.horizBrace=function(e,t){var r=t.style;var a=e.type==="supsub";var n=void 0;var i=void 0;if(a){if(e.value.sup){i=t.havingStyle(r.sup());n=P(e.value.sup,i,t)}else{i=t.havingStyle(r.sub());n=P(e.value.sub,i,t)}e=e.value.base}var l=P(e.value.base,t.havingBaseStyle(u.default.DISPLAY));var o=y.default.svgSpan(e,t);var s=void 0;if(e.value.isOver){s=f.default.makeVList([{type:"elem",elem:l},{type:"kern",size:.1},{type:"elem",elem:o}],"firstBaseline",null,t);s.children[0].children[0].children[1].classes.push("svg-align")}else{s=f.default.makeVList([{type:"elem",elem:o},{type:"kern",size:.1},{type:"elem",elem:l}],"bottom",l.depth+.1+o.height,t);s.children[0].children[0].children[0].classes.push("svg-align")}if(a){var c=w(["mord",e.value.isOver?"mover":"munder"],[s],t);if(e.value.isOver){s=f.default.makeVList([{type:"elem",elem:c},{type:"kern",size:.2},{type:"elem",elem:n}],"firstBaseline",null,t)}else{s=f.default.makeVList([{type:"elem",elem:n},{type:"kern",size:.2},{type:"elem",elem:c}],"bottom",c.depth+.2+n.height,t)}}return w(["mord",e.value.isOver?"mover":"munder"],[s],t)};E.accentUnder=function(e,t){var r=P(e.value.base,t);var a=y.default.svgSpan(e,t);var n=/tilde/.test(e.value.label)?.12:0;var i=f.default.makeVList([{type:"elem",elem:a},{type:"kern",size:n},{type:"elem",elem:r}],"bottom",a.height+n,t);i.children[0].children[0].children[0].classes.push("svg-align");return w(["mord","accentunder"],[i],t)};E.enclose=function(e,t){var r=P(e.value.body,t);var a=e.value.label.substr(1);var n=t.sizeMultiplier;var i=void 0;var l=0;var o=/color/.test(a);if(a==="sout"){i=w(["stretchy","sout"]);i.height=t.fontMetrics().defaultRuleThickness/n;l=-.5*t.fontMetrics().xHeight}else{r.classes.push(/cancel/.test(a)?"cancel-pad":"boxpad");var u=0;if(/box/.test(a)){u=a==="colorbox"?.3:.34}else{u=O(e.value.body)?.2:0}i=y.default.encloseSpan(r,a,u,t);l=r.depth+u;if(o){i.style.backgroundColor=e.value.backgroundColor.value;if(a==="fcolorbox"){i.style.borderColor=e.value.borderColor.value}}}var s=void 0;if(o){s=f.default.makeVList([{type:"elem",elem:i,shift:l},{type:"elem",elem:r,shift:0}],"individualShift",null,t)}else{s=f.default.makeVList([{type:"elem",elem:r,shift:0},{type:"elem",elem:i,shift:l}],"individualShift",null,t)}if(/cancel/.test(a)){s.children[0].children[0].children[1].classes.push("svg-align");return w(["mord","cancel-lap"],[s],t)}else{return w(["mord"],[s],t)}};E.xArrow=function(e,t){var r=t.style;var a=t.havingStyle(r.sup());var n=P(e.value.body,a,t);n.classes.push("x-arrow-pad");var i=void 0;if(e.value.below){a=t.havingStyle(r.sub());i=P(e.value.below,a,t);i.classes.push("x-arrow-pad")}var l=y.default.svgSpan(e,t);var o=-t.fontMetrics().axisHeight+.5*l.height;var u=-t.fontMetrics().axisHeight-.5*l.height-.111;var s=void 0;if(e.value.below){var c=-t.fontMetrics().axisHeight+i.height+.5*l.height+.111;s=f.default.makeVList([{type:"elem",elem:n,shift:u},{type:"elem",elem:l,shift:o},{type:"elem",elem:i,shift:c}],"individualShift",null,t)}else{s=f.default.makeVList([{type:"elem",elem:n,shift:u},{type:"elem",elem:l,shift:o}],"individualShift",null,t)}s.children[0].children[0].children[1].classes.push("svg-align");return w(["mrel","x-arrow"],[s],t)};E.mclass=function(e,t){var r=T(e.value.value,t,true);return w([e.value.mclass],r,t)};E.raisebox=function(e,t){var r=E.sizing({value:{value:[{type:"text",value:{body:e.value.value,font:"mathrm"}}],size:6}},t);var a=(0,p.calculateSize)(e.value.dy.value,t);return f.default.makeVList([{type:"elem",elem:r}],"shift",-a,t)};var P=r.buildGroup=function e(t,r,a){if(!t){return w()}if(E[t.type]){var n=E[t.type](t,r);if(a&&r.size!==a.size){n=w(r.sizingClasses(a),[n],r);var i=r.sizeMultiplier/a.sizeMultiplier;n.height*=i;n.depth*=i}return n}else{throw new l.default("Got group of unknown type: '"+t.type+"'")}};function R(e,t){e=JSON.parse((0,n.default)(e));var r=T(e,t,true);var a=w(["base"],r,t);var i=w(["strut"]);var l=w(["strut","bottom"]);i.style.height=a.height+"em";l.style.height=a.height+a.depth+"em";l.style.verticalAlign=-a.depth+"em";var o=w(["katex-html"],[i,l,a]);o.setAttribute("aria-hidden","true");return o}},{"./ParseError":84,"./Style":89,"./buildCommon":91,"./delimiter":97,"./domTree":98,"./stretchy":110,"./units":114,"./utils":115,"babel-runtime/core-js/json/stringify":5}],93:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r.buildGroup=r.buildExpression=r.groupTypes=r.makeText=undefined;r.default=S;var a=e("./buildCommon");var n=y(a);var i=e("./fontMetrics");var l=y(i);var o=e("./mathMLTree");var u=y(o);var s=e("./ParseError");var f=y(s);var c=e("./Style");var d=y(c);var v=e("./symbols");var h=y(v);var p=e("./utils");var m=y(p);var g=e("./stretchy");var b=y(g);function y(e){return e&&e.__esModule?e:{default:e}}var x=r.makeText=function e(t,r){if(h.default[r][t]&&h.default[r][t].replace){t=h.default[r][t].replace}return new u.default.TextNode(t)};var w=function e(t,r){var a=r.font;if(!a){return null}var i=t.mode;if(a==="mathit"){return"italic"}var o=t.value;if(m.default.contains(["\\imath","\\jmath"],o)){return null}if(h.default[i][o]&&h.default[i][o].replace){o=h.default[i][o].replace}var u=n.default.fontMap[a].fontName;if(l.default.getCharacterMetrics(o,u)){return n.default.fontMap[r.font].variant}return null};var k=r.groupTypes={};var M={mi:"italic",mn:"normal",mtext:"normal"};k.mathord=function(e,t){var r=new u.default.MathNode("mi",[x(e.value,e.mode)]);var a=w(e,t)||"italic";if(a!==M[r.type]){r.setAttribute("mathvariant",a)}return r};k.textord=function(e,t){var r=x(e.value,e.mode);var a=w(e,t)||"normal";var n=void 0;if(e.mode==="text"){n=new u.default.MathNode("mtext",[r])}else if(/[0-9]/.test(e.value)){n=new u.default.MathNode("mn",[r])}else if(e.value==="\\prime"){n=new u.default.MathNode("mo",[r])}else{n=new u.default.MathNode("mi",[r])}if(a!==M[n.type]){n.setAttribute("mathvariant",a)}return n};k.bin=function(e){var t=new u.default.MathNode("mo",[x(e.value,e.mode)]);return t};k.rel=function(e){var t=new u.default.MathNode("mo",[x(e.value,e.mode)]);return t};k.open=function(e){var t=new u.default.MathNode("mo",[x(e.value,e.mode)]);return t};k.close=function(e){var t=new u.default.MathNode("mo",[x(e.value,e.mode)]);return t};k.inner=function(e){var t=new u.default.MathNode("mo",[x(e.value,e.mode)]);return t};k.punct=function(e){var t=new u.default.MathNode("mo",[x(e.value,e.mode)]);t.setAttribute("separator","true");return t};k.ordgroup=function(e,t){var r=_(e.value,t);var a=new u.default.MathNode("mrow",r);return a};k.text=function(e,t){var r=e.value.body;var a=[];var n=null;for(var i=0;i<r.length;i++){var l=z(r[i],t);if(l.type==="mtext"&&n!=null){Array.prototype.push.apply(n.children,l.children)}else{a.push(l);if(l.type==="mtext"){n=l}}}if(a.length===1){return a[0]}else{return new u.default.MathNode("mrow",a)}};k.color=function(e,t){var r=_(e.value.value,t);var a=new u.default.MathNode("mstyle",r);a.setAttribute("mathcolor",e.value.color);return a};k.supsub=function(e,t){var r=false;var a=void 0;var n=void 0;if(e.value.base){if(e.value.base.value.type==="horizBrace"){n=e.value.sup?true:false;if(n===e.value.base.value.isOver){r=true;a=e.value.base.value.isOver}}}var i=true;var l=[z(e.value.base,t,i)];if(e.value.sub){l.push(z(e.value.sub,t,i))}if(e.value.sup){l.push(z(e.value.sup,t,i))}var o=void 0;if(r){o=a?"mover":"munder"}else if(!e.value.sub){o="msup"}else if(!e.value.sup){o="msub"}else{var s=e.value.base;if(s&&s.value.limits&&t.style===d.default.DISPLAY){o="munderover"}else{o="msubsup"}}var f=new u.default.MathNode(o,l);return f};k.genfrac=function(e,t){var r=new u.default.MathNode("mfrac",[z(e.value.numer,t),z(e.value.denom,t)]);if(!e.value.hasBarLine){r.setAttribute("linethickness","0px")}if(e.value.leftDelim!=null||e.value.rightDelim!=null){var a=[];if(e.value.leftDelim!=null){var n=new u.default.MathNode("mo",[new u.default.TextNode(e.value.leftDelim)]);n.setAttribute("fence","true");a.push(n)}a.push(r);if(e.value.rightDelim!=null){var i=new u.default.MathNode("mo",[new u.default.TextNode(e.value.rightDelim)]);i.setAttribute("fence","true");a.push(i)}var l=new u.default.MathNode("mrow",a);return l}return r};k.sqrt=function(e,t){var r=void 0;if(e.value.index){r=new u.default.MathNode("mroot",[z(e.value.body,t),z(e.value.index,t)])}else{r=new u.default.MathNode("msqrt",[z(e.value.body,t)])}return r};k.accent=function(e,t){var r=void 0;if(e.value.isStretchy){r=b.default.mathMLnode(e.value.label)}else{r=new u.default.MathNode("mo",[x(e.value.label,e.mode)])}var a=new u.default.MathNode("mover",[z(e.value.base,t),r]);a.setAttribute("accent","true");return a};k.spacing=function(e){var t=void 0;if(e.value==="\\ "||e.value==="\\space"||e.value===" "||e.value==="~"){t=new u.default.MathNode("mtext",[new u.default.TextNode("\xa0")])}else{t=new u.default.MathNode("mspace");t.setAttribute("width",n.default.spacingFunctions[e.value].size)}return t};k.op=function(e,t){var r=void 0;if(e.value.symbol){r=new u.default.MathNode("mo",[x(e.value.body,e.mode)])}else if(e.value.value){r=new u.default.MathNode("mo",_(e.value.value,t))}else{r=new u.default.MathNode("mi",[new u.default.TextNode(e.value.body.slice(1))])}return r};k.mod=function(e,t){var r=[];if(e.value.modType==="pod"||e.value.modType==="pmod"){r.push(new u.default.MathNode("mo",[x("(",e.mode)]))}if(e.value.modType!=="pod"){r.push(new u.default.MathNode("mo",[x("mod",e.mode)]))}if(e.value.value){var a=new u.default.MathNode("mspace");a.setAttribute("width","0.333333em");r.push(a);r=r.concat(_(e.value.value,t))}if(e.value.modType==="pod"||e.value.modType==="pmod"){r.push(new u.default.MathNode("mo",[x(")",e.mode)]))}return new u.default.MathNode("mo",r)};k.katex=function(e){var t=new u.default.MathNode("mtext",[new u.default.TextNode("KaTeX")]);return t};k.font=function(e,t){var r=e.value.font;return z(e.value.body,t.withFont(r))};k.styling=function(e,t){var r={display:d.default.DISPLAY,text:d.default.TEXT,script:d.default.SCRIPT,scriptscript:d.default.SCRIPTSCRIPT};var a=r[e.value.style];var n=t.havingStyle(a);var i=_(e.value.value,n);var l=new u.default.MathNode("mstyle",i);var o={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]};var s=o[e.value.style];l.setAttribute("scriptlevel",s[0]);l.setAttribute("displaystyle",s[1]);return l};k.sizing=function(e,t){var r=t.havingSize(e.value.size);var a=_(e.value.value,r);var n=new u.default.MathNode("mstyle",a);n.setAttribute("mathsize",r.sizeMultiplier+"em");return n};k.verb=function(e,t){var r=new u.default.TextNode(n.default.makeVerb(e,t));var a=new u.default.MathNode("mtext",[r]);a.setAttribute("mathvariant",n.default.fontMap["mathtt"].variant);return a};k.overline=function(e,t){var r=new u.default.MathNode("mo",[new u.default.TextNode("\u203e")]);r.setAttribute("stretchy","true");var a=new u.default.MathNode("mover",[z(e.value.body,t),r]);a.setAttribute("accent","true");return a};k.underline=function(e,t){var r=new u.default.MathNode("mo",[new u.default.TextNode("\u203e")]);r.setAttribute("stretchy","true");var a=new u.default.MathNode("munder",[z(e.value.body,t),r]);a.setAttribute("accentunder","true");return a};k.accentUnder=function(e,t){var r=b.default.mathMLnode(e.value.label);var a=new u.default.MathNode("munder",[z(e.value.body,t),r]);a.setAttribute("accentunder","true");return a};k.enclose=function(e,t){var r=new u.default.MathNode("menclose",[z(e.value.body,t)]);switch(e.value.label){case"\\cancel":r.setAttribute("notation","updiagonalstrike");break;case"\\bcancel":r.setAttribute("notation","downdiagonalstrike");break;case"\\sout":r.setAttribute("notation","horizontalstrike");break;case"\\fbox":r.setAttribute("notation","box");break;case"\\colorbox":r.setAttribute("mathbackground",e.value.backgroundColor.value);break;case"\\fcolorbox":r.setAttribute("mathbackground",e.value.backgroundColor.value);r.setAttribute("notation","box");break;default:r.setAttribute("notation","updiagonalstrike downdiagonalstrike")}return r};k.horizBrace=function(e,t){var r=b.default.mathMLnode(e.value.label);return new u.default.MathNode(e.value.isOver?"mover":"munder",[z(e.value.base,t),r])};k.xArrow=function(e,t){var r=b.default.mathMLnode(e.value.label);var a=void 0;var n=void 0;if(e.value.body){var i=z(e.value.body,t);if(e.value.below){n=z(e.value.below,t);a=new u.default.MathNode("munderover",[r,n,i])}else{a=new u.default.MathNode("mover",[r,i])}}else if(e.value.below){n=z(e.value.below,t);a=new u.default.MathNode("munder",[r,n])}else{a=new u.default.MathNode("mover",[r])}return a};k.rule=function(e){var t=new u.default.MathNode("mrow");return t};k.kern=function(e){var t=new u.default.MathNode("mrow");return t};k.lap=function(e,t){var r=new u.default.MathNode("mpadded",[z(e.value.body,t)]);if(e.value.alignment!=="rlap"){var a=e.value.alignment==="llap"?"-1":"-0.5";r.setAttribute("lspace",a+"width")}r.setAttribute("width","0px");return r};k.smash=function(e,t){var r=new u.default.MathNode("mpadded",[z(e.value.body,t)]);if(e.value.smashHeight){r.setAttribute("height","0px")}if(e.value.smashDepth){r.setAttribute("depth","0px")}return r};k.mclass=function(e,t){var r=_(e.value.value,t);return new u.default.MathNode("mstyle",r)};k.raisebox=function(e,t){var r=new u.default.MathNode("mpadded",[z(e.value.body,t)]);var a=e.value.dy.value.number+e.value.dy.value.unit;r.setAttribute("voffset",a);return r};var _=r.buildExpression=function e(t,r){var a=[];for(var n=0;n<t.length;n++){var i=t[n];a.push(z(i,r))}return a};var z=r.buildGroup=function e(t,r){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(!t){return new u.default.MathNode("mrow")}if(k[t.type]){var n=k[t.type](t,r);if(a){if(n.type==="mrow"&&n.children.length===1){return n.children[0]}}return n}else{throw new f.default("Got group of unknown type: '"+t.type+"'")}};function S(e,t,r){var a=_(e,r);var i=new u.default.MathNode("mrow",a);var l=new u.default.MathNode("annotation",[new u.default.TextNode(t)]);l.setAttribute("encoding","application/x-tex");var o=new u.default.MathNode("semantics",[i,l]);var s=new u.default.MathNode("math",[o]);return n.default.makeSpan(["katex-mathml"],[s])}},{"./ParseError":84,"./Style":89,"./buildCommon":91,"./fontMetrics":101,"./mathMLTree":108,"./stretchy":110,"./symbols":112,"./utils":115}],94:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./buildHTML");var n=p(a);var i=e("./buildMathML");var l=p(i);var o=e("./buildCommon");var u=p(o);var s=e("./Options");var f=p(s);var c=e("./Settings");var d=p(c);var v=e("./Style");var h=p(v);function p(e){return e&&e.__esModule?e:{default:e}}var m=function e(t,r,a){a=a||new d.default({});var i=h.default.TEXT;if(a.displayMode){i=h.default.DISPLAY}var o=new f.default({style:i,maxSize:a.maxSize});var s=(0,l.default)(t,r,o);var c=(0,n.default)(t,o);var v=u.default.makeSpan(["katex"],[s,c]);if(a.displayMode){return u.default.makeSpan(["katex-display"],[v])}else{return v}};r.default=m},{"./Options":83,"./Settings":87,"./Style":89,"./buildCommon":91,"./buildHTML":92,"./buildMathML":93}],95:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r._environments=undefined;r.default=c;var a=e("./buildHTML");var n=e("./buildMathML");var i=e("./Options");var l=s(i);var o=e("./ParseNode");var u=s(o);function s(e){return e&&e.__esModule?e:{default:e}}var f=r._environments={};function c(e){var t=e.type,r=e.names,i=e.props,l=e.handler,o=e.htmlBuilder,u=e.mathmlBuilder;var s={numArgs:i.numArgs||0,greediness:1,allowedInText:false,numOptionalArgs:0,handler:l};for(var c=0;c<r.length;++c){f[r[c]]=s}if(o){a.groupTypes[t]=o}if(u){n.groupTypes[t]=u}}},{"./Options":83,"./ParseNode":85,"./buildHTML":92,"./buildMathML":93}],96:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r.ordargument=r._functions=undefined;r.default=l;var a=e("./buildHTML");var n=e("./buildMathML");var i=r._functions={};function l(e){var t=e.type,r=e.names,l=e.props,o=e.handler,u=e.htmlBuilder,s=e.mathmlBuilder;var f={numArgs:l.numArgs,argTypes:l.argTypes,greediness:l.greediness===undefined?1:l.greediness,allowedInText:!!l.allowedInText,allowedInMath:l.allowedInMath===undefined?true:l.allowedInMath,numOptionalArgs:l.numOptionalArgs||0,infix:!!l.infix,handler:o};for(var c=0;c<r.length;++c){i[r[c]]=f}if(t){if(u){a.groupTypes[t]=u}if(s){n.groupTypes[t]=s}}}var o=r.ordargument=function e(t){if(t.type==="ordgroup"){return t.value}else{return[t]}}},{"./buildHTML":92,"./buildMathML":93}],97:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./ParseError");var n=g(a);var i=e("./Style");var l=g(i);var o=e("./domTree");var u=g(o);var s=e("./buildCommon");var f=g(s);var c=e("./fontMetrics");var d=g(c);var v=e("./symbols");var h=g(v);var p=e("./utils");var m=g(p);function g(e){return e&&e.__esModule?e:{default:e}}var b=function e(t,r){if(h.default.math[t]&&h.default.math[t].replace){return d.default.getCharacterMetrics(h.default.math[t].replace,r)}else{return d.default.getCharacterMetrics(t,r)}};var y=function e(t,r,a,n){var i=a.havingBaseStyle(r);var l=f.default.makeSpan((n||[]).concat(i.sizingClasses(a)),[t],a);l.delimSizeMultiplier=i.sizeMultiplier/a.sizeMultiplier;l.height*=l.delimSizeMultiplier;l.depth*=l.delimSizeMultiplier;l.maxFontSize=i.sizeMultiplier;return l};var x=function e(t,r,a){var n=r.havingBaseStyle(a);var i=(1-r.sizeMultiplier/n.sizeMultiplier)*r.fontMetrics().axisHeight;t.classes.push("delimcenter");t.style.top=i+"em";t.height-=i;t.depth+=i};var w=function e(t,r,a,n,i,l){var o=f.default.makeSymbol(t,"Main-Regular",i,n);var u=y(o,r,n,l);if(a){x(u,n,r)}return u};var k=function e(t,r,a,n){return f.default.makeSymbol(t,"Size"+r+"-Regular",a,n)};var M=function e(t,r,a,n,i,o){var u=k(t,r,i,n);var s=y(f.default.makeSpan(["delimsizing","size"+r],[u],n),l.default.TEXT,n,o);if(a){x(s,n,l.default.TEXT)}return s};var _=function e(t,r,a){var n=void 0;if(r==="Size1-Regular"){n="delim-size1"}else if(r==="Size4-Regular"){n="delim-size4"}var i=f.default.makeSpan(["delimsizinginner",n],[f.default.makeSpan([],[f.default.makeSymbol(t,r,a)])]);return{type:"elem",elem:i}};var z=function e(t,r,a,n,i,o){var u=void 0;var s=void 0;var c=void 0;var d=void 0;u=c=d=t;s=null;var v="Size1-Regular";if(t==="\\uparrow"){c=d="\u23d0"}else if(t==="\\Uparrow"){c=d="\u2016"}else if(t==="\\downarrow"){u=c="\u23d0"}else if(t==="\\Downarrow"){u=c="\u2016"}else if(t==="\\updownarrow"){u="\\uparrow";c="\u23d0";d="\\downarrow"}else if(t==="\\Updownarrow"){u="\\Uparrow";c="\u2016";d="\\Downarrow"}else if(t==="["||t==="\\lbrack"){u="\u23a1";c="\u23a2";d="\u23a3";v="Size4-Regular"}else if(t==="]"||t==="\\rbrack"){u="\u23a4";c="\u23a5";d="\u23a6";v="Size4-Regular"}else if(t==="\\lfloor"){c=u="\u23a2";d="\u23a3";v="Size4-Regular"}else if(t==="\\lceil"){u="\u23a1";c=d="\u23a2";v="Size4-Regular"}else if(t==="\\rfloor"){c=u="\u23a5";d="\u23a6";v="Size4-Regular"}else if(t==="\\rceil"){u="\u23a4";c=d="\u23a5";v="Size4-Regular"}else if(t==="("){u="\u239b";c="\u239c";d="\u239d";v="Size4-Regular"}else if(t===")"){u="\u239e";c="\u239f";d="\u23a0";v="Size4-Regular"}else if(t==="\\{"||t==="\\lbrace"){u="\u23a7";s="\u23a8";d="\u23a9";c="\u23aa";v="Size4-Regular"}else if(t==="\\}"||t==="\\rbrace"){u="\u23ab";s="\u23ac";d="\u23ad";c="\u23aa";v="Size4-Regular"}else if(t==="\\lgroup"){u="\u23a7";d="\u23a9";c="\u23aa";v="Size4-Regular"}else if(t==="\\rgroup"){u="\u23ab";d="\u23ad";c="\u23aa";v="Size4-Regular"}else if(t==="\\lmoustache"){u="\u23a7";d="\u23ad";c="\u23aa";v="Size4-Regular"}else if(t==="\\rmoustache"){u="\u23ab";d="\u23a9";c="\u23aa";v="Size4-Regular"}var h=b(u,v);var p=h.height+h.depth;var m=b(c,v);var g=m.height+m.depth;var x=b(d,v);var w=x.height+x.depth;var k=0;var M=1;if(s!==null){var z=b(s,v);k=z.height+z.depth;M=2}var S=p+w+k;var T=Math.ceil((r-S)/(M*g));var A=S+T*M*g;var C=n.fontMetrics().axisHeight;if(a){C*=n.sizeMultiplier}var N=A/2-C;var O=[];O.push(_(d,v,i));if(s===null){for(var j=0;j<T;j++){O.push(_(c,v,i))}}else{for(var E=0;E<T;E++){O.push(_(c,v,i))}O.push(_(s,v,i));for(var L=0;L<T;L++){O.push(_(c,v,i))}}O.push(_(u,v,i));var q=n.havingBaseStyle(l.default.TEXT);var P=f.default.makeVList(O,"bottom",N,q);return y(f.default.makeSpan(["delimsizing","mult"],[P],q),l.default.TEXT,n,o)};var S=function e(t,r,a,n){var i=void 0;if(t==="sqrtTall"){var l=a-54;i="M702 0H400000v40H742v"+l+"l-4 4-4 4c-.667.667\n-2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1h-12l-28-84c-16.667-52-96.667\n-294.333-240-727l-212 -643 -85 170c-4-3.333-8.333-7.667-13 -13l-13-13l77-155\n 77-156c66 199.333 139 419.667 219 661 l218 661zM702 0H400000v40H742z"}var o=new u.default.pathNode(t,i);var s=[["width","400em"],["height",r+"em"]];s.push(["viewBox","0 0 400000 "+a]);s.push(["preserveAspectRatio","xMinYMin slice"]);var c=new u.default.svgNode([o],s);return f.default.makeSpan(["hide-tail"],[c],n)};var T=function e(t,r,a){var n=void 0;var i=a.sizeMultiplier;var l=void 0;var o=void 0;if(r.type==="small"){o=1e3;var u=a.havingBaseStyle(r.style);i=u.sizeMultiplier/a.sizeMultiplier;l=1*i;n=S("sqrtMain",l,o,a);n.style.minWidth="0.853em";n.advanceWidth=.833*i}else if(r.type==="large"){o=1e3*O[r.size];l=O[r.size]/i;n=S("sqrtSize"+r.size,l,o,a);n.style.minWidth="1.02em";n.advanceWidth=1/i}else{l=t/i;o=Math.floor(1e3*t);n=S("sqrtTall",l,o,a);n.style.minWidth="0.742em";n.advanceWidth=1.056/i}n.height=l;n.style.height=l+"em";n.sizeMultiplier=i;return n};var A=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","\\surd"];var C=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache"];var N=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"];var O=[0,1.2,1.8,2.4,3];var j=function e(t,r,a,i,l){if(t==="<"||t==="\\lt"){t="\\langle"}else if(t===">"||t==="\\gt"){t="\\rangle"}if(m.default.contains(A,t)||m.default.contains(N,t)){return M(t,r,false,a,i,l)}else if(m.default.contains(C,t)){return z(t,O[r],false,a,i,l)}else{throw new n.default("Illegal delimiter: '"+t+"'")}};var E=[{type:"small",style:l.default.SCRIPTSCRIPT},{type:"small",style:l.default.SCRIPT},{type:"small",style:l.default.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}];var L=[{type:"small",style:l.default.SCRIPTSCRIPT},{type:"small",style:l.default.SCRIPT},{type:"small",style:l.default.TEXT},{type:"stack"}];var q=[{type:"small",style:l.default.SCRIPTSCRIPT},{type:"small",style:l.default.SCRIPT},{type:"small",style:l.default.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}];var P=function e(t){if(t.type==="small"){return"Main-Regular"}else if(t.type==="large"){return"Size"+t.size+"-Regular"}else if(t.type==="stack"){return"Size4-Regular"}};var R=function e(t,r,a,n){var i=Math.min(2,3-n.style.size);for(var l=i;l<a.length;l++){if(a[l].type==="stack"){break}var o=b(t,P(a[l]));var u=o.height+o.depth;if(a[l].type==="small"){var s=n.havingBaseStyle(a[l].style);u*=s.sizeMultiplier}if(u>r){return a[l]}}return a[a.length-1]};var B=function e(t,r,a,n,i,l){if(t==="<"||t==="\\lt"){t="\\langle"}else if(t===">"||t==="\\gt"){t="\\rangle"}var o=void 0;if(m.default.contains(N,t)){o=E}else if(m.default.contains(A,t)){o=q}else{o=L}var u=R(t,r,o,n);if(t==="\\surd"){return T(r,u,n)}else{if(u.type==="small"){return w(t,u.style,a,n,i,l)}else if(u.type==="large"){return M(t,u.size,a,n,i,l)}else if(u.type==="stack"){return z(t,r,a,n,i,l)}}};var F=function e(t,r,a,n,i,l){var o=n.fontMetrics().axisHeight*n.sizeMultiplier;var u=901;var s=5/n.fontMetrics().ptPerEm;var f=Math.max(r-o,a+o);var c=Math.max(f/500*u,2*f-s);return B(t,c,true,n,i,l)};r.default={sizedDelim:j,customSizedDelim:B,leftRightDelim:F}},{"./ParseError":84,"./Style":89,"./buildCommon":91,"./domTree":98,"./fontMetrics":101,"./symbols":112,"./utils":115}],98:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/slicedToArray");var n=h(a);var i=e("babel-runtime/helpers/classCallCheck");var l=h(i);var o=e("babel-runtime/helpers/createClass");var u=h(o);var s=e("./unicodeRegexes");var f=e("./utils");var c=h(f);var d=e("./svgGeometry");var v=h(d);function h(e){return e&&e.__esModule?e:{default:e}}var p=function e(t){t=t.slice();for(var r=t.length-1;r>=0;r--){if(!t[r]){t.splice(r,1)}}return t.join(" ")};var m=function(){function e(t,r,a){(0,l.default)(this,e);this.classes=t||[];this.children=r||[];this.height=0;this.depth=0;this.maxFontSize=0;this.style={};this.attributes={};if(a){if(a.style.isTight()){this.classes.push("mtight")}if(a.getColor()){this.style.color=a.getColor()}}}(0,u.default)(e,[{key:"setAttribute",value:function e(t,r){this.attributes[t]=r}},{key:"tryCombine",value:function e(t){return false}},{key:"toNode",value:function e(){var t=document.createElement("span");t.className=p(this.classes);for(var r in this.style){if(Object.prototype.hasOwnProperty.call(this.style,r)){t.style[r]=this.style[r]}}for(var a in this.attributes){
if(Object.prototype.hasOwnProperty.call(this.attributes,a)){t.setAttribute(a,this.attributes[a])}}for(var n=0;n<this.children.length;n++){t.appendChild(this.children[n].toNode())}return t}},{key:"toMarkup",value:function e(){var t="<span";if(this.classes.length){t+=' class="';t+=c.default.escape(p(this.classes));t+='"'}var r="";for(var a in this.style){if(this.style.hasOwnProperty(a)){r+=c.default.hyphenate(a)+":"+this.style[a]+";"}}if(r){t+=' style="'+c.default.escape(r)+'"'}for(var n in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,n)){t+=" "+n+'="';t+=c.default.escape(this.attributes[n]);t+='"'}}t+=">";for(var i=0;i<this.children.length;i++){t+=this.children[i].toMarkup()}t+="</span>";return t}}]);return e}();var g=function(){function e(t){(0,l.default)(this,e);this.children=t||[];this.height=0;this.depth=0;this.maxFontSize=0}(0,u.default)(e,[{key:"toNode",value:function e(){var t=document.createDocumentFragment();for(var r=0;r<this.children.length;r++){t.appendChild(this.children[r].toNode())}return t}},{key:"toMarkup",value:function e(){var t="";for(var r=0;r<this.children.length;r++){t+=this.children[r].toMarkup()}return t}}]);return e}();var b={"\xee":"\u0131\u0302","\xef":"\u0131\u0308","\xed":"\u0131\u0301","\xec":"\u0131\u0300"};var y=function(){function e(t,r,a,n,i,o,u){(0,l.default)(this,e);this.value=t||"";this.height=r||0;this.depth=a||0;this.italic=n||0;this.skew=i||0;this.classes=o||[];this.style=u||{};this.maxFontSize=0;if(s.cjkRegex.test(t)){if(s.hangulRegex.test(t)){this.classes.push("hangul_fallback")}else{this.classes.push("cjk_fallback")}}if(/[\xee\xef\xed\xec]/.test(this.value)){this.value=b[this.value]}}(0,u.default)(e,[{key:"tryCombine",value:function t(r){if(!r||!(r instanceof e)||this.italic>0||p(this.classes)!==p(r.classes)||this.skew!==r.skew||this.maxFontSize!==r.maxFontSize){return false}for(var a in this.style){if(this.style.hasOwnProperty(a)&&this.style[a]!==r.style[a]){return false}}for(var n in r.style){if(r.style.hasOwnProperty(n)&&this.style[n]!==r.style[n]){return false}}this.value+=r.value;this.height=Math.max(this.height,r.height);this.depth=Math.max(this.depth,r.depth);this.italic=r.italic;return true}},{key:"toNode",value:function e(){var t=document.createTextNode(this.value);var r=null;if(this.italic>0){r=document.createElement("span");r.style.marginRight=this.italic+"em"}if(this.classes.length>0){r=r||document.createElement("span");r.className=p(this.classes)}for(var a in this.style){if(this.style.hasOwnProperty(a)){r=r||document.createElement("span");r.style[a]=this.style[a]}}if(r){r.appendChild(t);return r}else{return t}}},{key:"toMarkup",value:function e(){var t=false;var r="<span";if(this.classes.length){t=true;r+=' class="';r+=c.default.escape(p(this.classes));r+='"'}var a="";if(this.italic>0){a+="margin-right:"+this.italic+"em;"}for(var n in this.style){if(this.style.hasOwnProperty(n)){a+=c.default.hyphenate(n)+":"+this.style[n]+";"}}if(a){t=true;r+=' style="'+c.default.escape(a)+'"'}var i=c.default.escape(this.value);if(t){r+=">";r+=i;r+="</span>";return r}else{return i}}}]);return e}();var x=function(){function e(t,r){(0,l.default)(this,e);this.children=t||[];this.attributes=r||[]}(0,u.default)(e,[{key:"toNode",value:function e(){var t="http://www.w3.org/2000/svg";var r=document.createElementNS(t,"svg");for(var a=0;a<this.attributes.length;a++){var i=(0,n.default)(this.attributes[a],2),l=i[0],o=i[1];r.setAttribute(l,o)}for(var u=0;u<this.children.length;u++){r.appendChild(this.children[u].toNode())}return r}},{key:"toMarkup",value:function e(){var t="<svg";for(var r=0;r<this.attributes.length;r++){var a=(0,n.default)(this.attributes[r],2),i=a[0],l=a[1];t+=" "+i+"='"+l+"'"}t+=">";for(var o=0;o<this.children.length;o++){t+=this.children[o].toMarkup()}t+="</svg>";return t}}]);return e}();var w=function(){function e(t,r){(0,l.default)(this,e);this.pathName=t;this.alternate=r}(0,u.default)(e,[{key:"toNode",value:function e(){var t="http://www.w3.org/2000/svg";var r=document.createElementNS(t,"path");if(this.pathName!=="sqrtTall"){r.setAttribute("d",v.default.path[this.pathName])}else{r.setAttribute("d",this.alternate)}return r}},{key:"toMarkup",value:function e(){if(this.pathName!=="sqrtTall"){return"<path d='"+v.default.path[this.pathName]+"'/>"}else{return"<path d='"+this.alternate+"'/>"}}}]);return e}();var k=function(){function e(t){(0,l.default)(this,e);this.attributes=t||[]}(0,u.default)(e,[{key:"toNode",value:function e(){var t="http://www.w3.org/2000/svg";var r=document.createElementNS(t,"line");for(var a=0;a<this.attributes.length;a++){var i=(0,n.default)(this.attributes[a],2),l=i[0],o=i[1];r.setAttribute(l,o)}return r}},{key:"toMarkup",value:function e(){var t="<line";for(var r=0;r<this.attributes.length;r++){var a=(0,n.default)(this.attributes[r],2),i=a[0],l=a[1];t+=" "+i+"='"+l+"'"}t+="/>";return t}}]);return e}();r.default={span:m,documentFragment:g,symbolNode:y,svgNode:x,pathNode:w,lineNode:k}},{"./svgGeometry":111,"./unicodeRegexes":113,"./utils":115,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9,"babel-runtime/helpers/slicedToArray":10}],99:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./defineEnvironment");e("./environments/array.js");var n={has:function e(t){return a._environments.hasOwnProperty(t)},get:function e(t){return a._environments[t]}};r.default=n},{"./defineEnvironment":95,"./environments/array.js":100}],100:[function(e,t,r){"use strict";var a=e("../buildCommon");var n=w(a);var i=e("../defineEnvironment");var l=w(i);var o=e("../mathMLTree");var u=w(o);var s=e("../ParseError");var f=w(s);var c=e("../ParseNode");var d=w(c);var v=e("../units");var h=e("../utils");var p=w(h);var m=e("../buildHTML");var g=x(m);var b=e("../buildMathML");var y=x(b);function x(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]}}t.default=e;return t}}function w(e){return e&&e.__esModule?e:{default:e}}function k(e,t,r){var a=[];var n=[a];var i=[];while(true){var l=e.parseExpression(false,null);l=new d.default("ordgroup",l,e.mode);if(r){l=new d.default("styling",{style:r,value:[l]},e.mode)}a.push(l);var o=e.nextToken.text;if(o==="&"){e.consume()}else if(o==="\\end"){var u=n[n.length-1][0].value;if(n.length>1&&u.value.length===1&&u.value[0].value.length===0){n.pop()}break}else if(o==="\\\\"||o==="\\cr"){var s=e.parseFunction();i.push(s.value.size);a=[];n.push(a)}else{throw new f.default("Expected & or \\\\ or \\end",e.nextToken)}}t.body=n;t.rowGaps=i;return new d.default(t.type,t,e.mode)}function M(e){if(e.substr(0,1)==="d"){return"display"}else{return"text"}}var _=function e(t,r){var a=void 0;var i=void 0;var l=t.value.body.length;var o=0;var u=new Array(l);var s=1/r.fontMetrics().ptPerEm;var c=5*s;var d=12*s;var h=3*s;var m=p.default.deflt(t.value.arraystretch,1);var b=m*d;var y=.7*b;var x=.3*b;var w=0;for(a=0;a<t.value.body.length;++a){var k=t.value.body[a];var M=y;var _=x;if(o<k.length){o=k.length}var z=new Array(k.length);for(i=0;i<k.length;++i){var S=g.buildGroup(k[i],r);if(_<S.depth){_=S.depth}if(M<S.height){M=S.height}z[i]=S}var T=0;if(t.value.rowGaps[a]){T=(0,v.calculateSize)(t.value.rowGaps[a].value,r);if(T>0){T+=x;if(_<T){_=T}T=0}}if(t.value.addJot){_+=h}z.height=M;z.depth=_;w+=M;z.pos=w;w+=_+T;u[a]=z}var A=w/2+r.fontMetrics().axisHeight;var C=t.value.cols||[];var N=[];var O=void 0;var j=void 0;for(i=0,j=0;i<o||j<C.length;++i,++j){var E=C[j]||{};var L=true;while(E.type==="separator"){if(!L){O=n.default.makeSpan(["arraycolsep"],[]);O.style.width=r.fontMetrics().doubleRuleSep+"em";N.push(O)}if(E.separator==="|"){var q=n.default.makeSpan(["vertical-separator"],[]);q.style.height=w+"em";q.style.verticalAlign=-(w-A)+"em";N.push(q)}else{throw new f.default("Invalid separator type: "+E.separator)}j++;E=C[j]||{};L=false}if(i>=o){continue}var P=void 0;if(i>0||t.value.hskipBeforeAndAfter){P=p.default.deflt(E.pregap,c);if(P!==0){O=n.default.makeSpan(["arraycolsep"],[]);O.style.width=P+"em";N.push(O)}}var R=[];for(a=0;a<l;++a){var B=u[a];var F=B[i];if(!F){continue}var H=B.pos-A;F.depth=B.depth;F.height=B.height;R.push({type:"elem",elem:F,shift:H})}R=n.default.makeVList(R,"individualShift",null,r);R=n.default.makeSpan(["col-align-"+(E.align||"c")],[R]);N.push(R);if(i<o-1||t.value.hskipBeforeAndAfter){P=p.default.deflt(E.postgap,c);if(P!==0){O=n.default.makeSpan(["arraycolsep"],[]);O.style.width=P+"em";N.push(O)}}}u=n.default.makeSpan(["mtable"],N);return n.default.makeSpan(["mord"],[u],r)};var z=function e(t,r){return new u.default.MathNode("mtable",t.value.body.map(function(e){return new u.default.MathNode("mtr",e.map(function(e){return new u.default.MathNode("mtd",[y.buildGroup(e,r)])}))}))};(0,l.default)({type:"array",names:["array","darray"],props:{numArgs:1},handler:function e(t,r){var a=r[0];a=a.value.map?a.value:[a];var n=a.map(function(e){var t=e.value;if("lcr".indexOf(t)!==-1){return{type:"align",align:t}}else if(t==="|"){return{type:"separator",separator:"|"}}throw new f.default("Unknown column alignment: "+e.value,e)});var i={type:"array",cols:n,hskipBeforeAndAfter:true};i=k(t.parser,i,M(t.envName));return i},htmlBuilder:_,mathmlBuilder:z});(0,l.default)({type:"array",names:["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix"],props:{numArgs:0},handler:function e(t){var r={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[t.envName];var a={type:"array",hskipBeforeAndAfter:false};a=k(t.parser,a,M(t.envName));if(r){a=new d.default("leftright",{body:[a],left:r[0],right:r[1]},t.mode)}return a},htmlBuilder:_,mathmlBuilder:z});(0,l.default)({type:"array",names:["cases","dcases"],props:{numArgs:0},handler:function e(t){var r={type:"array",arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:1},{type:"align",align:"l",pregap:0,postgap:0}]};r=k(t.parser,r,M(t.envName));r=new d.default("leftright",{body:[r],left:"\\{",right:"."},t.mode);return r},htmlBuilder:_,mathmlBuilder:z});(0,l.default)({type:"array",names:["aligned"],props:{numArgs:0},handler:function e(t){var r={type:"array",cols:[],addJot:true};r=k(t.parser,r,"display");var a=new d.default("ordgroup",[],t.mode);var n=0;r.value.body.forEach(function(e){for(var t=1;t<e.length;t+=2){var r=e[t].value.value[0];r.value.unshift(a)}if(n<e.length){n=e.length}});for(var i=0;i<n;++i){var l="r";var o=0;if(i%2===1){l="l"}else if(i>0){o=2}r.value.cols[i]={type:"align",align:l,pregap:o,postgap:0}}return r},htmlBuilder:_,mathmlBuilder:z});(0,l.default)({type:"array",names:["gathered"],props:{numArgs:0},handler:function e(t){var r={type:"array",cols:[{type:"align",align:"c"}],addJot:true};r=k(t.parser,r,"display");return r},htmlBuilder:_,mathmlBuilder:z})},{"../ParseError":84,"../ParseNode":85,"../buildCommon":91,"../buildHTML":92,"../buildMathML":93,"../defineEnvironment":95,"../mathMLTree":108,"../units":114,"../utils":115}],101:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./unicodeRegexes");var n=e("./fontMetricsData");var i=l(n);function l(e){return e&&e.__esModule?e:{default:e}}var o={slant:[.25,.25,.25],space:[0,0,0],stretch:[0,0,0],shrink:[0,0,0],xHeight:[.431,.431,.431],quad:[1,1.171,1.472],extraSpace:[0,0,0],num1:[.677,.732,.925],num2:[.394,.384,.387],num3:[.444,.471,.504],denom1:[.686,.752,1.025],denom2:[.345,.344,.532],sup1:[.413,.503,.504],sup2:[.363,.431,.404],sup3:[.289,.286,.294],sub1:[.15,.143,.2],sub2:[.247,.286,.4],supDrop:[.386,.353,.494],subDrop:[.05,.071,.1],delim1:[2.39,1.7,1.98],delim2:[1.01,1.157,1.42],axisHeight:[.25,.25,.25],defaultRuleThickness:[.04,.049,.049],bigOpSpacing1:[.111,.111,.111],bigOpSpacing2:[.166,.166,.166],bigOpSpacing3:[.2,.2,.2],bigOpSpacing4:[.6,.611,.611],bigOpSpacing5:[.1,.143,.143],sqrtRuleThickness:[.04,.04,.04],ptPerEm:[10,10,10],doubleRuleSep:[.2,.2,.2]};var u={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xc6":"A","\xc7":"C","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xd0":"D","\xd1":"N","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xdd":"Y","\xde":"o","\xdf":"B","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xe6":"a","\xe7":"c","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xf0":"d","\xf1":"n","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xfd":"y","\xfe":"o","\xff":"y","\u0410":"A","\u0411":"B","\u0412":"B","\u0413":"F","\u0414":"A","\u0415":"E","\u0416":"K","\u0417":"3","\u0418":"N","\u0419":"N","\u041a":"K","\u041b":"N","\u041c":"M","\u041d":"H","\u041e":"O","\u041f":"N","\u0420":"P","\u0421":"C","\u0422":"T","\u0423":"y","\u0424":"O","\u0425":"X","\u0426":"U","\u0427":"h","\u0428":"W","\u0429":"W","\u042a":"B","\u042b":"X","\u042c":"B","\u042d":"3","\u042e":"X","\u042f":"R","\u0430":"a","\u0431":"b","\u0432":"a","\u0433":"r","\u0434":"y","\u0435":"e","\u0436":"m","\u0437":"e","\u0438":"n","\u0439":"n","\u043a":"n","\u043b":"n","\u043c":"m","\u043d":"n","\u043e":"o","\u043f":"n","\u0440":"p","\u0441":"c","\u0442":"o","\u0443":"y","\u0444":"b","\u0445":"x","\u0446":"n","\u0447":"n","\u0448":"w","\u0449":"w","\u044a":"a","\u044b":"m","\u044c":"a","\u044d":"e","\u044e":"m","\u044f":"r"};var s=function e(t,r){var n=t.charCodeAt(0);if(t[0]in u){n=u[t[0]].charCodeAt(0)}else if(a.cjkRegex.test(t[0])){n="M".charCodeAt(0)}var l=i.default[r][""+n];if(l){return{depth:l[0],height:l[1],italic:l[2],skew:l[3],width:l[4]}}};var f={};var c=function e(t){var r=void 0;if(t>=5){r=0}else if(t>=3){r=1}else{r=2}if(!f[r]){var a=f[r]={cssEmPerMu:o.quad[r]/18};for(var n in o){if(o.hasOwnProperty(n)){a[n]=o[n][r]}}}return f[r]};r.default={getFontMetrics:c,getCharacterMetrics:s}},{"./fontMetricsData":102,"./unicodeRegexes":113}],102:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a={"AMS-Regular":{65:[0,.68889,0,0],66:[0,.68889,0,0],67:[0,.68889,0,0],68:[0,.68889,0,0],69:[0,.68889,0,0],70:[0,.68889,0,0],71:[0,.68889,0,0],72:[0,.68889,0,0],73:[0,.68889,0,0],74:[.16667,.68889,0,0],75:[0,.68889,0,0],76:[0,.68889,0,0],77:[0,.68889,0,0],78:[0,.68889,0,0],79:[.16667,.68889,0,0],80:[0,.68889,0,0],81:[.16667,.68889,0,0],82:[0,.68889,0,0],83:[0,.68889,0,0],84:[0,.68889,0,0],85:[0,.68889,0,0],86:[0,.68889,0,0],87:[0,.68889,0,0],88:[0,.68889,0,0],89:[0,.68889,0,0],90:[0,.68889,0,0],107:[0,.68889,0,0],165:[0,.675,.025,0],174:[.15559,.69224,0,0],240:[0,.68889,0,0],295:[0,.68889,0,0],710:[0,.825,0,0],732:[0,.9,0,0],770:[0,.825,0,0],771:[0,.9,0,0],989:[.08167,.58167,0,0],1008:[0,.43056,.04028,0],8245:[0,.54986,0,0],8463:[0,.68889,0,0],8487:[0,.68889,0,0],8498:[0,.68889,0,0],8502:[0,.68889,0,0],8503:[0,.68889,0,0],8504:[0,.68889,0,0],8513:[0,.68889,0,0],8592:[-.03598,.46402,0,0],8594:[-.03598,.46402,0,0],8602:[-.13313,.36687,0,0],8603:[-.13313,.36687,0,0],8606:[.01354,.52239,0,0],8608:[.01354,.52239,0,0],8610:[.01354,.52239,0,0],8611:[.01354,.52239,0,0],8619:[0,.54986,0,0],8620:[0,.54986,0,0],8621:[-.13313,.37788,0,0],8622:[-.13313,.36687,0,0],8624:[0,.69224,0,0],8625:[0,.69224,0,0],8630:[0,.43056,0,0],8631:[0,.43056,0,0],8634:[.08198,.58198,0,0],8635:[.08198,.58198,0,0],8638:[.19444,.69224,0,0],8639:[.19444,.69224,0,0],8642:[.19444,.69224,0,0],8643:[.19444,.69224,0,0],8644:[.1808,.675,0,0],8646:[.1808,.675,0,0],8647:[.1808,.675,0,0],8648:[.19444,.69224,0,0],8649:[.1808,.675,0,0],8650:[.19444,.69224,0,0],8651:[.01354,.52239,0,0],8652:[.01354,.52239,0,0],8653:[-.13313,.36687,0,0],8654:[-.13313,.36687,0,0],8655:[-.13313,.36687,0,0],8666:[.13667,.63667,0,0],8667:[.13667,.63667,0,0],8669:[-.13313,.37788,0,0],8672:[-.064,.437,0,0],8674:[-.064,.437,0,0],8705:[0,.825,0,0],8708:[0,.68889,0,0],8709:[.08167,.58167,0,0],8717:[0,.43056,0,0],8722:[-.03598,.46402,0,0],8724:[.08198,.69224,0,0],8726:[.08167,.58167,0,0],8733:[0,.69224,0,0],8736:[0,.69224,0,0],8737:[0,.69224,0,0],8738:[.03517,.52239,0,0],8739:[.08167,.58167,0,0],8740:[.25142,.74111,0,0],8741:[.08167,.58167,0,0],8742:[.25142,.74111,0,0],8756:[0,.69224,0,0],8757:[0,.69224,0,0],8764:[-.13313,.36687,0,0],8765:[-.13313,.37788,0,0],8769:[-.13313,.36687,0,0],8770:[-.03625,.46375,0,0],8774:[.30274,.79383,0,0],8776:[-.01688,.48312,0,0],8778:[.08167,.58167,0,0],8782:[.06062,.54986,0,0],8783:[.06062,.54986,0,0],8785:[.08198,.58198,0,0],8786:[.08198,.58198,0,0],8787:[.08198,.58198,0,0],8790:[0,.69224,0,0],8791:[.22958,.72958,0,0],8796:[.08198,.91667,0,0],8806:[.25583,.75583,0,0],8807:[.25583,.75583,0,0],8808:[.25142,.75726,0,0],8809:[.25142,.75726,0,0],8812:[.25583,.75583,0,0],8814:[.20576,.70576,0,0],8815:[.20576,.70576,0,0],8816:[.30274,.79383,0,0],8817:[.30274,.79383,0,0],8818:[.22958,.72958,0,0],8819:[.22958,.72958,0,0],8822:[.1808,.675,0,0],8823:[.1808,.675,0,0],8828:[.13667,.63667,0,0],8829:[.13667,.63667,0,0],8830:[.22958,.72958,0,0],8831:[.22958,.72958,0,0],8832:[.20576,.70576,0,0],8833:[.20576,.70576,0,0],8840:[.30274,.79383,0,0],8841:[.30274,.79383,0,0],8842:[.13597,.63597,0,0],8843:[.13597,.63597,0,0],8847:[.03517,.54986,0,0],8848:[.03517,.54986,0,0],8858:[.08198,.58198,0,0],8859:[.08198,.58198,0,0],8861:[.08198,.58198,0,0],8862:[0,.675,0,0],8863:[0,.675,0,0],8864:[0,.675,0,0],8865:[0,.675,0,0],8872:[0,.69224,0,0],8873:[0,.69224,0,0],8874:[0,.69224,0,0],8876:[0,.68889,0,0],8877:[0,.68889,0,0],8878:[0,.68889,0,0],8879:[0,.68889,0,0],8882:[.03517,.54986,0,0],8883:[.03517,.54986,0,0],8884:[.13667,.63667,0,0],8885:[.13667,.63667,0,0],8888:[0,.54986,0,0],8890:[.19444,.43056,0,0],8891:[.19444,.69224,0,0],8892:[.19444,.69224,0,0],8901:[0,.54986,0,0],8903:[.08167,.58167,0,0],8905:[.08167,.58167,0,0],8906:[.08167,.58167,0,0],8907:[0,.69224,0,0],8908:[0,.69224,0,0],8909:[-.03598,.46402,0,0],8910:[0,.54986,0,0],8911:[0,.54986,0,0],8912:[.03517,.54986,0,0],8913:[.03517,.54986,0,0],8914:[0,.54986,0,0],8915:[0,.54986,0,0],8916:[0,.69224,0,0],8918:[.0391,.5391,0,0],8919:[.0391,.5391,0,0],8920:[.03517,.54986,0,0],8921:[.03517,.54986,0,0],8922:[.38569,.88569,0,0],8923:[.38569,.88569,0,0],8926:[.13667,.63667,0,0],8927:[.13667,.63667,0,0],8928:[.30274,.79383,0,0],8929:[.30274,.79383,0,0],8934:[.23222,.74111,0,0],8935:[.23222,.74111,0,0],8936:[.23222,.74111,0,0],8937:[.23222,.74111,0,0],8938:[.20576,.70576,0,0],8939:[.20576,.70576,0,0],8940:[.30274,.79383,0,0],8941:[.30274,.79383,0,0],8994:[.19444,.69224,0,0],8995:[.19444,.69224,0,0],9416:[.15559,.69224,0,0],9484:[0,.69224,0,0],9488:[0,.69224,0,0],9492:[0,.37788,0,0],9496:[0,.37788,0,0],9585:[.19444,.68889,0,0],9586:[.19444,.74111,0,0],9632:[0,.675,0,0],9633:[0,.675,0,0],9650:[0,.54986,0,0],9651:[0,.54986,0,0],9654:[.03517,.54986,0,0],9660:[0,.54986,0,0],9661:[0,.54986,0,0],9664:[.03517,.54986,0,0],9674:[.11111,.69224,0,0],9733:[.19444,.69224,0,0],10003:[0,.69224,0,0],10016:[0,.69224,0,0],10731:[.11111,.69224,0,0],10846:[.19444,.75583,0,0],10877:[.13667,.63667,0,0],10878:[.13667,.63667,0,0],10885:[.25583,.75583,0,0],10886:[.25583,.75583,0,0],10887:[.13597,.63597,0,0],10888:[.13597,.63597,0,0],10889:[.26167,.75726,0,0],10890:[.26167,.75726,0,0],10891:[.48256,.98256,0,0],10892:[.48256,.98256,0,0],10901:[.13667,.63667,0,0],10902:[.13667,.63667,0,0],10933:[.25142,.75726,0,0],10934:[.25142,.75726,0,0],10935:[.26167,.75726,0,0],10936:[.26167,.75726,0,0],10937:[.26167,.75726,0,0],10938:[.26167,.75726,0,0],10949:[.25583,.75583,0,0],10950:[.25583,.75583,0,0],10955:[.28481,.79383,0,0],10956:[.28481,.79383,0,0],57350:[.08167,.58167,0,0],57351:[.08167,.58167,0,0],57352:[.08167,.58167,0,0],57353:[0,.43056,.04028,0],57356:[.25142,.75726,0,0],57357:[.25142,.75726,0,0],57358:[.41951,.91951,0,0],57359:[.30274,.79383,0,0],57360:[.30274,.79383,0,0],57361:[.41951,.91951,0,0],57366:[.25142,.75726,0,0],57367:[.25142,.75726,0,0],57368:[.25142,.75726,0,0],57369:[.25142,.75726,0,0],57370:[.13597,.63597,0,0],57371:[.13597,.63597,0,0]},"Caligraphic-Regular":{48:[0,.43056,0,0],49:[0,.43056,0,0],50:[0,.43056,0,0],51:[.19444,.43056,0,0],52:[.19444,.43056,0,0],53:[.19444,.43056,0,0],54:[0,.64444,0,0],55:[.19444,.43056,0,0],56:[0,.64444,0,0],57:[.19444,.43056,0,0],65:[0,.68333,0,.19445],66:[0,.68333,.03041,.13889],67:[0,.68333,.05834,.13889],68:[0,.68333,.02778,.08334],69:[0,.68333,.08944,.11111],70:[0,.68333,.09931,.11111],71:[.09722,.68333,.0593,.11111],72:[0,.68333,.00965,.11111],73:[0,.68333,.07382,0],74:[.09722,.68333,.18472,.16667],75:[0,.68333,.01445,.05556],76:[0,.68333,0,.13889],77:[0,.68333,0,.13889],78:[0,.68333,.14736,.08334],79:[0,.68333,.02778,.11111],80:[0,.68333,.08222,.08334],81:[.09722,.68333,0,.11111],82:[0,.68333,0,.08334],83:[0,.68333,.075,.13889],84:[0,.68333,.25417,0],85:[0,.68333,.09931,.08334],86:[0,.68333,.08222,0],87:[0,.68333,.08222,.08334],88:[0,.68333,.14643,.13889],89:[.09722,.68333,.08222,.08334],90:[0,.68333,.07944,.13889]},"Fraktur-Regular":{33:[0,.69141,0,0],34:[0,.69141,0,0],38:[0,.69141,0,0],39:[0,.69141,0,0],40:[.24982,.74947,0,0],41:[.24982,.74947,0,0],42:[0,.62119,0,0],43:[.08319,.58283,0,0],44:[0,.10803,0,0],45:[.08319,.58283,0,0],46:[0,.10803,0,0],47:[.24982,.74947,0,0],48:[0,.47534,0,0],49:[0,.47534,0,0],50:[0,.47534,0,0],51:[.18906,.47534,0,0],52:[.18906,.47534,0,0],53:[.18906,.47534,0,0],54:[0,.69141,0,0],55:[.18906,.47534,0,0],56:[0,.69141,0,0],57:[.18906,.47534,0,0],58:[0,.47534,0,0],59:[.12604,.47534,0,0],61:[-.13099,.36866,0,0],63:[0,.69141,0,0],65:[0,.69141,0,0],66:[0,.69141,0,0],67:[0,.69141,0,0],68:[0,.69141,0,0],69:[0,.69141,0,0],70:[.12604,.69141,0,0],71:[0,.69141,0,0],72:[.06302,.69141,0,0],73:[0,.69141,0,0],74:[.12604,.69141,0,0],75:[0,.69141,0,0],76:[0,.69141,0,0],77:[0,.69141,0,0],78:[0,.69141,0,0],79:[0,.69141,0,0],80:[.18906,.69141,0,0],81:[.03781,.69141,0,0],82:[0,.69141,0,0],83:[0,.69141,0,0],84:[0,.69141,0,0],85:[0,.69141,0,0],86:[0,.69141,0,0],87:[0,.69141,0,0],88:[0,.69141,0,0],89:[.18906,.69141,0,0],90:[.12604,.69141,0,0],91:[.24982,.74947,0,0],93:[.24982,.74947,0,0],94:[0,.69141,0,0],97:[0,.47534,0,0],98:[0,.69141,0,0],99:[0,.47534,0,0],100:[0,.62119,0,0],101:[0,.47534,0,0],102:[.18906,.69141,0,0],103:[.18906,.47534,0,0],104:[.18906,.69141,0,0],105:[0,.69141,0,0],106:[0,.69141,0,0],107:[0,.69141,0,0],108:[0,.69141,0,0],109:[0,.47534,0,0],110:[0,.47534,0,0],111:[0,.47534,0,0],112:[.18906,.52396,0,0],113:[.18906,.47534,0,0],114:[0,.47534,0,0],115:[0,.47534,0,0],116:[0,.62119,0,0],117:[0,.47534,0,0],118:[0,.52396,0,0],119:[0,.52396,0,0],120:[.18906,.47534,0,0],121:[.18906,.47534,0,0],122:[.18906,.47534,0,0],8216:[0,.69141,0,0],8217:[0,.69141,0,0],58112:[0,.62119,0,0],58113:[0,.62119,0,0],58114:[.18906,.69141,0,0],58115:[.18906,.69141,0,0],58116:[.18906,.47534,0,0],58117:[0,.69141,0,0],58118:[0,.62119,0,0],58119:[0,.47534,0,0]},"Main-Bold":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.13333,.63333,0,0],44:[.19444,.15556,0,0],45:[0,.44444,0,0],46:[0,.15556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.44444,0,0],59:[.19444,.44444,0,0],60:[.08556,.58556,0,0],61:[-.10889,.39111,0,0],62:[.08556,.58556,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,0,0],67:[0,.68611,0,0],68:[0,.68611,0,0],69:[0,.68611,0,0],70:[0,.68611,0,0],71:[0,.68611,0,0],72:[0,.68611,0,0],73:[0,.68611,0,0],74:[0,.68611,0,0],75:[0,.68611,0,0],76:[0,.68611,0,0],77:[0,.68611,0,0],78:[0,.68611,0,0],79:[0,.68611,0,0],80:[0,.68611,0,0],81:[.19444,.68611,0,0],82:[0,.68611,0,0],83:[0,.68611,0,0],84:[0,.68611,0,0],85:[0,.68611,0,0],86:[0,.68611,.01597,0],87:[0,.68611,.01597,0],88:[0,.68611,0,0],89:[0,.68611,.02875,0],90:[0,.68611,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.13444,.03194,0],96:[0,.69444,0,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.10903,0],103:[.19444,.44444,.01597,0],104:[0,.69444,0,0],105:[0,.69444,0,0],106:[.19444,.69444,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,0,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.01597,0],119:[0,.44444,.01597,0],120:[0,.44444,0,0],121:[.19444,.44444,.01597,0],122:[0,.44444,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.34444,0,0],168:[0,.69444,0,0],172:[0,.44444,0,0],175:[0,.59611,0,0],176:[0,.69444,0,0],177:[.13333,.63333,0,0],180:[0,.69444,0,0],215:[.13333,.63333,0,0],247:[.13333,.63333,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],710:[0,.69444,0,0],711:[0,.63194,0,0],713:[0,.59611,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.69444,0,0],730:[0,.69444,0,0],732:[0,.69444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.69444,0,0],772:[0,.59611,0,0],774:[0,.69444,0,0],775:[0,.69444,0,0],776:[0,.69444,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],824:[.19444,.69444,0,0],915:[0,.68611,0,0],916:[0,.68611,0,0],920:[0,.68611,0,0],923:[0,.68611,0,0],926:[0,.68611,0,0],928:[0,.68611,0,0],931:[0,.68611,0,0],933:[0,.68611,0,0],934:[0,.68611,0,0],936:[0,.68611,0,0],937:[0,.68611,0,0],8211:[0,.44444,.03194,0],8212:[0,.44444,.03194,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8242:[0,.55556,0,0],8407:[0,.72444,.15486,0],8463:[0,.69444,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,0],8472:[.19444,.44444,0,0],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.10889,.39111,0,0],8593:[.19444,.69444,0,0],8594:[-.10889,.39111,0,0],8595:[.19444,.69444,0,0],8596:[-.10889,.39111,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8636:[-.10889,.39111,0,0],8637:[-.10889,.39111,0,0],8640:[-.10889,.39111,0,0],8641:[-.10889,.39111,0,0],8656:[-.10889,.39111,0,0],8657:[.19444,.69444,0,0],8658:[-.10889,.39111,0,0],8659:[.19444,.69444,0,0],8660:[-.10889,.39111,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.06389,0],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68611,0,0],8712:[.08556,.58556,0,0],8715:[.08556,.58556,0,0],8722:[.13333,.63333,0,0],8723:[.13333,.63333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.02778,.47222,0,0],8728:[-.02639,.47361,0,0],8729:[-.02639,.47361,0,0],8730:[.18,.82,0,0],8733:[0,.44444,0,0],8734:[0,.44444,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.12778,0],8764:[-.10889,.39111,0,0],8768:[.19444,.69444,0,0],8771:[.00222,.50222,0,0],8776:[.02444,.52444,0,0],8781:[.00222,.50222,0,0],8801:[.00222,.50222,0,0],8804:[.19667,.69667,0,0],8805:[.19667,.69667,0,0],8810:[.08556,.58556,0,0],8811:[.08556,.58556,0,0],8826:[.08556,.58556,0,0],8827:[.08556,.58556,0,0],8834:[.08556,.58556,0,0],8835:[.08556,.58556,0,0],8838:[.19667,.69667,0,0],8839:[.19667,.69667,0,0],8846:[0,.55556,0,0],8849:[.19667,.69667,0,0],8850:[.19667,.69667,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.13333,.63333,0,0],8854:[.13333,.63333,0,0],8855:[.13333,.63333,0,0],8856:[.13333,.63333,0,0],8857:[.13333,.63333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8900:[-.02639,.47361,0,0],8901:[-.02639,.47361,0,0],8902:[-.02778,.47222,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.13889,.36111,0,0],8995:[-.13889,.36111,0,0],9651:[.19444,.69444,0,0],9657:[-.02778,.47222,0,0],9661:[.19444,.69444,0,0],9667:[-.02778,.47222,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10815:[0,.68611,0,0],10927:[.19667,.69667,0,0],10928:[.19667,.69667,0,0]},"Main-Italic":{33:[0,.69444,.12417,0],34:[0,.69444,.06961,0],35:[.19444,.69444,.06616,0],37:[.05556,.75,.13639,0],38:[0,.69444,.09694,0],39:[0,.69444,.12417,0],40:[.25,.75,.16194,0],41:[.25,.75,.03694,0],42:[0,.75,.14917,0],43:[.05667,.56167,.03694,0],44:[.19444,.10556,0,0],45:[0,.43056,.02826,0],46:[0,.10556,0,0],47:[.25,.75,.16194,0],48:[0,.64444,.13556,0],49:[0,.64444,.13556,0],50:[0,.64444,.13556,0],51:[0,.64444,.13556,0],52:[.19444,.64444,.13556,0],53:[0,.64444,.13556,0],54:[0,.64444,.13556,0],55:[.19444,.64444,.13556,0],56:[0,.64444,.13556,0],57:[0,.64444,.13556,0],58:[0,.43056,.0582,0],59:[.19444,.43056,.0582,0],61:[-.13313,.36687,.06616,0],63:[0,.69444,.1225,0],64:[0,.69444,.09597,0],65:[0,.68333,0,0],66:[0,.68333,.10257,0],67:[0,.68333,.14528,0],68:[0,.68333,.09403,0],69:[0,.68333,.12028,0],70:[0,.68333,.13305,0],71:[0,.68333,.08722,0],72:[0,.68333,.16389,0],73:[0,.68333,.15806,0],74:[0,.68333,.14028,0],75:[0,.68333,.14528,0],76:[0,.68333,0,0],77:[0,.68333,.16389,0],78:[0,.68333,.16389,0],79:[0,.68333,.09403,0],80:[0,.68333,.10257,0],81:[.19444,.68333,.09403,0],82:[0,.68333,.03868,0],83:[0,.68333,.11972,0],84:[0,.68333,.13305,0],85:[0,.68333,.16389,0],86:[0,.68333,.18361,0],87:[0,.68333,.18361,0],88:[0,.68333,.15806,0],89:[0,.68333,.19383,0],90:[0,.68333,.14528,0],91:[.25,.75,.1875,0],93:[.25,.75,.10528,0],94:[0,.69444,.06646,0],95:[.31,.12056,.09208,0],97:[0,.43056,.07671,0],98:[0,.69444,.06312,0],99:[0,.43056,.05653,0],100:[0,.69444,.10333,0],101:[0,.43056,.07514,0],102:[.19444,.69444,.21194,0],103:[.19444,.43056,.08847,0],104:[0,.69444,.07671,0],105:[0,.65536,.1019,0],106:[.19444,.65536,.14467,0],107:[0,.69444,.10764,0],108:[0,.69444,.10333,0],109:[0,.43056,.07671,0],110:[0,.43056,.07671,0],111:[0,.43056,.06312,0],112:[.19444,.43056,.06312,0],113:[.19444,.43056,.08847,0],114:[0,.43056,.10764,0],115:[0,.43056,.08208,0],116:[0,.61508,.09486,0],117:[0,.43056,.07671,0],118:[0,.43056,.10764,0],119:[0,.43056,.10764,0],120:[0,.43056,.12042,0],121:[.19444,.43056,.08847,0],122:[0,.43056,.12292,0],126:[.35,.31786,.11585,0],163:[0,.69444,0,0],305:[0,.43056,0,.02778],567:[.19444,.43056,0,.08334],768:[0,.69444,0,0],769:[0,.69444,.09694,0],770:[0,.69444,.06646,0],771:[0,.66786,.11585,0],772:[0,.56167,.10333,0],774:[0,.69444,.10806,0],775:[0,.66786,.11752,0],776:[0,.66786,.10474,0],778:[0,.69444,0,0],779:[0,.69444,.1225,0],780:[0,.62847,.08295,0],915:[0,.68333,.13305,0],916:[0,.68333,0,0],920:[0,.68333,.09403,0],923:[0,.68333,0,0],926:[0,.68333,.15294,0],928:[0,.68333,.16389,0],931:[0,.68333,.12028,0],933:[0,.68333,.11111,0],934:[0,.68333,.05986,0],936:[0,.68333,.11111,0],937:[0,.68333,.10257,0],8211:[0,.43056,.09208,0],8212:[0,.43056,.09208,0],8216:[0,.69444,.12417,0],8217:[0,.69444,.12417,0],8220:[0,.69444,.1685,0],8221:[0,.69444,.06961,0],8463:[0,.68889,0,0]},"Main-Regular":{32:[0,0,0,0],33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.19444,.10556,0,0],45:[0,.43056,0,0],46:[0,.10556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.43056,0,0],59:[.19444,.43056,0,0],60:[.0391,.5391,0,0],61:[-.13313,.36687,0,0],62:[.0391,.5391,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68333,0,0],66:[0,.68333,0,0],67:[0,.68333,0,0],68:[0,.68333,0,0],69:[0,.68333,0,0],70:[0,.68333,0,0],71:[0,.68333,0,0],72:[0,.68333,0,0],73:[0,.68333,0,0],74:[0,.68333,0,0],75:[0,.68333,0,0],76:[0,.68333,0,0],77:[0,.68333,0,0],78:[0,.68333,0,0],79:[0,.68333,0,0],80:[0,.68333,0,0],81:[.19444,.68333,0,0],82:[0,.68333,0,0],83:[0,.68333,0,0],84:[0,.68333,0,0],85:[0,.68333,0,0],86:[0,.68333,.01389,0],
87:[0,.68333,.01389,0],88:[0,.68333,0,0],89:[0,.68333,.025,0],90:[0,.68333,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.12056,.02778,0],96:[0,.69444,0,0],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,0],100:[0,.69444,0,0],101:[0,.43056,0,0],102:[0,.69444,.07778,0],103:[.19444,.43056,.01389,0],104:[0,.69444,0,0],105:[0,.66786,0,0],106:[.19444,.66786,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.19444,.43056,0,0],113:[.19444,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.61508,0,0],117:[0,.43056,0,0],118:[0,.43056,.01389,0],119:[0,.43056,.01389,0],120:[0,.43056,0,0],121:[.19444,.43056,.01389,0],122:[0,.43056,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.31786,0,0],160:[0,0,0,0],168:[0,.66786,0,0],172:[0,.43056,0,0],175:[0,.56778,0,0],176:[0,.69444,0,0],177:[.08333,.58333,0,0],180:[0,.69444,0,0],215:[.08333,.58333,0,0],247:[.08333,.58333,0,0],305:[0,.43056,0,0],567:[.19444,.43056,0,0],710:[0,.69444,0,0],711:[0,.62847,0,0],713:[0,.56778,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.66786,0,0],730:[0,.69444,0,0],732:[0,.66786,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.66786,0,0],772:[0,.56778,0,0],774:[0,.69444,0,0],775:[0,.66786,0,0],776:[0,.66786,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.62847,0,0],824:[.19444,.69444,0,0],915:[0,.68333,0,0],916:[0,.68333,0,0],920:[0,.68333,0,0],923:[0,.68333,0,0],926:[0,.68333,0,0],928:[0,.68333,0,0],931:[0,.68333,0,0],933:[0,.68333,0,0],934:[0,.68333,0,0],936:[0,.68333,0,0],937:[0,.68333,0,0],8211:[0,.43056,.02778,0],8212:[0,.43056,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8230:[0,.12,0,0],8242:[0,.55556,0,0],8407:[0,.71444,.15382,0],8463:[0,.68889,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,.11111],8472:[.19444,.43056,0,.11111],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.13313,.36687,0,0],8593:[.19444,.69444,0,0],8594:[-.13313,.36687,0,0],8595:[.19444,.69444,0,0],8596:[-.13313,.36687,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8614:[.011,.511,0,0],8617:[.011,.511,0,0],8618:[.011,.511,0,0],8636:[-.13313,.36687,0,0],8637:[-.13313,.36687,0,0],8640:[-.13313,.36687,0,0],8641:[-.13313,.36687,0,0],8652:[.011,.671,0,0],8656:[-.13313,.36687,0,0],8657:[.19444,.69444,0,0],8658:[-.13313,.36687,0,0],8659:[.19444,.69444,0,0],8660:[-.13313,.36687,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.05556,.08334],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68333,0,0],8712:[.0391,.5391,0,0],8715:[.0391,.5391,0,0],8722:[.08333,.58333,0,0],8723:[.08333,.58333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.03472,.46528,0,0],8728:[-.05555,.44445,0,0],8729:[-.05555,.44445,0,0],8730:[.2,.8,0,0],8733:[0,.43056,0,0],8734:[0,.43056,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.11111,0],8764:[-.13313,.36687,0,0],8768:[.19444,.69444,0,0],8771:[-.03625,.46375,0,0],8773:[-.022,.589,0,0],8776:[-.01688,.48312,0,0],8781:[-.03625,.46375,0,0],8784:[-.133,.67,0,0],8800:[.215,.716,0,0],8801:[-.03625,.46375,0,0],8804:[.13597,.63597,0,0],8805:[.13597,.63597,0,0],8810:[.0391,.5391,0,0],8811:[.0391,.5391,0,0],8826:[.0391,.5391,0,0],8827:[.0391,.5391,0,0],8834:[.0391,.5391,0,0],8835:[.0391,.5391,0,0],8838:[.13597,.63597,0,0],8839:[.13597,.63597,0,0],8846:[0,.55556,0,0],8849:[.13597,.63597,0,0],8850:[.13597,.63597,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.08333,.58333,0,0],8854:[.08333,.58333,0,0],8855:[.08333,.58333,0,0],8856:[.08333,.58333,0,0],8857:[.08333,.58333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8872:[.249,.75,0,0],8900:[-.05555,.44445,0,0],8901:[-.05555,.44445,0,0],8902:[-.03472,.46528,0,0],8904:[.005,.505,0,0],8942:[.03,.9,0,0],8943:[-.19,.31,0,0],8945:[-.1,.82,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.14236,.35764,0,0],8995:[-.14236,.35764,0,0],9136:[.244,.744,0,0],9137:[.244,.744,0,0],9651:[.19444,.69444,0,0],9657:[-.03472,.46528,0,0],9661:[.19444,.69444,0,0],9667:[-.03472,.46528,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10222:[.244,.744,0,0],10223:[.244,.744,0,0],10229:[.011,.511,0,0],10230:[.011,.511,0,0],10231:[.011,.511,0,0],10232:[.024,.525,0,0],10233:[.024,.525,0,0],10234:[.024,.525,0,0],10236:[.011,.511,0,0],10815:[0,.68333,0,0],10927:[.13597,.63597,0,0],10928:[.13597,.63597,0,0]},"Math-BoldItalic":{47:[.19444,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,.04835,0],67:[0,.68611,.06979,0],68:[0,.68611,.03194,0],69:[0,.68611,.05451,0],70:[0,.68611,.15972,0],71:[0,.68611,0,0],72:[0,.68611,.08229,0],73:[0,.68611,.07778,0],74:[0,.68611,.10069,0],75:[0,.68611,.06979,0],76:[0,.68611,0,0],77:[0,.68611,.11424,0],78:[0,.68611,.11424,0],79:[0,.68611,.03194,0],80:[0,.68611,.15972,0],81:[.19444,.68611,0,0],82:[0,.68611,.00421,0],83:[0,.68611,.05382,0],84:[0,.68611,.15972,0],85:[0,.68611,.11424,0],86:[0,.68611,.25555,0],87:[0,.68611,.15972,0],88:[0,.68611,.07778,0],89:[0,.68611,.25555,0],90:[0,.68611,.06979,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[.19444,.69444,.11042,0],103:[.19444,.44444,.03704,0],104:[0,.69444,0,0],105:[0,.69326,0,0],106:[.19444,.69326,.0622,0],107:[0,.69444,.01852,0],108:[0,.69444,.0088,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,.03704,0],114:[0,.44444,.03194,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.03704,0],119:[0,.44444,.02778,0],120:[0,.44444,0,0],121:[.19444,.44444,.03704,0],122:[0,.44444,.04213,0],915:[0,.68611,.15972,0],916:[0,.68611,0,0],920:[0,.68611,.03194,0],923:[0,.68611,0,0],926:[0,.68611,.07458,0],928:[0,.68611,.08229,0],931:[0,.68611,.05451,0],933:[0,.68611,.15972,0],934:[0,.68611,0,0],936:[0,.68611,.11653,0],937:[0,.68611,.04835,0],945:[0,.44444,0,0],946:[.19444,.69444,.03403,0],947:[.19444,.44444,.06389,0],948:[0,.69444,.03819,0],949:[0,.44444,0,0],950:[.19444,.69444,.06215,0],951:[.19444,.44444,.03704,0],952:[0,.69444,.03194,0],953:[0,.44444,0,0],954:[0,.44444,0,0],955:[0,.69444,0,0],956:[.19444,.44444,0,0],957:[0,.44444,.06898,0],958:[.19444,.69444,.03021,0],959:[0,.44444,0,0],960:[0,.44444,.03704,0],961:[.19444,.44444,0,0],962:[.09722,.44444,.07917,0],963:[0,.44444,.03704,0],964:[0,.44444,.13472,0],965:[0,.44444,.03704,0],966:[.19444,.44444,0,0],967:[.19444,.44444,0,0],968:[.19444,.69444,.03704,0],969:[0,.44444,.03704,0],977:[0,.69444,0,0],981:[.19444,.69444,0,0],982:[0,.44444,.03194,0],1009:[.19444,.44444,0,0],1013:[0,.44444,0,0]},"Math-Italic":{47:[.19444,.69444,0,0],65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"Math-Regular":{65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"SansSerif-Regular":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.125,.08333,0,0],45:[0,.44444,0,0],46:[0,.08333,0,0],47:[.25,.75,0,0],48:[0,.65556,0,0],49:[0,.65556,0,0],50:[0,.65556,0,0],51:[0,.65556,0,0],52:[0,.65556,0,0],53:[0,.65556,0,0],54:[0,.65556,0,0],55:[0,.65556,0,0],56:[0,.65556,0,0],57:[0,.65556,0,0],58:[0,.44444,0,0],59:[.125,.44444,0,0],61:[-.13,.37,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.69444,0,0],66:[0,.69444,0,0],67:[0,.69444,0,0],68:[0,.69444,0,0],69:[0,.69444,0,0],70:[0,.69444,0,0],71:[0,.69444,0,0],72:[0,.69444,0,0],73:[0,.69444,0,0],74:[0,.69444,0,0],75:[0,.69444,0,0],76:[0,.69444,0,0],77:[0,.69444,0,0],78:[0,.69444,0,0],79:[0,.69444,0,0],80:[0,.69444,0,0],81:[.125,.69444,0,0],82:[0,.69444,0,0],83:[0,.69444,0,0],84:[0,.69444,0,0],85:[0,.69444,0,0],86:[0,.69444,.01389,0],87:[0,.69444,.01389,0],88:[0,.69444,0,0],89:[0,.69444,.025,0],90:[0,.69444,0,0],91:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.35,.09444,.02778,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.06944,0],103:[.19444,.44444,.01389,0],104:[0,.69444,0,0],105:[0,.67937,0,0],106:[.19444,.67937,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,.01389,0],115:[0,.44444,0,0],116:[0,.57143,0,0],117:[0,.44444,0,0],118:[0,.44444,.01389,0],119:[0,.44444,.01389,0],120:[0,.44444,0,0],121:[.19444,.44444,.01389,0],122:[0,.44444,0,0],126:[.35,.32659,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],768:[0,.69444,0,0],769:[0,.69444,0,0],770:[0,.69444,0,0],771:[0,.67659,0,0],772:[0,.60889,0,0],774:[0,.69444,0,0],775:[0,.67937,0,0],776:[0,.67937,0,0],778:[0,.69444,0,0],779:[0,.69444,0,0],780:[0,.63194,0,0],915:[0,.69444,0,0],916:[0,.69444,0,0],920:[0,.69444,0,0],923:[0,.69444,0,0],926:[0,.69444,0,0],928:[0,.69444,0,0],931:[0,.69444,0,0],933:[0,.69444,0,0],934:[0,.69444,0,0],936:[0,.69444,0,0],937:[0,.69444,0,0],8211:[0,.44444,.02778,0],8212:[0,.44444,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0]},"Script-Regular":{65:[0,.7,.22925,0],66:[0,.7,.04087,0],67:[0,.7,.1689,0],68:[0,.7,.09371,0],69:[0,.7,.18583,0],70:[0,.7,.13634,0],71:[0,.7,.17322,0],72:[0,.7,.29694,0],73:[0,.7,.19189,0],74:[.27778,.7,.19189,0],75:[0,.7,.31259,0],76:[0,.7,.19189,0],77:[0,.7,.15981,0],78:[0,.7,.3525,0],79:[0,.7,.08078,0],80:[0,.7,.08078,0],81:[0,.7,.03305,0],82:[0,.7,.06259,0],83:[0,.7,.19189,0],84:[0,.7,.29087,0],85:[0,.7,.25815,0],86:[0,.7,.27523,0],87:[0,.7,.27523,0],88:[0,.7,.26006,0],89:[0,.7,.2939,0],90:[0,.7,.24037,0]},"Size1-Regular":{40:[.35001,.85,0,0],41:[.35001,.85,0,0],47:[.35001,.85,0,0],91:[.35001,.85,0,0],92:[.35001,.85,0,0],93:[.35001,.85,0,0],123:[.35001,.85,0,0],125:[.35001,.85,0,0],710:[0,.72222,0,0],732:[0,.72222,0,0],770:[0,.72222,0,0],771:[0,.72222,0,0],8214:[-99e-5,.601,0,0],8593:[1e-5,.6,0,0],8595:[1e-5,.6,0,0],8657:[1e-5,.6,0,0],8659:[1e-5,.6,0,0],8719:[.25001,.75,0,0],8720:[.25001,.75,0,0],8721:[.25001,.75,0,0],8730:[.35001,.85,0,0],8739:[-.00599,.606,0,0],8741:[-.00599,.606,0,0],8747:[.30612,.805,.19445,0],8748:[.306,.805,.19445,0],8749:[.306,.805,.19445,0],8750:[.30612,.805,.19445,0],8896:[.25001,.75,0,0],8897:[.25001,.75,0,0],8898:[.25001,.75,0,0],8899:[.25001,.75,0,0],8968:[.35001,.85,0,0],8969:[.35001,.85,0,0],8970:[.35001,.85,0,0],8971:[.35001,.85,0,0],9168:[-99e-5,.601,0,0],10216:[.35001,.85,0,0],10217:[.35001,.85,0,0],10752:[.25001,.75,0,0],10753:[.25001,.75,0,0],10754:[.25001,.75,0,0],10756:[.25001,.75,0,0],10758:[.25001,.75,0,0]},"Size2-Regular":{40:[.65002,1.15,0,0],41:[.65002,1.15,0,0],47:[.65002,1.15,0,0],91:[.65002,1.15,0,0],92:[.65002,1.15,0,0],93:[.65002,1.15,0,0],123:[.65002,1.15,0,0],125:[.65002,1.15,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8719:[.55001,1.05,0,0],8720:[.55001,1.05,0,0],8721:[.55001,1.05,0,0],8730:[.65002,1.15,0,0],8747:[.86225,1.36,.44445,0],8748:[.862,1.36,.44445,0],8749:[.862,1.36,.44445,0],8750:[.86225,1.36,.44445,0],8896:[.55001,1.05,0,0],8897:[.55001,1.05,0,0],8898:[.55001,1.05,0,0],8899:[.55001,1.05,0,0],8968:[.65002,1.15,0,0],8969:[.65002,1.15,0,0],8970:[.65002,1.15,0,0],8971:[.65002,1.15,0,0],10216:[.65002,1.15,0,0],10217:[.65002,1.15,0,0],10752:[.55001,1.05,0,0],10753:[.55001,1.05,0,0],10754:[.55001,1.05,0,0],10756:[.55001,1.05,0,0],10758:[.55001,1.05,0,0]},"Size3-Regular":{40:[.95003,1.45,0,0],41:[.95003,1.45,0,0],47:[.95003,1.45,0,0],91:[.95003,1.45,0,0],92:[.95003,1.45,0,0],93:[.95003,1.45,0,0],123:[.95003,1.45,0,0],125:[.95003,1.45,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8730:[.95003,1.45,0,0],8968:[.95003,1.45,0,0],8969:[.95003,1.45,0,0],8970:[.95003,1.45,0,0],8971:[.95003,1.45,0,0],10216:[.95003,1.45,0,0],10217:[.95003,1.45,0,0]},"Size4-Regular":{40:[1.25003,1.75,0,0],41:[1.25003,1.75,0,0],47:[1.25003,1.75,0,0],91:[1.25003,1.75,0,0],92:[1.25003,1.75,0,0],93:[1.25003,1.75,0,0],123:[1.25003,1.75,0,0],125:[1.25003,1.75,0,0],710:[0,.825,0,0],732:[0,.825,0,0],770:[0,.825,0,0],771:[0,.825,0,0],8730:[1.25003,1.75,0,0],8968:[1.25003,1.75,0,0],8969:[1.25003,1.75,0,0],8970:[1.25003,1.75,0,0],8971:[1.25003,1.75,0,0],9115:[.64502,1.155,0,0],9116:[1e-5,.6,0,0],9117:[.64502,1.155,0,0],9118:[.64502,1.155,0,0],9119:[1e-5,.6,0,0],9120:[.64502,1.155,0,0],9121:[.64502,1.155,0,0],9122:[-99e-5,.601,0,0],9123:[.64502,1.155,0,0],9124:[.64502,1.155,0,0],9125:[-99e-5,.601,0,0],9126:[.64502,1.155,0,0],9127:[1e-5,.9,0,0],9128:[.65002,1.15,0,0],9129:[.90001,0,0,0],9130:[0,.3,0,0],9131:[1e-5,.9,0,0],9132:[.65002,1.15,0,0],9133:[.90001,0,0,0],9143:[.88502,.915,0,0],10216:[1.25003,1.75,0,0],10217:[1.25003,1.75,0,0],57344:[-.00499,.605,0,0],57345:[-.00499,.605,0,0],57680:[0,.12,0,0],57681:[0,.12,0,0],57682:[0,.12,0,0],57683:[0,.12,0,0]},"Typewriter-Regular":{33:[0,.61111,0,0],34:[0,.61111,0,0],35:[0,.61111,0,0],36:[.08333,.69444,0,0],37:[.08333,.69444,0,0],38:[0,.61111,0,0],39:[0,.61111,0,0],40:[.08333,.69444,0,0],41:[.08333,.69444,0,0],42:[0,.52083,0,0],43:[-.08056,.53055,0,0],44:[.13889,.125,0,0],45:[-.08056,.53055,0,0],46:[0,.125,0,0],47:[.08333,.69444,0,0],48:[0,.61111,0,0],49:[0,.61111,0,0],50:[0,.61111,0,0],51:[0,.61111,0,0],52:[0,.61111,0,0],53:[0,.61111,0,0],54:[0,.61111,0,0],55:[0,.61111,0,0],56:[0,.61111,0,0],57:[0,.61111,0,0],58:[0,.43056,0,0],59:[.13889,.43056,0,0],60:[-.05556,.55556,0,0],61:[-.19549,.41562,0,0],62:[-.05556,.55556,0,0],63:[0,.61111,0,0],64:[0,.61111,0,0],65:[0,.61111,0,0],66:[0,.61111,0,0],67:[0,.61111,0,0],68:[0,.61111,0,0],69:[0,.61111,0,0],70:[0,.61111,0,0],71:[0,.61111,0,0],72:[0,.61111,0,0],73:[0,.61111,0,0],74:[0,.61111,0,0],75:[0,.61111,0,0],76:[0,.61111,0,0],77:[0,.61111,0,0],78:[0,.61111,0,0],79:[0,.61111,0,0],80:[0,.61111,0,0],81:[.13889,.61111,0,0],82:[0,.61111,0,0],83:[0,.61111,0,0],84:[0,.61111,0,0],85:[0,.61111,0,0],86:[0,.61111,0,0],87:[0,.61111,0,0],88:[0,.61111,0,0],89:[0,.61111,0,0],90:[0,.61111,0,0],91:[.08333,.69444,0,0],92:[.08333,.69444,0,0],93:[.08333,.69444,0,0],94:[0,.61111,0,0],95:[.09514,0,0,0],96:[0,.61111,0,0],97:[0,.43056,0,0],98:[0,.61111,0,0],99:[0,.43056,0,0],100:[0,.61111,0,0],101:[0,.43056,0,0],102:[0,.61111,0,0],103:[.22222,.43056,0,0],104:[0,.61111,0,0],105:[0,.61111,0,0],106:[.22222,.61111,0,0],107:[0,.61111,0,0],108:[0,.61111,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.22222,.43056,0,0],113:[.22222,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.55358,0,0],117:[0,.43056,0,0],118:[0,.43056,0,0],119:[0,.43056,0,0],120:[0,.43056,0,0],121:[.22222,.43056,0,0],122:[0,.43056,0,0],123:[.08333,.69444,0,0],124:[.08333,.69444,0,0],125:[.08333,.69444,0,0],126:[0,.61111,0,0],127:[0,.61111,0,0],305:[0,.43056,0,0],567:[.22222,.43056,0,0],768:[0,.61111,0,0],769:[0,.61111,0,0],770:[0,.61111,0,0],771:[0,.61111,0,0],772:[0,.56555,0,0],774:[0,.61111,0,0],776:[0,.61111,0,0],778:[0,.61111,0,0],780:[0,.56597,0,0],915:[0,.61111,0,0],916:[0,.61111,0,0],920:[0,.61111,0,0],923:[0,.61111,0,0],926:[0,.61111,0,0],928:[0,.61111,0,0],931:[0,.61111,0,0],933:[0,.61111,0,0],934:[0,.61111,0,0],936:[0,.61111,0,0],937:[0,.61111,0,0],2018:[0,.61111,0,0],2019:[0,.61111,0,0],8216:[0,.61111,0,0],8217:[0,.61111,0,0],8242:[0,.61111,0,0],9251:[.11111,.21944,0,0]}};r.default=a},{}],103:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./utils");var n=c(a);var i=e("./ParseError");var l=c(i);var o=e("./ParseNode");var u=c(o);var s=e("./defineFunction");var f=c(s);e("./functions/phantom");e("./functions/operators");e("./functions/delimsizing");function c(e){return e&&e.__esModule?e:{default:e}}var d=s._functions;r.default=d;var v=function e(t,r,a){(0,f.default)({names:t,props:r,handler:a})};v(["\\sqrt"],{numArgs:1,numOptionalArgs:1},function(e,t,r){var a=r[0];var n=t[0];return{type:"sqrt",body:n,index:a}});var h={"\\text":undefined,"\\textrm":"mathrm","\\textsf":"mathsf","\\texttt":"mathtt","\\textnormal":"mathrm","\\textbf":"mathbf","\\textit":"textit"};v(["\\text","\\textrm","\\textsf","\\texttt","\\textnormal","\\textbf","\\textit"],{numArgs:1,argTypes:["text"],greediness:2,allowedInText:true},function(e,t){var r=t[0];return{type:"text",body:(0,s.ordargument)(r),font:h[e.funcName]}});v(["\\textcolor"],{numArgs:2,allowedInText:true,greediness:3,argTypes:["color","original"]},function(e,t){var r=t[0];var a=t[1];return{type:"color",color:r.value,value:(0,s.ordargument)(a)}});v(["\\color"],{numArgs:1,allowedInText:true,greediness:3,argTypes:["color"]},null);v(["\\colorbox"],{numArgs:2,allowedInText:true,greediness:3,argTypes:["color","text"]},function(e,t){var r=t[0];var a=t[1];return{type:"enclose",label:e.funcName,backgroundColor:r,body:a}});v(["\\fcolorbox"],{numArgs:3,allowedInText:true,greediness:3,argTypes:["color","color","text"]},function(e,t){var r=t[0];var a=t[1];var n=t[2];return{type:"enclose",label:e.funcName,backgroundColor:a,borderColor:r,body:n}});v(["\\overline"],{numArgs:1},function(e,t){var r=t[0];return{type:"overline",body:r}});v(["\\underline"],{numArgs:1},function(e,t){var r=t[0];return{type:"underline",body:r}});v(["\\rule"],{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"]},function(e,t,r){var a=r[0];var n=t[0];var i=t[1];return{type:"rule",shift:a&&a.value,width:n.value,height:i.value}});v(["\\kern","\\mkern"],{numArgs:1,argTypes:["size"]},function(e,t){return{type:"kern",dimension:t[0].value}});v(["\\KaTeX"],{numArgs:0,allowedInText:true},function(e){return{type:"katex"}});v(["\\mathord","\\mathbin","\\mathrel","\\mathopen","\\mathclose","\\mathpunct","\\mathinner"],{numArgs:1},function(e,t){var r=t[0];return{type:"mclass",mclass:"m"+e.funcName.substr(5),value:(0,s.ordargument)(r)}});v(["\\stackrel"],{numArgs:2},function(e,t){var r=t[0];var a=t[1];var n=new u.default("op",{type:"op",limits:true,alwaysHandleSupSub:true,symbol:false,value:(0,s.ordargument)(a)},a.mode);var i=new u.default("supsub",{base:n,sup:r,sub:null},r.mode);return{type:"mclass",mclass:"mrel",value:[i]}});v(["\\bmod"],{numArgs:0},function(e,t){return{type:"mod",modType:"bmod",value:null}});v(["\\pod","\\pmod","\\mod"],{numArgs:1},function(e,t){var r=t[0];return{type:"mod",modType:e.funcName.substr(1),value:(0,s.ordargument)(r)}});var p={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak"};v(["\\blue","\\orange","\\pink","\\red","\\green","\\gray","\\purple","\\blueA","\\blueB","\\blueC","\\blueD","\\blueE","\\tealA","\\tealB","\\tealC","\\tealD","\\tealE","\\greenA","\\greenB","\\greenC","\\greenD","\\greenE","\\goldA","\\goldB","\\goldC","\\goldD","\\goldE","\\redA","\\redB","\\redC","\\redD","\\redE","\\maroonA","\\maroonB","\\maroonC","\\maroonD","\\maroonE","\\purpleA","\\purpleB","\\purpleC","\\purpleD","\\purpleE","\\mintA","\\mintB","\\mintC","\\grayA","\\grayB","\\grayC","\\grayD","\\grayE","\\grayF","\\grayG","\\grayH","\\grayI","\\kaBlue","\\kaGreen"],{numArgs:1,allowedInText:true,greediness:3},function(e,t){var r=t[0];return{type:"color",color:"katex-"+e.funcName.slice(1),value:(0,s.ordargument)(r)}});v(["\\arcsin","\\arccos","\\arctan","\\arctg","\\arcctg","\\arg","\\ch","\\cos","\\cosec","\\cosh","\\cot","\\cotg","\\coth","\\csc","\\ctg","\\cth","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\sh","\\tan","\\tanh","\\tg","\\th"],{numArgs:0},function(e){return{type:"op",limits:false,symbol:false,body:e.funcName}});v(["\\det","\\gcd","\\inf","\\lim","\\liminf","\\limsup","\\max","\\min","\\Pr","\\sup"],{numArgs:0},function(e){return{type:"op",limits:true,symbol:false,body:e.funcName}});v(["\\int","\\iint","\\iiint","\\oint"],{numArgs:0},function(e){return{type:"op",limits:false,symbol:true,body:e.funcName}});v(["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint"],{numArgs:0},function(e){return{type:"op",limits:true,symbol:true,body:e.funcName}});v(["\\mathop"],{numArgs:1},function(e,t){var r=t[0];return{type:"op",limits:false,symbol:false,value:(0,s.ordargument)(r)}});v(["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom","\\\\atopfrac"],{numArgs:2,greediness:2},function(e,t){var r=t[0];var a=t[1];var n=void 0;var i=null;var l=null;var o="auto";switch(e.funcName){case"\\dfrac":case"\\frac":case"\\tfrac":n=true;break;case"\\\\atopfrac":n=false;break;case"\\dbinom":case"\\binom":case"\\tbinom":n=false;i="(";l=")";break;default:throw new Error("Unrecognized genfrac command")}switch(e.funcName){case"\\dfrac":case"\\dbinom":o="display";break;case"\\tfrac":case"\\tbinom":o="text";break}return{type:"genfrac",numer:r,denom:a,hasBarLine:n,leftDelim:i,rightDelim:l,size:o}});v(["\\mathllap","\\mathrlap","\\mathclap"],{numArgs:1,allowedInText:true},function(e,t){var r=t[0];return{type:"lap",alignment:e.funcName.slice(5),body:r}});v(["\\smash"],{numArgs:1,numOptionalArgs:1,allowedInText:true},function(e,t,r){var a=false;var n=false;var i=r[0];if(i){var l="";for(var o=0;o<i.value.length;++o){l=i.value[o].value;if(l==="t"){a=true}else if(l==="b"){n=true}else{a=false;n=false;break}}}else{a=true;n=true}var u=t[0];return{type:"smash",body:u,smashHeight:a,smashDepth:n}});v(["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],{numArgs:0},null);v(["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],{numArgs:0},null);v(["\\rm","\\sf","\\tt","\\bf","\\it"],{numArgs:0},null);v(["\\mathrm","\\mathit","\\mathbf","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],{numArgs:1,greediness:2},function(e,t){var r=t[0];var a=e.funcName;if(a in p){a=p[a]}return{type:"font",font:a.slice(1),body:r}});v(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\widehat","\\widetilde","\\overrightarrow","\\overleftarrow","\\Overrightarrow","\\overleftrightarrow","\\overgroup","\\overlinesegment","\\overleftharpoon","\\overrightharpoon"],{numArgs:1},function(e,t){var r=t[0];var a=!n.default.contains(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot"],e.funcName);var i=!a||n.default.contains(["\\widehat","\\widetilde"],e.funcName);return{type:"accent",label:e.funcName,isStretchy:a,isShifty:i,base:r}});v(["\\'","\\`","\\^","\\~","\\=","\\u","\\.",'\\"',"\\r","\\H","\\v"],{numArgs:1,allowedInText:true,allowedInMath:false},function(e,t){var r=t[0];return{type:"accent",label:e.funcName,isStretchy:false,isShifty:true,base:r}});v(["\\overbrace","\\underbrace"],{numArgs:1},function(e,t){var r=t[0];return{type:"horizBrace",label:e.funcName,isOver:/^\\over/.test(e.funcName),base:r}});v(["\\underleftarrow","\\underrightarrow","\\underleftrightarrow","\\undergroup","\\underlinesegment","\\undertilde"],{numArgs:1},function(e,t){var r=t[0];return{type:"accentUnder",label:e.funcName,base:r}});v(["\\xleftarrow","\\xrightarrow","\\xLeftarrow","\\xRightarrow","\\xleftrightarrow","\\xLeftrightarrow","\\xhookleftarrow","\\xhookrightarrow","\\xmapsto","\\xrightharpoondown","\\xrightharpoonup","\\xleftharpoondown","\\xleftharpoonup","\\xrightleftharpoons","\\xleftrightharpoons","\\xLongequal","\\xtwoheadrightarrow","\\xtwoheadleftarrow","\\xLongequal","\\xtofrom"],{numArgs:1,numOptionalArgs:1},function(e,t,r){var a=r[0];var n=t[0];return{type:"xArrow",label:e.funcName,body:n,below:a}});v(["\\cancel","\\bcancel","\\xcancel","\\sout","\\fbox"],{numArgs:1},function(e,t){var r=t[0];return{type:"enclose",label:e.funcName,body:r}});v(["\\over","\\choose","\\atop"],{numArgs:0,infix:true},function(e){var t=void 0;switch(e.funcName){case"\\over":t="\\frac";break;case"\\choose":t="\\binom";break;case"\\atop":t="\\\\atopfrac";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",replaceWith:t,token:e.token}});v(["\\\\","\\cr"],{numArgs:0,numOptionalArgs:1,argTypes:["size"]},function(e,t,r){var a=r[0];return{type:"cr",size:a}});v(["\\begin","\\end"],{numArgs:1,argTypes:["text"]},function(e,t){var r=t[0];if(r.type!=="ordgroup"){throw new l.default("Invalid environment name",r)}var a="";for(var n=0;n<r.value.length;++n){a+=r.value[n].value}return{type:"environment",name:a,nameGroup:r}});v(["\\raisebox"],{numArgs:2,argTypes:["size","text"],allowedInText:true},function(e,t){var r=t[0];var a=t[1];return{type:"raisebox",dy:r,body:a,value:(0,s.ordargument)(a)}});v(["\\verb"],{numArgs:0,allowedInText:true},function(e){throw new l.default("\\verb ended by end of line instead of matching delimiter")})},{"./ParseError":84,"./ParseNode":85,"./defineFunction":96,"./functions/delimsizing":104,"./functions/operators":105,"./functions/phantom":106,"./utils":115}],104:[function(e,t,r){"use strict";var a=e("../buildCommon");var n=x(a);var i=e("../defineFunction");var l=x(i);var o=e("../delimiter");var u=x(o);var s=e("../mathMLTree");var f=x(s);var c=e("../ParseError");var d=x(c);var v=e("../utils");var h=x(v);var p=e("../buildHTML");var m=y(p);var g=e("../buildMathML");var b=y(g);function y(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]}}t.default=e;return t}}function x(e){return e&&e.__esModule?e:{default:e}}var w={"\\bigl":{mclass:"mopen",size:1},"\\Bigl":{mclass:"mopen",size:2},"\\biggl":{mclass:"mopen",size:3},"\\Biggl":{mclass:"mopen",size:4},"\\bigr":{mclass:"mclose",size:1},"\\Bigr":{mclass:"mclose",size:2},"\\biggr":{mclass:"mclose",size:3},"\\Biggr":{mclass:"mclose",size:4},"\\bigm":{mclass:"mrel",size:1},"\\Bigm":{mclass:"mrel",size:2},"\\biggm":{mclass:"mrel",size:3},"\\Biggm":{mclass:"mrel",size:4},"\\big":{mclass:"mord",size:1},"\\Big":{mclass:"mord",size:2},"\\bigg":{mclass:"mord",size:3},"\\Bigg":{mclass:"mord",size:4}};var k=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","<",">","\\langle","\\rangle","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."];function M(e,t){if(h.default.contains(k,e.value)){return e}else{throw new d.default("Invalid delimiter: '"+e.value+"' after '"+t.funcName+"'",e)}}(0,l.default)({type:"delimsizing",names:["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg"],props:{numArgs:1},handler:function e(t,r){var a=M(r[0],t);return{type:"delimsizing",size:w[t.funcName].size,mclass:w[t.funcName].mclass,value:a.value}},htmlBuilder:function e(t,r){var a=t.value.value;if(a==="."){return n.default.makeSpan([t.value.mclass]);
}return u.default.sizedDelim(a,t.value.size,r,t.mode,[t.value.mclass])},mathmlBuilder:function e(t){var r=[];if(t.value.value!=="."){r.push(b.makeText(t.value.value,t.mode))}var a=new f.default.MathNode("mo",r);if(t.value.mclass==="mopen"||t.value.mclass==="mclose"){a.setAttribute("fence","true")}else{a.setAttribute("fence","false")}return a}});(0,l.default)({type:"leftright",names:["\\left","\\right"],props:{numArgs:1},handler:function e(t,r){var a=M(r[0],t);return{type:"leftright",value:a.value}},htmlBuilder:function e(t,r){var a=m.buildExpression(t.value.body,r,true);var i=0;var l=0;var o=false;for(var s=0;s<a.length;s++){if(a[s].isMiddle){o=true}else{i=Math.max(a[s].height,i);l=Math.max(a[s].depth,l)}}i*=r.sizeMultiplier;l*=r.sizeMultiplier;var f=void 0;if(t.value.left==="."){f=m.makeNullDelimiter(r,["mopen"])}else{f=u.default.leftRightDelim(t.value.left,i,l,r,t.mode,["mopen"])}a.unshift(f);if(o){for(var c=1;c<a.length;c++){var d=a[c];if(d.isMiddle){a[c]=u.default.leftRightDelim(d.isMiddle.value,i,l,d.isMiddle.options,t.mode,[]);var v=m.spliceSpaces(d.children,0);if(v){n.default.prependChildren(a[c],v)}}}}var h=void 0;if(t.value.right==="."){h=m.makeNullDelimiter(r,["mclose"])}else{h=u.default.leftRightDelim(t.value.right,i,l,r,t.mode,["mclose"])}a.push(h);return n.default.makeSpan(["minner"],a,r)},mathmlBuilder:function e(t,r){var a=b.buildExpression(t.value.body,r);if(t.value.left!=="."){var n=new f.default.MathNode("mo",[b.makeText(t.value.left,t.mode)]);n.setAttribute("fence","true");a.unshift(n)}if(t.value.right!=="."){var i=new f.default.MathNode("mo",[b.makeText(t.value.right,t.mode)]);i.setAttribute("fence","true");a.push(i)}var l=new f.default.MathNode("mrow",a);return l}});(0,l.default)({type:"middle",names:["\\middle"],props:{numArgs:1},handler:function e(t,r){var a=M(r[0],t);if(!t.parser.leftrightDepth){throw new d.default("\\middle without preceding \\left",a)}return{type:"middle",value:a.value}},htmlBuilder:function e(t,r){var a=void 0;if(t.value.value==="."){a=m.makeNullDelimiter(r,[])}else{a=u.default.sizedDelim(t.value.value,1,r,t.mode,[]);a.isMiddle={value:t.value.value,options:r}}return a},mathmlBuilder:function e(t,r){var a=new f.default.MathNode("mo",[b.makeText(t.value.middle,t.mode)]);a.setAttribute("fence","true");return a}})},{"../ParseError":84,"../buildCommon":91,"../buildHTML":92,"../buildMathML":93,"../defineFunction":96,"../delimiter":97,"../mathMLTree":108,"../utils":115}],105:[function(e,t,r){"use strict";var a=e("../defineFunction");var n=m(a);var i=e("../buildCommon");var l=m(i);var o=e("../mathMLTree");var u=m(o);var s=e("../domTree");var f=m(s);var c=e("../buildHTML");var d=p(c);var v=e("../buildMathML");var h=p(v);function p(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]}}t.default=e;return t}}function m(e){return e&&e.__esModule?e:{default:e}}(0,n.default)({type:"operatorname",names:["\\operatorname"],props:{numArgs:1},handler:function e(t,r){var n=r[0];return{type:"operatorname",value:(0,a.ordargument)(n)}},htmlBuilder:function e(t,r){var a=[];if(t.value.value.length>0){var n="";var i="";var o=d.buildExpression(t.value.value,r,true);for(var u=0;u<o.length;u++){n=o[u].value;n=n.replace(/\u2212/,"-");n=n.replace(/\u2217/,"*");i=/[\u0391-\u03D7]/.test(n)?"math":"text";a.push(l.default.mathsym(n,i))}}return l.default.makeSpan(["mop"],a,r)},mathmlBuilder:function e(t,r){var a=[];if(t.value.value.length>0){var n=h.buildExpression(t.value.value,r);var i="";for(var l=0;l<n.length;l++){i+=n[l].children[0].text}i=i.replace(/\u2212/g,"-");i=i.replace(/\u2217/g,"*");a=[new u.default.TextNode(i)]}var o=new u.default.MathNode("mi",a);o.setAttribute("mathvariant","normal");var s=new u.default.MathNode("mo",[h.makeText("&ApplyFunction;","text")]);return new f.default.documentFragment([o,s])}})},{"../buildCommon":91,"../buildHTML":92,"../buildMathML":93,"../defineFunction":96,"../domTree":98,"../mathMLTree":108}],106:[function(e,t,r){"use strict";var a=e("../defineFunction");var n=h(a);var i=e("../buildCommon");var l=h(i);var o=e("../mathMLTree");var u=h(o);var s=e("../buildHTML");var f=v(s);var c=e("../buildMathML");var d=v(c);function v(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]}}t.default=e;return t}}function h(e){return e&&e.__esModule?e:{default:e}}(0,n.default)({type:"phantom",names:["\\phantom"],props:{numArgs:1},handler:function e(t,r){var n=r[0];return{type:"phantom",value:(0,a.ordargument)(n)}},htmlBuilder:function e(t,r){var a=f.buildExpression(t.value.value,r.withPhantom(),false);return new l.default.makeFragment(a)},mathmlBuilder:function e(t,r){var a=d.buildExpression(t.value.value,r);return new u.default.MathNode("mphantom",a)}});(0,n.default)({type:"hphantom",names:["\\hphantom"],props:{numArgs:1},handler:function e(t,r){var n=r[0];return{type:"hphantom",value:(0,a.ordargument)(n),body:n}},htmlBuilder:function e(t,r){var a=l.default.makeSpan([],[f.buildGroup(t.value.body,r.withPhantom())]);a.height=0;a.depth=0;if(a.children){for(var n=0;n<a.children.length;n++){a.children[n].height=0;a.children[n].depth=0}}a=l.default.makeVList([{type:"elem",elem:a}],"firstBaseline",null,r);return a},mathmlBuilder:function e(t,r){var a=d.buildExpression(t.value.value,r);var n=new u.default.MathNode("mphantom",a);n.setAttribute("height","0px");return n}});(0,n.default)({type:"vphantom",names:["\\vphantom"],props:{numArgs:1},handler:function e(t,r){var n=r[0];return{type:"vphantom",value:(0,a.ordargument)(n),body:n}},htmlBuilder:function e(t,r){var a=l.default.makeSpan(["inner"],[f.buildGroup(t.value.body,r.withPhantom())]);var n=l.default.makeSpan(["fix"],[]);return l.default.makeSpan(["mord","rlap"],[a,n],r)},mathmlBuilder:function e(t,r){var a=d.buildExpression(t.value.value,r);var n=new u.default.MathNode("mphantom",a);n.setAttribute("width","0px");return n}})},{"../buildCommon":91,"../buildHTML":92,"../buildMathML":93,"../defineFunction":96,"../mathMLTree":108}],107:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./symbols");var n=u(a);var i=e("./utils");var l=u(i);var o=e("./Token");function u(e){return e&&e.__esModule?e:{default:e}}var s={};r.default=s;function f(e,t){s[e]=t}f("\\bgroup","{");f("\\egroup","}");f("\\begingroup","{");f("\\endgroup","}");f("\\mkern","\\kern");f("\\llap","\\mathllap{\\textrm{#1}}");f("\\rlap","\\mathrlap{\\textrm{#1}}");f("\\clap","\\mathclap{\\textrm{#1}}");f("\\overset","\\mathop{#2}\\limits^{#1}");f("\\underset","\\mathop{#2}\\limits_{#1}");f("\\boxed","\\fbox{\\displaystyle{#1}}");f("\\iff","\\DOTSB\\;\\Longleftrightarrow\\;");f("\\implies","\\DOTSB\\;\\Longrightarrow\\;");f("\\impliedby","\\DOTSB\\;\\Longleftarrow\\;");var c={",":"\\dotsc","\\not":"\\dotsb","+":"\\dotsb","=":"\\dotsb","<":"\\dotsb",">":"\\dotsb","-":"\\dotsb","*":"\\dotsb",":":"\\dotsb","\\DOTSB":"\\dotsb","\\coprod":"\\dotsb","\\bigvee":"\\dotsb","\\bigwedge":"\\dotsb","\\biguplus":"\\dotsb","\\bigcap":"\\dotsb","\\bigcup":"\\dotsb","\\prod":"\\dotsb","\\sum":"\\dotsb","\\bigotimes":"\\dotsb","\\bigoplus":"\\dotsb","\\bigodot":"\\dotsb","\\bigsqcup":"\\dotsb","\\implies":"\\dotsb","\\impliedby":"\\dotsb","\\And":"\\dotsb","\\longrightarrow":"\\dotsb","\\Longrightarrow":"\\dotsb","\\longleftarrow":"\\dotsb","\\Longleftarrow":"\\dotsb","\\longleftrightarrow":"\\dotsb","\\Longleftrightarrow":"\\dotsb","\\mapsto":"\\dotsb","\\longmapsto":"\\dotsb","\\hookrightarrow":"\\dotsb","\\iff":"\\dotsb","\\doteq":"\\dotsb","\\mathbin":"\\dotsb","\\bmod":"\\dotsb","\\mathrel":"\\dotsb","\\relbar":"\\dotsb","\\Relbar":"\\dotsb","\\xrightarrow":"\\dotsb","\\xleftarrow":"\\dotsb","\\DOTSI":"\\dotsi","\\int":"\\dotsi","\\oint":"\\dotsi","\\iint":"\\dotsi","\\iiint":"\\dotsi","\\iiiint":"\\dotsi","\\idotsint":"\\dotsi","\\DOTSX":"\\dotsx"};f("\\dots",function(e){var t="\\dotso";var r=e.expandAfterFuture().text;if(r in c){t=c[r]}else if(r.substr(0,4)==="\\not"){t="\\dotsb"}else if(r in n.default.math){if(l.default.contains(["bin","rel"],n.default.math[r].group)){t="\\dotsb"}}return t});var d={")":true,"]":true,"\\rbrack":true,"\\}":true,"\\rbrace":true,"\\rangle":true,"\\rceil":true,"\\rfloor":true,"\\rgroup":true,"\\rmoustache":true,"\\right":true,"\\bigr":true,"\\biggr":true,"\\Bigr":true,"\\Biggr":true,$:true,";":true,".":true,",":true};f("\\dotso",function(e){var t=e.future().text;if(t in d){return"\\ldots\\,"}else{return"\\ldots"}});f("\\dotsc",function(e){var t=e.future().text;if(t in d&&t!==","){return"\\ldots\\,"}else{return"\\ldots"}});f("\\cdots",function(e){var t=e.future().text;if(t in d){return"\\@cdots\\,"}else{return"\\@cdots"}});f("\\dotsb","\\cdots");f("\\dotsm","\\cdots");f("\\dotsi","\\!\\cdots");f("\\dotsx","\\ldots\\,");f("\\DOTSI","\\relax");f("\\DOTSB","\\relax");f("\\DOTSX","\\relax");f("\\thinspace","\\,");f("\\medspace","\\:");f("\\thickspace","\\;");f("\\hspace","\\kern{#1}");f("\\ordinarycolon",":");f("\\vcentcolon","\\mathrel{\\mathop\\ordinarycolon}");f("\\dblcolon","\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon");f("\\coloneqq","\\vcentcolon\\mathrel{\\mkern-1.2mu}=");f("\\Coloneqq","\\dblcolon\\mathrel{\\mkern-1.2mu}=");f("\\coloneq","\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");f("\\Coloneq","\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}");f("\\eqqcolon","=\\mathrel{\\mkern-1.2mu}\\vcentcolon");f("\\Eqqcolon","=\\mathrel{\\mkern-1.2mu}\\dblcolon");f("\\eqcolon","\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon");f("\\Eqcolon","\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon");f("\\colonapprox","\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx");f("\\Colonapprox","\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx");f("\\colonsim","\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim");f("\\Colonsim","\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim");f("\\ratio","\\vcentcolon");f("\\coloncolon","\\dblcolon");f("\\colonequals","\\coloneqq");f("\\coloncolonequals","\\Coloneqq");f("\\equalscolon","\\eqqcolon");f("\\equalscoloncolon","\\Eqqcolon");f("\\colonminus","\\coloneq");f("\\coloncolonminus","\\Coloneq");f("\\minuscolon","\\eqcolon");f("\\minuscoloncolon","\\Eqcolon");f("\\coloncolonapprox","\\Colonapprox");f("\\coloncolonsim","\\Colonsim");f("\\simcolon","\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon");f("\\simcoloncolon","\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon");f("\\approxcolon","\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon");f("\\approxcoloncolon","\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon")},{"./Token":90,"./symbols":112,"./utils":115}],108:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/classCallCheck");var n=s(a);var i=e("babel-runtime/helpers/createClass");var l=s(i);var o=e("./utils");var u=s(o);function s(e){return e&&e.__esModule?e:{default:e}}var f=function(){function e(t,r){(0,n.default)(this,e);this.type=t;this.attributes={};this.children=r||[]}(0,l.default)(e,[{key:"setAttribute",value:function e(t,r){this.attributes[t]=r}},{key:"toNode",value:function e(){var t=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var r in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,r)){t.setAttribute(r,this.attributes[r])}}for(var a=0;a<this.children.length;a++){t.appendChild(this.children[a].toNode())}return t}},{key:"toMarkup",value:function e(){var t="<"+this.type;for(var r in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,r)){t+=" "+r+'="';t+=u.default.escape(this.attributes[r]);t+='"'}}t+=">";for(var a=0;a<this.children.length;a++){t+=this.children[a].toMarkup()}t+="</"+this.type+">";return t}}]);return e}();var c=function(){function e(t){(0,n.default)(this,e);this.text=t}(0,l.default)(e,[{key:"toNode",value:function e(){return document.createTextNode(this.text)}},{key:"toMarkup",value:function e(){return u.default.escape(this.text)}}]);return e}();r.default={MathNode:f,TextNode:c}},{"./utils":115,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9}],109:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("./Parser");var n=i(a);function i(e){return e&&e.__esModule?e:{default:e}}var l=function e(t,r){if(!(typeof t==="string"||t instanceof String)){throw new TypeError("KaTeX can only parse string typed expression")}var a=new n.default(t,r);return a.parse()};r.default=l},{"./Parser":86}],110:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=e("babel-runtime/helpers/slicedToArray");var n=v(a);var i=e("./domTree");var l=v(i);var o=e("./buildCommon");var u=v(o);var s=e("./mathMLTree");var f=v(s);var c=e("./utils");var d=v(c);function v(e){return e&&e.__esModule?e:{default:e}}var h={widehat:"^",widetilde:"~",undertilde:"~",overleftarrow:"\u2190",underleftarrow:"\u2190",xleftarrow:"\u2190",overrightarrow:"\u2192",underrightarrow:"\u2192",xrightarrow:"\u2192",underbrace:"\u23b5",overbrace:"\u23de",overleftrightarrow:"\u2194",underleftrightarrow:"\u2194",xleftrightarrow:"\u2194",Overrightarrow:"\u21d2",xRightarrow:"\u21d2",overleftharpoon:"\u21bc",xleftharpoonup:"\u21bc",overrightharpoon:"\u21c0",xrightharpoonup:"\u21c0",xLeftarrow:"\u21d0",xLeftrightarrow:"\u21d4",xhookleftarrow:"\u21a9",xhookrightarrow:"\u21aa",xmapsto:"\u21a6",xrightharpoondown:"\u21c1",xleftharpoondown:"\u21bd",xrightleftharpoons:"\u21cc",xleftrightharpoons:"\u21cb",xtwoheadleftarrow:"\u219e",xtwoheadrightarrow:"\u21a0",xLongequal:"=",xtofrom:"\u21c4"};var p=function e(t){var r=new f.default.MathNode("mo",[new f.default.TextNode(h[t.substr(1)])]);r.setAttribute("stretchy","true");return r};var m={overrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],overleftarrow:[["leftarrow"],.888,522,"xMinYMin"],underrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],underleftarrow:[["leftarrow"],.888,522,"xMinYMin"],xrightarrow:[["rightarrow"],1.469,522,"xMaxYMin"],xleftarrow:[["leftarrow"],1.469,522,"xMinYMin"],Overrightarrow:[["doublerightarrow"],.888,560,"xMaxYMin"],xRightarrow:[["doublerightarrow"],1.526,560,"xMaxYMin"],xLeftarrow:[["doubleleftarrow"],1.526,560,"xMinYMin"],overleftharpoon:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoonup:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoondown:[["leftharpoondown"],.888,522,"xMinYMin"],overrightharpoon:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoonup:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoondown:[["rightharpoondown"],.888,522,"xMaxYMin"],xLongequal:[["longequal"],.888,334,"xMinYMin"],xtwoheadleftarrow:[["twoheadleftarrow"],.888,334,"xMinYMin"],xtwoheadrightarrow:[["twoheadrightarrow"],.888,334,"xMaxYMin"],overleftrightarrow:[["leftarrow","rightarrow"],.888,522],overbrace:[["leftbrace","midbrace","rightbrace"],1.6,548],underbrace:[["leftbraceunder","midbraceunder","rightbraceunder"],1.6,548],underleftrightarrow:[["leftarrow","rightarrow"],.888,522],xleftrightarrow:[["leftarrow","rightarrow"],1.75,522],xLeftrightarrow:[["doubleleftarrow","doublerightarrow"],1.75,560],xrightleftharpoons:[["leftharpoondownplus","rightharpoonplus"],1.75,716],xleftrightharpoons:[["leftharpoonplus","rightharpoondownplus"],1.75,716],xhookleftarrow:[["leftarrow","righthook"],1.08,522],xhookrightarrow:[["lefthook","rightarrow"],1.08,522],overlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],underlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],overgroup:[["leftgroup","rightgroup"],.888,342],undergroup:[["leftgroupunder","rightgroupunder"],.888,342],xmapsto:[["leftmapsto","rightarrow"],1.5,522],xtofrom:[["leftToFrom","rightToFrom"],1.75,528]};var g=function e(t){if(t.type==="ordgroup"){return t.value.length}else{return 1}};var b=function e(t,r){var a=t.value.label.substr(1);var i=[];var o=void 0;var s=4e5;var f=0;var c=0;var v=void 0;var h=void 0;var p=void 0;var b=void 0;var y=void 0;if(d.default.contains(["widehat","widetilde","undertilde"],a)){var x=g(t.value.base);var w=void 0;if(x>5){w=a==="widehat"?420:312;s=a==="widehat"?2364:2340;o=a==="widehat"?.42:.34;p=(a==="widehat"?"widehat":"tilde")+"4"}else{var k=[1,1,2,2,3,3][x];if(a==="widehat"){s=[0,1062,2364,2364,2364][k];w=[0,239,300,360,420][k];o=[0,.24,.3,.3,.36,.42][k];p="widehat"+k}else{s=[0,600,1033,2339,2340][k];w=[0,260,286,306,312][k];o=[0,.26,.286,.3,.306,.34][k];p="tilde"+k}}v=new l.default.pathNode(p);i.push(["width","100%"]);i.push(["height",o+"em"]);i.push(["viewBox","0 0 "+s+" "+w]);i.push(["preserveAspectRatio","none"]);b=new l.default.svgNode([v],i);y=u.default.makeSpan([],[b],r)}else{var M=void 0;var _=void 0;var z=[];var S=(0,n.default)(m[a],4);h=S[0];c=S[1];f=S[2];_=S[3];var T=h.length;o=f/1e3;for(var A=0;A<T;A++){v=new l.default.pathNode(h[A]);i=[["width","400em"],["height",o+"em"]];i.push(["viewBox","0 0 "+s+" "+f]);if(T===2){M=["halfarrow-left","halfarrow-right"][A];_=["xMinYMin","xMaxYMin"][A]}else if(T===3){M=["brace-left","brace-center","brace-right"][A];_=["xMinYMin","xMidYMin","xMaxYMin"][A]}i.push(["preserveAspectRatio",_+" slice"]);b=new l.default.svgNode([v],i);if(T===1){y=u.default.makeSpan(["hide-tail"],[b],r)}else{y=u.default.makeSpan([M],[b],r);y.style.height=o+"em";z.push(y)}}if(T>1){y=u.default.makeSpan(["stretchy"],z,r)}}y.height=o;y.style.height=o+"em";if(c>0){y.style.minWidth=c+"em"}return y};var y=function e(t,r,a,n){var i=void 0;var o=t.height+t.depth+2*a;if(/(fbox)|(color)/.test(r)){i=u.default.makeSpan(["stretchy",r],[],n);if(r==="fbox"&&n.color){i.style.borderColor=n.getColor()}}else{var s=[["x1","0"]];var f=[];if(r!=="cancel"){s.push(["y1","0"]);s.push(["x2","100%"]);s.push(["y2","100%"]);s.push(["stroke-width","0.046em"]);f.push(new l.default.lineNode(s))}if(r==="xcancel"){s=[["x1","0"]]}if(r!=="bcancel"){s.push(["y1","100%"]);s.push(["x2","100%"]);s.push(["y2","0"]);s.push(["stroke-width","0.046em"]);f.push(new l.default.lineNode(s))}s=[["width","100%"],["height",o+"em"]];var c=new l.default.svgNode(f,s);i=u.default.makeSpan([],[c],n)}i.height=o;i.style.height=o+"em";return i};r.default={encloseSpan:y,mathMLnode:p,svgSpan:b}},{"./buildCommon":91,"./domTree":98,"./mathMLTree":108,"./utils":115,"babel-runtime/helpers/slicedToArray":10}],111:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a={sqrtMain:"M95 622c-2.667 0-7.167-2.667-13.5\n-8S72 604 72 600c0-2 .333-3.333 1-4 1.333-2.667 23.833-20.667 67.5-54s\n65.833-50.333 66.5-51c1.333-1.333 3-2 5-2 4.667 0 8.667 3.333 12 10l173\n378c.667 0 35.333-71 104-213s137.5-285 206.5-429S812 17.333 812 14c5.333\n-9.333 12-14 20-14h399166v40H845.272L620 507 385 993c-2.667 4.667-9 7-19\n7-6 0-10-1-12-3L160 575l-65 47zM834 0h399166v40H845z",sqrtSize1:"M263 601c.667 0 18 39.667 52 119s68.167\n 158.667 102.5 238 51.833 119.333 52.5 120C810 373.333 980.667 17.667 982 11\nc4.667-7.333 11-11 19-11h398999v40H1012.333L741 607c-38.667 80.667-84 175-136\n 283s-89.167 185.333-111.5 232-33.833 70.333-34.5 71c-4.667 4.667-12.333 7-23\n 7l-12-1-109-253c-72.667-168-109.333-252-110-252-10.667 8-22 16.667-34 26-22\n 17.333-33.333 26-34 26l-26-26 76-59 76-60zM1001 0h398999v40H1012z",sqrtSize2:"M1001 0h398999v40H1013.084S929.667 308 749\n 880s-277 876.333-289 913c-4.667 4.667-12.667 7-24 7h-12c-1.333-3.333-3.667\n-11.667-7-25-35.333-125.333-106.667-373.333-214-744-10 12-21 25-33 39l-32 39\nc-6-5.333-15-14-27-26l25-30c26.667-32.667 52-63 76-91l52-60 208 722c56-175.333\n 126.333-397.333 211-666s153.833-488.167 207.5-658.5C944.167 129.167 975 32.667\n 983 10c4-6.667 10-10 18-10zm0 0h398999v40H1013z",sqrtSize3:"M424 2398c-1.333-.667-38.5-172-111.5-514 S202.667 1370.667 202\n 1370c0-2-10.667 14.333-32 49-4.667 7.333-9.833 15.667-15.5 25s-9.833 16-12.5\n 20l-5 7c-4-3.333-8.333-7.667-13-13l-13-13 76-122 77-121 209 968c0-2 84.667\n-361.667 254-1079C896.333 373.667 981.667 13.333 983 10c4-6.667 10-10 18-10\nh398999v40H1014.622S927.332 418.667 742 1206c-185.333 787.333-279.333 1182.333\n-282 1185-2 6-10 9-24 9-8 0-12-.667-12-2zM1001 0h398999v40H1014z",sqrtSize4:"M473 2713C812.333 913.667 982.333 13 983 11c3.333-7.333 9.333\n-11 18-11h399110v40H1017.698S927.168 518 741.5 1506C555.833 2494 462 2989 460\n 2991c-2 6-10 9-24 9-8 0-12-.667-12-2s-5.333-32-16-92c-50.667-293.333-119.667\n-693.333-207-1200 0-1.333-5.333 8.667-16 30l-32 64-16 33-26-26 76-153 77-151\nc.667.667 35.667 202 105 604 67.333 400.667 102 602.667 104 606z\nM1001 0h398999v40H1017z",doubleleftarrow:"M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",doublerightarrow:"M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",leftarrow:"M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",leftbrace:"M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",leftbraceunder:"M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",leftgroup:"M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",leftgroupunder:"M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",leftharpoon:"M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",leftharpoonplus:"M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",leftharpoondown:"M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",leftharpoondownplus:"M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",lefthook:"M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",leftlinesegment:"M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",leftmapsto:"M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",leftToFrom:"M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",longequal:"M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",midbrace:"M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",midbraceunder:"M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",rightarrow:"M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",rightbrace:"M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",rightbraceunder:"M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",rightgroup:"M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",rightgroupunder:"M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",rightharpoon:"M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",rightharpoonplus:"M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",rightharpoondown:"M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",rightharpoondownplus:"M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",righthook:"M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",rightlinesegment:"M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",rightToFrom:"M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",twoheadleftarrow:"M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",twoheadrightarrow:"M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",tilde1:"M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",tilde2:"M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",tilde3:"M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",tilde4:"M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",widehat1:"M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",widehat2:"M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widehat3:"M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widehat4:"M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z"};r.default={path:a}},{}],112:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a={math:{},text:{}};r.default=a;function n(e,t,r,n,i,l){a[e][i]={font:t,group:r,replace:n};if(l&&n){a[e][n]=a[e][i]}}var i="math";var l="text";var o="main";var u="ams";var s="accent";var f="bin";var c="close";var d="inner";var v="mathord";var h="op";var p="open";var m="punct";var g="rel";var b="spacing";var y="textord";n(i,o,g,"\u2261","\\equiv");n(i,o,g,"\u227a","\\prec");n(i,o,g,"\u227b","\\succ");n(i,o,g,"\u223c","\\sim");n(i,o,g,"\u22a5","\\perp");n(i,o,g,"\u2aaf","\\preceq");n(i,o,g,"\u2ab0","\\succeq");n(i,o,g,"\u2243","\\simeq");n(i,o,g,"\u2223","\\mid");n(i,o,g,"\u226a","\\ll");n(i,o,g,"\u226b","\\gg");n(i,o,g,"\u224d","\\asymp");n(i,o,g,"\u2225","\\parallel");n(i,o,g,"\u22c8","\\bowtie");n(i,o,g,"\u2323","\\smile");n(i,o,g,"\u2291","\\sqsubseteq");
n(i,o,g,"\u2292","\\sqsupseteq");n(i,o,g,"\u2250","\\doteq");n(i,o,g,"\u2322","\\frown");n(i,o,g,"\u220b","\\ni");n(i,o,g,"\u221d","\\propto");n(i,o,g,"\u22a2","\\vdash");n(i,o,g,"\u22a3","\\dashv");n(i,o,g,"\u220b","\\owns");n(i,o,m,".","\\ldotp");n(i,o,m,"\u22c5","\\cdotp");n(i,o,y,"#","\\#");n(l,o,y,"#","\\#");n(i,o,y,"&","\\&");n(l,o,y,"&","\\&");n(i,o,y,"\u2135","\\aleph");n(i,o,y,"\u2200","\\forall");n(i,o,y,"\u210f","\\hbar");n(i,o,y,"\u2203","\\exists");n(i,o,y,"\u2207","\\nabla");n(i,o,y,"\u266d","\\flat");n(i,o,y,"\u2113","\\ell");n(i,o,y,"\u266e","\\natural");n(i,o,y,"\u2663","\\clubsuit");n(i,o,y,"\u2118","\\wp");n(i,o,y,"\u266f","\\sharp");n(i,o,y,"\u2662","\\diamondsuit");n(i,o,y,"\u211c","\\Re");n(i,o,y,"\u2661","\\heartsuit");n(i,o,y,"\u2111","\\Im");n(i,o,y,"\u2660","\\spadesuit");n(i,o,y,"\u2020","\\dag");n(l,o,y,"\u2020","\\dag");n(l,o,y,"\u2020","\\textdagger");n(i,o,y,"\u2021","\\ddag");n(l,o,y,"\u2021","\\ddag");n(l,o,y,"\u2020","\\textdaggerdbl");n(i,o,c,"\u23b1","\\rmoustache");n(i,o,p,"\u23b0","\\lmoustache");n(i,o,c,"\u27ef","\\rgroup");n(i,o,p,"\u27ee","\\lgroup");n(i,o,f,"\u2213","\\mp");n(i,o,f,"\u2296","\\ominus");n(i,o,f,"\u228e","\\uplus");n(i,o,f,"\u2293","\\sqcap");n(i,o,f,"\u2217","\\ast");n(i,o,f,"\u2294","\\sqcup");n(i,o,f,"\u25ef","\\bigcirc");n(i,o,f,"\u2219","\\bullet");n(i,o,f,"\u2021","\\ddagger");n(i,o,f,"\u2240","\\wr");n(i,o,f,"\u2a3f","\\amalg");n(i,o,f,"&","\\And");n(i,o,g,"\u27f5","\\longleftarrow");n(i,o,g,"\u21d0","\\Leftarrow");n(i,o,g,"\u27f8","\\Longleftarrow");n(i,o,g,"\u27f6","\\longrightarrow");n(i,o,g,"\u21d2","\\Rightarrow");n(i,o,g,"\u27f9","\\Longrightarrow");n(i,o,g,"\u2194","\\leftrightarrow");n(i,o,g,"\u27f7","\\longleftrightarrow");n(i,o,g,"\u21d4","\\Leftrightarrow");n(i,o,g,"\u27fa","\\Longleftrightarrow");n(i,o,g,"\u21a6","\\mapsto");n(i,o,g,"\u27fc","\\longmapsto");n(i,o,g,"\u2197","\\nearrow");n(i,o,g,"\u21a9","\\hookleftarrow");n(i,o,g,"\u21aa","\\hookrightarrow");n(i,o,g,"\u2198","\\searrow");n(i,o,g,"\u21bc","\\leftharpoonup");n(i,o,g,"\u21c0","\\rightharpoonup");n(i,o,g,"\u2199","\\swarrow");n(i,o,g,"\u21bd","\\leftharpoondown");n(i,o,g,"\u21c1","\\rightharpoondown");n(i,o,g,"\u2196","\\nwarrow");n(i,o,g,"\u21cc","\\rightleftharpoons");n(i,u,g,"\u226e","\\nless");n(i,u,g,"\ue010","\\nleqslant");n(i,u,g,"\ue011","\\nleqq");n(i,u,g,"\u2a87","\\lneq");n(i,u,g,"\u2268","\\lneqq");n(i,u,g,"\ue00c","\\lvertneqq");n(i,u,g,"\u22e6","\\lnsim");n(i,u,g,"\u2a89","\\lnapprox");n(i,u,g,"\u2280","\\nprec");n(i,u,g,"\u22e0","\\npreceq");n(i,u,g,"\u22e8","\\precnsim");n(i,u,g,"\u2ab9","\\precnapprox");n(i,u,g,"\u2241","\\nsim");n(i,u,g,"\ue006","\\nshortmid");n(i,u,g,"\u2224","\\nmid");n(i,u,g,"\u22ac","\\nvdash");n(i,u,g,"\u22ad","\\nvDash");n(i,u,g,"\u22ea","\\ntriangleleft");n(i,u,g,"\u22ec","\\ntrianglelefteq");n(i,u,g,"\u228a","\\subsetneq");n(i,u,g,"\ue01a","\\varsubsetneq");n(i,u,g,"\u2acb","\\subsetneqq");n(i,u,g,"\ue017","\\varsubsetneqq");n(i,u,g,"\u226f","\\ngtr");n(i,u,g,"\ue00f","\\ngeqslant");n(i,u,g,"\ue00e","\\ngeqq");n(i,u,g,"\u2a88","\\gneq");n(i,u,g,"\u2269","\\gneqq");n(i,u,g,"\ue00d","\\gvertneqq");n(i,u,g,"\u22e7","\\gnsim");n(i,u,g,"\u2a8a","\\gnapprox");n(i,u,g,"\u2281","\\nsucc");n(i,u,g,"\u22e1","\\nsucceq");n(i,u,g,"\u22e9","\\succnsim");n(i,u,g,"\u2aba","\\succnapprox");n(i,u,g,"\u2246","\\ncong");n(i,u,g,"\ue007","\\nshortparallel");n(i,u,g,"\u2226","\\nparallel");n(i,u,g,"\u22af","\\nVDash");n(i,u,g,"\u22eb","\\ntriangleright");n(i,u,g,"\u22ed","\\ntrianglerighteq");n(i,u,g,"\ue018","\\nsupseteqq");n(i,u,g,"\u228b","\\supsetneq");n(i,u,g,"\ue01b","\\varsupsetneq");n(i,u,g,"\u2acc","\\supsetneqq");n(i,u,g,"\ue019","\\varsupsetneqq");n(i,u,g,"\u22ae","\\nVdash");n(i,u,g,"\u2ab5","\\precneqq");n(i,u,g,"\u2ab6","\\succneqq");n(i,u,g,"\ue016","\\nsubseteqq");n(i,u,f,"\u22b4","\\unlhd");n(i,u,f,"\u22b5","\\unrhd");n(i,u,g,"\u219a","\\nleftarrow");n(i,u,g,"\u219b","\\nrightarrow");n(i,u,g,"\u21cd","\\nLeftarrow");n(i,u,g,"\u21cf","\\nRightarrow");n(i,u,g,"\u21ae","\\nleftrightarrow");n(i,u,g,"\u21ce","\\nLeftrightarrow");n(i,u,g,"\u25b3","\\vartriangle");n(i,u,y,"\u210f","\\hslash");n(i,u,y,"\u25bd","\\triangledown");n(i,u,y,"\u25ca","\\lozenge");n(i,u,y,"\u24c8","\\circledS");n(i,u,y,"\xae","\\circledR");n(l,u,y,"\xae","\\circledR");n(i,u,y,"\u2221","\\measuredangle");n(i,u,y,"\u2204","\\nexists");n(i,u,y,"\u2127","\\mho");n(i,u,y,"\u2132","\\Finv");n(i,u,y,"\u2141","\\Game");n(i,u,y,"k","\\Bbbk");n(i,u,y,"\u2035","\\backprime");n(i,u,y,"\u25b2","\\blacktriangle");n(i,u,y,"\u25bc","\\blacktriangledown");n(i,u,y,"\u25a0","\\blacksquare");n(i,u,y,"\u29eb","\\blacklozenge");n(i,u,y,"\u2605","\\bigstar");n(i,u,y,"\u2222","\\sphericalangle");n(i,u,y,"\u2201","\\complement");n(i,u,y,"\xf0","\\eth");n(i,u,y,"\u2571","\\diagup");n(i,u,y,"\u2572","\\diagdown");n(i,u,y,"\u25a1","\\square");n(i,u,y,"\u25a1","\\Box");n(i,u,y,"\u25ca","\\Diamond");n(i,u,y,"\xa5","\\yen");n(i,u,y,"\u2713","\\checkmark");n(l,u,y,"\u2713","\\checkmark");n(i,u,y,"\u2136","\\beth");n(i,u,y,"\u2138","\\daleth");n(i,u,y,"\u2137","\\gimel");n(i,u,y,"\u03dd","\\digamma");n(i,u,y,"\u03f0","\\varkappa");n(i,u,p,"\u250c","\\ulcorner");n(i,u,c,"\u2510","\\urcorner");n(i,u,p,"\u2514","\\llcorner");n(i,u,c,"\u2518","\\lrcorner");n(i,u,g,"\u2266","\\leqq");n(i,u,g,"\u2a7d","\\leqslant");n(i,u,g,"\u2a95","\\eqslantless");n(i,u,g,"\u2272","\\lesssim");n(i,u,g,"\u2a85","\\lessapprox");n(i,u,g,"\u224a","\\approxeq");n(i,u,f,"\u22d6","\\lessdot");n(i,u,g,"\u22d8","\\lll");n(i,u,g,"\u2276","\\lessgtr");n(i,u,g,"\u22da","\\lesseqgtr");n(i,u,g,"\u2a8b","\\lesseqqgtr");n(i,u,g,"\u2251","\\doteqdot");n(i,u,g,"\u2253","\\risingdotseq");n(i,u,g,"\u2252","\\fallingdotseq");n(i,u,g,"\u223d","\\backsim");n(i,u,g,"\u22cd","\\backsimeq");n(i,u,g,"\u2ac5","\\subseteqq");n(i,u,g,"\u22d0","\\Subset");n(i,u,g,"\u228f","\\sqsubset");n(i,u,g,"\u227c","\\preccurlyeq");n(i,u,g,"\u22de","\\curlyeqprec");n(i,u,g,"\u227e","\\precsim");n(i,u,g,"\u2ab7","\\precapprox");n(i,u,g,"\u22b2","\\vartriangleleft");n(i,u,g,"\u22b4","\\trianglelefteq");n(i,u,g,"\u22a8","\\vDash");n(i,u,g,"\u22aa","\\Vvdash");n(i,u,g,"\u2323","\\smallsmile");n(i,u,g,"\u2322","\\smallfrown");n(i,u,g,"\u224f","\\bumpeq");n(i,u,g,"\u224e","\\Bumpeq");n(i,u,g,"\u2267","\\geqq");n(i,u,g,"\u2a7e","\\geqslant");n(i,u,g,"\u2a96","\\eqslantgtr");n(i,u,g,"\u2273","\\gtrsim");n(i,u,g,"\u2a86","\\gtrapprox");n(i,u,f,"\u22d7","\\gtrdot");n(i,u,g,"\u22d9","\\ggg");n(i,u,g,"\u2277","\\gtrless");n(i,u,g,"\u22db","\\gtreqless");n(i,u,g,"\u2a8c","\\gtreqqless");n(i,u,g,"\u2256","\\eqcirc");n(i,u,g,"\u2257","\\circeq");n(i,u,g,"\u225c","\\triangleq");n(i,u,g,"\u223c","\\thicksim");n(i,u,g,"\u2248","\\thickapprox");n(i,u,g,"\u2ac6","\\supseteqq");n(i,u,g,"\u22d1","\\Supset");n(i,u,g,"\u2290","\\sqsupset");n(i,u,g,"\u227d","\\succcurlyeq");n(i,u,g,"\u22df","\\curlyeqsucc");n(i,u,g,"\u227f","\\succsim");n(i,u,g,"\u2ab8","\\succapprox");n(i,u,g,"\u22b3","\\vartriangleright");n(i,u,g,"\u22b5","\\trianglerighteq");n(i,u,g,"\u22a9","\\Vdash");n(i,u,g,"\u2223","\\shortmid");n(i,u,g,"\u2225","\\shortparallel");n(i,u,g,"\u226c","\\between");n(i,u,g,"\u22d4","\\pitchfork");n(i,u,g,"\u221d","\\varpropto");n(i,u,g,"\u25c0","\\blacktriangleleft");n(i,u,g,"\u2234","\\therefore");n(i,u,g,"\u220d","\\backepsilon");n(i,u,g,"\u25b6","\\blacktriangleright");n(i,u,g,"\u2235","\\because");n(i,u,g,"\u22d8","\\llless");n(i,u,g,"\u22d9","\\gggtr");n(i,u,f,"\u22b2","\\lhd");n(i,u,f,"\u22b3","\\rhd");n(i,u,g,"\u2242","\\eqsim");n(i,o,g,"\u22c8","\\Join");n(i,u,g,"\u2251","\\Doteq");n(i,u,f,"\u2214","\\dotplus");n(i,u,f,"\u2216","\\smallsetminus");n(i,u,f,"\u22d2","\\Cap");n(i,u,f,"\u22d3","\\Cup");n(i,u,f,"\u2a5e","\\doublebarwedge");n(i,u,f,"\u229f","\\boxminus");n(i,u,f,"\u229e","\\boxplus");n(i,u,f,"\u22c7","\\divideontimes");n(i,u,f,"\u22c9","\\ltimes");n(i,u,f,"\u22ca","\\rtimes");n(i,u,f,"\u22cb","\\leftthreetimes");n(i,u,f,"\u22cc","\\rightthreetimes");n(i,u,f,"\u22cf","\\curlywedge");n(i,u,f,"\u22ce","\\curlyvee");n(i,u,f,"\u229d","\\circleddash");n(i,u,f,"\u229b","\\circledast");n(i,u,f,"\u22c5","\\centerdot");n(i,u,f,"\u22ba","\\intercal");n(i,u,f,"\u22d2","\\doublecap");n(i,u,f,"\u22d3","\\doublecup");n(i,u,f,"\u22a0","\\boxtimes");n(i,u,g,"\u21e2","\\dashrightarrow");n(i,u,g,"\u21e0","\\dashleftarrow");n(i,u,g,"\u21c7","\\leftleftarrows");n(i,u,g,"\u21c6","\\leftrightarrows");n(i,u,g,"\u21da","\\Lleftarrow");n(i,u,g,"\u219e","\\twoheadleftarrow");n(i,u,g,"\u21a2","\\leftarrowtail");n(i,u,g,"\u21ab","\\looparrowleft");n(i,u,g,"\u21cb","\\leftrightharpoons");n(i,u,g,"\u21b6","\\curvearrowleft");n(i,u,g,"\u21ba","\\circlearrowleft");n(i,u,g,"\u21b0","\\Lsh");n(i,u,g,"\u21c8","\\upuparrows");n(i,u,g,"\u21bf","\\upharpoonleft");n(i,u,g,"\u21c3","\\downharpoonleft");n(i,u,g,"\u22b8","\\multimap");n(i,u,g,"\u21ad","\\leftrightsquigarrow");n(i,u,g,"\u21c9","\\rightrightarrows");n(i,u,g,"\u21c4","\\rightleftarrows");n(i,u,g,"\u21a0","\\twoheadrightarrow");n(i,u,g,"\u21a3","\\rightarrowtail");n(i,u,g,"\u21ac","\\looparrowright");n(i,u,g,"\u21b7","\\curvearrowright");n(i,u,g,"\u21bb","\\circlearrowright");n(i,u,g,"\u21b1","\\Rsh");n(i,u,g,"\u21ca","\\downdownarrows");n(i,u,g,"\u21be","\\upharpoonright");n(i,u,g,"\u21c2","\\downharpoonright");n(i,u,g,"\u21dd","\\rightsquigarrow");n(i,u,g,"\u21dd","\\leadsto");n(i,u,g,"\u21db","\\Rrightarrow");n(i,u,g,"\u21be","\\restriction");n(i,o,y,"\u2018","`");n(i,o,y,"$","\\$");n(l,o,y,"$","\\$");n(l,o,y,"$","\\textdollar");n(i,o,y,"%","\\%");n(l,o,y,"%","\\%");n(i,o,y,"_","\\_");n(l,o,y,"_","\\_");n(l,o,y,"_","\\textunderscore");n(i,o,y,"\u2220","\\angle");n(i,o,y,"\u221e","\\infty");n(i,o,y,"\u2032","\\prime");n(i,o,y,"\u25b3","\\triangle");n(i,o,y,"\u0393","\\Gamma",true);n(i,o,y,"\u0394","\\Delta",true);n(i,o,y,"\u0398","\\Theta",true);n(i,o,y,"\u039b","\\Lambda",true);n(i,o,y,"\u039e","\\Xi",true);n(i,o,y,"\u03a0","\\Pi",true);n(i,o,y,"\u03a3","\\Sigma",true);n(i,o,y,"\u03a5","\\Upsilon",true);n(i,o,y,"\u03a6","\\Phi",true);n(i,o,y,"\u03a8","\\Psi",true);n(i,o,y,"\u03a9","\\Omega",true);n(i,o,y,"\xac","\\neg");n(i,o,y,"\xac","\\lnot");n(i,o,y,"\u22a4","\\top");n(i,o,y,"\u22a5","\\bot");n(i,o,y,"\u2205","\\emptyset");n(i,u,y,"\u2205","\\varnothing");n(i,o,v,"\u03b1","\\alpha",true);n(i,o,v,"\u03b2","\\beta",true);n(i,o,v,"\u03b3","\\gamma",true);n(i,o,v,"\u03b4","\\delta",true);n(i,o,v,"\u03f5","\\epsilon",true);n(i,o,v,"\u03b6","\\zeta",true);n(i,o,v,"\u03b7","\\eta",true);n(i,o,v,"\u03b8","\\theta",true);n(i,o,v,"\u03b9","\\iota",true);n(i,o,v,"\u03ba","\\kappa",true);n(i,o,v,"\u03bb","\\lambda",true);n(i,o,v,"\u03bc","\\mu",true);n(i,o,v,"\u03bd","\\nu",true);n(i,o,v,"\u03be","\\xi",true);n(i,o,v,"\u03bf","\\omicron",true);n(i,o,v,"\u03c0","\\pi",true);n(i,o,v,"\u03c1","\\rho",true);n(i,o,v,"\u03c3","\\sigma",true);n(i,o,v,"\u03c4","\\tau",true);n(i,o,v,"\u03c5","\\upsilon",true);n(i,o,v,"\u03d5","\\phi",true);n(i,o,v,"\u03c7","\\chi",true);n(i,o,v,"\u03c8","\\psi",true);n(i,o,v,"\u03c9","\\omega",true);n(i,o,v,"\u03b5","\\varepsilon",true);n(i,o,v,"\u03d1","\\vartheta",true);n(i,o,v,"\u03d6","\\varpi",true);n(i,o,v,"\u03f1","\\varrho",true);n(i,o,v,"\u03c2","\\varsigma",true);n(i,o,v,"\u03c6","\\varphi",true);n(i,o,f,"\u2217","*");n(i,o,f,"+","+");n(i,o,f,"\u2212","-");n(i,o,f,"\u22c5","\\cdot");n(i,o,f,"\u2218","\\circ");n(i,o,f,"\xf7","\\div");n(i,o,f,"\xb1","\\pm");n(i,o,f,"\xd7","\\times");n(i,o,f,"\u2229","\\cap");n(i,o,f,"\u222a","\\cup");n(i,o,f,"\u2216","\\setminus");n(i,o,f,"\u2227","\\land");n(i,o,f,"\u2228","\\lor");n(i,o,f,"\u2227","\\wedge");n(i,o,f,"\u2228","\\vee");n(i,o,y,"\u221a","\\surd");n(i,o,p,"(","(");n(i,o,p,"[","[");n(i,o,p,"\u27e8","\\langle");n(i,o,p,"\u2223","\\lvert");n(i,o,p,"\u2225","\\lVert");n(i,o,c,")",")");n(i,o,c,"]","]");n(i,o,c,"?","?");n(i,o,c,"!","!");n(i,o,c,"\u27e9","\\rangle");n(i,o,c,"\u2223","\\rvert");n(i,o,c,"\u2225","\\rVert");n(i,o,g,"=","=");n(i,o,g,"<","<");n(i,o,g,">",">");n(i,o,g,":",":");n(i,o,g,"\u2248","\\approx");n(i,o,g,"\u2245","\\cong");n(i,o,g,"\u2265","\\ge");n(i,o,g,"\u2265","\\geq");n(i,o,g,"\u2190","\\gets");n(i,o,g,">","\\gt");n(i,o,g,"\u2208","\\in");n(i,o,g,"\u2209","\\notin");n(i,o,g,"\u0338","\\not");n(i,o,g,"\u2282","\\subset");n(i,o,g,"\u2283","\\supset");n(i,o,g,"\u2286","\\subseteq");n(i,o,g,"\u2287","\\supseteq");n(i,u,g,"\u2288","\\nsubseteq");n(i,u,g,"\u2289","\\nsupseteq");n(i,o,g,"\u22a8","\\models");n(i,o,g,"\u2190","\\leftarrow");n(i,o,g,"\u2264","\\le");n(i,o,g,"\u2264","\\leq");n(i,o,g,"<","\\lt");n(i,o,g,"\u2260","\\ne");n(i,o,g,"\u2260","\\neq");n(i,o,g,"\u2192","\\rightarrow");n(i,o,g,"\u2192","\\to");n(i,u,g,"\u2271","\\ngeq");n(i,u,g,"\u2270","\\nleq");n(i,o,b,null,"\\!");n(i,o,b,"\xa0","\\ ");n(i,o,b,"\xa0","~");n(i,o,b,null,"\\,");n(i,o,b,null,"\\:");n(i,o,b,null,"\\;");n(i,o,b,null,"\\enspace");n(i,o,b,null,"\\qquad");n(i,o,b,null,"\\quad");n(i,o,b,"\xa0","\\space");n(i,o,m,",",",");n(i,o,m,";",";");n(i,o,m,":","\\colon");n(i,u,f,"\u22bc","\\barwedge");n(i,u,f,"\u22bb","\\veebar");n(i,o,f,"\u2299","\\odot");n(i,o,f,"\u2295","\\oplus");n(i,o,f,"\u2297","\\otimes");n(i,o,y,"\u2202","\\partial");n(i,o,f,"\u2298","\\oslash");n(i,u,f,"\u229a","\\circledcirc");n(i,u,f,"\u22a1","\\boxdot");n(i,o,f,"\u25b3","\\bigtriangleup");n(i,o,f,"\u25bd","\\bigtriangledown");n(i,o,f,"\u2020","\\dagger");n(i,o,f,"\u22c4","\\diamond");n(i,o,f,"\u22c6","\\star");n(i,o,f,"\u25c3","\\triangleleft");n(i,o,f,"\u25b9","\\triangleright");n(i,o,p,"{","\\{");n(l,o,y,"{","\\{");n(l,o,y,"{","\\textbraceleft");n(i,o,c,"}","\\}");n(l,o,y,"}","\\}");n(l,o,y,"}","\\textbraceright");n(i,o,p,"{","\\lbrace");n(i,o,c,"}","\\rbrace");n(i,o,p,"[","\\lbrack");n(i,o,c,"]","\\rbrack");n(l,o,y,"<","\\textless");n(l,o,y,">","\\textgreater");n(i,o,p,"\u230a","\\lfloor");n(i,o,c,"\u230b","\\rfloor");n(i,o,p,"\u2308","\\lceil");n(i,o,c,"\u2309","\\rceil");n(i,o,y,"\\","\\backslash");n(i,o,y,"\u2223","|");n(i,o,y,"\u2223","\\vert");n(l,o,y,"|","\\textbar");n(i,o,y,"\u2225","\\|");n(i,o,y,"\u2225","\\Vert");n(l,o,y,"\u2225","\\textbardbl");n(i,o,g,"\u2191","\\uparrow");n(i,o,g,"\u21d1","\\Uparrow");n(i,o,g,"\u2193","\\downarrow");n(i,o,g,"\u21d3","\\Downarrow");n(i,o,g,"\u2195","\\updownarrow");n(i,o,g,"\u21d5","\\Updownarrow");n(i,o,h,"\u2210","\\coprod");n(i,o,h,"\u22c1","\\bigvee");n(i,o,h,"\u22c0","\\bigwedge");n(i,o,h,"\u2a04","\\biguplus");n(i,o,h,"\u22c2","\\bigcap");n(i,o,h,"\u22c3","\\bigcup");n(i,o,h,"\u222b","\\int");n(i,o,h,"\u222b","\\intop");n(i,o,h,"\u222c","\\iint");n(i,o,h,"\u222d","\\iiint");n(i,o,h,"\u220f","\\prod");n(i,o,h,"\u2211","\\sum");n(i,o,h,"\u2a02","\\bigotimes");n(i,o,h,"\u2a01","\\bigoplus");n(i,o,h,"\u2a00","\\bigodot");n(i,o,h,"\u222e","\\oint");n(i,o,h,"\u2a06","\\bigsqcup");n(i,o,h,"\u222b","\\smallint");n(l,o,d,"\u2026","\\textellipsis");n(i,o,d,"\u2026","\\mathellipsis");n(l,o,d,"\u2026","\\ldots",true);n(i,o,d,"\u2026","\\ldots",true);n(i,o,d,"\u22ef","\\@cdots",true);n(i,o,d,"\u22f1","\\ddots",true);n(i,o,y,"\u22ee","\\vdots",true);n(i,o,s,"\xb4","\\acute");n(i,o,s,"`","\\grave");n(i,o,s,"\xa8","\\ddot");n(i,o,s,"~","\\tilde");n(i,o,s,"\xaf","\\bar");n(i,o,s,"\u02d8","\\breve");n(i,o,s,"\u02c7","\\check");n(i,o,s,"^","\\hat");n(i,o,s,"\u20d7","\\vec");n(i,o,s,"\u02d9","\\dot");n(i,o,v,"\u0131","\\imath");n(i,o,v,"\u0237","\\jmath");n(l,o,s,"\u02ca","\\'");n(l,o,s,"\u02cb","\\`");n(l,o,s,"\u02c6","\\^");n(l,o,s,"\u02dc","\\~");n(l,o,s,"\u02c9","\\=");n(l,o,s,"\u02d8","\\u");n(l,o,s,"\u02d9","\\.");n(l,o,s,"\u02da","\\r");n(l,o,s,"\u02c7","\\v");n(l,o,s,"\xa8",'\\"');n(l,o,s,"\u030b","\\H");n(l,o,y,"\u2013","--");n(l,o,y,"\u2013","\\textendash");n(l,o,y,"\u2014","---");n(l,o,y,"\u2014","\\textemdash");n(l,o,y,"\u2018","`");n(l,o,y,"\u2018","\\textquoteleft");n(l,o,y,"\u2019","'");n(l,o,y,"\u2019","\\textquoteright");n(l,o,y,"\u201c","``");n(l,o,y,"\u201c","\\textquotedblleft");n(l,o,y,"\u201d","''");n(l,o,y,"\u201d","\\textquotedblright");n(i,o,y,"\xb0","\\degree");n(l,o,y,"\xb0","\\degree");n(i,o,v,"\xa3","\\pounds");n(i,o,v,"\xa3","\\mathsterling");n(l,o,v,"\xa3","\\pounds");n(l,o,v,"\xa3","\\textsterling");n(i,u,y,"\u2720","\\maltese");n(l,u,y,"\u2720","\\maltese");n(l,o,b,"\xa0","\\ ");n(l,o,b,"\xa0"," ");n(l,o,b,"\xa0","~");var x='0123456789/@."';for(var w=0;w<x.length;w++){var k=x.charAt(w);n(i,o,y,k,k)}var M='0123456789!@*()-=+[]<>|";:?/.,';for(var _=0;_<M.length;_++){var z=M.charAt(_);n(l,o,y,z,z)}var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var T=0;T<S.length;T++){var A=S.charAt(T);n(i,o,v,A,A);n(l,o,y,A,A)}for(var C=192;C<=214;C++){var N=String.fromCharCode(C);n(i,o,v,N,N);n(l,o,y,N,N)}for(var O=216;O<=246;O++){var j=String.fromCharCode(O);n(i,o,v,j,j);n(l,o,y,j,j)}for(var E=248;E<=255;E++){var L=String.fromCharCode(E);n(i,o,v,L,L);n(l,o,y,L,L)}for(var q=1040;q<=1103;q++){var P=String.fromCharCode(q);n(l,o,y,P,P)}n(l,o,y,"\u2013","\u2013");n(l,o,y,"\u2014","\u2014");n(l,o,y,"\u2018","\u2018");n(l,o,y,"\u2019","\u2019");n(l,o,y,"\u201c","\u201c");n(l,o,y,"\u201d","\u201d")},{}],113:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=r.hangulRegex=/[\uAC00-\uD7AF]/;var n=r.cjkRegex=/[\u3000-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF\uFF00-\uFF60]/},{}],114:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});r.calculateSize=r.validUnit=undefined;var a=e("./ParseError");var n=o(a);var i=e("./Options");var l=o(i);function o(e){return e&&e.__esModule?e:{default:e}}var u={pt:1,mm:7227/2540,cm:7227/254,in:72.27,bp:803/800,pc:12,dd:1238/1157,cc:14856/1157,nd:685/642,nc:1370/107,sp:1/65536,px:803/800};var s={ex:true,em:true,mu:true};var f=r.validUnit=function e(t){if(typeof t!=="string"){t=t.unit}return t in u||t in s||t==="ex"};var c=r.calculateSize=function e(t,r){var a=void 0;if(t.unit in u){a=u[t.unit]/r.fontMetrics().ptPerEm/r.sizeMultiplier}else if(t.unit==="mu"){a=r.fontMetrics().cssEmPerMu}else{var i=void 0;if(r.style.isTight()){i=r.havingStyle(r.style.text())}else{i=r}if(t.unit==="ex"){a=i.fontMetrics().xHeight}else if(t.unit==="em"){a=i.fontMetrics().quad}else{throw new n.default("Invalid unit: '"+t.unit+"'")}if(i!==r){a*=i.sizeMultiplier/r.sizeMultiplier}}return Math.min(t.number*a,r.maxSize)}},{"./Options":83,"./ParseError":84}],115:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var a=Array.prototype.indexOf;var n=function e(t,r){if(t==null){return-1}if(a&&t.indexOf===a){return t.indexOf(r)}var n=t.length;for(var i=0;i<n;i++){if(t[i]===r){return i}}return-1};var i=function e(t,r){return n(t,r)!==-1};var l=function e(t,r){return t===undefined?r:t};var o=/([A-Z])/g;var u=function e(t){return t.replace(o,"-$1").toLowerCase()};var s={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"};var f=/[&><"']/g;function c(e){return String(e).replace(f,function(e){return s[e]})}var d=void 0;if(typeof document!=="undefined"){var v=document.createElement("span");if("textContent"in v){d=function e(t,r){t.textContent=r}}else{d=function e(t,r){t.innerText=r}}}function h(e){d(e,"")}r.default={contains:i,deflt:l,escape:c,hyphenate:u,indexOf:n,setTextContent:d,clearNode:h}},{}]},{},[1])(1)});

(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.renderMathInElement=e()}})(function(){var e,t,r;return function e(t,r,n){function o(a,c){if(!r[a]){if(!t[a]){var u=typeof require=="function"&&require;if(!c&&u)return u(a,!0);if(i)return i(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var s=r[a]={exports:{}};t[a][0].call(s.exports,function(e){var r=t[a][1][e];return o(r?r:e)},s,s.exports,e,t,r,n)}return r[a].exports}var i=typeof require=="function"&&require;for(var a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,t,r){"use strict";var n=e("babel-runtime/core-js/object/assign");var o=c(n);var i=e("./splitAtDelimiters");var a=c(i);function c(e){return e&&e.__esModule?e:{default:e}}var u=function e(t,r){var n=[{type:"text",data:t}];for(var o=0;o<r.length;o++){var i=r[o];n=(0,a.default)(n,i.left,i.right,i.display||false)}return n};var f=function e(t,r){var n=u(t,r.delimiters);var o=document.createDocumentFragment();for(var i=0;i<n.length;i++){if(n[i].type==="text"){o.appendChild(document.createTextNode(n[i].data))}else{var a=document.createElement("span");var c=n[i].data;r.displayMode=n[i].display;try{katex.render(c,a,r)}catch(e){if(!(e instanceof katex.ParseError)){throw e}r.errorCallback("KaTeX auto-render: Failed to parse `"+n[i].data+"` with ",e);o.appendChild(document.createTextNode(n[i].rawData));continue}o.appendChild(a)}}return o};var s=function e(t,r){for(var n=0;n<t.childNodes.length;n++){var o=t.childNodes[n];if(o.nodeType===3){var i=f(o.textContent,r);n+=i.childNodes.length-1;t.replaceChild(i,o)}else if(o.nodeType===1){var a=r.ignoredTags.indexOf(o.nodeName.toLowerCase())===-1;if(a){e(o,r)}}}};var l={delimiters:[{left:"$$",right:"$$",display:true},{left:"\\[",right:"\\]",display:true},{left:"\\(",right:"\\)",display:false}],ignoredTags:["script","noscript","style","textarea","pre","code"],errorCallback:function e(t,r){console.error(t,r)}};var p=function e(t,r){if(!t){throw new Error("No element provided to render")}var n=(0,o.default)({},l,r);s(t,n)};t.exports=p},{"./splitAtDelimiters":2,"babel-runtime/core-js/object/assign":3}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});var n=function e(t,r,n){var o=n;var i=0;var a=t.length;while(o<r.length){var c=r[o];if(i<=0&&r.slice(o,o+a)===t){return o}else if(c==="\\"){o++}else if(c==="{"){i++}else if(c==="}"){i--}o++}return-1};var o=function e(t,r,o,i){var a=[];for(var c=0;c<t.length;c++){if(t[c].type==="text"){var u=t[c].data;var f=true;var s=0;var l=void 0;l=u.indexOf(r);if(l!==-1){s=l;a.push({type:"text",data:u.slice(0,s)});f=false}while(true){if(f){l=u.indexOf(r,s);if(l===-1){break}a.push({type:"text",data:u.slice(s,l)});s=l}else{l=n(o,u,s+r.length);if(l===-1){break}a.push({type:"math",data:u.slice(s+r.length,l),rawData:u.slice(s,l+o.length),display:i});s=l+o.length}f=!f}a.push({type:"text",data:u.slice(s)})}else{a.push(t[c])}}return a};r.default=o},{}],3:[function(e,t,r){t.exports={default:e("core-js/library/fn/object/assign"),__esModule:true}},{"core-js/library/fn/object/assign":4}],4:[function(e,t,r){e("../../modules/es6.object.assign");t.exports=e("../../modules/_core").Object.assign},{"../../modules/_core":9,"../../modules/es6.object.assign":39}],5:[function(e,t,r){t.exports=function(e){if(typeof e!="function")throw TypeError(e+" is not a function!");return e}},{}],6:[function(e,t,r){var n=e("./_is-object");t.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":22}],7:[function(e,t,r){var n=e("./_to-iobject");var o=e("./_to-length");var i=e("./_to-absolute-index");t.exports=function(e){return function(t,r,a){var c=n(t);var u=o(c.length);var f=i(a,u);var s;if(e&&r!=r)while(u>f){s=c[f++];if(s!=s)return true}else for(;u>f;f++)if(e||f in c){if(c[f]===r)return e||f||0}return!e&&-1}}},{"./_to-absolute-index":32,"./_to-iobject":34,"./_to-length":35}],8:[function(e,t,r){var n={}.toString;t.exports=function(e){return n.call(e).slice(8,-1)}},{}],9:[function(e,t,r){var n=t.exports={version:"2.5.1"};if(typeof __e=="number")__e=n},{}],10:[function(e,t,r){var n=e("./_a-function");t.exports=function(e,t,r){n(e);if(t===undefined)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,o){return e.call(t,r,n,o)}}return function(){return e.apply(t,arguments)}}},{"./_a-function":5}],11:[function(e,t,r){t.exports=function(e){if(e==undefined)throw TypeError("Can't call method on  "+e);return e}},{}],12:[function(e,t,r){t.exports=!e("./_fails")(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},{"./_fails":16}],13:[function(e,t,r){var n=e("./_is-object");var o=e("./_global").document;var i=n(o)&&n(o.createElement);t.exports=function(e){return i?o.createElement(e):{}}},{"./_global":17,"./_is-object":22}],14:[function(e,t,r){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],15:[function(e,t,r){var n=e("./_global");var o=e("./_core");var i=e("./_ctx");var a=e("./_hide");var c="prototype";var u=function(e,t,r){var f=e&u.F;var s=e&u.G;var l=e&u.S;var p=e&u.P;var d=e&u.B;var v=e&u.W;var _=s?o:o[t]||(o[t]={});var b=_[c];var h=s?n:l?n[t]:(n[t]||{})[c];var y,g,j;if(s)r=t;for(y in r){g=!f&&h&&h[y]!==undefined;if(g&&y in _)continue;j=g?h[y]:r[y];_[y]=s&&typeof h[y]!="function"?r[y]:d&&g?i(j,n):v&&h[y]==j?function(e){var t=function(t,r,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,n)}return e.apply(this,arguments)};t[c]=e[c];return t}(j):p&&typeof j=="function"?i(Function.call,j):j;if(p){(_.virtual||(_.virtual={}))[y]=j;if(e&u.R&&b&&!b[y])a(b,y,j)}}};u.F=1;u.G=2;u.S=4;u.P=8;u.B=16;u.W=32;u.U=64;u.R=128;t.exports=u},{"./_core":9,"./_ctx":10,"./_global":17,"./_hide":19}],16:[function(e,t,r){t.exports=function(e){try{return!!e()}catch(e){return true}}},{}],17:[function(e,t,r){var n=t.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();if(typeof __g=="number")__g=n},{}],18:[function(e,t,r){var n={}.hasOwnProperty;t.exports=function(e,t){return n.call(e,t)}},{}],19:[function(e,t,r){var n=e("./_object-dp");var o=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,r){return n.f(e,t,o(1,r))}:function(e,t,r){e[t]=r;return e}},{"./_descriptors":12,"./_object-dp":24,"./_property-desc":29}],20:[function(e,t,r){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a!=7})},{"./_descriptors":12,"./_dom-create":13,"./_fails":16}],21:[function(e,t,r){var n=e("./_cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return n(e)=="String"?e.split(""):Object(e)}},{"./_cof":8}],22:[function(e,t,r){t.exports=function(e){return typeof e==="object"?e!==null:typeof e==="function"}},{}],23:[function(e,t,r){"use strict";var n=e("./_object-keys");var o=e("./_object-gops");var i=e("./_object-pie");var a=e("./_to-object");var c=e("./_iobject");var u=Object.assign;t.exports=!u||e("./_fails")(function(){var e={};var t={};var r=Symbol();var n="abcdefghijklmnopqrst";e[r]=7;n.split("").forEach(function(e){t[e]=e});return u({},e)[r]!=7||Object.keys(u({},t)).join("")!=n})?function e(t,r){var u=a(t);var f=arguments.length;var s=1;var l=o.f;var p=i.f;while(f>s){var d=c(arguments[s++]);var v=l?n(d).concat(l(d)):n(d);var _=v.length;var b=0;var h;while(_>b)if(p.call(d,h=v[b++]))u[h]=d[h]}return u}:u},{"./_fails":16,"./_iobject":21,"./_object-gops":25,"./_object-keys":27,"./_object-pie":28,"./_to-object":36}],24:[function(e,t,r){var n=e("./_an-object");var o=e("./_ie8-dom-define");var i=e("./_to-primitive");var a=Object.defineProperty;r.f=e("./_descriptors")?Object.defineProperty:function e(t,r,c){n(t);r=i(r,true);n(c);if(o)try{return a(t,r,c)}catch(e){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");if("value"in c)t[r]=c.value;return t}},{"./_an-object":6,"./_descriptors":12,"./_ie8-dom-define":20,"./_to-primitive":37}],25:[function(e,t,r){r.f=Object.getOwnPropertySymbols},{}],26:[function(e,t,r){var n=e("./_has");var o=e("./_to-iobject");var i=e("./_array-includes")(false);var a=e("./_shared-key")("IE_PROTO");t.exports=function(e,t){var r=o(e);var c=0;var u=[];var f;for(f in r)if(f!=a)n(r,f)&&u.push(f);while(t.length>c)if(n(r,f=t[c++])){~i(u,f)||u.push(f)}return u}},{"./_array-includes":7,"./_has":18,"./_shared-key":30,"./_to-iobject":34}],27:[function(e,t,r){var n=e("./_object-keys-internal");var o=e("./_enum-bug-keys");t.exports=Object.keys||function e(t){return n(t,o)}},{"./_enum-bug-keys":14,"./_object-keys-internal":26}],28:[function(e,t,r){r.f={}.propertyIsEnumerable},{}],29:[function(e,t,r){t.exports=function(e,t){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:t}}},{}],30:[function(e,t,r){var n=e("./_shared")("keys");var o=e("./_uid");t.exports=function(e){return n[e]||(n[e]=o(e))}},{"./_shared":31,"./_uid":38}],31:[function(e,t,r){var n=e("./_global");var o="__core-js_shared__";var i=n[o]||(n[o]={});t.exports=function(e){return i[e]||(i[e]={})}},{"./_global":17}],32:[function(e,t,r){var n=e("./_to-integer");var o=Math.max;var i=Math.min;t.exports=function(e,t){e=n(e);return e<0?o(e+t,0):i(e,t)}},{"./_to-integer":33}],33:[function(e,t,r){var n=Math.ceil;var o=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(e>0?o:n)(e)}},{}],34:[function(e,t,r){var n=e("./_iobject");var o=e("./_defined");t.exports=function(e){return n(o(e))}},{"./_defined":11,"./_iobject":21}],35:[function(e,t,r){var n=e("./_to-integer");var o=Math.min;t.exports=function(e){return e>0?o(n(e),9007199254740991):0}},{"./_to-integer":33}],36:[function(e,t,r){var n=e("./_defined");t.exports=function(e){return Object(n(e))}},{"./_defined":11}],37:[function(e,t,r){var n=e("./_is-object");t.exports=function(e,t){if(!n(e))return e;var r,o;if(t&&typeof(r=e.toString)=="function"&&!n(o=r.call(e)))return o;if(typeof(r=e.valueOf)=="function"&&!n(o=r.call(e)))return o;if(!t&&typeof(r=e.toString)=="function"&&!n(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":22}],38:[function(e,t,r){var n=0;var o=Math.random();t.exports=function(e){return"Symbol(".concat(e===undefined?"":e,")_",(++n+o).toString(36))}},{}],39:[function(e,t,r){var n=e("./_export");n(n.S+n.F,"Object",{assign:e("./_object-assign")})},{"./_export":15,"./_object-assign":23}]},{},[1])(1)});

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
    if (typeof module !== 'undefined' && module.exports) module.exports = definition()
    else if (typeof define === 'function' && define.amd) define(name, definition)
    else root[name] = definition()
}(this, 'bowser', function () {
    /**
      * See useragents.js for examples of navigator.userAgent
      */

    var t = true

    function detect(ua) {

        function getFirstMatch(regex) {
            var match = ua.match(regex);
            return (match && match.length > 1 && match[1]) || '';
        }

        function getSecondMatch(regex) {
            var match = ua.match(regex);
            return (match && match.length > 1 && match[2]) || '';
        }

        var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
            , likeAndroid = /like android/i.test(ua)
            , android = !likeAndroid && /android/i.test(ua)
            , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
            , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
            , chromeos = /CrOS/.test(ua)
            , silk = /silk/i.test(ua)
            , sailfish = /sailfish/i.test(ua)
            , tizen = /tizen/i.test(ua)
            , webos = /(web|hpw)os/i.test(ua)
            , windowsphone = /windows phone/i.test(ua)
            , samsungBrowser = /SamsungBrowser/i.test(ua)
            , windows = !windowsphone && /windows/i.test(ua)
            , mac = !iosdevice && !silk && /macintosh/i.test(ua)
            , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
            , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
            , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
            , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
            , mobile = !tablet && /[^-]mobi/i.test(ua)
            , xbox = /xbox/i.test(ua)
            , result

        if (/opera/i.test(ua)) {
            //  an old Opera
            result = {
                name: 'Opera'
                , opera: t
                , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
            }
        } else if (/opr|opios/i.test(ua)) {
            // a new Opera
            result = {
                name: 'Opera'
                , opera: t
                , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
            }
        }
        else if (/SamsungBrowser/i.test(ua)) {
            result = {
                name: 'Samsung Internet for Android'
                , samsungBrowser: t
                , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
            }
        }
        else if (/coast/i.test(ua)) {
            result = {
                name: 'Opera Coast'
                , coast: t
                , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
            }
        }
        else if (/yabrowser/i.test(ua)) {
            result = {
                name: 'Yandex Browser'
                , yandexbrowser: t
                , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            }
        }
        else if (/ucbrowser/i.test(ua)) {
            result = {
                name: 'UC Browser'
                , ucbrowser: t
                , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/mxios/i.test(ua)) {
            result = {
                name: 'Maxthon'
                , maxthon: t
                , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/epiphany/i.test(ua)) {
            result = {
                name: 'Epiphany'
                , epiphany: t
                , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/puffin/i.test(ua)) {
            result = {
                name: 'Puffin'
                , puffin: t
                , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
            }
        }
        else if (/sleipnir/i.test(ua)) {
            result = {
                name: 'Sleipnir'
                , sleipnir: t
                , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/k-meleon/i.test(ua)) {
            result = {
                name: 'K-Meleon'
                , kMeleon: t
                , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (windowsphone) {
            result = {
                name: 'Windows Phone'
                , windowsphone: t
            }
            if (edgeVersion) {
                result.msedge = t
                result.version = edgeVersion
            }
            else {
                result.msie = t
                result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/msie|trident/i.test(ua)) {
            result = {
                name: 'Internet Explorer'
                , msie: t
                , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            }
        } else if (chromeos) {
            result = {
                name: 'Chrome'
                , chromeos: t
                , chromeBook: t
                , chrome: t
                , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            }
        } else if (/chrome.+? edge/i.test(ua)) {
            result = {
                name: 'Microsoft Edge'
                , msedge: t
                , version: edgeVersion
            }
        }
        else if (/vivaldi/i.test(ua)) {
            result = {
                name: 'Vivaldi'
                , vivaldi: t
                , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
            }
        }
        else if (sailfish) {
            result = {
                name: 'Sailfish'
                , sailfish: t
                , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/seamonkey\//i.test(ua)) {
            result = {
                name: 'SeaMonkey'
                , seamonkey: t
                , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/firefox|iceweasel|fxios/i.test(ua)) {
            result = {
                name: 'Firefox'
                , firefox: t
                , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
            }
            if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                result.firefoxos = t
            }
        }
        else if (silk) {
            result = {
                name: 'Amazon Silk'
                , silk: t
                , version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/phantom/i.test(ua)) {
            result = {
                name: 'PhantomJS'
                , phantom: t
                , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/slimerjs/i.test(ua)) {
            result = {
                name: 'SlimerJS'
                , slimer: t
                , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
            result = {
                name: 'BlackBerry'
                , blackberry: t
                , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            }
        }
        else if (webos) {
            result = {
                name: 'WebOS'
                , webos: t
                , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            };
            /touchpad\//i.test(ua) && (result.touchpad = t)
        }
        else if (/bada/i.test(ua)) {
            result = {
                name: 'Bada'
                , bada: t
                , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
            };
        }
        else if (tizen) {
            result = {
                name: 'Tizen'
                , tizen: t
                , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
            };
        }
        else if (/qupzilla/i.test(ua)) {
            result = {
                name: 'QupZilla'
                , qupzilla: t
                , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
            }
        }
        else if (/chromium/i.test(ua)) {
            result = {
                name: 'Chromium'
                , chromium: t
                , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
            }
        }
        else if (/chrome|crios|crmo/i.test(ua)) {
            result = {
                name: 'Chrome'
                , chrome: t
                , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            }
        }
        else if (android) {
            result = {
                name: 'Android'
                , version: versionIdentifier
            }
        }
        else if (/safari|applewebkit/i.test(ua)) {
            result = {
                name: 'Safari'
                , safari: t
            }
            if (versionIdentifier) {
                result.version = versionIdentifier
            }
        }
        else if (iosdevice) {
            result = {
                name: iosdevice === 'iphone' ? 'iPhone' : iosdevice === 'ipad' ? 'iPad' : 'iPod'
            }
            // WTF: version is not part of user agent in web apps
            if (versionIdentifier) {
                result.version = versionIdentifier
            }
        }
        else if (/googlebot/i.test(ua)) {
            result = {
                name: 'Googlebot'
                , googlebot: t
                , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
            }
        }
        else {
            result = {
                name: getFirstMatch(/^(.*)\/(.*) /),
                version: getSecondMatch(/^(.*)\/(.*) /)
            };
        }

        // set webkit or gecko flag for browsers based on these engines
        if (!result.msedge && /(apple)?webkit/i.test(ua)) {
            if (/(apple)?webkit\/537\.36/i.test(ua)) {
                result.name = result.name || "Blink"
                result.blink = t
            } else {
                result.name = result.name || "Webkit"
                result.webkit = t
            }
            if (!result.version && versionIdentifier) {
                result.version = versionIdentifier
            }
        } else if (!result.opera && /gecko\//i.test(ua)) {
            result.name = result.name || "Gecko"
            result.gecko = t
            result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
        }

        // set OS flags for platforms that have multiple browsers
        if (!result.windowsphone && !result.msedge && (android || result.silk)) {
            result.android = t
        } else if (!result.windowsphone && !result.msedge && iosdevice) {
            result[iosdevice] = t
            result.ios = t
        } else if (mac) {
            result.mac = t
        } else if (xbox) {
            result.xbox = t
        } else if (windows) {
            result.windows = t
        } else if (linux) {
            result.linux = t
        }

        function getWindowsVersion(s) {
            switch (s) {
                case 'NT': return 'NT'
                case 'XP': return 'XP'
                case 'NT 5.0': return '2000'
                case 'NT 5.1': return 'XP'
                case 'NT 5.2': return '2003'
                case 'NT 6.0': return 'Vista'
                case 'NT 6.1': return '7'
                case 'NT 6.2': return '8'
                case 'NT 6.3': return '8.1'
                case 'NT 10.0': return '10'
                default: return undefined
            }
        }

        // OS version extraction
        var osVersion = '';
        if (result.windows) {
            osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
        } else if (result.windowsphone) {
            osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
        } else if (result.mac) {
            osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
            osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (iosdevice) {
            osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
            osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (android) {
            osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
        } else if (result.webos) {
            osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
        } else if (result.blackberry) {
            osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
        } else if (result.bada) {
            osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
        } else if (result.tizen) {
            osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
        }
        if (osVersion) {
            result.osversion = osVersion;
        }

        // device type extraction
        var osMajorVersion = !result.windows && osVersion.split('.')[0];
        if (
            tablet
            || nexusTablet
            || iosdevice === 'ipad'
            || (android && (osMajorVersion === 3 || (osMajorVersion >= 4 && !mobile)))
            || result.silk
        ) {
            result.tablet = t
        } else if (
            mobile
            || iosdevice === 'iphone'
            || iosdevice === 'ipod'
            || android
            || nexusMobile
            || result.blackberry
            || result.webos
            || result.bada
        ) {
            result.mobile = t
        }

        // Graded Browser Support
        // http://developer.yahoo.com/yui/articles/gbs
        if (result.msedge ||
            (result.msie && result.version >= 10) ||
            (result.yandexbrowser && result.version >= 15) ||
            (result.vivaldi && result.version >= 1.0) ||
            (result.chrome && result.version >= 20) ||
            (result.samsungBrowser && result.version >= 4) ||
            (result.firefox && result.version >= 20.0) ||
            (result.safari && result.version >= 6) ||
            (result.opera && result.version >= 10.0) ||
            (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
            (result.blackberry && result.version >= 10.1)
            || (result.chromium && result.version >= 20)
        ) {
            result.a = t;
        }
        else if ((result.msie && result.version < 10) ||
            (result.chrome && result.version < 20) ||
            (result.firefox && result.version < 20.0) ||
            (result.safari && result.version < 6) ||
            (result.opera && result.version < 10.0) ||
            (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
            || (result.chromium && result.version < 20)
        ) {
            result.c = t
        } else result.x = t

        return result
    }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

    bowser.test = function (browserList) {
        for (var i = 0; i < browserList.length; ++i) {
            var browserItem = browserList[i];
            if (typeof browserItem === 'string') {
                if (browserItem in bowser) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Get version precisions count
     *
     * @example
     *   getVersionPrecision("1.10.3") // 3
     *
     * @param  {string} version
     * @return {number}
     */
    function getVersionPrecision(version) {
        return version.split(".").length;
    }

    /**
     * Array::map polyfill
     *
     * @param  {Array} arr
     * @param  {Function} iterator
     * @return {Array}
     */
    function map(arr, iterator) {
        var result = [], i;
        if (Array.prototype.map) {
            return Array.prototype.map.call(arr, iterator);
        }
        for (i = 0; i < arr.length; i++) {
            result.push(iterator(arr[i]));
        }
        return result;
    }

    /**
     * Calculate browser version weight
     *
     * @example
     *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
     *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
     *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
     *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
     *
     * @param  {Array<String>} versions versions to compare
     * @return {Number} comparison result
     */
    function compareVersions(versions) {
        // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
        var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
        var chunks = map(versions, function (version) {
            var delta = precision - getVersionPrecision(version);

            // 2) "9" -> "9.0" (for precision = 2)
            version = version + new Array(delta + 1).join(".0");

            // 3) "9.0" -> ["000000000"", "000000009"]
            return map(version.split("."), function (chunk) {
                return new Array(20 - chunk.length).join("0") + chunk;
            }).reverse();
        });

        // iterate in reverse order by reversed chunks array
        while (--precision >= 0) {
            // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
            if (chunks[0][precision] > chunks[1][precision]) {
                return 1;
            }
            else if (chunks[0][precision] === chunks[1][precision]) {
                if (precision === 0) {
                    // all version chunks are same
                    return 0;
                }
            }
            else {
                return -1;
            }
        }
    }

    /**
     * Check if browser is unsupported
     *
     * @example
     *   bowser.isUnsupportedBrowser({
     *     msie: "10",
     *     firefox: "23",
     *     chrome: "29",
     *     safari: "5.1",
     *     opera: "16",
     *     phantom: "534"
     *   });
     *
     * @param  {Object}  minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function isUnsupportedBrowser(minVersions, strictMode, ua) {
        var _bowser = bowser;

        // make strictMode param optional with ua param usage
        if (typeof strictMode === 'string') {
            ua = strictMode;
            strictMode = void (0);
        }

        if (strictMode === void (0)) {
            strictMode = false;
        }
        if (ua) {
            _bowser = detect(ua);
        }

        var version = "" + _bowser.version;
        for (var browser in minVersions) {
            if (minVersions.hasOwnProperty(browser)) {
                if (_bowser[browser]) {
                    if (typeof minVersions[browser] !== 'string') {
                        throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
                    }

                    // browser version and min supported version.
                    return compareVersions([version, minVersions[browser]]) < 0;
                }
            }
        }

        return strictMode; // not found
    }

    /**
     * Check if browser is supported
     *
     * @param  {Object} minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function check(minVersions, strictMode, ua) {
        return !isUnsupportedBrowser(minVersions, strictMode, ua);
    }

    bowser.isUnsupportedBrowser = isUnsupportedBrowser;
    bowser.compareVersions = compareVersions;
    bowser.check = check;

    /*
     * Set our detect method to the main bowser object so we can
     * reuse it to test other user agents.
     * This is needed to implement future tests.
     */
    bowser._detect = detect;

    return bowser
});
var app = app || {};

$(function () {
    app.html = $('html');
    app.head = $('head');
    app.body = $('body');
    app.main = $('main');
    app.content = $('#content > div');
    app.header = $('header');
    app.footer = $('footer');
    app.left = $('#left');
    app.right = $('#right');
    app.loading = $('#loading');
    app.overflow = $('#overflow');
    app.modal = $('#modal');
    app.transitionTime = 400;
    app.fadeOutTime = 500;
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;
    app.scrollbarWidth = 0;
    app.loadingCount = 0;
    app.localStorage = typeof Storage !== "undefined";
    app.settings = [];
});
var app = app || {};

app.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732 || app.isAsideLeft() && !app.isAsideLeftPush() || app.isAsideRight() && !app.isAsideRightPush();
};

app.isAside = function () {
    return app.html.attr('data-aside').length;
};

app.isAsideLeft = function () {
    return app.html.attr('data-aside') === 'left';
};

app.isAsideRight = function () {
    return app.html.attr('data-aside') === 'right';
};

app.isAsideLeftPush = function () {
    return app.html.hasClass('left-push') && app.isAsideLeft();
};

app.isAsideRightPush = function () {
    return app.html.hasClass('right-push') && app.isAsideRight();
};

app.isAsideLeftCloseOnClickOutside = function () {
    return app.html.hasClass('close-left-click-outside');
};
app.isAsideRightCloseOnClickOutside = function () {
    return app.html.hasClass('close-right-click-outside');
};

app.isModal = function () {
    return app.html.hasClass('modal');
};

app.isModalForm = function () {
    return app.html.attr('data-modal') === 'form';
};

app.isModalImage = function () {
    return app.html.attr('data-modal') === 'image';
};

app.isLoading = function () {
    return app.html.hasClass('loading');
};
var app = app || {};

$(function () {
    if (bowser.msedge) {
        app.html.addClass('msedge'); // used by app.enableScroll()
    } else if (bowser.msie) {
        app.html.addClass('msie'); // not currently used for anything
    }
    if (bowser.mobile) {
        app.html.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.html.addClass('tablet'); // does nothing currently
    } else {
        app.html.addClass('desktop'); // enables hover effects
    }

    if (bowser.android) {
        app.html.addClass('android'); // used by modal
    } else if (bowser.ios) {
        app.html.addClass('ios'); // used to apply focus
    }

    if (app.html.hasClass('msie') || app.html.hasClass('msedge')) {
        // disable smooth scrolling, since it causes element jumping/lagging on scroll
        // https://stackoverflow.com/questions/29416448/how-to-disable-smooth-scrolling-in-ie11
        app.body.on("mousewheel", function (e) {
            var target = $(e.target);
            if (!app.isModal() && event.ctrlKey !== true) {
                var aside = target.closest('aside > .content') || target.parents('aside .content');
                e.preventDefault();
                var wheelDelta = e.originalEvent.wheelDelta;
                var currentScrollPosition;
                if (aside.length) {
                    currentScrollPosition = aside.scrollTop();
                    aside.scrollTop(currentScrollPosition - wheelDelta);
                } else {
                    currentScrollPosition = window.pageYOffset;
                    window.scrollTo(0, currentScrollPosition - wheelDelta);
                }
            }
        });

        // at some zoom levels edge/ie makes $(window) heigher than $(document)
        // it causes a gap between footer and the bottom of $(window).
        $(window).scroll(function () {
            var scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop + $(window).height() >= $(document).height()) {
                app.html.addClass('subpixel');
            } else {
                app.html.removeClass('subpixel');
            }
        });
    }
});
var app = app || {};

$(function () {
    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.main);
    });
});

$(window).click(function (e) {
    var target = $(e.target);
    var modal = target.closest(app.modal[0]);

    if (app.html.hasClass('ios')) {
        // ios browsers doesn't apply :focus to buttons in many cases,
        // this forces :focus to be applied correctly.
        if (target.parents('button').length) {
            target.parents('button').focus();
        } else if (target.closest('button').length) {
            target.focus();
        }
    }

    if (modal.length || target.parents('#modal').length) {
        var image = app.isModalImage() && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length;
        var form = app.isModalForm() && !target.closest('#modal > div > div > div').length;
        if (image || form || target.closest('#modal-close').length) {
            app.closeModal();
        }
    } else {
        var isSmallBreakpoint = app.isSmallBreakpoint();
        var left = app.isAsideLeft() && (app.isAsideLeftCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#left").length;
        var right = app.isAsideRight() && (app.isAsideRightCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#right").length;
        var notTarget = !target.closest('.modal').length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length;

        if ((left || right) && notTarget) {
            app.enableScroll();
            app.html.attr('data-aside', '');
            app.checkGoogleMaps();
        }
    }
});
var app = app || {};

app.pageLoaded = function (initial) {
    app.body.scrollTop(0); // edge, safari
    app.html.scrollTop(0); // chrome, firefox, ie
    if (app.html.hasClass('msie')) {
        app.body.css('overflow', 'hidden');
    }
    setTimeout(function () {
        if (app.html.hasClass('msie')) {
            app.body.css('overflow', '');
        }
        if (!initial) {
            app.toggleAside(undefined, true);
        }
    }, 200);
    app.contentHeader = app.content.children('.header:not(.full)');
    app.lazy(app.content.find('.lazy'));
    app.accordion(app.content.find('.accordion'));
    app.dropdown(app.content.find('select.dropdown'));
    app.responsiveBackground();
    app.tooltipster(app.content.find('.tooltip'));
    app.assignment(app.content.find('.assignment'));
    renderMathInElement(app.content[0]);

    app.youtube = undefined;
    app.google = undefined;
    app.hideLoading();
    if (initial) {
        app.html.addClass('siteLoaded');
    }
};
var app = app || {};

var scrollbarWidth = function () {
    app.body.append('<div id="scrollbar-width"></div>');
    var element = app.body.children('#scrollbar-width');
    element.css({
        'overflow': "scroll",
        'visibility': "hidden",
        'position': 'absolute',
        'width': '100px',
        'height': '100px'
    });
    app.scrollbarWidth = element[0].offsetWidth - element[0].clientWidth;
    element.remove();
};

app.disableScroll = function () {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        if (app.isModal()) {
            app.checkModal();
            app.modal.focus();
        }
        var scrollTop = Math.max(app.body.scrollTop(), app.main.scrollTop(), app.html.scrollTop());
        app.html.addClass('scrollDisabled');
        app.body.scrollTop(scrollTop);
        app.main.scrollTop(scrollTop);
    }
};

app.enableScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        var scrollTop = Math.max(app.body.scrollTop(), app.main.scrollTop(), app.html.scrollTop());
        app.html.removeClass('scrollDisabled modal');
        app.main.focus();
        app.body.scrollTop(scrollTop); // edge, safari
        app.html.scrollTop(scrollTop); // chrome, firefox, ie
    }
};

app.setHtmlScroll = function () {
    if (!app.isModal() && !app.isLoading() && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && !app.isAsideLeft() && !app.isAsideRight())) {
        app.enableScroll();
    } else if (app.isModal() || app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.isAsideLeft() || app.isAsideRight())) {
        app.disableScroll();
    }
};

$(window).resize(function () {
    app.checkModal();
    app.setHtmlScroll();
    scrollbarWidth();
});

$(function () {
    scrollbarWidth();
});
var app = app || {};

app.showLoading = function () {
    app.loadingCount++;
    app.disableScroll();
    app.html.addClass('loading');
};

app.hideLoading = function () {
    app.loadingCount--;
    if (app.loadingCount === 0) {
        app.html.removeClass('loading');
        app.setHtmlScroll();
    }
};

$(function () {
    app.main.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});
var app = app || {};

var transitionLock = false;

app.toggleAside = function (aside, pageChanged) {
    if (!transitionLock) {
        transitionLock = true;
        var currentAside = app.html.attr('data-aside');
        if (currentAside.length) {
            if (aside === undefined || currentAside === aside) {
                var scrollTop = app.html.scrollTop() || app.body.scrollTop() || app.main.scrollTop();
                app.html.attr('data-aside', '');
                app.main.focus();
                app.body.scrollTop(scrollTop); // edge, safari
                app.html.scrollTop(scrollTop); // chrome, firefox, ie
            } else {
                app.html.attr('data-aside', aside);
            }
        } else {
            app.html.attr('data-aside', aside);
        }
        if (aside === 'left') {
            app.left.focus();
        } else if (aside === 'right') {
            app.right.focus();
        }
        if (app.html.hasClass('transitions')) {
            setTimeout(function () {
                transitionLock = false;
                app.checkGoogleMaps();
                if (pageChanged) {
                    app.responsiveBackground();
                }
            }, app.transitionTime);
        } else {
            transitionLock = false;
            app.checkGoogleMaps();
        }
        app.setHtmlScroll();
    }
};

$(function () {
    $('.aside.left').click(function () {
        app.toggleAside('left');
    });

    $('.aside.right').click(function () {
        app.toggleAside('right');
    });
});
var app = app || {};

app.loadPage = function (url, pushState, initial) {
    app.showLoading();
    url = url.replace(/^\/+/g, '');
    var q = url.indexOf('?');
    url = url.substring(0, q !== -1 ? q : url.length);

    if (!app.isLocalhost) {
        url = url.substring(url.indexOf("/") + 1);
    }

    app.left.find('.tree a.label.active').removeClass('active');
    if (url === 'form') {
        app.left.find('a.label[href="form"]').addClass('active');
        app.pageForm(initial);
    } else {
        app.left.find('a.label[href="' + url + '"]').addClass('active');
        app.content.load('ajax/pages/' + (url === '' ? 'home' : url) + '.html', function () {
            app.pageLoaded(initial);
        });
    }

    if (app.isLocalhost) {
        url = '/' + url;
    } else {
        url = '/Panels/' + url;
    }

    if (pushState) {
        window.history.pushState(null, null, url);
        loadPage = true;
    }
};

(function (l) {
    if (l.search) {
        app.url = {};
        l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
            app.url[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (app.url.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + app.url.p +
                (app.url.q ? '?' + app.url.q : '') +
                l.hash
            );
        }
    }
}(window.location));

var loadPage = window.history.state;
window.onpopstate = function (event) {
    if (loadPage) {
        app.loadPage(location.pathname, false, true);
    }
};

$(function () {
    app.left.find('> .content > div').load('ajax/layout/menu.html', function () {
        app.header.find('.aside.left').addClass('loaded');
        if (app.url && app.url.p) {
            app.left.find('a.label[href="' + app.url.p.replace(/^\/+/g, '') + '"]').addClass('active');
        } else {
            app.left.find('a.label[href="/"]').addClass('active');
        }
    });

    if (app.url && app.url.p) {
        app.loadPage(app.url.p, true, true);
    } else {
        app.loadPage('', false, true);
    }

    app.left.on('click', '.tree a.label:not(.active)', function (e) {
        e.preventDefault();
        var $this = $(this);
        app.loadPage($this.attr('href'), true, false);
    });
});
var app = app || {};

app.applySettings = function (id, type, value, set) {
    if (app.localStorage && set) {
        var entry = {
            "id": id,
            "type": type,
            "value": value
        };
        var exists = $.grep(app.settings, function (e) { return e.id === id; });
        if (exists.length === 0) {
            // not found
            app.settings.push(entry);
        } else if (exists.length === 1) {
            // found
            exists[0].value = value;
        }
        localStorage.setItem('settings', JSON.stringify(app.settings));
    } else {
        if (type === "checkbox") {
            $('#settings').find('#' + id).prop('checked', value);
        } else if (type === "slider") {
            $('#settings').find('#' + id).slider('setValue', value);
        }
    }

    if (type === 'checkbox') {
        if (value) {
            app.html.addClass(id);
        } else {
            app.html.removeClass(id);
        }
        if (id === 'two-columns') {
            app.responsiveBackground();
        }
    }
};

$(function () {
    app.right.find('> .content > div').load('ajax/layout/settings.html', function () {
        app.header.find('.aside.right').addClass('loaded');
        var $this = $(this);
        if (app.localStorage) {
            app.settings = JSON.parse(localStorage.getItem("settings"));
            if (app.settings === null) app.settings = [];
        }

        $this.on('click', 'input[type=checkbox]', function () {
            var $this = $(this);
            var id = $this.attr('id');
            var type = "checkbox";
            var value = $this.is(':checked');
            app.applySettings(id, type, value, true);
            if (id === 'two-columns') {
                app.checkGoogleMaps();
            }
            if (id === 'left-push' || id === 'right-push') {
                app.setHtmlScroll();
            }
        });
        if (app.localStorage) {
            $.each(app.settings, function (i, entry) {
                app.applySettings(entry.id, entry.type, entry.value, false);
            });
        }
    });
});
var app = app || {};

$(function () {
    app.body.on("keydown", function (e) {
        var target = $(e.target);
        var parent = target.parent();
        if (!app.html.hasClass('loading')) {
            if (e.which === 37 && !app.isModal()) { // left
                if (app.isAsideLeft()) {
                    app.toggleAside(); // closes right
                } else if (!app.isAsideRight()) {
                    app.toggleAside('right'); // opens right
                }
            } else if (e.which === 39 && !app.isModal()) { // right
                if (app.isAsideRight()) {
                    app.toggleAside(); // closes left
                } else if (!app.isAsideLeft()) {
                    app.toggleAside('left'); // opens left
                }
            } else if (e.which === 27) { // esc
                if (app.isModal()) {
                    app.closeModal();
                } else {
                    if (app.isAside()) {
                        app.toggleAside(); // closes aside
                    }
                    var popups = app.main.children('.popup');
                    if (popups.length) {
                        popups.fadeOut(app.fadeOutTime, function () {
                            popups.remove();
                        });
                    }
                    var dropdowns = app.content.find('div.dropdown.open');
                    if (dropdowns.length) {
                        dropdowns.removeClass('open');
                    }
                }
            }
            if (e.which === 13) { // enter
                var dropdown = target.parents('div.dropdown');
                if (dropdown.length || parent.parent().hasClass('accordion')) {
                    target.click();
                    e.preventDefault();
                    if (dropdown.length) {
                        dropdown.children('div').focus();
                    }
                } else if (parent.hasClass('checkbox') || parent.hasClass('radio') || parent.hasClass('switch') || target.hasClass('toggle')) {
                    target.siblings('input').click();
                    e.preventDefault();
                }
            }
        }
        if (e.which === 9) { // tab
            if (app.isLoading()) {
                e.preventDefault();
                return;
            }
        }
    });

    app.body.on('keyup', function (e) {
        if (!app.isLoading()) {
            if (e.which === 9) { // tab
                var target = $(e.target);
                if (!target.parents('div.dropdown.open').length) {
                    $('div.dropdown.open').removeClass('open');
                }
                if (app.isModal()) {
                    if (!target.parents('#modal').length) {
                        app.closeModal();
                    }
                } else {
                    var aside = target.parents('aside');
                    if (aside.length === 0 && target.is('aside')) {
                        aside = target;
                    }
                    if (aside.length && aside.attr('id') !== app.html.attr('data-aside')) {
                        app.toggleAside(aside.attr('id'));
                    } else if (!aside.length && app.isAside()) {
                        app.toggleAside();
                    }
                }
            }
        }
    });
});
var app = app || {};

app.showModal = function (type) {
    app.html.attr('data-modal', type);
    app.html.addClass('modal');
    if (app.html.hasClass('scrollDisabled')) {
        app.checkModal();
        app.modal.focus();
    } else {
        app.setHtmlScroll();
    }
};

app.closeModal = function () {
    app.html.removeClass('modal').attr('data-modal', '');
    app.modal.removeClass('info-shown').empty();
    app.checkModal();
    app.setHtmlScroll();
};

app.checkModal = function () {
    if (app.html.hasClass('modal')) {
        app.body.css('padding-right', app.scrollbarWidth);
        if (app.html.attr('data-aside') === 'right') {
            app.right.css('margin-right', app.scrollbarWidth);
        }
        app.main.children('.popup').css('margin-right', app.scrollbarWidth);
    } else {
        app.body.css('padding-right', 0);
        app.right.css('margin-right', 0);
        app.main.children('.popup').css('margin-right', 0);
    }

    if (app.contentHeader !== undefined) {
        if (app.isModal() && app.contentHeader.css('position') === 'fixed') {
            var halfOverflowY = app.scrollbarWidth / 2;
            app.contentHeader.children().css('width', 'calc(100% - ' + halfOverflowY + 'px)');
        } else {
            app.contentHeader.children().css('width', '');
        }
    }
};

$(function () {
    app.main.on('click', '.modal', function () {
        var $this = $(this);
        var type = $this.attr('data-modal');
        if (type !== undefined && type.length && (type === 'image' || type === 'form')) {
            var id = $this.attr('data-modal-id');
            var html = [];
            html.push('<div><div><div id="modal-content">');
            var title = $this.attr('data-modal-title');
            if (type === 'image' && $this.attr('data-modal-img').length) {
                var description = $this.attr('data-modal-description');
                if (title !== undefined || description !== undefined) {
                    app.modal.addClass('has-info');
                    html.push('<button id="modal-toggle" class="btn" aria-label="Toggle info">');
                    html.push('<svg focusable="false"><use xlink:href="#svg-info"></use></svg>');
                    html.push('</button>');
                }
                if (title !== undefined) {
                    html.push('<div id="modal-title">' + title + '</div>');
                }
                if (description !== undefined) {
                    html.push('<div id="modal-description">' + description + '</div>');
                }
                html.push('<img id="modal-img" />');
            } else if (type === 'form') {
                html.push('<div class="header">');
                if (title !== undefined) {
                    html.push('<span class="title">' + title + '</span>');
                }
                html.push('<button id="modal-close" class="close" aria-label="Close ' + (title !== undefined ? title : '') + '"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button >');
                html.push('</div>');

                if (id === 'login') {
                    html.push('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>');
                } else if (id === 'register') {
                    html.push('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis odio quis nunc porta tincidunt. Praesent in augue velit. Vivamus efficitur nisi eget convallis placerat. Quisque luctus nibh vitae mauris vehicula dignissim. Cras quis velit ac metus maximus luctus eget rutrum nisl. Nulla facilisi. Nullam gravida efficitur fringilla. Etiam pretium condimentum tempus. Sed feugiat tortor vitae est porttitor, eu pharetra arcu fringilla. Sed nec luctus enim, nec rhoncus velit. Fusce dolor sem, varius id rutrum in, efficitur sed magna.<br /><br />' +
                        'Maecenas ut lacinia orci.Phasellus sagittis nisi eu mauris tempus, sit amet lobortis justo dapibus.Nulla facilisi.Aenean venenatis faucibus gravida.Praesent et justo fringilla mauris convallis pretium.Maecenas egestas lectus non erat tincidunt, in egestas risus ultricies.Praesent erat felis, rutrum ac accumsan eget, accumsan ac nisi.Integer sollicitudin risus sed purus maximus porta.Nam maximus, leo at dapibus lobortis, nunc eros molestie justo, vel scelerisque est dolor non tellus.Integer fermentum mi malesuada, placerat mi ac, laoreet risus.<br /><br />' +
                        'Sed et felis a velit accumsan sollicitudin ut a dolor.Integer iaculis quam risus, ac placerat nibh fringilla non.Donec non diam nulla.Vestibulum pretium magna ac malesuada lobortis.Nam eleifend sapien sed efficitur fermentum.Ut magna sapien, mattis nec ligula sollicitudin, ultricies efficitur quam.Praesent vestibulum libero et lorem vulputate, sit amet sagittis velit bibendum.Morbi blandit quis nibh a rhoncus.Phasellus maximus justo ac varius dapibus.Mauris suscipit quam vitae augue ornare, eu rutrum elit tincidunt.Nam rutrum turpis ut bibendum iaculis.Nunc bibendum pretium turpis non ullamcorper.Morbi rhoncus tortor sit amet diam imperdiet luctus.Cras tempor interdum est, et sodales neque semper a.Aliquam imperdiet risus ex, id imperdiet urna egestas in. Vivamus eu suscipit augue.<br /><br />' +
                        'Maecenas nec mauris diam.Aenean lobortis mauris sit amet ligula imperdiet tincidunt.Suspendisse ornare nisl metus, id sagittis ligula feugiat vitae.Nullam viverra velit non augue maximus, quis vulputate nisi tincidunt.Maecenas pretium mi sed tellus placerat molestie.Duis laoreet purus eu lectus accumsan faucibus.Donec cursus odio turpis, ac maximus lacus euismod finibus.Nunc blandit ultricies ultrices.Etiam vitae auctor quam.Ut sem libero, aliquam ut erat vitae, dapibus lacinia erat.Donec nec erat commodo, tincidunt arcu nec, tincidunt ligula.Maecenas id facilisis neque.In sollicitudin ligula non congue convallis.Sed et varius odio.Mauris scelerisque nisl ac ipsum sodales, ut lacinia nisi tempus.<br /><br />' +
                        'Maecenas orci magna, convallis vel blandit id, tincidunt tempus lorem.Duis in purus velit.Vivamus elit urna, congue a congue ut, porttitor id orci.Vestibulum mattis, nisi in eleifend aliquet, lectus velit imperdiet est, at gravida quam erat et lectus.Aliquam vehicula nisi sed turpis posuere pretium.Integer a enim nec nisl faucibus varius.Cras pharetra viverra magna id finibus.Donec aliquet blandit est eu venenatis.Nunc et quam imperdiet, pellentesque neque at, malesuada lorem.Vivamus ut elementum ipsum.Vivamus mauris est, malesuada ut lacinia eu, porta id mauris.Suspendisse potenti.Nulla vel libero ac nunc porta mollis nec ac ligula.</p>');
                }
            }
            html.push('</div></div></div>');
            var div = html.join("");
            app.modal.html(div);
            if (type === 'image') {
                //app.html.addClass('modal');
                var image = app.modal.find('#modal-img');
                image.on('load', function () {
                    if (app.html.hasClass('android')) {
                        image.css('max-height', window.innerHeight);
                    }
                    app.hideLoading();
                    app.showModal(type);
                });
                image.attr('src', $this.attr('data-modal-img'));
                app.showLoading();
            } else {
                app.showModal(type);
            }
        }
    });

    app.main.on('click', '#modal-toggle', function () {
        app.modal.toggleClass('info-shown');
    });
});
var app = app || {};

var swipe = function () {

    var xDown = null;
    var yDown = null;

    var offsetBefore;

    var handleTouchStart = function (evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;

        offsetBefore = $(evt.target).offset().left;
    };

    var handleTouchMove = function (evt) {
        var offsetAfter = $(evt.target).offset().left;
        if (!xDown || !yDown || offsetBefore !== offsetAfter) {
            return;
        }
        var xUp = evt.changedTouches[0].clientX;
        var yUp = evt.changedTouches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            var distance = parseInt($(window).width() / 2);
            if (yDiff > -100 || yDiff < 100) {
                var currentAside;
                if (xDiff > distance) {
                    /* left swipe */
                    if (!app.isModal() && !app.isLoading()) {
                        currentAside = app.html.attr('data-aside');
                        if (currentAside === 'left' && currentAside !== 'right') {
                            app.toggleAside();
                        } else if (currentAside !== 'right') {
                            app.toggleAside('right');
                        }
                    }
                } else if (xDiff < -distance) {
                    /* right swipe */
                    if (!app.isModal() && !app.isLoading()) {
                        currentAside = app.html.attr('data-aside');
                        if (currentAside === 'right' && currentAside !== 'left') {
                            app.toggleAside();
                        } else if (currentAside !== 'left') {
                            app.toggleAside('left');
                        }
                    }
                }
            }

        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchMove, false);
};

$(function () {
    if (app.html.hasClass('android')) {
        swipe();
        // android doesn't handle vh correctly, so it gets converted to px
        $(window).resize(function () {
            if (app.isModal() && app.isModalImage()) {
                app.modal.find('#modal-img').css('max-height', window.innerHeight);
            }
        });
    }
});
var app = app || {};

app.responsiveBackground = function () {
    app.content.find('.responsive-background').each(function () {
        var $this = $(this),
            image = $this.attr('data-responsive-background-image'),
            filetype = $this.attr('data-responsive-background-image-filetype'),
            sizesWidth = $this.attr('data-responsive-background-sizes'),
            current = $this.attr('data-responsive-background-current'),
            aspectRatio = $this.attr('data-responsive-background-aspect-ratio');
        if (image !== undefined && image.length &&
            filetype !== undefined && filetype.length &&
            sizesWidth !== undefined && sizesWidth.length &&
            aspectRatio !== undefined && aspectRatio.length) {
            if ((filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png') &&
                (aspectRatio === '21by9' || aspectRatio === '16by9' || aspectRatio === '4by3' || aspectRatio === '1by1')) {
                sizesWidth = sizesWidth.replace(/\s/g, '').split(',').sort(function (a, b) { return a - b; });
                var goalWidth = $this.width(),
                    goalHeight = $this.height(),
                    closestWidth,
                    closestHeight,
                    heightPercentage;

                function getHeightInPercentage(num, amount) {
                    return (num * 100) / amount;
                }

                if (aspectRatio === '21by9') {
                    heightPercentage = getHeightInPercentage(9, 21);
                } else if (aspectRatio === '16by9') {
                    heightPercentage = getHeightInPercentage(9, 16);

                } else if (aspectRatio === '4by3') {
                    heightPercentage = getHeightInPercentage(3, 4);

                } else if (aspectRatio === '1by1') {
                    heightPercentage = 100;
                }

                function getHeightInPixels(num, amount) {
                    return num * amount / 100;
                }

                $.each(sizesWidth, function (index) {
                    var width = parseInt(this);
                    var height = getHeightInPixels(heightPercentage, width);
                    if (closestWidth === undefined || width < goalWidth || closestWidth < goalWidth ||
                        closestHeight === undefined || height < goalHeight || closestHeight < goalHeight) {
                        closestWidth = width;
                        closestHeight = height;
                    }
                });

                if (current !== undefined && current.length && parseInt(current) < closestWidth || current === undefined || current.length === 0) {
                    app.body.append('<img id="responsive-background" class="hidden" src="' + image + '-' + closestWidth + '.' + filetype + '" />');
                    var tempImage = app.body.children('#responsive-background');
                    tempImage.on('load', function () {
                        tempImage.remove();
                        var src = 'url(' + image + '-' + closestWidth + '.' + filetype + ')';
                        $this.css('background-image', src);
                        $this.attr('data-responsive-background-current', closestWidth);
                    });
                }
            }
        }
    });
};

$(window).resize(function () {
    app.responsiveBackground();
});
var app = app || {};

app.pageForm = function (initial) {
    app.content.load('ajax/pages/form.html', function () {
        app.content.find('#font_size').slider({
            min: 12,
            max: 20,
            step: 2,
            value: 16,
            focus: true
        });

        app.addValidation(
            app.content.find('#form'),
            {
                firstName: {
                    required: true,
                    minlength: 2
                },
                lastName: {
                    required: true,
                    minlength: 2
                },
                username: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    password: true
                },
                confirm_password: {
                    required: true,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                dropdown_1: "required",
                dropdown_2: "required",
                dropdown_3: "required",
                dropdown_4: "required",
                dropdown_5: "required",
                dropdown_6: "required",
                gender: "required",
                interests: "required",
                agree: "required",
                font_size: "required"
            },
            {
                firstName: {
                    required: "Please enter your first name",
                    minlength: "Your first name must consist of at least 2 characters"
                },
                lastName: {
                    required: "Please enter your last name",
                    minlength: "Your last name must consist of at least 2 characters"
                },
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password: {
                    required: "Please provide a password"
                },
                confirm_password: {
                    required: "Please provide a password",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address",
                dropdown_1: "Please select an option",
                dropdown_2: "Please select an option",
                dropdown_3: "Please select an option",
                dropdown_4: "Please select an option",
                dropdown_5: "Please select an option",
                dropdown_6: "Please select an option",
                gender: "Please select your gender",
                interests: "Please select at least one interest",
                agree: "Please accept our policy"
            }
        );

        app.pageLoaded(initial);
    });
};
var app = app || {};

$(function () {
    app.main.on('click', '.show-popup', function () {
        var $this = $(this);
        var title = $this.attr('data-popup-title');
        if (title !== undefined) {
            var theme = $this.attr('data-popup-theme');
            if (theme === undefined) {
                theme = 'primary';
            }

            var alert = [];
            alert.push('<div class="alert theme-' + theme + '">');
            alert.push('<div><p>' + title + '</p></div>');
            alert.push('<button class="close" aria-label="Close popup"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button>');
            alert.push('</div>');
            alert = alert.join('');
            
            var position = $(this).attr('data-popup-position');
            if (position === undefined) {
                position = 'top left';
            }

            var popup = app.main.children('.popup[data-position="' + position + '"]');
            if (popup.length) {
                popup.append(alert);
            } else {
                var html = [];
                html.push('<div class="popup position ' + position + '" data-position="' + position + '">');
                html.push(alert);
                html.push('</div>');
                html = html.join("");
                app.main.prepend(html);
            }
        }
    });
});
var app = app || {};

$(function () {
    app.main.on('click', '.alert .close', function () {
        var $this = $(this).parent();
        $this.fadeOut(app.fadeOutTime, function () {
            var parent = $this.parent();
            if (parent.hasClass('popup') && parent.children().length === 1) {
                parent.remove();
            } else {
                $this.remove();
            }
        });
    });
});
var app = app || {};

app.accordion = function (elements) {
    elements.on("click", ".headline", function () {
        var content = $(this).next();
        if (content.hasClass('open')) {
            content
                .removeClass('open')
                .slideUp("800");
        } else {
            content
                .addClass("open")
                .slideToggle("800")
                .parents('.accordion').find(".content.open").not(content).removeClass('open').slideUp("800");
        }
    });
};
var app = app || {};

app.dropdown = function (dropdowns) {
    dropdowns.each(function () {
        var $this = $(this);
        var selected = $this.children('option:selected');
        if (selected.length !== 1) {
            selected = $this.children().first();
        }
        var html = [];
        html.push('<div class="dropdown' +
            ($this.hasClass('ellipsis') ? ' ellipsis' : '') +
            ($this.hasClass('align-left') ? ' align-left' : '') +
            ($this.hasClass('align-right') ? ' align-right' : '') +
            ($this.hasClass('direction-up') ? ' direction-up' : '') +
            '">');

        var attr = $this.attr('class');
        var theme = '';
        if (typeof attr !== typeof undefined && attr !== false) {
            var temp = attr.split(' ');
            temp = $.grep(temp, function (item, index) {
                return item.trim().match(/^theme-/);
            });
            if (temp.length === 1) {
                theme = temp[0];
            }
        }
        html.push('<div tabindex="0" class="' + theme + '"><label>' + selected.text() + '</label><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></div>');
        html.push('<ul class="' + theme + '">');
        $this.children(':not([value=""])').each(function (index) {
            var $that = $(this);
            var text = $that.text();
            if (text.indexOf('$$') == 0) {
                $that.attr('data-math', text);
            }

            html.push('<li data-id="' + $that.val() + '"' + ($that.is(':selected') ? ' class="selected"' : '') + '><div tabindex="0" class="theme-light"><label>' + text + '</label><svg focusable="false"><use xlink:href="#svg-checkmark"></use></svg></div></li>');
        });
        html.push('</ul>');
        html.push('</div>');
        var dropdown = html.join("");
        $this.after(dropdown);
        dropdown = $this.next();
        dropdown.on('click', '> div', function () {
            var $that = $(this);
            $that.parent().toggleClass('open');
        });
        dropdown.on('click', 'li', function () {
            var $that = $(this);
            if (!$that.hasClass('selected')) {
                $that.siblings('.selected').removeClass('selected');
                $that.addClass('selected');
                var option = $this.children('[value="' + $that.attr('data-id') + '"]');
                var text = $that.text();
                var math = option.attr('data-math');
                if (math !== undefined) {
                    text = math;
                }
                var label = dropdown.children('div').children('label');
                label.text(text);
                if (math !== undefined) {
                    renderMathInElement(label[0]);
                }
                $this.children(':selected').removeAttr('selected');
                option.attr('selected', 'selected');
                $this.change();
            }
            dropdown.removeClass('open');
        });
    });
};

$(window).click(function (e) {
    var target = $(e.target);
    if (target.closest("div.dropdown").length) {
        $('div.dropdown').not(target.closest("div.dropdown")).removeClass('open');
    }

    if (!target.closest(".dropdown").length) {
        $('div.dropdown').removeClass('open');
    }
});
var app = app || {};

app.addValidation = function (form, rules, messages) {
    form.validate({
        rules: rules,
        messages: messages,
        errorElement: "em",
        errorPlacement: function (error, element) {
            element = element.parent();
            if (element.hasClass('checkbox') || element.hasClass('radio') || element.hasClass('input-group')) {
                element = element.parent();
            }
            element.append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("theme-danger").removeClass("theme-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("theme-success").removeClass("theme-danger");
        }
    });
    form.on('change', 'input, textarea, select', function () {
        $(this).valid();
    });
};

$(function () {
    $.validator.setDefaults({
        submitHandler: function () {
            alert("Submitted!");
        }
    });

    $.validator.addMethod('password', function (value) {
        return /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{8,}$/.test(value);
    }, 'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number');
});
var app = app || {};

app.lazy = function (elements) {
    elements.lazy({
        afterLoad: function (element) {
            element.removeClass('lazy');
        }
    });
};
var app = app || {};

app.tooltipster = function (elements) {
    elements.each(function () {
        var $this = $(this);
        var interactive = $this.hasClass('interactive');
        $this.tooltipster({
            animationDuration: 0,
            interactive: interactive,
            trigger: 'custom',
            triggerOpen: {
                mouseenter: true,
                touchstart: true
            },
            triggerClose: {
                mouseleave: true,
                tap: true,
                scroll: true
            }
        });
    });
};
var app = app || {};

app.assignment = function (assignments) {
    $(assignments).each(function (index, assignment) {
        assignment = $(assignment);
        if (assignment.hasClass('move multiple')) {
            app.assignment.move(assignment);
        }
    });
};
app.assignment.move = function (assignment) {
    assignment.attr('data-moving', 0);
    var from = assignment.find('.from .container');
    var items = assignment.find('.item');
    var checkboxes = items.find('input[type=checkbox]');

    var getChecked = function () {
        return $($.map(checkboxes, function (n, i) {
            if (n.checked) {
                return n;
            }
        }));
    };

    var getItem = function (id) {
        return $($.map(items, function (n, i) {
            if (n.getAttribute("data-id") === id) {
                return n;
            }
        }));
    };

    assignment.find('.container').each(function () {
        Sortable.create($(this)[0], {
            group: 'container', draggable: ".item",
            animation: 0,
            scroll: false,
            forceFallback: true,
            fallbackOnBody: true,
            onAdd: function () {
                setTimeout(function () {
                    var checked = getChecked();
                    if (checked.length) {
                        checked.prop('checked', false);
                        assignment.removeClass('moving');
                    }
                }, 0);
            }
        });
    });

    assignment.on('click', '.item input[type=checkbox]', function () {
        var $this = $(this);
        var item = $this.parents('.item');
        var moving = parseInt(assignment.attr('data-moving'));
        if ($this.is(':checked')) {
            moving++;
            assignment.attr('data-moving', moving);
            assignment.addClass('moving');
        } else {
            moving--;
            assignment.attr('data-moving', moving);
            if (moving === 0) {
                assignment.removeClass('moving');
            }
        }
    });

    assignment.on('click', '.place', function () {
        assignment.removeClass('moving');
        var checked = getChecked();
        if (checked.length) {
            checked.prop('checked', false);
            $(this).parent('.header').next().children('.container').append(checked.parent());
        }
    });

    assignment.on('click', 'button[type="submit"]', function () {
        if (!assignment.hasClass('validated')) {
            var checked = getChecked();
            if (checked.length) {
                checked.prop('checked', false);
            }
            assignment.addClass('validated');

            // this should be retrieved with api call
            var correct = [
                {
                    id: '1', // TV
                    items: ['5', '7']
                },
                {
                    id: '2', // Games
                    items: ['6', '8']
                },
                {
                    id: '3', // Music
                    items: ['2', '4']
                },
                {
                    id: '4', // Sport
                    items: ['1', '3']
                }
            ];

            $(correct).each(function (i, data) {
                $(data.items).each(function (j, id) {
                    var item = getItem(id);
                    if (item.parent().attr('data-id') === data.id) {
                        item.addClass('valid');
                    } else if (item.parents('.to').length) {
                        item.addClass('invalid');
                    }
                });
            });
        }
    });

    assignment.on('click', 'button[type="reset"]', function () {
        items.removeClass('valid invalid');
        var checked = getChecked();
        if (checked.length) {
            checked.prop('checked', false);
        }
        from.append(items);
        assignment.removeClass('validated moving');
    });
}
var app = app || {};
var google;

app.checkGoogleMaps = function () {
    if (app.google !== undefined && google !== undefined) {
        if (app.html.hasClass('transitions')) {
            setTimeout(function () {
                google.maps.event.trigger(app.google, 'resize');
            }, app.transitionTime);
        } else {
            google.maps.event.trigger(app.google, 'resize');
        }
        return true;
    } else {
        return false;
    }
};

$(function () {
    app.content.on('click', '#toggle-google-maps', function () {
        if (!app.checkGoogleMaps()) {
            $('<div id="google-maps"><div class="embed aspect-ratio-16by9"></div></div>').insertAfter($(this));
            app.google = document.getElementById('google-maps').children[0];
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcomDjRS4Nu3RQCkkSIQ0nrBhuQM0gng', function (data, textStatus, jqxhr) {
                var uluru = { lat: -25.363, lng: 131.044 };
                var map = new google.maps.Map(app.google, {
                    zoom: 4,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
                $(window).resize('#google-maps', function () {
                    google.maps.event.trigger(app.google, 'resize');
                });
            });
        } else {
            $(app.google).parent().toggle();
        }
    });
});
var app = app || {};

$(function () {
    app.content.on('click', '#toggle-youtube', function () {
        if (app.youtube === undefined) {
            $('<div id="youtube"><div class="embed aspect-ratio-16by9"><iframe src="https://www.youtube.com/embed/ue80QwXMRHg" allowfullscreen></iframe></div></div>').insertAfter($(this));
            app.youtube = app.content.find('#youtube');
        } else {
            app.youtube.toggle();
        }
    });
});
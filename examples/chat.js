/*!
  * snack.js (c) Ryan Florence
  * https://github.com/rpflorence/snack
  * MIT License
  * Inspiration and code adapted from
  *  MooTools      (c) Valerio Proietti   MIT license
  *  jQuery        (c) John Resig         Dual license MIT or GPL Version 2
  *  contentLoaded (c) Diego Perini       MIT License
  *  Zepto.js      (c) Thomas Fuchs       MIT License
 */
typeof Object.create!="function"&&(Object.create=function(a){function b(){}b.prototype=a;return new b}),!function(a){var b=a.snack={},c=0,d=Object.prototype.toString,e=[].indexOf,f=[].push;b.extend=function(){if(arguments.length==1)return b.extend(b,arguments[0]);var a=arguments[0];for(var c,d=1,e=arguments.length;d<e;d++)for(c in arguments[d])a[c]=arguments[d][c];return a},b.extend({v:"1.2.3",bind:function(a,b,c){c=c||[];return function(){f.apply(c,arguments);return a.apply(b,c)}},punch:function(a,c,d,e){var f=a[c];a[c]=e?function(){f.apply(a,arguments);return d.apply(a,arguments)}:function(){var c=[].slice.call(arguments,0);c.unshift(b.bind(f,a));return d.apply(a,c)}},create:function(a,c){var d=Object.create(a);if(!c)return d;for(var e in c){if(!c.hasOwnProperty(e))continue;if(!a[e]||typeof c[e]!="function"){d[e]=c[e];continue}b.punch(d,e,c[e])}return d},id:function(){return++c},each:function(a,b,c){if(a.length===void 0){for(var d in a)a.hasOwnProperty(d)&&b.call(c,a[d],d,a);return a}for(var e=0,f=a.length;e<f;e++)b.call(c,a[e],e,a);return a},parseJSON:function(b){if(typeof b=="string"){b=b.replace(/^\s+|\s+$/g,"");var c=/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""));if(!c)throw"Invalid JSON";var d=a.JSON;return d&&d.parse?d.parse(b):(new Function("return "+b))()}},isArray:function(a){return a instanceof Array||d.call(a)=="[object Array]"},indexOf:e?function(a,b){return e.call(b,a)}:function(a,b){for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1}})}(window),!function(a,b){var c={},d;a.wrap=function(b,e){typeof b=="string"&&(b=d(b,e)),b.length||(b=[b]);var f=Object.create(c),g=0,h=b.length;for(;g<h;g++)f[g]=b[g];f.length=h,f.id=a.id();return f},a.extend(a.wrap,{define:function(b,d){if(typeof b!="string")for(var e in b)a.wrap.define(e,b[e]);else c[b]=d},defineEngine:function(a){d=a}}),a.wrap.defineEngine(function(a,c){typeof c=="string"&&(c=b.querySelector(c));return(c||b).querySelectorAll(a)})}(snack,document),!function(a,b,c){function l(){try{i.doScroll("left")}catch(a){setTimeout(l,50);return}k("poll")}function k(d){if(d.type!="readystatechange"||c.readyState=="complete")(d.type=="load"?b:c)[e](f+d.type,k,!1),!g&&(g=!0)&&a.each(j,function(a){a.apply(c)})}var d=c.addEventListener?"addEventListener":"attachEvent",e=c.addEventListener?"removeEventListener":"detachEvent",f=c.addEventListener?"":"on",g=!1,h=!0,i=c.documentElement,j=[];a.extend({stopPropagation:function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1}}),a.listener=function(b,g){b.delegate&&(b.capture=!0,_handler=g,g=function(d){var e=d.target||d.srcElement,f=typeof b.delegate=="string"?a.wrap(b.delegate,b.node):b.delegate(b.node);while(e&&a.indexOf(e,f)==-1)e=e.parentNode;e&&e!==this&&e!==c&&_handler.call(e,d,e)}),b.context&&(g=a.bind(g,b.context));var h={attach:function(){b.node[d](f+b.event,g,b.capture)},detach:function(){b.node[e](f+b.event,g,b.capture)},fire:function(){g.apply(b.node,arguments)}};h.attach();return h},a.ready=function(a){g?a.apply(c):j.push(a)};if(c.createEventObject&&i.doScroll){try{h=!b.frameElement}catch(m){}h&&l()}c[d](f+"DOMContentLoaded",k,!1),c[d](f+"readystatechange",k,!1),b[d](f+"load",k,!1)}(snack,window,document),!function(a){a.publisher=function(b){var c={};b=b||{},a.extend(b,{subscribe:function(b,d,e){var f={fn:d,ctxt:e||{}};c[b]||(c[b]=[]);var g={attach:function(){c[b].push(f)},detach:function(){c[b].splice(a.indexOf(d,c[b]),1)}};g.attach();return g},publish:function(b,d){if(!c[b])return!1;a.each(c[b],function(a){a.fn.apply(a.ctxt,d||[])});return c[b].length}});return b},a.publisher(a)}(snack),!function(a,b,c){function e(){}a.JSONP=function(b,d){var e="jsonp"+a.id(),f=c.createElement("script"),g=!1;a.JSONP[e]=function(b){g=!1,delete a.JSONP[e],d(b)},typeof b.data=="object"&&(b.data=a.toQueryString(b.data));var h={send:function(){g=!0,f.src=b.url+"?"+b.key+"=snack.JSONP."+e+"&"+b.data,c.getElementsByTagName("head")[0].appendChild(f)},cancel:function(){g&&f.parentNode&&f.parentNode.removeChild(f),g=!1,a.JSONP[e]=function(){delete a.JSONP[e]}}};b.now!==!1&&h.send();return h},a.toQueryString=function(b,c){var d=[];a.each(b,function(b,e){c&&(e=c+"["+e+"]");var f;if(a.isArray(b)){var g={};a.each(b,function(a,b){g[b]=a}),f=a.toQueryString(g,e)}else typeof b=="object"?f=a.toQueryString(b,e):f=e+"="+encodeURIComponent(b);b!==null&&d.push(f)});return d.join("&")};var d=function(){var a=function(){return new XMLHttpRequest},b=function(){return new ActiveXObject("MSXML2.XMLHTTP")},c=function(){return new ActiveXObject("Microsoft.XMLHTTP")};try{a();return a}catch(d){try{b();return b}catch(d){c();return c}}}();a.request=function(b,c){if(!(this instanceof a.request))return new a.request(b,c);var e=this;e.options=a.extend({},e.options,b),e.callback=c,e.xhr=new d,e.headers=e.options.headers,e.options.now!==!1&&e.send()},a.request.prototype={options:{exception:e,url:"",data:"",method:"get",now:!0,headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:!0,emulation:!0,urlEncoded:!0,encoding:"utf-8"},onStateChange:function(){var a=this,b=a.xhr;if(b.readyState==4&&!!a.running){a.running=!1,a.status=0;try{var c=b.status;a.status=c==1223?204:c}catch(d){}b.onreadystatechange=e;var f=a.status>=200&&a.status<300?[!1,a.xhr.responseText||"",a.xhr.responseXML]:[a.status];a.callback.apply(a,f)}},setHeader:function(a,b){this.headers[a]=b;return this},getHeader:function(a){try{return this.xhr.getResponseHeader(a)}catch(b){return null}},send:function(){var b=this,d=b.options;if(b.running)return b;b.running=!0;var e=d.data||"",f=String(d.url),g=d.method.toLowerCase();typeof e!="string"&&(e=a.toQueryString(e));if(d.emulation&&a.indexOf(g,["get","post"])<0){var h="_method="+g;e=e?h+"&"+e:h,g="post"}if(d.urlEncoded&&a.indexOf(g,["post","put"])>-1){var i=d.encoding?"; charset="+d.encoding:"";b.headers["Content-type"]="application/x-www-form-urlencoded"+i}f||(f=c.location.pathname);var j=f.lastIndexOf("/");j>-1&&(j=f.indexOf("#"))>-1&&(f=f.substr(0,j)),e&&g=="get"&&(f+=(f.indexOf("?")>-1?"&":"?")+e,e=null);var k=b.xhr;k.open(g.toUpperCase(),f,open.async,d.user,d.password),d.user&&"withCredentials"in k&&(k.withCredentials=!0),k.onreadystatechange=a.bind(b.onStateChange,b);for(var l in b.headers)try{k.setRequestHeader(l,b.headers[l])}catch(m){d.exception.apply(b,[l,b.headers[l]])}k.send(e),d.async||b.onStateChange();return b},cancel:function(){var a=this;if(!a.running)return a;a.running=!1;var b=a.xhr;b.abort(),b.onreadystatechange=e,a.xhr=new d;return a}}}(snack,window,document),!function(a,b){function d(b,c,d,e){var f=b.data(d);f&&a.each(f,function(a){a[c].apply(b,e)});return b}function c(a){return a.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")}a.wrap.define({data:function(){var a={};return function(b,c){var d=a[this.id];d||(d=a[this.id]={});if(c===void 1)return d[b];return d[b]=c}}(),each:function(b,c){return a.each(this,b,c)},addClass:function(a){return this.each(function(b){c(b.className).indexOf(a)>-1||(b.className=c(b.className+" "+a))})},removeClass:function(a){return this.each(function(b){b.className=b.className.replace(new RegExp("(^|\\s)"+a+"(?:\\s|$)"),"$1")})},attach:function(b,c,d){var e=b.split("."),f=[];e[1]&&(f=this.data(e[1])||[]),this.each(function(b){var g={node:b,event:e[0]};d&&(g.delegate=d),f.push(a.listener(g,c))}),e[1]&&this.data(e[1],f);return this},detach:function(a){d(this,"detach",a,null,!0),this.data(a,null);return this},fire:function(a,b){return d(this,"fire",a,b)},delegate:function(a,b,c){return this.attach(a,c,b)}})}(snack,document);

/*!
  * @preserve Qwery - A Blazing Fast query selector engine
  * https://github.com/ded/qwery
  * copyright Dustin Diaz & Jacob Thornton 2012
  * MIT License
  */
(function(a,b,c){typeof module!="undefined"&&module.exports?module.exports=b():typeof c["define"]=="function"&&c.define.amd?define(a,b):c[a]=b()})("qwery",function(){function C(){this.c={}}function H(a){return D.g(a)||D.s(a,"(^|\\s+)"+a+"(\\s+|$)",1)}function I(a,b){var c=0,d=a.length;for(;c<d;c++)b(a[c])}function J(a){for(var b=[],c=0,d=a.length;c<d;++c)V(a[c])?b=b.concat(a[c]):b[b.length]=a[c];return b}function K(a){var b=0,c=a.length,d=[];for(;b<c;b++)d[b]=a[b];return d}function L(a){while(a=a.previousSibling)if(a[h]==1)break;return a}function M(a){return a.match(A)}function N(a,b,c,d,e,f,i,l,m,n,o){var p,q,r,s,t;if(this[h]!==1)return!1;if(b&&b!=="*"&&this[g]&&this[g].toLowerCase()!==b)return!1;if(c&&(q=c.match(j))&&q[1]!==this.id)return!1;if(c&&(t=c.match(k)))for(p=t.length;p--;)if(!H(t[p].slice(1)).test(this.className))return!1;if(m&&Y.pseudos[m]&&!Y.pseudos[m](this,o))return!1;if(d&&!i){s=this.attributes;for(r in s)if(Object.prototype.hasOwnProperty.call(s,r)&&(s[r].name||r)==e)return this}return d&&!P(f,_(this,e)||"",i)?!1:this}function O(a){return E.g(a)||E.s(a,a.replace(t,"\\$1"))}function P(a,b,c){switch(a){case"=":return b==c;case"^=":return b.match(F.g("^="+c)||F.s("^="+c,"^"+O(c),1));case"$=":return b.match(F.g("$="+c)||F.s("$="+c,O(c)+"$",1));case"*=":return b.match(F.g(c)||F.s(c,O(c),1));case"~=":return b.match(F.g("~="+c)||F.s("~="+c,"(?:^|\\s+)"+O(c)+"(?:\\s+|$)",1));case"|=":return b.match(F.g("|="+c)||F.s("|="+c,"^"+O(c)+"(-|$)",1))}return 0}function Q(a,b){var c=[],e=[],f,i,j,k,m,n,o,p,q=b,r=G.g(a)||G.s(a,a.split(z)),s=a.match(y);if(!r.length)return c;k=(r=r.slice(0)).pop(),r.length&&(j=r[r.length-1].match(l))&&(q=X(b,j[1]));if(!q)return c;o=M(k),n=q!==b&&q[h]!==9&&s&&/^[+~]$/.test(s[s.length-1])?function(a){while(q=q.nextSibling)q[h]==1&&(o[1]?o[1]==q[g].toLowerCase():1)&&(a[a.length]=q);return a}([]):q[d](o[1]||"*");for(f=0,i=n.length;f<i;f++)if(p=N.apply(n[f],o))c[c.length]=p;return r.length?(I(c,function(a){S(a,r,s)&&(e[e.length]=a)}),e):c}function R(a,b,c){if(T(b))return a==b;if(V(b))return!!~J(b).indexOf(a);var d=b.split(","),e,f;while(b=d.pop()){e=G.g(b)||G.s(b,b.split(z)),f=b.match(y),e=e.slice(0);if(N.apply(a,M(e.pop()))&&(!e.length||S(a,e,f,c)))return!0}return!1}function S(a,b,c,d){function f(a,d,g){while(g=B[c[d]](g,a))if(T(g)&&N.apply(g,M(b[d]))){if(!d)return g;if(e=f(g,d-1,g))return e}}var e;return(e=f(a,b.length-1,a))&&(!d||$(e,d))}function T(a,b){return a&&typeof a=="object"&&(b=a[h])&&(b==1||b==9)}function U(a){var b=[],c,d;a:for(c=0;c<a.length;++c){for(d=0;d<b.length;++d)if(b[d]==a[c])continue a;b[b.length]=a[c]}return b}function V(a){return typeof a=="object"&&isFinite(a.length)}function W(b){return b?typeof b=="string"?Y(b)[0]:!b[h]&&V(b)?b[0]:b:a}function X(a,b,c){return a[h]===9?a.getElementById(b):a.ownerDocument&&((c=a.ownerDocument.getElementById(b))&&$(c,a)&&c||!$(a,a.ownerDocument)&&i('[id="'+b+'"]',a)[0])}function Y(a,b){var e,f,g=W(b);if(!g||!a)return[];if(a===window||T(a))return!b||a!==window&&T(g)&&$(a,g)?[a]:[];if(a&&V(a))return J(a);if(e=a.match(x)){if(e[1])return(f=X(g,e[1]))?[f]:[];if(e[2])return K(g[d](e[2]));if(ba&&e[3])return K(g[c](e[3]))}return i(a,g)}function Z(a,b){return function(c){var d,e;if(p.test(c)){a[h]!==9&&((e=d=a.getAttribute("id"))||a.setAttribute("id",e="__qwerymeupscotty"),c='[id="'+e+'"]'+c,b(a.parentNode||a,c,!0),d||a.removeAttribute("id"));return}c.length&&b(a,c,!1)}}var a=document,b=a.documentElement,c="getElementsByClassName",d="getElementsByTagName",e="querySelectorAll",f="useNativeQSA",g="tagName",h="nodeType",i,j=/#([\w\-]+)/,k=/\.[\w\-]+/g,l=/^#([\w\-]+)$/,m=/^\.([\w\-]+)$/,n=/^([\w\-]+)$/,o=/^([\w]+)?\.([\w\-]+)$/,p=/(^|,)\s*[>~+]/,q=/^\s+|\s*([,\s\+\~>]|$)\s*/g,r=/[\s\>\+\~]/,s=/(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,t=/([.*+?\^=!:${}()|\[\]\/\\])/g,u=/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,v=/\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,w=/:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,x=new RegExp(l.source+"|"+n.source+"|"+m.source),y=new RegExp("("+r.source+")"+s.source,"g"),z=new RegExp(r.source+s.source),A=new RegExp(u.source+"("+v.source+")?"+"("+w.source+")?"),B={" ":function(a){return a&&a!==b&&a.parentNode},">":function(a,b){return a&&a.parentNode==b.parentNode&&a.parentNode},"~":function(a){return a&&a.previousSibling},"+":function(a,b,c,d){return a?(c=L(a))&&(d=L(b))&&c==d&&c:!1}};C.prototype={g:function(a){return this.c[a]||undefined},s:function(a,b,c){return b=c?new RegExp(b):b,this.c[a]=b}};var D=new C,E=new C,F=new C,G=new C,$="compareDocumentPosition"in b?function(a,b){return(b.compareDocumentPosition(a)&16)==16}:"contains"in b?function(a,c){return c=c[h]===9||c==window?b:c,c!==a&&c.contains(a)}:function(a,b){while(a=a.parentNode)if(a===b)return 1;return 0},_=function(){var b=a.createElement("p");return(b.innerHTML='<a href="#x">x</a>')&&b.firstChild.getAttribute("href")!="#x"?function(a,b){return b==="class"?a.className:b==="href"||b==="src"?a.getAttribute(b,2):a.getAttribute(b)}:function(a,b){return a.getAttribute(b)}}(),ba=!!a[c],bb=a.querySelector&&a[e],bc=function(a,b){var c=[],d,f;try{return b[h]===9||!p.test(a)?K(b[e](a)):(I(d=a.split(","),Z(b,function(a,b){f=a[e](b),f.length==1?c[c.length]=f.item(0):f.length&&(c=c.concat(K(f)))})),d.length>1&&c.length>1?U(c):c)}catch(g){}return bd(a,b)},bd=function(a,b){var c=[],e,f,g,i,j,k;a=a.replace(q,"$1");if(f=a.match(o)){j=H(f[2]),e=b[d](f[1]||"*");for(g=0,i=e.length;g<i;g++)j.test(e[g].className)&&(c[c.length]=e[g]);return c}return I(k=a.split(","),Z(b,function(a,d,e){j=Q(d,a);for(g=0,i=j.length;g<i;g++)if(a[h]===9||e||$(j[g],b))c[c.length]=j[g]})),k.length>1&&c.length>1?U(c):c},be=function(a){typeof a[f]!="undefined"&&(i=a[f]?bb?bc:bd:bd)};return be({useNativeQSA:!0}),Y.configure=be,Y.uniq=U,Y.is=R,Y.pseudos={},Y},this);

/*!
  * Bonzo: DOM Utility (c) Dustin Diaz 2012
  * https://github.com/ded/bonzo
  * License MIT
  */
(function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=t():typeof n["define"]=="function"&&n.define.amd?define(e,t):n[e]=t()})("bonzo",function(){function M(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function _(e,t,n,r){var i,s=0,o=e.length;for(;s<o;s++)i=r?e.length-s-1:s,t.call(n||e[i],e[i],i,e);return e}function D(e,t,n){for(var r=0,i=e.length;r<i;r++)I(e[r])&&(D(e[r].childNodes,t,n),t.call(n||e[r],e[r],r,e));return e}function P(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}function H(e){return e?e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():e}function B(e){e[x]("data-node-uid")||e[S]("data-node-uid",++y);var t=e[x]("data-node-uid");return g[t]||(g[t]={})}function j(e){var t=e[x]("data-node-uid");t&&delete g[t]}function F(e){var t;try{return e===null||e===undefined?undefined:e==="true"?!0:e==="false"?!1:e==="null"?null:(t=parseFloat(e))==e?t:e}catch(n){}return undefined}function I(e){return e&&e.nodeName&&(e.nodeType==1||e.nodeType==11)}function q(e,t,n){for(var r=0,i=e.length;r<i;++r)if(t.call(n||null,e[r],r,e))return!0;return!1}function R(e){return e=="transform"&&(e=N.transform)||/^transform-?[Oo]rigin$/.test(e)&&(e=N.transform+"Origin")||e=="float"&&(e=N.cssFloat),e?P(e):null}function z(e,t,n,r){var s=0,o=t||this,u=[],a=i&&typeof e=="string"&&e.charAt(0)!="<"?i(e):e;return _($(a),function(e,t){_(o,function(r){n(e,u[s++]=t>0?J(o,r):r)},null,r)},this,r),o.length=s,_(u,function(e){o[--s]=e},null,!r),o}function W(e,t,n){var r=Y(e),i=r.css("position"),s=r.offset(),o="relative",u=i==o,a=[parseInt(r.css("left"),10),parseInt(r.css("top"),10)];i=="static"&&(r.css("position",o),i=o),isNaN(a[0])&&(a[0]=u?0:e.offsetLeft),isNaN(a[1])&&(a[1]=u?0:e.offsetTop),t!=null&&(e.style.left=t-s.left+a[0]+E),n!=null&&(e.style.top=n-s.top+a[1]+E)}function X(e,t){return typeof t=="function"?t(e):t}function V(e){this.length=0;if(e){e=typeof e!="string"&&!e.nodeType&&typeof e.length!="undefined"?e:[e],this.length=e.length;for(var t=0;t<e.length;t++)this[t]=e[t]}}function $(e,t,n){var r,i,s;if(typeof e=="string")return Y.create(e);I(e)&&(e=[e]);if(n){s=[];for(r=0,i=e.length;r<i;r++)s[r]=J(t,e[r]);return s}return e}function J(e,t){var n=t.cloneNode(!0),r,i;if(e.$&&typeof e.cloneEvents=="function"){e.$(n).cloneEvents(t),r=e.$(n).find("*"),i=e.$(t).find("*");for(var s=0;s<i.length;s++)e.$(r[s]).cloneEvents(i[s])}return n}function K(t,n,r){var i=this[0];return i?t==null&&n==null?(Q(i)?G():{x:i.scrollLeft,y:i.scrollTop})[r]:(Q(i)?e.scrollTo(t,n):(t!=null&&(i.scrollLeft=t),n!=null&&(i.scrollTop=n)),this):this}function Q(t){return t===e||/^(?:body|html)$/i.test(t.tagName)}function G(){return{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop}}function Y(e){return new V(e)}var e=window,t=e.document,n=t.documentElement,r="parentNode",i=null,s=/^(checked|value|selected|disabled)$/i,o=/^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,u=["<table>","</table>",1],a=["<table><tbody><tr>","</tr></tbody></table>",3],f=["<select>","</select>",1],l=["_","",0,1],c={thead:u,tbody:u,tfoot:u,colgroup:u,caption:u,tr:["<table><tbody>","</tbody></table>",2],th:a,td:a,col:["<table><colgroup>","</colgroup></table>",2],fieldset:["<form>","</form>",1],legend:["<form><fieldset>","</fieldset></form>",2],option:f,optgroup:f,script:l,style:l,link:l,param:l,base:l},h=/^(checked|selected|disabled)$/,p=/msie/i.test(navigator.userAgent),d,v,m,g={},y=0,b=/^-?[\d\.]+$/,w=/^data-(.+)$/,E="px",S="setAttribute",x="getAttribute",T="getElementsByTagName",N=function(){var e=t.createElement("p");return e.innerHTML='<a href="#x">x</a><table style="float:left;"></table>',{hrefExtended:e[T]("a")[0][x]("href")!="#x",autoTbody:e[T]("tbody").length!==0,computedStyle:t.defaultView&&t.defaultView.getComputedStyle,cssFloat:e[T]("table")[0].style.styleFloat?"styleFloat":"cssFloat",transform:function(){var t=["webkitTransform","MozTransform","OTransform","msTransform","Transform"],n;for(n=0;n<t.length;n++)if(t[n]in e.style)return t[n]}(),classList:"classList"in e,opasity:function(){return typeof t.createElement("a").style.opacity!="undefined"}()}}(),C=/(^\s*|\s*$)/g,k=/\s+/,L=String.prototype.toString,A={lineHeight:1,zoom:1,zIndex:1,opacity:1,boxFlex:1,WebkitBoxFlex:1,MozBoxFlex:1},O=String.prototype.trim?function(e){return e.trim()}:function(e){return e.replace(C,"")},U=N.computedStyle?function(e,n){var r=null,i=t.defaultView.getComputedStyle(e,"");return i&&(r=i[n]),e.style[n]||r}:p&&n.currentStyle?function(e,t){if(t=="opacity"&&!N.opasity){var n=100;try{n=e.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(r){try{n=e.filters("alpha").opacity}catch(i){}}return n/100}var s=e.currentStyle?e.currentStyle[t]:null;return e.style[t]||s}:function(e,t){return e.style[t]};return N.classList?(d=function(e,t){return e.classList.contains(t)},v=function(e,t){e.classList.add(t)},m=function(e,t){e.classList.remove(t)}):(d=function(e,t){return M(t).test(e.className)},v=function(e,t){e.className=O(e.className+" "+t)},m=function(e,t){e.className=O(e.className.replace(M(t)," "))}),V.prototype={get:function(e){return this[e]||null},each:function(e,t){return _(this,e,t)},deepEach:function(e,t){return D(this,e,t)},map:function(e,t){var n=[],r,i;for(i=0;i<this.length;i++)r=e.call(this,this[i],i),t?t(r)&&n.push(r):n.push(r);return n},html:function(e,t){var r=t?n.textContent===undefined?"innerText":"textContent":"innerHTML",i=this,s=function(t,n){_($(e,i,n),function(e){t.appendChild(e)})},u=function(n,i){try{if(t||typeof e=="string"&&!o.test(n.tagName))return n[r]=e}catch(u){}s(n,i)};return typeof e!="undefined"?this.empty().each(u):this[0]?this[0][r]:""},text:function(e){return this.html(e,!0)},append:function(e){var t=this;return this.each(function(n,r){_($(e,t,r),function(e){n.appendChild(e)})})},prepend:function(e){var t=this;return this.each(function(n,r){var i=n.firstChild;_($(e,t,r),function(e){n.insertBefore(e,i)})})},appendTo:function(e,t){return z.call(this,e,t,function(e,t){e.appendChild(t)})},prependTo:function(e,t){return z.call(this,e,t,function(e,t){e.insertBefore(t,e.firstChild)},1)},before:function(e){var t=this;return this.each(function(n,i){_($(e,t,i),function(e){n[r].insertBefore(e,n)})})},after:function(e){var t=this;return this.each(function(n,i){_($(e,t,i),function(e){n[r].insertBefore(e,n.nextSibling)},null,1)})},insertBefore:function(e,t){return z.call(this,e,t,function(e,t){e[r].insertBefore(t,e)})},insertAfter:function(e,t){return z.call(this,e,t,function(e,t){var n=e.nextSibling;n?e[r].insertBefore(t,n):e[r].appendChild(t)},1)},replaceWith:function(e,t){var n=Y($(e)).insertAfter(this,t);return this.remove(),V.call(t||this,n),t||this},addClass:function(e){return e=L.call(e).split(k),this.each(function(t){_(e,function(e){e&&!d(t,X(t,e))&&v(t,X(t,e))})})},removeClass:function(e){return e=L.call(e).split(k),this.each(function(t){_(e,function(e){e&&d(t,X(t,e))&&m(t,X(t,e))})})},hasClass:function(e){return e=L.call(e).split(k),q(this,function(t){return q(e,function(e){return e&&d(t,e)})})},toggleClass:function(e,t){return e=L.call(e).split(k),this.each(function(n){_(e,function(e){e&&(typeof t!="undefined"?t?v(n,e):m(n,e):d(n,e)?m(n,e):v(n,e))})})},show:function(e){return e=typeof e=="string"?e:"",this.each(function(t){t.style.display=e})},hide:function(){return this.each(function(e){e.style.display="none"})},toggle:function(e,t){return t=typeof t=="string"?t:"",typeof e!="function"&&(e=null),this.each(function(n){n.style.display=n.offsetWidth||n.offsetHeight?"none":t,e&&e.call(n)})},first:function(){return Y(this.length?this[0]:[])},last:function(){return Y(this.length?this[this.length-1]:[])},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},parent:function(){return this.related(r)},related:function(e){return this.map(function(t){t=t[e];while(t&&t.nodeType!==1)t=t[e];return t||0},function(e){return e})},focus:function(){return this.length&&this[0].focus(),this},blur:function(){return this.length&&this[0].blur(),this},css:function(n,r){function o(e,t,n){for(var r in s)if(s.hasOwnProperty(r)){n=s[r],(t=R(r))&&b.test(n)&&!(t in A)&&(n+=E);try{e.style[t]=X(e,n)}catch(i){}}}var i,s=n;return r===undefined&&typeof n=="string"?(r=this[0],r?r===t||r===e?(i=r===t?Y.doc():Y.viewport(),n=="width"?i.width:n=="height"?i.height:""):(n=R(n))?U(r,n):null:null):(typeof n=="string"&&(s={},s[n]=r),p&&s.opacity&&(s.filter="alpha(opacity="+s.opacity*100+")",s.zoom=n.zoom||1,delete s.opacity),this.each(o))},offset:function(e,n){if(typeof e=="number"||typeof n=="number")return this.each(function(t){W(t,e,n)});if(!this[0])return{top:0,left:0,height:0,width:0};var r=this[0],i=r.offsetWidth,s=r.offsetHeight,o=r.offsetTop,u=r.offsetLeft;while(r=r.offsetParent)o+=r.offsetTop,u+=r.offsetLeft,r!=t.body&&(o-=r.scrollTop,u-=r.scrollLeft);return{top:o,left:u,height:s,width:i}},dim:function(){if(!this.length)return{height:0,width:0};var e=this[0],t=!e.offsetWidth&&!e.offsetHeight?function(t){var n={position:e.style.position||"",visibility:e.style.visibility||"",display:e.style.display||""};return t.first().css({position:"absolute",visibility:"hidden",display:"block"}),n}(this):null,n=e.offsetWidth,r=e.offsetHeight;return t&&this.first().css(t),{height:r,width:n}},attr:function(e,t){var n=this[0];if(typeof e=="string"||e instanceof String)return typeof t=="undefined"?n?s.test(e)?h.test(e)&&typeof n[e]=="string"?!0:n[e]:e!="href"&&e!="src"||!N.hrefExtended?n[x](e):n[x](e,2):null:this.each(function(n){s.test(e)?n[e]=X(n,t):n[S](e,X(n,t))});for(var r in e)e.hasOwnProperty(r)&&this.attr(r,e[r]);return this},removeAttr:function(e){return this.each(function(t){h.test(e)?t[e]=!1:t.removeAttribute(e)})},val:function(e){return typeof e=="string"?this.attr("value",e):this.length?this[0].value:null},data:function(e,t){var n=this[0],r,i;return typeof t=="undefined"?n?(r=B(n),typeof e=="undefined"?(_(n.attributes,function(e){(i=(""+e.name).match(w))&&(r[P(i[1])]=F(e.value))}),r):(typeof r[e]=="undefined"&&(r[e]=F(this.attr("data-"+H(e)))),r[e])):null:this.each(function(n){B(n)[e]=t})},remove:function(){return this.deepEach(j),this.each(function(e){e[r]&&e[r].removeChild(e)})},empty:function(){return this.each(function(e){D(e.childNodes,j);while(e.firstChild)e.removeChild(e.firstChild)})},detach:function(){return this.each(function(e){e[r].removeChild(e)})},scrollTop:function(e){return K.call(this,null,e,"y")},scrollLeft:function(e){return K.call(this,e,null,"x")}},Y.setQueryEngine=function(e){i=e,delete Y.setQueryEngine},Y.aug=function(e,t){for(var n in e)e.hasOwnProperty(n)&&((t||V.prototype)[n]=e[n])},Y.create=function(e){return typeof e=="string"&&e!==""?function(){var n=/^\s*<([^\s>]+)/.exec(e),i=t.createElement("div"),s=[],o=n?c[n[1].toLowerCase()]:null,u=o?o[2]+1:1,a=o&&o[3],f=r,l=N.autoTbody&&o&&o[0]=="<table>"&&!/<tbody/i.test(e);i.innerHTML=o?o[0]+e+o[1]:e;while(u--)i=i.firstChild;a&&i&&i.nodeType!==1&&(i=i.nextSibling);do(!n||i.nodeType==1)&&(!l||i.tagName.toLowerCase()!="tbody")&&s.push(i);while(i=i.nextSibling);return _(s,function(e){e[f]&&e[f].removeChild(e)}),s}():I(e)?[e.cloneNode(!0)]:[]},Y.doc=function(){var e=Y.viewport();return{width:Math.max(t.body.scrollWidth,n.scrollWidth,e.width),height:Math.max(t.body.scrollHeight,n.scrollHeight,e.height)}},Y.firstChild=function(e){for(var t=e.childNodes,n=0,r=t&&t.length||0,i;n<r;n++)t[n].nodeType===1&&(i=t[r=n]);return i},Y.viewport=function(){return{width:p?n.clientWidth:self.innerWidth,height:p?n.clientHeight:self.innerHeight}},Y.isAncestor="compareDocumentPosition"in n?function(e,t){return(e.compareDocumentPosition(t)&16)==16}:"contains"in n?function(e,t){return e!==t&&e.contains(t)}:function(e,t){while(t=t[r])if(t===e)return!0;return!1},Y},this);

/*!
  * bean.js - copyright Jacob Thornton 2011
  * https://github.com/fat/bean
  * MIT License
  * special thanks to:
  * dean edwards: http://dean.edwards.name/
  * dperini: https://github.com/dperini/nwevents
  * the entire mootools team: github.com/mootools/mootools-core
  */
!function(e,t,n){typeof module!="undefined"?module.exports=n(e,t):typeof define=="function"&&typeof define.amd=="object"?define(n):t[e]=n(e,t)}("bean",this,function(e,t){var n=window,r=t[e],i=/over|out/,s=/[^\.]*(?=\..*)\.|.*/,o=/\..*/,u="addEventListener",a="attachEvent",f="removeEventListener",l="detachEvent",c="ownerDocument",h="target",p="querySelectorAll",d=document||{},v=d.documentElement||{},m=v[u],g=m?u:a,y=Array.prototype.slice,b=/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,w=/mouse.*(wheel|scroll)/i,E=/^text/i,S=/^touch|^gesture/i,x={},T=function(e,t,n){for(n=0;n<t.length;n++)e[t[n]]=1;return e}({},("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll "+(m?"show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ":"")).split(" ")),N=function(){function n(e){var n=e.relatedTarget;return n?n!==this&&n.prefix!=="xul"&&!/document/.test(this.toString())&&!t(n,this):n===null}var e="compareDocumentPosition",t=e in v?function(t,n){return n[e]&&(n[e](t)&16)===16}:"contains"in v?function(e,t){return t=t.nodeType===9||t===window?v:t,t!==e&&t.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0};return{mouseenter:{base:"mouseover",condition:n},mouseleave:{base:"mouseout",condition:n},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),C=function(){var e="altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),t=e.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),n=t.concat("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")),r=e.concat("char charCode key keyCode keyIdentifier keyLocation".split(" ")),s=e.concat(["data"]),o=e.concat("touches targetTouches changedTouches scale rotation".split(" ")),u=e.concat(["data","origin","source"]),a=e.concat(["state"]),f="preventDefault",l=function(e){return function(){e[f]?e[f]():e.returnValue=!1}},c="stopPropagation",p=function(e){return function(){e[c]?e[c]():e.cancelBubble=!0}},m=function(e){return function(){e[f](),e[c](),e.stopped=!0}},g=function(e,t,n){var r,i;for(r=n.length;r--;)i=n[r],!(i in t)&&i in e&&(t[i]=e[i])};return function(y,x){var T={originalEvent:y,isNative:x};if(!y)return T;var N,C=y.type,k=y[h]||y.srcElement;T[f]=l(y),T[c]=p(y),T.stop=m(T),T[h]=k&&k.nodeType===3?k.parentNode:k;if(x){if(C.indexOf("key")!==-1)N=r,T.keyCode=y.keyCode||y.which;else if(b.test(C)){N=t,T.rightClick=y.which===3||y.button===2,T.pos={x:0,y:0};if(y.pageX||y.pageY)T.clientX=y.pageX,T.clientY=y.pageY;else if(y.clientX||y.clientY)T.clientX=y.clientX+d.body.scrollLeft+v.scrollLeft,T.clientY=y.clientY+d.body.scrollTop+v.scrollTop;i.test(C)&&(T.relatedTarget=y.relatedTarget||y[(C==="mouseover"?"from":"to")+"Element"])}else S.test(C)?N=o:w.test(C)?N=n:E.test(C)?N=s:C==="message"?N=u:C==="popstate"&&(N=a);g(y,T,N||e)}return T}}(),k=function(e,t){return!m&&!t&&(e===d||e===n)?v:e},L=function(){function e(e,t,n,r,i){var s=this.isNative=T[t]&&e[g];this.element=e,this.type=t,this.handler=n,this.original=r,this.namespaces=i,this.custom=N[t],this.eventType=m||s?t:"propertychange",this.customType=!m&&!s&&t,this[h]=k(e,s),this[g]=this[h][g]}return e.prototype={inNamespaces:function(e){var t,n;if(!e)return!0;if(!this.namespaces)return!1;for(t=e.length;t--;)for(n=this.namespaces.length;n--;)if(e[t]===this.namespaces[n])return!0;return!1},matches:function(e,t,n){return this.element===e&&(!t||this.original===t)&&(!n||this.handler===n)}},e}(),A=function(){var e={},t=function(n,r,i,s,o){if(!r||r==="*")for(var u in e)u.charAt(0)==="$"&&t(n,u.substr(1),i,s,o);else{var a=0,f,l=e["$"+r],c=n==="*";if(!l)return;for(f=l.length;a<f;a++)if(c||l[a].matches(n,i,s))if(!o(l[a],l,a,r))return}},n=function(t,n,r){var i,s=e["$"+n];if(s)for(i=s.length;i--;)if(s[i].matches(t,r,null))return!0;return!1},r=function(e,n,r){var i=[];return t(e,n,r,null,function(e){return i.push(e)}),i},i=function(t){return(e["$"+t.type]||(e["$"+t.type]=[])).push(t),t},s=function(n){t(n.element,n.type,null,n.handler,function(t,n,r){return n.splice(r,1),n.length===0&&delete e["$"+t.type],!1})},o=function(){var t,n=[];for(t in e)t.charAt(0)==="$"&&(n=n.concat(e[t]));return n};return{has:n,get:r,put:i,del:s,entries:o}}(),O=d[p]?function(e,t){return t[p](e)}:function(){throw new Error("Bean: No selector engine installed")},M=function(e){O=e},_=m?function(e,t,n,r){e[r?u:f](t,n,!1)}:function(e,t,n,r,i){i&&r&&e["_on"+i]===null&&(e["_on"+i]=0),e[r?a:l]("on"+t,n)},D=function(e,t,r){var i=t.__beanDel,s=function(s){return s=C(s||((this[c]||this.document||this).parentWindow||n).event,!0),i&&(s.currentTarget=i.ft(s[h],e)),t.apply(e,[s].concat(r))};return s.__beanDel=i,s},P=function(e,t,r,i,s,o){var u=t.__beanDel,a=function(a){var f=u?u.ft(a[h],e):this;if(i?i.apply(f,arguments):m?!0:a&&a.propertyName==="_on"+r||!a)a&&(a=C(a||((this[c]||this.document||this).parentWindow||n).event,o),a.currentTarget=f),t.apply(e,a&&(!s||s.length===0)?arguments:y.call(arguments,a?0:1).concat(s))};return a.__beanDel=u,a},H=function(e,t,n,r,i){return function(){e(t,n,i),r.apply(this,arguments)}},B=function(e,t,n,r){var i,s,u,a=t&&t.replace(o,""),f=A.get(e,a,n);for(i=0,s=f.length;i<s;i++)f[i].inNamespaces(r)&&((u=f[i])[g]&&_(u[h],u.eventType,u.handler,!1,u.type),A.del(u))},j=function(e,t,n,r,i){var u,a=t.replace(o,""),f=t.replace(s,"").split(".");if(A.has(e,a,n))return e;a==="unload"&&(n=H(B,e,a,n,r)),N[a]&&(N[a].condition&&(n=P(e,n,a,N[a].condition,i,!0)),a=N[a].base||a),u=A.put(new L(e,a,n,r,f[0]&&f)),u.handler=u.isNative?D(e,u.handler,i):P(e,u.handler,a,!1,i,!1),u[g]&&_(u[h],u.eventType,u.handler,!0,u.customType)},F=function(e,t,n){var r=function(t,r){var i,s=typeof e=="string"?n(e,r):e;for(;t&&t!==r;t=t.parentNode)for(i=s.length;i--;)if(s[i]===t)return t},i=function(e){var n=r(e[h],this);n&&t.apply(n,arguments)};return i.__beanDel={ft:r,selector:e,$:n},i},I=function(e,t,n){var r,i,u,a,f=B,l=t&&typeof t=="string";if(l&&t.indexOf(" ")>0){t=t.split(" ");for(a=t.length;a--;)I(e,t[a],n);return e}i=l&&t.replace(o,""),i&&N[i]&&(i=N[i].type);if(!t||l){if(u=l&&t.replace(s,""))u=u.split(".");f(e,i,n,u)}else if(typeof t=="function")f(e,null,t);else for(r in t)t.hasOwnProperty(r)&&I(e,r,t[r]);return e},q=function(e,t,n,r,i){var s,o,u,a,f=n,l=n&&typeof n=="string";if(t&&!n&&typeof t=="object")for(s in t)t.hasOwnProperty(s)&&q.apply(this,[e,s,t[s]]);else{a=arguments.length>3?y.call(arguments,3):[],o=(l?n:t).split(" "),l&&(n=F(t,f=r,i||O))&&(a=y.call(a,1)),this===x&&(n=H(I,e,t,n,f));for(u=o.length;u--;)j(e,o[u],n,f,a)}return e},R=function(){return q.apply(x,arguments)},U=m?function(e,t,r){var i=d.createEvent(e?"HTMLEvents":"UIEvents");i[e?"initEvent":"initUIEvent"](t,!0,!0,n,1),r.dispatchEvent(i)}:function(e,t,n){n=k(n,e),e?n.fireEvent("on"+t,d.createEventObject()):n["_on"+t]++},z=function(e,t,n){var r,i,u,a,f,l=t.split(" ");for(r=l.length;r--;){t=l[r].replace(o,"");if(a=l[r].replace(s,""))a=a.split(".");if(!a&&!n&&e[g])U(T[t],t,e);else{f=A.get(e,t),n=[!1].concat(n);for(i=0,u=f.length;i<u;i++)f[i].inNamespaces(a)&&f[i].handler.apply(e,n)}}return e},W=function(e,t,n){var r=0,i=A.get(t,n),s=i.length,o,u;for(;r<s;r++)i[r].original&&(u=i[r].handler.__beanDel,u?o=[e,u.selector,i[r].type,i[r].original,u.$]:o=[e,i[r].type,i[r].original],q.apply(null,o));return e},X={add:q,one:R,remove:I,clone:W,fire:z,setSelectorEngine:M,noConflict:function(){return t[e]=r,this}};if(n[a]){var V=function(){var e,t=A.entries();for(e in t)t[e].type&&t[e].type!=="unload"&&I(t[e].element,t[e].type);n[l]("onunload",V),n.CollectGarbage&&n.CollectGarbage()};n[a]("onunload",V)}return X});


/*!
  * Cookie Monster - A javascript cookie library 
  * v0.0.3
  * https://github.com/jgallen23/cookie-monster
  * copyright JGA 2011
  * MIT License
  */
var monster={set:function(a,b,c,d){var e=new Date,f="",g=typeof b,h="";d=d||"/",c&&(e.setTime(e.getTime()+c*24*60*60*1e3),f="; expires="+e.toGMTString());if(g==="object"&&g!=="undefined")if("JSON"in window)h=JSON.stringify({v:b});else throw"Bummer, your browser doesn't support JSON parsing.";else h=escape(b);document.cookie=a+"="+h+f+"; path="+d},get:function(a){var b=a+"=",c=document.cookie.split(";"),d="",e="",f={};for(var g=0;g<c.length;g++){var h=c[g];while(h.charAt(0)==" ")h=h.substring(1,h.length);if(h.indexOf(b)===0){d=h.substring(b.length,h.length),e=d.substring(0,1);if(e=="{"){f=JSON.parse(d);if("v"in f)return f.v}return d=="undefined"?undefined:unescape(d)}}return null},remove:function(a){this.set(a,"",-1)}};

/*!
 * Wrap bonzo and qwery together.
 */
function $(selector) {
  return bonzo(qwery(selector));
}

/* user setup
 * 
 */
bean.add($("form"), "submit", function (e) { $("form").clear(); });

var username = monster.get("chatusername");
if (username != null) {
    $("[name=username]").attr("value", username);
    $($("[name=username]")).attr("disabled", "1");
    $("[name=msg]").focus();
}
else {
    var input = $("[name=username]")[0];
    console.log("input = " + input);
    bean.add(input, {
                 change: function (e) {
                     monster.set(
                         "chatusername", 
                         $("[name=username]").attr("value"),
                         1 // days
                     );
                 },
                 blur: function (e) {
                     $("[name=msg]").focus();
                 }
             });
}

/*
 * Chat stuff
 */
function chatPoll() {
    snack.JSONP(
        { url: '/chat/poll/', key: 'callback', now: true },
        function (d) { 
            console.log(d[0]);
            $($("table tr")[0]).before(
                "<tr><td class=\"username\">"
                    + d[0][1] 
                    + "</td><td class=\"message\">" + d[0][2] 
                    + "</td></tr>"
            );
            setTimeout(chatPoll, 1000);
        }
    );
}

setTimeout(function () { chatPoll(); }, 1000);

/* end chat.js */

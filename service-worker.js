parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var b="network-or-cache-2020-07-23",c=["/","/style.ad7f2269.css","/marianne-regular-webfont.b44facd6.woff2","/marianne-bold-webfont.a256cae5.woff2","/main.43e99205.js","/site.webmanifest","/android-chrome-192x192.43f55a71.png","/android-chrome-512x512.ecbb5c54.png","/android-chrome-512x512-maskable.604b7e49.png","favicon.ico","/favicon-16x16.cf5e819c.png","/favicon-32x32.9512bd90.png","/marianne.d07864ae.png","/arrow-left.58cb70ef.svg","/ei-share-apple.3406814b.svg","/map-marker2.cf561477.svg","/printer.54413b82.svg","/select.83f99688.svg","/star.c032ebcb.svg","/trash.8f1780e9.svg","/accueil.9813c000.svg","/nom.66c2a983.svg","/activitepro.d6eedade.svg","/antecedents.58d3fe93.svg","/caracteristiques.7c612c03.svg","/contactarisque.5fd88f1a.svg","/foyer.1d755664.svg","/pediatrieecole.5dbc0756.svg","/pediatriegeneral.de3c2a65.svg","/pediatriemedical.d0895237.svg","/residence.d3029001.svg","/symptomesactuels.3cdb7555.svg","/symptomespasses.d1d7c671.svg","suivi_gravite.svg","suivi_gravite_superieure.svg","suivi_ok.svg","suivi_stable.svg","suivi_interrogation.svg"],d=500;function f(){return caches.open(b).then(function(e){return e.addAll(c)})}function g(e,s){return new Promise(function(r,t){var a=setTimeout(t,s);fetch(e).then(function(e){clearTimeout(a),r(e)},t)})}function h(e){return caches.open(b).then(function(s){return s.match(e).then(function(e){return e||Promise.reject("no-match")})})}self.addEventListener("install",function(e){console.log("The service worker is being installed"),e.waitUntil(f())}),self.addEventListener("fetch",function(e){console.log("The service worker is serving the asset."),e.respondWith(g(e.request,d).catch(function(){return h(e.request)}))});return{"AaGI":{}};});
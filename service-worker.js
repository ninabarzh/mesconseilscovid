parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var b="network-or-cache-2021-02-26",c=["/","robots.txt","/style.ba74f279.css","/main.6870bfe6.js","/marianne-regular-webfont.b44facd6.woff2","/marianne-bold-webfont.a256cae5.woff2","/site.webmanifest","/android-chrome-192x192.df434f41.png","/android-chrome-384x384.b1b1ef1e.png","/android-chrome-512x512.83acb28b.png","/android-chrome-512x512-maskable.604b7e49.png","/apple-touch-icon.0c25e8dd.png","/safari-pinned-tab.b619e5b5.svg","mstile-150x150.png","/favicon.9c049fd2.ico","/favicon-16x16.1f0d1f44.png","/favicon-32x32.658c0094.png","/marianne.d07864ae.png","/arrow-left.58cb70ef.svg","/ei-share-apple.3406814b.svg","/map-marker2.cf561477.svg","/printer.54413b82.svg","/feedback-negatif.d7720271.svg","/feedback-positif.4e27c6f0.svg","/feedback-contact.d4ba9273.svg","/feedback-flag.6b9fd356.svg","/feedback-social-facebook.81067dc6.svg","/feedback-social-twitter.439cfa09.svg","/information.af39a78a.svg","/information-soumission.666f6c7c.svg","/logo-titre.3a18659d.png","/logo-carre.6ad160e1.png","/select.83f99688.svg","/star.c032ebcb.svg","/trash.8f1780e9.svg","/plus-circle.9e991861.svg","/user-circle.de57182f.svg","/user-circle-blue.bf4b822f.svg","/icone_video.40f9ce90.svg","/icone_fiche.24071d75.svg","/icone_infographie.581d9f73.svg","/timeline-arrow.a2ec15f7.svg","/accueil.9813c000.svg","/activitepro.d6eedade.svg","/contact_medecin.ea136234.svg","/contactarisque.5fd88f1a.svg","/covid.cb851765.svg","/depistage.88b3f1f4.svg","/foyer.1d755664.svg","/gestesbarrieres.fafea6d0.svg","/grossesse.dbccad72.svg","/isolement.36c336a0.svg","/nom.cacdd54a.svg","/pediatrieecole.8efd7e3c.svg","/pediatriegeneral.fe21057f.svg","/pediatriemedical.a920eb5c.svg","/sante.58d3fe93.svg","/situation.d3029001.svg","/symptomesactuels.3cdb7555.svg","/symptomespasses.d1d7c671.svg","/vaccins.486ac464.svg","/suivi_gravite.2be5ab74.svg","/suivi_gravite_superieure.71ef163c.svg","/suivi_ok.0e6b0564.svg","/suivi_stable.aa042c30.svg","/suivi_interrogation.ca18cc71.svg","/departements-1000m.27eaefd6.geojson"],d=2e3;function f(){return caches.keys().then(function(e){return Promise.all(e.map(function(e){if(e!==b)return console.log("Deleting old cache",e),caches.delete(e)}))})}function g(){return caches.open(b).then(function(e){return e.addAll(c)})}function h(e,s){return new Promise(function(i,t){var a=setTimeout(t,s);fetch(e).then(function(e){clearTimeout(a),i(e)},t)})}function j(e){return caches.open(b).then(function(s){return s.match(e).then(function(e){return e||Promise.reject("no-match")})})}self.addEventListener("install",function(e){console.log("The service worker is being installed"),e.waitUntil(g())}),self.addEventListener("message",function(e){"skipWaiting"===e.data&&(console.log("Activating service worker now (skip waiting)"),self.skipWaiting())}),self.addEventListener("activate",function(e){e.waitUntil(f().then(function(){console.log("The service worker is ready to handle fetches")}))}),self.addEventListener("fetch",function(e){e.respondWith(h(e.request,d).catch(function(){return console.debug("Service worker serving ".concat(e.request.url," from cache")),j(e.request)}))});return{"AaGI":{}};});
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.58801d284d43e01847781a11404374aa.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
  }
  if (event.data && event.data.type === 'getUser') {
      self.clients.matchAll().then(all => all.forEach(client => {
          console.log(client);            
      }));
  }
  if (event.data && event.data.type === 'sendMessage') {
      self.clients.matchAll().then(all => all.forEach(client => {
          if (client.visibilityState === 'visible') {
              client.postMessage(event.data);
          } else {
              client.postMessage(event.data);
              self.registration.showNotification(event.data.value.from, {
                  body: event.data.value.message,
              })
          }
      }));
  }
});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
      self.clients.matchAll({type: "window"}).then((clientList) => {
          for (var i = 0; i < clientList.length; i++) {
              var client = clientList[i];
              return client.focus();
          }
          if (clients.openWindow) {
              return clients.openWindow('https://tajwid-socket.herokuapp.com');                    
          }
      })
  )
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});

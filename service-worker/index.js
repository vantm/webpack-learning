import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { skipWaiting, clientsClaim } from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  denylist: [/\/[^/?]+\.[^/]+$/i]
});
registerRoute(navigationRoute);

skipWaiting();
clientsClaim();

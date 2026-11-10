const CACHE='kosha-v10';
self.addEventListener('install',e=>e.waitUntil((async()=>{
 const cache=await caches.open(CACHE);const response=await fetch('/');if(!response.ok)throw new Error('Unable to cache app shell');
 const html=await response.clone().text();await cache.put('/',response);
 const assets=[...html.matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)].map(m=>m[1]);
 await cache.addAll(['/icon.svg','/icon-192.png','/icon-512.png','/manifest.webmanifest',...assets]);await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('kosha-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
 e.respondWith((async()=>{try{const r=await fetch(e.request);if(r.ok){const cache=await caches.open(CACHE);try{await cache.put(e.request,r.clone())}catch{ /* storage quota must not break online use */ }}return r}catch{const found=await caches.match(e.request,{ignoreVary:true});if(found)return found;if(e.request.mode==='navigate')return (await caches.match('/'))||Response.error();return Response.error()}})());
});

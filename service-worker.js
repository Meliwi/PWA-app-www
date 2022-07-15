const FYLO_CACHE = "fylo_cache"
/**
 * These urls are from the files that we want to use whwn there is no internet conection
 */
const urls_to_cache = [
  "/",
  "index.html",
  "/styles/index.css", 
  "/images/avatar-testimonial.jpg",
  "/images/bg-curve-desktop.svg",
  "/images/facebook.svg",
  "/images/icon-32x32.PNG", 
  "/images/icon-144x144.png", 
  "/images/icon-360x360.png", 
  "/images/icon-552x552.png",
  "/images/favicon-32x32.png",
  "/images/favicon-161x161.png",
  "/images/icon-arrow.svg",
  "/images/icon-email.svg",
  "/images/icon-phone.svg",
  "/images/icon-quotes.svg",
  "/images/illustration-1.svg", 
  "/images/illustration-2.svg",
  "/images/instagram.svg", 
  "/images/logo_footer.svg", 
  "/images/logo.svg", 
  "/images/twitter.svg"
]

/**
 * With these event we save info in cache 
 */
self.addEventListener('install', e=> {
    //We register the urls into cache of device
    e.waitUntil(
        caches.open(FYLO_CACHE).then(cache => {
            //save info of urls in cache
            return cache.addAll(urls_to_cache).then(() => self.skipWaiting())
        })
        .catch(err => console.log(err))
    )
})
/**
 * Activates Service worker
 * once the service worker is installed, it wakes up and looks for resources to work offline
 */
self.addEventListener('activate', e => {
    //This is a copy of cache to compare if something change
    const cacheWhiteList = [FYLO_CACHE]
    e.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.map(cacheName => {
                //delete those elements that are no longer needed in cache
                if(cacheWhiteList.indexOf(cacheName) === -1){
                    return caches.delete(cacheName)
                }
            })
        })
        //This tells to sw that cache has ended to update
        .then(() => self.clients.claim())
    )
})

/**
 * If there is internet connection recovers the files of navigator
 * and looks if something changed
 */
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if(res){
                //recover info of cache 
                return res
            }
            //recover info of fetch petition
            return fetch(e.request)
        })
    )
})
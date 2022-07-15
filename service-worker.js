const FYLO_CACHE = "fylo_cache"
const urls_to_cache = [
  "/",
  "index.html",
  "/styles/index.css", 
  "/images/avatar-testimonial.jpg",
  "/images/bg-curve-desktop.svg",
  "/images/facebook.svg",
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
 * Event that install service worker
 */
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(FYLO_CACHE).then(cache => {
            //save info of urls in cache
            return cache.addAll(urls_to_cache).then(() => self.skipWaiting())
        })
        .catch(err => console.log(err))
    )
})
/**
 * once the service worker is installed, it wakes up and looks for resources to work offline
 */
self.addEventListener('activate', e => {
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
        .then(() => self.clients.claim())
    )
})

/**
 * when if there is internet connection recover the files
 */
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if(res){
                //recover info of cache 
                return res
            }
            //recover of fetch petition
            return fetch(e.request)
        })
    )
})
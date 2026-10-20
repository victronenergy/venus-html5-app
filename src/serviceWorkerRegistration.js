import { Workbox } from "workbox-window"

export default function registerServiceWorker() {
  if (!import.meta.env.PROD) {
    return
  }

  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ("serviceWorker" in navigator) {
    // BASE_URL always ends with a slash
    const wb = new Workbox(`${import.meta.env.BASE_URL}service-worker.js`)

    wb.addEventListener("installed", (event) => {
      /**
       * We have the condition - event.isUpdate because we don't want to show
       * this message on the very first service worker installation,
       * only on the updated
       */
      if (event.isUpdate) {
        window.location.reload()
      }
    })

    wb.register()
  }
}

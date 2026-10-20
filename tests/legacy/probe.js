// Evaluated inside the page by smoke.mjs / smoke.py. Must be plain ES5 (runs on the oldest engines).
;(function () {
  var root = document.getElementById("root")
  var log = (window.diagConsole && window.diagConsole.getLog && window.diagConsole.getLog()) || []
  var errors = []
  for (var i = 0; i < log.length; i++) {
    if (log[i].level.indexOf("ERR") === 0) errors.push(log[i].message)
  }
  return JSON.stringify({
    errors: errors,
    rootChildren: root ? root.children.length : -1,
    svgCount: root ? root.getElementsByTagName("svg").length : 0,
    ready: !!document.querySelector("[data-app-connected]"),
    text: root ? (root.textContent || "").replace(/\s+/g, " ").slice(0, 200) : "",
  })
})()

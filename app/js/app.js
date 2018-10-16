const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001
const deviceInterface = new MqttInterface(host, port, updateElementValue)

function updateElementValue(path, value) {
  const metric = metricsConfig[path]
  const formattedValue = metric.formatter(value)
  const element = document.getElementById(metric.name)
  if (metric.callback) metric.callback(formattedValue)
  if (element) document.getElementById(metric.name).innerHTML = formattedValue + metric.unit
}

window.onload = function() {
  // deviceInterface.connect()
  deviceInterface.connected = function() {
    document.body.classList.remove("connectionLost")
    document.body.classList.add("connectionOn")
  }
  deviceInterface.lostConnection = function() {
    document.body.classList.remove("connectionOn")
    document.body.classList.add("connectionLost")
  }
}

// don't scroll
window.onscroll = function() {
  window.scrollTo(0, 0)
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

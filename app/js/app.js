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
  deviceInterface.connect()
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

function setupCurrentLimitSelection() {
  var container = document.getElementById("inputLimitSelection")
  container.innerHTML = ""
  selection = document.createElement("h4")
  selection.innerHTML = "Input Limit"
  container.appendChild(selection)

  USAmperage = [10, 15, 20, 30, 50, 100]
  EUAmperage = [6, 10, 13, 16, 25, 32, 63]

  shoreVoltage = 110

  if (shoreVoltage === undefined || shoreVoltage > 150) amperage = EUAmperage
  else amperage = USAmperage

  amperage.forEach(function(currentValue) {
    var selection = document.createElement("a")
    selection.href = "#"
    selection.innerHTML = currentValue + "A"
    selection.addEventListener("click", createSetInputLimitFunction(currentValue))
    container.appendChild(selection)
  })
}

function createSetInputLimitFunction(limit) {
  return function() {
    deviceInterface.write("/vebus/257/Ac/ActiveIn/CurrentLimit", limit)
    hideCurrentLimitSelection()
  }
}

function showCurrentLimitSelection() {
  setupCurrentLimitSelection()
  document.getElementById("mySidenav").style.width = "350px"
}

function hideCurrentLimitSelection() {
  document.getElementById("mySidenav").style.width = "0px"
}

function setMode(mode) {
  if (mode === "on") {
    deviceInterface.write("/vebus/257/Mode", 3)
  } else if (mode === "off") {
    deviceInterface.write("/vebus/257/Mode", 4)
  } else if (mode === "charge") {
    deviceInterface.write("/vebus/257/Mode", 1)
  }
  hideModeSelection()
}

function showModeSelection() {
  document.getElementById("myMultiPlus").style.width = "350px"
}

function hideModeSelection() {
  document.getElementById("myMultiPlus").style.width = "0px"
}

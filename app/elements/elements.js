export var elements = {}

/**
 * Allow for loading files for elements
 */
elements.load = function (path) {
  // Calculate full path
  var caller = new Error().stack
    .split('\n')
    .filter(v => /\([^)]*\)/.test(v))
    .map(v => /\((https?:\/\/[^)]*)\)/.exec(v)[1])
    .map(v => new RegExp('/elements/([^:]*)').exec(v)[1])
    .find(v => !/elements\.js/.test(v))

  var prefix = /(.*)\/.*\.js$/.exec(caller)[1]

  if (path.indexOf('/') !== 0) {
    path = '/' + path
  }

  var fullPath = '/elements/' + prefix + path

  // Translate text to DOM elements
  var fileTypeMap = {
    'css': 'style',
    'js': 'script',
    'html': 'div'
  }
  var elementType = fileTypeMap[/\.(.*)$/.exec(path)[1]]
  var parse = function (content) {
    var element = document.createElement(elementType)
    element.innerHTML = content
    if (elementType === 'div') {
      element = element.children[0]
    }
    return element
  }

  // Check if file is already added to cache
  var fetchCache = elements.load.cache
  if (fetchCache[fullPath]) {
    return fetchCache[fullPath]
  }

  // Create request for loading file
  fetchCache[fullPath] = new Promise((resolve, reject) => {
    function onload () {
      resolve(parse.bind(null, this.responseText))
    }

    var oReq = new XMLHttpRequest()
    oReq.addEventListener('load', onload)
    oReq.open('GET', fullPath)
    oReq.send()
  })
  return fetchCache[fullPath]
}
elements.load.cache = {}

elements.addClass = function (element, className) {
  if (!element) { return }
  var curClass = element.getAttribute('class').split(' ')
  if (curClass.indexOf(className) > -1) { return }
  curClass.push(className)
  element.setAttribute('class', curClass.join(' '))
}

elements.removeClass = function (element, className) {
  if (!element) { return }
  var curClass = element.getAttribute('class').split(' ')
  if (curClass.indexOf(className) < 0) { return }
  curClass = curClass.filter(c => c !== className)
  element.setAttribute('class', curClass.join(' '))
}

elements.dom = function (element) {
  element.dom = element.attachShadow({ mode: 'open' })
  elements.load('style.css')
    .then(temp => {
      element.dom.appendChild(temp())
      elements.renderer(element)
    })
  elements.load('template.html')
    .then(temp => {
      element.dom.appendChild(temp())
      elements.renderer(element)
    })
}

elements.renderer = function (element, valueName) {
  if (valueName) {
    var renderer = 'render' + valueName
    if (typeof element[renderer] === 'function') {
      element[renderer]()
    }
  } else {
    var functions = Object.getOwnPropertyNames(element.constructor.prototype)
    for (var i = 0; i < functions.length; i++) {
      var curFunction = functions[i]
      if (curFunction.indexOf('render') === 0) {
        element[curFunction]()
      }
    }
  }
}

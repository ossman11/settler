import '../header/index.js'
import '../page/index.js'
import '../footer/index.js'
import { elements } from '../elements.js'

class App extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()

    elements.dom(this)

    window.addEventListener('resize', this.onresize.bind(this))
    setTimeout(() => {
      this.onresize()
    }, 0)
  }

  onresize () {
    var compact = window.innerWidth < 450
    var iscompact = this.getAttribute('compact') === ''
    if (compact === iscompact) { return }
    if (compact) {
      this.setAttribute('compact', '')
    } else {
      this.removeAttribute('compact')
    }
  }

  rendercompact () {
    var isCompact = (this.attributes.compact && (
      this.attributes.compact.value === 'true' ||
      this.attributes.compact.value === ''
    ))
    var root = this.dom.querySelector('div')
    if (!root) { return }
    var children = root.children
    for (var i = 0; i < children.length; i++) {
      var curChild = children[i]
      if (isCompact) {
        curChild.setAttribute('compact', '')
      } else {
        curChild.removeAttribute('compact')
      }
    }
  }

  connectedCallback () { }

  disconnectedCallback () { }

  adoptedCallback () { }

  attributeChangedCallback (name, oldValue, newValue) {
    elements.renderer(this, name)
  }

  static get observedAttributes () { return ['compact'] }
}

customElements.define('core-app', App)

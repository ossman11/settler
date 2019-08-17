import '../icon/index.js'
import '../bar/index.js'
import { elements } from '../elements.js'

class Header extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()

    elements.dom(this)
  }

  render () { }

  rendercompact () {
    var isCompact = (this.attributes.compact && (
      this.attributes.compact.value === 'true' ||
      this.attributes.compact.value === ''
    ))
    var bars = this.dom.querySelectorAll('core-bar')
    for (var i = 0; i < bars.length; i++) {
      var curBar = bars[i]
      if (isCompact) {
        curBar.setAttribute('compact', '')
      } else {
        curBar.removeAttribute('compact')
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

customElements.define('core-header', Header)

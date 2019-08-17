import '../footerButton/index.js'
import { elements } from '../elements.js'

class Footer extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()

    elements.dom(this)
  }

  connectedCallback () { }

  disconnectedCallback () { }

  adoptedCallback () { }

  attributeChangedCallback (name, oldValue, newValue) {
    elements.renderer(this, name)
  }

  static get observedAttributes () { return [] }
}

customElements.define('core-footer', Footer)

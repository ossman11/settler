import { elements } from '../elements.js'

class FooterButton extends HTMLElement {
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

customElements.define('core-footer-button', FooterButton)

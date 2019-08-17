import { elements } from '../elements.js'

class Bar extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()

    elements.dom(this)
  }

  render () {
    this.renderdamage()
  }

  renderdamage () {
    if (this.attributes.damage) {
      var damage = Number.parseFloat(this.attributes.damage.value)
      if (damage < 0) { damage = 0 }
      if (damage > 1) { damage = 1 }

      var full = this.dom.querySelector('.full')
      if (!full) { return }
      full.style.width = 'calc(calc(var(--total-width) - 2px) * (1 - ' + damage + ')'
    }
  }

  connectedCallback () { }

  disconnectedCallback () { }

  adoptedCallback () { }

  attributeChangedCallback (name, oldValue, newValue) {
    elements.renderer(this, name)
  }

  static get observedAttributes () { return ['damage'] }
}

customElements.define('core-bar', Bar)

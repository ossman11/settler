import { elements } from '../elements.js'

class Page extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()

    elements.dom(this)
  }

  render () {
    // Temporary binding for mp bar
    if (!this.mp) {
      var mp = this.dom.querySelector('[name="mp"]')
      if (mp) {
        this.mp = mp
        this.mp.addEventListener('input', evt => {
          this.parentElement
            .querySelector('core-header')
            .dom.querySelector('[type="mp"]')
            .setAttribute('damage', 1 - (+evt.currentTarget.value) / 100)
        })
      }
    }

    // Temporary binding for hp bar
    if (!this.hp) {
      var hp = this.dom.querySelector('[name="hp"]')
      if (hp) {
        this.hp = hp
        this.hp.addEventListener('input', evt => {
          this.parentElement
            .querySelector('core-header')
            .dom.querySelector('[type="hp"]')
            .setAttribute('damage', 1 - (+evt.currentTarget.value) / 100)
        })
      }
    }
  }

  connectedCallback () { }

  disconnectedCallback () { }

  adoptedCallback () { }

  attributeChangedCallback (name, oldValue, newValue) {
    elements.renderer(this, name)
  }

  static get observedAttributes () { return [] }
}

customElements.define('core-page', Page)

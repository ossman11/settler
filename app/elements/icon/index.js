import { elements } from '../elements.js'

class Icon extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()

    elements.dom(this)
  }

  rendersize () {
    if (this.attributes.size) {
      if (this.attributes.size.value === 'small') {
        var rootDom = this.dom.querySelector('.root')
        if (!rootDom) { return }
        rootDom.setAttribute('class', 'root small circle')
        this.style.padding = '2px'
      }
    }
  }

  renderdamage (damage) {
    var rootDom = this.dom.querySelector('.root')
    var damageDom = this.dom.querySelector('.damage')
    var healthDom = this.dom.querySelector('.health')
    if ([rootDom, damageDom, healthDom].indexOf(null) > -1) {
      return
    }

    if (!damage) {
      if (!this.attributes.damage) {
        return
      }
      damage = this.attributes.damage.value
    }
    damage = Number.parseFloat(damage)
    if (damage < 0) { damage = 0 }
    if (damage > 1) { damage = 1 }

    var totalheight = rootDom.clientHeight
    var damageHeight = Math.floor(totalheight * damage)
    var healthHeight = totalheight - damageHeight

    damageDom.style.height = damageHeight + 'px'
    healthDom.style.height = healthHeight + 'px'
  }

  renderimage () {
    if (!this.attributes.image) {
      return
    }
    var imageUrl = this.attributes.image.value
    var imageDom = this.dom.querySelector('.image .inner')
    if (!imageDom) { return }
    imageDom.style.backgroundImage = 'url(' + imageUrl + ')'
    imageDom.style.backgroundSize = 'cover'
  }

  connectedCallback () { }

  disconnectedCallback () { }

  adoptedCallback () { }

  attributeChangedCallback (name /*, oldValue, newValue */) {
    elements.renderer(this, name)
  }

  static get observedAttributes () { return ['img', 'effects', 'damage'] }
}

customElements.define('core-icon', Icon)

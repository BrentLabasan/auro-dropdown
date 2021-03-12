// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import "@alaskaairux/auro-input";
import { LitElement, html, css } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

import Popover from "./popover";

/**
 * Popover attaches to an element and displays on hover/blur.
 *
 * @attr {String} placement - Expects top/bottom - position for popover in relation to the element.
 * @attr {String} for - Defines an `id` for an element in the DOM to trigger on hover/blur.
 * @attr {boolean} sticky - If true, popover will persist its visibility when clicked.
 * @attr {boolean} addSpace - If true, will add additional top and bottom space around the appearance of the popover in relation to the trigger..
 * @slot - Default unnamed slot for the use of popover content
 * @slot trigger - Slot for entering the trigger element into the scope of the shadow DOM
 */
class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.privateDefaults();

    this.placement = 'top';

    // adds toggle function to root element based on touch
    this.addEventListener('touchstart', function () {
      this.toggleShow();
      this.setAttribute("isTouch", "true");
    });
  }

  /**
   * @private internal defaults
   * @returns {void}
   */
  privateDefaults() {
    this.isPopoverVisible = false;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      placement: { type: String },
      for: { type: String },
      sticky: { type: Boolean },
      inputFieldText: { type: String },
      inputFieldValue: { type: String }
    };
  }

  static get styles() {
    return css`
      ${styleCss},
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.documentClickHandler = (event) => {
      const path = event.composedPath();

      // if user clicks on something other than trigger or popover, close popover
      if (this.isPopoverVisible && !path.includes(this.trigger) && !path.includes(this.popover)) {
        this.toggleHide();
      }
    };

    document.addEventListener('click', this.documentClickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.documentClickHandler)
  }

  firstUpdated() {
    this.trigger = document.querySelector(`#${this.for}`);
    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(this.trigger, this.popover, this.placement);

    const wtf = (evt, theLis, i) => {
      if (evt.key.toLowerCase() === 'enter' || evt.key.toLowerCase() === 'space') {
        console.log(theLis[i].getAttribute('value'));
        this.shadowRoot.querySelector('auro-input').setAttribute('value', theLis[i].getAttribute('value'))
      }
      if (evt.key.toLowerCase() === 'escape') {
        this.toggleHide();
      }
      

    }

    const handleThisKeyPress = (event) => {
      console.log("handleThisKeyPress()", event.key.toLowerCase());
      if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === 'space') {

        console.log('%c this.isPopoverVisible ' + this.isPopoverVisible, 'background-color: blue; color: yellow;');
        if (this.isPopoverVisible) {
          this.toggleHide();
          let theLis = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
          for (let i = 0; i < theLis.length; i++) {

            theLis[i].removeAttribute('tabindex');
            // theLis[i].removeEventListener('keypress', wtf)

          }
          this.isPopoverVisible = false;
        } else {
          this.toggleShow();
          let theLis = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
          for (let i = 0; i < theLis.length; i++) {

            theLis[i].setAttribute('tabindex', '0')

            if (theLis[i].hasAttribute("brent") === false) {
              theLis[i].addEventListener('keypress', () => wtf(event, theLis, i));
              theLis[i].setAttribute("brent", "true")
              }
          }
          this.isPopoverVisible = true;
        }
      }
      // if (event.key.toLowerCase() === 'escape') {
      //   this.toggleHide();
      // }

    };

    this.addEventListener('keypress', handleThisKeyPress);
    this.addEventListener('focus', () => {debugger; this.shadowRoot.querySelector('auro-input').setAttribute('class', 'manualFocus') }  );

  }

  /**
    * For use with `sticky` property, call method on click event
    * @returns {Void} Fires an update lifecycle.
  */
  toggle() {
    if (this.isPopoverVisible) {
      this.toggleHide();
    } else {
      this.toggleShow();
    }
  }

  /**
   * @private Hides the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleHide() {
    this.popover.removeAttribute('data-show');
    this.popper.hide();
    this.isPopoverVisible = false;
  }

  /**
   * @private Shows the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleShow() {
    this.popover.setAttribute('data-show', '');
    this.popper.show();
    this.isPopoverVisible = true;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    console.log("render()");
    return html`
      
      <auro-input slot="trigger" tabindex="0" id="auro-input1" label="the label text" helptext="the help text"
        value="the value" disabled></auro-input>
      
      <div id="popover" class="popover util_insetLg">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <slot name="tooltip"></slot>
      </div>
      
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}
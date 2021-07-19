// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If using litElement base class
import { LitElement, html } from "lit-element";

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { html, css } from "lit-element";
// import AuroElement from '@alaskaairux/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";
import styleCssFixed from './style-fixed-css.js';

import Popover from "./popover";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
* auro-dropdown provides users a way to ... (it would be great if you fill this out)
 *
 * @attr {Boolean} fixed - Uses fixed pixel values for element shape
 * @attr {String} cssClass - Applies designated CSS class to demo element - you want to delete me!
 */

// build the component class
class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.privateDefaults();

    this.placement = 'bottom-start';

    // adds toggle function to root element based on touch
    this.addEventListener('touchstart', function() {
      this.toggle();
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

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      // this property is DEMO ONLY! Please delete.
      cssClass:   { type: String },

      placement:  { type: String },
      for:        { type: String }
    };
  }

  static get styles() {
    return [
      styleCss,
      styleCssFixed
    ];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.documentClickHandler)
  }

  firstUpdated() {
    this.trigger = document.querySelector(`#${this.for}`);
    // allow placement in shadow roots
    if (this.trigger === null) {
      this.trigger = this.getRootNode().querySelector(`#${this.for}`);
    }

    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(this.trigger, this.popover, this.placement);

    const handleShow = () => {
      this.toggleShow();
    },
    handleHide = () => {
      this.toggleHide();
    },
    handleKeyboardWhenFocusOnTrigger = (event) => {
      const key = event.key.toLowerCase();

      if (this.isPopoverVisible) {
        if (key === 'tab' || key === 'escape') {
          this.toggleHide();
        }
      }

      if (key === ' ' || key === 'enter') {
        this.toggle();
      }
    },
    element = this.trigger.parentElement.nodeName === 'AURO-POPOVER' ? this : this.trigger;

    // element.addEventListener('mouseenter', handleShow);
    // element.addEventListener('mouseleave', handleHide);

    // if user tabs off of trigger, then hide the popover.
    this.trigger.addEventListener('keydown', handleKeyboardWhenFocusOnTrigger);

    // handle gain/loss of focus
    this.trigger.addEventListener('focus', handleShow);
    this.trigger.addEventListener('blur', handleHide);

    // e.g. for a closePopover button in the popover
    this.addEventListener('hidePopover', handleHide);
  }

  /**
    * @private Toggles the display of the popover content
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
    this.popper.hide();
    this.isPopoverVisible = false;
    this.removeAttribute('data-show');
  }

  /**
   * @private Shows the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleShow() {
    this.popper.show();
    this.isPopoverVisible = true;
    this.setAttribute('data-show', true);
  }
  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="popover" class="popover util_insetLg" aria-live="polite">
        <slot role="tooltip"></slot>
      </div>

      <slot name="trigger" data-trigger-placement="${this.placement}"></slot>
    `;
  }
}

// define the name of the custom component
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}

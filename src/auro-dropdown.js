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

    this.addEventListener('toggleShow', this.toggleShow);
    this.addEventListener('changeAttributeGlobally', this.handleChangeAttributeGlobally);
  }

  handleChangeAttributeGlobally(evt) {
    // alert("auro-dropdown.js handleChangeAttributeGlobally()");

    console.log("evt", evt);

    for (const property in evt.detail) {
      // console.log(`${property}: ${evt.detail[property]}`);

      this.setAttribute(property, evt.detail[property]);
    }

    // debugger;

    for (let i = 0; i < this.children.length; i++) {
      // console.log(this.children[i]);

      for (const property in evt.detail) {
        // console.log(`${property}: ${evt.detail[property]}`);
  
        this.children[i].setAttribute(property, evt.detail[property]);
      }
    }
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
    // this.trigger = document.querySelector(`#${this.for}`); // old code
    this.trigger = this.shadowRoot.querySelector("[name='trigger']").assignedNodes({flatten: true})[0]; // TODO
    this.trigger.setAttribute('tabindex', 1);
    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(this.trigger, this.popover, this.placement);

    const handleMousedown = (e) => {
      console.log("handleMousedown")

      // e.stopPropogation();
      console.log("document.activeElement", document.activeElement);
      console.log("this", this);
      console.log(document.activeElement !== this);
      if(document.activeElement !== this.trigger) {
        return null;
      } else {
        this.toggleHide();
      }
    },
    handleHide = (e) => {
      console.log("handleHide")

      this.toggleHide();
    },
    handleClick = (e) => {
      console.log("handleClick")
      console.log(e);
      // e.preventDefault();
      this.toggle();
    },
    handleFocus = (e) => {
      console.log("handleFocus")
      console.log(e);
      
      // if the focus happened because of a click
      if (e.eventPhase === 2 && document.activeElement === this) {
        return null;
      }

      this.toggleShow();
    },
    handleBlur = (e) => {
      console.log("handleBlur")

      this.toggleHide();

    },
    handleKeyboardWhenFocusOnTrigger = (event) => {
      const key = event.key.toLowerCase();

      if (this.isPopoverVisible) {
        if (key === 'tab') {
          if (key === 'escape') {
            this.toggleHide();
          }
          this.toggle();
        }
      }

      if (key === ' ' || key === 'enter') {
        this.toggle();
      }
    };
    // element = this.trigger.parentElement.nodeName === 'AURO-POPOVER' ? this : this.trigger;

    // this.trigger.addEventListener('mouseleave', handleHide);

    // if user tabs off of trigger, then hide the popover.
    this.trigger.addEventListener('keydown', handleKeyboardWhenFocusOnTrigger);
    // this.trigger.addEventListener('click', handleClick);

    this.addEventListener('toggleHide', this.toggleHide);
    this.addEventListener('toggle', this.toggle);

    // this.addEventListener('closeAuroDropdownPopover', function() { alert() }, {
    //   capture : true
    // });
    // this.addEventListener('closeAuroDropdownPopover', this.toggleHide, {capture: true});
    this.addEventListener('closeAuroDropdownPopover', this.toggleHide);


    // handle gain/loss of focus
    // this.trigger.addEventListener('focus', handleFocus);
    // this.trigger.addEventListener('blur', handleBlur);
    // e.g. for a closePopover button in the popover
    // this.addEventListener('hidePopover', handleHide);

    // this.trigger.addEventListener('mousedown', handleMousedown);

    // NOTE: If a user clicks outside of auro-dropdown, the web app itself will detect that click
    // and send the hide event to auro-dropdown
    // this.addEventListener('blur', this.toggleHide())

  }

  /**
    * @private Toggles the display of the popover content
    * @returns {Void} Fires an update lifecycle.
  */
   toggle() {
    console.log("toggle()")

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
    console.log("toggleHide()")

    this.popper.hide();
    this.isPopoverVisible = false;
    this.removeAttribute('data-show');
  }

  /**
   * @private Shows the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleShow() {
    console.log("toggleShow()")

    this.popper.show();
    this.isPopoverVisible = true;
    this.setAttribute('data-show', true);
  }
  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {

    console.log("auro.dropdown.js render()");

    return html`
      <div id="popover" class="popover util_insetLg" aria-live="polite">
        <slot name="popover"></slot>
      </div>

      <slot name="trigger" data-trigger-placement="${this.placement}"></slot>
    `;
  }
}

// define the name of the custom component
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}

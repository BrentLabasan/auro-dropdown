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

    // const handleShow = () => {
    //   this.toggleShow();
    // },
    //   handleHide = () => {
    //     this.toggleHide();
    //   },
    // handleTabWhenFocusOnTrigger = (event) => {
    //   console.log("path C");
    //   if (event.key.toLowerCase() === 'tab') {
    //     console.log("path D");
    //     // this.toggleHide();
    //     // instead of hiding the options list, put focus on first element
    //     // debugger;
    //     // for some reason the first <li> does not get focused on
    //     // I don't know why right now, even when I did the .focus() myself
    //     // I'm going to try see if I can get the tab to focus on anything else in popover
    //     // this.popover.querySelector('slot').assignedNodes()[1].querySelectorAll('li')[0].focus();
    //   }
    // },

    const wtf = (evt, theLis, i) => {
      if (evt.key.toLowerCase() === 'enter' || evt.key.toLowerCase() === 'space ') {
        // debugger;
        alert(theLis[i].getAttribute('value'));
        this.shadowRoot.querySelector('auro-input').setAttribute('value', theLis[i].getAttribute('value'))
      }
    }

    const handleThisKeyPress = (event) => {
      // alert("handleThisKeyPress()");
      if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === 'space ') {
        // console.log("path D");
        // this.toggleHide();
        // instead of hiding the options list, put focus on first element
        // debugger;
        // for some reason the first <li> does not get focused on
        // I don't know why right now, even when I did the .focus() myself
        // I'm going to try see if I can get the tab to focus on anything else in popover
        console.log('%c this.isPopoverVisible ' + this.isPopoverVisible, 'background-color: blue; color: yellow;');
        if (this.isPopoverVisible) {
          this.toggleHide();
          let theLis = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
          for (let i = 0; i < theLis.length; i++) {
            // debugger;

            theLis[i].removeAttribute('tabindex');
            theLis[i].removeEventListener('keypress', wtf)

          }
          this.isPopoverVisible = false;
        } else {
          this.toggleShow();
          let theLis = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
          for (let i = 0; i < theLis.length; i++) {
            // debugger;

            theLis[i].setAttribute('tabindex', '0')

            if (theLis[i].hasAttribute("brent") === false) {
              theLis[i].addEventListener('keypress', () => wtf(event, theLis, i));
              theLis[i].setAttribute("brent", "true")
              }
          }
          // debugger;
          this.isPopoverVisible = true;
        }
        // this.popover.querySelector('slot').assignedNodes()[1].querySelectorAll('li')[0].focus();
      }
    };
    // handleThisKeyDown = (event) => {
    //   alert("handleThisKeyDown()");
    //   if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === 'space ') {
    //     // console.log("path D");
    //     // this.toggleHide();
    //     // instead of hiding the options list, put focus on first element
    //     // debugger;
    //     // for some reason the first <li> does not get focused on
    //     // I don't know why right now, even when I did the .focus() myself
    //     // I'm going to try see if I can get the tab to focus on anything else in popover
    //     this.toggleShow();
    //     this.popover.querySelector('slot').assignedNodes()[1].querySelectorAll('li')[0].focus();
    //   }
    // },
    // handleThisKeyUp = (event) => {
    //   alert("handleThisKeyUp()");
    //   if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === 'space ') {
    //     // console.log("path D");
    //     // this.toggleHide();
    //     // instead of hiding the options list, put focus on first element
    //     // debugger;
    //     // for some reason the first <li> does not get focused on
    //     // I don't know why right now, even when I did the .focus() myself
    //     // I'm going to try see if I can get the tab to focus on anything else in popover
    //     this.toggleShow();
    //     this.popover.querySelector('slot').assignedNodes()[1].querySelectorAll('li')[0].focus();
    //   }
    // },
    // handleThisFocus = (event) => {
    //   alert("handleThisFocus()");
    //   if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === 'space ') {
    //     // console.log("path D");
    //     // this.toggleHide();
    //     // instead of hiding the options list, put focus on first element
    //     // debugger;
    //     // for some reason the first <li> does not get focused on
    //     // I don't know why right now, even when I did the .focus() myself
    //     // I'm going to try see if I can get the tab to focus on anything else in popover
    //     this.toggleShow();
    //     this.popover.querySelector('slot').assignedNodes()[1].querySelectorAll('li')[0].focus();
    //   }
    // },
    // handleTabFocusesOnTrigger = (event) => {
    //   console.log("path A");
    //   if (event.key.toLowerCase() === 'tab') {
    //     console.log("path B")
    //     this.toggleShow();
    //   }
    // };

    /*     if (!this.sticky) {
          this.trigger.addEventListener('touchstart', handleShow);
        }
    
        if (this.sticky) {
          this.trigger.addEventListener('click', handleShow);
        } else {
          this.trigger.addEventListener('mouseenter', handleShow);
          this.trigger.addEventListener('mouseleave', handleHide);
        }
    
        // if user tabs off of trigger, then hide the popover.
        this.trigger.addEventListener('keydown', handleTabWhenFocusOnTrigger);
        this.trigger.addEventListener('keyup', handleTabFocusesOnTrigger); */

    this.addEventListener('keypress', handleThisKeyPress);
    // this.addEventListener('keydown', handleThisKeyDown);
    // this.addEventListener('keyup', handleThisKeyUp);
    // this.addEventListener('focus', handleThisFocus);

    // const handleA = () => {
    //   console.log("handleA");
    // }


    // e.g. for a closePopover button in the popover
    // const allLis = this.shadowRoot.querySelectorAll('li');
    // allLis.map((li) => {
    //   li.addEventListener('hover', handleA);
    // });


    // const debug = this.shadowRoot.querySelector(`#debug`);
    // console.log("debug", debug);
    // debug.addEventListener('click', () => { alert() } );

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
      <!-- <auro-input tabindex="0" id="auro-input1" label="the label text" helptext="the help text" value="the value"         >
                        </auro-input> -->
      
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
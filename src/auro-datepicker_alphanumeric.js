// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If using litElement base class
import { LitElement, html } from "lit-element";
import { DateTime } from 'luxon';

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { html, css } from "lit-element";
// import AuroElement from '@alaskaairux/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";
import styleCssFixed from './style-fixed-css.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
* auro-datepicker_alphanumeric provides users a way to ... (it would be great if you fill this out)
 *
 * @attr {Boolean} fixed - Uses fixed pixel values for element shape
 * @attr {String} cssClass - Applies designated CSS class to demo element - you want to delete me!
 */

// build the component class
class AuroDatepicker_alphanumeric extends LitElement {
  // constructor() {
  //   super();
  // }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      // this property is DEMO ONLY! Please delete.
      cssClass:   { type: String },

      departDate_year: {type: Number},
      departDate_month: {type: Number},
      departDate_day: {type: Number},

      returnDate_year: {type: Number},
      returnDate_month: {type: Number},
      returnDate_day: {type: Number},
    };
  }

  static get styles() {
    return [
      styleCss,
      styleCssFixed
    ];
  }

  firstUpdated() {
    // debugger;

    const dt = DateTime.now();

    // if auro-dropdown's departDate attributes have all been set
    if (this.parentElement.getAttribute('departDate_year') && this.parentElement.getAttribute('departDate_month') && this.parentElement.getAttribute('departDate_day')) {
      this.departDate_year = this.parentElement.getAttribute('departDate_year');
      this.departDate_month = this.parentElement.getAttribute('departDate_month');
      this.departDate_day = this.parentElement.getAttribute('departDate_day');

      const dt2 = DateTime.fromObject({year: this.departDate_year, month: this.departDate_month, day: this.departDate_day}).plus({month: 1});

      this.returnDate_year = dt2.year;
      this.returnDate_month = dt2.month;
      this.returnDate_day = dt2.day;
    } else {

      this.departDate_year = dt.year;
      this.departDate_month = dt.month;
      this.departDate_day = dt.day;

      const dt2 = DateTime.fromISO(dt).plus({month: 1});

      this.returnDate_year = dt2.year;
      this.returnDate_month = dt2.month;
      this.returnDate_day = dt2.day;
    }


  }

  handleClick() {
    console.log("datepicker_alphanumeric handleClick()");
    this.dispatchEvent(new CustomEvent('toggleShow', {
      bubbles: true, // TOSTUDY
      composed: true // TOSTUDY
    }));
  }

  handleKeyboardWhenFocusOnTrigger(evt) {
    const key = evt.key.toLowerCase();

    if (key === 'enter') {
      this.toggle();
    }
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    // debugger;

    // DateTime.fromObject({ year: null, month: null, day: null }) will return the DateTime right now

    return html`
      <div>
        <input type="text" @click="${this.handleClick}" value="${ DateTime.fromObject({ year: this.departDate_year, month: this.departDate_month, day: this.departDate_day }).toFormat('LL/dd/yyyy')  }"/>
        <input type="text" @click="${this.handleClick}" value="${ DateTime.fromObject({ year: this.returnDate_year, month: this.returnDate_month, day: this.returnDate_day }).toFormat('LL/dd/yyyy')  }"/>
      </div>
    `;
  }
}

// define the name of the custom component
if (!customElements.get("auro-datepicker_alphanumeric")) {
  customElements.define("auro-datepicker_alphanumeric", AuroDatepicker_alphanumeric);
}

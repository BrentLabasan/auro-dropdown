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

  comesBefore(a, b) {
    return DateTime.fromISO(a) < DateTime.fromISO(b);
  }
  
  comesAfter(a, b) {
    return DateTime.fromISO(a) > DateTime.fromISO(b);
  }

  handleKeyPressDepart(evt) {
    const key = evt.key.toLowerCase();

    switch(key) {
      case 'enter':
        console.log("handleKeyPressDepart() key: Enter");
        // debugger;

        // debugger;

        const inputDepartValue = this.shadowRoot.querySelector('#inputDepart').value;
        const inputDepartValue_array = inputDepartValue.split('/');
        // console.log("DateTime.fromObject({month: array[0], day: array[1], year: array[2]})", DateTime.fromObject({month: inputDepartValue_array[0], day: inputDepartValue_array[1], year: inputDepartValue_array[2]}));

        if (this.isInputtedDateValid(inputDepartValue_array)) {


          const pendingRangeStart = DateTime.fromObject({month: inputDepartValue_array[0], day: inputDepartValue_array[1], year: inputDepartValue_array[2]});
          const inputReturnValue = this.shadowRoot.querySelector('#inputReturn').value;
          const inputReturnValue_array = inputReturnValue.split('/');

          const currentRangeEnd = DateTime.fromObject({month: inputReturnValue_array[0], day: inputReturnValue_array[1], year: inputReturnValue_array[2]});
          
          // debugger;
          

          if ( currentRangeEnd && this.comesAfter(pendingRangeStart, currentRangeEnd) ) { // pending departure date selection comes after the current arival date
            alert("pending start date CAN NOT be after current end date");
  
            return;
          }
  
          // debugger;
          alert("incoming depart date is valid!");
          // BOOKMARK 1
          this.departDate_year = data.detail.year;
          this.departDate_month = data.detail.month;
          this.departDate_day = data.detail.day;
  
          this.dispatchEvent(new CustomEvent('changeAttributeGlobally', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: 
            {
              departDate_year: data.detail.year,
              departDate_month: data.detail.month,
              departDate_day: data.detail.day,
            }
          }));

        } else {
          alert("depart date IS NOT valid");

        }

        break;
    }
  }

  handleKeyPressReturn(evt) {
    const key = evt.key.toLowerCase();

    switch(key) {
      case 'enter':
        console.log("handleKeyPressReturn() key: Enter");

        // debugger;
        // BOOKMARK2 reverse this to be relevant to Return, because I was doing Depart in Return
        const inputDepartValue = this.shadowRoot.querySelector('#inputDepart').value;
        const inputDepartValue_array = inputDepartValue.split('/');
        // console.log("DateTime.fromObject({month: array[0], day: array[1], year: array[2]})", DateTime.fromObject({month: inputDepartValue_array[0], day: inputDepartValue_array[1], year: inputDepartValue_array[2]}));

        if (this.isInputtedDateValid(inputDepartValue_array)) {


          const pendingRangeStart = DateTime.fromObject({month: inputDepartValue_array[0], day: inputDepartValue_array[1], year: inputDepartValue_array[2]});
          const inputReturnValue = this.shadowRoot.querySelector('#inputReturn').value;
          const inputReturnValue_array = inputReturnValue.split('/');

          const currentRangeEnd = DateTime.fromObject({month: inputReturnValue_array[0], day: inputReturnValue_array[1], year: inputReturnValue_array[2]});
          
          // debugger;
          

          if ( currentRangeEnd && comesAfter(pendingRangeStart, currentRangeEnd) ) { // pending departure date selection comes after the current arival date
            alert("pending start date CAN NOT be after current end date");
  
            return;
          }
  
          // debugger;

          alert("incoming depart date is valid!");
          this.departDate_year = data.detail.year;
          this.departDate_month = data.detail.month;
          this.departDate_day = data.detail.day;
  
          this.dispatchEvent(new CustomEvent('changeAttributeGlobally', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: 
            {
              departDate_year: data.detail.year,
              departDate_month: data.detail.month,
              departDate_day: data.detail.day,
            }
          }));

        } else {
                    alert("depart date IS NOT valid");

        }

        break;
    }
  }

  isInputtedDateValid(array) {
    
    const dt = DateTime.now();

    if (array[2].length > 4 || parseInt(array[2]) < dt.year) {
      return false;
    }
    
    return DateTime.fromObject({month: array[0], day: array[1], year: array[2]}).isValid;
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    // debugger;

    // DateTime.fromObject({ year: null, month: null, day: null }) will return the DateTime right now

    return html`
      <div>
        <input id="inputDepart" type="text" @click="${this.handleClick}" @keydown="${this.handleKeyPressDepart}" value="${ DateTime.fromObject({ year: this.departDate_year, month: this.departDate_month, day: this.departDate_day }).toFormat('LL/dd/yyyy')  }"/>
        <input id="inputReturn" type="text" @click="${this.handleClick}" @keydown="${this.handleKeyPressReturn}" value="${ DateTime.fromObject({ year: this.returnDate_year, month: this.returnDate_month, day: this.returnDate_day }).toFormat('LL/dd/yyyy')  }"/>
      </div>
    `;
  }
}

// define the name of the custom component
if (!customElements.get("auro-datepicker_alphanumeric")) {
  customElements.define("auro-datepicker_alphanumeric", AuroDatepicker_alphanumeric);
}

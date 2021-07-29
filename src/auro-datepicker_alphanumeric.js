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
import styleCss from './auro-datepicker_alphanumeric-css.js';
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

  handleClickDepart() {
    console.log("datepicker_alphanumeric handleClickDepart()");

    // debugger;

    // TODO make this not hardcoded?
    this.parentElement.querySelector('auro-datepicker_calendar').setAttribute('isSelectionDepartDate', '');

    this.dispatchEvent(new CustomEvent('toggleShow', {
      bubbles: true, // TOSTUDY
      composed: true // TOSTUDY
    }));
  }

  handleClickReturn() {
    console.log("datepicker_alphanumeric handleClickReturn()");

    // debugger;

    this.parentElement.querySelector('auro-datepicker_calendar').removeAttribute('isSelectionDepartDate');


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

  fromShortMonthToNumber(str) {
    return new Date(`${str} 01 2000`).toLocaleDateString(`en`, {month:`2-digit`})
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
        
        // debugger;

        if (this.isInputtedDateValid(inputDepartValue_array)) {


          const pendingRangeStart = DateTime.fromObject({month: inputDepartValue_array[0], day: inputDepartValue_array[1], year: inputDepartValue_array[2]});
          const inputReturnValue = this.shadowRoot.querySelector('#inputReturn').value;

          const inputReturnValue_array = inputReturnValue.split(',');
          const processedArray = [];
          processedArray[0] = this.fromShortMonthToNumber( inputReturnValue_array[1].trim().split(' ')[0] );
          processedArray[1] = inputReturnValue_array[1].trim().split(' ')[1] ;
          processedArray[2] = inputReturnValue_array[2];

          const currentRangeEnd = DateTime.fromObject({month: processedArray[0], day: processedArray[1], year: processedArray[2]});
          
          // debugger;
          

          if ( currentRangeEnd && this.comesAfter(pendingRangeStart, currentRangeEnd) ) { // pending departure date selection comes after the current arival date
            console.error("pending start date CAN NOT be after current end date");
  
            return;
          }
  
          // debugger;
          console.log("incoming depart date is valid!");

          // DIDN'T WORK thinking was if I unfocus off of left input, maybe the text in field will match the attribute
          // document.querySelector('body').focus();

          this.departDate_month = inputDepartValue_array[0];
          this.departDate_day = inputDepartValue_array[1];
          this.departDate_year = inputDepartValue_array[2];

          // this.value = "blah"; // doesn't work
  
          this.dispatchEvent(new CustomEvent('changeAttributeGlobally', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: 
            {
              departDate_month: inputDepartValue_array[0],
              departDate_day: inputDepartValue_array[1],
              departDate_year: inputDepartValue_array[2],
            }
          }));

        } else {
          console.error("depart date IS NOT valid");

        }

        break;
    }
  }

  handleKeyPressReturn(evt) {
    const key = evt.key.toLowerCase();

    switch(key) {
      case 'enter':
      case 'enter':
        console.log("handleKeyPressDepart() key: Enter");
        // debugger;

        // debugger;

        const inputReturnValue = this.shadowRoot.querySelector('#inputReturn').value;
        const inputReturnValue_array = inputReturnValue.split('/');
        // console.log("DateTime.fromObject({month: array[0], day: array[1], year: array[2]})", DateTime.fromObject({month: inputDepartValue_array[0], day: inputDepartValue_array[1], year: inputDepartValue_array[2]}));

        if (this.isInputtedDateValid(inputReturnValue_array)) {


          const pendingRangeEnd = DateTime.fromObject({month: inputReturnValue_array[0], day: inputReturnValue_array[1], year: inputReturnValue_array[2]});
          const inputDepartValue = this.shadowRoot.querySelector('#inputDepart').value;

          const inputDepartValue_array = inputDepartValue.split(',');
          const processedArray = [];
          processedArray[0] = this.fromShortMonthToNumber( inputDepartValue_array[1].trim().split(' ')[0] );
          processedArray[1] = inputDepartValue_array[1].trim().split(' ')[1] ;
          processedArray[2] = inputDepartValue_array[2];

          const currentRangeBegin = DateTime.fromObject({month: processedArray[0], day: processedArray[1], year: processedArray[2]});
          
          // debugger;
          

          if ( currentRangeBegin && this.comesBefore(pendingRangeEnd, currentRangeBegin) ) { // pending departure date selection comes after the current arival date
            console.error("pending end date CAN NOT be before current begin date");
  
            return;
          }
  
          // debugger;
          console.log("incoming return date is valid!"); // bookmark

          this.returnDate_month = inputReturnValue_array[0];
          this.returnDate_day = inputReturnValue_array[1];
          this.returnDate_year = inputReturnValue_array[2];

  
          this.dispatchEvent(new CustomEvent('changeAttributeGlobally', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: 
            {
              returnDate_month: inputReturnValue_array[0],
              returnDate_day: inputReturnValue_array[1],
              returnDate_year: inputReturnValue_array[2],
            }
          }));

        } else {
          console.error("return date IS NOT valid");

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

    const dateFormat = 'ccc, LLL dd, yyyy';
debugger;
    return html`
      <div>
        <input id="inputDepart" type="text" @click="${this.handleClickDepart}" @keyup="${this.handleKeyPressDepart}" value="${ DateTime.fromObject({ year: this.departDate_year, month: this.departDate_month, day: this.departDate_day }).toFormat(dateFormat)  }"/>
        
        <svg width="1" height="32">
          <line style="stroke: #DBDBDB; stroke-width:1" x1="0" y1="0" x2="0" y2="32"></line>
        </svg>

        <input id="inputReturn" type="text" @click="${this.handleClickReturn}" @keyup="${this.handleKeyPressReturn}" value="${ DateTime.fromObject({ year: this.returnDate_year, month: this.returnDate_month, day: this.returnDate_day }).toFormat(dateFormat)  }"/>
      </div>
    `;
  }
}

// define the name of the custom component
if (!customElements.get("auro-datepicker_alphanumeric")) {
  customElements.define("auro-datepicker_alphanumeric", AuroDatepicker_alphanumeric);
}

// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
// import { ifDefined } from "lit-html/directives/if-defined";

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { html, css } from "lit-element";
// import AuroElement from '@alaskaairux/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-dropdown provides users a way to ...
 *
 * @attr {String} cssClass - Applies designated CSS class to DOM element.
 */

// build the component class
class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.options = [];
    this.indexDefaultOption = 0;
    this.indexSelectedOption = null;

    this.open = false;
    this.disabled = false;
    this.active = false;


    this.dropdownHasFocus = false;
    this.triggerHasFocus = false;
    this.optionsListHasFocus = false;

    this.errorMessage = null;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      // ...super.properties,
      cssClass: { type: String },

      options: { type: Array },
      indexDefaultOption: { type: Number },
      indexSelectedOption: { type: Number },

      open: { type: Boolean },
      disabled: { type: Boolean },
      active: { type: Boolean },

      dropdownHasFocus: { type: Boolean },
      triggerHasFocus: { type: Boolean },
      optionsListHasFocus: { type: Boolean },

      errorMessage: { type: String },
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  doesDropdownHaveFocus() {
    return this.triggerHasFocus || this.optionsListHasFocus;
  }

  doesTriggerHaveFocus(bool) {
    return bool;
  }

  doesOptionsListHaveFocus(bool) {
    return bool;
  }

  generateListOfOptions(list) {
    list.forEach((option, idx) => html`<div>option #${idx}</div>`);
  }

  handleTriggerClick() {
    this.open = !this.open;
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hilintdeAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const triggerClassMap = {
      'trigger': true,
      'trigger--isActive': this.active
    }, optionsListClassMap = {
      'optionsList': true,
      'optionsList--isOpen': this.open
    }

    return html`
      <div id="container-dropdown">
        a
        <div @click="${this.handleTriggerClick}" class="${classMap(triggerClassMap)}">
          <slot name="trigger"></slot>
        </div>
        <div class="${classMap(optionsListClassMap)}">
          <slot name="options"></slot>
        </div>
        b
        <br /><br />
        open ${this.open}
        disabled ${this.disabled}
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}

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


class AuroDropdown extends LitElement {
  constructor() {
    super();

    // this.currentValue = this.currentValue ? this.currentValue : "select an option" ;

    this.currentValue = "you should specify a value";
    this.options = [];
    this.indexDefaultOption = 0;
    this.indexSelectedOption = 0;

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

      currentValue: { type: String },

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

  firstUpdated() {

    const nodeListP = this.shadowRoot.querySelectorAll('slot')[1].assignedNodes()[0].querySelectorAll('a');

    nodeListP.forEach((node, idx) => {
      this.options.push(node.textContent);

      node.addEventListener('focus', () => {
        console.log("focus", idx)
      })

      node.addEventListener('blur', () => {
        console.log("blur")
      })
      node.addEventListener('click', () => {
        console.log("click")
        this.currentValue = idx;
        this.indexSelectedOption = idx;
        this.open = false;
      })
    })

    // debugger;
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
    console.log("&&& button was clicked");
    this.open = !this.open;
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hilintdeAudible(this.hiddenAudible)}"

  generateOptionsList() {
    // get children
    const allOptions = this.shadowRoot.querySelector('slot');
    console.log('%c allOptions ' + allOptions, 'background-color: black; color: white;');
    const childrenNodes = allOptions.assignedNodes({ flatten: true });
    console.log('%c childrenNodes ' + childrenNodes, 'background-color: blue; color: yellow;');
    const arrOptionNodes = Array.prototype.filter.call(childrenNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
    console.log('%c arrOptionNodes ' + arrOptionNodes, 'background-color: #D92387; color: #77C3F2;');

    return arrOptionNodes.forEach((optionNode) => {
      optionNode.addEventListener("click", alert());
      return html`<p>option</p>`;
    });

  }

  handleButtonFocus() {
    this.triggerHasFocus = true;
  }
  handleTriggerBlur() {
    this.triggerHasFocus = false;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {

    const triggerClassMap = {
      'trigger': true,
      'trigger--isFocused': this.triggerHasFocus
    }, optionsListClassMap = {
      'optionsList': true,
      'optionsList--isOpen': this.open
    }

    // const optionsList = this.generateOptionsList();

    return html`
      <div id="container-dropdown">
        <p>-- BEGIN CONTAINER --</p>
        <button @focus="${this.handleButtonFocus}" @blur="${this.handleTriggerBlur}" tabindex="0" role="button"
          @click="${this.handleTriggerClick}" class="${classMap(triggerClassMap)}">
      
          ${this.options[this.indexSelectedOption]}
      
        </button>
        <slot name="trigger"></slot>
        <div class="${classMap(optionsListClassMap)}">
          <slot name="options">
      
          </slot>
        </div>
        <p>-- END CONTAINER (❗ you want the optionsList to appear above this element ❗) --</p>
        <div>
        </div>
        -- PROPERTIES --
        <br />
        open ${this.open}
        disabled ${this.disabled}
        indexSelectedOption ${this.indexSelectedOption}
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}

import {html, css, LitElement} from 'lit-element';

export class DemoAuroDatepickerRangeAlphanumeric extends LitElement {
  static get styles() {
    return css`p { color: blue }`;
  }

  static get properties() {
    return {
      name: {type: String}
    }
  }

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

// define the name of the custom component
if (!customElements.get("demo-auro-datepicker-range-alphanumeric")) {
    customElements.define("demo-auro-datepicker-range-alphanumeric", DemoAuroDatepickerRangeAlphanumeric);
  }
  
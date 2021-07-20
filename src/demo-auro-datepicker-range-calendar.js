import {html, css, LitElement} from 'lit-element';

export class DemoAuroDatepickerRangeCalendar extends LitElement {
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
    return html`<div>bar</div>`;
  }
}

// define the name of the custom component
if (!customElements.get("demo-auro-datepicker-range-calendar")) {
    customElements.define("demo-auro-datepicker-range-calendar", DemoAuroDatepickerRangeCalendar);
  }
  
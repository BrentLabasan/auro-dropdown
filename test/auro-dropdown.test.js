import { fixture, html, expect, waitUntil, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-dropdown.js';

describe('auro-dropdown', () => {
  // it('sets the CSS class on auro-dropdown > div element', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   const div = el.shadowRoot.querySelector('div');
  //   expect(div.className).to.equal('testClass');
  // });

  it('auro-dropdown custom element is defined', async () => {
    const el = await !!customElements.get("auro-dropdown");

    await expect(el).to.be.true;
  });

  it('click the trigger to display options list', async () => {
    const el = await fixture(html`
        <auro-dropdown cssClass="testClass">
          <span slot="trigger">click trigger to open options list</span>
          <span slot="options">
            <a href="#">Stops</a>
            <a href="#">Price</a>
            <a href="#">Duration</a>
            <a href="#">Dearture</a>
            <a href="#">Arrival</a>
            <a href="#">Prefer Alaska</a>
          </span>
        </auro-dropdown>
    `);

    const button = el.shadowRoot.querySelectorAll('button')[0];
    console.log("button", button)
    button.click();
    await elementUpdated(el);

    const optionsList = el.shadowRoot.querySelectorAll('.optionsList')[0];
    console.log("optionsList", optionsList)
    console.log("optionsList.classList", optionsList.classList)
    // WRONG: is only DOMTokenList{0: 'optionsList'}


    const optionElements = document.querySelectorAll('a');
    console.log('optionElements', optionElements);

    // expect(optionsList.getAttribute('optionsList--isOpen')).to.be.equal('true');    
    expect(optionsList.classList[0]).to.equal("optionsList")
    expect(optionsList.classList[1]).to.equal("optionsList--isOpen")
    // expect(optionsList.getAttribute('foo')).to.equal('bar');

  });

  it('click the trigger when the options list is displayed to close the list', async () => {
    const el = await fixture(html`
        <auro-dropdown cssClass="testClass">
          <span slot="trigger">click trigger to open options list</span>
          <span slot="options">
            <a href="#">Stops</a>
            <a href="#">Price</a>
            <a href="#">Duration</a>
            <a href="#">Dearture</a>
            <a href="#">Arrival</a>
            <a href="#">Prefer Alaska</a>
          </span>
        </auro-dropdown>
    `);

    const button = el.shadowRoot.querySelectorAll('button')[0];
    console.log("button", button)
    button.click();
    await elementUpdated(el);

    const optionsList = el.shadowRoot.querySelectorAll('.optionsList')[0];
    console.log("optionsList", optionsList)
    console.log("optionsList.classList", optionsList.classList)
    // WRONG: is only DOMTokenList{0: 'optionsList'}


    const optionElements = document.querySelectorAll('a');
    console.log('optionElements', optionElements);

    // expect(optionsList.getAttribute('optionsList--isOpen')).to.be.equal('true');    
    expect(optionsList.classList[0]).to.equal("optionsList")
    expect(optionsList.classList[1]).to.equal("optionsList--isOpen")
    // expect(optionsList.getAttribute('foo')).to.equal('bar');

    button.click();
    await elementUpdated(el);

    expect(optionsList.classList[0]).to.equal("optionsList")
    expect(optionsList.classList[1]).to.equal(undefined)

  });

  it('clicking on an option will cause option list to disappear', async () => {
    const el = await fixture(html`
        <auro-dropdown cssClass="testClass">
          <span slot="trigger">click trigger to open options list</span>
          <span slot="options">
            <p href="#">Stops</p>
            <p href="#">Price</p>
            <p href="#">Duration</p>
            <p href="#">Departure</p>
            <p href="#">Arrival</p>
            <p href="#">Prefer Alaska</p>
          </span>
        </auro-dropdown>
    `);

    const button = el.shadowRoot.querySelectorAll('button')[0];
    console.log("button", button)
    button.click();
    await elementUpdated(el);

    const optionsList = el.shadowRoot.querySelectorAll('.optionsList')[0];
    console.log("optionsList", optionsList)
    console.log("optionsList.classList", optionsList.classList)
    // WRONG: is only DOMTokenList{0: 'optionsList'}


    const optionElements = document.querySelectorAll('a');
    console.log('optionElements', optionElements);

    // expect(optionsList.getAttribute('optionsList--isOpen')).to.be.equal('true');    
    expect(optionsList.classList[0]).to.equal("optionsList")
    expect(optionsList.classList[1]).to.equal("optionsList--isOpen")
    // expect(optionsList.getAttribute('foo')).to.equal('bar');

    optionElements[0].click();
    await elementUpdated(el);

    expect(optionsList.classList[0]).to.equal("optionsList")
    expect(optionsList.classList[1]).to.equal(undefined)

  });

  it('mimicing tabbing', async () => {

  });



});

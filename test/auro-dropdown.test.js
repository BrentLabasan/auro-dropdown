import { fixture, html, expect } from '@open-wc/testing';
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

  // it('auro-dropdown is accessible', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   await expect(el).to.be.accessible();
  // });

  // it('clicking the trigger opens the options list', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   // await expect(el).to.be.accessible();
  // });

  // it('clicking the trigger while the options list is open will cause options list to close', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   // await expect(el).to.be.accessible();
  // });

  // it('', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   // await expect(el).to.be.accessible();
  // });

  // it('', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   // await expect(el).to.be.accessible();
  // });

  // it('', async () => {
  //   const el = await fixture(html`
  //     <auro-dropdown cssclass="testClass"></auro-dropdown>
  //   `);

  //   // await expect(el).to.be.accessible();
  // });




});

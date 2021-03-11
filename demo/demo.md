# auro-dropdown

<!-- Lorem ipsum dolor sit amet

Nulla at augue facilisis `odio lobortis` molestie vitae a nulla.

## auro-dropdown use cases

The `auro-dropdown` element should be used in situations where users may:

* egestas bibendum mauris cursus
* quis euismod felis mollis
* consectetur ipsum risus sed tortor -->

<!-- <button>button 1</button>
<button>button 2</button> -->

<div id="aboveElements" class="otherTabbableElements">
<h3>tabbable elements above auro-dropdown</h3>

<p>All of the items below are tabbable. The text area and button are tabbable by default, and the divs use two different methods.</p>

<textarea tabindex="0" id="elAbove1of4">A textarea. Focus states work by default.</textarea>
<button tabindex="0" id="elAbove2of4">And I'm a button. Again, works by default.</button>
<div tabindex="0" contenteditable id="elAbove3of4">Divs don't usually have a focus state. But I'm special, because I'm <code>contenteditable</code>.</div>
<div tabindex="0" id="elAbove4of4">I'm another div, and I have a <code>tabindex</code>. You can't edit me like the div above, but you can tab to me.</div>
<!-- <textarea tabindex="-1">I can't be tabbed to. This is a terrible idea, generally, but it can be done using tabindex="-1". Notice that (if you click) I still have a focus state, even though you can't tab to me.</textarea> -->

</div>

  <auro-dropdown tabindex="0" id="auro-dropdown" for="inputField" sticky>
  <input tabindex="0" type="text" id="inputField" slot="trigger"/>
  <ul id="ul">
  <li><a href="#" id="li-option1" tabindex="0">Option #1</a></li>
  <li><a href="#" id="li-option2" tabindex="0">Option #2</a></li>
  <li><a href="#" id="li-option3" tabindex="0">Option #3</a></li>
  </ul>
  </auro-dropdown>  

<div id="elBelow1of4" class="otherTabbableElements">
<h3>tabbable elements below auro-dropdown</h3>
<textarea tabindex="0" id="elBelow2of4">A textarea. Focus states work by default.</textarea>
<button tabindex="0" id="elBelow3of4">And I'm a button. Again, works by default.</button>
<div tabindex="0"contenteditable id="elBelow4of4">Divs don't usually have a focus state. But I'm special, because I'm <code>contenteditable</code>.</div>
<!-- <textarea tabindex="-1">I can't be tabbed to. This is a terrible idea, generally, but it can be done using tabindex="-1". Notice that (if you click) I still have a focus state, even though you can't tab to me.</textarea> -->
</div>







<!-- <a href="#" id="wtf">link 1</a>
<a href="#">link 2</a> -->

<div class="exampleWrapper">
  <!-- <auro-dropdown cssClass="testClass">
    <span slot="trigger">click trigger to open options list</span>
    <span slot="options">
      <a href="#">Stops</a>  
      <a href="#">Price</a>  
      <a href="#">Duration</a>  
      <a href="#">Departure</a>  
      <a href="#">Arrival</a>  
      <a href="#">Prefer Alaska</a>
    </span>
  </auro-dropdown> -->

  <!-- <auro-dropdown for="button1" sticky tabindex="2">
  <ul>
  <li><a href="#">Stops</a></li>
  <li><a href="#">Price</a></li>
  <li><a href="#">Duration</a></li>
  <li><a href="#">Departure</a></li>
  <li><a href="#">Arrival</a></li>
  <li><a href="#">Prefer Alaska</a></li>
  </ul>
  <input type="text" id="button1" slot="trigger"/>
  </auro-dropdown> -->

</div>

<!-- <a href="#">link 3</a>
<a href="#">link 4</a> -->

<!-- <auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

  ```html
  <auro-dropdown cssClass="testClass">Hello World!</auro-dropdown>
  ```

</auro-accordion> -->

<!-- ## Then there is more

Aenean at blandit lorem. Fusce imperdiet mi nec gravida maximus. Quisque nisl libero, condimentum in nisi a, imperdiet lacinia arcu.


```javascript
toggleDialog = (elName) => {
  let dialog = document.querySelector(elName);
  const html = document.querySelector('html');

  html.style.overflow = 'hidden';
  dialog.removeAttribute("open");
  dialog.setAttribute("open", true);
}

toggleDialogClose = (elName) => {
  let dialog = document.querySelector(elName);
  const html = document.querySelector('html');

  html.style.overflow = '';
  dialog.removeAttribute("open");
}
``` -->
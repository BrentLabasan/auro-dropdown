# auro-dropdown

Lorem ipsum dolor sit amet

Nulla at augue facilisis `odio lobortis` molestie vitae a nulla.

## auro-dropdown use cases

The `auro-dropdown` element should be used in situations where users may:

* egestas bibendum mauris cursus
* quis euismod felis mollis
* consectetur ipsum risus sed tortor



<div class="exampleWrapper">
  <auro-dropdown cssClass="testClass">
    <span slot="trigger">click trigger to open option slist</span>
    <span>option 1</span>
    <span>option 2</span>
    <span>option 3</span>
  </auro-dropdown>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

  ```html
  <auro-dropdown cssClass="testClass">Hello World!</auro-dropdown>
  ```

</auro-accordion>

## Then there is more

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
```

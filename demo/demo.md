# auro-dropdown


## EXAMPLES

### trigger: auro-datepicker_alphanumeric / content: auro-datepicker_calendar 
auro-dropdown has no departure date set

<div class="exampleWrapper">
  <auro-dropdown>
    <auro-datepicker_alphanumeric slot="trigger"></auro-datepicker_alphanumeric>
    <auro-datepicker_calendar slot="popover" cssClass="testClass"></auro-datepicker_calendar>
  </auro-dropdown>
</div>

auro-dropdown has a departure date set
<div class="exampleWrapper">
  <auro-dropdown departDate_year="2021" departDate_month="10" departDate_day="15">
    <auro-datepicker_alphanumeric slot="trigger"></auro-datepicker_alphanumeric>
    <auro-datepicker_calendar slot="popover" cssClass="testClass"></auro-datepicker_calendar>
  </auro-dropdown>
</div>

### trigger: auro-select-trigger / content: auro-select-menu 



<!-- <auro-datepicker_alphanumeric></auro-datepicker_alphanumeric>

<auro-datepicker_calendar cssClass="testClass">Hello World!</auro-datepicker_calendar> -->
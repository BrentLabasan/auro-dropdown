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


<div class="exampleWrapper">
  <auro-dropdown departDate_year="2021" departDate_month="10" departDate_day="15">
    <auro-datepicker_alphanumeric slot="trigger"></auro-datepicker_alphanumeric>
    <span slot="popover">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dignissim tortor sed suscipit facilisis. Maecenas felis libero, sollicitudin ut tortor sit amet, euismod fermentum odio. Mauris ut arcu eros. Duis eleifend blandit dictum. Nullam eu dui nulla. Nulla fermentum arcu nec urna luctus tempor. Curabitur a nisi tempus, tempus tellus non, mollis justo. Sed sed sapien quis libero mattis feugiat. Curabitur in odio facilisis arcu gravida rhoncus. Pellentesque sagittis ipsum eget egestas maximus. Vivamus fermentum nisi eu magna pharetra tempor. Aliquam sed massa mauris. Etiam non tellus aliquet, vulputate odio sed, gravida dui. Integer tempor ultrices lorem a pharetra. Vivamus nec malesuada urna, a euismod sapien. Proin mollis placerat ipsum, quis pharetra augue volutpat et.
    </span>
  </auro-dropdown>
</div>
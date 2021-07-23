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

Nam et eleifend eros. Nunc eget molestie erat. Suspendisse potenti. Quisque blandit sed ex at scelerisque. Donec ultrices purus tortor, at hendrerit justo posuere vitae. Vivamus auctor euismod purus porttitor pulvinar. Nunc ornare eleifend lectus quis scelerisque. Nam consequat, est ut ullamcorper maximus, quam velit egestas mi, vitae lacinia neque arcu vitae nisl. Nunc euismod imperdiet sem eu porta. Sed accumsan felis mauris, in pulvinar libero consectetur quis.

Mauris sit amet lacus porta, bibendum justo a, gravida leo. Vestibulum at ligula tincidunt risus volutpat bibendum vel sed elit. Integer sit amet finibus urna, ut pulvinar leo. Nunc condimentum purus non quam pellentesque, quis maximus justo dictum. Nunc dui enim, consectetur eu egestas sit amet, lacinia vel risus. Curabitur ac molestie lacus, nec vestibulum nisl. Cras a ex ac ipsum tincidunt sodales. Quisque sodales dui quis nulla consectetur luctus sed molestie enim. Etiam pharetra massa ligula, non consequat ipsum efficitur vitae. Praesent non lectus at ipsum porta pulvinar. Sed tincidunt metus rhoncus turpis molestie, ac ultrices tellus hendrerit. Vivamus lorem nulla, dignissim sit amet consequat vitae, porttitor et ligula. Nunc imperdiet, nulla sed cursus ullamcorper, est enim consequat nibh, sed pulvinar tellus purus eu ex. Sed ultricies et ipsum a commodo.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi porta efficitur lorem. Fusce id tristique nunc, ut venenatis purus. Fusce dignissim, lacus et condimentum bibendum, mauris ex iaculis tortor, pellentesque sollicitudin sem est eu velit. Nunc sed justo diam. Etiam vitae porta neque, vitae molestie nisi. Nam ac lorem nunc. Duis vehicula tempor venenatis. Curabitur non sem cursus, suscipit velit sed, commodo odio.

Donec ultrices erat erat, sit amet vulputate nisl viverra id. Etiam commodo eu metus ut gravida. Mauris posuere diam nulla, quis posuere lectus vulputate elementum. Mauris pharetra ante mi, et convallis tellus fringilla ac. Duis convallis nibh posuere tristique mattis. Praesent vel dignissim nibh, nec mollis mauris. Duis tortor orci, blandit in enim a, vehicula pretium leo. Sed sed pellentesque justo, non rutrum nisi. In hac habitasse platea dictumst. Nulla placerat interdum neque vitae commodo.


    </span>
  </auro-dropdown>
</div>
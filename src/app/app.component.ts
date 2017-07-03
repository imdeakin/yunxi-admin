import {Component, OnInit} from '@angular/core';

declare let $: any;
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent {

}

/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, Input, OnInit} from '@angular/core';

import {ApiCall} from '../../http';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
  @Input() public title: string = '';

}

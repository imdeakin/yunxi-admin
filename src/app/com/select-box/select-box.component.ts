/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Option} from './option-data-type';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent implements OnInit {
  @Output() public optionSelect: EventEmitter<any> = new EventEmitter();
  @Output() public onInit: EventEmitter<any> = new EventEmitter();
  @Input() public name: string = '';
  @Input() public placeholder: string = '';
  @Input() public options: Option[];
  @Input() public first = {
    value: '',
    text: '不限'
  };
  @Input() public index: number;
  public active: boolean = false;
  public curOption: Option;
  public curText: string;

  public ngOnInit(): void {
    this.init(this.options);
  }

  public init(options): void {

    if (options && options.length) {
      if (this.first) {
        options = [this.first].concat(options);
        this.options = options;
      }

      if (typeof this.index === 'number' && this.index < options.length) { // 设置的index 必须是数字 且 不超出最大索引值
        if (this.index >= 0) { // 此时按设置的显示
          this.curOption = options[this.index];
        }// 小于0 则 无须设置初始值
      } else { // 没有设置index 或 不是合适的数 就 默认显示第0个选项
        this.index = 0;
        this.curOption = options[0];
      }
      if (this.curOption) { // 初始项存在就可以设置初始值
        this.curText = this.curOption.text;
        this.optionSelect.emit(this.curOption.value);
      }
    } else {
      console.error('the property of options is not allow empty');
    }
    this.onInit.emit(this);
  }

  public selectOption(item): void {
    this.curText = item.text;
    this.active = false;
    this.optionSelect.emit(item.value);
  }
}

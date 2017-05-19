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
  @Input() public name: string = '';
  @Input() public placeholder: string = '';
  @Input() public options: Option[];
  @Input() public index: number = 0;
  public active: boolean = false;
  public curOption: Option;
  public curText: string;

  public ngOnInit(): void {
    if (this.options && this.options.length) {
      if (typeof this.index === 'number' && this.index < this.options.length) { // 设置的index 必须是数据 且 不超出最大索引值
        if (this.index >= 0) { // 此时按设置的显示
          this.curOption = this.options[this.index];
        }
      } else { // 没有设置index 或 不是合适的数 就 默认显示第0个选项
        this.curOption = this.options[0];
      }
      if (this.curOption) { // 初始化有值就可以正常执行
        this.curText = this.curOption.text;
        this.optionSelect.emit(this.curOption.value);
      }
    } else {
      console.error('the property of options is not allow empty');
    }
  }

  public selectOption(item): void {
    this.curText = item.text;
    this.active = false;
    this.optionSelect.emit(item.value);
  }
}

/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, Input, Output, DoCheck, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {Option} from './option-data-type';
import {ScrollbarServer} from '../../serv/scrollbar-server'

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent implements OnInit, DoCheck {
  @Output() public optionSelect: EventEmitter<string | number> = new EventEmitter();
  @Output() public onInit: EventEmitter<any> = new EventEmitter();
  @Input() public name: string = '';
  @Input() public placeholder: string = '';
  @Input() public options: Option[];
  @Input() public first = {
    value: '',
    text: '请选择'
  };
  @Input() public index: number;
  @Input() public value: string;
  @Input() public text: string;

  public active: boolean = false;
  public curOption: Option;
  public curText: string;

  private oldOptions: Option[];
  private oldValue: string;
  private oldText: string;
  private oldIndex: number;

  constructor(private ref: ElementRef, private scrollbarServer: ScrollbarServer) {

  }

  public ngOnInit(): void {
    this.scrollbar();
    this.onInit.emit(this);
  }

  public ngDoCheck(): void {
    if (this.options !== this.oldOptions) {
      this.oldOptions = this.options;
      this.onUpdateOptions();
      console.log('The options had changed.');
    }

    if (typeof this.value === 'string' || typeof this.value === 'number') {
      if (this.value !== this.oldValue) {
        this.oldValue = this.value;
        this.updateCurOptionsByValue();
        console.log('The value had changed.');
      }
    } else if (typeof this.text === 'string' || typeof this.text === 'number') {
      if (this.text !== this.oldText) {
        this.oldText = this.text;
        this.updateCurOptionsByText();
        console.log('The text had changed.');
      }
    } else if (this.index !== this.oldIndex) {
      this.oldIndex = this.index;
      this.updateCurOptionsByIndex();
      console.log('The index had changed.');
    }
  }

  // 滚动条美化
  public scrollbar(): void {
    let list = this.ref.nativeElement.firstChild.lastChild.previousSibling;
    this.scrollbarServer.init(list);
  }

  public onUpdateOptions(): void {
    if (this.options instanceof Array) {

      // 首项数据
      if (this.first) {
        if (this.options[0]) {
          if (this.options[0].value !== this.first.value) {
            this.options.splice(0, 0, this.first);
          }
        } else {
          this.options[0] = this.first;
        }
      }

      // 默认选项
      if (typeof this.value === 'string' || typeof this.value === 'number') {
        this.updateCurOptionsByValue();
      } else if (typeof this.text === 'string' || typeof this.text === 'number') {
        this.updateCurOptionsByText();
      } else if (this.index !== this.oldIndex) {
        this.updateCurOptionsByIndex();
      }

    } else {
      console.error('the property of options is not allow empty');
    }
  }

  public updateCurOptionsByValue(): void {
    if ((typeof this.value === 'string' || typeof this.value === 'number') && this.options && this.options.length) {
      for (let i = 0, len = this.options.length; i < len; i++) {
        let item = this.options[i];
        if (item.value + '' === this.value + '') {
          this.index = i;
          this.curOption = this.options[this.index];
          this.curText = this.curOption.text;
          if (typeof this.value === 'number') {
            this.optionSelect.emit(parseInt(this.curOption.value));
          } else {
            this.optionSelect.emit(this.curOption.value + '');
          }
          break;
        }
      }
    }
  }

  public updateCurOptionsByText(): void {
    if ((typeof this.text === 'string' || typeof this.text === 'number') && this.options && this.options.length) {
      for (let i = 0, len = this.options.length; i < len; i++) {
        let item = this.options[i];
        if (item.text + '' === this.text + '') {
          this.index = i;
          this.curOption = this.options[this.index];
          this.curText = this.curOption.text;
          if (typeof this.value === 'number') {
            this.optionSelect.emit(parseInt(this.curOption.value));
          } else {
            this.optionSelect.emit(this.curOption.value + '');
          }
          break;
        }
      }
    }
  }

  public updateCurOptionsByIndex(): void {
    // 是否有默认索引
    if (typeof this.index === 'number' && this.index < this.options.length) { // 设置的index 必须是数字 且 不超出最大索引值
      if (this.index >= 0) { // 此时按设置的显示
        this.curOption = this.options[this.index];
      }// 小于0 则 无须设置初始值
    } else { // 没有设置index 或 不是合适的数 就 默认显示第0个选项
      this.index = 0;
      this.curOption = this.options[0];
    }
    if (this.curOption) { // 初始项存在就可以设置初始值
      this.curText = this.curOption.text;
      this.optionSelect.emit(this.curOption.value);
    }
  }

  public selectOption(item): void {
    this.curText = item.text;
    this.active = false;
    this.optionSelect.emit(item.value);
  }

  public clickInput(): void {
    this.active = !this.active;
  }
}

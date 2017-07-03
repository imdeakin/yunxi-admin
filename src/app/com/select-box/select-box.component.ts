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
  @Input() public value;
  @Input() public text;
  public active: boolean = false;
  public curOption: Option;
  public curText: string;

  private oldOptions;
  private oldValue = this.value;
  private oldText = this.text;

  constructor(private ref: ElementRef, private scrollbarServer: ScrollbarServer) {

  }

  public ngOnInit(): void {
    this.init();
    this.scrollbar();
  }

  public ngDoCheck(): void {
    if (this.options !== this.oldOptions) {
      this.init();
      this.oldOptions = this.options;
      console.log('The options had changed.');
    }

    if (this.value !== this.oldValue) {
      this.updateCurOptionsByValue();
      this.oldValue = this.value;
      console.log('The value had changed.');
    }

    if (this.text !== this.oldText) {
      this.updateCurOptionsByText();
      this.oldText = this.text;
      console.log('The text had changed.');
    }
  }

  // 滚动条美化
  public scrollbar(): void {
    let list = this.ref.nativeElement.firstChild.lastChild.previousSibling;
    this.scrollbarServer.init(list);
  }

  public init(): void {

    if (this.options instanceof Array) {

      if (this.first) {
        if (this.options[0]) {
          if (this.options[0].value !== this.first.value) {
            this.options.splice(0, 0, this.first);
          }
        } else {
          this.options[0] = this.first;
        }
        console.log(this.options);
      }

      // this.updateListScroll();

      // 是否有默认值
      if (this.value) { // 默认值
        this.updateCurOptionsByValue();
      } else if (this.text) { // 默认内容
        this.updateCurOptionsByText();
      } else { // 默认索引
        this.updateCurOptionsByIndex();
      }

    } else {
      console.error('the property of options is not allow empty');
    }
    this.onInit.emit(this);
  }

  public updateListScroll(): void {
    let list = this.ref.nativeElement.firstChild.childNodes;
    let target;
    for (let i = 0, len = list.length; i < len; i++) {
      let item = list[i];
      if (item.className) {
        let classList = item.className.split(' ');
        for (let i = 0, len = classList.length; i < len; i++) {
          if (classList[i] === "select-option-list") {
            target = item;
            break;
          }
        }
        if (target) {
          break;
        }
      }
    }
  }

  public updateCurOptionsByValue(): void {
    if (this.value && this.options && this.options.length) {
      for (let i = 0, len = this.options.length; i < len; i++) {
        let item = this.options[i];
        if (item.value === this.value) {
          this.index = i;
          this.curOption = this.options[this.index];
          this.curText = this.curOption.text;
          this.optionSelect.emit(this.curOption.value);
          break;
        }
      }
    }
  }

  public updateCurOptionsByText(): void {
    if (this.text && this.options && this.options.length) {
      for (let i = 0, len = this.options.length; i < len; i++) {
        let item = this.options[i];
        if (item.text === this.text) {
          this.index = i;
          this.curOption = this.options[this.index];
          this.curText = this.curOption.text;
          this.optionSelect.emit(this.curOption.value);
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

/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, Input, OnInit, AfterViewInit, ElementRef} from '@angular/core';

import {ScrollbarServer} from '../../serv/scrollbar-server'

declare let $: any;
declare let Squire: any;

@Component({
  selector: 'ng2-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() private content: string;
  @Input() private height: string = '300px';

  public id: string; //
  public editor; // 富文本编辑器

  constructor(private elRef: ElementRef, private scrollbarServer: ScrollbarServer) {
  }

  public ngOnInit(): void {
    this.id = 'editor_' + this.getUUID();
  }

  public ngAfterViewInit(): void {
    // 滚动条美化
    // this.scrollbar();

    // 初始化富文本编辑器
    let query: string = '#' + this.id + ' .editor';
    let node = document.querySelector(query);
    this.editor = new Squire(node);
    this.initMenu();
  }

  // 滚动条美化
  public scrollbar(): void {
    let con = document.querySelector(<string>('#' + this.id + ' .editor'));
    this.scrollbarServer.init(con);
  }

  public getUUID(): string {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
  }

  public initMenu(): void {

  }

  public toggleFontStyle(e): void {
    let target = e.currentTarget;
    console.log(target);
    let action = this.getNodeAttruteValue(target, 'data-action');

    let test = {
      value: action,
      testBold: this.testPresenceinSelection('bold',
        action, 'B', (/>B\b/)),
      testItalic: this.testPresenceinSelection('italic',
        action, 'I', (/>I\b/)),
      testUnderline: this.testPresenceinSelection(
        'underline', action, 'U', (/>U\b/)),
      testOrderedList: this.testPresenceinSelection(
        'makeOrderedList', action, 'OL', (/>OL\b/)),
      testLink: this.testPresenceinSelection('makeLink',
        action, 'A', (/>A\b/)),
      testQuote: this.testPresenceinSelection(
        'increaseQuoteLevel', action, 'blockquote', (
          />blockquote\b/)),
      isNotValue: function (a) {
        return (a == action && this.value !== '');
      }
    };

    this.editor.alignRight = () => {
      this.editor.setTextAlignment('right');
    };
    this.editor.alignCenter = () => {
      this.editor.setTextAlignment('center');
    };
    this.editor.alignLeft = () => {
      this.editor.setTextAlignment('left');
    };
    this.editor.alignJustify = () => {
      this.editor.setTextAlignment('justify');
    };
    this.editor.makeHeading = () => {
      this.editor.setFontSize('2em');
      this.editor.bold();
    };


    if (test.testBold || test.testItalic || test.testUnderline || test.testOrderedList || test.testLink || test.testQuote) {
      if (test.testBold) this.editor.removeBold();
      if (test.testItalic) this.editor.removeItalic();
      if (test.testUnderline) this.editor.removeUnderline();
      if (test.testLink) this.editor.removeLink();
      if (test.testOrderedList) this.editor.removeList();
      if (test.testQuote) this.editor.decreaseQuoteLevel();
    } else if (test.isNotValue('makeLink') || test.isNotValue('insertImage') || test.isNotValue('selectFont')) {
      // do nothing these are dropdowns.
    } else {
      this.editor[action]();
      this.editor.focus();
    }
  }

  public testPresenceinSelection(name, action, format, validation): boolean {
    let path = this.editor.getPath(),
      test = (validation.test(path) || this.editor.hasFormat(format));
    return name == action && test
  }

  public eachNode(nodes, fn): void {
    for (let i = 0, len = nodes.length; i < len; i++) {
      fn(nodes[i]);
    }
  }

  public getNodeAttruteValue(node, attrName): string {
    let attrs = node.attributes;
    let attrValue: string = '';
    for (let i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i].name === attrName) {
        attrValue = attrs[i].value;
        break;
      }
    }
    return attrValue;
  }
}

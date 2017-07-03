/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class fileUploadComponent {
  @Output() public fileChange: EventEmitter<object> = new EventEmitter();
  @Input() public name: string = 'file';
  @Input() public hideInput: boolean = true; // 隐藏file表单

  public file;

  public onClick(con): void {
    let children = con.children;
    for (let i = 0; i < children.length; i++) {
      let node = children[i];
      let className = node.className;
      if (className && className.search('upload-file-input') >= 0) {
        node.click();
        break;
      }
    }
  }

  public onChange(fileInput): void {
    this.file = fileInput.files[0];
    this.fileChange.emit(this.file);
  }
}

/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Image} from '../image'

declare let layer: any;

@Component({
  selector: 'img-upload-list',
  templateUrl: './img-upload-list.component.html',
  styleUrls: ['./img-upload-list.component.css']
})
export class ImgUploadListComponent {
  @Output() public afterChange: EventEmitter<Image[]> = new EventEmitter(); // 图片变动后调用 传递变动后的图片数据 (删除图片也会变动的一种)
  @Output() public afterRemove: EventEmitter<Image> = new EventEmitter(); // 图片删除后调用 传递被删除的图片数据 (删除后也会触发afterChange事件)
  @Input() public imgList: Image[] = []; // 已添加的图片数组
  @Input() public editable: boolean = true; // 是否可修改
  @Input() public selectable: boolean = true; // 是否可选中
  @Input() public deletable: boolean = true; // 是否可删除
  @Input() public max: number = 1; // 最多添加图片数

  public onAfterAdd(img: Image): void {
    this.imgList.push(img);
    this.afterChange.emit(this.imgList);
  }

  public onAfterChange(img: Image, index: number): void {
    this.imgList[index] = img;
    this.afterChange.emit(this.imgList);
  }

  public onAfterRemove(img: Image, index: number): void {
    this.imgList.splice(index, 1);
    this.afterRemove.emit(img);
    this.afterChange.emit(this.imgList);
  }
}

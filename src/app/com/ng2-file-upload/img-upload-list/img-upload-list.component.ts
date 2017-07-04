/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import {UploadImage} from '../image'

declare let layer: any;

@Component({
  selector: 'img-upload-list',
  templateUrl: './img-upload-list.component.html',
  styleUrls: ['./img-upload-list.component.css']
})
export class ImgUploadListComponent implements DoCheck {
  @Output() public afterChange: EventEmitter<UploadImage> = new EventEmitter(); // 图片变动后调用 传递变动后的图片数据
  @Output() public afterRemove: EventEmitter<UploadImage> = new EventEmitter(); // 图片删除后调用 传递被删除的图片数据
  @Input() public imgList: UploadImage[] = []; // 已添加的图片数组
  @Input() public editable: boolean = true; // 是否可修改
  @Input() public selectable: boolean = true; // 是否可选中
  @Input() public deletable: boolean = true; // 是否可删除
  @Input() public maxSize: number = 1; // 最多添加图片数
  @Input() public maxSelect: number = this.maxSize; // 最多可选中图片数

  public eachSelectabel: boolean = true; // 是否每个都可以选中
  public curSelectedCount: number; // 当前已选中的数量

  public ngDoCheck(): void {

    // 监听选中数量，控制最大选中数
    let curSelectedCount = this.getSelectedCount();
    if (this.curSelectedCount !== curSelectedCount) {
      this.curSelectedCount = curSelectedCount;
      this.eachSelectabel = this.curSelectedCount < this.maxSelect;
    }
  }

  public onAfterAdd(img: UploadImage): void {
    this.imgList.push(img);
    this.afterChange.emit(img);
  }

  public onAfterChange(img: UploadImage, index: number): void {
    // this.imgList[index] = img;
    this.afterChange.emit(img);
  }

  public onAfterRemove(img: UploadImage, index: number): void {
    this.imgList.splice(index, 1);
    this.afterRemove.emit(img);
    // this.afterChange.emit(this.imgList);
  }

  /**
   * 统计当前已选中的数量
   * @returns {number}
   */
  public getSelectedCount(): number {
    let num: number = 0;
    for (let i = 0, len = this.imgList.length; i < len; i++) {
      let item = this.imgList[i];
      if (item.selected) {
        num++
      }
    }
    return num;
  }
}

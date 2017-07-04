/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, DoCheck, EventEmitter} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {AdminFunc} from '../../../serv/admin.server';
import {UploadImage} from '../image'

declare let layer: any;

@Component({
  selector: 'img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent {
  @Output() public afterChange: EventEmitter<UploadImage> = new EventEmitter(); // 图片变动后调用 传递变动后的图片数据
  @Output() public afterRemove: EventEmitter<UploadImage> = new EventEmitter(); // 图片删除后调用 传递被删除的图片数据
  @Output() public afterSelect: EventEmitter<UploadImage> = new EventEmitter(); // 选中图片后调用
  @Output() public afterCancelSelect: EventEmitter<UploadImage> = new EventEmitter(); // 取消选中图片后调用
  @Input() public img: UploadImage = new UploadImage('', ''); // 已添加的图片
  @Input() public editable: boolean = true; // 是否可修改
  @Input() public selectable: boolean = true; // 是否可选中
  @Input() public enableCancelSelect: boolean = true; // 是否可取消选中
  @Input() public deletable: boolean = true; // 是否可删除
  @Input() public addibleAfterDeleted: boolean = true; // 删除后是否可添加
  @Input() public onlyAdd: boolean; // 是否只是添加功能 如果为true，则添加后，保持不变，否则会转换成图片

  public deleted: boolean; // 是否已删除 如果已经删除 且删除后不可再添加 就删除

  constructor(private apiCall: ApiCall,
              private adminFunc: AdminFunc) {
  }

  /**
   * 上传
   * @param file
   */
  public uploadFile(file) {
    let adminId = this.adminFunc.getAdminId();

    let formData = new FormData();
    formData.append('adminId', adminId);
    formData.append('file', file);

    this.apiCall.uploadFile(formData, (list) => {
      let data = list[0];
      if (data) {
        let img = new UploadImage(data.url, data.file_id);
        if (!this.onlyAdd) {
          this.img = img;
        }
        this.afterChange.emit(img);
      }
    });
  }

  /**
   * 删除图片
   */
  public removeFile() {
    let index = layer.confirm('删除图片？', {btns: ['确定', '取消']},
      () => {
        layer.close(index);
        let img = this.img;
        this.img = new UploadImage('', '');
        this.deleted = true;
        this.afterRemove.emit(img);
        // this.afterChange.emit(this.img);
      });
  }

  public selectFile() {
    if (this.img.selected) { // 取消
      if (this.enableCancelSelect) { // 可取消
        this.img.selected = false;
        this.afterCancelSelect.emit(this.img);
      }
    } else if (this.selectable) { // 选中 可选中
      this.img.selected = true;
      this.afterSelect.emit(this.img);
    }
  }
}

/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, DoCheck, EventEmitter} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {AdminFunc} from '../../../serv/admin.server';
import {Image} from '../image'

declare let layer: any;

@Component({
  selector: 'img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements DoCheck {
  @Output() public afterChange: EventEmitter<Image> = new EventEmitter();
  @Output() public afterRemove: EventEmitter<Image> = new EventEmitter();
  @Input() public img: Image = new Image('', ''); // 已添加的图片
  @Input() public editable: boolean = true; // 是否可修改
  @Input() public selectable: boolean = true; // 是否可选中
  @Input() public deletable: boolean = true; // 是否可删除
  @Input() public addibleAfterDeleted: boolean = true; // 删除后是否可添加
  @Input() public onlyAdd: boolean; // 是否只是添加功能 如果为true，则添加后，保持不变，否则会转换成图片

  public imgOld: Image;
  public deleted: boolean; // 是否已删除

  constructor(private apiCall: ApiCall,
              private adminFunc: AdminFunc) {
  }

  public ngDoCheck(): void {
    if (this.img !== this.imgOld) {
      this.imgOld = this.img;
      this.img.selected = false;
    }
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
        let img = new Image(data.url, data.file_id);
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
        let img = this.img;
        this.img = new Image('', '');
        this.deleted = true;
        layer.close(index);
        this.afterRemove.emit(img);
      });
  }
}

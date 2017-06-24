/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApiCall} from '../../http/api-call';
import {FuncServer} from '../../serv/func.server';
import {AdminFunc} from '../../serv/admin.server';

@Component({
  selector: 'img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})

export class ImgUploadComponent {
  @Input() public url: string = '';
  @Output() public resultUrl: EventEmitter<any> = new EventEmitter();
  @Input() public src: string = '';
  @Input() public file_id: string = '';

  public path: string = '';
  public showForm: boolean = false;
  public type = '';
  public file;

  public formId = "fileUploadFrom";

  constructor(private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc) {
  }

  public changeImg(file): void {
    let btn = file.nextSibling.nextSibling;
    btn.click();
  }

  public modalSubmit(): void {
    let adminId = this.adminFunc.getAdminId();
    this.apiCall.uploadFile(adminId, formData, this.type, (data) => {
      console.log(data);
    })
  }
}

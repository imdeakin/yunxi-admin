/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApiCall} from '../../http/api-call';
import {FuncServer} from '../../serv/func.server';
import {AdminFunc} from '../../serv/admin.server';

declare var $:any;

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
  @Input() public num:number=0;

  public path: string = '';
  public showForm: boolean = false;
  public type = '';
  public file;

  public formId = "fileUploadFrom";

  constructor(private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc) {
  }

  public changeImg(e): void {
    this.file = e.target.files[0];
    this.modalSubmit();
  }


  public modalSubmit(): void {
    let adminId = this.adminFunc.getAdminId();
    let formData = new FormData();
    formData.append('adminId', adminId);
    formData.append('file', this.file);

    this.apiCall.uploadFile(formData, (list) => {
      this.resultUrl = list[0].url;
      if(list){
        let img = $("<img>");
        let div = $("<div></div>").css({"display": "inline-block",
                                      "list-style-type": "none",
                                      "width":"100px",
                                      "height":"100px",
                                      "border":"1px solid #78C3F3",
                                      "float": "left",
                                      "position":"relative"});
        let span = $('<span class="icon-font">&#xe6e9;</span>').css({
                                                            "border-radius": "50%",
                                                            "padding": "4px",
                                                            "position": "absolute",
                                                            "right":"0px",
                                                            "display":"inline-block",
                                                            "box-shadow": "0 3px 20px #ccc",
                                                            "cursor":"pointer",
                                                            "color":"red",
                                                            "margin-left":"4px"
                                                                 })
        span.click(($event)=>{
            console.log($($event.target).parent("div").remove())
        })                                                        
        img.attr("src",list[0].url);
        img.appendTo(div);
        span.appendTo(div);
        console.log($('.imgList').eq(this.num))
        console.log($('.imgList'))
        div.appendTo($('.imgList')[this.num])
      }
    });

  }
}

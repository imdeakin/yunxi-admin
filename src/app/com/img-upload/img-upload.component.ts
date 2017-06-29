/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, EventEmitter,DoCheck} from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {ApiCall} from '../../http/api-call';
import {FuncServer} from '../../serv/func.server';
import {AdminFunc} from '../../serv/admin.server';
import {Observable} from 'rxjs/Observable';
import { ApiConfig } from '../../http/api-config';
import { FileUploader } from 'ng2-file-upload';

<<<<<<< HEAD
declare var $:any;

=======
import 'rxjs/add/operator/toPromise'; 

declare var $:any;
>>>>>>> 3883a5d4b9040c3fc0e79b955328b52f8261c3ec
@Component({
  selector: 'img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})

export class ImgUploadComponent implements DoCheck {
  @Input() public url: string = '';
  @Output() public resultUrl: EventEmitter<any> = new EventEmitter();
  @Input() public src: string = '';
  @Input() public file_id: string = '';
  @Input() public num:number=0;

  public path: string = '';
  public showForm: boolean = false;
  public type = '';
  public file;
  public headers;
  public adminId;
  public files;
  public filesOld;
  public Url = this.apiConfig.paths.uploadFile;

  public formId = "uploadFile";

  constructor(private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc,
              private  http:Http,
              private apiConfig:ApiConfig) {
  }

  public ngDoCheck():void{
    if(this.filesOld !== this.files){
        this.filesOld = this.files;
        console.log(this.filesOld);
        // this.modalSubmit();
    }
  }

<<<<<<< HEAD
  // public changeImg(file): void {
  //   console.log(file);
  //   let btn = file.nextSibling.nextSibling;
  //   console.log(btn);
  //   btn.click();
  // }

  public changeImg(fileList): void {
    //1 let target:HTMLInputElement = file.target as HTMLInputElement;
    // for(let i=0;i<target.files.length;i++){
    //   this.upload(target.files[i])
    // }
        //2 let file: File = fileList[0];
        // let formData: FormData = new FormData();
        // console.log(file);
        // formData.append('file', file, file.name);            
        // this.headers = new Headers({ 
        //     "Accept": "application/json"
        // });
        // let options = new RequestOptions({ headers:this.headers });
        // this.http.post("http://yx.51meets.com/file/upload", formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success' + data),
        //         error => console.log(error)
        //     )
    let formData = new FormData($("#uploadFile")[0])
    this.upload(formData);
=======
  public changeImg(e): void {
    this.file = e.target.files[0];
    this.modalSubmit();
>>>>>>> 0fee90ab6edca0762e4cd2126cc9fa62824c3ab2
  }

  public upload(formData){
    console.log(formData);
        $.ajax({
        url:'http://www.songsonly4you1.com/adfile/upload',
        data:formData,
        dataType:'json',
        type:'post',
        contentType: false, //必须
        processData:false,	//必须
        success:function(data){
          console.log(data);
        if("0"== data.code){
            var result = data.result;
            alert("上传成功！" + result);
          }
        },
        error:function(){
          alert("添加失败，请重试！");
        }
      });
}

   private toQueryString(obj) {
     let result = [];
     for (let key in obj) {
       key = encodeURIComponent(key);
       let values = obj[key];
       if (values && values.constructor == Array) {
         let queryValues = [];
         for (let i = 0, len = values.length, value; i < len; i++) {
           value = values[i];
           queryValues.push(this.toQueryPair(key, value));
         }
         result = result.concat(queryValues);
       } else {
         result.push(this.toQueryPair(key, values));
       }
    }
     return result.join('&');
   }
   private toQueryPair(key, value) {
     if (typeof value == 'undefined') {
       return key;
     }
     return key + '=' + encodeURIComponent(value === null ? '' : String(value));
   }    


  public modalSubmit(): void {
<<<<<<< HEAD
    console.log(this.files);
    // let adminId = this.adminFunc.getAdminId();
    // console.log(adminId)
    // let data = (document.getElementById("#fileUploadFrom") as HTMLFormElement);
    // console.log(value);
    // let formData = new FormData();
    // let data = {
    //   adminId,
    // }
    // this.upload(adminId,formData);
=======
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
<<<<<<< HEAD

=======
>>>>>>> 0fee90ab6edca0762e4cd2126cc9fa62824c3ab2
>>>>>>> 3883a5d4b9040c3fc0e79b955328b52f8261c3ec
  }

  // public upload(adminId,data):Observable<any>{
  //   // return this.http.post(url,data,)
  // }
}

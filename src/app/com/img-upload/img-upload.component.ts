/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, DoCheck, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ApiCall } from '../../http/api-call';
import { FuncServer } from '../../../../../yunxi-admin/src/app/serv/func.server';
import { AdminInfo } from '../../serv/get.admin';
import { Rc4Server } from '../../../../../yunxi-admin/src/app/serv/rc4.server';

@Component({
    selector:'img-upload',
    templateUrl:'./img-upload.component.html',
    styleUrls:['./img-upload.component.css']
})

export class ImgUploadComponent implements OnInit, DoCheck {
    @Input() public url: string = '';
    @Output() public resultUrl: EventEmitter<any> = new EventEmitter();  
    @Input() public src: string = '';
    @Input() public file_id:string = '';
    public adminInfo = AdminInfo;
    public path: string ='';
    public showForm:boolean = false;
    public type = '';
    constructor(private ref: ElementRef,
    private sanitizer:DomSanitizer,
    private apiCall:ApiCall,
    private funcServer:FuncServer,
    private rc4server:Rc4Server
      ) {
    }

  public ngOnInit(): void {
    this.init();
  }

  public init():void {
      
  }

  public ngDoCheck():void{

  } 

  public changeImg():void{
    (document.querySelector("#btn") as HTMLInputElement).click()
  }

  public modalSubmit():void{
    let adminIn = this.adminInfo.getAdminInfo(this.rc4server);
    let adminId = JSON.parse(adminIn).admin_id;
    var form = document.forms.namedItem("fileInfo")
    var formData = new FormData(form);
    console.log(formData);
    this.apiCall.postUpload(adminId,formData,this.type,(data)=>{
        console.log(data);
    })
  }
} 
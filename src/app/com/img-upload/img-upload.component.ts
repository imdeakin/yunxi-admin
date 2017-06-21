/**
 * Created by Kun on 2017/6/21 0008.
 */
import {Component, Input, Output, DoCheck, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ApiCall } from '../../http/api-call';
import { FuncServer } from '../../../../../yunxi-admin/src/app/serv/func.server';


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
    public path: string ='';
    public showForm:boolean = false;
    constructor(private ref: ElementRef,
    private sanitizer:DomSanitizer,
    private apiCall:ApiCall,
    private funcServer:FuncServer) {
    }

  public ngOnInit(): void {
    this.init();
  }

  public init():void {
      
  }

  public ngDoCheck():void{

  } 

  public submitModal():void{
    this.showForm = ! this.showForm;
    var imgForm = document.querySelector('#imgForm')[0];
    var formData = new FormData(imgForm)
    // this.resultUrl.emit(filePath);
  }
} 
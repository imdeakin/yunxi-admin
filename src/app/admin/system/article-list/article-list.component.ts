/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {ArticleList} from '../data-type/article-list';

import 'tinymce';
import 'tinymce/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
declare var tinymce: any;


@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  public title = '文案管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: ArticleList[] = [
  ];
  public filterData = {
    documentId:'',
    title: '',
    content:'',
    author:'',
    type:0,
  };

  public systemFunction = SystemFunction;
  
  public modalShow:boolean = false;
  public modalEditShow:boolean = false;
  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaUserList();
    this.ediotTinymce();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public ediotTinymce():void{
     tinymce.init({
        selector:'.editContent',
        language_url : 'assets/js/langs/zh_CN.js',  
        skin_url: 'assets/css/skins/lightgray',
        height:170,
        resize: false,
        elementpath: false
    })
  }

  public getYoukaUserList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getDocumentList(this.filterData.title,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      console.log(list);
      this.total = total;
    });
  }

  public updateDocument():void{
  this.filterData.content = tinymce.activeEditor.getContent();
  // let content = tinymce.getInstanceById('editContent').getBody().innerHTML;
  // console.log(content);
  console.log(this.filterData.content.length);
  console.log(this.filterData);
    this.apiCall.updateDocument(this.filterData.documentId,this.filterData.title,this.filterData.content,this.filterData.type,this.filterData.author,(data)=>{
        this.toggleEditModal();
        this.getYoukaUserList(1);
    })
  }

  public toggleModal(item?):void{
      this.modalShow = !this.modalShow;
      if(item){
        this.filterData ={
          documentId:item.document_id,
          title:item.title,
          content:item.content,
          author:item.author,
          type:item.type
        }
      }
      if(!this.modalShow){
        this.filterData = {
          documentId:'',
          title: '',
          content:'',
          author:'',
          type:0
        };
      }
  }

  public toggleEditModal(item?){
      this.modalEditShow = !this.modalEditShow;
      if(item){
          tinymce.activeEditor.setContent(item.content)
          this.filterData ={
          documentId:item.document_id,
          title:item.title,
          content:item.content,
          author:item.author,
          type:item.type
        }
      }
       if(!this.modalEditShow){
        tinymce.activeEditor.setContent('')
        this.filterData = {
          documentId:'',
          title: '',
          content:'',
          author:'',
          type:0
        };
      }
  }

  public modalSubmit(){
    console.log(this.filterData.documentId);
      if(this.filterData.documentId){
        console.log('update');
          this.updateDocument()
      }else{
        console.log('add');
          this.addDocument()
      }
  }

  public addDocument():void{
    this.filterData.content = tinymce.activeEditor.getContent();
    this.apiCall.addDocument(this.filterData.title,this.filterData.content,this.filterData.type,this.filterData.author,(data)=>{
        this.toggleEditModal();
        this.getYoukaUserList(1);
    })
  }

  public delDocument(documentId):void{
    this.apiCall.delDocument(documentId,(data)=>{
        this.getYoukaUserList(1)
    })
  }
}

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
import 'tinymce/plugins/paste';

declare let layer: any;

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
  public editContentData ={
      content:''
  }; 
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
    this.getDocumentList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getDocumentList(curPageIndex?): void {
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
    console.log(this.editContentData.content)
    this.apiCall.updateDocument(this.filterData.documentId,this.filterData.title,this.editContentData.content,this.filterData.type,this.filterData.author,(data)=>{
        this.toggleEditModal();
        this.getDocumentList(1);
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
      if(item){
          // tinymce.activeEditor.setContent(item.content)
          this.filterData ={
          documentId:item.document_id,
          title:item.title,
          content:item.content,
          author:item.author,
          type:item.type
        }
      }
      this.modalEditShow = !this.modalEditShow;
       if(!this.modalEditShow){
        this.filterData = {
          documentId:'',
          title: '',
          content:'',
          author:'',
          type:0
        };
        this.editContentData.content = '';
      }
  }

  public modalSubmit(){

      if(this.filterData.documentId){
        console.log('update');
          this.updateDocument()
      }else{
        console.log('add');
          this.addDocument()
      }
  }

  public addDocument():void{
    this.apiCall.addDocument(this.filterData.title,this.editContentData.content,this.filterData.type,this.filterData.author,(data)=>{
        this.toggleEditModal();
        this.getDocumentList(1);
    })
  }

  public delDocument(documentId):void{
    this.apiCall.delDocument(documentId,(data)=>{
        this.getDocumentList(1)
    })
  }

   //确认弹窗
  public verificationConfirm(documentId): void {
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.delDocument(documentId);
        layer.close(index);
      },
      () => {
         layer.close(index);
      }
    )
  }
}

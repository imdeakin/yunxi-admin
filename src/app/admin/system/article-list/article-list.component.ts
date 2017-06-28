/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {ArticleList} from '../data-type/article-list';

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
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 0,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    },
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 0,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    },
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 1,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    },
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 0,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    }
  ];
  public filterData = {
    title: '',
    content:'',
    author:'',
    type:0
  };

  public systemFunction = SystemFunction;
  
  public modalShow:boolean = false;
  public modalEditShow:boolean = false;
  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaUserList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
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

  public toggleModal(item?):void{
      this.modalShow = !this.modalShow;
      if(item){
        this.filterData ={
          title:item.title,
          content:item.content,
          author:item.author,
          type:item.type
        }
      }

  }

  public toggleEditModal(item?){
      this.modalEditShow = !this.modalEditShow;
      this.initEditor();
       this.filterData ={
          title:item.title,
          content:item.content,
          author:item.author,
          type:item.type
        }
  }

  initEditor() {  
   tinymce.init({  
     selector: '#editContent',  
     language: 'zh_CN',  
     plugins: [  
       'advlist autolink lists link charmap print preview hr anchor pagebreak media',  
       'searchreplace wordcount visualblocks visualchars code fullscreen ',  
       'insertdatetime nonbreaking save table contextmenu directionality ',  
       'paste textcolor colorpicker textpattern'  
     ],  
     toolbar1: ' fullscreen insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link ',  
     toolbar2: 'print preview | forecolor backcolor media ',  
     height:"480",  
     image_advtab: true,  
     menubar: true,  
   });  
 }  
}

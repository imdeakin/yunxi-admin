/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {CarSeriesList} from '../data-type/car-series-list';

declare let layer: any;

@Component({
  selector: 'shop-range',
  templateUrl: './shop-range.component.html',
  styleUrls: ['./shop-range.component.css']
})
export class ShopRangeComponent implements OnInit {
  public title = '经营类目';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList = [];
  public roleName = '';
  public roleList = [];
  public filterData = {
    roleName: '',
  };
  public carBrandOptions;

  // 模态窗
  public modalShow: boolean = false;
  public modalData = {
    name:'',
    scope_id:''
  };

  //增加窗
  public modalRoleShow:boolean = false;


  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getScopeList();

  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getScopeList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getScopeList(this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  /**
   * 增加
   */
  public addScope():void{
    this.apiCall.addScope(this.modalData.name,(data) => {
        this.getScopeList();
        this.toggleModal();
    })
  }

   /**
   * 更改
   */
  public editScope():void{
    this.apiCall.editScope(this.modalData.scope_id,this.modalData.name,(data) => {
      this.getScopeList();
      this.toggleModal();
    })
  }

  
   /**
   * 删除
   */
  public delScope(scope_id):void{
    this.apiCall.delScope(scope_id,(data) => {
      this.getScopeList();
    })
  }

  // 增加窗
  public toggleModal(item?): void {
    this.modalShow = !this.modalShow;
    if(item){
      this.modalData = {
        name:item.name,
        scope_id:item.scope_id
      }
    }
    if(!this.modalShow){
      this.modalData = {
        name:'',
        scope_id:''
      }
    }
 }

 public modalSubmit():void{
    if(this.modalData.scope_id){
      this.editScope();
    }else{
      this.addScope()
    }
 }

   //确认弹窗
  public verificationConfirm(item): void {
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.delScope(item.scope_id);
        layer.close(index);
      },
      () => {
         layer.close(index);
      }
    )
  }

  //获取角色权限列表
  public roleAuthorityList(item):void{
      this.apiCall.roleAuthorityList(item.role_id,(data)=>{
        this.roleList = data.all_authority_list;
          console.log(data);
      })
  } 
    
  public toggleRoleModal(item?):void{
    if(item){
      this.roleAuthorityList(item);
    }
    this.modalRoleShow = !this.modalRoleShow;
  }
}